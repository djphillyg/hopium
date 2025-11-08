// Seed data for Hopium development database
// This runs automatically when MongoDB container first starts

db = db.getSiblingDB('hopium_db');

// Create test user profile
const testUserId = '550e8400-e29b-41d4-a716-446655440000';
const timestamp = new Date().toISOString();

db.users.insertOne({
  _id: testUserId,
  name: 'Test Founder',
  goals: [
    'Launch MVP by end of Q1',
    'Secure seed funding',
    'Build a team of 5 engineers'
  ],
  biggest_anxiety: 'Worried about running out of runway before achieving product-market fit',
  created_at: timestamp,
  updated_at: timestamp
});

// Create sample conversation for testing
db.conversations.insertOne({
  _id: '660e8400-e29b-41d4-a716-446655440000',
  user_id: testUserId,
  timestamp: timestamp,
  duration_seconds: 420,
  emotion_rating: 7,
  notes: 'Great session - felt more hopeful about fundraising'
});

print('✅ Seed data inserted successfully');
print('📝 Test user ID: ' + testUserId);
print('🎯 Use this ID to test the GET /api/profile/{user_id} endpoint');
