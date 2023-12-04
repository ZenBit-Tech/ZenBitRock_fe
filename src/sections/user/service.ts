export const revertFormatRole = (stateRole: string): string => {
  switch (stateRole) {
    case 'individual_agent':
      return 'Agent';

    default:
      return stateRole ? stateRole[0].toUpperCase() + stateRole.slice(1).toLowerCase() : '';
  }
};

export const formatRole = (inputRole: string): string => {
  switch (inputRole) {
    case 'Agent':
      return 'individual_agent';

    default:
      return inputRole ? inputRole.toLowerCase() : '';
  }
};