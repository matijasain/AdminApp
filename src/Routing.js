import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "./App";
import Users from "./Users";
import Posts from "./Posts";
import NotFound from "./NotFound";

function Routing() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/" component={App} />
					<Route exact path="/users" component={Users} />
					<Route exact path="/posts" component={Posts} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</Router>
	);
}

export default Routing;
