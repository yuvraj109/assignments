import { useToggle } from '../hooks';

export function ToggleDemo() {
    
  const darkMode = useToggle(false);
  const notifications = useToggle(true);
  const premium = useToggle(false);

  return (
    <div
    className={`demo-card ${darkMode.value ? 'dark-mode' : 'light-mode'}`}
  >
      <h3>useToggle Hook</h3>
      <p>Boolean state with toggle functionality</p>
      
      <div className="toggle-group">

        <div className="toggle-item">
          <label>Dark Mode:</label>

          <button 
            className={darkMode.value ? 'toggle-active' : 'toggle-inactive'}
            onClick={darkMode.toggle}
          >
            {darkMode.value ? 'ON' : 'OFF'}
          </button>
          <button onClick={darkMode.setTrue}>Enable</button>

          <button onClick={darkMode.setFalse}>Disable</button>
        </div>
        
         <div className="toggle-item">
          <label>Notifications:</label>
          <button 
            className={notifications.value ? 'toggle-active' : 'toggle-inactive'}
            onClick={notifications.toggle}
          >
            {notifications.value ? 'ON' : 'OFF'}
          </button>
         </div>
        
        <div className="toggle-item">
          <label>Premium:</label>
          <button 
            className={premium.value ? 'toggle-active' : 'toggle-inactive'}
            onClick={premium.toggle}
          >
            {premium.value ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
      
      <div className="output">
        <div>Dark Mode: {darkMode.value ? 'ON' : 'OFF'}</div>
        <div>Notifications: {notifications.value ? 'ON' : 'OFF'}</div>
        <div>Premium: {premium.value ? 'ON' : 'OFF'}</div>
      </div>
    </div>
  );
}
