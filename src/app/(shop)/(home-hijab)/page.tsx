import { Divider } from '@/components/divider'
import FeatureSection1 from '@/components/sections/feature-section-1'
import FeatureSection2 from '@/components/sections/feature-section-2'
import FeatureSection3 from '@/components/sections/feature-section-3'
import HeroSection1 from '@/components/sections/hero-section-1'
import SectionBiggestHeading from '@/components/sections/section-biggest-heading'
import SectionBlogCarousel from '@/components/sections/section-blog-carousel'
import SectionProductCarousel from '@/components/sections/section-product-carousel'
import { getCollections } from '@/data'
import clsx from 'clsx'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hijab',
  description:
    'Discover the latest trends in fashion and style with our curated collection of clothing, accessories, and more.',
}

export default async function Home() {
  let collections = await getCollections('hijab')
  return (
    <div>
      <HeroSection1 className="container mt-14" />
      <SectionBiggestHeading className="container mt-20 sm:mt-28 lg:mt-32 2xl:mt-20" />
      {collections
        ?.filter((_, i) => i < 3)
        .map((collection, index) => (
          <SectionProductCarousel
            key={index}
            className={clsx('container', index === 0 ? 'mt-44' : 'mt-36')}
            products={collection?.products}
            collectionTitle={collection?.title}
            collectionHandle={collection?.handle}
            collectionDescription={collection?.description ?? undefined}
          />
        ))}
      <FeatureSection1 className="container mt-16 sm:mt-20 lg:mt-24" />
      <FeatureSection2 className="container mt-20 sm:mt-28 lg:mt-32" />
      <div className="container mt-8 sm:mt-12 lg:mt-16">
        <Divider />
      </div>
      <FeatureSection3
        className="mt-0 pt-0"
        heading={`Transform your <span data-slot="italic">Home with Nature</span> , with our premium salt gallery and gourmet essentials.`}
        collection1={{
          title: '<span data-slot="italic">Premium Salt</span> Lamps',
          desciption: 'Shop authentic Himalayan salt lamps today at SaltRosa and experience the natural beauty of handcrafted salt decor.',
          images: [
            '/images/salt-lamps/dove.avif',
            '/images/salt-lamps/nest-lamp.avif',
            '/images/salt-lamps/heart-lamp.avif',
            '/images/salt-lamps/sphere-lamp.avif',
            '/images/salt-lamps/fire-pit-salt-lamp.avif',
          ],
        }}
        // collection2={{
        //   title: '<span data-slot="italic">Premium Edible</span> Salt',
        //   desciption: 'Experience unparalleled comfort with our breathable hijabs, perfect for any season.',
        //   images: [
        //     '/images/hijab/essential-modal-1-1.webp',
        //     '/images/hijab/essential-modal-1-1.webp',
        //     '/images/hijab/essential-modal-1.webp',
        //     '/images/hijab/essential-modal-3.webp',
        //     '/images/hijab/essential-modal-4.webp',
        //   ],
        // }}
      />
      <div className="container mt-20 sm:mt-28 lg:mt-32">
        <Divider />
      </div>
      <SectionBlogCarousel className="container mt-20" />
    </div>
  )
}
