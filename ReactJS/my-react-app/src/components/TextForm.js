import React,{useState} from 'react';

//import { useSpeechSynthesis } from 'react-speech-kit';

export default function TextForm(props) {
    const[text,setText]=useState("");
//     let {speak} = useSpeechSynthesis();
//   const handleOnspeak = () => {
//     speak({text:text})
    
//   }
   const handleUpperCaseText=()=>{
        // console.log("click on uppercase button: "+text);
        let newText=text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to UpperCase!","success");

    }
    const handleLowerCaseText=()=>{
        // console.log("click on uppercase button: "+text);
        let newText=text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to LowerCase!","success");
    }
    const handleonChange=(event)=>{
        // console.log("click on handleonChange");
        setText(event.target.value)
        countTimeforWords();
        
    }

    const handleCopyClipBoard=()=>{
        let text=document.getElementById('myBox');
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Copy To ClipBoard!","success");
    }

    const Reset=()=>{
        setText("")
        props.showAlert("Text Cleared!","success");
    }

    const countTimeforWords=()=>{
        if(text.split(' ').filter(w=>w!=='').length>0){
            console.log(0.008 * (text.split(' ').filter(w=>w!=='').length));
           setTime(0.008 * (text.split(' ').filter(w=>w!=='').length))
        }
        if(text.length<=0){
            setTime(0.000)
        }
    }

    const[time,setTime]=useState(
         0.008 * text.split(' ').filter(w=>w!=='').length
        
    );

    const onAlternatingCase = () => {
        let newtext = ""
        for (let index = 0; index < text.length; index++) {
            if ((index % 2) === 0) {
                newtext += text[index].toLowerCase()
            }
            else {
                newtext += text[index].toUpperCase()
            }

        }
        setText(newtext)
        props.showAlert("Alertnating Case!","success");
    }

    const capitalFirstLetter = () => {
        let tempText = text.split(/[  ]+/);
        let newText="";
        tempText.forEach((e)=>{
            e=e.charAt(0).toUpperCase()+e.slice(1);
            newText=newText+e+" ";
        })
        setText(newText);
        props.showAlert("Capitalized First Char Of Each Words!","success");

    }

    const firstCap=()=>{
        let newText = text.toLowerCase() 
        let newText2 = newText.charAt(0).toUpperCase() + newText.slice(1);
        setText(newText2);
        props.showAlert("Capitalized first word!","success");
    }

    const handleEmail =()=>{
        let newText=text.split("@");
        let later = newText[1].split(".");
        setText("Your account is on "+ later[0] + " And your username could be " + newText[0]);
        props.showAlert("Details of Emails","success");
    }
    
  return (
      <>
    <div className="container" style={{color:props.mode==='dark'?'white':'black'}} >
     <h1> {props.heading}</h1>
<div className="mb-3">
    
  {/* <label htmlFor="myBox" className="form-label">Example textarea</label> */}
  <textarea className="form-control" value={text} onChange={handleonChange} style={{background:props.mode==='dark'?'grey':'white',color:props.mode==='dark'?'white':'black'}} id="myBox" rows="8"></textarea>
</div>
<button className="btn btn-primary mx-1" onClick={handleUpperCaseText}>UPPER CASE</button>
<button className="btn btn-primary mx-1" onClick={handleLowerCaseText}>lower case</button>
<button className="btn btn-primary mx-1" onClick={handleCopyClipBoard}>Copy To ClipBoard</button>
<button className="btn btn-primary mx-1" onClick={Reset}>Clear</button>
<button className="btn btn-primary mx-1" onClick={onAlternatingCase}>aLtErNaTiNg cAsE</button>
<button className="btn btn-primary mx-1" onClick={capitalFirstLetter}>Capitalized Case </button>
<button className="btn btn-primary mx-1" onClick={firstCap}>Sentance case</button>
<button className="btn btn-primary mx-1" onClick={handleEmail}>Email Info</button>
{/* <button className="btn btn-primary mx-1" onClick={handleOnspeak}>Speak Text</button> */}
</div>
<div className="container my-3" style={{color:props.mode==='dark'?'white':'black'}}>
    <h2>Your text summary</h2>
    <p>{text.split(" ").filter(word => word !== '').length} <b>words</b> | {text.length} <b>characters</b> | {text.split("/\r\n|\r|\n/").length} <b>Lines</b> </p>
    <p>{time} Minutes taken to read the words</p>
    <h2>Preview</h2>
    <p>{text.length>0 ? text:"Enter something in the above textBox body to preview it here!"}</p>
</div>
    </>
  )
}
