import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  product_quantity_decrement,
  product_quantity_increment,
} from "../redux/products/actions";
import { add_cart } from "../redux/carts/actions";
import { cart_quantity_decrement } from "../redux/carts/actions";

// total amount calculation
const bill_details = (carts) => {
  let totalPrice = 0;
  carts.map((cart) => (totalPrice += cart.price * cart.quantity));
  return totalPrice;
};

const checkProductQuantity = (products, id) => {
  let foundZero = false;
  products.map((product) => {
    if (product.id === id && product.quantity === 0) {
      foundZero = true;
    }
  });
  return foundZero;
};

function Carts() {
  const products = useSelector((state) => state.products);
  const carts = useSelector((state) => state.carts.carts);
  const dispatch = useDispatch();
  const totalAmount = bill_details(carts);

  const incrementHandle = (cart) => {
    products.map((product) => {
      if (product.id === cart.id && product.quantity !== 0) {
        dispatch(product_quantity_decrement(cart.id));
        dispatch(add_cart(cart));
      }
    });
  };

  const decrementHandle = (cart) => {
    carts.map((cartItem) => {
      if (cartItem.id === cart.id && cart.quantity > 1) {
        dispatch(product_quantity_increment(cartItem.id, "increment"));
        dispatch(cart_quantity_decrement(cartItem.id, "decrement"));
        return;
      } else if (cartItem.id === cart.id && cart.quantity === 1) {
        dispatch(product_quantity_increment(cartItem.id, "increment"));
        dispatch(cart_quantity_decrement(cartItem.id, "delete"));
        return;
      }
    });
  };

  const deleteHandle = (cart) => {
    dispatch(product_quantity_increment(cart.id, "delete", cart.quantity));
    dispatch(cart_quantity_decrement(cart.id, "delete"));
  };

  return (
    <main className="py-16">
      <div className="container 2xl:px-8 px-2 mx-auto">
        <h2 className="mb-8 text-xl font-bold">Shopping Cart</h2>
        <div className="cartListContainer">
          <div className="space-y-6">
            {/* Cart Item */}
            {carts.length !== 0 ? (
              carts.map((cart) => (
                <div className="cartCard" key={cart.id}>
                  <div className="flex items-center col-span-6 space-x-6">
                    {/* cart image */}
                    <img
                      className="lws-cartImage"
                      src={cart.image_url}
                      alt="product"
                    />
                    {/* cart item info */}
                    <div className="space-y-2">
                      <h4 className="lws-cartName">{cart.product_name}</h4>
                      <p className="lws-cartCategory">{cart.category}</p>
                      <p>
                        BDT <span className="lws-cartPrice">{cart.price}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
                    {/* amount buttons */}
                    <div className="flex items-center space-x-4">
                      <button
                        className="lws-incrementQuantity"
                        onClick={() => incrementHandle(cart)}
                        style={
                          checkProductQuantity(products, cart.id)
                            ? { cursor: "none" }
                            : { cursor: "pointer" }
                        }
                      >
                        {checkProductQuantity(products, cart.id) ? (
                          <i className="fa-solid fa-lock"></i>
                        ) : (
                          <i className="text-lg fa-solid fa-plus"></i>
                        )}
                      </button>
                      <span className="lws-cartQuantity">{cart.quantity}</span>
                      <button
                        className="lws-decrementQuantity"
                        onClick={() => decrementHandle(cart)}
                      >
                        <i className="text-lg fa-solid fa-minus"></i>
                      </button>
                    </div>
                    {/* price */}
                    <p className="text-lg font-bold">
                      BDT{" "}
                      <span className="lws-calculatedPrice">
                        {cart.price * cart.quantity}
                      </span>
                    </p>
                  </div>
                  {/* delete button */}
                  <div className="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
                    <button
                      className="lws-removeFromCart"
                      onClick={() => deleteHandle(cart)}
                    >
                      <i className="text-lg text-red-400 fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1>No Cart Available</h1>
            )}

            {/* Cart Items Ends  */}
          </div>

          {/* Bill Details */}
          <div>
            <div className="billDetailsCard">
              <h4 className="mt-2 mb-8 text-xl font-bold text-center">
                Bill Details
              </h4>
              <div className="space-y-4">
                {/* sub total */}
                <div className="flex items-center justify-between">
                  <p>Sub Total</p>
                  <p>
                    BDT <span className="lws-subtotal">{totalAmount}</span>
                  </p>
                </div>
                {/* Discount */}
                <div className="flex items-center justify-between">
                  <p>Discount</p>
                  <p>
                    BDT <span className="lws-discount">0</span>
                  </p>
                </div>
                {/* VAT */}
                <div className="flex items-center justify-between">
                  <p>VAT</p>
                  <p>
                    BDT <span className="vat">0</span>
                  </p>
                </div>
                {/* Total */}
                <div className="flex items-center justify-between pb-4">
                  <p className="font-bold">TOTAL</p>
                  <p className="font-bold">
                    BDT <span className="lws-total">{totalAmount}</span>
                  </p>
                </div>
                <button className="placeOrderbtn">place order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Carts;
