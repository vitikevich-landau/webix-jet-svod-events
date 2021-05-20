export default class Utils {
	static parseStrDate(str) {
		if (str) {
			const [date, time] = str.split("T");
			const [year, month, day] = date.split("-");
			const [hours, minutes] = time.split(":");

			return new Date(Date.UTC(year, month - 1, day, hours, minutes));
		}

		return null;

	}
}
