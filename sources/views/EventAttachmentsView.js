import {JetView} from "webix-jet";
import {eventAttachmentsCollection} from "../models/EventAttachmentsCollection";
import {SERVER_URI} from "../config";

export default class EventAttachmentsView extends JetView {
	config() {
		const css = {"font-weight": "bold"};
		return {
			id: "event_attachments",
			view: "datatable",
			// autoConfig: true
			columns: [
				{
					id: "ROWNUM",
					header: [{text: "№", css}],
					adjust: "data",
					minWidth: 55,
				},
				{
					id: "DATE_REG",
					header: [{text: "Дата изменения", css}],
					adjust: "header",
					template: obj =>
						webix.Date.dateToStr("%d.%m.%Y")(new Date(obj.DATE_REG))
				},
				{
					id: "FILE_PATH",
					header: [{text: "Имя файла", css}],
					adjust: "data",
					template: obj => `<a href="${SERVER_URI}${obj.FILE_LINK}">${obj.FILE_PATH}</a>`
				},
				{
					id: "NOTE",
					header: [{text: "Примечание", css}],
					minWidth: 200,
					fillspace: true
				},
			],
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

		_$view.parse(eventAttachmentsCollection.data)
	}
}