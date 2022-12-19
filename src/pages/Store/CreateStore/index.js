import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../../store'
import { StoreAPI } from '../../../API/StoreAPI'
import Forms from '../../../components/Forms'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TextInputs from '../../../components/TextInputs'
import Checkbox from '../../../components/CheckBox'
import Buttons from '../../../components/Buttons'


export default function CreateStore() {
    const { user } = useContext(AppContext)
    const history = useHistory();
    const [store, setStore] = useState({
        name: "",
        email: "",
        useUserEmail: true
    });
    const [show, setShow] = useState("none")
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStore({ ...store, [name]: value })
    }
    const handleSubmit = async () => {
        try {
            let data;
            data = {
                name: store.name,
                email: store.useUserEmail ? user.email : store.email
            }
            if (data.email) {
                const res = await StoreAPI.create(data);
                if (res.status === 201) {
                    console.log(res);
                    localStorage.setItem("ShopEZUser", JSON.stringify(res.data.user));
                    localStorage.setItem("ShopEZToken", JSON.stringify(res.data.token));
                    handleClose();
                    history.push(`/store/id/${res.data.newStore._id}`)
                    setStore({})
                };
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleCheckBox = (e) => {
        const { checked } = e.target;
        setStore({ ...store, useUserEmail: checked });
    }
    const handleClose = () => setShow("none");
    const handleShow = () => { if ((store.name && store.email) || (store.name && store.useUserEmail)) setShow("block"); }
    return (
        <div>
            <Forms>
                <TextInputs
                    name={"name"}
                    label={"Name *"}
                    value={store.name}
                    placeholder={"Store Name"}
                    onChange={handleChange}
                    type={"name"}
                    required
                />
                <TextInputs
                    name={"email"}
                    label={"Email *"}
                    value={store.email}
                    placeholder={"mystore@email.com"}
                    onChange={handleChange}
                    type={"email"}
                    required
                />
                <Checkbox
                    id={"userUserEmail"}
                    name={"useUserEmail"}
                    value={store.useUserEmail}
                    onChange={handleCheckBox}
                    label={"Use your email?"}
                />
                <Buttons onClick={handleShow} text={"Create Store"} cssClass={"btn btn-primary"} />
            </Forms>
            <div
                style={{ display: `${show}`, position: 'absolute', top: "10px" }}
            >
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Is this information correct?</Modal.Title>
                        <span onClick={handleClose}>X</span>
                    </Modal.Header>

                    <Modal.Body>
                        <h5>You must contact suppoert to change store name once saved</h5>
                        <p>Chosen Name: {store.name ? store.name : null}</p>
                        <p>{store.email ? `Chosen Email: ${store.email}` : null}</p>
                        <p>Chosen Email: {store.useUserEmail ? `Chosen Email: ${user.email}` : null}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </div>
    )
}
