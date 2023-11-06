import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import {
//   selectCartTotal,
//   removeFromCart,
//   clearCart,
//   selectCartItems,
//   addToCart,
//   loadCartItems,
// } from "../App/Redux/LocalStorageCode (For Learning)/AuthService";


const Cart = ({ showModal, toggle }) => {
  const dispatch = useDispatch();

  const userId = useSelector(
    (state) => state?.authentication?.userDetails?.body?._id
  );
  console.log(userId);

  const getCartTotal = useSelector(selectCartTotal);
  // console.log(cartItems);

  useEffect(() => {
    dispatch(loadCartItems());
  }, [addToCart, removeFromCart, getCartTotal]);

  const cartItems = useSelector(selectCartItems);
  console.log(cartItems);
  return (
    showModal && (
      <div className="flex-col flex items-center bg-white gap-8 p-10 text-black dark:bg-gray-800 dark:text-white text-sm inset-1 left-1/4 fixed uppercase overflow-auto">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="absolute right-16 top-8">
          <button
            className="px-4 py-2 rounded m-5 bg-gray-800 text-white text-xs font-bold uppercase hover:bg-gray-700 focus:outline-none focus:bg-gray-700 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200"
            onClick={toggle}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {cartItems?.map((item) => (
            <div className="flex justify-between items-center" key={item.id}>
              <div className="flex gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="rounded-md h-24"
                />
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{item.title}</h1>
                  <p className="text-gray-600 dark:text-gray-100">
                    ${item.price}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 justify-center items-center px-10">
                <button
                  className="px-4 py-2 bg-gray-800 dark:bg-gray-100 dark:text-black text-white text-sm font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    dispatch(addToCart(item));
                  }}
                >
                  +
                </button>
                <p>{item.quantity}</p>
                <button
                  className="px-4 py-2 bg-gray-800 dark:bg-gray-100 dark:text-black text-white text-sm font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 dark:hover:bg-gray-200"
                  onClick={() => {
                    dispatch(removeFromCart(item));
                  }}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {cartItems?.length > 0 ? (
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-lg font-bold">Total: ${getCartTotal}</h1>
            <button
              className="px-4 py-2 mt-2 bg-gray-800 text-white rounded uppercase hover:bg-gray-700 focus:outline-none focus:bg-gray-700 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        ) : (
          <h1 className="text-lg font-bold">Your cart is empty</h1>
        )}
      </div>
    )
  );
};

export default Cart;
