import React from 'react';
import Header from './components/Header';
import Aside from './components/Aside';
import MapContainer from './components/MapContainer';
import './styles/App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="AppContainer">
        <Header />
        <div className="MainContent">
          <MapContainer />
          <Aside />
        </div>
      </div>
    </div>
  );
}

export default App;