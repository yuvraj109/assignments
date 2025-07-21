
import React from 'react';
import { useAbility } from '../hooks/useAbility';


export default function ProtectedRoute({ 
  action, 
  subject, 
  resource, 
  children, 
  fallback = null 
}) {
  const ability = useAbility();
  
 
  console.log('Checking permission:', action, subject, 'Can?', ability.can(action, subject));
  
  let canAccess = false;
  
  if (resource) {
      canAccess = ability.can(action, { ...resource, __type: subject });
  } else {
        canAccess = ability.can(action, subject);
  }
  
  return canAccess ? children : fallback;
}
