<template>
  <div class="time-picker">
          <Select 
            :value="hour12Format" 
            @input="val => updateHours(val)" 
            :options="hours">
            </Select>
          <Select 
            :value="minute" 
            @input="val => updateValue('minute',val)" :options="minutes">
          </Select>
          <Select  
            v-model="ampm"
            :options="['AM', 'PM']">
          </Select>
</div>
</template>
<script>
import Select from "./Select.vue";
import { hours, minutes, getClearHoursTime } from "./utils";

export default {
	name: "TimePicker",
	components: {
		Select
	},
	props: {
		value: {
			default: new Date()
		}
	},
	data() {
		const minute = Math.round(this.value.getMinutes() / 5) * 5;
		return {
			hour: this.value.getHours(),
			minute,
			ampm: this.value.getHours() > 12 ? "PM" : "AM",
			hours,
			minutes
		};
	},
	watch: {
		ampm(val) {
			this.updateHours(this.hour);
		}
	},
	methods: {
		updateHours(hour) {
			if (this.ampm === "PM") {
				this.hour = hour < 12 ? hour + 12 : hour;
			}

			if (this.ampm === "AM") {
				this.hour = hour >= 12 ? hour - 12 : hour;
			}
			this.updateValue("hour", this.hour);
		},
		updateValue(key, value) {
			this[key] = value;
			const d = new Date(this.value.getTime());
			d.setHours(this.hour, this.minute);
			this.$emit("input", d);
		}
	},
	computed: {
		hour12Format() {
			return this.hour > 12 ? this.hour - 12 : this.hour ? this.hour : 12;
		},
		internalAMPM() {
			return this.hour > 12 ? "PM" : "AM";
		}
	}
};
</script>
