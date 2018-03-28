import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Chats = new Mongo.Collection("Chats");

if(Meteor.isServer) {
	Meteor.publish("chats", () => {
		return Chats.find({});
	});
}

Meteor.methods({
	"chats.insert"(object) {
		//		check(object.name, String);
		if(!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

			/*	Projects.insert({
			name: object.name,
			description: object.description,
			tags: object.tags,
			image_url: object.image_url,
			createdAt: new Date(),
			userId: this.userId,
			username: Meteor.users.findOne(this.userId).services.github.username,
		});*/
	},
	"chats.remove"(chatId) {
		// check
		Chats.remove(chatId);
	}
});
