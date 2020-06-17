import React, {useState, useEffect} from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Portrait from './img/portrait.jpeg'
import SoundButton from './SoundButton/SoundButton'
import {ReactComponent as Ham} from './ham.svg'
import Data from './data'

function Header (props) {
  const info = Data.header
  return (
    <div className="header def-shadow">
      <div>
        {info.title}
        {info.links.map ((obj,i) => <img className="img-button" key={`header-${i}`} onClick={ () => window.open(obj.link, "_blank") } src={obj.img}/>)}
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
    <Dropdown drop="left" className="dropdown" style={{padding: "8px"}}>
      <Dropdown.Toggle as={HamIcon}> </Dropdown.Toggle>
        
      <Dropdown.Menu className="def-shadow" >
        {
          props.panels.map ((e,i) => (
            <>
              <Dropdown.Item href={`#${e.id}`} key={`action-${i}`}>{e.title}</Dropdown.Item>
              {i+1 < props.panels.length && <hr />}
            </>
          ))
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
/**
 * The main portrait image animation & header content
 * @param {Object} props 
 * @param {DOMRect} props.rect
 */
function Main (props) {
  const buttons = [
        <div style={{padding: "10px 7px 7px 7px"}}>
          <Sound/>
        </div>,
        <NavigationBar panels={props.panels}/>
  ]
  return (
    <>
    <Header/>
    <div className="main-buttons" style={{top: `${props.rect.top}px`, right: `${window.innerWidth-props.rect.x-props.rect.width}px`, width: `${props.rect.width}px`}}>
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
    <div className="def-flex intro-content" style={{flexDirection: "row-reverse"}}>
      <img className="circle-icon def-shadow portrait" src={Portrait} id="intro-portrait"/>
      <div style={{textAlign: "center", padding: "1.5rem"}}>
        <font className="main-text" style={{animationDelay: "1.9s"}}>Oh, hello there!</font><br/>
        <font className="main-text" style={{animationDelay: "2.2s"}}>I'm Adhiraj</font><br/>
      </div>
    </div>
    
  </div> 
}
export default function (props) {
  const [main, setMain] = useState (<Intro/>)
  setTimeout ( () => {
    const ogPortrait = document.getElementById ("intro-portrait")
    if (ogPortrait) {
      const rect = ogPortrait.getBoundingClientRect()
      setMain ( <Main rect={rect} panels={ props.panels }/> )
    }
  }, props.animDelay*1000)
  return main
}