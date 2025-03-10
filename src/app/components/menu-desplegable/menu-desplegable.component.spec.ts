import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuDesplegableComponent } from './menu-desplegable.component';
import { BackTestService } from '../../services/back-test.service';
import { of, throwError } from 'rxjs'; // Utilizamos 'of' para simular respuestas correctas y 'throwError' para errores
import { RouterLink } from '@angular/router';

describe('MenuDesplegableComponent', () => {
  let component: MenuDesplegableComponent;
  let fixture: ComponentFixture<MenuDesplegableComponent>;
  let backTestService: BackTestService;

  beforeEach(async () => {
    // Mock de BackTestService
    const backTestServiceMock = {
      deleteProduct: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [MenuDesplegableComponent, RouterLink], // Importar el componente standalone aquí
      providers: [{ provide: BackTestService, useValue: backTestServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuDesplegableComponent);
    component = fixture.componentInstance;
    backTestService = TestBed.inject(BackTestService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the menu visibility when toggleMenu is called', () => {
    // Estado inicial
    expect(component.isMenuVisible).toBeFalsy();

    // Llamamos a toggleMenu
    component.toggleMenu();
    expect(component.isMenuVisible).toBeTruthy();

    // Llamamos nuevamente a toggleMenu
    component.toggleMenu();
    expect(component.isMenuVisible).toBeFalsy();
  });

  it('should close the menu when clicking outside of it', () => {
    // Simular el click fuera del menú
    const event = new MouseEvent('click', { bubbles: true });
    document.body.dispatchEvent(event);

    // Asegurarse de que el menú se cierre
    expect(component.isMenuVisible).toBeFalsy();
  });

  it('should open and close the modal when toggleModal is called', () => {
    // Estado inicial
    expect(component.showModal).toBeFalsy();

    // Llamar a toggleModal
    component.toggleModal();
    expect(component.showModal).toBeTruthy();

    // Llamar nuevamente a toggleModal
    component.toggleModal();
    expect(component.showModal).toBeFalsy();
  });

  it('should call deleteProduct method when eliminarRegistro is called', () => {
    const variableMock = '123';
    component.variable = variableMock;

    // Simulamos que el servicio deleteProduct devuelve un valor exitoso
    const deleteResponse = { message: 'Producto eliminado' };
    spyOn(backTestService, 'deleteProduct').and.returnValue(of(deleteResponse));

    // Llamamos al método eliminarRegistro
    component.eliminarRegistro();

    // Verificar que el método deleteProduct fue llamado con el valor correcto
    expect(backTestService.deleteProduct).toHaveBeenCalledWith(variableMock);

    // Verificar que el modal se cierra después de eliminar
    expect(component.showModal).toBeFalsy();
  });

  it('should handle error correctly in eliminarRegistro method', () => {
    const variableMock = '123';
    component.variable = variableMock;

    // Simulamos que el servicio deleteProduct devuelve un error
    spyOn(backTestService, 'deleteProduct').and.returnValue(throwError(() => new Error('Error al eliminar producto')));

    // Llamamos al método eliminarRegistro
    component.eliminarRegistro();

    // Verificar que el modal se cierra incluso cuando ocurre un error
    expect(component.showModal).toBeFalsy();
  });
});
