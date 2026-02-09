import { GoogleGenAI, Modality } from '@google/genai';
import { CaseData } from '../types';
import { isDevvitEnvironment, callDevvit } from './devvitBridge';

export const generatePromoMaterial = async (currentCase: CaseData) => {
  // 1. Porting Logic: Delegate promo generation to the secure Reddit backend
  if (isDevvitEnvironment()) {
    return await callDevvit('GENERATE_PROMO', { currentCase });
  }

  // 2. Direct API Fallback
  // eslint-disable-next-line
  const apiKey = (import.meta as any).env.VITE_GOOGLE_API_KEY || (process as any).env.API_KEY;
  if (!apiKey) throw new Error('API Key not found');
  const ai = new GoogleGenAI({ apiKey });

  try {
    const scriptPrompt = `Voice of the High Court. Cinematic trailer script for: "${currentCase.title}". Somber, authoritative. Under 40 words.`;
    const scriptRes = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: scriptPrompt,
    });
    const scriptText = scriptRes.text?.trim() || 'The weight of justice is heavy.';

    const audioRes = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text: scriptText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } } },
      },
    });

    const audioBase64 = audioRes.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return { script: scriptText, audio: audioBase64 };
  } catch (error) {
    console.error('Director Service Error:', error);
    return { script: 'Order in the court.', audio: null };
  }
};
