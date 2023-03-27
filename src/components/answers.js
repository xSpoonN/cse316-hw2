import React from 'react'
import PropTypes from 'prop-types'
import { modle } from '../App.js'

export default function Answers () {
  const qid = 'q1' // Todo: get question id (HOWWWWWWWWWW)

  const answers = modle.getAnswersByQID(qid).map((item) => {
    return <Answer key={item.aid} answer={item} />
  })

  return (
    <>
    <button className="askqbutt">Ask Question</button>
    <br />
    <p id="ap_answercount"><b>{modle.getQuestionCount(qid)} answers</b></p>
    <p id="ap_questiontitle"><b>{modle.getQuestionTitle(qid)}</b></p>
    <br />
    <p id="ap_views"><b>{modle.getViews(qid)} views</b></p>
    <p id="ap_questiontext">{modle.getQuestionText(qid)}</p>
    <p id="ap_askedby"><b>{modle.getWhoAsked(qid)}</b> asked<br />{modle.formatDate(modle.getAskDate(qid))}</p>
    <br />
    <table id="ap_answers"><tbody>
      {answers}
    </tbody></table>
    <br />
    {answers.length === 0 && <p id="ap_noanswers"><i>No Answers Yet...</i></p>}
    <button id="ap_answerbutton">Answer Question</button>
    </>
  )
}

export function Answer ({ answer }) {
  const textWithLinks = answer.text
  return (
    <>
    <tr className="aRow">
      <td className="aTD aAns">{textWithLinks}</td>
      <td className="aTd aCred"><b>{answer.ansBy}</b> answered<br/>{modle.formatDate(answer.ansDate)}</td>
    </tr>
    </>
  )
}
Answer.propTypes = {
  answer: PropTypes.object.isRequired
}
