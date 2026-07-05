import React from 'react';
import Header from './components/Header/Header'
import Game from './components/Game/Game'
import Footer from './components/Footer/Footer'

export default function App() {
  return (
    <div className="App">
      <Header/>
      <Game/>
      <Footer/>
    </div>
  );
}