<template>
	<div class="date-time-picker">
		<DateTime :date="value" @update="editing = !editing" :editing="editing"></DateTime>
		<transition name="slide">
			<div class="inputs" v-if="editing">
				<DatePicker :value="currentDate" @input="d => updateDate(d)">
				</DatePicker>
				<TimePicker :value="currentDate" @input="d => updateTime(d)">
				</TimePicker>
			</div>
		</transition>
	</div>
</template>
<script>
import {
  getDayName,
  getMonthName,
  formatDate,
  formatTime,
  getDaysOfMonth,
  isLeapYear,
  getFirstDateOfMonth,
  getLastDateOfMonth,
  nextMonth,
  nextDate,
  getClearHoursTime,
  chunk,
  initialize2DArray,
  initializeArrayWithRange,
  deepFlatten,
  hours,
  minutes
} from "./utils";

import DateTime from "./DateTime";
import TimePicker from "./TimePicker";
import DatePicker from "./DatePicker";

export default {
  name: "DateTimePicker",
  components: {
    DateTime,
    DatePicker,
    TimePicker
  },
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      editing: false,
      currentDate: new Date(),
      hours,
      minutes
    };
  },
  methods: {
    updateDate(d) {
      const hours = this.currentDate.getHours();
      const minutes = this.currentDate.getMinutes();
      d.setHours(hours, minutes);
      this.currentDate = d;
      this.$emit("input", d);
    },
    updateTime(d) {
      this.currentDate = d;
      this.$emit("input", d);
    }
  },
  created() {
    this.handleOutClick = window.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.editing = false;
      }
    });
  },
  destroyed() {
    window.removeEventListener("click", this.handleOutClick);
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Titillium+Web");

/* 
 *
 * DATE TIME PICKER
 *
 */

.date-time-picker {
  font-family: "Titillium Web";
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.inputs {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: auto;
  z-index: 1000;
  background-color: #f4f4f4;
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.125);
  display: flex;
  flex-direction: column;
  height: auto;
  margin-top: -1px;
  border-left: 1px solid #ced4da;
  border-right: 1px solid #ced4da;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

/* 
 *
 * DATE TIME
 *
 */

.date-time {
  display: flex;
}

.date-time.open * {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.input-group > .form-control {
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  margin-bottom: 0;
}

.form-control {
  padding: 0.375rem 0.75rem;
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

svg,
.form-control {
  cursor: pointer;
  fill: #252525;
}

.input-group-append {
  display: flex;
  margin-left: -1px;
}

.input-group-text {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: center;
  white-space: nowrap;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.input-group-append > .input-group-text {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* 
 *
 * DATE PICKER
 *
 */

.date-picker {
  border-radius: 0;
  border: none;
}

.date-picker header {
  padding: 0.375rem 0.75rem;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ced4da;
  border-bottom: 1px solid #ced4da;
  user-select: none;
}

.date-picker header svg {
  cursor: pointer;
}

.date-picker header span {
  height: 1.5rem;
  font-size: 1.25rem;
  line-height: 1.5rem;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  background-color: #fff;
}

.day {
  user-select: none;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 1px #ced4da;
  cursor: pointer;
  color: #000;
}

.day.prev-month,
.day.next-month {
  color: #888;
}

.day.today {
  background-color: rgba(244, 67, 54, 0.603);
  color: #fff;
}

.date-picker .day.selected {
  background-color: #1e88e5;
  color: #fff;
  border: none;
  border-radius: 0;
}

/*
 *
 * TIME PICKER
 *
 */

.time-picker {
  display: flex;
  align-items: stretch;
}

/*
 *
 * SELECT
 *
 */

.select {
  position: relative;
  margin-bottom: -1px;
  flex: 1;
}

.select + .select {
  margin-left: -1px;
}

.select:first-child {
  margin-left: -1px;
}

.select:last-child {
  margin-right: -1px;
}

.select:first-child .selected {
  border-top-left-radius: 0;
}

.select:last-child .selected {
  border-top-right-radius: 0;
}

.select:not(:last-child) .selected {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.select:not(:first-child) .selected {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.select .selected {
  cursor: pointer;
  user-select: none;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-top: 1px solid #ced4da;
  border-radius: 0.25rem;
  color: #495057;
  text-align: inherit;
  padding: 0.25rem 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  position: relative;
  transition: 0.2s cubic-bezier(1, -0.115, 0.975, 0.855);
}

.selected span {
  flex: 1;
}

.selected svg {
  transition: 0.2s cubic-bezier(1, -0.115, 0.975, 0.855);
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
}

.selected svg.open {
  transform: rotate(180deg);
}

.selected.open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.option {
  color: #333;
  background-color: #f0f0f0;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 250px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  z-index: 1000;
}

.option {
  cursor: pointer;
  border-radius: 0;
  color: #495057;
  text-align: inherit;
  position: relative;
  display: block;
  padding: 0.5rem 1rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.option:first-child {
  border-top: none;
}

.option:last-child {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.option:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

.option.selected,
.option:hover {
  background-color: #aaa;
}

.option:hover,
.option:focus {
  color: #495057;
  text-decoration: none;
  background-color: #f8f9fa;
}

.option:active {
  color: #212529;
  background-color: #e9ecef;
}

.option.active {
  z-index: 2;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

/*
   * SCROLLBAR
   */

.scrollbar::-webkit-scrollbar-track {
  background-color: transparent;
}

.scrollbar::-webkit-scrollbar {
  width: 0rem;
  background-color: transparent;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #17a2b8;
}
</style>
