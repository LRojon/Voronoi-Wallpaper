import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './Menu.css'

library.add(fas)

const Menu = ({ edge, setEdge, numSites, setNumSites, onReGenButton }) => {

    const [open, setOpen] = useState(false)

    const reGen = () => {
        onReGenButton(numSites); 
        setOpen(false)
    }

    return (
        <div className={open ? 'open menuContainer' : 'menuContainer'}>
            <div className={open ? 'open button' : 'button'}>
                <button onClick={() => setOpen(!open)}><FontAwesomeIcon className='arrow' icon='arrow-left'/></button>
            </div>
            <ul className='menu'>
                <li className='reGen'>
                    <button onClick={() => reGen()} > Go </button>
                </li>
                <li className='details'>
                    <label >Détails : </label>
                    <input 
                        type='number' 
                        value={numSites} 
                        onChange={(e) => {
                            if(e.target.value === '') { setNumSites(2) }
                            else if(e.target.value > 10000) { setNumSites(10000) }
                            else if(e.target.value < 2) { setNumSites(2) }
                            else { setNumSites(e.target.value) }
                        }} 
                    />
                    <input 
                        type='range' 
                        min={2} 
                        max={10000} 
                        step={1} 
                        defaultValue={numSites} 
                        onChange={(e) => setNumSites(parseInt(e.target.value))}
                    />
                </li>
                <li className='edge'>
                    <input name='Edge' type='checkbox' checked={edge} onChange={() => setEdge(!edge)} />
                    <label htmlFor='Edge'> Edge</label>
                </li>
            </ul>
        </div>
    )
}

export default Menu
//