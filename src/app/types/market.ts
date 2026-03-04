export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Shop {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  color: string;
  position: { x: number; y: number };
  description: string;
  image: string;
  phone?: string;
}