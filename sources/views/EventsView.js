import {JetView} from "webix-jet";
import {eventsCollection} from "../models/EventsCollection";
import {eventsDescriptionCollection} from "../models/EventDescriptionCollection";
import {eventsDetailsCollection} from "../models/EventsDetailsCollection";
import {eventAttachmentsCollection} from "../models/EventAttachmentsCollection";

export default class EventsView extends JetView {
	config() {
		const css = {"font-weight": "bold"};
		return {
			id: "events",
			view: "datatable",
			columns: [
				{
					id: "ROWNUM",
					header: [{text: "№", css}],
					adjust: "data",
					sort: "int",
					minWidth: 55,

				},
				{
					id: "CATALOG",
					header: [{text: "Каталог", css}],
					adjust: "data",
					minWidth: 100,
					sort: "string",
					hidden: true,
				},
				{
					id: "SDOC_PREFNUMB",
					header: [{text: "Номер заявки", css}, {content: "textFilter"}],
					adjust: "header",
					sort: "string",
				},
				{
					id: "REG_DATE",
					header: [{text: "Дата создания", css}, {content: "dateRangeFilter", mode: "date"}],
					format: webix.Date.dateToStr("%d.%m.%y %H:%i"),
					minWidth: 220,
					sort: "date",
				},
				{
					id: "SEVENT_STAT",
					minWidth: 150,
					header: [{text: "Статус заявки", css}, {content: "selectFilter"}],
					adjust: "header",
					sort: "string",
				},
				{
					id: "PRIORI",
					header: [{text: "Приоритет заявки", css}, {content: "selectFilter"}],
					adjust: "header",
					sort: "int",
				},
				// {id: "SINIT_PERSON", header: ["Инициатор заявки"], adjust: "data"},
				{
					id: "SINIT_PERSON_AGNCODE",
					header: [{text: "Инициатор заявки", css}, {content: "selectFilter"}],
					adjust: "header",
					sort: "string",
					hidden: true
				},
				{
					id: "SOWNER_AGENT",
					header: [{text: "Организация инициатора", css}, {content: "selectFilter"}],
					sort: "string",
					adjust: "header"
				},
				{
					id: "SSEND_PERSON_AGNCODE",
					header: [{text: "Исполнитель", css}, {content: "selectFilter"}],
					adjust: "header",
					sort: "string",
				},
				{
					id: "PLAN_DATE",
					header: [{text: "Начало работ", css}, {content: "dateRangeFilter", mode: "date"}],
					minWidth: 210,
					sort: "date",
					adjust: "header",
					format: webix.i18n.dateFormatStr,
				},
				{
					id: "SROK",
					header: [{text: "Срок исполнения", css}, {content: "dateRangeFilter", mode: "date"}],
					minWidth: 210,
					sort: "date",
					adjust: "header",
					format: webix.i18n.dateFormatStr,
				},
				{
					id: "EVENT_DESCR",
					header: [{text: "Описание", css}, {content: "textFilter"}],
					minWidth: 280,
					fillspace: true
				},
			],
			resizeColumn: {headerOnly: true, size: 12},
			dragColumn: "order",
			headermenu: {
				autoheight: true,
				autowidth: true,
			},
			// autoConfig: true,
			select: true,
			fixedRowHeight: false,
			on: {
				onAfterFilter: function () {
					const firstID = this.getFirstId();

					if (firstID) {
						this.select(this.getFirstId());
					} else {
						eventsDescriptionCollection.refresh(0);
						eventsDetailsCollection.refresh(0)
							.then(() => {
								$$("events_details").adjustRowHeight("NOTE", false);
							});
					}

					$$("counter").setValues({data: `Количество записей: ${this.data.count()}`});
				},
				onAfterSelect: function (obj, preserve) {
					const rn = this.getItem(obj.row).RN;
					eventsDescriptionCollection.refresh(rn);
					eventsDetailsCollection.refresh(rn)
						.then(() => {
							$$("events_details").adjustRowHeight("NOTE", false);
						});
					eventAttachmentsCollection.refresh(rn);
				},
				onresize: function () {
					// this.adjustRowHeight("EVENT_DESCR", true);
					// this.adjustRowHeight("body", true);
				}
			}
		};
	}

	init(_$view, _$) {
		super.init(_$view, _$);

		_$view.parse(eventsCollection.data);

		/***
		 * 	Need timeout autoUpdate !!!
		 * */
	}

	urlChange(_$view, _$url) {
		super.urlChange(_$view, _$url);

		eventsCollection.refresh().then(() => {
			const firstID = _$view.getFirstId();

			if (firstID) {
				_$view.select(_$view.getFirstId());
			}

			// _$view.adjustRowHeight("NOTE", false);
			// _$view.refresh();

			$$("counter").setValues({data: `Количество записей: ${_$view.data.count()}`});
		});
	}
}