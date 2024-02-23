import Link from 'next/link'
import { twJoin } from 'tailwind-merge'

interface InfoBoxProps {
  heading: string
  backgroundColor?: string
  textColor?: string
  buttonInfo: {
    href: string
    text: string
    backgroundColor: string
  }
  children: React.ReactNode
}

export default function InfoBox({
  heading,
  backgroundColor = 'bg-gray-100',
  textColor = 'text-gray-800',
  buttonInfo,
  children,
}: InfoBoxProps) {
  return (
    <div className={twJoin('rounded-lg p-6 shadow-md', backgroundColor)}>
      <h2 className={twJoin('text-2xl font-bold', textColor)}>{heading}</h2>
      <p className={twJoin('mb-4 mt-2', textColor)}>{children}</p>
      <Link
        href={buttonInfo.href}
        className={twJoin(
          'inline-block rounded-lg px-4 py-2 text-white hover:opacity-80',
          buttonInfo.backgroundColor,
        )}
      >
        {buttonInfo.text}
      </Link>
    </div>
  )
}
