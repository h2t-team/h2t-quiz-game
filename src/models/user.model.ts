import { Role } from 'enums';

export interface UserPreview {
  fullname: string;
  username: string;
}

export interface UserPreviewWithRoleInGroup {
  userId: string;
  role: Role;
  user: UserPreview;
}
