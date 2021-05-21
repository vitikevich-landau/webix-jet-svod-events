import {JetView} from "webix-jet";

export default class RecordCounterView extends JetView {
	config() {
		return {
			view: "template",
			id: "counter",
			type: "header",
			template: obj => obj.data || "",
			borderless: true,
			css: {
				"font-size": "75%",
				"text-align": "right"
			},
		};
	}
}