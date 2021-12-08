import React, { Component } from "react";
import Address from "./Address";

export default class CustomerAddress extends Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.clear = this.clear.bind(this);
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
        address.id = this.props.customer.addresses.length + 1;
        this.props.pushAddress(address);
        this.setState({ address: new Address() });
    }

    clear() {
        this.setState({ address: new Address() });
    }

    loadAddress(address) {
        this.setState({ address });
    }

    renderAddressSelector() {
        const addresses = this.props.customer.addresses;
        console.log(addresses);
        return addresses.map((a, i) => {
            return (
                <button onClick={() => this.loadAddress(a)}type="button" class="btn btn-light btn-small">{i + 1}</button>
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
                            <input type="text" className="form-control"
                                name="cidade"
                                value={this.state.address.cidade}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a cidade..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Rua</label>
                            <input type="text" className="form-control"
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
                    </div>
                </div>
            </div>

        )
    }

}