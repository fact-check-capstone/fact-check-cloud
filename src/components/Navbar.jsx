// import { useRouteError } from "react-router-dom";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="h-16 bg-blue-200 flex justify-center items-center">
      <Link className="px-2" to="/">
        Home
      </Link>
      <Link className="px-2" to="/news">
        News
      </Link>
      <Link className="px-2" to="/history">
        History
      </Link>
      <Link className="px-2" to="/profile">
        Profile
      </Link>
    </div>
  );
}
