import React, { Component } from "react";
import Address from "./Address";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CustomerAddress extends Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.clear = this.clear.bind(this);
        this.remove = this.remove.bind(this);
        this.renderAddressSelector = this.renderAddressSelector.bind(this);
        this.loadAddress = this.loadAddress.bind(this);
    };

    state = { address: new Address() };

    updateField(event) {
        const address = this.state.address;
        address[event.target.name] = event.target.value;
        this.setState({ address });
    }

    save() {
        const address = this.state.address;
        if (address.id) {
            const i = address.id - 1;
            this.props.customer.adresses[i] = address;
        } else {
            address.id = this.props.customer.adresses.length + 1;
            this.props.pushAddress(address);
        }
        this.clear();
    }

    clear() {
        this.setState({ address: new Address() });
        Array.from(document.querySelectorAll("#address")).forEach(
            input => (input.value = "")
        );
        document.getElementById('remove-address').style.display = 'none';
    }

    loadAddress(address) {
        this.setState({ address });
        document.getElementById('remove-address').style.display = 'block';
    }

    remove() {
        const address = this.state.address;
        this.props.customer.adresses.splice(address.id - 1, 1);
        this.clear();
    }

    renderAddressSelector() {
        const adresses = this.props.customer.adresses;
        return adresses.map((a, i) => {
            return (
                <button onClick={() => this.loadAddress(a)} type="button" class="btn btn-light btn-small">{i + 1}</button>
            )
        });
    }

    render() {
        return (
            <div className="form">
                <div className="btn-group">
                    {this.renderAddressSelector()}
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input id="address" type="text" className="form-control"
                                name="cidade"
                                value={this.state.address.cidade}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a cidade..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Rua</label>
                            <input id="address" type="text" className="form-control"
                                name="rua"
                                value={this.state.address.rua}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a rua..." />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>

                        <button id='remove-address' className="btn btn-danger ml-2" style={{ display: 'none' }}
                            onClick={e => this.remove(e)}>
                            Remover
                        </button>
                    </div>
                </div>
            </div>

        )
    }

}