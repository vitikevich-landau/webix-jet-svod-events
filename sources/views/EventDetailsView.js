import {JetView} from "webix-jet";
import {eventsDetailsCollection} from "../models/EventsDetailsCollection";

export default class EventDetailsView extends JetView {
	config() {
		return {
			id: "events_details",
			view: "datatable",
			columns: [
				{id: "ROWNUM", header: ["№"], adjust: "data"},
				{
					id: "CHANGE_DATE",
					header: ["Дата изменения"],
					adjust: "data",
					template: obj =>
						webix.Date.dateToStr("%d.%m.%Y")(new Date(obj.CHANGE_DATE))
				},
				{id: "SAUTHNAME", header: ["Автор изменения"], adjust: "header"},
				{id: "SEVENT_STAT", header: ["Статус"], adjust: "data"},
				{id: "ACTION_NAME", header: ["Действие"], adjust: "data"},
				{id: "SSEND", header: ["Исполнитель (направить)"], adjust: "data"},
				{id: "NOTE", header: ["Примечание"], minWidth: 200, fillspace: true },
			],
			headermenu: {
				autoheight: true,
				autowidth: true,
			},
			// autoConfig: true,
			fixedRowHeight: false,
			select: true,
			on: {
				onresize: function () {
					/***
					 * 	if true, infinity loop
					 * */
					// this.adjustRowHeight("name", true);
					this.adjustRowHeight("NOTE", true);
				}
			}
		};
	}

	init(_$view, _$) {
		super.init(_$view, _$);

		_$view.parse(eventsDetailsCollection.data);
	}
}