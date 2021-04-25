export interface Product {
  productName: string;
  link: string;
  purchased: boolean;
}

export interface ProductResponse {
  ref: {
    id: string;
  };
  data: Product;
}
