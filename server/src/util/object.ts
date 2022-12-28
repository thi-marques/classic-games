export function isEmpty<T extends Record<string, any> = {}>(obj?: T | null): boolean {
  if (obj == null) return true

  for (const key in obj) if (obj.hasOwnProperty(key)) return false

  return true
}
