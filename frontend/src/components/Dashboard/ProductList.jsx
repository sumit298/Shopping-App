import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../App/Redux/ProductsSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  React.useEffect(() => {
    dispatch(getProducts());
  }, []);
  console.log(products);
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-8">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {products?.products.map((product) => {
            return (
              <tbody key={product._id}>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.title}
                  </th>
                  <td className="px-6 py-4">{product.brand}</td>
                  <td className="px-6 py-4 capitalize">{product.category}</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4">{product.rating}</td>
                  <td className="px-6 py-4">{product.stock}</td>

                  <td className="px-6 py-4 flex gap-2">
                  <a
                      href="#"
                      className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
                    >
                      View
                    </a>
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default ProductList;
