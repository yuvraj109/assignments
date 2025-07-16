import { useState } from 'react'
import { Provider } from 'react-redux';
import store from './app/store';
import Members from './components/Members';
import Teams from './components/Teams';
import Project from './components/Project';




function App() {
  
  const [active, setActive] = useState('projects');

  const component = () => {
    switch (active) {
      case 'projects':
        return <Project/>;
      case 'teams':
        return <Teams/>;
      case 'members':
        return <Members/>;
      default:
        return <div>Select a component</div>;
    }
  }

  return (
    <Provider store={store}>
  
      <div className="">
        <nav className='flex justify-around items-center p-3 bg-blue-500 text-white'>
          
        <div className='flex space-x-4'>
          <button className={ ` p-2 rounded ${active == 'projects'? 'bg-blue-800': '' }`} onClick={() => setActive('projects')}>Projects</button>
          <button  className={ ` p-2 rounded ${active == 'teams'? 'bg-blue-800': '' }`} onClick={() => setActive('teams')}>Teams</button>
          <button className={ ` p-2 rounded ${active == 'members'? 'bg-blue-800': '' }`} onClick={() => setActive('members')}>Members</button>
        </div>
        </nav>
        <main>
          {component()}
        </main>
      </div>
   
    </Provider>
  )
}

export default App
