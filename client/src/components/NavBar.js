import { Link } from "react-router-dom"

const NavBar = (props) => {
    return (
        <div className="navbar bg-base-300 basis-1/12">
            <ul className="menu menu-horizontal bg-base-100 rounded-box">
                <li className="hover-bordered"><Link to="/">Home</Link></li>

                <li className="hover-bordered"><Link to="/tracking">Tracking</Link></li>

                <li className="hover-bordered"><Link to="/estimate">Estimate</Link></li>

                <li className="hover-bordered"><Link to="/test-product">Product</Link></li>

                <li className="hover-bordered"><Link to="/create-stripe">Create Account</Link></li>

                <li className="hover-bordered"><Link to="/display-stripe">Display</Link></li>

                <li className="hover-bordered"><Link to="/sim-purchase">Purchase</Link></li>
            </ul>
        </div>
    )
}

export default NavBar