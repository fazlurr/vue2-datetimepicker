import DateTimePicker from "./DateTimePicker/DateTimePicker.vue";

DateTimePicker.install = function(Vue) {
	Vue.component("datetimepicker", DateTimePicker);
};

if (typeof window !== "undefined" && window.Vue) {
	window.Vue.use(DateTimePicker);
}

export default DateTimePicker;
