import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'

import '../CreateRecipe.css'

export default function CreateRecipe() {
    
    const [name,setName] = useState("");
    const [image,setImage] = useState("");
    const [cheatSheet,setCheatSheet] = useState("");
    const [ingredientsTitle,setIngredientsTitle] = useState([""]);
    const [ingredientsSection,setIngredientsSection] = useState([""]);
    const [nutrients,setNutrients] = useState("");
    const [notes,setNotes] = useState("");
    const [recipeTitle,setRecipeTitle] = useState([""]);
    const [recipeSection,setRecipeSection] = useState([""]);

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

    console.log(ingredientsTitle)

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
                </div>
                <div className = "Upper-split">
                    <label>ingredients:</label><br/><br/>
                    {ingredientsTitle.map((element,index)=>{
                        return(
                        <div key = {element + index}>
                            <button>add</button><br/>
                            Subsection {index + 1}
                            <button 
                                onClick ={()=>{
                                    setIngredientsTitle(ingredientsTitle.filter((__ , i)=> i !== index))
                                    setIngredientsSection(ingredientsSection.filter((__ , i)=> i !== index))
                                }}>
                            x</button>
                            <div> Title: <br/> 
                            <input type="text"onChange={(e)=>{
                                var ingredientsTitle_temp = ingredientsTitle
                                ingredientsTitle_temp [index] = e.target.value
                                console.log(ingredientsTitle_temp)
                                setIngredientsTitle(ingredientsTitle_temp)
                            }}></input>
                            </div>
                            <div> Content:
                            <textarea onChange={(e)=>{
                                setIngredientsSection(ingredientsSection.splice(index,1,e.target.value))
                            }}></textarea>
                            </div>
                        </div>
                        )
                    })}
                <button onClick ={()=>{
                    setIngredientsTitle([...ingredientsTitle,""])
                    setIngredientsSection([...ingredientsSection,""])
                }}>add</button>
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
                    <div> Subsection title
                        <input type="text" onChange={(e)=>{
                            setRecipeTitle(e.target.value)
                        }}></input>
                    </div>
                    <div> Subsection content
                        <textarea onChange={(e)=>{
                            setRecipeSection(e.target.value)
                        }}></textarea>
                    </div>
                </div>
                <button onClick={submitPost}>Submit Recipe</button>
            </div>
        </div>
    )
}