import orderBy from 'lodash/orderBy';
import { UserChatResponse } from 'types/user-backend';

const sortAgents = ({ agents, sortType }: { agents?: UserChatResponse[]; sortType: string }) => {
  switch (sortType) {
    case 'nameAsc':
      return orderBy(
        agents,
        [(agent) => `${agent.firstName} ${agent.lastName}`.toLowerCase()],
        ['asc']
      );

    case 'nameDesc':
      return orderBy(
        agents,
        [(agent) => `${agent.firstName} ${agent.lastName}`.toLowerCase()],
        ['desc']
      );

    case 'oldest':
      return orderBy(agents, ['createdAt'], ['asc']);

    case 'newest':
      return orderBy(agents, ['createdAt'], ['desc']);

    default:
      return agents;
  }
};

export default sortAgents;
