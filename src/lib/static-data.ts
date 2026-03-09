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
