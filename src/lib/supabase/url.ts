// Project URL must be the Supabase origin. A pasted /rest/v1 suffix sends Auth to the wrong path.

export function normalizeSupabaseUrl(raw: string): string {
  const url = new URL(raw.trim())
  url.search = ''
  url.hash = ''
  let value = url.toString().replace(/\/$/, '')
  if (value.endsWith('/rest/v1')) {
    value = value.slice(0, -'/rest/v1'.length)
  }
  return value
}
