import React, {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Dropdown from 'react-bootstrap/Dropdown'
import Alert from 'react-bootstrap/Alert'
import Data from './data'
import SoundButton from './SoundButton/SoundButton'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './intro.css'
import Portrait from './img/portrait.jpeg'
import {ReactComponent as Ham} from './ham.svg'

function Header (props) {
  const info = Data.header
  return (
    <div className="header def-shadow">
      <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100%", height: "100%"}}>
        {info.title}
        {info.links.map (obj => <img className="img-button" onClick={ () => window.open(obj.link, "_blank") } src={obj.img}/>)}
      </div>
    </div>
  )
}
function Sound (props) {
  return <SoundButton/>
}
function NavigationBar (props) {
  const HamIcon = React.forwardRef (({ children, onClick }, ref) => 
    <Ham ref={ref} onClick={onClick} style={{width: "100%", height: "100%", fill: "white", cursor: "pointer"}}>
      {children}
    </Ham>)
  return (
    <Dropdown drop="right" className="dropdown" style={{padding: "8px"}}>
      <Dropdown.Toggle as={HamIcon}> </Dropdown.Toggle>
       
      <Dropdown.Menu className="def-shadow" >
        <Dropdown.Item href="#about">About</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#projects">Project</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#action-3">Skills</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
function Main (props) {
  const buttons = [
        <div style={{padding: "10px 7px 7px 7px"}}>
          <Sound/>
        </div>,
        <NavigationBar/>
  ]
  return (
    <>
    <Header/>
    <div className="main-buttons" style={{top: `${props.start.top}px`, left: `${props.start.left}px`, width: "60vmin"}}>
      <div style={{transform: `scale(1,1)`}} className="fast-shadow circle-icon main-icon" key={`main-icon-p`}>
        <div className="portrait-i">
          <img width="100%" height="100%" src={Portrait} href="#about"/>  
        </div>
      </div>
      {
        buttons.map ((button, i) => (
          <div style={{animationDelay: `${0.4+i*0.3}s`}} className="fast-shadow circle-icon main-icon" key={`main-icon-${i}`}>
            {button} 
          </div>))
      }
    </div>
    </>
  )
}
function Intro (props) {
  return <div className="def-flex vertical-center">
    <div className="def-flex intro-content">
      <img className="circle-icon def-shadow portrait" src={Portrait} id="intro-portrait"/>
      <div style={{textAlign: "center", padding: "1.5rem"}}>
        <font className="main-text" style={{animationDelay: "1.9s"}}>Oh, hello there!</font><br/>
        <font className="main-text" style={{animationDelay: "2.2s"}}>I'm Adhiraj</font><br/>
      </div>
    </div>
    
  </div> 
}
function Panel (props) {
  const [title, setTitle] = useState("")

  useEffect (() => {
    if (title.length < props.title.length) {
      setTimeout (() => setTitle (props.title.slice(0, title.length+1)), 80)
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
function About () {
  return (
  <div style={{minHeight: "50vh"}}>
    <div style={{height: "100%"}}>
      <p style={{color: "white", fontSize: "40px"}}>
        { Data.about }
      </p>
      <iframe height="50%" frameBorder="0" className="item" style={{float: "right", maxWidth: "90%"}}
  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBPCJuu3zpRG09ByoPeds51qzc7rfHXa3Y&q=Chandigarh,India"/>  
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
function ProjectShowcase () {
  return (
    <>
    <Carousel >
      <Carousel.Item>
        <div className="def-flex" style={{width: "100%", height: "80vh", padding: "2rem"}}>
          <video autoPlay muted height="90%" className="item" >
            <source src="messcat-demo.mp4"/>
          </video>
          <div className="showcase-text">
            <h1 className="heading"> Messcat </h1>
            <hr/>
          </div>
        </div>  
      </Carousel.Item>
    </Carousel>
    </>
  )
}
function DelayLoad (props) {
  const [hidden, setHidden] = useState(true)
  setTimeout (() => setHidden(false), props.time)
  return (<> { 
            !hidden && 
            <div style={{opacity: "0", animation: "reveal 0.7s linear 0s forwards"}}> 
              {props.component}
            </div>
            } 
          </>)
}
function App() {
  const animDelay = 4.5
  const [main, setMain] = useState (<Intro/>)
  setTimeout ( () => {
    const ogPortrait = document.getElementById ("intro-portrait")
    if (ogPortrait) {
      const rect = ogPortrait.getBoundingClientRect()
      setMain ( <Main start={{top: rect.top, left: rect.left}}/> )
    }
  }, animDelay*1000)
  return (
    <div className="App">
     { main }
     <div style={{width: "100%", marginTop: "70px"}}>
     <DelayLoad component={<Panel title="About Me" body={About()} id="about"/>} time={5000}/>
     <DelayLoad component={<Panel title="Open-Source Projects I'm Proud Of" body={ProjectShowcase()} id="projects"/>} time={5500}/>
     <DelayLoad component={<Panel title="My Skillset" body={Skillset()}/>} time={5500} id="skills"/>
     </div>
     
    </div>
  );
}

export default App;
