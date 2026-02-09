import { isDevvitEnvironment, callDevvit } from './devvitBridge';

export const generateCaseBriefing = async (title: string, scenario: string) => {
  // 1. Porting Logic: Delegate to Reddit backend via Bridge
  if (isDevvitEnvironment()) {
    return await callDevvit('GENERATE_BRIEFING', { title, scenario });
  }

  // 2. Direct API Fallback (via our Backend Proxy)
  try {
    const response = await fetch('/api/briefing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, scenario }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Briefing Gen Error', error);
    return null;
  }
};
