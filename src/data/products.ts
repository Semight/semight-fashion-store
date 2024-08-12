import { StaticImageData } from "next/image";
import Men1 from "@/assets/men_wear1.jpeg"
import Men2 from "@/assets/men_wears2.jpeg";
import Women1 from "@/assets/Shoes_bags3.jpeg"
import women2 from "@/assets/Shoes_bags4.jpeg"
import Kid from "@/assets/kid.jpg"

export interface Product {
    id: string;
    name: string;
    price: string;
    image: StaticImageData;
  }
  
  export interface CategoryProducts {
    [key: string]: Product[]; // Index signature for dynamic keys
  }
  
  export const categoryProducts: CategoryProducts = {
    men: [
        { id: '1', name: 'Men Product 1', price: '$49.99', image: Men1 },
        { id: '2', name: 'Men Product 2', price: '$59.99', image: Men2 },
      ],
      women: [
        { id: '3', name: 'Women Product 1', price: '$69.99', image: Women1 },
        { id: '4', name: 'Women Product 2', price: '$79.99', image: women2 },
      ],
      kids: [
        { id: '5', name: 'Kids Product 1', price: '$39.99', image: Kid },
      ],
    };


    export const allProducts = [
  {
    id: '1',
    name: 'Product 1',
    price: '$49.99',
    description: 'A great product for your needs.',
    images: ['/images/product1.jpg', '/images/product1-thumbnail1.jpg', '/images/product1-thumbnail2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '2',
    name: 'Product 2',
    price: '$59.99',
    description: 'Another fantastic item.',
    images: ['/images/product2.jpg', '/images/product2-thumbnail1.jpg', '/images/product2-thumbnail2.jpg'],
    sizes: ['M', 'L', 'XL'],
  },
  // Add more products as needed
];
