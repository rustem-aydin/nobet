import { Heart, Baby } from 'lucide-react'

/** İsimleri whitelist / blacklist olarak elle tutuyoruz */
export const WHITELIST_NAMES = ['Akif ŞAHİN'] // örnek
export const BLACKLIST_NAMES = ['Mehmet Furkan Güneş', 'Zeynep Kaya'] // örnek

/**
 * Verilen tam isme göre uygun ikonu döner.
 * Whitelist → Heart, Blacklist → Baby, hiçbiri değilse null
 */
export function getPersonnelIcon(fullName: string) {
  const normalized = fullName.toLowerCase()
  if (WHITELIST_NAMES.map((n) => n.toLowerCase()).includes(normalized)) return Heart
  if (BLACKLIST_NAMES.map((n) => n.toLowerCase()).includes(normalized)) return Baby
  return null
}
