import './App.css';
import { useState } from "react"
import {nanoid} from "nanoid"

function App() {
  const [questions, setQuestions] = useState("")
  const [settings, setSettings] = useState({
    numberOfQuestions: "10",
    category: "11",
    difficulty: "medium",
    type: "multiple"
  })
  const [view, setView] = useState("start")
  const [questionCount, setQuestionCount] = useState(0)
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0)

  const getNewQuestions = async (e) => {
    e.preventDefault()
    const url = `https://opentdb.com/api.php?amount=${settings.numberOfQuestions}&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}`
    console.log(url)
    fetch(url).then(res => res.json()).then(resData => setQuestions(resData.results))

    setView("quiz")
    setQuestionCount(0)
    setNumberOfCorrectAnswers(0)
  }

  const handleAnswerClick = (e) => {
    let isCorrect;
    if (questions.map(qObj => qObj.correct_answer).includes(e.target.textContent)) {
      isCorrect = true
    }
    setNumberOfCorrectAnswers(prev => isCorrect ? prev + 1 : prev)
    setQuestionCount(prev => prev + 1)
    setView(prev => {
      if (questions[questions.length - 1].correct_answer === e.target.textContent || questions[questions.length - 1].incorrect_answers.includes(e.target.textContent)) {
        console.log("result")
        return "result"
      } else {
        return prev
      }
    })
  }

  const handleNumberOfQuestionsChange = (e) => {
    setSettings(prev => {
      return (
        { ...prev, numberOfQuestions: e.target.value }
      )
    })
  }

  const handleCategoryChange = (e) => {
    setSettings(prev => {
      return (
        { ...prev, category: e.target.value }
      )
    })
  }

  const handleDifficultyChange = (e) => {
    setSettings(prev => {
      return (
        { ...prev, difficulty: e.target.value }
      )
    })
  }

  /* const handleTypeChange = (e) => {
    setSettings(prev => {
      return (
        { ...prev, type: e.target.value }
      )
    })
  } */

  const Start = () => {
    return (
      <div id="start">
        <form onSubmit={(e) => getNewQuestions(e)}>
          <div id="numberOfQuestionsDiv">
            <label>
              Number of questions:
              <select onChange={(e) => handleNumberOfQuestionsChange(e)} value={settings.numberOfQuestions}>
                <option value="10">
                  10
                </option>
                <option value="20">
                  20
                </option>
                <option value="30">
                  30
                </option>
              </select>
            </label>
          </div>

          <div id="categoryDiv">
            <label>
              Category:
              <select onChange={(e) => handleCategoryChange(e)} value={settings.category}>
                <option value="11">
                  Entertainment: Film
                </option>
                <option value="21">
                  Sports
                </option>
                <option value="27">
                  Animals
                </option>
              </select>
            </label>
          </div>

          <div id="difficultyDiv">
            <label>
              Difficulty:
              <select onChange={(e) => handleDifficultyChange(e)} value={settings.difficulty}>
                <option value="easy">
                  easy
                </option>
                <option value="medium">
                  medium
                </option>
                <option value="hard">
                  hard
                </option>
              </select>
            </label>
          </div>

          {/* <div id="typeDiv">
            <label>
              Type:
              <select onChange={(e) => handleTypeChange(e)} value={settings.type}>
                <option value="multiple">
                  Multiple Choice
                </option>
                <option value="boolean">
                  True / False
                </option>
              </select>
            </label>
          </div> */}
          <button id="startButton" type="submit">START</button>
        </form>
      </div>
    )
  }

  const Quiz = () => {
    console.log(questions)
    if (questions) {
      return (
        <div id="quiz">
          {questions.map(q => <div style={{ display: questions.findIndex(x => x.question === q.question) === questionCount ? "grid" : "none" }} className="question-card" key={nanoid()}>
            <div className="question">{q.question}</div>
            {q.incorrect_answers.concat(q.correct_answer).map(el => <div value={el} onClick={e => handleAnswerClick(e)} key={nanoid()} className="answerAlternative">{el}</div>)}
          </div>)}
        </div>
      )
    } else {
      return ""
    }
  }

  const Result = () => {
    return (
      <div id="result">
        {`Your score is ${numberOfCorrectAnswers} out of ${questions.length}.`}
      </div>
    )
  }

  const Header = () => {
    // back to start-page
    return (
      <div id="header">
        <button id="settingsButton" onClick={() => setView("start")}>SETTINGS</button>
      </div>
    )
  }

  const Footer = () => {
    return (
      <div id="footer">
        <p>Questions are from <a href="https://opentdb.com/api_config.php">OPEN TRIVIA DATABASE</a> for use in programming projects.</p>
      </div>
    )
  }

  return (
    <div className="App">
      <div id="wrapper">
        <Header />
        {view === "start" && <Start />}
        {view === "quiz" && <Quiz />}
        {view === "result" && <Result />}
        <Footer />
      </div>
    </div>
  );
}

export default App;
