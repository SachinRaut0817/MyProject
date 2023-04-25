import React, { useState } from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { notification, Spin } from "antd";
import * as Yup from "yup";
import { Formik } from "formik";
import useAuth from "../../../hooks/useAuth";
import useScriptRef from "../../../hooks/useScriptRef";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import LocalStorage from "../../../components/helper/LocalStorage";
import { login } from "../../../services/UserService";

const FirebaseLogin = ({ className, ...rest }) => {
  const scriptedRef = useScriptRef();
  const [loader, setLoader] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { firebaseEmailPasswordSignIn, firebaseGoogleSignIn } = useAuth();
  const history = useHistory();

  const googleHandler = async () => {
    try {
      await firebaseGoogleSignIn();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (email, password) => {
    let query_params = {
      email: email,
      password: password,
    };
    setLoader(true);

    login(query_params)
      .then((res) => {
        if (res.status == 200) {
          setLoader(false);
          LocalStorage.setItem("user", JSON.stringify(res.data)).then(
            (success) => {
              toast.success(res.message);
              history.push("/dashboard");
            }
          );
        } else {
          toast.error(res.message);
          setLoader(false);
        }
      })
      .catch((err) => {});
  };

  return (
    <React.Fragment>
      {loader ? (
        <span className="loader-class">
          <Spin />
        </span>
      ) : (
        ""
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await handleLogin(values.email, values.password);
            // await firebaseEmailPasswordSignIn(values.email, values.password);

            // if (scriptedRef.current) {
            //   setStatus({ success: true });
            //   setSubmitting(true);
            // }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            className={className}
            {...rest}
          >
            <div className="form-group mb-3">
              <input
                className="form-control"
                error={touched.email && errors.email}
                label="Email Address / Username"
                name="email"
                placeholder="Enter Email Address"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
              />
              {touched.email && errors.email && (
                <small class="text-danger form-text">{errors.email}</small>
              )}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                error={touched.password && errors.password}
                label="Password"
                name="password"
                placeholder="Enter Password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
              />
              {touched.password && errors.password && (
                <small class="text-danger form-text">{errors.password}</small>
              )}
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}

            {/* <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
                Save credentials.
              </label>
            </div> */}

            <Row>
              <Col mt={2}>
                <Button
                  className="btn-block"
                  color="primary"
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="primary"
                  style={{
                    "background-color": "rgba(255, 0, 0, 0.63)",
                    "border-color": "rgba(255, 0, 0, 0.63)",
                  }}
                >
                  Sign in
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>

      {/* <Row>
        <Col sm={12}>
          <h5 className="my-3"> OR </h5>
        </Col>
      </Row> */}

      {/* <Row>
        <Col sm={12}>
          <Button onClick={googleHandler} variant="danger">
            <i className="fa fa-lock" /> Sign in with Google
          </Button>
        </Col>
      </Row> */}

      {/* <hr /> */}
    </React.Fragment>
  );
};

export default FirebaseLogin;
