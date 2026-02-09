import { isDevvitEnvironment, callDevvit } from './devvitBridge';

export const generateCaseBriefing = async (title: string, scenario: string) => {
  // 1. Porting Logic: Delegate to Reddit backend via Bridge
  if (isDevvitEnvironment()) {
    return await callDevvit('GENERATE_BRIEFING', { title, scenario });
  }

  // 2. Standalone/Vercel Mode: Return text-only briefing (no AI generation)
  try {
    return {
      subtitles: `Welcome to the case of ${title}. ${scenario}`,
      audio: null,
      image: null,
    };
  } catch (error) {
    console.error('Briefing Gen Error', error);
    return null;
  }
};
