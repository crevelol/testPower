import { Component, Input, output, ViewChild } from '@angular/core';
import { StyledInputComponent } from '../styled-input/styled-input.component';
import { Product } from '../../models/back-test.model';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { FormsModule } from '@angular/forms';
import { MenuDesplegableComponent } from '../menu-desplegable/menu-desplegable.component';

@Component({
  selector: 'app-generic-table',
  imports: [StyledInputComponent, RouterModule, FormsModule, MenuDesplegableComponent],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent {
  @Input() data: Product[] = [];



  selectedOption: string = '5';

  searchTerm: string = ''; // Variable compartida

  updateSearchTerm(value: string) {
    this.searchTerm = value; // Recibe el valor actualizado del hijo
  }


  get filteredUsers() {
    if (!this.searchTerm.trim()) return this.data.slice(0, Number(this.selectedOption)); // Si no hay búsqueda, retorna todos los productos
    return this.data.filter(user =>
      user.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).slice(0, Number(this.selectedOption));
  }

  columns = [
    { nombre: "Logo", informacion: false },
    { nombre: "Nombre del producto", informacion: false },
    { nombre: "Descripción", informacion: true },
    { nombre: "Fecha de liberación", informacion: true },
    { nombre: "Fecha de reestructuración", informacion: true },
    { nombre: "", informacion: false },
  ];
}
