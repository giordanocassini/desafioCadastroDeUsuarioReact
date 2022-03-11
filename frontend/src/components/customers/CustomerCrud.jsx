import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";
import CustomerForm from "./CustomerForm";
import CustomerTable from "./CustomerTable";
import Customer from "./models/Customer";
import EmployeesTest from "./EmployeesTest";

const headerProps = {
    icon: 'users',
    title: 'Clientes',
    subtitle: 'Cadastro de Clientes: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/customers'
const initialState = {
    customer: new Customer(),
    list: []
}



export default class CustomersCrud extends Component {  

    constructor(props) {
        super(props)
        this.save = this.save.bind(this);
        this.clear = this.clear.bind(this);
        this.displayBlock = this.displayBlock.bind(this);
        this.displayNone = this.displayNone.bind(this);
    }

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data });
        })
    }

    clear() {
        this.setState({ customer: new Customer() });
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        this.displayNone('customer-form');
        this.displayBlock('new-customer');
    }

    save() {
        const customer = this.state.customer;
        const method = customer.id ? 'put' : 'post';
        const url = customer.id ? `${baseUrl}/${customer.id}` : baseUrl;
        axios[method](url, customer)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({ customer: new Customer(), list });
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );
            })
        this.displayNone('customer-form');
        this.displayBlock('new-customer');
    }

    getUpdatedList(customer) {
        const list = this.state.list.filter(u => u.id !== customer.id)
        list.unshift(customer);
        return list;
    }

    updateField = event => {
        const customer = { ...this.state.customer };
        customer[event.target.name] = event.target.value;
        this.setState({ customer });
    }

    load(customer) {                                         
        this.clear();
        this.setState({ customer });
        this.displayBlock('customer-form');
        this.displayNone('new-customer');
    }

    remove(customer) {
        axios.delete(`${baseUrl}/${customer.id}`).then(resp => { /* o que é resp aqui? */
            const list = this.state.list.filter(u => u !== customer);
            this.setState({ list });
        })
        this.clear();
    }

    pushAddress(address) {
        const customer = this.state.customer;
        customer.adresses.push(address);
        this.setState({ customer });
    }

    displayBlock(id) {
        const e = document.getElementById(`${id}`)
        e.style.display = 'block';
    }

    displayNone(id) {
        const e = document.getElementById(`${id}`)
        e.style.display = 'none';
    }

    newCustomer() {
        this.setState({ customer: new Customer() });
        this.displayBlock('customer-form');
        this.displayNone('new-customer');
    }

    renderRows() { /* refatorar... Ainda não descobri como jogar essa função dentro do componente CustomerTable
                                   sem precisar criar um componente de classe*/
                                 
        return this.state.list.map(customer => {
            return (
                <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(customer)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(customer)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }



    render() {
        
        return (
            <Main {...headerProps}>
                <CustomerForm
                    customer={this.state.customer}
                    updateField={e => this.updateField(e)}
                    salvar={() => this.save()}
                    cancelar={() => this.clear()}
                    pushAddress={a => this.pushAddress(a)}
                    newCustomer={() => this.newCustomer()}
                    displayBlock={id => this.displayBlock(id)}
                    displayNone={id => this.displayNone(id)}
                />
                <CustomerTable rows={this.renderRows()} />
                <EmployeesTest />
            </Main>
        )
    }
}