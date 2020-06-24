import React, {useState, useEffect} from 'react'
import Alert from 'react-bootstrap/Alert'
import resume from './resume.json'
import VisibilitySensor from './VisibilitySensor'

function DelaySensor (animate, delay, objects) {
    const [delays, setDelays] = useState (objects.map (() => "infinity"))
    
    useEffect (() => {
        if (animate && delays[0] === "infinity")
            setDelays (delays.map ((_, i) => `${delay(i)}s`)) 
    }, [animate])
    return delays
}

function CodingLanguages (props) {
    const toolset = Object.keys(resume.skills).map (k => resume.skills[k]).reduce ((p, c) => [...p, ...c])
    const delays = DelaySensor (props.animate, (i) => i*0.05, toolset)
    
    return (
        <div className="def-flex" style={{alignItems: "flex-start", justifyContent: "initial"}}>
            { 
                toolset.map ((v,i) => (
                <span className="skill" key={`skill_${v}`} style={{opacity: "0", animation: `reveal 0.1s ease-out ${delays[i]} forwards`}}>
                    {v}
                </span>
            )) 
            }
        </div>
    )
}
function WorkEx (props) {
    const workEx = resume["work-ex"]
    const delays = DelaySensor (props.animate, (i) => 0.35 + i*0.15, workEx)

    return (
        <div style={{paddingTop: "10px"}}>
            {
                workEx.map ((item, i) => (
                    <Alert variant="panel-inner" key={`work_ex_${i}`} style={{transform: "scaleX(0)", animation: `scale-up-bounce 0.25s ease-out ${delays[i]} forwards`}}>
                        <Alert.Heading className="def-flex" style={{justifyContent: "space-between"}}>
                            <div>
                                <span>{item.title}</span><br/>
                                <span>{item.company}</span>
                            </div>
                            <div className="ex-len">{item.length}</div>
                        </Alert.Heading>
                        <hr/>
                        <div>

                            <p dangerouslySetInnerHTML={{__html: item.description.join (" ")}}/>
                        </div>
                    </Alert>
                ))
            }
        </div>
    )
}
function Education (props) {
    const ed = resume.education
    const delays = DelaySensor (props.animate, (i) => 0.65 + i*0.15, ed)
    return (
        <div style={{paddingTop: "10px"}}>
            {
                ed.map ((item, i) => (
                    <Alert key={`edu_panel_${i}`} variant="panel-inner" style={{opacity: "0", animation: `reveal 0.1s ease-out ${delays[i]} forwards`}}>
                        <Alert.Heading className="def-flex" style={{justifyContent: "space-between"}}>
                            <div>
                                <span>{item.title}</span><br/>
                                <p>{item.diploma}</p>
                            </div>
                            <div className="ex-len">{item.length}</div>
                        </Alert.Heading>
                    </Alert>
                ))
            }
        </div>
    )
}
export default function (props) {
    let sections = [
        {
            title: "Things I'm Good At",
            body: CodingLanguages
        },
        {
            title: "Positions I've Held",
            body: WorkEx
        },
        {
            title: "Where I've Been Formally Educated",
            body: Education
        }
    ]
    
    return (
    <div style={{padding: "4px"}}>
        <VisibilitySensor>
        { 
            visible => 
            sections.map ((item, i) => (
                <div key={`skillset_panel_div_${i}`}>
                    <h2 className="heading" style={{fontSize: "x-large", padding: "5px"}}>{item.title}</h2>
                    {React.createElement(item.body, { animate: visible })}
                </div>
            )
            )
        }
        </VisibilitySensor>
        <br/>
        <div style={{fontSize: "small"}}>
            * All this data is pulled from my JSON resume, so I never have to update the website to add content. Zero maintainence!
        </div>
    </div>
    )

}