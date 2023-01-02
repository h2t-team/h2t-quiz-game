import { Role } from 'enums';
import { UserPreviewWithRoleInGroup } from './user.model';

export interface Group {
  id: string;
  name: string;
  ownerUser: {
    fullname: string;
  };
}

export interface GroupWithUserInGroup extends Group {
  userInGroups: UserPreviewWithRoleInGroup[];
}

export interface GroupDetail {
  group: GroupWithUserInGroup;
}

export interface GroupByUser {
  role: Role;
  group: Group;
}
