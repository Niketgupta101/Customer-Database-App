import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsForOrder, getOrderById, createNewProduct, deleteProductById, updateProductById } from "../../api";

import * as uuid from "uuid";

const Products = () => {
  const [products, setProducts] = useState();
  const [order, setOrder] = useState();
  const [AddProductBoxOpen, setAddProductBoxOpen] = useState(false);

  const { orderId } = useParams();

  const [formData, setformData] = useState({
    name: "",
    quantity: "",
    product_id: uuid.v4(),
  });

  const fetchData = async () => {
    try {
      const { data } = await getProductsForOrder(orderId);
      const response = await getOrderById(orderId);
      console.log(data);
      setOrder(response.data.order);
      setProducts(data.products);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProductBox = async () => {
    setAddProductBoxOpen((prev) => !prev);
  };

  const handleEditProduct = async (product) => {
    setformData({...product});
    handleAddProductBox();
  };

  const handleDeleteProduct = async (id) => {
      const response = await deleteProductById(id);
      console.log(response);
      fetchData();
  }

  const handleOnChange = (e) => {
    setformData(prevData => ({...prevData, [e.target.name]: e.target.value}));
  }

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      let response;
      if(formData._id!==undefined)
      response = await updateProductById(formData);
      else{
        response = await createNewProduct({ orderId, formData });
      }
      console.log(response);
      fetchData();
      handleAddProductBox();
      setformData({});
  }

  return (
    <>
      <div className="Order_header">
        <h2>My Products</h2>
      </div>
      {order && (
        <div className="customer_details">
          <h3>Order Details</h3>
          <div className="details">
            <div className="left_headers">
              <h4>Order Id</h4>
              <h4>Customer Id</h4>
              <h4>SKU Id</h4>
              <h4>Total Products</h4>
              <h4>Products Processed</h4>
              <h4>Status</h4>
              <h4>Created At</h4>
            </div>
            <div className="right_headers">
              <h4>{order._id}</h4>
              <h4>{order.customer_id}</h4>
              <h4>{order.SKU_id}</h4>
              <h4>{order.total_products}</h4>
              <h4>{order.products_processed}</h4>
              <h4>{order.status}</h4>
              <h4>{order.createdAt}</h4>
            </div>
          </div>
        </div>
      )}
      <div className="products orders">
        {products &&
          products.map((product) => (
            <div className="product order" key={product._id}>
              <div className="order_left">
                <h2>Name</h2>
                <h3>{product.name}</h3>
                <h2>SKU ID</h2>
                <h3>{product.SKU_id}</h3>
              </div>
              <div className="order_middle">
                <h2>STATUS</h2>
                <h3>{product.status}</h3>
                <h2>CREATED AT</h2>
                <h3>{product.createdAt}</h3>
              </div>
              <div className="order_right">
                <div className="product_stats">
                  <h2>NUMBER OF QUANTITIES</h2>
                  <h3>{product.quantity}</h3>
                </div>
                <div className="order_actions">
                  <button className="primary_btn" onClick={() => handleEditProduct(product)}>Edit Product</button>
                  <button className="primary_btn" onClick={() => handleDeleteProduct(product._id)}>Delete Product</button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="add_btn" onClick={handleAddProductBox}>
        <h1>+</h1>
      </div>
      {AddProductBoxOpen && <div className="add_product">
          <div className="close_btn" onClick={handleAddProductBox}>
              <h3>X</h3>
          </div>
          <div className="add_header">
              <h2>{formData._id!==undefined ? 'Edit Product': 'Add New Product'}</h2>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="input_element">
                <label htmlFor="product_id">Product Id</label>
                <input type="text" name="product_id" value={formData.product_id} disabled/>
            </div>
            <div className="input_element">
                <label htmlFor="name">Name of the product</label>
                <input type="text" name="name" value={formData.name} onChange={handleOnChange}/>
            </div>
            <div className="input_element">
                <label htmlFor="quantity">Quantity</label>
                <input type="Number" name="quantity" value={formData.quantity} onChange={handleOnChange}/>
            </div>
            <input type="submit" className="primary_btn" />
          </form>
          </div>}
    </>
  );
};

export default Products;
