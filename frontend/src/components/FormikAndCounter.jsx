import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";

import CounterContext from "./App/CounterContext";

const signUpSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short - must have 4 chars min"),
});

function App() {
  const { counter, increment, decrement, incrementByAmount, reset } =
    useContext(CounterContext);
  const [amount, setAmount] = useState(0);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });

  // const data = useFormik();
  // console.log(data)
  return (
    <Formik
      initialValues={formik.initialValues}
      validationSchema={signUpSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div>
            <div>
              <h2>Current Value: {counter}</h2>
              <input
                type="number"
                placeholder="Enter number..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button onClick={() => increment()}>Increment</button>
              <button onClick={() => reset()}>Reset</button>
              <button onClick={() => decrement()}>Decrement</button>
              <button onClick={() => incrementByAmount(amount)}>
                Increment By Amount
              </button>
            </div>
            <h1 className="text-2xl">Sign in to continue</h1>
            <Form>
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <ErrorMessage name="email" component="span" className="error" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>
              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Sign In
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default App;
