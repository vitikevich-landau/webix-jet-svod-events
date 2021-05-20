import {JetView} from "webix-jet";

export default class RecordCounterView extends JetView {
	config() {
		return {
			view: "template",
			id: "counter",
			type: "header",
			template: "#data#",
			borderless: true,
			css: {
				"font-size": "75%",
				"text-align": "right"
			},
		};
	}
}