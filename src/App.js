import React, {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Spinner from 'react-bootstrap/Spinner'

import SyntaxHighlighter from 'react-syntax-highlighter' 
import def from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark'

import Data from './data'
import Panel from './Panel'
import Main from './Main'
import Skillset from './skillset'
import GitFetch from './GitFetch'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './intro.css'
import './bootstrap-overloads.css'

function About () {
  return (
  <div style={{minHeight: "50vh"}}>
    <div style={{maxHeight: "60%"}}>
      <iframe height="40%" title="Where I Live" frameBorder="0" className="item" style={{float: "right", maxWidth: "90%"}}
  src={Data.about.map}/>
      <p style={{color: "white", fontSize: "20px"}}>{ Data.about.text }</p>  
    </div>

  </div>)
}
 
function ProjectShowcase (props) {
  const [projects, setProjects] = useState (null)
  const [cHeight, setHeight] = useState ("80vh") // carousel item height
  const setToMaxHeight = () => {
    const heights = projects.map ((p, i) => document.getElementById(`project_${i}`).scrollHeight)
    const h = Math.max.apply(null, heights)*1.05 + "px" 
    if (h != cHeight) setHeight (h)
  }
  useEffect (() => {
    if (projects) setTimeout(() => setToMaxHeight(), 2000)
  }, [projects])
  useEffect (() => {
    GitFetch.fetchDemoRepos (Data.githubID)
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
    <div>
      * All this data is pulled directly from my GitHub, so I never have to update the website to add content. Zero maintainence!
    </div>
    </>
  )
}
function DelayLoad (props) {
  const [hidden, setHidden] = useState(true)
  useEffect ( () => { setTimeout (() => setHidden(false), props.time) }, [])
  
  return !hidden && 
            <div style={{opacity: "0", animation: "reveal 0.7s linear 0s forwards"}}> 
              {props.component}
            </div>
}
function App() {
  const panels = [
    {
      title: "About Me",
      shortTitle: "About",
      body: About(),
      id: "about"
    },
    {
      title: "Open-Source Projects I'm Proud Of",
      shortTitle: "Projects",
      body: <ProjectShowcase/>,
      id: "projects"
    },
    {
      title: "Things I'm Good At",
      shortTitle: "Skillset",
      body: Skillset(),
      id: "skills"
    }
  ]

  return (
    <div className="App">
      
      <Main animDelay={4.5} panels={ panels.map (e => ({title: e.shortTitle, id: e.id})) }/>
      <div style={{width: "100%"}}>
      {
        panels.map ((panel, i) => (
          <DelayLoad component={<Panel title={panel.title} body={panel.body} id={panel.id}/>} time={5000 + i*500}/>
        ))
      }
      </div>
       
    </div>
  );
}

export default App;
