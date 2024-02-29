'use client'

interface DeletePropertyButtonProps {
  propertyId: string
}

export default function DeletePropertyButton({
  propertyId,
}: DeletePropertyButtonProps) {
  function handleDeleteProperty(propertyId: string) {
    console.log('Delete property', propertyId)
  }

  return (
    <button
      onClick={() => handleDeleteProperty(propertyId)}
      className="rounded-md bg-red-500 px-3 py-3 text-white hover:bg-red-600"
      type="button"
    >
      Delete
    </button>
  )
}
