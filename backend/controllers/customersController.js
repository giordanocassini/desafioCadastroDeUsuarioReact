const data = {
    customers: require('../model/customers.json'),
    setCustomers: function (data) { this.customers = data }
}

const getAllCustomers = (req, res) => {
    res.json(data.customers);
}

const createNewCustomer = (req, res) => {
    const newCustomer = {
        id: data.customers?.length ? data.customers[data.customers.length - 1].id + 1 : 1,
        name: req.body.name,
        email: req.body.email,
        addresses: req.body.addresses
    }

    if (!newCustomer.name) {
        return res.status(400).json({ 'message': 'Name is required.' });
    }

    data.setCustomers([...data.customers, newCustomer]);
    res.status(201).json(data.customers);
}

const updateCustomer = (req, res) => {
    const customer = data.customers.find(c => c.id === parseInt(req.body.id));
    if (!customer) {
        return res.status(400).json({ "message": `customer ID ${req.body.id} not found` });
    }
    if (req.body.name) customer.name = req.body.name;
    if (req.body.email) customer.email = req.body.email;
    if (req.body.addresses) customer.addresses = req.body.addresses;
    const filteredArray = data.customers.filter(c => c.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, customer];
    data.setCustomers(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.customers);
}

const deleteCustomer = (req, res) => {
    const customer = data.customers.find(c => c.id === parseInt(req.body.id));
    if (!customer) {
        return res.status(400).json({ "message": `Customer ID ${req.body.id} not found` });
    }
    const filteredArray = data.customers.filter(c => c.id !== parseInt(req.body.id));
    data.setCustomers([...filteredArray]);
    res.json(data.customers);
}

const getCustomer = (req, res) => {
    const customer = data.customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) {
        return res.status(400).json({ "message": `Customer ID ${req.params.id} not found` });
    }
    res.json(customer);
}

module.exports = {
    getAllCustomers,
    createNewCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomer
}