import React, { useState, useEffect } from 'react';
import { UserSetup } from './components/UserSetup';
import { BanStage } from './components/BanStage';
import { loadUser, saveUser, clearUser } from './utils/userPersistence';

function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = loadUser();
    if (savedUser) {
      setUserName(savedUser);
    }
    setIsLoading(false);
  }, []);

  const handleUserReady = (name: string) => {
    saveUser(name);
    setUserName(name);
  };

  const handleLeaveSession = () => {
    clearUser();
    setUserName(null);
  };

  // Show loading state while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!userName) {
    return <UserSetup onUserReady={handleUserReady} />;
  }

  return <BanStage userName={userName} onBack={handleLeaveSession} />;
}

export default App;