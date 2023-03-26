import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { modle/* , showPage */ } from '../App.js'
import '../stylesheets/questions.css'
/* import { showAnswers } from './answers.js' */
/* import { addTagLink } from './alltags.js' */

export function Question ({ qid, answers, views, title, tagList, askedBy, date, unans }) {
  if (unans && answers !== 0) return undefined
  return (
    <tr>
      <td className="qTD">
        {answers} answers <br />
        {views} views
      </td>

      <td className="qTD">
        <a className="qlink" /* onClick={showAnswers(qid, true)} */>
          {title}
        </a>
        <br/>
        {tagList.map((tag) => (
          <button key={tag} className="qtag" /* onClick={addTagLink(tag, modle.findTagName(tag))} */>
            {modle.findTagName(tag)}
          </button>
        ))}
      </td>

      <td className="qTD"><b>{askedBy}</b> {`asked ${modle.formatDate(date)}`}</td>
    </tr>
  )
}
Question.propTypes = {
  qid: PropTypes.string.isRequired,
  answers: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  tagList: PropTypes.array.isRequired,
  askedBy: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  unans: PropTypes.bool.isRequired
}

export default function Questions ({ searchQuery }) {
  const [sortOrder, setSortOrder] = useState('Newest')
  const [questionList, setQuestionList] = useState([])
  const [qCount, setQCount] = useState(0)

  function search (query, q = modle.getAllQstns(), t = modle.getAllTags()) { // Maybe move this to another file.
    const searchTerms = query.toLowerCase().split(' ')
    const searchWords = searchTerms.filter((word) => !/^\[\S+\]$/.test(word)) /* Words are those that are not surrounded in brackets */
    const searchTags = searchTerms
      .filter((word) => /^\[\S+\]$/.test(word)) /* Tests for [x] for tags */
      .map((tag) => tag.replace(/\[|\]/g, '')) /* Deletes the brackets from each tag */
    const out = []
    for (let i = 0; i < q.length; i++) {
      if (
        (searchWords.some((term) =>
          q[i].title.toLowerCase().includes(term) || /* Title includes a search term */
          q[i].text.toLowerCase().includes(term) /* Description includes the search term */
        ) || searchWords.length === 0) /* Or there are no search words */ && /* AND */
        (q[i].tagIds.some((tag) =>
          searchTags.some((term) => term === t.find((x) => x.tid === tag).name) /* Tag name matches a search tag */
        ) || searchTags.length === 0) /* Or there are no search tags */
      ) out.push(q[i])
    }
    console.log(`Searched "${query}", words: [ ${searchWords} ], tags: [ ${searchTags} ]`)
    return out
  }

  useEffect(() => {
    function fetchQuestions (qList = modle.getAllQstns()) {
      /* Sort Options */
      if (searchQuery) qList = search(searchQuery)
      if (sortOrder === 'Newest' || sortOrder === 'Unanswered') {
        /* console.log('Sorting by Newest') */ qList = qList.sort((a, b) => (b.askDate > a.askDate) ? -1 : 1)
        qList.reverse()
      } else if (sortOrder === 'Active') {
        /* console.log('Sorting by Active') */ qList.sort(compareActive)
      }

      /* This line is needed to have a dotted line on top */
      const qL = qList.map((question) => {
        if (sortOrder === 'Unanswered' && question.ansIds.length !== 0) return undefined
        return (
          <Question
            qid={question.qid}
            answers={question.ansIds.length}
            views={question.views}
            title={question.title}
            tagList={question.tagIds}
            askedBy={question.askedBy}
            date={question.askDate}
            key={question.qid}
            unans={sortOrder === 'Unanswered'}
          />
        )
      })
      setQuestionList(qL)
      setQCount(qL.filter(q => q).length)
      return qL
    }
    fetchQuestions()
  }, [sortOrder])

  function setNewest () {
    setSortOrder('Newest')
  }

  function setActive () {
    setSortOrder('Active')
  }

  function setUnanswered () {
    setSortOrder('Unanswered')
  }

  function compareActive (a, b) {
    let aLatest = 0
    let bLatest = 0
    const ans = modle.getAllAnswers()
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
    <div className="content">
      <p id="questioncount">
        {`${qCount === 1
          ? qCount + ' question'
          : qCount === 0 ? 'No Questions Found.' : qCount + ' questions'
          }`}
      </p>
      <button id="newbutt" className="questionsort" onClick={setNewest}>Newest</button>
      <button id="activebutt" className="questionsort" onClick={setActive}>Active</button>
      <button id="unbutt" className="questionsort" onClick={setUnanswered}>Unanswered</button>
      <br id="liststart"/>
      <table className="questions">
        <tbody>
          {questionList}
        </tbody>
      </table>
      {/* <p id="nosearchresults">No Questions Found.</p> */}
    </div>
  )
}
Questions.propTypes = {
  searchQuery: PropTypes.string
}
