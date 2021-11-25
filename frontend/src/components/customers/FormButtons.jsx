import React from "react";

export default props =>
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
    </div>