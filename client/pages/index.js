
import Link from 'next/link'
const LandingPage = ({ currentUser,tickets }) => {
 const ticketList=tickets.map(ticket=>{
  return(
    <tr key={ticket.id}>
      <td>{ticket.title}</td>
      <td>{ticket.price}</td>
      <td>
      <Link className="nav-link active" aria-current="page" href="/tickets/ticketId" as={`/tickets/${ticket.id}`}>
              View ticket
              </Link>
      </td>
    </tr>
  )
 })
 return (
  <div>
    <h1>Tickets Available</h1>
    <table className='table'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Link</th>

        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  </div>
 )

};

LandingPage.getInitialProps = async (context,client,currentUser) => {
 const {data}=await client.get('/api/tickets')
 return {tickets:data}
};

export default LandingPage;
