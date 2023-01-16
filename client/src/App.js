import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import MainPage from './pages/MainPage.js';
import CreateRecipe from './pages/CreateRecipe'
import Recipe from './pages/Recipe'

const App = () => {
  return (
    <div>
      <div className="navbar">
        <div className="links"> 
        <a href="/">Recipe book</a>
        <a href="/addrecipe">Add Recipe</a>
        <a href="/findrecipe">Find Recipe</a>
        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<MainPage />} />
          <Route path="/createrecipe" element={<CreateRecipe />}/>
          <Route path="/recipe/:recipeId" element={<Recipe />}/>
        </Routes>
      </BrowserRouter>
      <div className="footer">

      </div>
    </div>
  )
}

export default App;