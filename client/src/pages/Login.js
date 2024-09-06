import React from "react";
import "../styles/LoginStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      console.log("abc");
      console.log(res);
      window.location.reload();
      dispatch(hideLoading());

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token);

        message.success("Login Successfully");

        // Check if the user is an admin
        const isAdmin = res.data.isAdmin;
        console.log(isAdmin);
        // console.log(res.data.phone)

        if (isAdmin) {
          console.log(isAdmin);
          navigate("/admindashboard");
        } else {
          console.log(isAdmin);
          navigate("/home");
        }
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div className="login-container ">
      <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
        <h3 className="text-center">Login Form</h3>

        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            required
          />
        </Form.Item>
        <Link to="/register" className="m-2">
          Not a user? Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;