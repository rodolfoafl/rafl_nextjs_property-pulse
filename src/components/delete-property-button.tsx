'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog'

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
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          onClick={() => handleDeleteProperty(propertyId)}
          className="rounded-md bg-red-500 px-3 py-3 text-white hover:bg-red-600"
          type="button"
        >
          Delete
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="absolute inset-0 bg-black/70" />
        <AlertDialog.Content>
          <AlertDialog.Title>
            Are you sure you want to delete this property?
          </AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone.
          </AlertDialog.Description>
          <AlertDialog.Cancel />
          <AlertDialog.Action />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
