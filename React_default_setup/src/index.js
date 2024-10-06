import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';

const myfirstelement = <h1>YO</h1>

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<Main />);
