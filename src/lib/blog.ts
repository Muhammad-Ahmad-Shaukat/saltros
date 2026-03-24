interface SanityImageField {
  url?: string
  alt?: string
  metadata?: {
    dimensions?: {
      width?: number
      height?: number
    }
  }
}

interface SanityBlogPost {
  _id: string
  title?: string
  slug?: string
  excerpt?: string
  publishedAt?: string
  authorName?: string
  categoryTitle?: string
  contentText?: string
  seoTitle?: string
  seoDescription?: string
  canonicalUrl?: string
  noindex?: boolean
  featuredImage?: SanityImageField
  seoImage?: SanityImageField
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  contentHtml: string
  contentText: string
  featuredImage: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  date: string
  datetime: string
  timeToRead: string
  author: {
    name: string
  }
  category: {
    title: string
    href: string
  }
  seo: {
    title: string
    description: string
    image?: string
    canonicalUrl?: string
    noindex: boolean
  }
}

const WORDS_PER_MINUTE = 220
const SANITY_API_VERSION = '2023-10-01'

const getSiteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'http://localhost:3000'

const getSanityConfig = () => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET
  const token = process.env.SANITY_API_TOKEN

  if (!projectId || !dataset) {
    throw new Error(
      'Missing Sanity environment variables. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.'
    )
  }

  return { projectId, dataset, token }
}

const sanityFetch = async <T>(query: string): Promise<T> => {
  const { projectId, dataset, token } = getSanityConfig()
  const endpoint = `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${dataset}?query=${encodeURIComponent(query)}`

  const response = await fetch(endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error(`Sanity query failed: ${response.status} ${response.statusText}`)
  }

  const data = (await response.json()) as { result: T }
  return data.result
}

const toDateParts = (dateInput?: string | null) => {
  const parsed = dateInput ? new Date(dateInput) : new Date()
  const safeDate = Number.isNaN(parsed.getTime()) ? new Date() : parsed
  return {
    date: safeDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    datetime: safeDate.toISOString().split('T')[0],
  }
}

const toReadTime = (text: string) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
  return `${minutes} min read`
}

const createExcerpt = (manualExcerpt: string | null | undefined, fallbackText: string) => {
  if (manualExcerpt?.trim()) return manualExcerpt.trim()
  const compact = fallbackText.replace(/\s+/g, ' ').trim()
  if (compact.length <= 160) return compact
  return `${compact.slice(0, 157).trimEnd()}...`
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const mapSanityPost = (post: SanityBlogPost): BlogPost => {
  const title = post.title?.trim() || 'Untitled blog post'
  const contentText = post.contentText?.trim() || ''
  const contentHtml = contentText
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join('')
  const excerpt = createExcerpt(post.excerpt, contentText)
  const publishedAt = post.publishedAt
  const dateParts = toDateParts(publishedAt)

  const seoTitle = (post.seoTitle || title).trim()
  const seoDescription = createExcerpt(post.seoDescription, excerpt || contentText)
  const canonicalUrl = post.canonicalUrl || `${getSiteUrl()}/blog/${post.slug}`
  const seoImage = post.seoImage?.url || post.featuredImage?.url
  const featuredImage = post.featuredImage || {}

  return {
    id: post._id,
    slug: post.slug || '',
    title,
    excerpt,
    contentHtml,
    contentText,
    featuredImage: {
      src: (featuredImage.url as string) || '',
      alt: (featuredImage.alt as string) || title,
      width: featuredImage.metadata?.dimensions?.width as number | undefined,
      height: featuredImage.metadata?.dimensions?.height as number | undefined,
    },
    date: dateParts.date,
    datetime: dateParts.datetime,
    timeToRead: toReadTime(contentText),
    author: {
      name: (post.authorName || 'Saltros Team').trim(),
    },
    category: {
      title: post.categoryTitle || 'Blog',
      href: '/blog',
    },
    seo: {
      title: seoTitle,
      description: seoDescription,
      image: seoImage,
      canonicalUrl,
      noindex: Boolean(post.noindex),
    },
  }
}

export async function getBlogPosts() {
  const query = `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "authorName": author->name,
    "categoryTitle": categories[0]->title,
    "contentText": pt::text(body),
    seoTitle,
    seoDescription,
    canonicalUrl,
    noindex,
    "featuredImage": {
      "url": mainImage.asset->url,
      "alt": mainImage.alt,
      "metadata": mainImage.asset->metadata
    },
    "seoImage": {
      "url": seoImage.asset->url,
      "alt": seoImage.alt,
      "metadata": seoImage.asset->metadata
    }
  }`

  const posts = await sanityFetch<SanityBlogPost[]>(query)
  return posts.map(mapSanityPost)
}

export async function getBlogPostBySlug(slug: string) {
  const safeSlug = JSON.stringify(slug)
  const query = `*[_type == "post" && slug.current == ${safeSlug}][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "authorName": author->name,
    "categoryTitle": categories[0]->title,
    "contentText": pt::text(body),
    seoTitle,
    seoDescription,
    canonicalUrl,
    noindex,
    "featuredImage": {
      "url": mainImage.asset->url,
      "alt": mainImage.alt,
      "metadata": mainImage.asset->metadata
    },
    "seoImage": {
      "url": seoImage.asset->url,
      "alt": seoImage.alt,
      "metadata": seoImage.asset->metadata
    }
  }`

  const post = await sanityFetch<SanityBlogPost | null>(query)
  return post ? mapSanityPost(post) : null
}

export async function getBlogPostByHandle(handle: string) {
  return getBlogPostBySlug(handle)
}

export async function getBlogSlugs() {
  const posts = await getBlogPosts()
  return posts.map((post) => post.slug).filter(Boolean)
}
