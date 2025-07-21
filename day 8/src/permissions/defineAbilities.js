
import { AbilityBuilder, Ability } from '@casl/ability';

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  OPERATOR: 'operator',
};

export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  MANAGE: 'manage',
};

export const SUBJECTS = {
  ORDER: 'Order',
  SETTINGS: 'Settings',
  USER: 'User',
  LOG: 'Log',
  ALL: 'all',
};

export function defineAbilitiesFor(role, userId = 'current-user') {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  switch (role) {
    case ROLES.ADMIN:
      can(ACTIONS.MANAGE, SUBJECTS.ALL);
      break;
      
    case ROLES.MANAGER:
      can([ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE], SUBJECTS.ORDER);
      can(ACTIONS.READ, SUBJECTS.SETTINGS);
      can(ACTIONS.READ, SUBJECTS.LOG);
      cannot(ACTIONS.MANAGE, SUBJECTS.USER);
      cannot([ACTIONS.CREATE, ACTIONS.UPDATE, ACTIONS.DELETE], SUBJECTS.SETTINGS);
      break;
      
    case ROLES.OPERATOR:
      can(ACTIONS.READ, SUBJECTS.ORDER, { assignedTo: userId });
      can(ACTIONS.READ, SUBJECTS.ORDER, (order) => order.assignedTo === userId);
      can(ACTIONS.UPDATE, SUBJECTS.ORDER, (order) => order.assignedTo === userId);
   
      cannot(ACTIONS.CREATE, SUBJECTS.ORDER);
 
      cannot(ACTIONS.MANAGE, SUBJECTS.SETTINGS);
      cannot(ACTIONS.MANAGE, SUBJECTS.USER);
      cannot(ACTIONS.MANAGE, SUBJECTS.LOG);
      break;
      
    default:
  
      cannot(ACTIONS.MANAGE, SUBJECTS.ALL);
  }

  return build();
}
