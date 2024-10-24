import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

export class App extends Component {
  constructor(props) {
    super(props);
    this.api_key = process.env.REACT_APP_API_KEY; // Access API key here

    console.log("API Key:", this.api_key); // Debugging line to ensure the key is read
  }

  render() {
    return (
      <>
      <Router>
        <Navbar/>
          <Routes>
            <Route exact path='/' element= {<News api_key={this.api_key} key="general" pageSize={5} country="us" category="general"/>}/>
            <Route exact path='/business' element= {<News api_key={this.api_key} key="business" pageSize={5} country="us" category="business"/>}/>
            <Route exact path='/entertainment' element= {<News api_key={this.api_key} key="entertainment" pageSize={5} country="us" category="entertainment"/>}/>
            <Route exact path='/general' element= {<News api_key={this.api_key} key="general" pageSize={5} country="us" category="general"/>}/>
            <Route exact path='/health' element= {<News api_key={this.api_key} key="health" pageSize={5} country="us" category="health"/>}/>
            <Route exact path='/science' element= {<News api_key={this.api_key} key="science" pageSize={5} country="us" category="science"/>}/>
            <Route exact path='/sports' element= {<News api_key={this.api_key} key="sports" pageSize={5} country="us" category="sports"/>}/>
            <Route exact path='/technology' element= {<News api_key={this.api_key} key="technology" pageSize={5} country="us" category="technology"/>}/>
          </Routes>
      </Router>
      </>
    )
  }
}

export default App

