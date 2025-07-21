
export const clearLocalStorage = () => {
  try {
  
    localStorage.removeItem('omnifulState');
    localStorage.removeItem('order-form-draft');
    
   
    const keysToPreserve = []; 
       for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !keysToPreserve.includes(key) && key.startsWith('omniful')) {
        localStorage.removeItem(key);
      }
    }
    
    return true;
  } catch (err) {
    console.error('Error clearing localStorage:', err);
    return false;
  }
};
