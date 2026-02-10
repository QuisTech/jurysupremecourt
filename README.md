# 🏛️ Reddit Jury: Supreme Court of the Internet

> **Transform doomscrolling into doom-judging. Wield the gavel. Deliver justice.**

[![Built with Devvit](https://img.shields.io/badge/Built%20with-Devvit-FF4500?style=for-the-badge&logo=reddit)](https://developers.reddit.com/)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%202.0-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

---

## 🛠️ Training Mode

<img width="478" height="768" alt="Screenshot (212)" src="https://github.com/user-attachments/assets/378a3740-9256-4b0f-9eb3-517e75419d5b" />
<img width="503" height="768" alt="Screenshot (213)" src="https://github.com/user-attachments/assets/bd6b3dd9-848d-45a3-b0df-6670481ff824" />
<img width="512" height="768" alt="Screenshot (214)" src="https://github.com/user-attachments/assets/242a535b-1681-44a4-8b0d-2c0c71248830" />
<img width="505" height="768" alt="Screenshot (215)" src="https://github.com/user-attachments/assets/dec5cb02-0f69-495a-9e88-63882aebedf6" />
<img width="515" height="768" alt="Screenshot (216)" src="https://github.com/user-attachments/assets/86979689-eac8-449f-a2dc-b6c05fed8f44" />
<img width="711" height="768" alt="Screenshot (217)" src="https://github.com/user-attachments/assets/481a2648-7a5d-46b8-a8cd-52d8c031e76b" />
<img width="401" height="768" alt="Screenshot (218)" src="https://github.com/user-attachments/assets/1290d48b-859b-406f-ba8f-04441c548703" />
<img width="498" height="768" alt="Screenshot (219)" src="https://github.com/user-attachments/assets/2a7fe30d-f530-45cb-ad6d-01b2ac39f181" />

---

## 🎯 Inspiration

Reddit is already the internet's largest courtroom. Millions judge strangers' actions daily in communities like r/AmITheAsshole. We asked: _What if passive judgment became active justice?_

**Reddit Jury** transforms casual moral debates into an immersive judicial experience—complete with evidence examination, dramatic verdicts, and satirical legal opinions.

### The Evolution

**Phase 1 Vision:** A cutting-edge multi-modal AI playground with real-time courtroom sketches, professional voiceovers, and three specialized Gemini models.

**Phase 2 Reality:** When Reddit's platform constraints forced us to pivot, we didn't compromise—we innovated. The result? A smarter, leaner architecture that preserves 90% of our original vision while adding features we never imagined.

---

## ⚖️ What It Does

**Reddit Jury** is a daily moral dilemma game where you become a Supreme Court Justice of the Internet.

### Core Features

🗂️ **Daily Docket**  
Fresh cases every day—AI-generated or curated from our library of 100+ immersive scenarios.

🔍 **Evidence Examination**  
Review testimony, exhibits, and context. Every detail matters in your ruling.

⚖️ **The Gavel**  
Cast your verdict with a physics-based voting mechanic that makes every decision feel weighty.

📜 **Judicial Opinions**  
Receive AI-generated satirical legal justifications that reveal the moral complexity of your choice.

🎬 **Director's Mode**  
Automated video creation system with browser-native TTS narration—perfect for social sharing.

📊 **Reputation System**  
Build karma, maintain streaks, and track your judicial history across 100+ cases.

🌐 **True Offline Mode**  
Full functionality without internet—play anywhere, anytime.

---

## 🛠️ How We Built It

### Tech Stack

**Frontend**

- React 19 + TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Custom physics engine for "gavel" mechanic

**Backend**

- Reddit Devvit (server-side rendering & state)
- Google Gemini 2.0 Flash (AI case generation & verdicts)
- Redis (via Devvit Key-Value Store)

**Audio/Video**

- Browser-native `window.speechSynthesis` API (zero-cost TTS)
- MediaRecorder API with virtual camera system
- Web Audio API for sound effects

**Deployment**

- **Reddit:** Full Devvit integration with Redis backend
- **Vercel:** Standalone web version with localStorage fallbacks

### Architectural Innovation

We built **two complete architectures**:

1. **Devvit Version:** Server-side AI with Redis state management
2. **Standalone Version:** Client-side case library with localStorage persistence

Both share 95% of the same codebase through intelligent abstraction layers.

---

## 💪 Challenges We Overcame

### Phase 1: The Ambitious Vision

- **Multi-Modal Sync:** Coordinating AI-generated audio, images, and text
- **Prompt Engineering:** Teaching LLMs to be satirically critical without triggering safety filters
- **Real-Time Performance:** Generating media on-the-fly without latency

### Phase 2: The Platform Reality

- **Reddit's Sandbox:** Devvit couldn't support our multi-modal AI vision
- **API Limitations:** Strict external call limits forced architectural redesign
- **Resource Constraints:** Memory/processing caps required aggressive optimization
- **Offline Reliability:** Building seamless fallbacks for API failures
- **Browser Restrictions:** Working around autoplay policies and iframe sandboxing

### Our Solution

Instead of compromising, we **built smarter**:

- Consolidated 3 AI models into 1 optimized Gemini instance
- Replaced expensive TTS APIs with browser-native synthesis
- Created a 100+ case offline library with pre-written verdicts
- Designed a dual-deployment strategy (Reddit + Vercel)

---

## 🏆 Accomplishments

✨ **Director's Mode**  
First-of-its-kind automated video creation within Reddit's constraints—complete with virtual camera tracking and browser TTS narration.

🎯 **Platform Adaptation**  
Successfully pivoted from multi-AI architecture to single-model optimization without losing core gameplay.

⚖️ **The "Gavel" Feel**  
Perfected physics and audio design that makes voting feel consequential and satisfying.

🔊 **Zero-Cost Audio**  
Implemented fully functional TTS using browser-native APIs—no external services required.

🌐 **Seamless Offline Experience**  
Fallback system so robust that users never know when they're offline.

🏗️ **Dual Architecture**  
Designed, built, and deployed two complete technical solutions for different platforms.

---

## 📚 What We Learned

1. **Constraint Breeds Innovation**  
   Reddit's limitations forced us to build smarter, not bigger.

2. **The 90% Rule**  
   You can preserve most of a vision with clever architecture, even with significant constraints.

3. **Hybrid is Heroic**  
   Server-side AI + client-side interactivity = best of both worlds.

4. **Browser APIs are Underrated**  
   Native capabilities can replace expensive external services.

5. **Prompt Engineering = Game Design**  
   System prompts became our primary game balancing tool.

6. **Imperfection Adds Charm**  
   Sometimes "good enough" AI responses enhance humor and replayability.

7. **Architecture Flexibility Matters**  
   The ability to pivot technical approaches is as important as the initial vision.

---

## 🚀 What's Next

### Short-Term (Platform-Compatible)

- 👥 **Multiplayer Juries:** Real-time lobbies for group deliberations
- 📝 **User Appeals:** Community-driven case submissions
- 🎨 **LCARS Interface:** Sci-fi legal aesthetic overhaul
- 🔗 **Reddit Integration:** Auto-pull cases from r/AITA

### Long-Term (When Platform Evolves)

- 🖼️ **Multi-Modal Return:** AI-generated courtroom sketches
- 🎙️ **Advanced Voice Synthesis:** Professional-grade AI narration
- 🎲 **Procedural Evidence:** Dynamic case elements based on decisions
- 🌍 **Cross-Platform Expansion:** Beyond Reddit

**Our Promise:** We've built an architecture that scales with platform capabilities—when Reddit's constraints ease, our original multi-modal vision is ready to deploy.

---

## 🎮 Getting Started

### Prerequisites

- Node.js 22+
- Reddit Developer Account

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/jurysupremecourt.git
cd jurysupremecourt

# Install dependencies
npm install

# Start development server
npm run dev
```

### Commands

- `npm run dev` - Start development server on Reddit
- `npm run build` - Build client and server
- `npm run deploy` - Upload new version to Reddit
- `npm run launch` - Publish for review
- `npm run check` - Type check, lint, and format

---

## 🏗️ Project Structure

```
jurysupremecourt/
├── src/
│   ├── client/          # React frontend
│   │   ├── game/        # Game components
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── data/    # 100+ immersive cases
│   │   └── splash/      # Landing page
│   ├── server/          # Devvit backend
│   │   ├── core/        # Reddit integration
│   │   └── data/        # Server-side cases
│   └── shared/          # Shared types
├── devvit.json          # Devvit configuration
└── vercel.json          # Vercel deployment config
```

---

## 🤝 Contributing

We welcome contributions! Whether it's:

- 📝 New case scenarios
- 🎨 UI/UX improvements
- 🐛 Bug fixes
- ✨ Feature additions

Please open an issue or submit a PR.

---

## 📜 License

MIT License - see [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

- **Reddit Devvit Team** - For the incredible developer platform
- **Google Gemini** - For powering our AI-generated content
- **r/AmITheAsshole** - For endless inspiration

---

## 📞 Contact

- **Developer:** u/Medium_Focus_447
- **GitHub:** [QuisTech/redditjurysupremecourt](https://github.com/QuisTech/redditjurysupremecourt)

---

<div align="center">

**⚖️ Justice is Daily ⚖️**

_Built with ❤️ for the Reddit Hackathon_

</div>
