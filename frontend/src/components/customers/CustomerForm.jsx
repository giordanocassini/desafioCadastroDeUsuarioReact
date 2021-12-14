import React from "react";
import CustomerAddress from "./CustomerAddress";

export default props =>
    <React.Fragment>
        <button id='new-customer' className="btn btn-success mb-3" onClick={props.newCustomer}>
            Novo Cliente
        </button>
        <div className="form" style={{ display: 'none' }} id="customer-form">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" className="form-control"
                            name="name"
                            value={props.customer.name}
                            onChange={props.updateField}
                            placeholder="Digite o nome..." />
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="text" className="form-control"
                            name="email"
                            value={props.customer.email}
                            onChange={props.updateField}
                            placeholder="Digite o e-mail..." />
                    </div>
                </div>
            </div>
            <hr />
            <CustomerAddress {...props} />
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary"
                        onClick={props.salvar}>
                        Salvar
                    </button>

                    <button className="btn btn-secondary ml-2"
                        onClick={props.cancelar}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    </React.Fragment>



