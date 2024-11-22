export interface Document extends DocumentWithoutVariant {
  variants: Variant[];
}
export interface DocumentWithoutVariant {
  document_id: number;
  document_name: string;
  id_author: number;
  id_publisher: number;
  description: any;
  author: Author;
  publisher: Publisher;
  document_ref_category: DocumentRefCategory[];
  image?: { image: string; id: number }[];
}
export interface PreviewDocumentWithoutVariant {
  document_id: number;
  document_name: string;
  id_author: number;
  id_publisher: number;
  description: any;
  author: Author;
  publisher: Publisher;
  document_ref_category: DocumentRefCategory[];
  image?: string;
}
// export interface DocumentIncludePurchase {
//   document_id: number;
//   document_name: string;
//   id_author: number;
//   id_publisher: number;
//   description: any;
//   author: Author;
//   publisher: Publisher;
//   document_ref_category: DocumentRefCategory[];
//   variants: Variant[];
// }
export interface Author {
  id_author: number;
  author_name: string;
}

export interface Publisher {
  id_publisher: number;
  publisher_name: string;
}
export interface Supplier {
  id_supplier: number;
  supplier_name: string;
}
export interface DocumentRefCategory {
  document_id: number;
  category_id: number;
  category: Category;
}

export interface Category {
  id_category: number;
  category_name: string;
}

export interface Variant {
  isbn: string;
  document_id: number;
  quantity: number;
  published_date: string;
  name: string;
}
