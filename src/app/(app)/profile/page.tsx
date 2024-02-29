import UserDetails from '@/components/user-details'
import UserPropertyListing from '@/components/user-property-listing'

export default function ProfilePage() {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
          <h1 className="mb-4 text-3xl font-bold">Your Profile</h1>
          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <UserDetails />

            <div className="w-full md:max-w-[428px] md:pl-4 lg:max-w-[628px] xl:max-w-full">
              <h2 className="mb-4 text-xl font-semibold">Your Listings</h2>
              <UserPropertyListing />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
