import React, {useState, useEffect} from 'react'
// make do because ReactVisibilitySensor had issues
export default function VisibilitySensor (props) {
    const [visible, setVisible] = useState (false)
    const ref = React.createRef ()
    const refreshVisible = () => {
        if (!ref.current) {
            return 
        }
        const rect = ref.current.getBoundingClientRect()
        const elementTop = rect.top + (props.offset || 0)
        setVisible (elementTop <= window.innerHeight && rect.bottom >= 0)
    }
    useEffect (() => {
        window.addEventListener ('scroll', refreshVisible)
        return () => window.removeEventListener ('scroll', refreshVisible)
    }, [])
    return <div ref={e => ref.current = e}>{props.children (visible)}</div>
}