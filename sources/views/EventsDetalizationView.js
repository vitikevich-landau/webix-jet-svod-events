import {JetView} from "webix-jet";
import {eventsDetalizationCollection} from "../models/EventsDetalizationCollection";

export default class EventsDetalizationView extends JetView {
	config() {
		return {
			id: "events_detalization",
			gravity: .6,
			view: "datatable",
			columns: [
				{id: "id"},
				{id: "postId"},
				{id: "name", adjust: "data"},
				{id: "email", adjust: "data"},
				{id: "body", fillspace: true},
			],
			// autoConfig: true,
			fixedRowHeight: false,
			select: true,
			css: "webix_shadow_medium"
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.parse(eventsDetalizationCollection.data);
	}
}