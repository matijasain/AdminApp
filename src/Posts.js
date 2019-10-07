import React from "react";

import Menu from "./Menu";
import PopupPosts from "./Popup/PopupPosts";
import { usersUrl, postsUrl } from "./utilities";

import "./Styles/table.css";

class Posts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			posts: [],
			selectedPost: [],
			searched: "",
			direction: null,
			column: null,
			showPopup: false,
			arej: []
		};
	}

	assignUserToPost = userId => {
		return this.state.users.find(user => user.id === userId);
	};

	handleChange = event => this.setState({ searched: event.target.value });

	getPostsWithUser = data => {
		if (!data) {
			return [];
		}
		return data.map(post => {
			return { ...post, user: this.assignUserToPost(post.userId).name };
		});
	};

	filteredTable = () => {
		return this.state.posts.filter(post => {
			const searched = this.state.searched.toLowerCase();
			return (
				post.title.toLowerCase().includes(searched) ||
				post.user.toLowerCase().includes(searched)
			);
		});
	};

	handleClickColumn = columnValue => {
		const { column, posts, direction } = this.state;

		const sortBy = key => {
			return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
		};

		if (column !== columnValue) {
			sortBy(posts);
			this.setState({
				column: columnValue,
				posts: posts.concat().sort(sortBy(columnValue)),
				direction: "ascending"
			});

			return;
		}

		this.setState({
			posts: posts.reverse(),
			direction: direction === "ascending" ? "descending" : "ascending"
		});
	};

	togglePopup = post => {
		this.setState({
			selectedPost: post,
			showPopup: !this.state.showPopup
		});
	};

	componentDidMount = () => {
		fetch(usersUrl)
			.then(res => res.json())
			.then(data => this.setState({ users: data }));

		fetch(postsUrl)
			.then(res => res.json())
			.then(data => this.setState({ posts: this.getPostsWithUser(data) }));
	};
	render() {
		return (
			<div>
				<Menu />
				<div className="ui secondary menu">
					<h2 className="item">Posts</h2>
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
								onClick={() => this.handleClickColumn("title")}
								className={
									this.state.column === "title"
										? `sorted ${this.state.direction}`
										: null
								}
							>
								Title
							</th>
							<th
								onClick={() => this.handleClickColumn("user")}
								className={
									this.state.column === "user"
										? `sorted ${this.state.direction}`
										: null
								}
							>
								User
							</th>
						</tr>
					</thead>
					<tbody>
						{this.filteredTable().map(post => (
							<tr key={post.id}>
								<td data-label="ID">{post.id}</td>
								<td
									data-label="Title"
									className="selectingRow"
									onClick={() => this.togglePopup(post)}
								>
									{post.title}
								</td>
								<td data-label="Username">{post.user}</td>
							</tr>
						))}
					</tbody>
				</table>
				{this.state.showPopup ? (
					<PopupPosts
						post={this.state.selectedPost}
						closePopup={this.togglePopup}
					/>
				) : null}
			</div>
		);
	}
}

export default Posts;
