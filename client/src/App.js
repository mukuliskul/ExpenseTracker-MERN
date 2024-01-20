// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home';
import ViewExpenses from './ViewExpenses';

function App() {
  return (
    <Router> {/* provides routing context to my application */}
      <div>
        <NavBar />

        <Routes> {/* inside this component we can map URLs to specific components that will be rendered when URL is matched */}
          <Route path="/view-expenses" element={<ViewExpenses />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
