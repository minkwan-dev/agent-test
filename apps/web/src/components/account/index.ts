import {
  connectedAccounts,
  notificationPrefs,
  recentSessions,
  userProfile,
} from "./account-data";
import { AccountConnectedLogins } from "./account-connected-logins";
import { AccountNotificationPrefs } from "./account-notification-prefs";
import { AccountPermissionCards } from "./account-permission-cards";
import { AccountProfileCard } from "./account-profile-card";
import { AccountSessionsList } from "./account-sessions-list";
import { LogoutButton } from "./logout-button";

/** 내 계정·프로필 UI */
export const Account = {
  ProfileCard: AccountProfileCard,
  PermissionCards: AccountPermissionCards,
  ConnectedLogins: AccountConnectedLogins,
  SessionsList: AccountSessionsList,
  NotificationPrefs: AccountNotificationPrefs,
  LogoutButton,
  data: {
    userProfile,
    connectedAccounts,
    recentSessions,
    notificationPrefs,
  },
} as const;

export type AccountNamespace = typeof Account;
