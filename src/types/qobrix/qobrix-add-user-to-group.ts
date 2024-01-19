export type QobrixAddUserToGroupRequest = { userId: string; groupId: string };

export type QobrixAddUserToGroupResponse = {
  data: {
    user_id: string;
    group_id: string;
    created_by: string;
    modified_by: string;
    id: string;
  };
};
