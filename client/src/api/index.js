const axios = require('axios');

const API = axios.create({ baseURL: 'http://localhost:5000' });

// ----------------- Customer API's --------------------------

export const getAllCustomers = async () => await API.get('/customer');
export const getCustomerById = async (customerId) => await API.get(`/customer/${customerId}`);

// ----------------- Orders API's -----------------------------

export const getOrdersForCustomer = async (customerId) => await API.get(`/order/all/${customerId}`);
export const getOrderById = async (orderId) => await API.get(`/order/${orderId}`);
export const createNewOrder = async (customerId) => await API.post(`/order/${customerId}`,{});
export const deleteOrderById = async (orderId) => await API.delete(`/order/${orderId}`);

// ----------------- Products API's -----------------------------

export const getProductsForOrder = async (orderId) => await API.get(`/product/all/${orderId}`);
export const createNewProduct = async (data) => await API.post(`/product/${data.orderId}`, data.formData);
export const deleteProductById = async (id) => await API.delete(`/product/${id}`);
export const updateProductById = async (formData) => await API.put(`/product/${formData._id}`, formData);