'use client';

import { SnackbarProvider } from 'components/snackbar';
import React from 'react';
import AgentNetworkView from 'sections/agent-network-view';

function AgentsNetworkPage(): JSX.Element {
  return (
    <SnackbarProvider>
      <AgentNetworkView />
    </SnackbarProvider>
  );
}

export default AgentsNetworkPage;
