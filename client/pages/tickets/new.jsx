import { useState } from "react";
import Router from 'next/router'
import useRequest from "../../hooks/use-request";
const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const {doRequest,errors}=useRequest({
    url:"/api/tickets",
    method:'post',
    body:{
      title,price
    },
    onSuccess:(ticket)=>{
   
      router.push('/')
    }
  })
  const onSubmit=(e)=>{
    e.preventDefault();
    doRequest();
  }

  const onBlur=()=>{
    const value=parseFloat(price)
    if(isNaN(value)){
        return
    }
    setPrice(value.toFixed(2))
  }
  return (
    <div className="container">
      <h1>Create A Ticket...</h1>
      <form className="bg-light" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">price</label>
          <input
            type="number"
            className="form-control"
            value={title}
            onBlur={onBlur}
            onChange={(e) => {
              setPrice(e.target.price);
            }}
          />
        </div>
        {errors}
        <button className="btn btn-primary " type="submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default NewTicket;
