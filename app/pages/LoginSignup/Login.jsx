import React, { useState } from "react";
import styles from "./LoginSignup.module.css";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { register, handleSubmit, formState } = useForm();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setError(null);
      setSuccess(false);
      console.log(data);
      let res = await axios.post("/api/user/login", data);
      setSuccess(true);
      console.log(res);
    } catch (error) {
      setError(error);
      console.error("error", error);
    }
  };
  return (
    <section className={styles.container}>
      <div className={styles.signup}>
        <h2>Login</h2>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className={styles.form}
        >
          <label htmlFor="username">User Name</label>
          <input
            {...register("username", { required: true, minLength: 1 })}
            name="username"
            type="text"
            id="username"
          />
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: true, minLength: 8 })}
            name="password"
            type="password"
            id="password"
          />

          <button>Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
