import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Aside from './components/Aside';
import MapContainer from './components/MapContainer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <div className="MainContent">


        <div className="MapContainer">
          <MapContainer />
        </div>
      </div>
      <Aside />
      <Footer />
    </div>
  );
}

export default App;