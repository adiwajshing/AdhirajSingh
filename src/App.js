import React, {useState, useEffect} from 'react'
import DelayLoad from './DelayLoad'
import Panel from './Panel'
import Main from './Main'
import Skillset from './skillset'
import About from './About'
import ProjectShowcase from './project-showcase'
import smoothscroll from 'smoothscroll-polyfill'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './intro.css'
import './bootstrap-overloads.css'

const resumeGistId = 'bd2626ad1059708cc5dcb1042437b855'
const githubId = 'adiwajshing'

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
  useEffect (() => smoothscroll.polyfill(), null)

  return (
    <div className="App">
      
      <Main animDelay={4.5} panels={ panels.map (e => ({title: e.shortTitle, id: e.id})) }/>
      <div style={{width: "100%"}}>
      {
        panels.map ((panel, i) => (
          <DelayLoad key={`main_panel_${i}`} time={5000 + i*500}>
            <Panel title={panel.title} 
                     body={panel.body} 
                     id={panel.id} 
                     className={i % 2 == 0 ? "secondary-col-bg" : "primary-col-bg"}/>
          </DelayLoad>
        ))
      }
      </div>
       
    </div>
  );
}

export default App;
