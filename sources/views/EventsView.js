import {JetView} from "webix-jet";
import {eventsDescriptionCollection} from "../models/EventDescriptionCollection";
import {eventsDetailsCollection} from "../models/EventsDetailsCollection";
import {eventAttachmentsCollection} from "../models/EventAttachmentsCollection";
import {SERVER_URI} from "../config";
import Utils from "../models/Utils";

export default class EventsView extends JetView {
	config() {
		const thisView = this;
		const css = {"font-weight": "bold"};
		return {
			id: "events",
			view: "datatable",
			url: (view, params) => {
				return webix.ajax()
					.get(SERVER_URI, params)
					.then(response => response.json())
					.then(
						json => json.map(v => ({
							...v,
							REG_DATE: Utils.parseStrDate(v.REG_DATE),
							PLAN_DATE: Utils.parseStrDate(v.PLAN_DATE),
							SROK: Utils.parseStrDate(v.SROK)
						}))
					);
			},
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
					header: [{text: "№ заявки", css}, {content: "textFilter"}],
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
				onBeforeLoad: function () {
					webix.extend(this, webix.ProgressBar);

					this.showProgress();
				},
				onAfterLoad: function () {
					if (this.count()) {
						this.hideProgress();
					} else {
						this.hideProgress();
						this.showOverlay("Нет данных");
					}
				},
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

					thisView.setParam("rn", rn, true);

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

		// _$view.parse(eventsCollection.data);

		/***
		 * 	Need timeout autoUpdate !!!
		 * */
	}

	urlChange(_$view, _$url) {
		super.urlChange(_$view, _$url);


		_$view.waitData.then(() => {
			const rn = this.getParam("rn") || _$view.getFirstId();

			const item = _$view.find(obj => obj.RN === +rn, true);

			if (item) {
				if (_$view.exists(item.id)) {
					_$view.select(item.id);
					_$view.showItem(item.id);
				}
			} else {
				if (_$view.getFirstId()) {
					_$view.select(_$view.getFirstId());
				}
			}

			$$("counter").setValues({data: `Количество записей: ${_$view.data.count()}`});
		});
	}

	// ready(_$view, _$url) {
	// 	super.ready(_$view, _$url);
	//
	// 	_$view.waitData.then(() => {
	// 		if (_$view.getFirstId()) {
	// 			_$view.select(_$view.getFirstId());
	// 		}
	// 	});
	// }

	// urlChange(_$view, _$url) {
	// 	super.urlChange(_$view, _$url);
	//
	// 	eventsCollection.refresh().then(() => {
	// 		const firstID = _$view.getFirstId();
	//
	// 		if (firstID) {
	// 			_$view.select(_$view.getFirstId());
	// 		}
	//
	// 		// _$view.adjustRowHeight("NOTE", false);
	// 		// _$view.refresh();
	//
	// 		$$("counter").setValues({data: `Количество записей: ${_$view.data.count()}`});
	// 	});
	// }
}