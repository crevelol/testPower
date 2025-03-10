import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renderizado correctamente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('header renderizado correctamente', () => {
    // Verifica que el componente <app-header> esté presente en el DOM
    const compiled = fixture.nativeElement as HTMLElement;
    const headerElement = compiled.querySelector('app-header');
    
    // Comprobamos que el <app-header> se haya renderizado correctamente
    expect(headerElement).toBeTruthy(); // Esto verifica que el <app-header> existe
  });

});
