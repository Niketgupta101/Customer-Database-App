import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrdersForCustomer, getCustomerById, createNewOrder, deleteOrderById } from "../../api";

import "./styles.css";

const Orders = () => {
  const [orders, setOrders] = useState();
  const [user, setUser] = useState();
  const { customerId } = useParams();

  const Navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await getOrdersForCustomer(customerId);
      const response = await getCustomerById(customerId);
      console.log(data);
      setUser(response.data.customer);
      //   console.log({ customer });
      setOrders(data.orders);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewProduct = async (orderId) => {
      Navigate(`/orders/${orderId}`);
  }

  const handleDeleteOrder = async (orderId) => {
      const response = await deleteOrderById(orderId);
      console.log(response);
      fetchData();
  }
  const handleCreateOrder = async () => {
    const response = await createNewOrder(customerId);
    console.log(response);
    Navigate(`/orders/${response.data.order._id}`)
  }

  return (
    <>
      <div className="Order_header">
        <h2>My Orders</h2>
      </div>
      {user && (
        <div className="customer_details">
          <h3>Customer Details</h3>
          <div className="details">
            <div className="left_headers">
              <h4>Name</h4>
              <h4>Email Id</h4>
              <h4>Contact Number</h4>
              <h4>Number of Orders</h4>
              <h4>Created At</h4>
            </div>
            <div className="right_headers">
              <h4>{user.name}</h4>
              <h4>{user.emailId}</h4>
              <h4>{user.contact_no}</h4>
              <h4>{user.no_of_orders}</h4>
              <h4>{user.createdAt}</h4>
            </div>
          </div>
        </div>
      )}
      <div className="orders">
      <div className="create_order">
          <button className="primary_btn" onClick={handleCreateOrder}>+ Create Order</button>
      </div>
        {orders &&
          orders.map((order) => (
            <div className="order" key={order._id}>
                <div className="order_left">
                    <h2>ORDER ID</h2>
                    <h3>{order._id}</h3>
                    <h2>SKU ID</h2>
                    <h3>{order.SKU_id}</h3>
                </div>
                <div className="order_middle">
                    <h2>STATUS</h2>
                    <h3>{order.status}</h3>
                    <h2>CREATED AT</h2>
                    <h3>{order.createdAt}</h3>
                </div>
                <div className="order_right">
                    <div className="product_stats">
                    <h2>PRODUCTS PROCESSED</h2>
                    <h3>{order.products_processed} / {order.total_products}</h3>
                    </div>
                    <div className="order_actions">
                        <button className="primary_btn" onClick={() => handleDeleteOrder(order._id)}>Delete Order</button>
                        <button className="primary_btn" onClick={() => handleViewProduct(order._id)}>View Products</button>
                    </div>
                </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Orders;
