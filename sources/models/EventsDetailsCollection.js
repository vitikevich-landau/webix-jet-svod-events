class EventsDetailsCollection {
	constructor() {
		this._data = new webix.DataCollection({
			on: {
				onBeforeLoad: function () {
					webix.extend($$("events_details"), webix.ProgressBar);
					
					$$("events_details").showProgress();
				},
				onAfterLoad: function () {
					$$("events_details").hideProgress();
				}
			}
		});
	}
	
	refresh(rn) {
		this._data.clearAll();
		return this._data.load(`http://localhost:3000/api/clnevents/${rn}/details`);
	}
	
	get data() {
		return this._data;
	}
}

export const eventsDetailsCollection = new EventsDetailsCollection();