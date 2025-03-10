import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BackTestService } from './back-test.service';
import { Product, DataFormat } from '../models/back-test.model';
import { of } from 'rxjs';

describe('BackTestService', () => {
  let service: BackTestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackTestService],
    });

    service = TestBed.inject(BackTestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes
  });

  it('should retrieve products from the API', () => {
    const mockData: DataFormat = {
      data: [
        { id: '1', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '2', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
      ]
    };

    // Usamos jest.spyOn para espiar el método get
    const spy = jest.spyOn(service, 'getProducts').mockReturnValue(of(mockData));

    service.getProducts().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should create a product', () => {
    const newProduct: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: '',
      date_release: '',
      date_revision: ''
    };

    const mockResponse: Product = { ...newProduct };

    // Usamos jest.spyOn para espiar el método post
    const spy = jest.spyOn(service, 'createProduct').mockReturnValue(of(mockResponse));

    service.createProduct(newProduct).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(spy).toHaveBeenCalledWith(newProduct);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should retrieve a product by id', () => {
    const productId = '1';
    const mockProduct: Product = {
      id: productId,
      name: 'Product 1',
      description: 'Description 1',
      logo: '',
      date_release: '',
      date_revision: ''
    };

    // Usamos jest.spyOn para espiar el método get
    const spy = jest.spyOn(service, 'getProduct').mockReturnValue(of(mockProduct));

    service.getProduct(productId).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    expect(spy).toHaveBeenCalledWith(productId);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should edit a product', () => {
    const productId = '1';
    const updatedProduct: Product = {
      id: productId,
      name: 'Updated Product 1',
      description: 'Updated Description 1',
      logo: '',
      date_release: '',
      date_revision: ''
    };

    const mockResponse: Product = { ...updatedProduct };

    // Usamos jest.spyOn para espiar el método put
    const spy = jest.spyOn(service, 'editProduct').mockReturnValue(of(mockResponse));

    service.editProduct(productId, updatedProduct).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(spy).toHaveBeenCalledWith(productId, updatedProduct);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should delete a product', () => {
    const productId = '1';
    const mockResponse: Product = { id: productId, name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' };

    // Usamos jest.spyOn para espiar el método delete
    const spy = jest.spyOn(service, 'deleteProduct').mockReturnValue(of(mockResponse));

    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(spy).toHaveBeenCalledWith(productId);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
