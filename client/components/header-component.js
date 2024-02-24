import Link from "next/link";

export default ({ currentUser }) => {
    // const links=[
    //     {
    //         label:"Sign Up",href
    //     }
    // ]
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
            GitTix
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">
                Home
              </Link>
            </li>
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/orders">
                    {currentUser.email} Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/tickets/new">
                    Sell Tickets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/auth/signout">
                    Sign out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/auth/signup">
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/auth/signin">
                    Sign in
                  </Link>
                </li>
              </>
            )}

           
          </ul>
        </div>
      </div>
    </nav>
  );
};
