import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { BiLogoTwitter } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(3, "must be greater than 3 characters")
    .max(20, "too much long"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(3, "must be greater than 3 characters"),
  username: Yup.string()
    .lowercase("must be in lowercase")
    .min(3, "must be greater than 3 chars")
    .max(15)
    .required("username is required"),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .required("No password provided")
    .min(6, "password is too short - should be 8 chars minimum")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Must match password"),
});


const errorClassName = "text-red-500 text-xs";
const inputError = `outline-red-500 px-4 py-1.5  bg-gray-200 dark:bg-gray-800 rounded-md w-full`;
const inputClassName =
  " px-4 py-1.5 rounded-md  dark:bg-gray-800 bg-gray-200 outline-none w-full";
const btn =
  "px-3 bg-blue-600 bg-black py-2 w-full hover:bg-blue-500 rounded-md mt-4 text-white dark:text-black dark:hover:bg-blue-300";
const disabledBtn =
  "px-3 bg-blue-500 py-2 w-full font-semibold text-white rounded mt-4";
const UserRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div className=" flex justify-between items-center h-screen dark:bg-gray-800 dark:text-white bg-gray-100 overflow-hidden ">
      <div className="bg-blue-500 lg:-mx-12 lg:w-[46%] lg:h-[110%] lg:rotate-6 sm:block">
        <div className="flex flex-col justify-between items-center h-screen -rotate-6 ">
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
        validationSchema={registerSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          const { firstName, lastName, username, password, email } = values;

          dispatch(
            authRegister({
              firstName,
              lastName,
              username,
              password,
              email,
              role: "user",
            })
          );
          resetForm();

          navigate("/login");
        }}
      >
        {(formik) => {
          const { errors, dirty, isValid, handleBlur, touched } = formik;
          return (
            <div className="flex flex-col m-auto w-2/5 ">
              <h2 className="text-2xl font-semibold">Sign Up</h2>
              <span className="text-sm">Register for account</span>
              <Form className="bg-white dark:bg-gray-700 p-7 mt-4 rounded-lg text-[0.9rem]">
                <div className="flex mt-2 items-center gap-3 justify-between">
                  <div className="flex flex-col ">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter first name"
                      className={
                        errors.firstName && touched.firstName
                          ? inputError
                          : inputClassName
                      }
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="firstName"
                      component={"span"}
                      className={errorClassName}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter last name"
                      className={
                        errors.lastName && touched.lastName
                          ? inputError
                          : inputClassName
                      }
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="lastName"
                      component={"span"}
                      className={errorClassName}
                    />
                  </div>
                </div>

                <div className="flex flex-col mt-2">
                  <label htmlFor="username">Username</label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className={
                      errors.username && touched.username
                        ? inputError
                        : inputClassName
                    }
                    onBlur={handleBlur}
                    placeholder="Enter username"
                  />
                  <ErrorMessage
                    name="username"
                    component={"span"}
                    className={errorClassName}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className={
                      errors.email && touched.email
                        ? inputError
                        : inputClassName
                    }
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="email"
                    component={"span"}
                    className={errorClassName}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className={
                      errors.password && touched.password
                        ? inputError
                        : inputClassName
                    }
                    onBlur={handleBlur}
                    placeholder="Enter password"
                  />
                  <ErrorMessage
                    name="password"
                    component={"span"}
                    className={errorClassName}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? inputError
                        : inputClassName
                    }
                    onBlur={handleBlur}
                    placeholder="Match password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component={"span"}
                    className={errorClassName}
                  />
                </div>
                <button
                  type="submit"
                  className={!(dirty && isValid) ? disabledBtn : btn}
                  disabled={!(dirty && isValid)}
                >
                  Sign Up
                </button>
              </Form>
              <div className="mt-8 ">
                <span className="text-gray-500">Already have an account?,</span>{" "}
                <Link className="text-blue-500" to="/login">Login here</Link>
              </div>
            </div>
          );
        }}
      </Formik>
      
    </div>
  );
};

export default UserRegister;
