'use client'

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'

import { Property } from '@/data/types/property'

interface ShareButtonsProps {
  property: Property
}

export default function ShareButtons({ property }: ShareButtonsProps) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`

  const formattedHashtag = property.type.replace(/\s/g, '')

  return (
    <>
      <h3 className="pt-2 text-center text-xl font-bold">
        Share this property:
      </h3>

      <div className="flex justify-center gap-3 pb-5">
        <FacebookShareButton
          url={shareUrl}
          hashtag={`#${formattedHashtag}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${formattedHashtag}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=":: "
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property listing: `}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  )
}
