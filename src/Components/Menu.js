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
            <div className='menu'>
                <div className='gen' >
                    <div className='reGen'>
                        <button onClick={() => reGen()} > Générer </button>
                    </div>
                    <div className='details'>
                        <label >Détails : </label>
                        <div>
                            <div onClick={() => setNumSites(numSites - 1)} ><FontAwesomeIcon icon='minus' /></div>
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
                            <div onClick={() => setNumSites(numSites + 1)} ><FontAwesomeIcon icon='plus' /></div>
                        </div>
                        <input 
                            type='range' 
                            min={2} 
                            max={10000} 
                            step={1} 
                            defaultValue={numSites} 
                            onChange={(e) => setNumSites(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className='display'>
                    <div className='edge'>
                        <input name='Edge' type='checkbox' checked={edge} onChange={() => setEdge(!edge)} />
                        <label htmlFor='Edge'> Edge</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu
//