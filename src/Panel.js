import React, {useState, useEffect} from 'react'
import Alert from 'react-bootstrap/Alert'

export default function Panel (props) {
    const [title, setTitle] = useState("")

    // animate typing out the title
    useEffect (() => {
      if (title.length < props.title.length) {
        setTimeout (() => setTitle (props.title.slice(0, title.length+1)), 50)
      }
    })
  
    return (
      <Alert variant="panel" className="def-shadow" >
        <div className="scroll-anchor" id={props.id}></div>
        <Alert.Heading>{title}</Alert.Heading>
        <hr/>
        <div>
          {props.body}
        </div>
      </Alert>
    )
  }