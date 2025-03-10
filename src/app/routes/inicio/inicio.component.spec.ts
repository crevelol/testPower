import { InicioComponent } from './inicio.component';
import { BackTestService } from '../../services/back-test.service';
import { of, throwError } from 'rxjs';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let backTestServiceMock: jest.Mocked<BackTestService>;

  beforeEach(() => {
    // Creamos el mock para el servicio BackTestService
    backTestServiceMock = {
      getProducts: jest.fn(),
    } as any;

    // Creamos una instancia del componente con el servicio mockeado
    component = new InicioComponent(backTestServiceMock);
  });

  it('Deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia llamar getProducts y su formato', () => {
    // Preparamos el mock para que devuelva un valor exitoso
    const mockData = {
      data: [
        { id: '1', name: 'Product 1', date_release: '2022-01-01', date_revision: '2023-01-01', description: 'Description 1', logo: 'Logo 1' },
      ],
    };
    backTestServiceMock.getProducts.mockReturnValue(of(mockData));

    // Llamamos a ngOnInit para que se ejecute la lógica
    component.ngOnInit();

    // Verificamos que los productos se hayan llenado correctamente
    expect(component.products.length).toBe(1);
    expect(component.products[0].name).toBe('Product 1');
    expect(component.error).toBe(false); // Aseguramos que no haya error
  });

  it('Deberia marcar error cuando falla', () => {
    // Preparamos el mock para que simule un error
    backTestServiceMock.getProducts.mockReturnValue(throwError(() => new Error('Error fetching products')));

    // Llamamos a ngOnInit para simular la ejecución del método
    component.ngOnInit();

    // Verificamos que se haya gestionado el error correctamente
    expect(component.products).toEqual([]); // Los productos deben estar vacíos
    expect(component.error).toBe(true); // El flag de error debe ser true
  });

  it('Deberia recargar ngOnInit recargarNgOnInit es ejecutado', () => {
    // Preparamos el mock para que devuelva datos
    const mockData = {
      data: [
        { id: '1', name: 'Product 1', date_release: '2022-01-01', date_revision: '2023-01-01', description: 'Description 1', logo: 'Logo 1' },
      ],
    };
    backTestServiceMock.getProducts.mockReturnValue(of(mockData));

    // Llamamos a recargarNgOnInit para reiniciar la carga de productos
    component.recargarNgOnInit();

    // Verificamos que la llamada a ngOnInit haya sido realizada
    expect(backTestServiceMock.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(1);
    expect(component.products[0].name).toBe('Product 1');
  });
});
