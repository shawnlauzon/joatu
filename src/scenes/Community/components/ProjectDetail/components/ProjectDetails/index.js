import React from 'react'

const ProjectDetails = (props) => (
  <div className='ProjectDetails'>
    <div className='ProjectDetails-date'>{props.date}</div>
    <div className='ProjectDetails-time'>{props.time}</div>
    <div className='ProjectDetails-award'>{props.award}</div>
    <div className='ProjectDetails-duration'>{props.duration}</div>
  </div>
)

export default ProjectDetails
