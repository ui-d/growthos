import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the singular or plural form of a word based on count.
 * @param count - The number to check
 * @param singular - The singular form of the word
 * @param plural - Optional plural form (defaults to singular + 's')
 * @returns The appropriate form of the word
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`)
}

/**
 * Common irregular plurals for words commonly used in the app.
 */
const IRREGULAR_PLURALS: Record<string, string> = {
  'repository': 'repositories',
  'Repository': 'Repositories',
  'category': 'categories',
  'Category': 'Categories',
  'entry': 'entries',
  'Entry': 'Entries',
  'analysis': 'analyses',
  'Analysis': 'Analyses',
  'index': 'indices',
  'Index': 'Indices',
}

/**
 * Returns the plural form of a word, handling common irregular plurals.
 * @param word - The singular word to pluralize
 * @returns The plural form of the word
 */
export function pluralizeWord(word: string): string {
  // Check for known irregular plurals
  if (IRREGULAR_PLURALS[word]) {
    return IRREGULAR_PLURALS[word]
  }
  // Handle words ending in 'y' preceded by a consonant
  if (/[^aeiou]y$/i.test(word)) {
    return word.slice(0, -1) + 'ies'
  }
  // Handle words ending in 's', 'x', 'z', 'ch', 'sh'
  if (/[sxz]$|[cs]h$/i.test(word)) {
    return word + 'es'
  }
  // Default: add 's'
  return word + 's'
}

/**
 * Returns 'a' or 'an' based on whether the following word starts with a vowel sound.
 * @param word - The word that follows the article
 * @returns 'a' or 'an'
 */
export function getArticle(word: string): 'a' | 'an' {
  if (!word) return 'a'
  const firstLetter = word.charAt(0).toLowerCase()
  // Simple vowel check - works for most cases
  return ['a', 'e', 'i', 'o', 'u'].includes(firstLetter) ? 'an' : 'a'
}

/**
 * Returns the word with the appropriate article prepended.
 * @param word - The word to prepend with an article
 * @returns The word with 'a' or 'an' prepended
 */
export function withArticle(word: string): string {
  return `${getArticle(word)} ${word}`
}
