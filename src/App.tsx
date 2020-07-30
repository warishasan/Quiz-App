import React, {useState} from 'react';
import './App.css';
import Quizservice from './services/Quizservice';
import {quizDataType} from "./types/QuizTypes";
import QuestionCard from './components/Questioncard';



function App() {


 let [questions,setQuestions] = useState<quizDataType[]>([]);
 let [index,setIndex] = useState<number>(0);
 let [score,setScore] = useState<number>(0);
 let [showResult,setShowResult] = useState<boolean>(false);
 let [fetchAgain,setFetchAgain] = useState<boolean>(false);

 let [homeScreen,setHomeScreen] = useState<boolean>(true);
 let [amount,setAmount] = useState<number>(5);
 let [level,setLevel] = useState<string>("0");
 let [type,setType] = useState<string>("0");
 let [category,setCategory] = useState<string>("0");

React.useEffect( () => {

  
  async function fetchData() {

    if (homeScreen === false){
    const quest: quizDataType[] = await Quizservice(amount,level,type,category);
    setQuestions(quest)
  }
  }
  fetchData();


  
}, [fetchAgain,homeScreen,level,amount,category,type]);



const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
  e.preventDefault();
  
  if (userAns === questions[index].answer){
    setScore(score+1);
    
  }

  if (index !== questions.length-1 ){
  setIndex(index+1);
}
else{
  setShowResult(true);
}

}

function resetQuiz (): void{
setScore(0);
setIndex(0);
setShowResult(false);
setFetchAgain(!fetchAgain);
setQuestions([]);
setHomeScreen(true)


}


function handleOptions(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  setHomeScreen(false);

}


if (homeScreen === true){

  return (

    <div  className = "formContainer">
      <h1 className = "heading">Select Options to generate the quiz</h1>
      <div>
        <form id = "form" onSubmit = {(e)=>handleOptions(e)}>
        <label className = "formSubHeadings" > Enter No. of Questions: </label>
        <input className = "formEntries"  value = {amount} name = "amount" type = "number" max = "50" min = "1" required onChange= {(e)=> {setAmount(parseInt(e.target.value))}} ></input>
        
        

        <label className = "formSubHeadings">Select Level of Difficulty:   </label>
        <select className = "formEntries" name="level" id="level" onChange = {(e)=>setLevel(e.target.value)}>
        <option value="0">Any</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>

    </select>

       
        

    <label className = "formSubHeadings">Select Type:   </label>
        <select className = "formEntries" name="type" id="type" onChange = {(e)=>setType(e.target.value)} >

        <option value="0">Any</option>
        <option value="boolean">True/False</option>
        <option value="multiple">Multiple Choice Questions</option>
      
       
    </select>



    
    <label className = "formSubHeadings">Select Category:   </label>
        <select className = "formEntries" name="category" id="category"  onChange = {(e)=>setCategory(e.target.value)}>
        <option value="0">Any</option>
        <option value="9">General Knowledge</option>
        <option value="10">Books</option>
        <option value="11">Film</option>
        <option value="12">Music</option>
        <option value="13">Musicals and Theatres</option>
        <option value="14">Television</option>
        <option value="15">Video Games</option>
        <option value="16">Board Games</option>
        <option value="17">Science and Nature</option>
        <option value="18">Computers</option>
        <option value="19">Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Comics</option>
        <option value="30">Gadgets</option>
        <option value="31">Japanese Anime and Manga</option>
        <option value="32">Cartoon and Animations</option>


       
    </select>


    <input className = "submit" type = "submit"/>

        </form>
      </div>

    </div>
  )
}


if(showResult === true){
  return(
    
    <div className = "formContainer">
    <h1 className = "heading" >Result</h1>
    <p className = "result">You have scored <b>{score}</b> out of <b>{questions.length}</b></p>
    <button className = "submit" onClick = {()=>{resetQuiz()}}>Reset Quiz</button>
    </div>
    
    )
  }
    


if(!questions.length){

  return (<h1 className = "formContainer">Loading</h1>)

}
  
  return (
    <div className="formContainer">
     <h1 className = "heading">QUIZ APP</h1>
     <QuestionCard  question = {questions[index].question} options = {questions[index].options} callback = {handleSubmit}></QuestionCard>
    </div>
  );

}
export default App;
