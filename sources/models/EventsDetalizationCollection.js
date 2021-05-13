class EventsDetalizationCollection {
	constructor() {
		this._data = new webix.DataCollection({
			on: {
				onBeforeLoad: function () {
					webix.extend($$("events_detalization"), webix.ProgressBar);
					
					$$("events_detalization").showProgress();
				},
				onAfterLoad: function () {
					$$("events_detalization").hideProgress();
				}
			}
		});
	}
	
	refresh(albumId) {
		this._data.clearAll();
		return this._data.load(`https://jsonplaceholder.typicode.com/posts/${albumId}/comments`);
	}
	
	get data() {
		return this._data;
	}
}

export const eventsDetalizationCollection = new EventsDetalizationCollection();