import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  add_product,
  product_quantity_decrement,
} from "../redux/products/actions";

import { add_cart } from "../redux/carts/actions";

function Products() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputData = new FormData(e.currentTarget);
    const currentData = {
      product_name: inputData.get("lws-inputName"),
      category: inputData.get("lws-inputCategory"),
      image_url: inputData.get("lws-inputImage"),
      price: inputData.get("lws-inputPrice"),
      quantity: inputData.get("lws-inputQuantity"),
    };
    dispatch(add_product(currentData));

    document.querySelector("#lws-addProductForm").reset();
  };

  const addToCartHandle = (product) => {
    if (product.quantity !== 0) {
      dispatch(product_quantity_decrement(product.id));
      dispatch(add_cart(product));
    }
  };
  return (
    <main classNameName="py-16">
      <div classNameName="productWrapper">
        <div classNameName="productContainer" id="lws-productContainer">
          {/* product item  */}
          {products.length !== 0 ? (
            products.map((product) => (
              <div classNameName="lws-productCard" key={product.id}>
                <img
                  classNameName="lws-productImage"
                  src={product.image_url}
                  alt={product.product_name}
                />
                <div classNameName="p-4 space-y-2">
                  <h4 classNameName="lws-productName">
                    {product.product_name}
                  </h4>
                  <p classNameName="lws-productCategory">{product.category}</p>
                  <div classNameName="flex items-center justify-between pb-2">
                    <p classNameName="productPrice">
                      BDT <span classNameName="lws-price">{product.price}</span>
                    </p>
                    <p classNameName="productQuantity">
                      QTY{" "}
                      <span classNameName="lws-quantity">
                        {product.quantity}
                      </span>
                    </p>
                  </div>
                  <button
                    classNameName="lws-btnAddToCart"
                    onClick={() => addToCartHandle(product)}
                    disabled={product.quantity === 0 ? true : false}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1>No Product add Yet !!!</h1>
          )}

          {/* product item end */}
        </div>

        <div>
          <div classNameName="formContainer">
            <h4 classNameName="formTitle">Add New Product</h4>
            <form
              classNameName="space-y-4 text-[#534F4F]"
              id="lws-addProductForm"
              onSubmit={handleSubmit}
            >
              {/* product name  */}
              <div classNameName="space-y-2">
                <label htmlFor="lws-inputName">Product Name</label>
                <input
                  classNameName="addProductInput"
                  id="lws-inputName"
                  name="lws-inputName"
                  type="text"
                  required
                />
              </div>
              {/* product category */}
              <div classNameName="space-y-2">
                <label htmlFor="lws-inputCategory">Category</label>
                <input
                  classNameName="addProductInput"
                  id="lws-inputCategory"
                  name="lws-inputCategory"
                  type="text"
                  required
                />
              </div>
              {/* product image url */}
              <div classNameName="space-y-2">
                <label htmlFor="lws-inputImage">Image Url</label>
                <input
                  classNameName="addProductInput"
                  id="lws-inputImage"
                  name="lws-inputImage"
                  type="text"
                  required
                />
              </div>
              {/* price & quantity container */}
              <div classNameName="grid grid-cols-2 gap-8 pb-4">
                {/* Price */}
                <div classNameName="space-y-2">
                  <label htmlFor="ws-inputPrice">Price</label>
                  <input
                    classNameName="addProductInput"
                    type="number"
                    id="lws-inputPrice"
                    name="lws-inputPrice"
                    required
                  />
                </div>
                {/* quantity */}
                <div classNameName="space-y-2">
                  <label htmlFor="lws-inputQuantity">Quantity</label>
                  <input
                    classNameName="addProductInput"
                    type="number"
                    id="lws-inputQuantity"
                    name="lws-inputQuantity"
                    required
                  />
                </div>
              </div>
              {/* submit button  */}
              <button type="submit" id="lws-inputSubmit" classNameName="submit">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Products;
