import ProductDetail from './ProductDetail';
import { allProducts } from '@/data/products';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  sizes: string[];
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = allProducts.find((p) => p.id === params.id) || null;
  
  return {
    title: product ? product.name : 'Product Not Found',
    description: product ? product.description : 'No product details available',
  };
}

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id,
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = allProducts.find((p) => p.id === params.id) || null;
  
  return (
    <ProductDetail product={product} />
  );
}
