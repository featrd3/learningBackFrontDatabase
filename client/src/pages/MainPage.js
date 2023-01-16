import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../App.css'

function MainPage() {

const [recipeList,setRecipeList]=useState([{
  id: "",
  image: "",
  notes: "",
  name: "",
  tag_name: "",
  tag_colour: "#000000"
}]);

let navigate = useNavigate();

useEffect(()=>{
  updateRecipeList()
},[])

function updateRecipeList () {
  Axios.get("http://localhost:3002/api/get").then((data)=>{
    data.data.map((receivedData,index)=>{
      if((receivedData.tag_name!=null)){
        data.data[index].tag_name = receivedData.tag_name.split(',')
        data.data[index].tag_colour = receivedData.tag_colour.split(',')
      }
    })
    setRecipeList(data.data)
  });
}

const LikeRecipe = (id) => {
Axios.post(`http://localhost:3002/api/like/${id}`).then((response)=>{

  updateRecipeList()
})
}
console.log(recipeList)
return (
 <div className="MainPage">
     <div className="RecipeContainer">
       {recipeList.map((val,key)=>{
         return (
          <div  className="Recipe" key={key} onClick={()=>(navigate(`/recipe/${val.id}`))}>
            <div className="Recipe-imgContainer">
              <img className="recipe-image" src={val.image}></img>
            </div>
            <div className="Recipe-dscContainer">
            <div className="Recipe-tagsContainer">{(val.tag_name)?(
                val.tag_name.map((tagName,key)=>{
                  return(<div key={key} style={{backgroundColor: val.tag_colour[key]}}>{tagName}</div>)
                })
                ):""}
            </div>
              <p className="Recipe-name">{val.name}</p>
              <p>{val.notes.length > 300 ? val.notes.substring(0,300)+ " ..." : val.notes}</p>
            </div>
          </div>
           )  })}  
          </div>
        </div>
    )}

export default MainPage
