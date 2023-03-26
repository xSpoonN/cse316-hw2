/* import Model from '../models/model.js' */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Questions from './questions.js'
import PostQuestion from './questionform.js'
import Answers from './answers.js'
import AllTags from './alltags.js'
import AnswerForm from './answerform.js'
import '../stylesheets/fakeStackOverflow.css'
import '../stylesheets/questions.css'
import '../stylesheets/answerform.css'
import '../stylesheets/answers.css'
import '../stylesheets/alltags.css'

export function Header ({ searchQueryChange }) {
  const [searchQuery, setSearchQuery] = useState('')
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) searchQueryChange(searchQuery)
  }
  return (
    <div className="header" id="header">
      {/* <img src="../../QueueUnderflow.png" alt="logo" style={{ height: '8%', width: 'auto', position: 'fixed', left: '10px' }}/> */}
      <h1 id="title">Queue Underflow</h1>
      <input type="text"
      id="search"
      placeholder="Search ..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={handleKeyDown}/>
    </div>
  )
}
Header.propTypes = {
  searchQueryChange: PropTypes.func.isRequired
}

export function Sidebar ({ pageChange, activePage }) {
  const handlePageChange = (page) => pageChange(page)
  return (
    <div id="sidebar">
      <a className={activePage === 'Questions' ? 'sidebutt active' : 'sidebutt'} id="questiontab" onClick={() => handlePageChange('Questions')}>Questions</a>
      <a className={activePage === 'AllTags' ? 'sidebutt active' : 'sidebutt'} id="tagtab" onClick={() => handlePageChange('AllTags')}>Tags</a>
    </div>
  )
}
Sidebar.propTypes = {
  pageChange: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired
}

export function Page ({ searchQuery, activePage, setActivePage }) {
  const switchToPage = (page) => () => setActivePage(page)

  switch (activePage) {
    case 'Questions': /* console.log('Switching to Questions') */
      return (
        <>
          <p className="contentheader">All Questions</p>
          <button className="askqbutt" onClick={switchToPage('PostQuestion')}>Ask Question</button>
          <Questions key={ searchQuery } searchQuery={ searchQuery }/>
        </>
      )
    case 'PostQuestion': /* console.log('Switching to PostQuestion') */
      return (
        <PostQuestion setActivePage={setActivePage}/>
      )
    case 'Answers': /* console.log('Switching to Answers') */
      return (
        <Answers />
      )
    case 'PostAnswer': /* console.log('Switching to PostAnswer') */
      return (
        <AnswerForm setActivePage={setActivePage}/>
      )
    case 'AllTags': /* console.log('Switching to AllTags') */
      return (
        <AllTags />
      )
  }
}
Page.propTypes = {
  searchQuery: PropTypes.string,
  activePage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
}

export default function fakeStackOverflow () {
  const [searchQuery, setSearchQuery] = useState('')
  const [activePage, setActivePage] = useState('Questions')

  return (
    <div>
      <Header searchQueryChange={ setSearchQuery } className="header"/>
      <Sidebar pageChange={(page) => setActivePage(page)} activePage={activePage}/>
      <div className="content">
        <Page searchQuery={searchQuery} activePage={activePage} setActivePage={setActivePage}/>
      </div>
    </div>
  )
}
