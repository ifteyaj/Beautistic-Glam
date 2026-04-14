
import { Product, Category } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Luminous Serum',
    brand: 'ENDYMIONS',
    price: 124.00,
    category: 'Serum',
    tags: ['Organic', 'Fresh', 'Clean'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    description: 'A revolutionary serum that provides instant radiance and long-term skin rejuvenation. Formulated with botanical extracts and essential vitamins.',
    ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Green Tea Extract', 'Rosehip Oil'],
    howToUse: 'Apply 2-3 drops to clean face and neck every morning and evening.',
    rating: 4.8,
    reviewsCount: 128,
    sku: 'BL-SR-001',
    isTopSeller: true
  },
  {
    id: '2',
    name: 'Face Elixir',
    brand: 'NATURAL',
    price: 30.00,
    category: 'Oil',
    tags: ['Natural', 'Clean'],
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop',
    description: 'A lightweight facial oil that deeply hydrates without clogging pores. Perfect for achieving a natural glow.',
    ingredients: ['Jojoba Oil', 'Argan Oil', 'Squalane', 'Vitamin E'],
    howToUse: 'Warm 2 drops in palms and press gently into skin after moisturizer.',
    rating: 4.5,
    reviewsCount: 85,
    sku: 'BL-EL-002',
    isNew: true
  },
  {
    id: '3',
    name: 'Hydrating Cream',
    brand: 'BEAUTY',
    price: 30.00,
    category: 'Personal Care',
    tags: ['Fresh', 'Clean'],
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=800&auto=format&fit=crop',
    description: 'Intense 24-hour hydration for all skin types. Our signature cream leaves skin feeling velvety soft and plump.',
    ingredients: ['Shea Butter', 'Ceramides', 'Glycerin', 'Aloe Vera'],
    howToUse: 'Apply a dime-sized amount to face and neck morning and night.',
    rating: 4.9,
    reviewsCount: 210,
    sku: 'BL-CR-003',
    isTopSeller: true
  },
  {
    id: '4',
    name: 'Intensive Hand Cream',
    brand: 'NATURAL',
    price: 124.00,
    category: 'Hand Creams',
    tags: ['Organic', 'Natural'],
    image: 'https://images.unsplash.com/photo-1614859324967-bdf471f43477?q=80&w=800&auto=format&fit=crop',
    description: 'Repair and protect dry, tired hands with our botanical-rich formula that absorbs instantly.',
    ingredients: ['Lavender Essential Oil', 'Shea Butter', 'Vitamin E'],
    howToUse: 'Massage into hands as often as needed.',
    rating: 4.7,
    reviewsCount: 45,
    sku: 'BL-HC-004'
  },
  {
    id: '5',
    name: 'Anti-Aging Elixir',
    brand: 'ENDYMIONS',
    price: 185.00,
    category: 'Antiage',
    tags: ['Clean', 'Premium'],
    image: 'https://images.unsplash.com/photo-1594125355930-0761e3d4aa00?q=80&w=800&auto=format&fit=crop',
    description: 'Target fine lines and wrinkles with our most advanced age-defying formula.',
    ingredients: ['Retinol', 'Peptides', 'Coenzyme Q10'],
    howToUse: 'Apply at night to clean skin. Follow with SPF during the day.',
    rating: 4.6,
    reviewsCount: 72,
    sku: 'BL-AA-005',
    isNew: true
  },
  {
    id: '6',
    name: 'Silky Body Oil',
    brand: 'BEAUTY',
    price: 55.00,
    category: 'Body',
    tags: ['Organic', 'Fresh'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
    description: 'A luxurious body oil that leaves skin glowing and delicately scented.',
    ingredients: ['Sweet Almond Oil', 'Vanilla Extract', 'Grapeseed Oil'],
    howToUse: 'Massage into damp skin after bathing.',
    rating: 4.9,
    reviewsCount: 156,
    sku: 'BL-BO-006'
  },
  {
    id: '7',
    name: 'Rosewater Toner',
    brand: 'NATURAL',
    price: 24.00,
    category: 'Face',
    tags: ['Fresh', 'Natural'],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    description: 'Soothe and refresh skin with pure Damascus rosewater.',
    ingredients: ['Rose Water', 'Witch Hazel'],
    howToUse: 'Mist onto face after cleansing or throughout the day.',
    rating: 4.8,
    reviewsCount: 94,
    sku: 'BL-FT-007'
  },
  {
    id: '8',
    name: 'Velvet Matte Lipstick',
    brand: 'Beautistic Glam',
    price: 32.00,
    category: 'Lips',
    tags: ['Clean', 'Cruelty-Free'],
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop',
    description: 'High-pigment matte lipstick that feels like weightless silk on your lips.',
    ingredients: ['Castor Oil', 'Beeswax', 'Vitamin E'],
    howToUse: 'Apply directly to lips for a bold finish.',
    rating: 4.9,
    reviewsCount: 320,
    sku: 'BL-LP-008',
    isTopSeller: true
  }
];

export const CATEGORIES: Category[] = [
  'Body', 'Antiage', 'Oil', 'Serum', 'Personal Care', 'Hand Creams', 'Face', 'Eyes', 'Lips'
];

export const TAGS = ['Organic', 'Fresh', 'Clean', 'Natural', 'Cruelty-Free', 'Vegan'];
