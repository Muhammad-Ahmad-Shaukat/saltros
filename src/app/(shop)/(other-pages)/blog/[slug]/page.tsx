import BlogPostCart from '@/components/blog-post-cart'
import { Divider } from '@/components/divider'
import { Heading } from '@/components/heading'
import { getBlogPostBySlug, getBlogPosts, getBlogSlugs } from '@/data'
import { Facebook02Icon, NewTwitterIcon, PinterestIcon, SentIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'

const socialShare = [
  { name: 'Facebook', href: '#', icon: Facebook02Icon },
  { name: 'Twitter', href: '#', icon: NewTwitterIcon },
  { name: 'Pinterest', href: '#', icon: PinterestIcon },
  { name: 'Email', href: '#', icon: SentIcon },
]

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) {
    return {
      title: 'Blog',
      description: 'Stay up-to-date with the latest industry news and stories from Saltros.',
    }
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: {
      canonical: post.seo.canonicalUrl || `/blog/${post.slug}`,
    },
    robots: post.seo.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'article',
      title: post.seo.title,
      description: post.seo.description,
      url: post.seo.canonicalUrl || `/blog/${post.slug}`,
      images: post.seo.image ? [{ url: post.seo.image, alt: post.title }] : undefined,
      publishedTime: post.datetime,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title,
      description: post.seo.description,
      images: post.seo.image ? [post.seo.image] : undefined,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) {
    return notFound()
  }

  const { featuredImage, author, contentHtml, date, datetime, title, timeToRead } = post
  const relatedPosts = (await getBlogPosts()).filter((item) => item.slug !== post.slug).slice(0, 3)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seo.description,
    image: post.seo.image ? [post.seo.image] : featuredImage.src ? [featuredImage.src] : undefined,
    datePublished: datetime,
    dateModified: datetime,
    author: {
      '@type': 'Person',
      name: author.name,
    },
    mainEntityOfPage: post.seo.canonicalUrl || `/blog/${post.slug}`,
  }

  return (
    <div className="container">
      <Script id={`blog-post-schema-${post.slug}`} type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </Script>

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center py-14 text-center lg:py-16">
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-4 text-center text-sm">
            <span>
              By <span className="font-medium">{author.name}</span>
              <span className="ms-4">/</span>
            </span>
            <time dateTime={datetime}>
              {date}
              <span className="ms-4">/</span>
            </time>
            <span>{timeToRead}</span>
          </div>
          <Heading bigger level={1} className="mt-5 font-medium">
            {title}
          </Heading>

          <div className="mt-5 flex items-center gap-x-4">
            <div className="pe-2">
              <span>Share</span>
            </div>
            {socialShare.map((item) => (
              <Link key={item.name} href={item.href} className="text-zinc-600 hover:text-zinc-800">
                <span className="sr-only">{item.name}</span>
                <HugeiconsIcon icon={item.icon} size={20} color="text-zinc-800" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>

        {featuredImage.src && (
          <Image
            alt={featuredImage.alt}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
            src={featuredImage.src}
            width={featuredImage.width || 1200}
            height={featuredImage.height || 630}
            className="mx-auto"
          />
        )}

        <div
          className="mx-auto prose mt-14 lg:prose-xl"
          dangerouslySetInnerHTML={{
            __html: contentHtml,
          }}
        ></div>
      </div>

      <Divider className="my-14 sm:my-20 lg:my-24" />

      <div>
        <Heading>
          <span>More</span> <span data-slot="italic">articles</span>
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:mx-0 xl:grid-cols-3">
          {relatedPosts.map((relatedPost) => (
            <BlogPostCart key={relatedPost.id} post={relatedPost} />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}
