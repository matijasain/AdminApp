import React from "react";
import "../Styles/popupStyle.css";

class PopupUser extends React.Component {
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
					<h2>{this.props.user.name}</h2>
					<p>ID: {this.props.user.id}</p>
					<p>Username: {this.props.user.username}</p>
					<p>Email: {this.props.user.email}</p>
					<p>Street: {this.props.user.address.street}</p>
					<p>Suite: {this.props.user.address.suite}</p>
					<p>City: {this.props.user.address.city}</p>
					<p>Zipcode: {this.props.user.address.zipcode}</p>
					<p>Geo-lat: {this.props.user.address.geo.lat}</p>
					<p>Geo-lng: {this.props.user.address.geo.lng}</p>
					<p>Phone: {this.props.user.phone}</p>
					<p>Website: {this.props.user.website}</p>
					<p>Company name: {this.props.user.company.name}</p>
					<p>Company catch phrase: {this.props.user.company.catchPhrase}</p>
					<p>Company bs: {this.props.user.company.bs}</p>
				</div>
			</div>
		);
	}
}

export default PopupUser;
