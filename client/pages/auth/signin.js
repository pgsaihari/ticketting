import { useState } from "react";
import Router from "next/router"
import useRequest from "../../hooks/use-request";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess:()=>{
        Router.push('/')
    }
  });


  const submitHandler = async (event) => {
    event.preventDefault();
   
   await doRequest();
   
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <h1>SignIn</h1>
        <div className="form-group">
          <label>Email address</label>
          <input
            className="from-control"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>password</label>
          <input
            className="from-control"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {errors}

        <button className="btn btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};
