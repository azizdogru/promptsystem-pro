export const CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'zc43rdtibp';

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

/**
 * Tracks a custom event in Microsoft Clarity and optionally sets session attributes.
 *
 * @param eventName Name of the event (e.g. 'checkout_clicked', 'step_1_completed')
 * @param metadata Optional key-value pairs to set as custom session tags in Clarity
 */
export function trackClarityEvent(
  eventName: string,
  metadata?: Record<string, string | number | boolean | null | undefined>
) {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.clarity === 'function') {
      window.clarity('event', eventName);
      if (metadata) {
        Object.entries(metadata).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            window.clarity?.('set', key, String(value));
          }
        });
      }
    }
  } catch (error) {
    console.warn('Clarity tracking error:', error);
  }
}
