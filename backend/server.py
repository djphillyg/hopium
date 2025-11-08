from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv
import uuid

load_dotenv()

app = FastAPI(title="Hopium API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client['hopium_db']
users_collection = db['users']
conversations_collection = db['conversations']

# Pydantic models
class UserProfile(BaseModel):
    name: str
    goals: List[str] = Field(..., min_items=3, max_items=3)
    biggest_anxiety: str

class UserProfileResponse(BaseModel):
    id: str
    name: str
    goals: List[str]
    biggest_anxiety: str
    created_at: str
    updated_at: str

class ConversationLog(BaseModel):
    user_id: str
    duration_seconds: Optional[int] = None
    emotion_rating: Optional[int] = None
    notes: Optional[str] = None

# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Hopium API"}

# Create user profile
@app.post("/api/profile", response_model=UserProfileResponse)
async def create_profile(profile: UserProfile):
    try:
        user_id = str(uuid.uuid4())
        current_time = datetime.utcnow().isoformat()
        
        user_doc = {
            "_id": user_id,
            "name": profile.name,
            "goals": profile.goals,
            "biggest_anxiety": profile.biggest_anxiety,
            "created_at": current_time,
            "updated_at": current_time
        }
        
        users_collection.insert_one(user_doc)
        
        return UserProfileResponse(
            id=user_id,
            name=profile.name,
            goals=profile.goals,
            biggest_anxiety=profile.biggest_anxiety,
            created_at=current_time,
            updated_at=current_time
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating profile: {str(e)}")

# Get user profile
@app.get("/api/profile/{user_id}", response_model=UserProfileResponse)
async def get_profile(user_id: str):
    try:
        user = users_collection.find_one({"_id": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return UserProfileResponse(
            id=user["_id"],
            name=user["name"],
            goals=user["goals"],
            biggest_anxiety=user["biggest_anxiety"],
            created_at=user["created_at"],
            updated_at=user["updated_at"]
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching profile: {str(e)}")

# Update user profile
@app.put("/api/profile/{user_id}", response_model=UserProfileResponse)
async def update_profile(user_id: str, profile: UserProfile):
    try:
        user = users_collection.find_one({"_id": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        current_time = datetime.utcnow().isoformat()
        
        update_doc = {
            "name": profile.name,
            "goals": profile.goals,
            "biggest_anxiety": profile.biggest_anxiety,
            "updated_at": current_time
        }
        
        users_collection.update_one(
            {"_id": user_id},
            {"$set": update_doc}
        )
        
        return UserProfileResponse(
            id=user_id,
            name=profile.name,
            goals=profile.goals,
            biggest_anxiety=profile.biggest_anxiety,
            created_at=user["created_at"],
            updated_at=current_time
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating profile: {str(e)}")

# Log conversation (for future use)
@app.post("/api/conversation")
async def log_conversation(conversation: ConversationLog):
    try:
        conversation_id = str(uuid.uuid4())
        current_time = datetime.utcnow().isoformat()
        
        conversation_doc = {
            "_id": conversation_id,
            "user_id": conversation.user_id,
            "timestamp": current_time,
            "duration_seconds": conversation.duration_seconds,
            "emotion_rating": conversation.emotion_rating,
            "notes": conversation.notes
        }
        
        conversations_collection.insert_one(conversation_doc)
        
        return {"id": conversation_id, "status": "logged", "timestamp": current_time}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error logging conversation: {str(e)}")

# Get user conversations (for future dashboard)
@app.get("/api/conversations/{user_id}")
async def get_conversations(user_id: str):
    try:
        conversations = list(conversations_collection.find({"user_id": user_id}).sort("timestamp", -1))
        
        for conv in conversations:
            conv["id"] = conv.pop("_id")
        
        return {"user_id": user_id, "conversations": conversations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching conversations: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)