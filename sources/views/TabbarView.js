import {JetView} from "webix-jet";
import EventDetailsView from "jet-views/EventDetailsView";
import EventDescriptionView from "jet-views/EventDescriptionView";
import EventAttachmentsView from "jet-views/EventAttachmentsView";

export default class TabbarView extends JetView {
	config() {
		return {
			gravity: .7,
			rows: [
				{
					view: "tabbar",
					id: "tabbar",
					multiview: true,
					// optionWidth: 280,
					optionWidth: "auto",
					options: [
						{
							value: "<span class='webix_icon wxi-pencil'></span><span class='padding-right-10'>История изменений</span>",
							id: "events_details",
						},
						{
							value: "<span class='webix_icon wxi-file'></span><span class='padding-right-10'>Прикреплённые документы</span>",
							id: "event_attachments"
						},
						{
							value: "<span></span><span class='padding-left-right-10'>Описание</span>",
							id: "event_description"
						}
					]
				},
				{
					animate: {
						type: "slide",
						// direction:"top",
						duration: 250
					},
					cells: [
						EventDetailsView,
						EventAttachmentsView,
						EventDescriptionView,
					]
				}
			]
		};
	}
}