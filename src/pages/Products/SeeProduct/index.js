import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductAPI } from '../../../API/ProductAPi'
import { ImageAPI } from '../../../API/ImageAPI';
export default function SeeProduct() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([])
  const getProductInfo = async (id) => {
    try {
      const res = await ProductAPI.getProductById(id);
      if (res.status === 200) {
        setProduct(res.data.product);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const getImageInfo = async (id) => {
    try {
      const res = await ImageAPI.getImageByProductId(id);
      setImages(res.data.image);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getProductInfo(params.productId);
    getImageInfo(params.productId);
  }, [params])
  const imageList = images.map(i => (
    <div key={i._id} style={{ height: "160px", position: "relative", marginBottom: "20px", overflow: "hidden", borderTopLeftRadius: "10px !important", borderTopRightRadius: "10px !important" }}>
      <img src={i.url} alt={`${i._id}${product.name}`} style={{ display: "block", margin: "0 auto", position: "absolute", top: "50%", transform: "translateY(-50%)", width: "110%", height: "auto", borderTopLeftRadius: "10px !important", borderTopRightRadius: "10px !important" }} />
    </div>
  ))
  return (
    <div style={{ border: "1px solid #B9CABB", borderRadius: "10px", width: "25vw" }}>
      {imageList}
      <div className='px-2 pb-2'>
        <p className='my-0 text-right'><b>{product.name}</b></p>
        <p className='my-0 text-muted text-right'>{product.description}</p>
        <p className='my-0 text-right'><b>${product.price}</b></p>
      </div>
    </div>
  )
}
