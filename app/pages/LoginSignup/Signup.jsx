import React, { useState } from "react";
import styles from "./LoginSignup.module.css";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const { register, handleSubmit, formState } = useForm();
  console.log(formState.errors);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      // let res = await axios.post("/api/user/signup", data);
      // console.log(res);
      navigate(`/home`);
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <section className={styles.container}>
      <div className={styles.signup}>
        <h2>Sign Up</h2>

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
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            name="email"
            type="email"
            id="email"
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

export default Signup;
