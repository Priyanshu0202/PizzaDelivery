"use client";
import Image from "next/image";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { reset } from "../../../redux/cartSlice";
import OrderDetail from "../../../components/OrderDetails";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();
  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      console.log(data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              console.log(shipping);
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className="m-2 lg:py-20 py-10 px-10 flex flex-col lg:flex-row">
      <div className="mr-10 lg:w-[70%] w-full overflow-x-auto">
        <table
          className="w-full text-center min-w-[700px]"
          style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
        >
          <thead>
            <tr className="lg:text-xl text-lg">
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product) => (
              <tr className="text-lg" key={product._id}>
                <td className="">
                  <div className="flex justify-center">
                    <Image
                      src={product.img}
                      width="70"
                      height="70"
                      alt=""
                      className=""
                    />
                  </div>
                </td>
                <td>
                  <span className="uppercase text-red-500 lg:text-xl text-md">
                    {product.title}
                  </span>
                </td>
                <td>
                  <span>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text},</span>
                    ))}
                  </span>
                </td>
                <td>
                  <span>Rs.{product.price}</span>
                </td>
                <td>
                  <span>{product.quantity}</span>
                </td>
                <td>
                  <span>Rs.{product.price * product.quantity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lg:w-[40%] sm:w-[60%] mx-auto bg-black/75 p-10 max-h-auto mt-10 lg:mt-0">
        <div className="">
          <h1 className="uppercase text-3xl font-bold mb-5 text-white">
            Cart Total
          </h1>
          <div className="text-xl p-1 text-white">
            <b>SubTotal:</b> Rs. {cart.total}
          </div>
          <div className="text-xl p-1 text-white">
            <b>Discount:</b> Rs. 0.00
          </div>
          <div className="text-xl p-1 text-white">
            <b className="">Total:</b> Rs. {cart.total}
          </div>
        </div>
        {open ? (
          <div className="flex-col text-center">
            <button
              onClick={() => setCash(true)}
              className="text-white font-bold border-white border w-full mt-3 p-2 mb-2 rounded-md bg-red-500"
            >
              CASH ON DELIVERY
            </button>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AW5we8mkqaW28Ts7ISaVVlhrRE3UcKV-jC8a2S-xhCJbkJzLeJdzAFekO1uBpGa76s511K4Bt0y8IITv",
                components: "buttons",
                currency: "USD",
                "disable-funding": "credit,card,p24",
              }}
            >
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="text-white bg-red-500 px-2 py-1 rounded-lg w-full mt-5 h-12 uppercase font-bold text-xl"
          >
            checkout now!
          </button>
        )}
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
