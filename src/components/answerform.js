import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/answerform.css' /* I'm not sure if this line even matters but why not ig */
/* import { modle } from '../App.js' */

export default function AnswerForm ({ setActivePage }) {
  const [user, setUser] = useState('')
  const [text, setText] = useState('')

  const [userError, setUserError] = useState('')
  const [textError, setTextError] = useState('')

  const handleUserChange = (event) => { setUser(event.target.value) }
  const handleTextChange = (event) => { setText(event.target.value) }

  function handleSubmit (event) {
    event.preventDefault()

    if (checkQuestionForm()) {
      /* modle.addQuestion(stuff) */
      setActivePage('Answers') /* Probably have to modify this a bit to make it return to the last question */
    }
  }

  function checkQuestionForm () {
    let errFound = false

    /* Validate Username */
    if (!user.length) {
      setUserError('A username is required!'); errFound = true
    } else setUserError('')

    /* Validate Description */
    if (!text.length) {
      setTextError('A description is required!'); errFound = true
    } else setTextError('')

    return !errFound
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Username*</h2>
        <input type="text" name="answeruser" id="auser" value={user} maxLength="100" onChange={handleUserChange} />
        <p className="errormsg" id="ausererror">{userError}</p>

        <h2>Answer Text*</h2>
        <p style={{ fontStyle: 'italic' }}>Add details</p>
        <textarea name="answerdesc" id="atext" value={text} onChange={handleTextChange} cols={80} rows={10}></textarea>
        <p className="errormsg" id="atexterror">{textError}</p>
        <br /><br /><br /><br /><br />

        <input type="submit" id="postabutt" value="Post Answer" />
        <p style={{ textAlign: 'right' }}>* indicates mandatory fields</p>
      </div>
    </form>
    </>
  )
}
AnswerForm.propTypes = {
  setActivePage: PropTypes.func.isRequired
}
