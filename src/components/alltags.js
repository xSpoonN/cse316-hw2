import React from 'react'
import PropTypes from 'prop-types'
import { modle } from '../App.js'

export default function AllTags () {
  const tags = modle.getAllTags().map((item, index) => {
    return <Tag key={item.tid} tag={item} index={index} />
  })

  return (
    <>
    <p id="t_tagcount">{tags.length} Tags</p>
    <p id="t_alltags">All Tags</p>
    <br /><br /><br />
    <div id="tagcontainer">
      {tags}
    </div>
    </>
  )
}

export function Tag ({ tag, index }) {
  const c = modle.getQuestionCountByTagId(tag.tid)
  return (
    <div className="tagbox" style={{ gridColumn: index % 3, gridRow: Math.floor(index / 3) }}>
      <p className="taglink">{tag.name}</p>
      <p className="tagqcount">{c} question{c === 1 ? '' : 's'}</p>
    </div>
  )
}
Tag.propTypes = {
  tag: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}
