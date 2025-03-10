import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductComponent } from './edit-product.component';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BackTestService } from '../../services/back-test.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/back-test.model';

// Mocking the BackTestService
class MockBackTestService {
  getProduct = jest.fn().mockReturnValue(of({
    id: '1',
    name: 'Test Product',
    description: 'This is a test product.',
    date_release: '2025-01-01',
    date_revision: '2025-02-01',
    logo: 'test-logo.png',
  }));
  
  editProduct = jest.fn().mockImplementation((id: string, product: Product) => {
    console.log('editProduct called with:', id, product); // Verifica si se llama
    return of({});
  });
}

// Mocking the ActivatedRoute
class MockActivatedRoute {
  snapshot = { paramMap: { get: jest.fn().mockReturnValue('1') } };
}

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let backTestService: MockBackTestService;
  let router: any; // Mock the router if needed

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditProductComponent, // Aquí lo agregamos a imports en lugar de declarations
        ReactiveFormsModule, 
        RouterTestingModule 
      ],
      providers: [
        { provide: BackTestService, useClass: MockBackTestService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    backTestService = TestBed.inject(BackTestService) as unknown as MockBackTestService;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.formulario;
    expect(form).toBeTruthy();
    expect(form.controls['id'].value).toBe('');
    expect(form.controls['nombre'].value).toBe('');
    expect(form.controls['descripcion'].value).toBe('');
    expect(form.controls['logo'].value).toBe('');
    expect(form.controls['fechaLiberacion'].value).toBe('');
    expect(form.controls['fechaRevision'].value).toBe('');
  });

  it('should call backTestService.getProduct on init', () => {
    component.ngOnInit();
    expect(backTestService.getProduct).toHaveBeenCalledWith('1');
  });

  it('should patch the form with product data when getProduct is called', () => {
    component.ngOnInit();
    expect(component.formulario.get('nombre')?.value).toBe('Test Product');
    expect(component.formulario.get('descripcion')?.value).toBe('This is a test product.');
    expect(component.formulario.get('fechaLiberacion')?.value).toBe('2025-01-01');
    expect(component.formulario.get('fechaRevision')?.value).toBe('2025-02-01');
  });

  it('should call backTestService.editProduct when form is valid and submit is triggered', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Updated Product',
      description: 'Updated description',
      logo: 'new-logo.png',
      date_release: '2025-03-01',
      date_revision: '2025-03-02',
    };
    
    // Parchar valores en el formulario
    component.formulario.patchValue(mockProduct);
    
    // Verificar si el formulario es válido
    expect(component.formulario.valid).toBe(true);
    
    // Ejecutar la función
    component.enviarFormulario();
    
    // Verificar si el método de edición fue llamado
    expect(backTestService.editProduct).toHaveBeenCalledWith('1', mockProduct);
  });

  it('should navigate to the home page after successful form submission', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.formulario.patchValue({
      id: '1',
      nombre: 'Updated Product',
      descripcion: 'Updated description',
      logo: 'new-logo.png',
      fechaLiberacion: '2025-03-01',
      fechaRevision: '2025-03-02',
    });
    
    component.enviarFormulario();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should mark all fields as touched if the form is invalid', () => {
    const markAllAsTouchedSpy = jest.spyOn(component.formulario, 'markAllAsTouched');
    component.enviarFormulario();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });
});
