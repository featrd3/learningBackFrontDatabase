import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
import '../App.css'

function CreatePost() {
const [userName,setUserName] = useState("");
const [title,setTitle] = useState("");
const [text,setText] = useState("");

let navigate = useNavigate();

const submitPost = () => {
Axios.post('http://localhost:3002/api/create', {userName: userName, title: title, text:text}).then((response)=>{

    console.log(response.data)
    setText("")
    setTitle("")
    setUserName("")

    const documentInput1 = document.getElementsByTagName('input')[1]
    const documentInput2 = document.getElementsByTagName('input')[0]
    const documentTextarea = document.getElementsByTagName('textarea')[0]

    documentInput1.value="";
    documentInput2.value="";
    documentTextarea.value="";

    navigate(`/post/${response.data.insertId}`)
    })
}

    return (
        <div className="CreatePost">
            <div className="uploadPost">
                <label>Username: </label>
                <input type="text" onChange={(e)=> {
                    setUserName(e.target.value)
                }}/>
                <label>Title: </label>
                <input type="text" onChange={(e)=>{
                    setTitle(e.target.value)}}/>
       <label>Post Text</label>
       <textarea onChange={(e)=>{
           setText(e.target.value)}}></textarea>
<button onClick={submitPost}>Submit Post</button>
         </div>
        </div>
    )}

export default CreatePost