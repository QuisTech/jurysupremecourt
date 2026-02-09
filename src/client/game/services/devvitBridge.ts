/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Devvit Bridge: Handles window.parent.postMessage communication
 * following the Reddit Developer Platform standard.
 */

type DevvitResponse = {
  type: string;
  payload: any;
  requestId: string;
  error?: string;
};

const pendingRequests = new Map<string, (value: any) => void>();

// Listen for responses from Devvit Parent
if (typeof window !== 'undefined') {
  window.addEventListener('message', (event) => {
    // Basic security check: in production, you'd check event.origin
    const data = event.data as DevvitResponse;

    // Handshake confirmation from Reddit Backend
    if (data.type === 'READY_ACK') {
      console.log('Reddit Devvit Bridge: Securely Connected.');
      return;
    }

    if (data.requestId && pendingRequests.has(data.requestId)) {
      const resolve = pendingRequests.get(data.requestId);
      if (resolve) {
        if (data.error) {
          console.error(`Devvit Bridge Error [${data.type}]:`, data.error);
        }
        resolve(data.payload);
        pendingRequests.delete(data.requestId);
      }
    }
  });
}

/**
 * Sends a message to the Devvit backend and waits for a response.
 */
export async function callDevvit(type: string, payload: any = {}): Promise<any> {
  const requestId = Math.random().toString(36).substring(7);

  return new Promise((resolve) => {
    pendingRequests.set(requestId, resolve);

    // In Devvit, window.parent is the Reddit app
    safePostMessage({
      type,
      payload,
      requestId,
    });

    // Safety timeout
    setTimeout(() => {
      if (pendingRequests.has(requestId)) {
        console.warn(`Devvit Bridge Timeout on [${type}]. Are we in a Reddit environment?`);
        // In dev/standalone, we can't wait forever
        resolve(null);
        pendingRequests.delete(requestId);
      }
    }, 15000);
  });
}

/**
 * Helper to check if we are in the Devvit Webview
 * Robust check to avoid false positives/negatives in sandboxed iframes.
 */
export function isDevvitEnvironment(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    // If we are in an iframe, we *might* be in Devvit.
    // If accessing window.parent throws SecurityError, we definitely are in a cross-origin iframe (likely Devvit or AI Studio).
    // If window.parent === window, we are not in an iframe.
    return window.parent !== window;
  } catch (e) {
    // SecurityError means we are in a cross-origin iframe, so treat as Devvit/Embed.
    return true;
  }
}

/**
 * Safely posts a message to the parent window.
 */
export function safePostMessage(message: any) {
  try {
    window.parent.postMessage(message, '*');
  } catch (e) {
    console.error('Devvit Bridge: Failed to post message to parent.', e);
  }
}
