import {SERVER_URI} from "../config";
import Utils from "./Utils";

class EventsCollection {
	constructor() {
		this._data = new webix.DataCollection({
			on: {
				onBeforeLoad: function () {
					webix.extend($$("events"), webix.ProgressBar);

					$$("events").showProgress();
				},
				onAfterLoad: function () {
					if ($$("events").count()) {
						$$("events").hideProgress();
					} else {
						$$("events").hideProgress();
						$$("events").showOverlay("Нет данных");
					}
				}
			}
		});
	}

	refresh() {
		this._data.clearAll();
		return this._data.load({
			$proxy: true,
			load: (view, params) => {
				return webix.ajax()
					.get(SERVER_URI, params)
					.then(response => response.json())
					.then(
						json => json.map(v => ({
							...v,
							REG_DATE: Utils.parseStrDate(v.REG_DATE),
							SROK: Utils.parseStrDate(v.SROK)
						}))
					);
			}
		});
	}

	get data() {
		return this._data;
	}
}

export const eventsCollection = new EventsCollection();