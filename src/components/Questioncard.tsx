import React, {useState} from 'react';
import { questionPropsType } from '../types/QuizTypes';
import '../App.css';


const Questioncard: React.FC<questionPropsType> = ({ question, options, callback }) => {

  
let [selectedAnswer, setSelectedAnswer] = useState<string>("");

  return (
    <div className = "formElement" >

      <h4 className = "question">{question}</h4>
    <form onSubmit = {(e:React.FormEvent<EventTarget>) => callback(e,selectedAnswer)}>
      {
      options.map((opt : string, ind: number) => {return (

          <div className = "radio" key = {ind}>
          <label>
          <input  type = "radio"
          name = "opt" 
          required 
          value = {opt}
          checked = {selectedAnswer === opt}
          onChange = {(e) => {setSelectedAnswer(e.target.value)}}
          ></input>



          {opt}

          </label>

          </div>

      )})
    }
      <input className = "submit" type = "submit"/>
    </form>
    </div>
  );
}

export default Questioncard;
