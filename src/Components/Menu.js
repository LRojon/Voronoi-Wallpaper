import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Point, windowHeight } from '../App'
import './Menu.css'

library.add(fas)

const Menu = ({ edge, setEdge, numSites, setNumSites, onReGenButton, area, setArea }) => {

    const [open, setOpen] = useState(false)

    const reGen = () => {
        onReGenButton(numSites); 
        if(area.x > window.innerWidth - 500) { setOpen(false) }
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
                                onBlur={(e) => {
                                    if(e.target.value === '') { setNumSites(2) }
                                    else if(e.target.value > 10000) { setNumSites(10000) }
                                    else if(e.target.value < 2) { setNumSites(2) }
                                }}
                                onChange={(e) => setNumSites(e.target.value)}
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
                            sli
                        />
                    </div>
                    <div className="area" >
                        <div className="area-width">
                            <label >Largeur : </label>
                            <div>
                                <div onClick={() => {if(area.x - 1 >= 430) { setArea(new Point(area.x - 1, area.y))}}} >
                                    <FontAwesomeIcon icon='minus' />
                                </div>
                                <input 
                                    type='number' 
                                    value={area.x} 
                                    max={window.innerWidth - 10}
                                    min={430}
                                    onBlur={(e) => {
                                        if(e.target.value === '') { setArea(new Point(430, area.y)) }
                                        else if(e.target.value < 430) { setArea(new Point(430, area.y)) }
                                    }}
                                    onChange={(e) => {
                                        if(e.target.value > window.innerWidth - 10) { setArea(new Point(window.innerWidth - 10, area.y)) }
                                        else { setArea(new Point(parseInt(e.target.value), area.y))} }
                                    }
                                />
                                <div onClick={() => {if(area.x +1 <= window.innerWidth - 10) {setArea(new Point(area.x + 1, area.y))}}} >
                                    <FontAwesomeIcon icon='plus' />
                                </div>
                            </div>
                            <input 
                                type='range' 
                                min={430} 
                                max={window.innerWidth - 10} 
                                step={1} 
                                defaultValue={area.x} 
                                onChange={(e) => setArea(new Point(parseInt(e.target.value), area.y))}
                            />
                        </div>
                        <div className="area-height">
                            <label >Hauteur : </label>
                            <div>
                                <div onClick={() => (area.y -1 >= 242) ? setArea(new Point(area.x, area.y - 1)) : null} ><FontAwesomeIcon icon='minus' /></div>
                                <input 
                                    type='number' 
                                    value={area.y}
                                    max={windowHeight}
                                    min={242}
                                    onBlur={(e) => {
                                        if(e.target.value === '') { setArea(new Point(area.x, 242)) }
                                        else if(e.target.value > windowHeight) { setArea(new Point(area.x, windowHeight)) }
                                        else if(e.target.value < 242) { setArea(new Point(area.x, 242)) }
                                    }}
                                    onChange={(e) => {
                                        if(e.target.value > windowHeight) { setArea(new Point(area.x, windowHeight)) }
                                        else { setArea(new Point(area.x, parseInt(e.target.value))) }
                                    }}
                                />
                                <div onClick={() => (area.y + 1 <= windowHeight) ? setArea(new Point(area.x, area.y + 1)) : null} ><FontAwesomeIcon icon='plus' /></div>
                            </div>
                            <input 
                                type='range' 
                                min={242} 
                                max={windowHeight} 
                                step={1} 
                                defaultValue={area.y} 
                                onChange={(e) => setArea(new Point(area.x, parseInt(e.target.value)))}
                                sli
                            />
                        </div>
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
