import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './Menu.css'

library.add(fas)

const Menu = ({ edge, setEdge, numSites, setNumSites, onReGenButton }) => {

    const [open, setOpen] = useState(false)

    return (
        <div className={open ? 'open menuContainer' : 'menuContainer'}>
            <div className={open ? 'open button' : 'button'}>
                <b></b>
                <button onClick={() => setOpen(!open)}><FontAwesomeIcon className='arrow' icon='arrow-left'/></button>
                <b></b>
            </div>
            <ul className='menu'>
                <li>
                    <input type='number' value={numSites} onChange={(e) => setNumSites(e.target.value)} />
                </li>
                <li>
                    <button onClick={() => onReGenButton()} >Restart</button>
                </li>
                <li>
                    <input name='Edge' type='checkbox' checked={edge} onChange={() => setEdge(!edge)} />
                    <label htmlFor='Edge'> Edge</label>
                </li>
            </ul>
        </div>
    )
}

export default Menu
//