import { getProviders } from 'next-auth/react'

import LoginButton from './login-button'

export default async function ProvidersLogin() {
  const providers = await getProviders()

  if (!providers) {
    return null
  }

  return (
    <div className="block md:ml-6">
      <div className="flex items-center">
        {providers &&
          Object.values(providers).map((provider) => {
            return <LoginButton key={provider.id} provider={provider} />
          })}
      </div>
    </div>
  )
}
