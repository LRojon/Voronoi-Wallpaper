import './App.css';
import Voronoi from 'voronoi';
import { useRef, useEffect, useState } from 'react'
import Menu from './Components/Menu';

export class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

export class Color {
    constructor(r, g, b) {
        this.r = r > 255 ? 255 : r < 0 ? 0 : r
        this.g = g > 255 ? 255 : g < 0 ? 0 : g
        this.b = b > 255 ? 255 : b < 0 ? 0 : b
    }
    static fromHex(hexString) {
        let tmp = hexString.replace('#', '')
        let r = parseInt(tmp.slice(0, 2), 16)
        let g = parseInt(tmp.slice(2, 4), 16)
        let b = parseInt(tmp.slice(4, 6), 16)
        return new Color(r, g, b)
    }
    get hex() {
        return '#' + this.r.toString(16).padStart(2, "0") + this.g.toString(16).padStart(2, "0") + this.b.toString(16).padStart(2, "0")
    }
    toString() {
        return this.hex
    }
}

export const windowHeight = Math.round(window.innerHeight - 0.006 * window.innerHeight)
const windowWidth = Math.round((16 / 9) * windowHeight)

function App() {

    const voronoi = new Voronoi()
    let box = {
        xl:0,
        xr: windowWidth,
        yt: 0,
        yb: windowHeight
    }
    let sites = []
    
    const [numSites, setNumSites] = useState(500)

    const [d, setD] = useState(null)
    const [edge, setEdge] = useState(true)
    const [area, setArea] = useState(new Point(box.xr, box.yb))
    const [bgColor, setBgColor] = useState("#000")
    const [gradient, setGradient] = useState('none')
    const [colorX, setColorX] = useState(new Color(255, 0, 0))
    const [colorY, setColorY] = useState(new Color(0, 0, 255))
    const [inverted, setInverted] = useState(false)
    const [intensity, setIntensity] = useState(new Point(1, 1))

    const gen = () => {
        box.xr = area.x
        box.yb = area.y

        voronoi.recycle(d);
        sites = []
        for (let i = 0; i < numSites; i++) { 
            sites.push(new Point(Math.floor(Math.random() * box.xr), Math.floor(Math.random() * box.yb))) 
        }
        setD(voronoi.compute(sites, box))
    }

    if(!d) { gen() }

    return (
        <div className="App">
            <Canvas 
                diagram={d} 
                edge={edge} 
                width={area.x} 
                height={area.y} 
                backgroundColor={bgColor} 
                gradient={gradient} 
                colorX={colorX} 
                colorY={colorY} 
                inverted={inverted} 
                intensity={intensity} 
                className='canvas' 
            />
            <Menu 
                onReGenButton={(details) => gen(details)} 
                edge={edge} 
                setEdge={setEdge} 
                numSites={numSites} 
                setNumSites={setNumSites}
                area={area}
                setArea={setArea}
                backgroundColor={bgColor}
                setBackgroundColor={setBgColor}
                gradient={gradient}
                setGradient={setGradient}
                colorX={colorX}
                setColorX={setColorX}
                colorY={colorY}
                setColorY={setColorY}
                inverted={inverted}
                setInverted={setInverted}
                intensity={intensity}
                setIntensity={setIntensity}
            />
        </div>
    );
}

const Canvas = ({diagram, width, height, className, edge, backgroundColor, gradient, colorX, colorY, inverted, intensity}) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)


        let colors = []
        let center = new Point(canvas.width / 2, canvas.height / 2)
        diagram.cells.forEach(cell => {

            let distX = Math.abs(cell.site.x - center.x) / center.x * intensity.x
            let distY = Math.abs(cell.site.y - center.y) / center.y * intensity.y
            if(inverted) { distX = 1 - distX; distY = 1 - distY }

            let r = (distX * colorX.r + distY * colorY.r) / 2
            let g = (distX * colorX.g + distY * colorY.g) / 2
            let b = (distX * colorX.b + distY * colorY.b) / 2

            if(diagram.cells.indexOf(cell) === 0) {
                console.log(distX)
            }

            colors.push({
                site: cell.site.voronoiId,
                //color: '#' + (Math.round(Math.abs(cell.site.x - center.x) / center.x * 255)).toString(16) + '00' + (Math.round(Math.abs(cell.site.y - center.y) / center.y * 255)).toString(16)
                color: 'rgb(' + r + ',' + g + ',' + b + ')'
            })
        })


        ctx.strokeStyle = '#fff'
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        /*ctx.fillStyle = '#4169E1' 
        ctx.fillRect(0, 0, canvas.width, canvas.height)*/

        diagram.cells.forEach(cell => {
            ctx.fillStyle = 'royalblue'
            let grd;
            switch(gradient) {
                case 'gradient':
                    grd = ctx.createRadialGradient(cell.site.x, cell.site.y, 5, cell.site.x + 10, cell.site.y + 10, 200)
                    grd.addColorStop(0, colors.find(e => e.site === cell.site.voronoiId).color)
                    grd.addColorStop(1, 'transparent')
                    ctx.fillStyle = grd
                    break
                case 'inverted':
                    grd = ctx.createRadialGradient(cell.site.x, cell.site.y, 5, cell.site.x + 10, cell.site.y + 10, 100)
                    grd.addColorStop(1, colors.find(e => e.site === cell.site.voronoiId).color)
                    grd.addColorStop(0, 'transparent')
                    ctx.fillStyle = grd
                    break
                default:
                    ctx.fillStyle = colors.find(e => e.site === cell.site.voronoiId).color
                    break
            }
            ctx.strokeStyle = ctx.fillStyle

            let points = []

            if(cell.halfedges[0].edge.va.x === cell.halfedges[1].edge.va.x && cell.halfedges[0].edge.va.y === cell.halfedges[1].edge.va.y) {
                points.push(new Point(cell.halfedges[0].edge.vb.x, cell.halfedges[0].edge.vb.y))
                points.push(new Point(cell.halfedges[0].edge.va.x, cell.halfedges[0].edge.va.y))
            }
            else {
                points.push(new Point(cell.halfedges[0].edge.va.x, cell.halfedges[0].edge.va.y))
                points.push(new Point(cell.halfedges[0].edge.vb.x, cell.halfedges[0].edge.vb.y))
            }

            for(let i = 1; i < cell.halfedges.length; i++) {
                const edge = cell.halfedges[i].edge
                if(Math.round(points[points.length - 1].x) !== Math.round(edge.va.x) || Math.round(points[points.length - 1].y) !== Math.round(edge.va.y)) {
                    points.push(new Point(edge.vb.x, edge.vb.y))
                    points.push(new Point(edge.va.x, edge.va.y))
                }
                else {
                    points.push(new Point(edge.va.x, edge.va.y))
                    points.push(new Point(edge.vb.x, edge.vb.y))
                }
            }

            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y)
            for(let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y)
            }
            if(edge) { ctx.stroke() }
            ctx.fill()
            ctx.closePath()
            
            /*if(dotDisplay === 'On') {
                ctx.fillStyle = '#E16941'
                ctx.beginPath()
                ctx.arc(cell.site.x, cell.site.y, 3, 0, 2*Math.PI)
                //ctx.fillText(cell.site.voronoiId, cell.site.x, cell.site.y)
                ctx.fill()
            }*/
        })

    }, [diagram, edge, backgroundColor, gradient, colorX, colorY, inverted, intensity])

    return <canvas width={width} height={height} className={className} ref={canvasRef} />
}

export default App;
