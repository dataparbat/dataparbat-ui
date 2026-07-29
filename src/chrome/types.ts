/* The chrome's own view types: what a shell surface needs to render,
   nothing about where the data came from. */

export type ProductEntry = {
  slug: string;
  name: string;
  badge: "ga" | "prev" | "internal" | "sunset" | null;
  descriptor: string;
  enabled: boolean;
  accessible: boolean;
  staffOnly: boolean;
};

export type ChromeWorkspace = {
  slug: string;
  name: string;
  role: string;
  status: string;
  send_block_reason: string | null;
  purge_at: string | null;
};

export type Viewer = { initials: string };

export type AccountMenuItem = { path: string; label: string };

export type ChromeLabels = {
  switchProduct: string;
  browseProducts: string;
  groupEnabled: string;
  groupAvailable: string;
  docs: string;
  support: string;
  accountMenu: string;
  signOut: string;
  switchOrg: string;
  newWorkspace: string;
  newWorkspaceTitle: string;
  newWorkspaceName: string;
  newWorkspaceAction: string;
  cancel: string;
  workspaceLive: string;
  workspacePaused: string;
  workspaceReview: string;
  workspaceSuspended: string;
  workspaceDeleting: string;
  staffBanner: string;
  staffLeave: string;
};
