export type QobrixAgentRequest = {
  agent_type: string;
  legacy_id: string;
  primary_contact: string;
};

export type QobrixAgentResponse = {
  data: {
    data: {
      id: string;
      agent_type: string;
      legacy_id: string;
      primary_contact: string;
    };
  };
};
