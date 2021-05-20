import {JetView} from "webix-jet";
import EventsView from "jet-views/EventsView";
import TabbarView from "jet-views/TabbarView";
import ToolbarView from "jet-views/ToolbarView";

export default class DataView extends JetView {
	config() {
		return {
			rows: [
				ToolbarView,
				EventsView,
				{view: "resizer"},
				TabbarView
			]
		};
	}

	init(_$view, _$) {
		super.init(_$view, _$);

		_$view.$view.oncontextmenu = () => false;
	}
}