import React from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

import Breadcrumb from "../../../layouts/AdminLayout/Breadcrumb";

import { CopyToClipboard } from "react-copy-to-clipboard";

import FirebaseLogin from "./FirebaseLogin";
import logo from "../../../store/logo";
import "./signin.css";

const Signin1 = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card
            className="borderless text-center"
            style={{ "background-color": "#000000c9" }}
          >
            <Card.Body>
              <div className="mb-4 row">
                <div className="col-4">
                  <h3 className="loginText">GAIA</h3>
                </div>
                <div className="col-4">
                  <img src={logo.Logo} alt="logoimg" className="loginlogo" />
                </div>
                <div className="col-4">
                  <h3 className="loginText">GOV</h3>
                </div>
              </div>
              <FirebaseLogin />
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
