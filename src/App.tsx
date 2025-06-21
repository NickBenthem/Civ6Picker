import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LobbySetup } from './components/LobbySetup';
import { BanStage } from './components/BanStage';
import { loadUser, saveUser, clearUser } from './utils/userPersistence';
import { isValidLobbyCode } from './utils/lobbyUtils';

function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [currentLobby, setCurrentLobby] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = loadUser();
    if (savedUser) {
      setUserName(savedUser);
    }
    setIsLoading(false);
  }, []);

  // Handle URL-based lobby routing
  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      const lobbyCode = pathParts[0];
      if (isValidLobbyCode(lobbyCode)) {
        setCurrentLobby(lobbyCode);
      }
    }
  }, [location.pathname]);

  const handleReady = (lobbyCode: string, name: string) => {
    saveUser(name);
    setUserName(name);
    setCurrentLobby(lobbyCode);
    navigate(`/${lobbyCode}`);
  };

  const handleLeaveSession = () => {
    clearUser();
    setUserName(null);
    setCurrentLobby(null);
    navigate('/');
  };

  // Show loading state while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Root route - show combined lobby and user setup */}
      <Route 
        path="/" 
        element={
          <LobbySetup onReady={handleReady} />
        } 
      />
      
      {/* Lobby route - show ban stage if user exists, otherwise redirect to root */}
      <Route 
        path="/:lobbyCode" 
        element={
          userName && currentLobby ? (
            <BanStage 
              userName={userName} 
              lobbyCode={currentLobby} 
              onBack={handleLeaveSession} 
            />
          ) : (
            <LobbySetup onReady={handleReady} initialLobbyCode={currentLobby || undefined} />
          )
        } 
      />
    </Routes>
  );
}

export default App;