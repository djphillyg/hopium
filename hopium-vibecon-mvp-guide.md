# HOPIUM - Therapy Speed, Founder Scale
## Vibecon 48-Hour MVP Guide

---

## The Pitch (30 seconds)

"Founders need unshakeable self-belief to build world-changing companies. But therapy takes months and coaches are expensive. Hopium is your AI companion that reframes anxiety into hope in real-time voice conversations - personalized to YOUR goals, available 24/7. It's Duolingo for self-worth: daily practice that compounds into unshakeable confidence."

---

## Your Founder Story Hook

"YC backs founders who believe they can change the world. But belief is fragile - one bad investor call, one toxic co-founder moment, and your sparkle dims. I lost mine for a while. I got it back.

What if we could empower founders to increase their self-worth to their potential? Every marginal percentage point of increased self-belief means bolder bets, faster recovery from setbacks, and better companies.

We're not building therapy - we're building a performance tool that unlocks founder potential."

---

## 48-Hour MVP Scope (12-15 hours coding)

### Core Features (Must-Have)

#### 1. Profile Setup Flow (30 min build)
- Simple form capturing:
  - Name
  - Current goals (3 bullet points)
  - Biggest anxiety/challenge right now
- Stored in emergent.sh state
- This is what makes the voice agent personalized to YOU

#### 2. Voice Call with VAPI (6-8 hours build)
- Integration with VAPI for voice interface
- Custom prompt that:
  - References user's profile (goals + anxiety)
  - Uses "Hopium agent" persona: warm, founder-focused, reframing negative → hope
  - Structured to ask questions, listen deeply, then reflect hope back
  - Avoids generic therapy-speak - uses founder language (YC-style)
- Call initiated from simple "Talk to Hopium" button
- Duration: 5-10 minute conversations
- Real-time voice interaction (speak your worries, hear hope back)

#### 3. Progress Dashboard (3-4 hours build)
- **Streak counter**: Days in a row you've used Hopium
- **Simple emotion tracking**: After each call, rate how you feel (1-10 scale)
- **Line chart**: Emotion trend over time
- **Total minutes**: Time spent with Hopium
- **Duolingo-style celebrations**: When you hit streaks (3 days, 7 days, etc.)

#### 4. Daily Reminder (1 hour build)
- Simple notification/email: "Your daily Hopium is waiting"
- Maintains the streak mechanic
- Could be time-based (e.g., 7pm daily) or smart (if you haven't called today)

### Nice-to-Have (If Time Permits)
- Post-call summary (AI-generated insights from the conversation)
- Sharable streak widget ("I've practiced self-belief for 14 days straight")
- Integration with journal entries (feed context into future calls)
- Voice affirmations based on your profile

---

## Demo Script (2-3 minutes)

### Setup (15 seconds)
"This is Hopium. I've been using it for [X] days to maintain my self-belief through the stress of building."

### Profile Show (15 seconds)
[Screen shows your profile]
```
Goal: Launch Hopium at Vibecon
Biggest anxiety: What if my demo flops?
```

### Live Call (90 seconds)
"Let me show you how it works - I'm going to share a real worry right now."

[Click "Talk to Hopium" button]

[Have a 60-90 second voice conversation where you express genuine anxiety about the competition, and Hopium reframes it back to you in real-time, referencing your goals]

**Example conversation:**
- You: "I'm worried that my idea isn't ambitious enough for YC. Everyone else seems to be building the next SpaceX..."
- Hopium: [Reframes using your profile, reminds you of your unique insight about founder mental health being a performance lever, validates the worry while redirecting to hope]

### Dashboard (30 seconds)
[After call ends: show the dashboard updating]
- Streak increments
- Emotion rating captured (you rate post-call)
- Trend line moves
- Minutes tracked

"This is how it compounds. Small daily practices in self-belief, tracked and reinforced. Therapy speed, founder scale."

---

## Technical Stack (for emergent.sh)

### Frontend
- Next.js/React page with emergent.sh
- Simple UI components:
  - Profile setup form
  - Big "Talk to Hopium" CTA button
  - Dashboard with charts/metrics
  - Emotion rating slider (post-call)
- Chart.js or Recharts for emotion trends visualization
- Tailwind CSS for quick styling

### Backend/Integrations
- **VAPI** for voice interface (you'll need VAPI API key)
- **Anthropic Claude API** for the reframing prompt (configured via VAPI)
- **emergent.sh state management** for:
  - User profile data
  - Call history (timestamp, duration, emotion rating)
  - Streak calculation logic

### Custom Prompt for Voice Agent

```
You are Hopium, an AI companion for founders who need to maintain unshakeable self-belief while building world-changing companies.

User Context:
- Goals: [USER_GOALS]
- Current Challenge: [USER_ANXIETY]

Your role:
1. Listen deeply to what they're worried about
2. Acknowledge the real difficulty (don't dismiss or minimize)
3. Reframe their thoughts toward hope, agency, and their existing strengths
4. Reference their specific goals to remind them why they started
5. Use founder language - not therapy speak. Think Y Combinator, not counselor.
6. Be concise but warm. Think coach, not clinician.

Conversation guidelines:
- Keep responses concise (30-60 seconds each)
- Ask clarifying questions to understand deeper
- Help them see the worry differently - same facts, new frame
- End with actionable hope (what they can do right now)

Tone: Confident, warm, direct, optimistic without being toxic positivity
```

---

## Realistic 48-Hour Timeline

### Day 1 (Saturday)
- **Morning** (2 hours): Attend opening session + network with sponsors
- **Midday** (3 hours): Build profile setup + basic UI shell
- **Afternoon** (2 hours): Workshop or sponsor demos (Amazon/Emergent/Anthropic)
- **Evening** (4 hours): VAPI integration + voice prompt engineering

### Day 2 (Sunday)
- **Morning** (3 hours): Dashboard + streak logic + emotion tracking
- **Midday** (2 hours): Workshop or networking time
- **Afternoon** (3 hours): Polish, test demo flow end-to-end, prep pitch deck
- **Evening**: Final demos + judging

**Total Coding Time: ~13 hours**
**Total Networking/Workshop Time: ~6 hours**

---

## Why This Wins with YC

1. **Authentic founder story** - You lived the problem (losing your sparkle), built the solution
2. **Clear value proposition** - Unlocks founder potential through increased self-worth
3. **Scalable vision** - Start with founders, expand to anyone with ambition (athletes, artists, students)
4. **Measurable impact** - Streak mechanics prove engagement, emotion trends prove efficacy
5. **Timely market need** - Founder mental health is a known crisis, this is a fresh angle
6. **Demo-able** - Live vulnerability in the demo creates emotional connection with judges
7. **Network effects potential** - "Share your streak" feature could drive viral growth
8. **AI-native** - Uses cutting-edge voice AI (sponsors will love seeing VAPI/Claude in action)

---

## Risks & Mitigations

### Risk: VAPI integration takes longer than expected
**Mitigation:** Build text-based chat version first as fallback, upgrade to voice if time permits. Text still demonstrates the reframing concept.

### Risk: Voice demo fails live (network/tech issues)
**Mitigation:** Have pre-recorded demo video as backup. Walk through it as if it were live. Judges understand hackathon tech fails.

### Risk: Feels too "therapy-ish" and not "founder-ish"
**Mitigation:** Language matters everywhere. Use words like:
- ✅ "Performance," "potential," "unlock," "scale," "competitive advantage"
- ❌ "Healing," "wellness," "self-care," "mental health"

Frame it as: **"What if self-belief was a trainable skill, like coding?"**

### Risk: Judges question AI therapy ethics / safety
**Mitigation:** Position clearly as coaching/reframing tool, not therapy:
- Not diagnosing mental health conditions
- Not replacing professional help
- Empowering people who are already functional to reach their potential
- Think "performance coach" not "therapist"

### Risk: Demo is too personal/vulnerable and backfires
**Mitigation:** Practice the demo worry beforehand. Choose something relatable to founders but not too raw. Example: "What if I'm not technical enough?" or "What if my idea has already been done?"

---

## Post-Vibecon: Growth Ideas

If this gets traction, here's how it could scale:

### Short-term (3 months)
- Founder-focused beta (Product Hunt launch)
- Integration with founder tools (Linear, Notion, Slack)
- Community features (shared streaks, accountability partners)

### Medium-term (6-12 months)
- Expand beyond founders to other high-performers
- Add journaling feature (text inputs feed voice conversations)
- Partner with accelerators (YC, Techstars) as mental performance tool
- Subscription model ($20/mo for unlimited calls)

### Long-term vision
- "Duolingo for self-belief" - everyone deserves access to hope
- White-label for therapists/coaches (augment their practice)
- Research partnerships (measure impact on founder outcomes)
- The platform that helps people believe in their potential

---

## Key Success Metrics

### For Vibecon Demo
- Judges emotionally connect during live voice demo
- Clear "aha moment" when they see the reframing in action
- Streak dashboard shows compounding value over time

### For MVP Validation (if you launch)
- Daily Active Users (DAU) / retention rate
- Average streak length (engagement proxy)
- Emotion rating delta (before call → after call)
- Qualitative feedback: "This helped me believe in myself again"

---

## Final Thoughts

**Core Insight:** Self-belief is the bottleneck for founder potential. Traditional solutions (therapy, coaching) don't scale. AI-powered real-time reframing can be the performance tool that unlocks the next generation of world-changing companies.

**What makes this special:** It's not generic AI therapy. It's personalized to YOUR goals, uses YOUR language, and treats self-belief as a trainable skill with measurable progress.

**The magic moment:** When a founder hears their own anxiety reframed into hope, in their own context, in real-time - that's when they realize this could actually work.

---

## Resources & Next Steps

### Before Vibecon
- [ ] Sign up for VAPI account and get API key
- [ ] Familiarize yourself with emergent.sh documentation
- [ ] Draft your profile (be the first user - eat your own dog food)
- [ ] Practice the demo script out loud
- [ ] Prepare backup slides in case of tech failure

### At Vibecon
- [ ] Network with Anthropic/Emergent sponsors (they're your ideal partners)
- [ ] Test VAPI integration early (don't wait until Sunday evening)
- [ ] Get feedback from other builders throughout (iterate fast)
- [ ] Record your demo for social proof later

### After Vibecon
- [ ] Follow up with judges/sponsors who showed interest
- [ ] Ship beta version to ProductHunt
- [ ] Post demo video on Twitter/LinkedIn with your story
- [ ] Apply to YC with this as your product (if top 3, you're already in!)

---

**Good luck! Build something that helps people believe in themselves. The world needs more hope. 🚀**
