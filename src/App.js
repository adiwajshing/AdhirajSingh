import React, {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Fade from 'react-bootstrap/Fade'
import Alert from 'react-bootstrap/Alert'
import Data from './data'
import SoundButton from './SoundButton/SoundButton'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './intro.css'
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
  return <div className="main-icon fast-shadow circle-icon sound-icon"> <SoundButton/> </div>
}
function NavigationBar (props) {
  return (
    <div className="fast-shadow circle-icon main-icon nav-icon" >
      <Ham style={{width: "100%", height: "100%"}}/>
    </div>
  )
}
function Main () {
  return <div className="def-flex" style={{zIndex: 20, position: "fixed", width: "100%"}}>
    <div className="def-flex">
      <div style={{width: "60vmin", height: "60vmin", position: "relative"}}>
        <img className="circle-icon portrait def-shadow" src="/portrait.jpeg" />
        <Header/>
        <Sound/>
        <NavigationBar/>
      </div>
      
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
    <Alert variant="panel" className="def-shadow">
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
      <iframe height="50%" frameborder="0" className="item" style={{float: "right", maxWidth: "90%"}}
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
            <source src="/messcat-demo.mp4"/>
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
  return (
    <div className="App">
     {Main()}
     <div style={{width: "100%", marginTop: "70px"}}>
     <DelayLoad component={<Panel title="About Me" body={About()}/>} time={5000}/>
     <DelayLoad component={<Panel title="Open-Source Projects I'm Proud Of" body={ProjectShowcase()}/>} time={5500}/>
     <DelayLoad component={<Panel title="My Skillset" body={Skillset()}/>} time={5500}/>
     </div>
     
    </div>
  );
}

export default App;
