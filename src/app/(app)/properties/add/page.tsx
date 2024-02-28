import AddPropertyForm from '@/components/add-property-form'

export default function PropertyAddPage() {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
          <AddPropertyForm />
        </div>
      </div>
    </section>
  )
}
