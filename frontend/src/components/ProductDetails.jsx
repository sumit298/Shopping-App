import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById } from "../App/Redux/ProductsSlice";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsById(id));
  }, []);
  const product = useSelector((state) => state.products.selectedProduct);
  const { loading, error } = useSelector((state) => state.products);
  const calculateDiscountPrice = (totalprice, discountPercentage) => {
    const discountAmount = (discountPercentage * totalprice) / 100;
    const discountedPrice = totalprice - discountAmount;
    return Math.round(discountedPrice);
  };
  return (
    <div className="flex justify-between dark:bg-gray-800">
      {loading && <div>Loading</div>}
      {error ? (
        <>Error {error}</>
      ) : (
        <>
          <div className="p-10 flex flex-col justify-start w-1/2 items-start bg-gray-100 dark:bg-gray-700 gap-y-4">
            <img className="" src={product?.thumbnail} alt={product?.title} />
            <div>
              {product?.images?.map((image, index) => (
                <img
                  className="h-64 my-4"
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col p-20">
            <p className="text-lg text-gray-600 dark:text-white">
              {product?.brand}
            </p>
            <p className="text-3xl font-semibold dark:text-white">
              {product?.title}
            </p>
            <p className="text-xl text-pink-500">${product?.price} USD</p>
            <p className="dark:text-white">{product?.stock} items left</p>

            <p className="text-gray-500 text-sm dark:text-gray-300">
              {product?.description}
            </p>
            <p className="text-red-500"> -{product?.discountPercentage}%</p>
            <p className="text-gray-500 px-1 ">
              <span className="dark:text-white">Discounted Price: </span>
              <span className="text-xl text-blue-700 dark:text-blue-400">
                {" "}
                $
                {calculateDiscountPrice(
                  product?.price,
                  product?.discountPercentage
                )}{" "}
                USD{" "}
              </span>
            </p>
            <p className="bg-gray-200 p-2 w-fit capitalize text-gray-700 mt-4 rounded pointer-cursor hover:bg-gray-100">
              {product?.category}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
