import {JetView} from "webix-jet";
import EventsView from "jet-views/EventsView";
import EventsDetalizationView from "jet-views/EventsDetalizationView";

export default class DataView extends JetView {
	config() {
		return {
			rows: [
				EventsView,
				{view: "resizer"},
				EventsDetalizationView
			]
		};
	}
	
}