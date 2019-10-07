import React from "react";
import { withRouter } from "react-router-dom";

import "./Styles/login.css";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			loginMessage: ""
		};
	}

	handleChangeName = event => {
		this.setState({ name: event.target.value });
	};

	handleChangeEmail = event => {
		this.setState({ email: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		// Hardcoded password
		if (this.state.name === "Mat" && this.state.email === "mat@test.com") {
			this.props.history.push("/users");
		} else {
			this.setState({ loginMessage: "Wrong credentials, try again" });
			this.setState({ name: "" });
			this.setState({ email: "" });
		}
	};

	render() {
		return (
			<div className="centeredForm">
				<form className=" ui error form" onSubmit={this.handleSubmit}>
					<h4>{this.state.loginMessage}</h4>
					<div className="field">
						<label>Name</label>
						<div className="ui input">
							<input
								type="name"
								placeholder="Name"
								value={this.state.name}
								onChange={this.handleChangeName}
								required
							/>
						</div>
					</div>
					<div className="field">
						<label>Email</label>
						<div className="ui input">
							<input
								type="email"
								placeholder="Email"
								value={this.state.email}
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
