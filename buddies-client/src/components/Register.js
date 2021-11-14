import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Register() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .required("Username is required")
        .min(4, "Username must be at least 4 characters")
        .max(20, "Username must not exceed 20 characters"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    });
  };

  const handleSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-6">
        <h4 className="text-center">Register</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <div className="mb-3 col-12">
                <label htmlFor="username" className="form-label ">
                  Username
                </label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3 col-12">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3 col-12">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3 col-12">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#FFBC05", borderColor: "#FFBC05" }}
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
