import React, { Component } from "react";
import Address from "./Address";

const initialState = {
    address: {
        rua: "",
        cidade: ""
    }
}

export default class CustomerAddress extends Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.clear = this.clear.bind(this);
    };

    state = { ...initialState };

    updateField(event) {
        const address = this.state.address;
        address[event.target.name] = event.target.value;
        this.setState({ address });
    }

    save() {
        const address = this.state.address;
        this.props.customer.address.push(address);
        this.props.salvar;
    }

    clear() {
        this.setState({...initialState});
        this.props.cancelar;
    }

    render() {
        return (
            <div className="form">
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
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="rua"
                                value={this.state.address.rua}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a rua..." />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={this.save}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={this.clear}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>

        )
    }

}