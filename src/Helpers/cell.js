let cell = {
    closeMe: Boolean,
    halfedges: [
        {
            angle: Number,
            edge: {
                lSite: {
                    x: Number,
                    y: Number,
                    voronoiId: Number
                },
                rSite: {
                    x: Number,
                    y: Number,
                    voronoiId: Number
                },
                va: {
                    x: Number,
                    y: Number
                },
                vb: {
                    x: Number,
                    y: Number
                }
            },
            site: {
                x: Number,
                y: Number,
                voronoiId: Number
            }
        }
    ],
    site: {
        x: Number,
        y: Number,
        voronoiId: Number
    }
}