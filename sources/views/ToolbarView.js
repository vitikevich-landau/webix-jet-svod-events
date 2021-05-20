import {JetView} from "webix-jet";
import RecordCounterView from "jet-views/RecordCounterView";

export default class ToolbarView extends JetView {
	config() {
		return {
			view: "toolbar",
			id: "toolbar",
			// height: 40,
			cols: [
				{template: "Заявки СВОД-СМАРТ", type: "header", borderless: true},
				{},
				RecordCounterView
			]
		};
	}
}