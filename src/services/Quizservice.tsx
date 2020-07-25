import { incomingDataType } from ".././types/QuizTypes"
import {quizDataType} from ".././types/QuizTypes"
async function Quizservice( totalQuestions: number, level: string) : Promise<quizDataType[]>  {

    const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)

const incoming = await fetch (`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`);
const {results} = await incoming.json();

return (

    results.map((result:incomingDataType) => {
        return{
    question: result.question,
    answer: result.correct_answer,
    options: shuffleArray(result.incorrect_answers.concat(result.correct_answer))
}

    }
)
)

}

export default Quizservice;
