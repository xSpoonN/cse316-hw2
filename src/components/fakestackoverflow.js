/* import Model from '../models/model.js' */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Questions from './questions.js'
import '../stylesheets/fakeStackOverflow.css'

export function Header ({ searchQueryChange }) {
  const [searchQuery, setSearchQuery] = useState('')
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) searchQueryChange(searchQuery)
  }
  return (
    <div className="header">
      {/* <img src="QueueUnderflow.png" alt="logo" style={{ height: '8%', width: 'auto', position: 'fixed', left: '10px' }}/> */}
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

export function Sidebar () {
  return (
    <div id="sidebar">
      <a className="sidebutt" id="questiontab">Questions</a> {/* Href to get to different pages */}
      <a className="sidebutt" id="tagtab">Tags</a>
    </div>
  )
}

export default function fakeStackOverflow () {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div>
      <Header searchQueryChange={ setSearchQuery }/>
      <Sidebar />
      <Questions key={ searchQuery } searchQuery={ searchQuery }/>
    </div>
  )
}
