// App.js
import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Home from './Home';
import Cus453 from './Cus453';
function App() {
  return (
    <div>
    <Routes >
        <Route path="/customers234234" element={<Cus453></Cus453>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
    </Routes>
    </div>
  );
}

export default App;
