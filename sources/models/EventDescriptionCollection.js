import {SERVER_URI} from "../config";

class EventDescriptionCollection {
	constructor() {
		this._data = new webix.DataCollection({
			on: {
				onBeforeLoad: function () {
					webix.extend($$("event_description"), webix.ProgressBar);

					$$("event_description").showProgress();
				},
				onAfterLoad: function () {
					$$("event_description").hideProgress();
				}
			}
		});
	}

	refresh(rn) {
		this._data.clearAll();
		return this._data.load(`${SERVER_URI}/${rn}`);
	}

	get data() {
		return this._data;
	}
}

export const eventsDescriptionCollection = new EventDescriptionCollection();