import './App.css';
import { useState, useEffect } from "react"

function App() {
  const [questions, setQuestions] = useState("")
  const [settings, setSettings] = useState({
    numberOfQuestions: "10",
    category: "11",
    difficulty: "medium",
    type: "multiple"
  })
  const [view, setView] = useState("start")

  const getNewQuestions = async (e) => {
    e.preventDefault()
    console.log(settings, settings.numberOfQuestions)
    const url = `https://opentdb.com/api.php?amount=${settings.numberOfQuestions}&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}`
    console.log(url)
    fetch(url).then(res => res.json()).then(resData => console.log(resData))
    
    setView("quiz")
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

  const handleTypeChange = (e) => {
    setSettings(prev => {
      return (
        { ...prev, type: e.target.value }
      )
    })
  }

  const Start = () => {
    return (
      <div id="start">
        <form onSubmit={(e) => getNewQuestions(e)}>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    )

  }

  const Quiz = () => {
    console.log(questions)
    if (questions) {
      return (
        <div id="quiz">
          {/* {questions.map(q => q)} */}
        </div>
      )
    } else {
      return ""
    }
  }

  const Result = () => {
    return (
      <div id="result">

      </div>
    )
  }

  const Header = () => {
    // back to start-page
    return (
      <div id="header">
        <button onClick={() => setView("start")}>HOME</button>
      </div>
    )
  }

  const Footer = () => {
    return (
      <div id="footer">
        <p>Questions from <a href="https://opentdb.com/api_config.php">OPEN TRIVIA DATABASE</a> for use in programming projects.</p>
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
