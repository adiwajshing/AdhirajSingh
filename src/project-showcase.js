import React, {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Spinner from 'react-bootstrap/Spinner'

import SyntaxHighlighter from 'react-syntax-highlighter' 
import def from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark'

import resume from './resume.json'
import GitFetch from './GitFetch'

export default function (props) {
    const [projects, setProjects] = useState (null)
    const [cHeight, setHeight] = useState ("80vh") // carousel item height

    const setToMaxHeight = () => {
      const heights = projects.map ((p, i) => document.getElementById(`project_${i}`).scrollHeight)
      const h = Math.max.apply(null, heights) + "px"
      if (h != cHeight) setHeight (h)
    }

    useEffect (() => {
      const timer = window.setInterval(() => projects && setToMaxHeight(), 1000)
      return () => clearInterval (timer)
    }, [projects])

    useEffect (() => {
      GitFetch.fetchDemoRepos (resume.github.username)
      .then (ps => setProjects (ps))
    }, [])
  
  
    return (
      <>
      <Carousel style={{minHeight: "80vh"}}>
        {
          projects ?
          projects.map ((content,i) =>
            <Carousel.Item key={`project_${i}`} id={`project_${i}`} style={{height: cHeight}}>
                <div className="def-flex item-container">
                  <div className="showcase-text">
                    <center>
                      <a href={content.url} target="_blank" rel="noopener noreferrer" className="heading"> {content.display_name} </a>
                    </center>
                    <hr/>
                    <p>
                    {
                      content.content.join (" ")
                    }
                    </p>
                  </div>
                  {
                    content.sample.type === 'video' 
                    ?
                    <video playsInline autoPlay muted className="item">
                      <source src={content.sample.url}/>
                    </video>
                    :
                    <SyntaxHighlighter className="item" language={content.sample.language} style={def}>
                      {content.sample.text}
                    </SyntaxHighlighter>
                  }
                </div>
            </Carousel.Item>
          )
          : <Spinner />
        }
      </Carousel>
      <br/>
      <div style={{fontSize: "small"}}>
        * All this data is pulled directly from my GitHub, so I never have to update the website to add content. Zero maintainence!
      </div>
      </>
    )
  }