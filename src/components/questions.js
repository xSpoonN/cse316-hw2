import React, { useState, useEffect } from 'react'
import Model from '../models/model.js'
import { modle, showPage } from './index.js'
import { showAnswers } from './answers.js'
import { addTagLink } from './alltags.js'

export default function Questions () {
  const [sortOrder, setSortOrder] = useState('Newest')
  const [questionList, setQuestionList] = useState([])

  useEffect(() => {
    fetchQuestions()
  }, [sortOrder])

  function resetTable (newQ) {
    // TODO: implement
  }

  function search (query) {
    // TODO: implement
  }

  function setNewest () {
    setSortOrder('Newest')
  }

  function setActive () {
    setSortOrder('Active')
  }

  function setUnanswered () {
    setSortOrder('Unanswered')
  }

  function fetchQuestions (qList = modle.getAllQstns()) {
    // TODO: implement
  }

  function compareActive (a, b) {
    let aLatest = 0
    let bLatest = 0
    const ans = modle.getAllAnswers();
    for (let i = 0; i < a.ansIds.length; i++) { // Finds the latest answer
      const answe = ans.find((x) => x.aid === a.ansIds[i])
      if (aLatest === 0 || answe.ansDate > aLatest) {
        aLatest = answe.ansDate
      }
    }
    for (let i = 0; i < b.ansIds.length; i++) { // Finds the latest answer
      const answe = ans.find((x) => x.aid === b.ansIds[i])
      if (bLatest === 0 || answe.ansDate > bLatest) {
        bLatest = answe.ansDate
      }
    }
    return bLatest - aLatest
  }

  return (
    <div>
      <p id="questioncount">{questionList.length} questions</p>
      <button id="newbutt" className="questionsort" onClick="setNewest()">Newest</button>
      <button id="activebutt" className="questionsort" onClick="setActive()">Active</button>
      <button id="unbutt" className="questionsort" onClick="setUnanswered()">Unanswered</button>
      <br id="liststart"/>
      <table className="questions">
        {fetchQuestions()}
      </table>
      <p id="nosearchresults" style="display:none;font-weight:bold">No Questions Found.</p>
    </div>
  )
}
