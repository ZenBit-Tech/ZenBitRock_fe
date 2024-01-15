const ApiRoute = {
  SEND_CODE_FOR_RESTORE_PASSWORD: '/email/forgot-password',
  CONFIRM_CODE_FOR_RESTORE_PASSWORD: '/auth/confirm-email',
  CONFIRM_RESTORE_PASSWORD: '/auth/restore-password',
  ADD_VERIFICATION_DATA: '/verification/update',
  UPDATE_PROFILE_DATA: '/user/update',
  SET_AVATAR: '/user/set-avatar',
  DELETE_AVATAR: '/user/delete-avatar',
  GET_USER_BY_ID: '/user/id',
  VERIFY_OLD_PASSWORD: '/auth/verify-password',
  CHANGE_PASSWORD: '/auth/change-password',
  UPDATE_USER: '/user/id',
  DELETE_USER: '/user',
  QOBRIX_CREATE_CONTACT: '/contacts',
  QOBRIX_CREATE_AGENT: '/agents',
  QOBRIX_DELETE_LEAD: '/opportunities',
  QOBRIX_PROPERY_TYPES: '/property-types',
  QOBRIX_CREATE_LEAD: '/opportunities',
  QOBRIX_SEARCH_LOCATIONS: '/locations/search',
  GET_ALL_AGENTS: '/user',
  QOBRIX_GET_PROPERTIES: '/properties',
  QOBRIX_GET_PROPERTY: '/properties/id',
  GET_LEAD_DETAILS: '/lead/details/id',
  GET_MATCHING_PROPERTIES: 'lead/properties',
  QOBRIX_GET_LEADS: '/opportunities',
  QOBRIX_GET_PROPERTY_LEADS: '/opportunities/by-property/id',
  QOBRIX_GET_LEAD_SMSES: '/sms-messages/related-with/RelatedOpportunityOpportunities/id',
  QOBRIX_GET_LEAD_EMAILS: '/email-messages/related-with/RelatedOpportunityOpportunities/id',
  QOBRIX_GET_LEAD_TASKS: '/tasks/related-with/RelatedOpportunityOpportunities/id',
  QOBRIX_GET_LEAD_MEETINGS: '/meetings/related-with/RelatedOpportunityOpportunities/id',
  QOBRIX_GET_LEAD_CALLS: '/calls/related-with/RelatedOpportunityOpportunities/id',
  QOBRIX_GET_LEAD_TASK_CHANGES: '/tasks/id/changes',
  QOBRIX_GET_LEAD_STATUS_CHANGES: '/opportunities/id/changes',
  MESSAGES_GET_UNREAD: '/messages/id/unread',
  CHATS: '/chats',
  CHAT_WITH_ID: '/chats/id',
  CHECK_PRIVATE_CHAT: 'check-private-chat',
  CONTENT: '/content',
} as const;

export { ApiRoute };
