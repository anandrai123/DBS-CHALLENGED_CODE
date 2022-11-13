
import { useState } from 'react';
import './App.css';
import Alert from './components/Alert';
import About from './components/About';
import NavBar from './components/NavBar';
import TextForm from './components/TextForm';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  const[mode ,setMode]=useState("light");
  const[alert,setAlert]=useState(null);
 // const[text ,setText]=useState("Enable to Light Mode"); // 2nd way
 // const[value ,setValue]=useState("light");
 const showAlert=(message,type)=>{
      setAlert({
        msg:message,
        type:type

      })
      setTimeout(() => {
        setAlert(null)
      }, 1500);
 }
  const toggleMode=()=>{
    if(mode==='light'){
      setMode('dark');
      document.body.style.background='#042743';
      showAlert("Dark mode has been enabled","success");
    //  setText('Enable to Light Mode')
    //  setValue('light')
    }
    else{
      setMode('light');
      document.body.style.background='white';
      showAlert("Light mode has been enabled","success");
     // setText('Enable to Dark Mode')
      //setValue('dark')
    }
  }
  return (
   <>
   <Router>
   <NavBar title="TextUtils" mode={mode} toggleMode={toggleMode} /> 
   <div className="container my-3">
 <Alert alert={alert}/>
 
    <Switch>
      {/* /user-->comp 1
      /user/home--> comp 2
      react always point to partial if we are mot usimg exact */}
          <Route exact path= "/about">
            <About />
          </Route>
          <Route exact path= "/">
            <TextForm heading="Enter the text to analyze below!" mode={mode} showAlert={showAlert}/>
          </Route>
      </Switch>
  
     {/* <><About></About></> */}
   </div>
   </Router> 
   </>
  );
}

export default App;
