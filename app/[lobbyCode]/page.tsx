'use client';

import dynamic from 'next/dynamic';

const AppShell = dynamic(() => import('../../src/AppShell'), {
  ssr: false,
});

export default function LobbyPage() {
  return <AppShell />;
}

