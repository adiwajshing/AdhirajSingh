import React from 'react'
import "./volume.css"
/**
 * Pretty animated sound on/off toggle
 * @param {Object} props
 * @param {function} [props.onChange] - called when the toggle changes state  
 */
export default function (props) {
    return (
        <label class="volume">
            <input type="checkbox" onChange={ (e) => props.onChange && props.onChange(e) }/>
            <svg viewBox="0 0 108 96">
                <path d="M7,28 L35,28 L35,28 L59,8 L59,88 L35,68 L7,68 C4.790861,68 3,66.209139 3,64 L3,32 C3,29.790861 4.790861,28 7,28 Z"></path>
                <path d="M79,62 C83,57.3333333 85,52.6666667 85,48 C85,43.3333333 83,38.6666667 79,34 L49,3"></path>
                <path d="M95,69 C101.666667,61.6666667 105,54.3333333 105,47 C105,39.6666667 101.666667,32.3333333 95,25 L75.5,6 L49,33"></path>
            </svg>
        </label>)
}