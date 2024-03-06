import MainMenu from './main-menu'
import ActionsMenu from './menu'
import ProvidersLogin from './providers-login'

export default function Navbar() {
  return (
    <nav className="border-b border-blue-500 bg-blue-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <MainMenu />

          <ActionsMenu>
            <ProvidersLogin />
          </ActionsMenu>
        </div>
      </div>
    </nav>
  )
}
