import React, { useEffect, useState } from "react";
import styles from "./AllUser.module.css";
import axios from "axios";

const Val = (props) => {
  let { username, email } = props.item;
  return (
    <>
      <div className={styles.badge}>
        <h3>
          <b>UserName : </b>
          {username}
        </h3>
        <h4>
          <b>User Email : </b>
          {email}
        </h4>
      </div>
    </>
  );
};

const AllUser = () => {
  let [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/user/all").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  return (
    <div className={styles.App}>
      {data && data.map((i, j) => <Val key={j} item={i} />)}
    </div>
  );
};

export default AllUser;
