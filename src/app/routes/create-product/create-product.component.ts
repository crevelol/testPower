import { Component } from '@angular/core';
import { StyledInputComponent } from "../../components/styled-input/styled-input.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackTestService } from '../../services/back-test.service';
import { Product } from '../../models/back-test.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  imports: [StyledInputComponent, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  formulario = new FormGroup({
    id: new FormControl('', [
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
  constructor(private backTestService: BackTestService, private router: Router) { }

  ngOnInit(): void {
    this.formulario.get('fechaLiberacion')?.valueChanges.subscribe(value => {
      if (value) {
        const fecha = new Date(value);
        fecha.setFullYear(fecha.getFullYear() + 1);
        this.formulario.get('fechaRevision')?.setValue(fecha.toISOString().split('T')[0]);
      }
    });
  }

  fechaValida(control: AbstractControl) {
    const fechaActual = new Date();
    const fechaIngreso = new Date(control.value);

    if (fechaIngreso < fechaActual) {
      return { fechaInvalida: true };  // Devuelve un error si la fecha es menor que la actual
    }

    return null;  // Si la fecha es válida, no se devuelve ningún error
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

      this.backTestService.createProduct(newProduct).subscribe({
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

  reiniciarFormulario() {
    this.formulario.markAsUntouched();
    this.formulario.reset();

  }
}
