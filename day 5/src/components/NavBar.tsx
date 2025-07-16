

import { useState } from 'react';

interface NavBarProps {
  setActive: (active: string) => void;
}

const NavBar = ({ setActive }: NavBarProps) => {
  const [activeItem, setActiveItem] = useState('Home');

  const handleNavClick = (item: string) => {
    setActive(item);
    setActiveItem(item);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
       
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-white tracking-wide">Omniful</h1>
          </div>

        
          <ul className="flex items-center space-x-1 bg-blue-500 bg-opacity-30 rounded-lg p-1">
            <li>
              <button
                onClick={() => handleNavClick('Home')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
                  activeItem === 'Home'
                    ? 'bg-white text-blue-600 shadow-md transform scale-105'
                    : 'text-blue-100 '
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>Home</span>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('InfiniteScroll')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
                  activeItem === 'InfiniteScroll'
                    ? 'bg-white text-blue-600 shadow-md transform scale-105'
                    : 'text-blue-100 '
                }`}
              >
                <div className="flex items-center space-x-2">
                
                  <span>Infinite Scroll</span>
                </div>
              </button>
            </li>
          </ul>

<div className="hidden sm:flex items-center space-x-4">
           
              
              <span className="text-sm text-blue-100 font-medium">Assignment Day-5</span>            
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;