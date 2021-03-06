import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/CardDetailPage.css";
import { detail_card, repos } from "../testdata.jsx";
import CardFlag from "../util/CardFlag.jsx";
import RepoItem from "../components/RepoItem.jsx";
import CardNavbar from "../components/navbars/CardNavbar.jsx";
import ProjectNavbar from "../components/navbars/ProjectNavbar.jsx";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Projects } from "../../api/projects/Projects.js";

class CardDetailPage extends Component {
	constructor(props) {
		super(props);
		var data = detail_card();
		var repositories = repos();
		this.state = {
			data: data,
			repos: repositories
		};
	}

	componentDidMount() {
		console.log(this.props);
		//this.props.changeMode(this.props.isUserMode);
	}

	componentDidUpdate() {
		if (!this.props.dat) {
			this.props.history.push("/projects");
		}
	}

	renderFlags() {
		return this.props.dat.tags.map((tag) => {
			return (<Col key={tag} md={2}>
				<CardFlag key={tag} name={tag} />
			</Col>);
		});
	}

	renderStats() {
		if (this.props.isUserMode) {
			var numberOfRates = this.props.dat.numberOfRates ? this.props.dat.numberOfRates : "-";
			var grade = this.props.dat.grade ? this.props.dat.grade : "-";
			return (
				<div className="profile-content">
					<ul>
						<li>
							<div className="digits">{numberOfRates}</div>
							Times rated
						</li>
						<li>
							<div className="digits">{grade}</div>
							Rating
						</li>
					</ul>
					<div className="clear"></div>
				</div>)
		}
		else {
			var numberOfRates = this.props.dat.numberOfRates ? this.props.dat.numberOfRates : "-";
			var grade = this.props.dat.grade ? this.props.dat.grade : "-";
			var numberOfLikes = this.props.dat.numberOfLikes ? this.props.dat.numberOfLikes : "-";
			var projectsByLanguage = this.props.dat.projectsByLanguage;

			return (
				<div className="profile-content">
					<ul>
						<li>
							<div className="digits">{numberOfRates}</div>
							Times rated
						</li>
						<li>
							<div className="digits">{grade}</div>
							Rating
						</li>
						<li>
							<div className="digits">{numberOfLikes}</div>
							Likes
						</li>
					</ul>
					<div className="clear"></div>
				</div>)
		}
	}

	renderRepos() {
		var repos = [];
		for(var i = 0; i < this.props.dat.repos.length && i < 4; i++) {
			const repo = this.props.dat.repos[i];
			repos.push(
				<Col key={repo.repoId} md={6}>
					<RepoItem key={repo.repoId} url={repo.url} name={repo.name} description={repo.description} language={repo.language} />
				</Col>
			);
		}
		return repos;
	}

	render() {
		if (!this.props.dat) {
			return null;
		}
		return (
			<div className="data_detail">
				{this.props.dat.userId !== Meteor.userId() ?
						<CardNavbar history={this.props.history} card={this.props.dat} isUserMode={this.props.isUserMode} /> :
						<ProjectNavbar history={this.props.history} card={this.props.dat} />
				}
				<div className="data_content">
					<img src={this.props.dat.image_url} alt="data_pic" className="detail_img" />

					{this.renderStats()}

					<div className="info_container">
						<div className="detail_name">{this.props.dat.name}</div>
						<div className="detail_username">{!this.props.dat.username && this.props.dat.services ? this.props.dat.services.github.username : this.props.dat.username}</div>
					</div>
					{this.props.dat.description ?
							<div className="info_container">
								<div className="info_title">Bio</div>
								<div className="info_description">{this.props.dat.description}</div>
							</div> : null}
							<div className="info_container">
								<div className="info_title">Tags</div>
								<Row>
									{this.renderFlags()}
								</Row>
							</div>
							{this.props.dat.repos ?
									<div className="info_container">
										<div className="info_title">Repos</div>
										<Row>{this.renderRepos()}</Row>
									</div> : null}
								</div>
							</div>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe("users");
	Meteor.subscribe("projects");

	const cardId = props.match.params.id;

	return {
		dat: (props.isUserMode ? Projects.findOne({ _id: cardId }) : Meteor.users.findOne({ _id: cardId }))
	};
})(CardDetailPage);
