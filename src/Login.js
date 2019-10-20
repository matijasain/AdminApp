import React from "react";
import { withRouter } from "react-router-dom";

import "./Styles/login.css";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			loginMessage: ""
		};
	}

	handleChangeName = event => {
		this.setState({ email: event.target.value });
	};

	handleChangeEmail = event => {
		this.setState({ password: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		// Hardcoded password
		if (
			this.state.email === "mat@test.com" &&
			this.state.password === "mattest123"
		) {
			this.props.history.push("/users");
		} else {
			this.setState({ loginMessage: "Wrong credentials, try again" });
			this.setState({ email: "" });
			this.setState({ password: "" });
		}
	};

	render() {
		return (
			<div className="centeredForm">
				<form className=" ui error form" onSubmit={this.handleSubmit}>
					<h4>{this.state.loginMessage}</h4>
					<div className="field">
						<label>Email</label>
						<div className="ui input">
							<input
								type="email"
								placeholder="Email"
								value={this.state.email}
								onChange={this.handleChangeName}
								required
							/>
						</div>
					</div>
					<div className="field">
						<label>Password</label>
						<div className="ui input">
							<input
								type="password"
								placeholder="Password"
								value={this.state.password}
								onChange={this.handleChangeEmail}
								required
							/>
						</div>
					</div>
					<div className="ui error message"></div>
					<button className="ui button">Login</button>
				</form>
			</div>
		);
	}
}

export default withRouter(Login);
