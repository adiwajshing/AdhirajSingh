import React, {useState, useEffect} from 'react'

export default function DelayLoad (props) {
    const [hidden, setHidden] = useState(true)
    useEffect ( () => { setTimeout (() => setHidden(false), props.time) }, null)
    
    return !hidden && 
              <div style={{opacity: "0", animation: "reveal 0.7s linear 0s forwards"}}> 
                {props.children}
              </div>
  }