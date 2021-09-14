import './App.css';
import Voronoi from 'voronoi';
import { useRef, useEffect, useState } from 'react'
import Menu from './Components/Menu';

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

function App() {

    const voronoi = new Voronoi()
    const area = {
        xl:0,
        xr: window.innerWidth,
        yt: 0,
        yb: window.innerHeight - 0.005 * window.innerHeight
    }
    let sites = []
    
    const [numSites, setNumSites] = useState(15)

    const [d, setD] = useState(null)
    const [edge, setEdge] = useState(true)

    const gen = () => {

        voronoi.recycle(d);
        sites = []
        for (let i = 0; i < numSites; i++) { 
            sites.push(new Point(Math.floor(Math.random() * area.xr), Math.floor(Math.random() * area.yb))) 
        }
        setD(voronoi.compute(sites, area))
    }

    if(!d) { gen() }

    return (
        <div className="App">
            <Canvas diagram={d} edge={edge} width={area.xr} height={area.yb} className='canvas' />
            <Menu onReGenButton={(details) => gen(details)} edge={edge} setEdge={setEdge} numSites={numSites} setNumSites={setNumSites}  />
        </div>
    );
}

const Canvas = ({diagram, width, height, className, edge}) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)


        let colors = []
        let center = new Point(canvas.width / 2, canvas.height / 2)
        diagram.cells.forEach(cell => {
            let b = (255 - Math.abs(cell.site.x - center.x) / center.x * 400)
            let g = (255 - Math.abs(cell.site.y - center.y) / center.y * 400)
            let r = (b + g) / 2
            colors.push({
                site: cell.site.voronoiId,
                //color: '#' + (Math.round(Math.abs(cell.site.x - center.x) / center.x * 255)).toString(16) + '00' + (Math.round(Math.abs(cell.site.y - center.y) / center.y * 255)).toString(16)
                color: 'rgb(' + r + ',' + g + ',' + b + ')'
            })
        })


        ctx.strokeStyle = '#fff'
        ctx.fillStyle = 'rgb(0, 0, 25'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        /*ctx.fillStyle = '#4169E1' 
        ctx.fillRect(0, 0, canvas.width, canvas.height)*/

        diagram.cells.forEach(cell => {
            /*ctx.fillStyle = 'royalblue'
            let grd = ctx.createRadialGradient(cell.site.x, cell.site.y, 5, cell.site.x + 10, cell.site.y + 10, 200)
            grd.addColorStop(0, colors.find(e => e.site === cell.site.voronoiId).color)
            grd.addColorStop(1, 'transparent')
            ctx.fillStyle = grd*/
            ctx.fillStyle = colors.find(e => e.site === cell.site.voronoiId).color
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

            /*if(diagram.cells.indexOf(cell) === 607) {
                console.log(points)
            }*/

            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y)
            for(let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y)
            }
            if(edge) { ctx.stroke() }
            ctx.fill()
            ctx.closePath()

            /*cell.halfedges.forEach(halfedge => {
                if(diagram.cells.indexOf(cell) === 0) {
                    console.log(halfedge.edge.va.x + ', ' + halfedge.edge.va.y)
                    console.log(halfedge.edge.vb.x + ', ' + halfedge.edge.vb.y)
                    console.log(' ')
                }
                ctx.beginPath()
                ctx.moveTo(halfedge.edge.va.x, halfedge.edge.va.y)
                ctx.lineTo(halfedge.edge.vb.x, halfedge.edge.vb.y)
                ctx.closePath()
                ctx.fill()
                ctx.stroke()
            })*/
            
            /*if(dotDisplay === 'On') {
                ctx.fillStyle = '#E16941'
                ctx.beginPath()
                ctx.arc(cell.site.x, cell.site.y, 3, 0, 2*Math.PI)
                //ctx.fillText(cell.site.voronoiId, cell.site.x, cell.site.y)
                ctx.fill()
            }*/
        })

    }, [diagram, edge])

    return <canvas width={width} height={height} className={className} ref={canvasRef} />
}

export default App;
