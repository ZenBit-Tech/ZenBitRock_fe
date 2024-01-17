'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable typesafe/no-throw-sync-func */
import { createContext, useContext, useMemo, useSetState } from 'hooks';
import { Step } from 'react-joyride';

export interface AppState {
  run: boolean;
  stepIndex: number;
  steps: Step[];
  tourActive: boolean;
}

const appState = {
  run: false,
  stepIndex: 0,
  steps: [],
  tourActive: false,
};

export const UnboardingContext = createContext({
  state: appState,
  setState: () => undefined,
});
UnboardingContext.displayName = 'AppContext';

export function OnboardingProvider(props: any): JSX.Element {
  const [state, setState] = useSetState(appState);

  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [setState, state]
  );

  return <UnboardingContext.Provider value={value} {...props} />;
}

export function useOnboardingContext(): {
  setState: (patch: Partial<AppState> | ((previousState: AppState) => Partial<AppState>)) => void;
  state: AppState;
} {
  const context = useContext(UnboardingContext);

  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }

  return context;
}
