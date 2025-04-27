import React, { Component } from 'react';
import './App.css';
import NavBar from './Component/NavBar';
import News from './Component/News';
import {
  BrowserRouter as Router,
  Routes, // Changed from Switch to Routes
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() { 
    return (
      <div>
        <Router>
          <NavBar/>  
          <Routes> {/* Changed from Switch to Routes , exact=When true, will only match if the path matches the location path exactly*/}
            <Route exact path="/general" element={<News key="general"country="us" category="general" />} />
            <Route exact path="/business" element={<News key="business"country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" country="us" category="entertainment" />} />
            <Route exact path="/health" element={<News key="health" country="us" category="health" />} />
            <Route exact path="/science" element={<News key="science" country="us" category="science" />} />
            <Route exact path="/sports" element={<News key="sports"country="us" category="sports" />} />
            <Route exact path="/technology" element={<News key="technology"country="us" category="technology" />} />
          </Routes>     
        </Router>
      </div>
    );
  }
}
