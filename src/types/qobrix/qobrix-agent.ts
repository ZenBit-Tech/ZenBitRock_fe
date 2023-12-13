export type QobrixAgentRequest = {
  agent_type: string;
  legacy_id: string;
  primary_contact: string;
};

export type QobrixAgentResponse = {
  data: {
    data: {
      agent_type: string;
      legacy_id: string;
      primary_contact: string;
      id: string;
    };
  };
};
