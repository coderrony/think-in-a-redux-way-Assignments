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
    <main classNameNameName="py-16">
      <div classNameNameName="container 2xl:px-8 px-2 mx-auto">
        <h2 classNameNameName="mb-8 text-xl font-bold">Shopping Cart</h2>
        <div classNameNameName="cartListContainer">
          <div classNameNameName="space-y-6">
            {/* Cart Item */}
            {carts.length !== 0 ? (
              carts.map((cart) => (
                <div classNameNameName="cartCard" key={cart.id}>
                  <div classNameNameName="flex items-center col-span-6 space-x-6">
                    {/* cart image */}
                    <img
                      classNameNameName="lws-cartImage"
                      src={cart.image_url}
                      alt="product"
                    />
                    {/* cart item info */}
                    <div classNameNameName="space-y-2">
                      <h4 classNameNameName="lws-cartName">
                        {cart.product_name}
                      </h4>
                      <p classNameNameName="lws-cartCategory">
                        {cart.category}
                      </p>
                      <p>
                        BDT{" "}
                        <span classNameNameName="lws-cartPrice">
                          {cart.price}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div classNameNameName="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
                    {/* amount buttons */}
                    <div classNameNameName="flex items-center space-x-4">
                      <button
                        classNameNameName="lws-incrementQuantity"
                        onClick={() => incrementHandle(cart)}
                        style={
                          checkProductQuantity(products, cart.id)
                            ? { cursor: "none" }
                            : { cursor: "pointer" }
                        }
                      >
                        {checkProductQuantity(products, cart.id) ? (
                          <i classNameNameName="fa-solid fa-lock"></i>
                        ) : (
                          <i classNameNameName="text-lg fa-solid fa-plus"></i>
                        )}
                      </button>
                      <span classNameNameName="lws-cartQuantity">
                        {cart.quantity}
                      </span>
                      <button
                        classNameNameName="lws-decrementQuantity"
                        onClick={() => decrementHandle(cart)}
                      >
                        <i classNameNameName="text-lg fa-solid fa-minus"></i>
                      </button>
                    </div>
                    {/* price */}
                    <p classNameNameName="text-lg font-bold">
                      BDT{" "}
                      <span classNameNameName="lws-calculatedPrice">
                        {cart.price * cart.quantity}
                      </span>
                    </p>
                  </div>
                  {/* delete button */}
                  <div classNameNameName="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
                    <button
                      classNameNameName="lws-removeFromCart"
                      onClick={() => deleteHandle(cart)}
                    >
                      <i classNameNameName="text-lg text-red-400 fa-solid fa-trash"></i>
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
            <div classNameNameName="billDetailsCard">
              <h4 classNameNameName="mt-2 mb-8 text-xl font-bold text-center">
                Bill Details
              </h4>
              <div classNameNameName="space-y-4">
                {/* sub total */}
                <div classNameNameName="flex items-center justify-between">
                  <p>Sub Total</p>
                  <p>
                    BDT{" "}
                    <span classNameNameName="lws-subtotal">{totalAmount}</span>
                  </p>
                </div>
                {/* Discount */}
                <div classNameNameName="flex items-center justify-between">
                  <p>Discount</p>
                  <p>
                    BDT <span classNameNameName="lws-discount">0</span>
                  </p>
                </div>
                {/* VAT */}
                <div classNameNameName="flex items-center justify-between">
                  <p>VAT</p>
                  <p>
                    BDT <span classNameNameName="vat">0</span>
                  </p>
                </div>
                {/* Total */}
                <div classNameNameName="flex items-center justify-between pb-4">
                  <p classNameNameName="font-bold">TOTAL</p>
                  <p classNameNameName="font-bold">
                    BDT <span classNameNameName="lws-total">{totalAmount}</span>
                  </p>
                </div>
                <button classNameNameName="placeOrderbtn">place order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Carts;
