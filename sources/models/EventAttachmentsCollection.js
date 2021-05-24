import {SERVER_URI} from "../config";

class EventAttachmentsCollection {
	constructor() {
		this._data = new webix.DataCollection({
			on: {
				onBeforeLoad: function () {
					webix.extend($$("event_attachments"), webix.ProgressBar);

					$$("event_attachments").showProgress();
				},
				onAfterLoad: function () {
					$$("event_attachments").hideProgress();
				}
			}
		});
	}

	refresh(prn) {
		this._data.clearAll();
		return this._data.load(`${SERVER_URI}/${prn}/attachments`);
	}

	get data() {
		return this._data;
	}
}

export const eventAttachmentsCollection = new EventAttachmentsCollection();