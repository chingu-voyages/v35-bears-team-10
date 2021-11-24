import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
function Register() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate()

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

  const [serverState, setServerState] = useState();
      const handleServerResponse = (ok, msg) => {
        setServerState({ok, msg});
      };
      const handleSubmit = (values, actions) => {
        axios({
          method: "POST",
          url: "http://localhost:8000/api/auth/register",
          data: values
          
        })
          .then(response => {
            navigate.push("/login");
            actions.setSubmitting(false);
            actions.resetForm();
            handleServerResponse(true, "You are registered");
          })
          .catch(error => {
            
            actions.setSubmitting(false);
            handleServerResponse(false, error+"");
          });
      };

  return (
    <div> <svg className="design" width="146" height="137" viewBox="0 0 146 137" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M82 37C82 92.2285 37.2285 137 -18 137C-73.2285 137 -118 92.2285 -118 37C-118 -18.2285 -73.2285 -63 -18 -63C37.2285 -63 82 -18.2285 82 37Z" fill="#D98C00" fill-opacity="0.71"/>
    <circle cx="46" cy="-18" r="100" fill="#E9C441" fill-opacity="0.71"/>
    </svg>
    <h4 className="text-center">Welcome to Buddies!</h4>
    <p className="desc-register">Let's have some fun!</p>
    <div className="row justify-content-center mt-5">
      <div className="col-6">
        
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
                <Field name="username" type="text" className="form-control"  />
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
                <Field className="styleForm"name="email" type="email" className="form-control" />
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
                <div className="haveAccount">
                  <p className="text-1">
                    <span className="span0">Already have an account ?</span>
                    <span className="span1">Sign in</span></p></div>
                {serverState && (
                  <p className={!serverState.ok ? "errorMsg" : ""}>
                    {serverState.msg}
                  </p>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div></div>
  );
}

export default Register;
