import {JetView} from "webix-jet";
import {eventsDescriptionCollection} from "../models/EventDescriptionCollection";

export default class EventDescriptionView extends JetView {
	config() {
		return {
			id: "event_description",
			view: "list",
			navigation: false,
			type: {
				height: "auto",
			},
			template: "<code>#EVENT_DESCR#</code>",
			css: {
				// "font-weight": "bold"
				"font-size": "110%"
			}
		};
	}

	init(_$view, _$) {
		super.init(_$view, _$);

		_$view.parse(eventsDescriptionCollection.data);
	}
}