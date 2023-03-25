/* import Model from '../models/model.js' */
import React from 'react'
import Questions from './questions.js'
import '../stylesheets/fakeStackOverflow.css'

export function Header () {
  return (
    <div className="header">
      {/* <img src="QueueUnderflow.png" alt="logo" style={{ height: '8%', width: 'auto', position: 'fixed', left: '10px' }}/> */}
      <h1 id="title">Queue Underflow</h1>
      <input type="text" id="search" placeholder="Search ..." /* onKeyDown="checkSearch(event)" *//>
    </div>
  )
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
  return (
    <div>
      <Header />
      <Sidebar />
      <Questions />
    </div>
  )
}
