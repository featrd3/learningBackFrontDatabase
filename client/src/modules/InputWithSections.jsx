import React, {useState, useEffect} from "react";

export function InputWithSections(props) {

    const [sTitle,setsTitle] = useState([""]);
    const [sSectionId,setsSectionId] = useState([0]);
    const [sSection,setsSection] = useState([""]);
    const [CurrentId,setCurrentId] = useState(0);

    useEffect(()=>{

        var temp_wholeStringSeparated = []

        sSection.map((element,index)=>{
            temp_wholeStringSeparated.push(sTitle[index])
            temp_wholeStringSeparated.push(sSection[index])
        })
         
        props.updateVariableStringCallback(temp_wholeStringSeparated.join(props.separator),props.setVariableStringCallback)
        
    },[sTitle,sSection])

    return(
        <div>
            {sSectionId.map((element,index)=>{
                return(
                <div key = {element}>
                    <button onClick ={()=>{
                        setCurrentId(CurrentId + 1)

                        let temp_setsTitle = sTitle
                        temp_setsTitle.splice (index, 0, "")
                        setsTitle(temp_setsTitle)

                        let temp_sSection = sSection
                        temp_sSection.splice (index, 0, "")
                        setsSection(temp_sSection)

                        let temp_sSectionId = sSectionId
                        temp_sSectionId.splice (index, 0, CurrentId+1)
                        setsSectionId(temp_sSectionId)

                    }}>Add Section</button><br/>
                    Subsection {index + 1}
                    <button 
                        onClick ={()=>{
                            setsTitle(sTitle.filter((__ , i)=> i !== index))
                            setsSection(sSection.filter((__ , i)=> i !== index))
                            setsSectionId(sSectionId.filter((__ , i)=> i !== index))
                        }}>
                    x</button>
                    <div> Title: <br/> 
                    <input type="text"onChange={(e)=>{
                        var sTitle_temp = [...sTitle]
                        sTitle_temp [index] = e.target.value
                        setsTitle(sTitle_temp)
                    }}></input>
                    </div>
                    <div> Content:
                    <textarea onChange={(e)=>{
                        var sSection_temp = [...sSection]
                        sSection_temp [index] = e.target.value
                        setsSection(sSection_temp)

                    }}></textarea>
                    </div>
                </div>
                )
            })}
        <button onClick ={()=>{
            setCurrentId(CurrentId+1)
            setsSectionId([...sSectionId,CurrentId+1])
            setsTitle([...sTitle,""])
            setsSection([...sSection,""])
        }}>Add Section</button>
    </div>
        )
}