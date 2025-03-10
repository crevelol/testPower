import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericTableComponent } from './generic-table.component';
import { Product } from '../../models/back-test.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuDesplegableComponent } from '../menu-desplegable/menu-desplegable.component';
import { StyledInputComponent } from '../styled-input/styled-input.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BackTestService } from '../../services/back-test.service';
import { of } from 'rxjs';

describe('GenericTableComponent', () => {
  let component: GenericTableComponent;
  let fixture: ComponentFixture<GenericTableComponent>;
  let backTestService: BackTestService;
  let httpTestingController: HttpTestingController;

  const mockProducts: Product[] = [
    { id: '1', name: 'Producto 1', description: 'Descripción del producto 1', logo: 'logo1.png', date_release: '2023-01-01', date_revision: '2023-01-02' },
    { id: '2', name: 'Producto 2', description: 'Descripción del producto 2', logo: 'logo2.png', date_release: '2023-01-02', date_revision: '2023-01-03' },
    { id: '3', name: 'Producto 3', description: 'Descripción del producto 3', logo: 'logo3.png', date_release: '2023-01-03', date_revision: '2023-01-04' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GenericTableComponent, 
        StyledInputComponent, 
        MenuDesplegableComponent, 
        FormsModule, 
        RouterModule, 
        HttpClientTestingModule // Agregar HttpClientTestingModule aquí
      ],
      providers: [
        BackTestService, 
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'mock-id' } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericTableComponent);
    component = fixture.componentInstance;
    backTestService = TestBed.inject(BackTestService);
    httpTestingController = TestBed.inject(HttpTestingController);
    
    component.data = mockProducts; // Asignamos los productos mockeados
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products based on the search term', () => {
    component.updateSearchTerm('producto 1');
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Producto 1');
  });

  it('should return all products if search term is empty', () => {
    component.updateSearchTerm('');
    expect(component.filteredUsers.length).toBe(3);
  });

  it('should slice the filtered products based on selected option', () => {
    component.updateSearchTerm('producto');
    component.selectedOption = '2';
    expect(component.filteredUsers.length).toBe(2);
  });

  it('should update search term correctly', () => {
    component.updateSearchTerm('Producto 3');
    expect(component.searchTerm).toBe('Producto 3');
  });

  it('should render the table with correct data', () => {
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toBe(4); // 3 productos + 1 fila de encabezado
  });
});
