'use client';

import React from 'react';
import { SnackbarProvider } from 'components/snackbar';
import AgentNetworkView from 'sections/agent-network-view';

function AgentsNetworkPage(): JSX.Element {
  return (
    <SnackbarProvider>
      <AgentNetworkView />
    </SnackbarProvider>
  );
}

export default AgentsNetworkPage;
