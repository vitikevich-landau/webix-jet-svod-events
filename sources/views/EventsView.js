import {JetView} from "webix-jet";
import {eventsCollection} from "../models/EventsCollection";
import {eventsDetalizationCollection} from "../models/EventsDetalizationCollection";

export default class EventsView extends JetView {
	config() {
		return {
			id: "events",
			view: "datatable",
			columns: [
				{id: "id"},
				{id: "userId"},
				{id: "title", adjust: "data"},
				{id: "body", fillspace: true},
			],
			// autoConfig: true,
			select: true,
			css: "webix_shadow_medium",
			fixedRowHeight: false,
			on: {
				onAfterSelect: function (obj, preserve) {
					eventsDetalizationCollection.refresh(
						this.getItem(obj.row).id
					).then(() => {
						$$("events_detalization").adjustRowHeight("body", false);
					});
				},
				// onresize: webix.once(function () {
				// 	this.adjustRowHeight("body", false);
				// })
			}
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.parse(eventsCollection.data);
	}
	
	urlChange(_$view, _$url) {
		super.urlChange(_$view, _$url);
		
		eventsCollection.refresh().then(() => {
			_$view.select(_$view.getFirstId());
			_$view.adjustRowHeight("body", false);
			// _$view.refresh();
		});
	}
}