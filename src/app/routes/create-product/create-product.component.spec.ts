import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CreateProductComponent } from './create-product.component';
import { BackTestService } from '../../services/back-test.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { jest } from '@jest/globals';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let backTestService: jest.Mocked<BackTestService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    backTestService = {
      createProduct: jest.fn()
    } as unknown as jest.Mocked<BackTestService>;

    router = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CreateProductComponent],
      providers: [
        { provide: BackTestService, useValue: backTestService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formulario).toBeDefined();
    expect(component.formulario.get('id')?.value).toBe('');
    expect(component.formulario.get('nombre')?.value).toBe('');
  });

  it('should mark form as invalid when fields are empty', () => {
    expect(component.formulario.valid).toBeFalsy();
  });

  it('should validate fechaLiberacion correctly', () => {
    const fechaControl = component.formulario.get('fechaLiberacion');
    fechaControl?.setValue('2000-01-01'); // Fecha inválida
    expect(fechaControl?.errors).toEqual({ fechaInvalida: true });
  });

  it('should call createProduct on valid form submission', () => {
    component.formulario.setValue({
      id: '123',
      nombre: 'Producto Test',
      descripcion: 'Descripción válida de producto.',
      logo: 'logo.png',
      fechaLiberacion: '2025-05-10',
      fechaRevision: '2026-05-10'
    });
    
    backTestService.createProduct.mockReturnValue(of({
      id: '123',
      name: 'Producto Test',
      description: 'Descripción válida de producto.',
      logo: 'logo.png',
      date_release: '2025-05-10',
      date_revision: '2026-05-10'
    }));
    component.enviarFormulario();
    
    expect(backTestService.createProduct).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not submit invalid form', () => {
    component.formulario.setValue({
      id: '',
      nombre: '',
      descripcion: '',
      logo: '',
      fechaLiberacion: '',
      fechaRevision: ''
    });
    component.enviarFormulario();
    expect(backTestService.createProduct).not.toHaveBeenCalled();
  });
});
