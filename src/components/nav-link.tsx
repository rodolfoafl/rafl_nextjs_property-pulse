import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps extends LinkProps {
  children: React.ReactNode
}

export default function NavLink({ ...props }: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      data-current={pathname === props.href}
      className="block rounded-md px-3 py-2 text-white hover:bg-gray-900 hover:text-white data-[current=true]:bg-black
      sm:flex"
      {...props}
    />
  )
}
