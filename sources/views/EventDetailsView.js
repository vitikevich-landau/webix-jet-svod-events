import {JetView} from "webix-jet";
import {eventsDetailsCollection} from "../models/EventsDetailsCollection";

export default class EventDetailsView extends JetView {
	config() {
		const css = {"font-weight": "bold"};
		return {
			id: "events_details",
			view: "datatable",
			columns: [
				{
					id: "ROWNUM",
					header: [{text: "№", css}],
					adjust: "data",
					minWidth: 55,
				},
				{
					id: "CHANGE_DATE",
					header: [{text: "Дата изменения", css}],
					adjust: "data",
					template: obj =>
						webix.Date.dateToStr("%d.%m.%y %H:%i")(new Date(obj.CHANGE_DATE))
				},
				{
					id: "SAUTHNAME",
					header: [{text: "Автор изменения", css}],
					adjust: "header"
				},
				{
					id: "SEVENT_STAT",
					header: [{text: "Статус", css}],
					adjust: "data"
				},
				{
					id: "ACTION_NAME",
					header: [{text: "Действие", css}],
					adjust: "data"
				},
				{
					id: "SSEND",
					header: [{text: "Исполнитель (направить)", css}],
					adjust: "data"
				},
				{
					id: "NOTE",
					header: [{text: "Примечание", css}],
					minWidth: 200,
					fillspace: true
				},
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