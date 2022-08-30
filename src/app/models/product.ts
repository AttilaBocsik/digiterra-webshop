export interface Product {
    productId: number;
    name: string;
    applications: Array<any>;
    functions: Array<any>;
    grossOrNet: string;
    price: number;
    currency: string;
    description: string;
    specification: string;
    image: string;
    language: string;
    other: {};
}
