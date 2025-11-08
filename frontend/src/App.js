import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function App() {
  const [step, setStep] = useState('welcome'); // welcome, profile, main
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    goals: ['', '', ''],
    biggest_anxiety: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user already has a profile stored
  useEffect(() => {
    const storedUserId = localStorage.getItem('hopium_user_id');
    if (storedUserId) {
      loadUserProfile(storedUserId);
    }
  }, []);

  const loadUserProfile = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/profile/${id}`);
      setProfile({
        name: response.data.name,
        goals: response.data.goals,
        biggest_anxiety: response.data.biggest_anxiety
      });
      setUserId(id);
      setStep('main');
    } catch (err) {
      console.error('Error loading profile:', err);
      localStorage.removeItem('hopium_user_id');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!profile.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (profile.goals.some(goal => !goal.trim())) {
      setError('Please fill in all three goals');
      return;
    }
    if (!profile.biggest_anxiety.trim()) {
      setError('Please share your biggest anxiety');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/profile`, profile);
      const newUserId = response.data.id;
      setUserId(newUserId);
      localStorage.setItem('hopium_user_id', newUserId);
      setStep('main');
    } catch (err) {
      setError('Error creating profile. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoalChange = (index, value) => {
    const newGoals = [...profile.goals];
    newGoals[index] = value;
    setProfile({ ...profile, goals: newGoals });
  };

  const handleTalkToHopium = () => {
    alert('Hume.ai voice integration will be added here! Your profile is saved and ready.');
    // Future: Initialize Hume.ai voice conversation
  };

  const handleEditProfile = () => {
    setStep('profile');
  };

  const handleResetProfile = () => {
    if (window.confirm('Are you sure you want to reset your profile?')) {
      localStorage.removeItem('hopium_user_id');
      setUserId(null);
      setProfile({
        name: '',
        goals: ['', '', ''],
        biggest_anxiety: ''
      });
      setStep('welcome');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {step === 'welcome' && (
          <div className="text-center" data-testid="welcome-screen">
            <h1 className="text-6xl font-bold text-white mb-6">
              HOPIUM
            </h1>
            <p className="text-2xl text-white/90 mb-4">
              Therapy Speed, Founder Scale
            </p>
            <p className="text-lg text-white/80 mb-12 max-w-xl mx-auto">
              Your AI companion that reframes anxiety into hope. Personalized to YOUR goals, available 24/7.
            </p>
            <button
              onClick={() => setStep('profile')}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg"
              data-testid="get-started-button"
            >
              Get Started
            </button>
          </div>
        )}

        {step === 'profile' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8" data-testid="profile-form">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Let's get to know you
            </h2>
            <p className="text-gray-600 mb-8">
              This helps Hopium personalize conversations to YOUR specific goals and challenges.
            </p>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What's your name?
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your name"
                  data-testid="name-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What are your current goals? (3 goals)
                </label>
                <div className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <input
                      key={index}
                      type="text"
                      value={profile.goals[index]}
                      onChange={(e) => handleGoalChange(index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={`Goal ${index + 1}`}
                      data-testid={`goal-input-${index}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What's your biggest anxiety or challenge right now?
                </label>
                <textarea
                  value={profile.biggest_anxiety}
                  onChange={(e) => setProfile({ ...profile, biggest_anxiety: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none"
                  placeholder="Share what's weighing on you..."
                  data-testid="anxiety-input"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg" data-testid="error-message">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="save-profile-button"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </div>
        )}

        {step === 'main' && (
          <div className="space-y-6" data-testid="main-screen">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome back, {profile.name}!
                  </h2>
                  <p className="text-gray-600">
                    Ready to reframe some anxiety into hope?
                  </p>
                </div>
                <button
                  onClick={handleEditProfile}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                  data-testid="edit-profile-button"
                >
                  Edit Profile
                </button>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Goals:</h3>
                <ul className="space-y-2">
                  {profile.goals.map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span className="text-gray-700">{goal}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Current Challenge:</h3>
                <p className="text-gray-700 italic">"{profile.biggest_anxiety}"</p>
              </div>

              <button
                onClick={handleTalkToHopium}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 rounded-xl text-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                data-testid="talk-to-hopium-button"
              >
                🎙️ Talk to Hopium
              </button>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                Your personalized AI companion is ready to help you reframe anxiety into hope
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={handleResetProfile}
                className="text-white/70 hover:text-white text-sm underline"
                data-testid="reset-profile-button"
              >
                Reset Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;