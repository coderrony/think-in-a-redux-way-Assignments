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
    <main classNameNameName="py-16">
      <div classNameNameName="productWrapper">
        <div classNameNameName="productContainer" id="lws-productContainer">
          {/* product item  */}
          {products.length !== 0 ? (
            products.map((product) => (
              <div classNameNameName="lws-productCard" key={product.id}>
                <img
                  classNameNameName="lws-productImage"
                  src={product.image_url}
                  alt={product.product_name}
                />
                <div classNameNameName="p-4 space-y-2">
                  <h4 classNameNameName="lws-productName">
                    {product.product_name}
                  </h4>
                  <p classNameNameName="lws-productCategory">
                    {product.category}
                  </p>
                  <div classNameNameName="flex items-center justify-between pb-2">
                    <p classNameNameName="productPrice">
                      BDT{" "}
                      <span classNameNameName="lws-price">{product.price}</span>
                    </p>
                    <p classNameNameName="productQuantity">
                      QTY{" "}
                      <span classNameNameName="lws-quantity">
                        {product.quantity}
                      </span>
                    </p>
                  </div>
                  <button
                    classNameNameName="lws-btnAddToCart"
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
          <div classNameNameName="formContainer">
            <h4 classNameNameName="formTitle">Add New Product</h4>
            <form
              classNameNameName="space-y-4 text-[#534F4F]"
              id="lws-addProductForm"
              onSubmit={handleSubmit}
            >
              {/* product name  */}
              <div classNameNameName="space-y-2">
                <label htmlFor="lws-inputName">Product Name</label>
                <input
                  classNameNameName="addProductInput"
                  id="lws-inputName"
                  name="lws-inputName"
                  type="text"
                  required
                />
              </div>
              {/* product category */}
              <div classNameNameName="space-y-2">
                <label htmlFor="lws-inputCategory">Category</label>
                <input
                  classNameNameName="addProductInput"
                  id="lws-inputCategory"
                  name="lws-inputCategory"
                  type="text"
                  required
                />
              </div>
              {/* product image url */}
              <div classNameNameName="space-y-2">
                <label htmlFor="lws-inputImage">Image Url</label>
                <input
                  classNameNameName="addProductInput"
                  id="lws-inputImage"
                  name="lws-inputImage"
                  type="text"
                  required
                />
              </div>
              {/* price & quantity container */}
              <div classNameNameName="grid grid-cols-2 gap-8 pb-4">
                {/* Price */}
                <div classNameNameName="space-y-2">
                  <label htmlFor="ws-inputPrice">Price</label>
                  <input
                    classNameNameName="addProductInput"
                    type="number"
                    id="lws-inputPrice"
                    name="lws-inputPrice"
                    required
                  />
                </div>
                {/* quantity */}
                <div classNameNameName="space-y-2">
                  <label htmlFor="lws-inputQuantity">Quantity</label>
                  <input
                    classNameNameName="addProductInput"
                    type="number"
                    id="lws-inputQuantity"
                    name="lws-inputQuantity"
                    required
                  />
                </div>
              </div>
              {/* submit button  */}
              <button
                type="submit"
                id="lws-inputSubmit"
                classNameNameName="submit"
              >
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
