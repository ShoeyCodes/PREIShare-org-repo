// Create page under the protected dashboard layout.
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import {
  ListingForm,
  type ListingFormValues,
} from '../../../components/listings/ListingForm'
import { createListing, type ListingMutationResult } from '../../../server/listings'

export const Route = createFileRoute('/dashboard/listings/new')({
  component: NewListingPage,
})

function NewListingPage() {
  const navigate = useNavigate()
  const createListingFn = useServerFn(createListing)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(values: ListingFormValues) {
    setErrorMessage(null)
    setIsSubmitting(true)
    try {
      const result = await createListingFn({ data: values })
      if (!result.ok) {
        setErrorMessage(formatListingError(result))
        return
      }
      await navigate({ to: '/dashboard/listings' })
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Could not create listing. Try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section aria-labelledby="new-listing-heading" className="p-4 md:p-6">
      <h1 id="new-listing-heading" className="text-2xl font-semibold text-slate-900">
        Add a property listing
      </h1>
      <ListingForm
        onSubmit={handleSubmit}
        submitLabel="Create listing"
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
      />
    </section>
  )
}

function formatListingError(result: Extract<ListingMutationResult, { ok: false }>): string {
  if (!result.fieldErrors) return result.error
  const details = Object.entries(result.fieldErrors)
    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
    .join(' ')
  return details ? `${result.error} ${details}` : result.error
}
