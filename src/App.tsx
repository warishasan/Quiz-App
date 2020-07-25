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

React.useEffect( () => {
  async function fetchData() {
    const quest: quizDataType[] = await Quizservice(5, 'easy');
    setQuestions(quest)
  }
  fetchData();
  
}, [fetchAgain]);



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
