import Image from 'next/image'

interface PropertyHeaderImageProps {
  image: string
}

export default function PropertyHeaderImage({
  image,
}: PropertyHeaderImageProps) {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={`/images/${image}`}
            alt=""
            className="h-[400px] w-full object-cover"
            width={1280}
            height={720}
            quality={100}
            priority={true}
          />
        </div>
      </div>
    </section>
  )
}
