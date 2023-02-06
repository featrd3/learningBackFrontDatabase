import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './CreateRecipe.css'
import MainPage from './pages/MainPage.js';
import CreateRecipe from './pages/CreateRecipe'
import Recipe from './pages/Recipe'

const App = () => {
  return (
    <div>
      <nav className="links"> 
        <a href="/">Recipe book</a>
        <a href="/findrecipe">Find Recipe</a>
        <a href="/addrecipe">Add Recipe</a>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<MainPage />} />
          <Route path="/addrecipe" element={<CreateRecipe />}/>
          <Route path="/recipe/:recipeId" element={<Recipe />}/>
        </Routes>
      </BrowserRouter>
      <div className="footer">

      </div>
    </div>
  )
}

export default App;