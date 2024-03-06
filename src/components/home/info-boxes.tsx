import InfoBox from './info-box'

export default function InfoBoxes() {
  return (
    <section>
      <div className="container-xl m-auto lg:container">
        <div className="grid grid-cols-1 gap-4 rounded-lg p-4 md:grid-cols-2">
          <InfoBox
            heading="For Renters"
            backgroundColor="bg-gray-100"
            textColor=""
            buttonInfo={{
              text: 'Browse Properties',
              href: '/properties',
              backgroundColor: 'bg-black',
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading="For Property Owners"
            backgroundColor="bg-blue-100"
            textColor=""
            buttonInfo={{
              text: 'Add Property',
              href: '/properties/add',
              backgroundColor: 'bg-blue-500',
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  )
}
