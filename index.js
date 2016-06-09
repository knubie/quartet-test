import React from 'react'
import ReactDOM from 'react-dom'
import Questions from './components/Questions'

ReactDOM.render(
  <div>
    <span className={"title"}>Patient Health Questionnaire (PHQ-9)</span>
    <h3>
      Over the last two weeks, how often have you been bothered by any of the following problems?
    </h3>
    <hr />
    <Questions />
  </div>
, document.getElementById('content'))
