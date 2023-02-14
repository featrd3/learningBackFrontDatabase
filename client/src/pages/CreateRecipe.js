import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
import { InputWithSections} from '../modules/InputWithSections'

import '../CreateRecipe.css'

export default function CreateRecipe() {
    
    const [name,setName] = useState("");

    const [image,setImage] = useState("");
    const [imageDemoRequestPending,setImageDemoRequestPending] = useState(0);
    /*
    0 - demo not requested,
    1 - demo requested, waiting for image,
    2 - demo requested, image not found
    3 - demo requested, image displayed
    */

    const [cheatSheet,setCheatSheet] = useState("");

    const [nutrients,setNutrients] = useState("");
    const [notes,setNotes] = useState("");

    const [ingredientsStringSeparated, setIngredientsStringSeparated] = useState("");
    const [recipeStringSeparated, setRecipeStringSeparated] = useState("");

    let navigate = useNavigate();

    const submitPost = () => {
        Axios.post('http://localhost:3002/api/create',
        {
            //userName: userName, title: title, text:text
        }).then((response)=>{
        console.log(response.data)

        const documentInput1 = document.getElementsByTagName('input')[1]
        const documentInput2 = document.getElementsByTagName('input')[0]
        const documentTextarea = document.getElementsByTagName('textarea')[0]

        documentInput1.value="";
        documentInput2.value="";
        documentTextarea.value="";

        navigate(`/post/${response.data.insertId}`)
        })
    }

    function updateDataFromInputWithSeparator (e,setVariable){
        setVariable(e)
    }

    return (
        <div className="CreateRecipe">
            <div className="uploadRecipe">
                <div>
                    <label>name: </label><br/><br/>
                    <input type="text" onChange={(e)=> {
                         setName(e.target.value)
                    }}/>
                </div>
                <div className = "Upper-split">
                    <label>image: </label><br/><br/>
                    <input type="text" onChange={(e)=> {
                        setImage(e.target.value)
                    }}/>
                    <div className = "RecipePage-imgContainer">
                    <img className="recipe-image" src={image}></img>
                    </div>
                </div>
                <div className = "Upper-split">
                    <label>ingredients:</label><br/><br/>
                    <InputWithSections 
                        updateVariableStringCallback={updateDataFromInputWithSeparator}
                        setVariableStringCallback={setIngredientsStringSeparated}
                        separator={"[newSection]"}/>
                </div>
                <div className = "Upper-split">
                    <label>nutrients:</label><br/><br/>
                    <textarea onChange={(e)=>{
                        setNutrients(e.target.value)
                    }}></textarea>
                </div>
                <div className = "Upper-split">
                    <label>cheatSheet:</label><br/><br/>
                    <textarea onChange={(e)=>{
                        setCheatSheet(e.target.value)
                    }}></textarea>
                </div>
                <div className = "Upper-split">
                    <label>notes:</label><br/><br/>
                    <div>
                    <textarea onChange={(e)=>{
                        setNotes(e.target.value)
                    }}></textarea>
                    </div>
                </div>
                <div className = "Upper-split">
                    <label>recipe:</label><br/><br/>
                    <InputWithSections 
                        updateVariableStringCallback={updateDataFromInputWithSeparator}
                        setVariableStringCallback={setRecipeStringSeparated}
                        separator={"[newSection]"}/>
                </div>
                <button onClick={submitPost}>Submit Recipe</button>
            </div>
        </div>
    )
}