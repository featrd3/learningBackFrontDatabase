import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
import { InputWithSections } from '../modules/InputWithSections'
import { ListWithDisplayOfSelected } from '../modules/ListWithDisplayOfSelected'


import '../CreateRecipe.css'

export default function CreateRecipe() {
    
    const [name,setName] = useState("");

    const [image,setImage] = useState("");

    const [cheatSheet,setCheatSheet] = useState("");

    const [nutrients,setNutrients] = useState("");
    const [notes,setNotes] = useState("");

    const [ingredientsStringSeparated, setIngredientsStringSeparated] = useState("");
    const [recipeStringSeparated, setRecipeStringSeparated] = useState("");

    const [tags, setTags] = useState([{id_tag: 0,name_tag:"",color:""}]);
    const [ selectedTags, setSelectedTags ] = useState ([])
    
    let navigate = useNavigate();

    useEffect(()=>{
        updateTagsList()
    },[])

    function updateTagsList () {
        Axios.get("http://localhost:3002/api/getAllTags").then((data)=>{

            setTags(data.data)

        });
      }

    const submitRecipe = () => {
        // Axios.post('http://localhost:3002/api/create',
        // {
        //     //userName: userName, title: title, text:text
        // }).then((response)=>{
        // console.log(response.data)

        // const documentInput1 = document.getElementsByTagName('input')[1]
        // const documentInput2 = document.getElementsByTagName('input')[0]
        // const documentTextarea = document.getElementsByTagName('textarea')[0]

        // documentInput1.value="";
        // documentInput2.value="";
        // documentTextarea.value="";

        // navigate(`/post/${response.data.insertId}`)
        // })
        var Recipe = {
            cheatSheet: cheatSheet,
            image: image,
            ingredients: ingredientsStringSeparated,
            name: name,
            notes: notes,
            nutrients: nutrients,
            recipe: recipeStringSeparated,
            tag_colour: "color",
            tag_name: "name"
        }

        //console.log(Recipe)
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
                        {(image !== "")?
                        (<img className="recipe-image" src={image}></img>):<div> img demo</div>}
                    
                    </div>
                </div>
                <div className = "Upper-split">
                    <label>tags:</label><br/><br/>
                    <ListWithDisplayOfSelected
                        tagsArray = {tags}
                        selectedTags = {selectedTags}
                        setSelectedTags = {setSelectedTags}
                        updateVariableStringCallback = {updateDataFromInputWithSeparator}
                    />
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
                <button onClick={submitRecipe}>Submit Recipe</button>
            </div>
        </div>
    )
}