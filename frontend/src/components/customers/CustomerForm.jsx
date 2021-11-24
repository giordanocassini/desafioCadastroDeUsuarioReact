import React from "react";

export default props =>
        <div className="row">
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Nome</label>
                    <input type="text" className="form-control"
                        name={props.name}
                        value={props.value}
                        onChange={props.onChange}
                        placeholder={props.placeholder} />
                </div>
            </div>
        </div>
        {/* <hr />
        <div className="row">
            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-primary"
                    onClick={e => props.save(e)}>
                    Salvar
                </button>

                <button className="btn btn-secondary ml-2"
                    onClick={e => props.clear(e)}>
                    Cancelar
                </button>
            </div>
        </div> */}