import React from 'react'
import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";
import './App.css'
import Header from './components/Header'
import Country from './page/Country';
import Home from './page/Home'

function App() {

  return (
    <>
        <HashRouter basename="/">
          <Header />
          <Switch>
            <Route exact path="/" children={<Home />} />
            <Route exact path="/country/:id" children={<Country />} />
          </Switch>
      </HashRouter>
    </>
  )
}

export default App
