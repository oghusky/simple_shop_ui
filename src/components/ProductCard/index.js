import React from 'react'

export default function ProductCard({ images, p }) {
    const filterImages = (img, p) => {
        const i = img.find(i => i.productId === p)
        if (i) return i.url
    }
    return (
        <div className='col-md-3 col-sm-6 text-right p-1' key={p._id} style={{ minHeight: "350px" }}>
            <div style={{ minHeight: "350px", border: "1px solid #B9CABB" }}>
                <div style={{ height: "200px", position: "relative", marginBottom: "20px", overflow: "hidden", borderTopLeftRadius: "10px !important", borderTopRightRadius: "10px !important" }}>
                    <img alt={`${p.name}`} src={filterImages(images, p._id)} style={{ display: "block", margin: "0 auto", position: "absolute", top: "50%", transform: "translateY(-50%)", width: "110%", height: "auto", borderTopLeftRadius: "10px !important", borderTopRightRadius: "10px !important" }} />
                </div>
                <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
                    <p className='my-0'><b>{p.name}</b></p>
                    <p className='text-muted my-0'>{p.description}</p>
                    <p className='my-0'><b>${p.price}</b></p>
                    <p className='mt-2 mb-0'><button className='btn btn-sm btn-primary'>ADD TO CART</button></p>
                </div>
            </div>
        </div>
    )
}
