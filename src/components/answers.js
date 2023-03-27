import React from 'react'
import PropTypes from 'prop-types'
import { modle } from '../App.js'

export default function Answers () {
  return (
    <>
    <table id="ap_answers"><tbody>
    <Answer answer={{ text: 'Hi', ansBy: 'DFSDFSSDFDSFSDF', ansDate: new Date() }}/>
    </tbody></table>
    </>
  )
}

export function Answer ({ answer }) {
  return (
    <>
    <tr className="aRow">
      <td className="aTD aAns">{answer.text}</td>
      <td className="aTd aCred"><b>{answer.ansBy}</b> answered<br/>{modle.formatDate(answer.ansDate)}</td>
    </tr>
    </>
  )
}
Answer.propTypes = {
  answer: PropTypes.object.isRequired
}
