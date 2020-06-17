import React, {useState, useEffect} from 'react'
import resume from './resume.json'

export default function (props) {
    
    const toolset = Object.keys(resume.skills).map (k => resume.skills[k]).reduce ((p, c) => [...p, ...c])
    
    return (
    <div>
        <div className="def-flex" style={{alignItems: "flex-start", justifyContent: "initial"}}>
            { toolset.map (v => <span className="skill" key={`skill_${v}`}>{v}</span>) }
        </div>
    </div>
    )

}