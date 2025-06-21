import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { LobbySetup } from './components/LobbySetup';
import { BanStage } from './components/BanStage';
import { loadUser, saveUser, clearUser } from './utils/userPersistence';
import { isValidLobbyCode } from './utils/lobbyUtils';

// Component to handle lobby routes with proper parameter extraction
function LobbyRouteHandler() {
  const { lobbyCode } = useParams<{ lobbyCode: string }>();
  const location = useLocation();
  const [userName, setUserName] = useState<string | null>(null);
  const [currentLobby, setCurrentLobby] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Extract lobby code from URL path as fallback
  const extractLobbyCodeFromPath = (pathname: string): string | null => {
    const pathParts = pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      const code = pathParts[0];
      if (code.includes('-') && isValidLobbyCode(code)) {
        return code;
      }
    }
    return null;
  };

  // Initialize lobby route
  useEffect(() => {
    const initializeLobby = () => {
      // Load user from localStorage
      const savedUser = loadUser();
      if (savedUser) {
        setUserName(savedUser);
      }

      // Try to get lobby code from params first, then fallback to URL path
      let finalLobbyCode = null;
      if (lobbyCode && lobbyCode.trim() !== '' && isValidLobbyCode(lobbyCode)) {
        finalLobbyCode = lobbyCode;
      } else {
        // Fallback to extracting from URL path
        const pathCode = extractLobbyCodeFromPath(location.pathname);
        if (pathCode) {
          finalLobbyCode = pathCode;
        }
      }

      // Always set the lobby code (even if invalid) so LobbySetup can show error message
      if (finalLobbyCode) {
        setCurrentLobby(finalLobbyCode);
      } else if (lobbyCode && lobbyCode.trim() !== '') {
        // If we have an invalid lobby code from params, pass it through
        setCurrentLobby(lobbyCode);
      } else {
        setCurrentLobby(null);
      }

      setIsLoading(false);
    };

    initializeLobby();
  }, [lobbyCode, location.pathname]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Validate lobby code before showing BanStage
  const isValidCurrentLobby = currentLobby && isValidLobbyCode(currentLobby);

  return userName && isValidCurrentLobby ? (
    <BanStage 
      userName={userName} 
      lobbyCode={currentLobby} 
      onBack={handleLeaveSession} 
    />
  ) : (
    <LobbySetup onReady={handleReady} initialLobbyCode={currentLobby || undefined} />
  );
}

function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [currentLobby, setCurrentLobby] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract lobby code from URL path
  const extractLobbyCodeFromPath = (pathname: string): string | null => {
    const pathParts = pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      const lobbyCode = pathParts[0];
      if (lobbyCode.includes('-')) {
        if (isValidLobbyCode(lobbyCode)) {
          return lobbyCode;
        }
      }
    }
    return null;
  };

  // Initialize app state on mount
  useEffect(() => {
    const initializeApp = () => {
      // Load user from localStorage
      const savedUser = loadUser();
      if (savedUser) {
        setUserName(savedUser);
      }

      // Extract lobby code from current URL
      const lobbyCode = extractLobbyCodeFromPath(location.pathname);
      if (lobbyCode) {
        setCurrentLobby(lobbyCode);
      }

      setIsLoading(false);
    };

    initializeApp();
  }, []); // Only run on mount

  // Handle URL changes
  useEffect(() => {
    if (!isLoading) {
      const lobbyCode = extractLobbyCodeFromPath(location.pathname);
      if (lobbyCode) {
        setCurrentLobby(lobbyCode);
      } else {
        setCurrentLobby(null);
      }
    }
  }, [location.pathname, isLoading]);

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
      
      {/* Lobby route - use dedicated component for better parameter handling */}
      <Route 
        path="/:lobbyCode" 
        element={<LobbyRouteHandler />}
      />

      {/* Catch-all route for any unmatched paths */}
      <Route 
        path="*" 
        element={
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-2xl mb-4">Page Not Found</h1>
              <p className="mb-4">The requested page could not be found.</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
              >
                Go Home
              </button>
            </div>
          </div>
        } 
      />
    </Routes>
  );
}

export default App;