import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Styles/menu.css";

class Menu extends React.Component {
	render() {
		return (
			<div className="ui secondary  menu">
				<NavLink to={"/users"} className="item" activeClassName="active">
					Users
				</NavLink>
				<NavLink to={"/posts"} className="item" activeClassName="active">
					Posts
				</NavLink>
				<div className="right menu">
					<Link to={"/"} className="ui item">
						Logout
					</Link>
				</div>
			</div>
		);
	}
}

export default Menu;
