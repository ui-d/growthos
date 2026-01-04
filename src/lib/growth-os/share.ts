import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { BuilderWizardState } from './types';

// Encode BuilderWizardState to a shareable URL parameter
export function encodeShareableInput(input: BuilderWizardState): string {
  try {
    const json = JSON.stringify(input);
    return compressToEncodedURIComponent(json);
  } catch (error) {
    console.error('Failed to encode shareable input:', error);
    throw new Error('Failed to encode configuration for sharing');
  }
}

// Decode URL parameter back to BuilderWizardState
export function decodeShareableInput(encoded: string): BuilderWizardState | null {
  try {
    const decompressed = decompressFromEncodedURIComponent(encoded);
    if (!decompressed) {
      return null;
    }

    const parsed = JSON.parse(decompressed);

    // Validate that we have a valid BuilderWizardState
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as BuilderWizardState;
    }

    return null;
  } catch (error) {
    console.error('Failed to decode shareable input:', error);
    return null;
  }
}

// Generate a shareable URL for the given input
export function generateShareUrl(input: BuilderWizardState, baseUrl?: string): string {
  const encoded = encodeShareableInput(input);
  const base = baseUrl || window?.location?.origin || '';
  return `${base}/s?d=${encoded}`;
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}