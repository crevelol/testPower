export interface Product {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
    descripcion?: string;
    nombre?: string;
    fechaLiberacion?: string;
    fechaRevision?: string;
}

export interface DataFormat {
    data: Product[];
}

export interface DataFormatOne {
    data: Product;
}

export interface DataFormatDelete {
    message: string;
}