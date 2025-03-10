import { Component } from '@angular/core';
import { GenericTableComponent } from '../../components/generic-table/generic-table.component';
import { BackTestService } from '../../services/back-test.service';
import { Product } from '../../models/back-test.model';

@Component({
  selector: 'app-inicio',
  imports: [GenericTableComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  products: Product[] = [];
  error:boolean = false;
  searchTerm: string = ''; // Variable para almacenar la búsqueda

  constructor(private backTestService: BackTestService) { }

  transformDate(dateString: string): string {
    // Primero, creamos un objeto Date a partir de la cadena en formato yyyy-mm-dd
    const date = new Date(dateString);

    // Extraemos el día, el mes y el año
    const day = ('0' + (date.getDate())).slice(-2);  // Aseguramos que el día tenga dos dígitos
    const month = ('0' + (date.getMonth() + 1)).slice(-2);  // Los meses empiezan desde 0, por eso sumamos 1
    const year = date.getFullYear();

    // Retornamos la fecha en formato dd/mm/yyyy
    return `${day}/${month}/${year}`;
  }

  ngOnInit(): void {
    // Llamar al servicio para obtener los posts
    this.backTestService.getProducts().subscribe(
      (data) => {
        this.products = data.data.map((product) => {
          // Supongamos que queremos modificar el precio y agregar un nuevo campo 'formattedPrice'
          return {
            ...product,
            date_release: this.transformDate(product.date_release),
            date_revision: this.transformDate(product.date_revision),
          };
        });
      },
      (error) => {
        // Manejar el error aquí
        this.error = true;
        // Puedes realizar alguna acción adicional, como mostrar un mensaje de error al usuario
        // o asignar un valor predeterminado a los productos si es necesario
        this.products = [];  // Ejemplo: asignar un array vacío en caso de error
      }
    );
  }

  recargarNgOnInit() {
    this.ngOnInit(); // Volver a ejecutar ngOnInit manualmente
  }
}
