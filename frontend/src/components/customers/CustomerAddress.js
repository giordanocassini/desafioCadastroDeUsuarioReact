import React, { useState } from "react";
import Address from "./models/Address";
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerAddress = (props) => {

    const [address, setAddress] = useState(new Address());

    const updateField = (event) => {
        const currentAddress = address;
        currentAddress[event.target.name] = event.target.value;
        setAddress(currentAddress);
    }

    const save = () => {
        const currentAddress = address;
        if (currentAddress.id) {
            const i = currentAddress.id - 1;
            props.customer.adresses[i] = currentAddress;
        } else {
            currentAddress.id = props.customer.adresses.length + 1;
            props.pushAddress(currentAddress);
        }
        console.log(currentAddress);
        clear();
    }

    const clear = () => {
        setAddress(new Address());
        Array.from(document.querySelectorAll("#address")).forEach(
            input => (input.value = "")
        );
        props.displayNone('remove-address');
        props.displayNone('address-form');
        props.displayBlock('customer-form-buttons');
    }

    const loadAddress = (currentAddress) => {
        console.log(currentAddress);
        setAddress(currentAddress);
        props.displayBlock('remove-address');
        props.displayBlock('address-form');
        props.displayNone('customer-form-buttons');
    }

    const remove = () => {
        const currentAddress = address;
        props.customer.adresses.splice(currentAddress.id - 1, 1);
        clear();
        props.displayNone('address-form');
    }

    const renderAddressSelector = () => {
        const adresses = props.customer.adresses;
        return adresses.map((a, i) => {
            return (
                <button onClick={() => loadAddress(a)} type="button" className="btn btn-light btn-small ml-1">{i + 1}</button>
            )
        });
    }

    const newAddress = () => {
        clear();
        props.displayBlock('address-form');
        props.displayNone('customer-form-buttons');
    }

    return (
        <React.Fragment>
            <div className="d-inline">
                <span class="align-middle">Enderço: </span>
                {renderAddressSelector()}
                <button id='new-address' className="btn btn-success ml-1" onClick={() => newAddress()}>Novo</button>
            </div>
            <div id='address-form' className="form mt-2" style={{ display: 'none' }}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input id="address" type="text" className="form-control"
                                name="cidade"
                                value={address.cidade}
                                onChange={e => updateField(e)}
                                placeholder="Digite a cidade..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Rua</label>
                            <input id="address" type="text" className="form-control"
                                name="rua"
                                value={address.rua}
                                onChange={e => updateField(e)}
                                placeholder="Digite a rua..." />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex">
                        <button className="btn btn-primary"
                            onClick={e => save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => clear(e)}>
                            Cancelar
                        </button>

                        <button id='remove-address' className="btn btn-danger ml-2" style={{ display: 'none' }}
                            onClick={e => remove(e)}>
                            Remover
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default CustomerAddress;




