'use client'

import Image from 'next/image'
import { Gallery, Item } from 'react-photoswipe-gallery'

interface PropertyImageGalleryProps {
  images: string[]
}

export default function PropertyImageGallery({
  images,
}: PropertyImageGalleryProps) {
  return (
    <Gallery>
      <section className="bg-blue-50">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width={1000}
              height={600}
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={
                    images[0].includes('https')
                      ? images[0]
                      : `/images/${images[0]}`
                  }
                  alt=""
                  className="mx-auto h-[400px] rounded-xl object-cover"
                  width={1280}
                  height={720}
                  priority={true}
                  quality={100}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => {
                return (
                  <div
                    key={image}
                    className={`${images.length === 3 && index === 2 ? 'col-span-2' : 'col-span-1'}`}
                  >
                    <Item
                      original={image}
                      thumbnail={image}
                      width={1000}
                      height={600}
                    >
                      {({ ref, open }) => (
                        <Image
                          ref={ref}
                          onClick={open}
                          src={
                            image.includes('https') ? image : `/images/${image}`
                          }
                          alt=""
                          className="h-[400px] w-full rounded-xl object-cover"
                          width={1280}
                          height={720}
                          priority={true}
                          quality={100}
                        />
                      )}
                    </Item>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  )
}
