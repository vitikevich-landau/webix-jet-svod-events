import {JetView} from "webix-jet";
import EventsView from "jet-views/EventsView";
import EventsDetalizationView from "jet-views/EventsDetalizationView";

export default class DataView extends JetView {
	config() {
		return {
			rows: [
				EventsView,
				{view: "resizer"},
				{
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
									value: "<span class='webix_icon wxi-pencil'></span><span style='padding: 0 10px 0 0'>История изменений</span>",
									id: "events_detalization",
								},
								{
									value: "<span class='webix_icon wxi-file'></span><span style='padding: 0 10px 0 0'>Прикреплённые документы</span>",
									id: "t2"
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
								EventsDetalizationView,
								{template: "Прикреплённые докумены...", id: "t2"}
							]
						}
					]
				}
			]
		};
	}

}