import React, {useState, useEffect} from "react";
import "../ListWithDisplayOfSelected.css"

export function ListWithDisplayOfSelected(props) {

    const [ selectedTags, setSelectedTags ] = useState ([])
    const [ filterString, setFilterString ]= useState ("")

    function filterFunction(e){
        setFilterString(e.target.value)
    }

    function addToSelectedTags(tagObject){
        if (selectedTags.indexOf( tagObject) === -1){
            var temp_selectedTags = [...selectedTags,tagObject]
            setSelectedTags (temp_selectedTags)
        }
    }

    function removeFromSelectedTags(tagObject){
        let temp_selectedTags = [...selectedTags]
        temp_selectedTags = temp_selectedTags.splice (selectedTags.indexOf(tagObject), 0)
        setSelectedTags (temp_selectedTags)
    }

    console.log(selectedTags)

    return(
        <div>
            <ul className = "listOfSelectedTags">
                    {selectedTags.map((tag) => {
                        return(
                            <li style={{backgroundColor: tag.colour}}
                            key = {tag.id_tag}
                            onClick = {()=>removeFromSelectedTags(tag)}
                            >{tag.name_tag}
                            </li>
                        )
                    })}
                </ul>
            <input type="text" 
                onKeyUp={(e)=>{filterFunction(e)}} 
                placeholder="Tag name..."/>
                <ul className = "listOfAvailableTags">
                    {props.tagsArray.filter(tag => tag.name_tag.toUpperCase().indexOf(filterString.toUpperCase()) > -1 && selectedTags.indexOf(tag) === -1).slice(0,10).map((tag,index)=>{
                        return(
                            <li style={{backgroundColor: tag.colour}}
                            key = {tag.id_tag}
                            onClick = {()=>addToSelectedTags(tag)}
                            >{tag.name_tag}
                            </li>
                        )
                    })}
                </ul>
        </div>
    )
}