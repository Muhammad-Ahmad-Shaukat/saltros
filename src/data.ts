export {
  getProducts,
  getProductByHandle,
  getCollections,
  getCollectionById,
  getCollectionByHandle,
  getCartProducts,
  getOrders,
  getOrder,
} from '@/lib/data-db'

import { getProducts } from '@/lib/data-db'

export function getCountries() {
  return [
    {
      name: 'Canada',
      code: 'CA',
      flagUrl: '/flags/ca.svg',
      regions: [
        'Alberta',
        'British Columbia',
        'Manitoba',
        'New Brunswick',
        'Newfoundland and Labrador',
        'Northwest Territories',
        'Nova Scotia',
        'Nunavut',
        'Ontario',
        'Prince Edward Island',
        'Quebec',
        'Saskatchewan',
        'Yukon',
      ],
    },
    {
      name: 'Mexico',
      code: 'MX',
      flagUrl: '/flags/mx.svg',
      regions: [
        'Aguascalientes',
        'Baja California',
        'Baja California Sur',
        'Campeche',
        'Chiapas',
        'Chihuahua',
        'Ciudad de Mexico',
        'Coahuila',
        'Colima',
        'Durango',
        'Guanajuato',
        'Guerrero',
        'Hidalgo',
        'Jalisco',
        'Mexico State',
        'Michoacán',
        'Morelos',
        'Nayarit',
        'Nuevo León',
        'Oaxaca',
        'Puebla',
        'Querétaro',
        'Quintana Roo',
        'San Luis Potosí',
        'Sinaloa',
        'Sonora',
        'Tabasco',
        'Tamaulipas',
        'Tlaxcala',
        'Veracruz',
        'Yucatán',
        'Zacatecas',
      ],
    },
    {
      name: 'United States',
      code: 'US',
      flagUrl: '/flags/us.svg',
      regions: [
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Washington DC',
        'Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'U.S. Virgin Islands',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
        'Armed Forces Americas',
        'Armed Forces Europe',
        'Armed Forces Pacific',
      ],
    },
  ]
}

export async function getShopData() {
  return {
    description: 'An example shop with GraphQL.',
    name: 'graphql',
    termsOfService: {
      url: 'https://checkout.shopify.com/13120893/policies/30401347.html?locale=en',
      title: 'Terms of Service',
      id: 'gid://shopify/ShopPolicy/30401347',
      handle: 'terms-of-service',
      body: '<p><strong>OVERVIEW</strong> <br>This website is operated by graphql.</p>',
    },
    subscriptionPolicy: {
      body: '<p>We have a 30-day return policy</p>',
      handle: 'refund-policy',
      id: 'gid://shopify/ShopPolicy/30401219',
      title: 'Refund Policy',
      url: 'https://checkout.shopify.com/13120893/policies/30401219.html?locale=en',
    },
    shippingPolicy: {
      body: '<p>Shipping Policy</p>',
      handle: 'shipping-policy',
      id: 'gid://shopify/ShopPolicy/23745298488',
      title: 'Shipping Policy',
      url: 'https://checkout.shopify.com/13120893/policies/23745298488.html?locale=en',
    },
    refundPolicy: {
      body: '<p>We have a 30-day return policy</p>',
      handle: 'refund-policy',
      id: 'gid://shopify/ShopPolicy/30401219',
      title: 'Refund Policy',
      url: 'https://checkout.shopify.com/13120893/policies/30401219.html?locale=en',
    },
    privacyPolicy: {
      body: '<p>Lorem inpt...</p>',
      handle: 'privacy-policy',
      id: 'gid://shopify/ShopPolicy/30401283',
      title: 'Privacy Policy',
      url: 'https://checkout.shopify.com/13120893/policies/30401283.html?locale=en',
    },
    primaryDomain: {
      url: 'https://graphql.myshopify.com',
    },
  }
}

export function getProductReviews() {
  return [
    {
      id: 1,
      title: "Can't say enough good things",
      rating: 5,
      content: `
        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
        <p>The product quality is amazing, it looks and feel even better than I had anticipated. </p>
      `,
      author: 'S. Walkinshaw',
      date: 'May 16, 2025',
      datetime: '2025-01-06',
    },
    {
      id: 2,
      title: 'Perfect for going out when you want to stay comfy',
      rating: 5,
      content: `
        <p>The product quality is amazing, it looks and feel even better than I had anticipated.</p>
        <p>I like it better than a regular hoody because it is tailored to be a slimmer fit. Perfect for going out when you want to stay comfy. The head opening is a little tight which makes it a little.</p>
      `,
      author: 'Risako M',
      date: 'May 16, 2025',
      datetime: '2025-01-06',
    },
    {
      id: 3,
      title: 'Very nice feeling sweater!',
      rating: 5,
      content: `
        <p> I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times.</p>
        <p>The product quality is amazing!</p>
      `,
      author: 'Eden Birch',
      date: 'May 16, 2025',
      datetime: '2025-01-06',
    },
  ]
}

export function getBlogPosts() {
  return [
    {
      id: 1,
      title: 'Graduation Dresses: A Style Guide',
      handle: 'graduation-dresses-style-guide',
      excerpt:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      featuredImage: {
        src: 'https://images.unsplash.com/photo-1640625695572-7289bd767f59?q=80&w=3874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

        alt: 'Graduation Dresses: A Style Guide',
        width: 3000,
        height: 2000,
      },
      date: 'Mar 16, 2020',
      category: { title: 'Marketing', href: '#' },
      timeToRead: '2 min read',
    },
    {
      id: 2,
      title: 'How to Wear Your Eid Pieces All Year Long',
      handle: 'how-to-wear-your-eid-pieces-all-year-long',
      excerpt:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      featuredImage: {
        src: 'https://images.unsplash.com/photo-1615165558255-519ba3990ac1?q=80&w=3854&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Graduation Dresses: A Style Guide',
        width: 3000,
        height: 2000,
      },
      date: 'Mar 16, 2020',
      category: { title: 'Marketing', href: '#' },
      timeToRead: '3 min read',
    },
    {
      id: 3,
      title: 'The Must-Have Hijabi Friendly Fabrics for 2024',
      handle: 'the-must-have-hijabi-friendly-fabrics-for-2024',
      excerpt:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      featuredImage: {
        src: 'https://images.unsplash.com/photo-1600634999635-f1f334b8e931?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Graduation Dresses: A Style Guide',
        width: 3000,
        height: 2000,
      },
      date: 'Mar 16, 2020',
      category: { title: 'Marketing', href: '#' },
      timeToRead: '3 min read',
    },
    {
      id: 4,
      title: 'The Hijabi Friendly Fabrics for 2025',
      handle: 'the-must-have-hijabi-friendly-fabrics-for',
      excerpt:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      featuredImage: {
        src: 'https://images.unsplash.com/photo-1600634999625-b98a8ff6cd1b?q=80&w=3893&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Graduation Dresses: A Style Guide',
        width: 3000,
        height: 2000,
      },
      date: 'Mar 16, 2020',
      category: { title: 'Marketing', href: '#' },
      timeToRead: '3 min read',
    },
    {
      id: 5,
      title: 'Boost your conversion rate',
      handle: 'boost-your-conversion-rate',
      excerpt:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      featuredImage: {
        src: 'https://images.unsplash.com/photo-1640625695572-7289bd767f59?q=80&w=3874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Graduation Dresses: A Style Guide',
        width: 3000,
        height: 2000,
      },
      date: 'Mar 16, 2020',
      category: { title: 'Marketing', href: '#' },
      timeToRead: '3 min read',
    },
    {
      id: 6,
      title: 'Graduation Dresses: A Style Guide',
      handle: 'graduation-dresses-style-guide',
      excerpt:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      featuredImage: {
        src: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Graduation Dresses: A Style Guide',
        width: 3000,
        height: 2000,
      },
      date: 'Mar 16, 2020',
      category: { title: 'Marketing', href: '#' },
      timeToRead: '3 min read',
    },
  ]
}

export function getBlogPostsByHandle(handle: string) {
  const blogPosts = getBlogPosts()
  const post = blogPosts.find((post) => post.handle === handle) || {}

  return {
    id: 1,
    title: 'Graduation Dresses: A Style Guide',
    handle: 'graduation-dresses-style-guide',
    excerpt:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.',
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Graduation Dresses: A Style Guide',
      width: 3773,
      height: 600,
    },
    date: 'Mar 16, 2025',
    datetime: '2025-03-16',
    category: { title: 'Marketing', href: '#' },
    timeToRead: '2 min read',
    ...post,
    content: `<p>Beauty is a universal language</p>`,
    author: {
      name: 'S. Walkinshaw',
    },
  }
}

// ------------------------ SKINCARE DATA ------------------------
// ------------------------ SKINCARE DATA ------------------------
export async function getSkincareCollections() {
  // for demo purposes,
  const products = await getSkincareProducts()
  return [
    {
      id: '1',
      title: 'Face Wash',
      handle: 'face-wash',
      description:
        'A gentle cleanser for all skin types. Removes impurities and makeup. Leaves skin fresh and clean. Perfect for daily use.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/skincare/feature-6.webp',
      products: products.slice(0, 5),
    },
    {
      id: '2',
      title: 'Cleansers',
      handle: 'cleansers',
      description:
        'Gentle and effective cleansers to remove impurities and refresh your skin daily. Suitable for all skin types.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/skincare/c1.webp',
      products: products.slice(5, 10),
    },
    {
      id: '3',
      title: 'Beauty tools',
      handle: 'beauty-tools',
      description: 'Essential beauty tools to enhance your skincare routine and achieve salon-like results at home.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/skincare/p2-1-1.webp',
      products: products.slice(2, 7),
    },
    {
      id: '4',
      title: 'Sunscreens',
      handle: 'sunscreens',
      description: 'Broad-spectrum sunscreens to protect your skin from harmful UV rays.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/skincare/p2-5.webp',
      products: products.slice(1, 6),
    },
    {
      id: '5',
      title: 'Moisturizers',
      handle: 'moisturizers',
      description: 'Hydrating moisturizers to keep your skin soft, smooth, and radiant.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/skincare/c5.webp',
      products: products.slice(4, 9),
    },
  ]
}
export async function getSkincareGroupCollections() {
  const collections = await getSkincareCollections()
  return [
    {
      id: '1',
      title: 'Skincare',
      handle: 'skincare',
      description: 'Explore our range of skincare products for all your beauty needs.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      collections,
    },
    {
      id: '2',
      title: 'Makeup',
      handle: 'makeup',
      description: 'Discover our makeup collection for a flawless look.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      collections,
    },
    {
      id: '3',
      title: 'Haircare',
      handle: 'haircare',
      description: 'Nourish and style your hair with our premium haircare products.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      collections,
    },
    {
      id: '4',
      title: 'Fragrance',
      handle: 'fragrance',
      description: 'Find your signature scent with our exquisite fragrance collection.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      collections,
    },
    {
      id: '5',
      title: 'Tools & Accessories',
      handle: 'tools-accessories',
      description: 'Enhance your beauty routine with our tools and accessories.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      collections,
    },
  ]
}

// ------------------------ HIJAB DATA ------------------------
// ------------------------ HIJAB DATA ------------------------
export async function getHijabCollections() {
  const products = await getHijabProducts()

  return [
    {
      id: '1',
      title: 'Chiffon Hijabs',
      handle: 'chiffon-hijabs',
      description: 'Lightweight and elegant chiffon hijabs for a soft, flowy look.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/hijab/c1.webp',
      products: products.slice(0, 5),
    },
    {
      id: '2',
      title: 'Jersey Hijabs',
      handle: 'jersey-hijabs',
      description: 'Soft and stretchy jersey hijabs for comfort and versatility.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/hijab/c2.webp',
      products: products.slice(5, 10),
    },
    {
      id: '3',
      title: 'Cotton Hijabs',
      handle: 'cotton-hijabs',
      description: 'Breathable and durable cotton hijabs for everyday wear.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/hijab/c3.webp',
      products: products.slice(2, 7),
    },
    {
      id: '4',
      title: 'Silk Hijabs',
      handle: 'silk-hijabs',
      description: 'Luxurious silk hijabs for a smooth and sophisticated look.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/hijab/c4.webp',
      products: products.slice(1, 6),
    },
    {
      id: '5',
      title: 'Instant Hijabs',
      handle: 'instant-hijabs',
      description: 'Convenient and ready-to-wear instant hijabs for quick, stylish coverage.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/hijab/c5.webp',
      products: products.slice(4, 9),
    },
  ]
}
export async function getHijabGroupCollections() {
  const collections = await getHijabCollections()
  return [
    {
      title: 'Spring Arrivals',
      handle: 'spring-arrivals',
      description: 'lorem ipsum',
      collections,
    },
    {
      title: 'NEW ARRIVALS',
      handle: 'new-arrivals',
      description: 'lorem ipsum',
      collections,
    },
    {
      title: 'Best Selling',
      handle: 'best-selling',
      description: 'lorem ipsum',
      collections,
    },
    {
      title: 'Hijabs',
      handle: 'hijabs',
      description: 'lorem ipsum',
      collections,
    },
    {
      title: 'Accessories',
      handle: 'accessories',
      description: 'lorem ipsum',
      collections,
    },
  ]
}

// ------------------------ FASHION DATA ------------------------
// ------------------------ FASHION DATA ------------------------
export async function getFashionCollections() {
  const products = await getFashionProducts()
  return [
    {
      id: '1',
      title: 'Jackets',
      handle: 'jackets',
      description:
        'Stylish jackets for every occasion, from casual to formal. Explore our collection of trendy jackets that elevate your outfit.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/fashion/jacket.jpg',
      products: products.slice(0, 5),
    },
    {
      id: '2',
      title: 'T-Shirts',
      handle: 't-shirts',
      description: 'Casual t-shirts for everyday wear, combining comfort and style effortlessly. Find your fit.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/fashion/tshirt.jpg',
      products: products.slice(5, 10),
    },
    {
      id: '3',
      title: 'Jeans',
      handle: 'jeans',
      description: 'Trendy jeans for a casual yet stylish look. Perfect for any occasion. Find your fit.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/fashion/jean.jpg',
      products: products.slice(2, 7),
    },
    {
      id: '4',
      title: 'Coats',
      handle: 'coats',
      description: 'Elegant coats for every season, combining warmth and style. Find your perfect outerwear.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/fashion/coat.jpg',
      products: products.slice(1, 6),
    },
    {
      id: '5',
      title: 'Shoes',
      handle: 'shoes',
      description: 'Trendy shoes for every occasion, from casual to formal. Find your perfect pair.',
      updatedAt: '2025-05-06T10:00:00-04:00',
      image: '/images/fashion/shoes.jpg',
      products: products.slice(3, 8),
    },
  ]
}
export async function getFashionGroupCollections() {
  const collections = await getFashionCollections()
  return [
    {
      title: 'NEW ARRIVALS',
      handle: 'new-arrivals',
      description: 'lorem ipsum',
      collections,
    },
    {
      title: 'Best Selling',
      handle: 'best-selling',
      description: 'lorem ipsum',
      collections,
    },
    {
      title: 'Accessories',
      handle: 'accessories',
      description: 'lorem ipsum',
      collections,
    },
    {
      title: 'Footwear',
      handle: 'footwear',
      description: 'lorem ipsum',
      collections,
    },
    {
      title: 'Jewelry',
      handle: 'jewelry',
      description: 'lorem ipsum',
      collections,
    },
  ]
}

// ------------------------ COMMON DEMO DATA ------------------------
// ------------------------  COMMON DEMO DATA ------------------------
export async function getGroupCollections(theme: 'fashion' | 'hijab' | 'skincare') {
  if (theme === 'fashion') {
    return getFashionGroupCollections()
  }
  if (theme === 'hijab') {
    return getHijabGroupCollections()
  }
  if (theme === 'skincare') {
    return getSkincareGroupCollections()
  }
}
// getCollections, getCollectionById, getCollectionByHandle, getProducts, getProductByHandle are exported from @/lib/data-db
export async function getSkincareProducts() {
  const allProducts = await getProducts()
  return allProducts.slice(0, 10)
}
export async function getFashionProducts() {
  const allProducts = await getProducts()
  return allProducts.slice(10, 20)
}
export async function getHijabProducts() {
  const allProducts = await getProducts()
  return allProducts.slice(20, 30)
}

// COMMON Types ------------------------------------------------------------------------
export type TCollection = Awaited<ReturnType<typeof getSkincareCollections>>[number]
export type TProductItem = Awaited<ReturnType<typeof getProducts>>[number]
