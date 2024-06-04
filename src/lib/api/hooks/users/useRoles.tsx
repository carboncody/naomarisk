import { UserRole, type User } from '@models';

export function useAdmin(me: User) {
  return me.role === UserRole.Owner || me.role === UserRole.Manager;
}
