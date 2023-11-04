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
    <main classNameName="py-16">
      <div classNameName="container 2xl:px-8 px-2 mx-auto">
        <h2 classNameName="mb-8 text-xl font-bold">Shopping Cart</h2>
        <div classNameName="cartListContainer">
          <div classNameName="space-y-6">
            {/* Cart Item */}
            {carts.length !== 0 ? (
              carts.map((cart) => (
                <div classNameName="cartCard" key={cart.id}>
                  <div classNameName="flex items-center col-span-6 space-x-6">
                    {/* cart image */}
                    <img
                      classNameName="lws-cartImage"
                      src={cart.image_url}
                      alt="product"
                    />
                    {/* cart item info */}
                    <div classNameName="space-y-2">
                      <h4 classNameName="lws-cartName">{cart.product_name}</h4>
                      <p classNameName="lws-cartCategory">{cart.category}</p>
                      <p>
                        BDT{" "}
                        <span classNameName="lws-cartPrice">{cart.price}</span>
                      </p>
                    </div>
                  </div>
                  <div classNameName="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
                    {/* amount buttons */}
                    <div classNameName="flex items-center space-x-4">
                      <button
                        classNameName="lws-incrementQuantity"
                        onClick={() => incrementHandle(cart)}
                        style={
                          checkProductQuantity(products, cart.id)
                            ? { cursor: "none" }
                            : { cursor: "pointer" }
                        }
                      >
                        {checkProductQuantity(products, cart.id) ? (
                          <i classNameName="fa-solid fa-lock"></i>
                        ) : (
                          <i classNameName="text-lg fa-solid fa-plus"></i>
                        )}
                      </button>
                      <span classNameName="lws-cartQuantity">
                        {cart.quantity}
                      </span>
                      <button
                        classNameName="lws-decrementQuantity"
                        onClick={() => decrementHandle(cart)}
                      >
                        <i classNameName="text-lg fa-solid fa-minus"></i>
                      </button>
                    </div>
                    {/* price */}
                    <p classNameName="text-lg font-bold">
                      BDT{" "}
                      <span classNameName="lws-calculatedPrice">
                        {cart.price * cart.quantity}
                      </span>
                    </p>
                  </div>
                  {/* delete button */}
                  <div classNameName="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
                    <button
                      classNameName="lws-removeFromCart"
                      onClick={() => deleteHandle(cart)}
                    >
                      <i classNameName="text-lg text-red-400 fa-solid fa-trash"></i>
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
            <div classNameName="billDetailsCard">
              <h4 classNameName="mt-2 mb-8 text-xl font-bold text-center">
                Bill Details
              </h4>
              <div classNameName="space-y-4">
                {/* sub total */}
                <div classNameName="flex items-center justify-between">
                  <p>Sub Total</p>
                  <p>
                    BDT <span classNameName="lws-subtotal">{totalAmount}</span>
                  </p>
                </div>
                {/* Discount */}
                <div classNameName="flex items-center justify-between">
                  <p>Discount</p>
                  <p>
                    BDT <span classNameName="lws-discount">0</span>
                  </p>
                </div>
                {/* VAT */}
                <div classNameName="flex items-center justify-between">
                  <p>VAT</p>
                  <p>
                    BDT <span classNameName="vat">0</span>
                  </p>
                </div>
                {/* Total */}
                <div classNameName="flex items-center justify-between pb-4">
                  <p classNameName="font-bold">TOTAL</p>
                  <p classNameName="font-bold">
                    BDT <span classNameName="lws-total">{totalAmount}</span>
                  </p>
                </div>
                <button classNameName="placeOrderbtn">place order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Carts;
