import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllCustomers } from "../../api/index";

import "./styles.css";

const Home = () => {
  const [customers, setCustomers] = useState();
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data } = await getAllCustomers();
        console.log(data);
        setCustomers(data.customers);
      } catch (error) {
        console.log(`Customer details can't be fetched`, error);
      }
    };
    fetchData();
  }, []);

  const handleViewOrder = async (customerId) => {
    Navigate(`/customers/${customerId}`);
  };

  return (
    <div className="Home">
      <h3>Our Customers</h3>
      <div className="customers">
        <div className="customer_header">
          <h6>Name</h6>
          <h6>Email id</h6>
          <h6>No of Orders</h6>
          <h6>Actions</h6>
        </div>
        {customers &&
          customers.map((customer) => (
            <div className="customer" key={customer._id}>
              <h6>{customer.name}</h6>
              <h6>{customer.emailId}</h6>
              <h6>{customer.no_of_orders}</h6>
              <button
                className="primary_btn"
                onClick={() => handleViewOrder(customer._id)}
              >
                View Orders
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
