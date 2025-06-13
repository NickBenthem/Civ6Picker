import React, { useState } from 'react';
import { UserSetup } from './components/UserSetup';
import { BanStage } from './components/BanStage';

function App() {
  const [userName, setUserName] = useState<string | null>(null);

  const handleUserReady = (name: string) => {
    setUserName(name);
  };

  const handleLeaveSession = () => {
    setUserName(null);
  };

  if (!userName) {
    return <UserSetup onUserReady={handleUserReady} />;
  }

  return <BanStage userName={userName} onBack={handleLeaveSession} />;
}

export default App;