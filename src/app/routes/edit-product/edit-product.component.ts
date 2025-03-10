import { Component } from '@angular/core';
import { StyledInputComponent } from '../../components/styled-input/styled-input.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackTestService } from '../../services/back-test.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/back-test.model';

@Component({
  selector: 'app-edit-product',
  imports: [StyledInputComponent, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  product: Product = {} as Product;
  productId: string | null = null;

  formulario = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)
    ]),
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200)
    ]),
    logo: new FormControl('', Validators.required),
    fechaLiberacion: new FormControl('', [Validators.required, this.fechaValida]),
    fechaRevision: new FormControl({ value: '', disabled: true }, Validators.required),
  });
  //Si queremos validar por url
  //Validators.pattern('^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]{2,}(:\\d+)?(\\/.*)?$')


  fechaValida(control: AbstractControl) {
    const fechaActual = new Date();
    const fechaIngreso = new Date(control.value);

    if (fechaIngreso < fechaActual) {
      return { fechaInvalida: true };  // Devuelve un error si la fecha es menor que la actual
    }

    return null;  // Si la fecha es válida, no se devuelve ningún error
  }

  constructor(private backTestService: BackTestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formulario.get('fechaLiberacion')?.valueChanges.subscribe(value => {
      if (value) {
        this.formulario.get('fechaRevision')?.setValue(value);
      }
    });
    this.productId = this.route.snapshot.paramMap.get('id');
    // Llamar al servicio para obtener los posts
    this.backTestService.getProduct(this.productId || "").subscribe((data) => {
      this.product = data;
      this.product.descripcion = this.product.description;
      this.product.nombre = this.product.name;
      this.product.fechaLiberacion = this.product.date_release;
      this.product.fechaRevision = this.product.date_revision;
      this.formulario.patchValue(this.product);
    });
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      const newProduct: Product = {
        id: this.formulario.get('id')?.value || '',
        name: this.formulario.get('nombre')?.value || '',
        description: this.formulario.get('descripcion')?.value || '',
        logo: this.formulario.get('logo')?.value || '',
        date_release: this.formulario.get('fechaLiberacion')?.value || '',
        date_revision: this.formulario.get('fechaRevision')?.value || ''
      };
      this.productId = this.route.snapshot.paramMap.get('id');

      this.backTestService.editProduct(this.productId || "", newProduct).subscribe({
        next: (response) => {
          this.router.navigate(['/']); // edirige después de éxito
        },
        error: (err) => {
        }
      });
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}
