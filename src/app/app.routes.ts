import { Routes } from '@angular/router';
import { InicioComponent } from './routes/inicio/inicio.component';
import { CreateProductComponent } from './routes/create-product/create-product.component';
import { EditProductComponent } from './routes/edit-product/edit-product.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'create_product',
        component: CreateProductComponent
    },
    {
        path: 'editar/:id',  // Ruta con parámetro dinámico
        component: EditProductComponent
    }
];
