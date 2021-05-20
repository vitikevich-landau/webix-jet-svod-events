import {JetView} from "webix-jet";
import DataView from "jet-views/DataView";

export default class TopView extends JetView {
	config() {
		return DataView;
	}

	init(_$view, _$) {
		super.init(_$view, _$);

		/***
		 *  Set Locale
		 * */
		webix.i18n.setLocale("ru-RU");
	}
}