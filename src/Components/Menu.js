import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Color, Point, windowHeight } from '../App'
import './Menu.css'

library.add(fas)

const Menu = ({ edge, setEdge, numSites, setNumSites, onReGenButton, area, setArea, backgroundColor, setBackgroundColor, gradient, setGradient, colorX, setColorX, colorY, setColorY, inverted, setInverted, intensity, setIntensity }) => {

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
                            <div onClick={() => numSites > 2 ? setNumSites(numSites - 1) : null} ><FontAwesomeIcon icon='minus' /></div>
                            <input 
                                type='number' 
                                value={numSites} 
                                onBlur={(e) => {
                                    if(e.target.value === '') { setNumSites(2) }
                                    else if(e.target.value < 2) { setNumSites(2) }
                                }}
                                onChange={(e) => {
                                    if(e.target.value > 10000) { setNumSites(10000) }
                                    else { setNumSites(e.target.value) }
                                }}
                            />
                            <div onClick={() => numSites < 10000 ? setNumSites(numSites + 1) : null} ><FontAwesomeIcon icon='plus' /></div>
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
                    <div className='up'>
                        <div className="colorGroup">
                            <span>Couleurs</span>
                            <div className="color">
                                <label>Fond : </label>
                                <span style={{backgroundColor: backgroundColor}}>
                                    <input onChange={(e) => setBackgroundColor(e.target.value)} defaultValue={backgroundColor} type='color' />
                                </span>
                            </div>
                            <div className='color'>
                                <label>Horizontal : </label>
                                <span style={{backgroundColor: colorX.hex}} >
                                    <input onChange={(e) => setColorX(Color.fromHex(e.target.value))} defaultValue={colorX.hex} type='color' />
                                </span>
                            </div>
                            <div className='color'>
                                <label>Vertical : </label>
                                <span style={{backgroundColor: colorY.hex}}>
                                    <input onChange={(e) => setColorY(Color.fromHex(e.target.value))} defaultValue={colorY.hex} type='color' />
                                </span>
                            </div>
                        </div>
                        <div className="options">
                            <span>Options</span>
                            <div className='edge'>
                                <input name='Bords' type='checkbox' checked={edge} onChange={() => setEdge(!edge)} />
                                <label htmlFor='Bords'> Bords</label>
                            </div>
                            
                            <div className='edge'>
                                <select value={gradient} onChange={(e) => setGradient(e.target.value)} >
                                    <option value='none'>Pas de dégradé</option>
                                    <option value='gradient'>Dégradé</option>
                                    <option value='inverted'>Dégradé inversé</option>
                                </select>
                            </div>

                            <div className='edge'>
                                <input name='Inverted' type='checkbox' checked={inverted} onChange={() => setInverted(!inverted)} />
                                <label htmlFor='Inverted'> Inversé</label>
                            </div>
                        </div>
                    </div>
                    <div className="intensity">
                        <span>Intensité</span>
                        <div id='IntensityX' className='details'>
                            <label >Horizontale : </label>
                            <div>
                                <div onClick={() => intensity.x - 0.1 > 0.1 ? setIntensity(new Point(intensity.x - 0.1, intensity.y)) : null} ><FontAwesomeIcon icon='minus' /></div>
                                <input 
                                    type='number'
                                    value={Math.round(intensity.x * 10) / 10}
                                    step={0.1}
                                    min={0.1}
                                    onBlur={(e) => {
                                        if(e.target.value === '') { setIntensity(new Point(0.1, intensity.y)) }
                                        else if(e.target.value < 0.1) { setIntensity(new Point(0.1, intensity.y)) }
                                    }}
                                    onChange={(e) => {
                                        if(e.target.value > 10) { setIntensity(new Point(10, intensity.y)) }
                                        else { setIntensity(new Point(e.target.value, intensity.y)) }
                                    }}
                                />
                                <div onClick={() => intensity.x < 10 ? setIntensity(new Point(parseFloat(intensity.x + 0.1), intensity.y)) : null} ><FontAwesomeIcon icon='plus' /></div>
                            </div>
                            <input 
                                type='range'
                                min={0.1}
                                max={10}
                                step={0.1}
                                defaultValue={intensity.x}
                                onChange={(e) => setIntensity(new Point(e.target.value, intensity.y))}
                            />
                        </div>
                        <div id='IntensityY' className='details'>
                            <label >Verticale : </label>
                            <div>
                                <div onClick={() => intensity.y - 0.1 > 0.1 ? setIntensity(new Point(intensity.x, intensity.y - 0.1)) : null} ><FontAwesomeIcon icon='minus' /></div>
                                <input 
                                    type='number'
                                    value={Math.round(intensity.y * 10) / 10}
                                    step={0.1}
                                    min={0.1}
                                    onBlur={(e) => {
                                        if(e.target.value === '') { setIntensity(new Point(intensity.x, 0.1)) }
                                        else if(e.target.value < 0.1) { setIntensity(new Point(intensity.x, 0.1)) }
                                    }}
                                    onChange={(e) => {
                                        if(e.target.value > 10) { setIntensity(new Point(intensity.x, 10)) }
                                        else { setIntensity(new Point(intensity.x, e.target.value)) }
                                    }}
                                />
                                <div onClick={() => intensity.y < 10 ? setIntensity(new Point(intensity.x, parseFloat(intensity.y + 0.1))) : null} ><FontAwesomeIcon icon='plus' /></div>
                            </div>
                            <input 
                                type='range'
                                min={0.1}
                                max={10}
                                step={0.1}
                                defaultValue={intensity.y}
                                onChange={(e) => setIntensity(new Point(intensity.x, e.target.value))}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu
