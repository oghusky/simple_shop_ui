import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductAPI } from '../../../API/ProductAPi'
import Forms from '../../../components/Forms'
import Buttons from '../../../components/Buttons'
import TextInputs from '../../../components/TextInputs'

export default function CreateProduct() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();
    const { storeId } = params;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: "",
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value })
    }
    const handleSubmit = async () => {
        try{
            const res = await ProductAPI.create(storeId, product);
            if(res.status === 201){
                console.log(res.data.product);
            }
        }catch(err){
            console.log(err);
        }
        
    }
    return (
        <div>
            <Forms formTitle={"Create Product"}>
            <TextInputs
                    name={"name"}
                    label={"name"}
                    value={product.name}
                    placeholder={product.name ? product.name : "BloopCo Blue Hoodie"}
                    onChange={handleChange}
                    type={"text"}
                />
            <TextInputs
                    name={"price"}
                    label={"Price"}
                    value={product.price}
                    placeholder={product.price ? product.price : "42.99"}
                    onChange={handleChange}
                    type={"number"}
                />
                <div className="form-group">
                    <label>Product Description</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        name={"description"}
                        value={product.description}
                        onChange={handleChange}
                        type={"text"}></textarea>
                </div>
                <Buttons onClick={handleSubmit} text={"Update"} cssClass={"btn btn-info btn-sm"}>Create Product</Buttons>
            </Forms>
        </div>
    )
}
