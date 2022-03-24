import React, { useEffect, useState } from "react";
import useAxiosPrivate from '../users/hooks/useAxiosPrivate';
import Main from "../template/Main";
import CustomerForm from "./CustomerForm";
import CustomerTable from "./CustomerTable";
import Customer from "./models/Customer";

const headerProps = {
    icon: 'users',
    title: 'Clientes',
    subtitle: 'Cadastro de Clientes: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = '/customers';

const CustomerCrud = () => {

    const [customer, setCustomer] = useState(new Customer());
    const [list, setList] = useState([]);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const getCustomers = async () => {

            try {
                const response = await axiosPrivate.get(baseUrl);
                console.log(response.data);
                setList(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        getCustomers();
    }, [])

    // constructor(props) {
    //     super(props)
    //     this.save = this.save.bind(this);
    //     this.clear = this.clear.bind(this);
    //     this.displayBlock = this.displayBlock.bind(this);
    //     this.displayNone = this.displayNone.bind(this);
    // }

    // state = { ...initialState }

    // componentWillMount() {
    //     axios(baseUrl).then(resp => {
    //         this.setState({ list: resp.data });
    //     })
    // }

    const clear = () => {
        setCustomer(new Customer());
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        displayNone('customer-form');
        displayBlock('new-customer');
    }

    const save = async () => {
        const newCustomer = customer;
        const method = newCustomer.id ? 'put' : 'post';
        const url = newCustomer.id ? `${baseUrl}/${newCustomer.id}` : baseUrl;
        try {
            const response = await axiosPrivate[method](url, newCustomer);
            const newList = getUpdatedList(response.data);
            //this.setState({ customer: new Customer(), list });
            setCustomer(new Customer());
            setList(newList);
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
            console.log(response);
            displayNone('customer-form');
            displayBlock('new-customer');
        } catch (err) {
            console.log(err);
        }
    }

    const getUpdatedList = (customer) => {
        const newList = list.filter(c => c.id !== customer.id)
        newList.unshift(customer);
        return newList;
    }

    const updateField = event => {
        const currentCustomer = customer;
        currentCustomer[event.target.name] = event.target.value;
        setCustomer(currentCustomer);
    }

    const load = (currentCustomer) => {
        clear();
        setCustomer(currentCustomer);
        displayBlock('customer-form');
        displayNone('new-customer');
    }

    const remove = async (currentCustomer) => {

        const controller = new AbortController();

        try {
            const response = await axiosPrivate.delete(`${baseUrl}/${currentCustomer.id}`, {
                signal: controller.signal
            });
            const newList = list.filter(u => u !== currentCustomer);
            setList(newList);
            console.log(response);
            clear();
        } catch (err) {
            console.log(err);
        }
    }

    const pushAddress = () => {
        const currentCustomer = customer;
        currentCustomer.adresses.push(address);
        setCustomer(currentCustomer);
    }

    const displayBlock = (id) => {
        const e = document.getElementById(`${id}`)
        e.style.display = 'block';
    }

    const displayNone = (id) => {
        const e = document.getElementById(`${id}`)
        e.style.display = 'none';
    }

    const newCustomer = () => {
        setCustomer(new Customer());
        displayBlock('customer-form');
        displayNone('new-customer');
    }

    const renderRows = () => { /* refatorar... Ainda não descobri como jogar essa função dentro do componente CustomerTable
                                   sem precisar criar um componente de classe*/

        return list.map(customer => {
            return (
                <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => load(customer)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => remove(customer)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Main {...headerProps}>
            <CustomerForm
                customer={customer}
                updateField={e => updateField(e)}
                salvar={() => save()}
                cancelar={() => clear()}
                pushAddress={a => pushAddress(a)}
                newCustomer={() => newCustomer()}
                displayBlock={id => displayBlock(id)}
                displayNone={id => displayNone(id)}
            />
            <CustomerTable rows={renderRows()} />
        </Main>
    )

}

export default CustomerCrud