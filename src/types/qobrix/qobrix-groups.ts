export type QobrixAddUserToGroupRequest = { userId: string; groupId: string | undefined };

export type QobrixAddUserToGroupResponse = {
  data: {
    user_id: string;
    group_id: string;
    created_by: string;
    modified_by: string;
    id: string;
  };
};

export type QobrixGetAllGroupsResponse = {
  data: {
    id: string;
    name: string;
    created: string;
    modified: string;
    trashed: boolean | null;
    description: string;
    deny_edit: boolean;
    deny_delete: boolean;
    remote_group_id: string | null;
    created_by: string | null;
    modified_by: string | null;
  }[];
};
