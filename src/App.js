import React, {useState, useEffect} from 'react'
import throttle from 'lodash.throttle'
import Carousel from 'react-bootstrap/Carousel'

import SyntaxHighlighter from 'react-syntax-highlighter' 
import def from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark'

import Data from './data'
import Panel from './Panel'
import Main from './Main'
import GitFetch from './GitFetch'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './intro.css'


function About () {
  return (
  <div style={{minHeight: "50vh"}}>
    <div style={{maxHeight: "60%"}}>
      <iframe height="40%" frameBorder="0" className="item" style={{float: "right", maxWidth: "90%"}}
  src={Data.about.map}/>
      <p style={{color: "white", fontSize: "20px"}}>{ Data.about.text }</p>  
    </div>

  </div>)
}
function Skillset () {
  const info = Data.skillset

  return <div className="def-flex" style={{backgroundColor: "transparent"}}>
    {
      info.map (table => 
        <table className="def-table def-shadow">
          <tr>
            <th>{table.title}</th>
          </tr>
          <hr/>
          {
            table.elements.map (element => 
              <tr>
                <td>{element}</td>
              </tr>
            )
          }
        </table>
      )
    }

  </div> 
}
 
function ProjectShowcase (props) {
  const [projects, setProjects] = useState (null)
  useEffect (async () => {
    const ps = await GitFetch.fetchDemoRepos (Data.githubID)
    setProjects (ps)
  }, [])

  return (
    <>
    <Carousel style={{minHeight: "80vh"}}>
      {
        projects ?
        projects.map ((content,i) =>
          <Carousel.Item key={`project_${i}`} style={{padding: "10px"}}>
            <div className="def-flex item-container">
              <div className="showcase-text">
                <a href={content.url} target="_blank" className="heading"> {content.display_name} </a>
                <hr/>
                {content.content}
              </div>
              {
                content.sample.type === 'video' ?
                <video autoPlay muted height="90%" className="item">
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
        : ""
      }
      
    </Carousel>
    </>
  )
}
function DelayLoad (props) {
  const [hidden, setHidden] = useState(true)
  setTimeout (() => setHidden(false), props.time)
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
      title: "My Skillset",
      shortTitle: "Skillset",
      body: Skillset(),
      id: "skills"
    }
  ]

  return (
    <div className="App">
      <Main animDelay={4.5} panels={ panels.map (e => ({title: e.shortTitle, id: e.id})) }/>
      <div style={{width: "100%", marginTop: "70px"}}>
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
