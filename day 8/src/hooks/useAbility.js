
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { defineAbilitiesFor } from '../permissions/defineAbilities';

export function useAbility() {
  const user = useSelector((state) => state.users.user);
  return useMemo(() => defineAbilitiesFor(user.role, user.id), [user.role, user.id]);
}
