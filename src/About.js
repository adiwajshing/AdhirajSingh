import React, {useState, useEffect} from 'react'
import resume from './resume.json'

export default function About () {
  return (
  <div style={{minHeight: "50vh"}}>
    <div style={{maxHeight: "60%"}}>
      <iframe height="30%" title="Where I Live" frameBorder="0" className="item" style={{float: "right", maxWidth: "70%"}}
  src={`${resume.locations.home}&key=AIzaSyBPCJuu3zpRG09ByoPeds51qzc7rfHXa3Y`}/>
      <p>{ resume.description }</p>  
    </div>
  </div>)
}