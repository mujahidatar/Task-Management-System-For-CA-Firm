import './App.css';
import { Mycomp } from './Component/Mycomp';
import React from 'react';
import { Provider } from 'react-redux';
import store from './Container/Store';


function App() {
  return (
    <Provider store={store} >
      <div style={{"backgroundColor":"#EDEDDA","height":"100vh"}}>
        <Mycomp />
      </div>
    </Provider>
  );
}

export default App;
