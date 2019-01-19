import React from 'react'
import PropTypes from 'prop-types'
import CreateDoc from './CreateDoc.js'
import { Link } from 'gatsby'
import './_docs.scss'

function formatSlug(title) {
  return title.toLowerCase().replace(/\s/g, '-');
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const months = ['January', 'February', 'March',
    'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December']
  const hh = date.getUTCHours()
  // let seconds = date.getUTCSeconds()
  let minutes = date.getUTCMinutes()
  let hour = hh
  let dayTime = 'AM'
  if (hour >= 12) {
    hour = hh - 12
    dayTime = 'PM'
  }
  if (hour == 0) {
    hour = 12
  }

  minutes = minutes < 10 ? '0' + minutes : minutes
  // seconds = seconds < 10 ? '0' + seconds : seconds

  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, at ${hour}:${minutes} ${dayTime}`
}

const Docs = ({ docs }) => (
  <div className="docs-container">
    {docs.map(doc => (
      <div
        key={doc._id}
        className="docs-item"
      >
        <div className="icon thistle">
          <span className="doc-icon doc">☰</span>
          <span className="doc-type">README</span>
        </div>
        <Link
          to={`/doc/${formatSlug(doc.title)}`}
        >
          <h2>{doc.title}</h2>
          <p>Created on {formatDate(doc.created_at)}</p>
        </Link>
      </div>
    ))}
    <CreateDoc />
  </div>
)

Docs.propTypes = {
  docs: PropTypes.array.isRequired,
}

export default Docs
