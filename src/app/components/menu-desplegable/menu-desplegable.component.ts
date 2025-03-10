import { Component, HostListener, Input, output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackTestService } from '../../services/back-test.service';
import { GenericTableComponent } from '../generic-table/generic-table.component';

@Component({
  selector: 'app-menu-desplegable',
  imports: [RouterLink],
  templateUrl: './menu-desplegable.component.html',
  styleUrl: './menu-desplegable.component.css'
})
export class MenuDesplegableComponent {
  isMenuVisible = false;
  @Input() variable: string = '';

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  constructor(private backTestService: BackTestService) { }

  // Cierra el menú si se hace clic fuera de él
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.menu') || (event.target as HTMLElement).closest('.menu-toggle');
    if (!clickedInside) {
      this.isMenuVisible = false;
    }
  }

  showModal: boolean = false; // Controla la visibilidad del modal

  toggleModal() {
    this.showModal = !this.showModal; // Cambia el estado del modal
  }

  closeModal() {
    this.showModal = false; // Cierra el modal
  }

  eliminarRegistro() {
    this.backTestService.deleteProduct(this.variable).subscribe({
      next: (response) => {
        console.log('Producto eliminado:', response);
        window.location.reload();
        this.showModal = false; // Cierra el modal
      },
      error: (err) => {
        this.showModal = false; // Cierra el modal
      }
    });
  }
}
