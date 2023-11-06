import React from "react";
import Cart from "./Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllProducts, getProducts } from "../App/Redux/ProductsSlice";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonCard from "./Skeleton";
import ThemeSwitch from "../Theme/ThemeButton";
import SearchBar from "./Searchbar";
import { groupByCategory } from "../utils/helperFunctions";
import { getProfile, logout } from "../App/Redux/AuthenticationSlice";
import { productAddToCart } from "../App/Redux/CartItemsSlice";

const Product = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");

  const toggle = () => {
    setShowModal(!showModal);
  };

  const userId = useSelector(
    (state) => state?.authentication?.userDetails?.body?._id
  );
  console.log(userId);
  React.useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) dispatch(getProfile());
  }, []);

  const { products, loading, error } = useSelector(selectAllProducts);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const getUnique = (arr) => {
    // console.log(arr.body)
    const newArray = arr;
    let mapObj = new Map();
    newArray.forEach((v) => {
      let prevValue = mapObj.get(v.category);
      if (!prevValue) {
        mapObj.set(v.category, v);
      }
    });
    return [...mapObj.values()];
  };

  const uniqueCategory = getUnique(products);

  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

  const notifyError = () =>
    toast(`${error}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      type: "error",
      style: {
        backgroundColor: "#fff",
        color: "#000",
      },
    });

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    //dispatch(getProductsBySearch(results.title, results.category))
    setSearchString(string);
    setSearchResults(results);
  };

  const product = useSelector((state) => state.products.searchProduct);
  const authToken = useSelector((state) => state?.authentication.accessToken);
  const navigate = useNavigate();

  const authDetails = useSelector((state) => state.authentication);
  console.log(authDetails);
  // React.useEffect(() => {
  //   if (!authToken) {
  //     navigate("/login");
  //   }
  // }, [authToken, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const productNames = () => {
    return products.map((product) => {
      const {
        _id,
        title,
        category,
        price,
        discountPercentage,
        description,
        images,
        rating,
        stock,
        thumbnail,
      } = product;

      return {
        _id,
        name: title,
        category,
        price,
        discountPercentage,
        description,
        thumbnail,
        images,
        rating,
        stock,
      };
    });
  };

  const productArray = productNames();

  // console.log(productArray);
  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // dispatch(getProductsBySearch(item.name, item.category));
    console.log(item);
    navigate(`/product/${item._id}`);
    // the item selected
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left", width: "100px" }}>
          {item.name}
        </span>
      </>
    );
  };

  const [selectedCategory, setSelectedCategory] = React.useState("");

  const filteredProducts = React.useMemo(() => {
    if (!selectedCategory) {
      return products;
    }
    const groupedProducts = groupByCategory(products);
    return groupedProducts[selectedCategory] || [];
  }, [products, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  let dataToShow;
  if (error) {
    dataToShow = <div>Error Occured: {error} </div>;
  } else if (loading) {
    dataToShow = <SkeletonCard />;
  } else {
    dataToShow = (
      <>
        <div className="flex flex-col justify-center h-auto bg-gray-50 dark:bg-gray-800">
          <div className="lg:flex justify-between items-center md:block md:w-full px-20 py-5">
            <div className="flex items-center justify-between gap-x-8">
              <Link
                to="/"
                className="text-2xl uppercase font-bold mt-10 text-center mb-10 dark:text-white"
              >
                Shop
              </Link>

              <SearchBar
                products={products}
                formatResult={formatResult}
                handleOnFocus={handleOnFocus}
                handleOnHover={handleOnHover}
                handleOnSearch={handleOnSearch}
                handleOnSelect={handleOnSelect}
                productArray={productArray}
                productNames={productNames}
              />
            </div>

            <div className="flex gap-x-4 items-center">
              <h2 className="text-xl  mt-10 text-center mb-10 dark:text-white">
                {authDetails?.body?.firstName} {authDetails?.body?.lastName}
              </h2>
              <ThemeSwitch />

              {!showModal && (
                <button
                  className="px-4 py-3 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 dark:bg-gray-100 dark:text-black"
                  onClick={toggle}
                >
                  Cart ({cartItems?.length})
                </button>
              )}
              <button
                className="px-4 py-3 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 dark:bg-gray-100 dark:text-black"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          </div>
          <div className="flex gap-2 p-10 flex-wrap ">
            {(uniqueCategory || searchResults).map((product) => {
              return (
                <div className="flex flex-col" key={product._id}>
                  <button
                    className="bg-gray-200 p-2 w-fit capitalize text-gray-700 mt-4 rounded pointer-cursor hover:bg-gray-100 focus:bg-black focus:text-white text-sm"
                    onClick={() => handleCategoryClick(product.category)}
                  >
                    {product.category}
                  </button>
                </div>
              );
            })}
          </div>
          <div
            className="grid gap-4 px-10 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 "
            key={product._id}
          >
            {(filteredProducts || searchResults).map((product) => {
              const notify = () =>
                toast(`${product.title} is added to the cart`, {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                  type: "success",
                  style: {
                    backgroundColor: "#fff",
                    color: "#000",
                  },
                });
              const handleFunction = () => {
                notify();

                const productAddedToCartObject = {
                  userId,
                  productIds: [...product._id, product._id],
                };
                dispatch(productAddToCart(userId, productAddedToCartObject));
              };

              return (
                <div
                  key={product._id}
                  className="bg-white shadow-md rounded-lg p-10 dark:bg-black"
                >
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.thumbnail}
                      alt=""
                      className="rounded-md h-48"
                    />
                  </Link>
                  <div className="mt-4">
                    <h1 className="text-lg uppercase font-semibold  dark:text-white">
                      {product.title}
                    </h1>
                    <p className="mt-2 text-gray-500 text-sm dark:text-white">
                      {product.description.slice(0, 40)}...
                    </p>
                    <p className="mt-2 text-gray-500 dark:text-white">
                      ${product.price}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col justify-between items-center">
                    <button
                      className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => handleFunction()}
                    >
                      Add to cart
                    </button>
                    <ToastContainer />
                  </div>
                </div>
              );
            })}
          </div>
          {showModal && <Cart showModal={showModal} toggle={toggle} />}
        </div>
      </>
    );
  }

  return <>{dataToShow}</>;
};

export default Product;
