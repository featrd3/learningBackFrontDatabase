import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
import '../App.css'
import '../Recipe.css'

export default function Recipe() {

    let {recipeId} = useParams();
    const [recipe,setRecipe] = useState({
        cheatSheet: "",
        dateOfAddition: "",
        id: 0,
        image: "",
        ingredients: "",
        name: "",
        notes: "",
        nutrients: "",
        recipe: "",
        tag_colour: "",
        tag_name: ""
    })

    let navigate = useNavigate();

    useEffect(()=>{
    Axios.get(`http://localhost:3002/api/getRecipeId/${recipeId}`).then((data)=>{
        
    setRecipe(data.data[0]);
    });

    },[recipeId]);

    const deleteRecipe = (id) => {
        Axios.delete(`http://localhost:3002/api/delete/${recipeId}`).then((response)=>{navigate(`/`)})
        
    }
    return (
        <div className="RecipePage-container">
            <div className="RecipePage-imgContainer">
                <img src={recipe.image}></img>
            </div>
            <div className="RecipePage-main">
                <div className="RecipePage-content">
                    <div className="RecipePage-name">{recipe.name}</div>
                    <div className="RecipePage-notes">{recipe.notes}</div>
                    <div className="RecipePage-nutrients">{recipe.nutrients}</div>
                    <div className="RecipePage-ingredients">{recipe.ingredients}</div>
                    <div className="RecipePage-recipe">{recipe.recipe}</div>
                </div>
                <div className = "RecipePage-CheatSide">
                    <div className = "RecipePage-Cheat sticky">{recipe.cheatSheet} cheatsheet</div> 
                </div>
            </div>

        </div>
        
        

    )
}