import {JetView} from "webix-jet";
import RecordCounterView from "jet-views/RecordCounterView";

export default class ToolbarView extends JetView {
	config() {
		return {
			// width: 1380,
			view: "toolbar",
			id: "toolbar",
			// height: 40,
			cols: [
				{
					width: 200,
					template: "Заявки СВОД-СМАРТ",
					type: "header",
					borderless: true
				},
				{
					width: 660,
					template: "Горячая линия «СВОДЫ» 8(38822) 4-70-61 добавочный 300, 8-913-690-33-47",
					type: "header",
					css: {"font-size": "90%", "font-weight": "bold"},
					borderless: true
				},
				{},
				{
					width: 170,
					template: `<a href='https://forms.parusaltai.ru:8185' target='_blank' style="color: darkred">Задать вопрос</a>`,
					type: "header",
					css: {"text-align": "right", "font-weight": "bold"},
					borderless: true
				},
				RecordCounterView
			]
		};
	}
}