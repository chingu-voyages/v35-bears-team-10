import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import RegisterImg from "../images/registerImg.jpg";
import { Link } from "react-router-dom";

function Register() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .required("Name is required")
        .min(4, "Username must be at least 4 characters")
        .max(20, "Username must not exceed 20 characters"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
    });
  };
  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };
  const handleSubmit = (values, actions) => {
    axios({
      method: "POST",
      url: "http://localhost:8000/api/auth/register",
      data: values,
    })
      .then((response) => {
        actions.setSubmitting(false);
        actions.resetForm();
        handleServerResponse(true, "Registration Succesful!");
      })
      .catch((error) => {
        actions.setSubmitting(false);
        handleServerResponse(false, error.response.data.error);
        handleServerResponse(false, error + "");
      });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      <img
        src={RegisterImg}
        alt="hiking"
        className="w-1/2 h-screen hidden md:block"
      />
      <div className="flex flex-col justify-center items-center w-2/3 h-2/3">
        <h3 className="loginTitle">Welcome!</h3>
        <p className="loginText">Sign up for free</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="w-full md:w-2/3">
              <Field
                name="username"
                type="text"
                className="w-full bg-gray-200 px-4 py-2 rounded mt-2"
                placeholder="Username"
                required
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-2"
              />

              <Field
                name="email"
                type="email"
                className="w-full bg-gray-200 px-4 py-2 rounded mt-2"
                placeholder="Email"
                required
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-2"
              />

              <Field
                placeholder="Password"
                name="password"
                type="password"
                className="w-full bg-gray-200 px-4 py-2 rounded mt-2"
                required
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-2"
              />

              <button
                type="submit"
                className="w-full bg-yellow-400 text-white font-bold px-4 py-2 rounded mt-4"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Register
              </button>

              {serverState && (
                <p className={!serverState.ok ? "errorMsg" : ""}>
                  {serverState.msg}
                </p>
              )}
            </Form>
          )}
        </Formik>
        <span className="span-0">Already have an account?</span>
        <Link style={{ textDecoration: "none" }} to="/login">
          <span className="span-1">Login</span>
        </Link>
      </div>
    </div>
  );
}
export default Register;
