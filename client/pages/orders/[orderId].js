import { useEffect ,useState} from "react"
import StripeCheckout from 'react-stripe-checkout'
import useRequest from "../../hooks/use-request"
import Router from 'next/router'
const OrderShow=({order,currentUser})=>{
    const [timeLeft,setTimeLeft]=useState(0)
    const {doRequest,errors}=useRequest({
        url:"/api/payments",
        method:'post',
        body:{
            orderId:order.id
        },
        onSuccess:(payment)=>{
            Router.push('/orders')
        }

    })
    useEffect(()=>{
        const findTimeLeft=()=>{
            const msLeft=new Date(order.expiresAt)-new Date()
            setTimeLeft(Math.round(msLeft/1000))
        }
        findTimeLeft()
        
        const timerId=setInterval(findTimeLeft,1000)
        return()=>{
            clearInterval(timerId);
        }
    },[order])

        if(timeLeft<0){
            return <div>Order Expired !!</div>
        }

   

    return <div>{timeLeft} seconds left until reservation expires!!!
        <StripeCheckout
        token={(id)=>{
            doRequest({token:id})
        }}
        stripeKey='pk_test_51OmYUHSFIIdYEXXGZ6uamWsM0EynLhIujCfMSYJnh1ySBv1hcOqNmmXmjiXHdsKejneQ28IXmreOFhk8j4YuY6qb00pVe8BBgk'
        amount={order.ticket.price*100}
        email={currentUser.email}

        />
        {errors}
     </div>
}

OrderShow.getInitialProps=async(context,client)=>{
    const {orderId}=context.query;
    const {data}=await client.get(`/api/orders/${orderId}`)
    return {order:data}
}
export default OrderShow