import { BuilderWizardState, SavedSpec } from './types';

const STORAGE_KEYS = {
  RECENT_SPECS: 'growth-os-recent-specs',
  DRAFT_INPUT: 'growth-os-draft-input',
} as const;

const MAX_RECENT_SPECS = 10;

// Helper to check if we're in the browser
const isBrowser = () => typeof window !== 'undefined';

// Get all recent specs
export function getRecentSpecs(): SavedSpec[] {
  if (!isBrowser()) return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RECENT_SPECS);
    if (!stored) return [];

    const specs = JSON.parse(stored) as SavedSpec[];
    // Sort by createdAt descending (newest first)
    return specs.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error('Error loading recent specs:', error);
    return [];
  }
}

// Save a spec to recents (max 10, newest first)
export function saveRecentSpec(spec: SavedSpec): void {
  if (!isBrowser()) return;

  try {
    const current = getRecentSpecs();

    // Add new spec at the beginning
    const updated = [spec, ...current.filter(s => s.id !== spec.id)];

    // Keep only the most recent 10
    const trimmed = updated.slice(0, MAX_RECENT_SPECS);

    localStorage.setItem(STORAGE_KEYS.RECENT_SPECS, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error saving recent spec:', error);
  }
}

// Delete a spec from recents
export function deleteRecentSpec(id: string): void {
  if (!isBrowser()) return;

  try {
    const current = getRecentSpecs();
    const filtered = current.filter(spec => spec.id !== id);
    localStorage.setItem(STORAGE_KEYS.RECENT_SPECS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting recent spec:', error);
  }
}

// Get the draft input
export function getDraftInput(): BuilderWizardState | null {
  if (!isBrowser()) return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DRAFT_INPUT);
    if (!stored) return null;

    return JSON.parse(stored) as BuilderWizardState;
  } catch (error) {
    console.error('Error loading draft input:', error);
    return null;
  }
}

// Save draft input
export function saveDraftInput(input: BuilderWizardState): void {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(STORAGE_KEYS.DRAFT_INPUT, JSON.stringify(input));
  } catch (error) {
    console.error('Error saving draft input:', error);
  }
}

// Clear the draft
export function clearDraft(): void {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(STORAGE_KEYS.DRAFT_INPUT);
  } catch (error) {
    console.error('Error clearing draft:', error);
  }
}

// Debounce helper for autosaving
export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Create a debounced version of saveDraftInput
export const saveDraftInputDebounced = debounce(saveDraftInput, 700);