# HOPIUM - Therapy Speed, Founder Scale

An AI companion that reframes founder anxiety into hope through personalized voice conversations.

## Current Status - Phase 1 Foundation ✅

### What's Built:
1. ✅ **Full-stack application structure** (FastAPI + React + MongoDB)
2. ✅ **Profile setup form** - captures name, 3 goals, and biggest anxiety
3. ✅ **User profile management API** - create, read, update user profiles
4. ✅ **Clean founder-focused UI** - gradient design with smooth interactions
5. ✅ **"Talk to Hopium" button** - ready for Hume.ai integration
6. ✅ **Database schema** - designed to track conversation metrics for future dashboard

### What's Next:
- 🔜 **Hume.ai voice integration** - User will add later
- 🔜 **Dashboard & streak tracking** - Future phase
- 🔜 **Conversation analytics** - Built into schema, ready to implement

## Tech Stack

- **Frontend**: React 18 + Tailwind CSS
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Voice**: Hume.ai (to be integrated)

## API Endpoints

### Health Check
```bash
GET /api/health
```

### Create Profile
```bash
POST /api/profile
Content-Type: application/json

{
  "name": "Founder Name",
  "goals": ["Goal 1", "Goal 2", "Goal 3"],
  "biggest_anxiety": "Your biggest challenge"
}
```

### Get Profile
```bash
GET /api/profile/{user_id}
```

### Update Profile
```bash
PUT /api/profile/{user_id}
Content-Type: application/json

{
  "name": "Updated Name",
  "goals": ["Goal 1", "Goal 2", "Goal 3"],
  "biggest_anxiety": "Updated anxiety"
}
```

### Log Conversation (for future use)
```bash
POST /api/conversation
Content-Type: application/json

{
  "user_id": "uuid",
  "duration_seconds": 300,
  "emotion_rating": 8,
  "notes": "Optional notes"
}
```

### Get User Conversations (for future dashboard)
```bash
GET /api/conversations/{user_id}
```

## Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017/
HUME_API_KEY=CHnsSO6zKUTXHl0AVJpmZLJaRfht8lW2qaymAGJdRcopdiAM
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=
```
**Note:** Empty string allows frontend to use relative URLs to call backend on same domain

## Running the Application

Services are managed by supervisor:

```bash
# Check status
sudo supervisorctl status

# Restart all services
sudo supervisorctl restart all

# Restart individual services
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
```

## Database Schema

### Users Collection
```javascript
{
  _id: "uuid",
  name: "string",
  goals: ["string", "string", "string"],
  biggest_anxiety: "string",
  created_at: "ISO timestamp",
  updated_at: "ISO timestamp"
}
```

### Conversations Collection (for future)
```javascript
{
  _id: "uuid",
  user_id: "uuid",
  timestamp: "ISO timestamp",
  duration_seconds: int,
  emotion_rating: int (1-10),
  notes: "string"
}
```

## Features Checklist

### Phase 1 (Current) ✅
- [x] Profile setup form
- [x] User profile management API
- [x] Clean UI with founder-focused design
- [x] "Talk to Hopium" button (placeholder)
- [x] Local storage for user sessions
- [x] Edit/reset profile functionality

### Phase 2 (Next)
- [ ] Hume.ai voice integration
- [ ] Real-time voice conversations
- [ ] Personalized reframing prompts
- [ ] Conversation logging

### Phase 3 (Future)
- [ ] Streak counter
- [ ] Emotion tracking after calls
- [ ] Progress dashboard with charts
- [ ] Daily reminders
- [ ] Conversation history

## Design Philosophy

- **Founder-first language**: Performance, potential, unlock, scale
- **Not therapy**: Positioning as a coaching/reframing tool
- **Measurable progress**: Track engagement and emotional trends
- **Personalized**: Every conversation references YOUR goals and challenges

## YC-Ready Pitch Points

1. **Clear value prop**: Unlocks founder potential through increased self-worth
2. **Scalable vision**: Start with founders, expand to all ambitious people
3. **Measurable impact**: Engagement metrics + emotion trends
4. **Demo-able**: Live vulnerability creates emotional connection
5. **AI-native**: Cutting-edge voice AI for real-time reframing

---

**Built for Vibecon 2025** 🚀
