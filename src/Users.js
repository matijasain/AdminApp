import React from "react";

import Menu from "./Menu";
import PopupUser from "./Popup/PopupUser";
import { usersUrl, postsUrl } from "./utilities";

import "./Styles/table.css";

class Users extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			posts: [],
			selectedUser: [],
			searched: "",
			direction: null,
			column: null,
			showPopup: false
		};
	}

	getPostsCountByUser = userId =>
		this.state.posts.filter(post => post.userId === userId).length;

	handleChange = event => this.setState({ searched: event.target.value });

	filteredTable = () => {
		return this.state.users.filter(user => {
			const searched = this.state.searched.toLowerCase();
			return (
				user.name.toLowerCase().includes(searched) ||
				user.email.toLowerCase().includes(searched) ||
				user.username.toLowerCase().includes(searched)
			);
		});
	};

	handleClickColumn = columnValue => {
		const { column, users, direction } = this.state;

		const sortBy = key => {
			return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
		};

		if (column !== columnValue) {
			sortBy(users);
			this.setState({
				column: columnValue,
				users: users.concat().sort(sortBy(columnValue)),
				direction: "ascending"
			});

			return;
		}

		this.setState({
			users: users.reverse(),
			direction: direction === "ascending" ? "descending" : "ascending"
		});
	};

	togglePopup = user => {
		this.setState({
			selectedUser: user,
			showPopup: !this.state.showPopup
		});
	};

	componentDidMount = () => {
		fetch(usersUrl)
			.then(res => res.json())
			.then(data => this.setState({ users: data }));

		fetch(postsUrl)
			.then(res => res.json())
			.then(data => this.setState({ posts: data }));
	};

	render() {
		return (
			<div>
				<Menu />
				<div className="ui secondary menu">
					<h2 className="item">Users</h2>

					<div className="ui icon input">
						<input
							type="text"
							placeholder="Search..."
							onChange={this.handleChange}
							value={this.state.searched}
						/>
						<i className="search link icon"></i>
					</div>
				</div>
				<table className="ui sortable celled table">
					<thead>
						<tr>
							<th>ID</th>
							<th
								onClick={() => this.handleClickColumn("name")}
								className={
									this.state.column === "name"
										? `sorted ${this.state.direction}`
										: null
								}
							>
								Name
							</th>
							<th
								onClick={() => this.handleClickColumn("username")}
								className={
									this.state.column === "username"
										? `sorted ${this.state.direction}`
										: null
								}
							>
								Username
							</th>
							<th
								onClick={() => this.handleClickColumn("email")}
								className={
									this.state.column === "email"
										? `sorted ${this.state.direction}`
										: null
								}
							>
								Email
							</th>
							<th>Posts Count</th>
						</tr>
					</thead>
					<tbody>
						{this.filteredTable().map(user => (
							<tr key={user.id}>
								<td data-label="ID">{user.id}</td>
								<td data-label="Name">{user.name}</td>
								<td
									data-label="Username"
									onClick={() => this.togglePopup(user)}
									className="selectingRow"
								>
									{user.username}
								</td>
								<td data-label="Email">{user.email}</td>
								<td data-label="PostsCount">
									{this.getPostsCountByUser(user.id)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{this.state.showPopup ? (
					<PopupUser
						user={this.state.selectedUser}
						closePopup={this.togglePopup}
					/>
				) : null}
			</div>
		);
	}
}

export default Users;
