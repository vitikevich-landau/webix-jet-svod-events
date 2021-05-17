import {JetView} from "webix-jet";
import {eventsDetalizationCollection} from "../models/EventsDetalizationCollection";

export default class EventsDetalizationView extends JetView {
	config() {
		return {
			id: "events_detalization",
			view: "datatable",
			columns: [
				{id: "id"},
				{id: "postId"},
				{id: "name", fillspace: 1},
				{id: "email", adjust: "data"},
				{id: "body", fillspace: 2},
			],
			// autoConfig: true,
			fixedRowHeight: false,
			select: true,
			css: "webix_shadow_medium",
			on: {
				onresize: function () {
					/***
					 * 	if true, infinity loop
					 * */
					this.adjustRowHeight("name", true);
					this.adjustRowHeight("body", true);
				}
			}
		};
	}

	init(_$view, _$) {
		super.init(_$view, _$);

		_$view.parse(eventsDetalizationCollection.data);
	}
}