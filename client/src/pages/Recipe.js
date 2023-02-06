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
            data.data[0].tag_name = data.data[0].tag_name.split(',')
            data.data[0].tag_colour = data.data[0].tag_colour.split(',')
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
                <div className="RecipePage-content white-space-pre-line">
                <div className="RecipePage-name">{recipe.name}</div>
                    <div className="Recipe-tagsContainer">
                        {(recipe.tag_name)?(recipe.tag_name.map((tagName,key)=>{
                        return(
                            <div key={key} style={{backgroundColor: recipe.tag_colour[key]}}>
                                {tagName}
                            </div>)
                        })):""}
                    </div>
                    <div className="RecipePage-notes">{recipe.notes}</div>
                    <div className="RecipePage-nutrients Upper-split">{recipe.nutrients}</div>
                    <div className="RecipePage-ingredients Upper-split">
                        {recipe.ingredients.split("[newSection]").map((recipeElement,index)=>{
                            return(
                            <div key={index} className={(index%2)?("Ingredients-content"):("Ingredients-title")}>
                                {recipeElement}
                            </div>)
                        })}
                    </div>
                    <div className="RecipePage-recipe Upper-split">
                        {recipe.recipe.split("[newSection]").map((recipeElement,index)=>{
                            return(
                            <div key={index} className={(index%2)?("Step-content"):("Step-title")}>
                                {recipeElement}
                            </div>)
                        })}
                    </div>
                </div>
                <div className = "RecipePage-CheatSide white-space-pre-line">
                    <div className = "RecipePage-Cheat sticky">{recipe.cheatSheet} cheatsheet</div> 
                </div>
            </div>

        </div>
        
        

    )
}