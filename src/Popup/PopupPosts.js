import React from "react";
import "../Styles/popupStyle.css";

class PopupPost extends React.Component {
	render() {
		return (
			<div className="popup">
				<div className="popupInner">
					<button
						class="ui secondary button buttonAdjusted"
						onClick={this.props.closePopup}
					>
						Close
					</button>
					<h2>{this.props.post.id}</h2>
					<p>User Id: {this.props.post.userId}</p>
					<p>Username: {this.props.post.title}</p>
					<p>Email: {this.props.post.body}</p>
				</div>
			</div>
		);
	}
}

export default PopupPost;
