class EventsCollection {
	constructor() {
		this._data = new webix.DataCollection({
			on: {
				onBeforeLoad: function () {
					webix.extend($$("events"), webix.ProgressBar);
					
					$$("events").showProgress();
				},
				onAfterLoad: function () {
					$$("events").hideProgress();
				}
			}
		});
	}
	
	refresh() {
		this._data.clearAll();
		return this._data.load("https://jsonplaceholder.typicode.com/posts");
	}
	
	get data() {
		return this._data;
	}
}

export const eventsCollection = new EventsCollection();