import React from 'react'

const ProjectDetails = (props) => (
  <div className='ProjectDetails'>
    <div className='ProjectDetails-date'>Jan 10</div>
    <div className='ProjectDetails-time'>7:00{props.time}</div>
    <div className='ProjectDetails-award'>30 CAPS{props.award}</div>
    <div className='ProjectDetails-duration'>{props.duration}</div>
  </div>
)

export default ProjectDetails
