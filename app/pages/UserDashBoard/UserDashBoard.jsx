import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./UserDashBoard.module.css";

const UserDashBoard = () => {
  const { register, handleSubmit, formState } = useForm();
  console.log(formState.errors);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      // let res = await axios.post("/api/user/", data);
      // console.log(res);
      navigate(`/home`);
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <section className={styles.container}>
      <div className={styles.containerForm}>
        <h2>DashBoard</h2>

        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className={styles.form}
        >
          <div className="col">
            <label htmlFor="username">User Name</label>
            <input
              {...register("username", { required: true, minLength: 1 })}
              name="username"
              type="text"
              id="username"
            />
          </div>
          <div className="col">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: true })}
              name="email"
              type="email"
              id="email"
            />
          </div>
          <div className="col">
            <label htmlFor="password">Password</label>
            <input
              {...register("password", { required: true, minLength: 8 })}
              name="password"
              type="password"
              id="password"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <span className="input-group-text" id="basic-addon2">
              @example.com
            </span>
          </div>

          <div className="mb-3">
            <label for="basic-url" className="form-label">
              Your vanity URL
            </label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                https://example.com/users/
              </span>
              <input
                type="text"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3 basic-addon4"
              />
            </div>
            <div className="form-text" id="basic-addon4">
              Example help text goes outside the input group.
            </div>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <input
              type="text"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
            />
            <span className="input-group-text">.00</span>
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
            />
            <span className="input-group-text">@</span>
            <input
              type="text"
              className="form-control"
              placeholder="Server"
              aria-label="Server"
            />
          </div>

          <div className="input-group">
            <span className="input-group-text">With textarea</span>
            <textarea
              className="form-control"
              aria-label="With textarea"
            ></textarea>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default UserDashBoard;
