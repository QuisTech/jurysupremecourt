import { CaseData } from '../types';

export const generateAiCase = async (): Promise<CaseData | null> => {
  // Always go through our backend to leverage robust fallbacks/offline mode
  try {
    // Get seen IDs from session storage to prevent repeats
    const seenStorage = sessionStorage.getItem('seen_case_ids');
    const seenIds = seenStorage ? JSON.parse(seenStorage) : [];

    const response = await fetch('/api/generate-case', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seenIds }),
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    // Add new case ID to seen list
    if (data.id) {
      const newSeen = [...seenIds, data.id];
      sessionStorage.setItem('seen_case_ids', JSON.stringify(newSeen));
    }

    return data;
  } catch (error) {
    console.error('Error generating AI case:', error);
    // In rare case fetch itself fails (network), return null and app should handle gracefully
    // But server endpoint already handles AI failures by returning mocks.
    return null;
  }
};
