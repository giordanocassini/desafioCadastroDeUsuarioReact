import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";
import CustomerForm from "./CustomerForm";
import CustomerTable from "./CustomerTable"

const headerProps = {
    icon: 'users',
    title: 'Clientes',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class CustomersCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user });
    }

    save() {
        const user = this.state.user;
        const method = user.id ? 'put' : 'post';
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({ user: initialState.user, list });
            })
    }

    getUpdatedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user);
        return list;
    }

    updateField = event => {
        const user = { ...this.state.user };
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    load(user) {
        this.setState({ user });
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => { /* o que é resp aqui? */
            const list = this.state.list.filter(u => u !== user);
            this.setState({ list });
        })
    }
   
    renderRows() { /* refatorar */
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }



    render() {
        return (
            <React.Fragment>
                <Main {...headerProps}>
                    <CustomerForm
                        valueName={this.state.user.name}
                        valueEmail={this.state.user.email}
                        updateField={e => this.updateField(e)}
                        salvar={e => this.save(e)}
                        cancelar={e => this.clear(e)}
                    />
                    <CustomerTable rows={this.renderRows()}/>
                </Main>
            </React.Fragment>
        )
    }
}