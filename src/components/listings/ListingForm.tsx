// Labeled fields aligned with src/lib/listings/schema.ts. Props only.

export type ListingFormValues = {
  title: string
  address_line1: string
  city: string
  price: string
  description?: string
}

export type ListingFormProps = {
  onSubmit: (values: ListingFormValues) => void | Promise<void>
  submitLabel?: string
  errorMessage?: string | null
  isSubmitting?: boolean
}

export function ListingForm({
  onSubmit,
  submitLabel = 'Save listing',
  errorMessage = null,
  isSubmitting = false,
}: ListingFormProps) {
  return (
    <form
      className="mt-6 max-w-lg space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        const form = event.currentTarget
        const data = new FormData(form)
        const description = String(data.get('description') ?? '').trim()
        const values: ListingFormValues = {
          title: String(data.get('title') ?? ''),
          address_line1: String(data.get('address_line1') ?? ''),
          city: String(data.get('city') ?? ''),
          price: String(data.get('price') ?? ''),
        }
        if (description) values.description = description
        void onSubmit(values)
      }}
    >
      {errorMessage ? (
        <p role="alert" className="text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <div>
        <label className="block text-sm font-medium" htmlFor="listing-title">
          Title
        </label>
        <input
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          id="listing-title"
          name="title"
          type="text"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="listing-address">
          Street address
        </label>
        <input
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          id="listing-address"
          name="address_line1"
          type="text"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="listing-city">
          City
        </label>
        <input
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          id="listing-city"
          name="city"
          type="text"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="listing-price">
          Price
        </label>
        <input
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          id="listing-price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="listing-description">
          Description
        </label>
        <textarea
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          id="listing-description"
          name="description"
          disabled={isSubmitting}
        />
      </div>

      <button
        className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}
