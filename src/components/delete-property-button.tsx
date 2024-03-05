'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { toast } from 'sonner'

import { api } from '@/data/api'
import action from '@/utils/revalidate-properties-tag'

interface DeletePropertyButtonProps {
  propertyId: string
}

export default function DeletePropertyButton({
  propertyId,
}: DeletePropertyButtonProps) {
  async function handleDeleteProperty(propertyId: string) {
    try {
      const res = await api(`/properties/${propertyId}`, {
        method: 'DELETE',
      })

      if (res.status === 200) {
        action()
        return toast.success('Property was deleted')
      }
      return toast.error('Failed to delete the Property')
    } catch (error) {
      console.error('Error deleting property', error)
      return toast.error('Failed to delete the Property')
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          className="rounded-md bg-red-500 px-3 py-3 text-white hover:bg-red-600"
          type="button"
        >
          Delete
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/70" />
        <AlertDialog.Content
          className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[600px] 
          -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6"
        >
          <AlertDialog.Title className="m-0 text-xl font-bold text-zinc-900">
            Are you sure you want to delete this property?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-base text-zinc-500">
            This action cannot be undone.
          </AlertDialog.Description>
          <div className="flex justify-end gap-6">
            <AlertDialog.Cancel
              className="inline-flex h-9 items-center justify-center 
              rounded-md bg-red-500 px-3 py-3 text-base font-medium 
              text-white hover:bg-red-600"
            >
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={() => handleDeleteProperty(propertyId)}
              className="inline-flex h-9 items-center justify-center 
              rounded-md bg-blue-500 px-3 py-3 text-base font-medium 
              text-white hover:bg-blue-600"
            >
              Confirm
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
