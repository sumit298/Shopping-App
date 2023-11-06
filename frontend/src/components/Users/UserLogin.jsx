import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAuthenticate } from "../../App/Redux/AuthenticationSlice";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { BiLogoTwitter } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa";


const initialValues = {
  email: "",
  password: "",
};

const signInSchema = Yup.object().shape({
  email: Yup.string().email().required("email is required"),
  password: Yup.string().required("password is required"),
});

const errorClassName = "text-red-500 text-xs";
const inputError = `outline-red-500 px-4 py-1.5 bg-gray-200 dark:bg-gray-800 rounded-md`;
const inputClassName =
  " px-4 py-1.5 rounded-md  dark:bg-gray-800 bg-gray-200 outline-none";
const btn =
  "px-3 bg-blue-600 bg-black py-2 w-full hover:bg-blue-500 rounded-md mt-4 text-white dark:text-black dark:hover:bg-blue-300";
const disabledBtn =
  "px-3 bg-blue-500 py-2 w-full font-semibold text-white rounded mt-4";

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.authentication);
  console.log(auth);

  return (
    <div className="flex justify-between items-center h-screen overflow-hidden dark:bg-gray-800 bg-gray-100">
      <div className="bg-blue-500 lg:-mx-12 lg:w-[46%] lg:h-[110%] lg:rotate-6 sm:block">
        <div className="flex flex-col justify-between items-center h-screen -rotate-6">
          <span className="mt-20 -ml-72 text-white uppercase">Logo</span>
          <h2 className="text-4xl text-white">Board.</h2>
          <div className="flex gap-3">
            <AiFillGithub size={30} color="white" />
            <BiLogoTwitter size={30} color="white" />
            <AiFillLinkedin size={30} color="white" />
            <FaDiscord size={30} color="white" />
          </div>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={(values, { resetForm }) => {
          // dispatch(login(values));

          dispatch(loginAuthenticate(values));
          navigate("/product");

          resetForm();
        }}
      >
        {(formik) => {
          const { errors, touched, handleBlur, dirty, isValid, resetForm } =
            formik;
          return (
            <div className="flex flex-col justify-start  text-black mx-auto dark:text-white ">
              <h2 className=" text-2xl font-semibold">Sign In</h2>
              <span className="text-sm">Sign in to your account</span>
              <Form className="bg-white p-7 mt-4 rounded-lg dark:bg-gray-700 text-[0.9rem]">
                <div className="flex flex-col mt-2 ">
                  <label htmlFor="email" className="text-[0.9rem]">
                    Email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className={
                      errors.email && touched.email
                        ? inputError
                        : inputClassName
                    }
                    placeholder="Email address"
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="email"
                    component={"span"}
                    className={errorClassName}
                  />
                </div>
                <div className="flex flex-col mt-2.5">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? inputError
                        : inputClassName
                    }
                    placeholder="Enter password"
                  />
                  <ErrorMessage
                    name="password"
                    component={"span"}
                    className={errorClassName}
                  />
                </div>
                <span className="text-sm text-blue-500 cursor-pointer hover:text-blue-400">
                  Forget password?
                </span>
                <button
                  type="submit"
                  className={!(dirty && isValid) ? disabledBtn : btn}
                  disabled={!(dirty && isValid)}
                >
                  Sign in
                </button>
              </Form>
              {/* {authError && <div className={errorClassName}>{authError}</div>} */}
              <div className="mt-8 text-center">
                <span className="text-gray-500">Don't have an account?,</span>{" "}
                <Link className="text-blue-500" to="/">
                  Register here
                </Link>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default UserLogin;
