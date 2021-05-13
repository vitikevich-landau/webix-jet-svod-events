import {JetView} from "webix-jet";
import DataView from "jet-views/DataView";

export default class TopView extends JetView {
	config() {
		return DataView;
	}
}