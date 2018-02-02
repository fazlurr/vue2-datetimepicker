<template>
  <div class="date-picker">
	<header>
		<svg @click="setMonth(-1)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
			<path d="M0 0h24v24H0z" fill="none"/>
		</svg>
		<span>{{currentMonth}}&nbsp;<b>{{value.getFullYear()}}</b></span>
		<svg @click="setMonth(1)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
			<path d="M0 0h24v24H0z" fill="none"/>
		</svg>
	</header>
	<div class="calendar">
		<div class="day" 
			v-for="(day, i) in displayRows"
			:key="`day-${i}`"
			:class="[day.type, day.isToday ? 'today' : '', day.selected ? 'selected' : '']"
			@click="handleSelect(day.date)">
			{{day.text}}
		</div>
	</div>
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
export default {
  name: "DatePicker",
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    value() {
      this.init();
    }
  },
  methods: {
    init() {
      const date = this.value;
      const currentYear = date.getFullYear();
      const currentMonth = date.getMonth();
      const currentDate = date.getDate();
      const currentDay = date.getDay();

      const firstDateOfMonth = getFirstDateOfMonth(date);
      const firstWeekday = firstDateOfMonth.getDay();
      const daysOfMonth = getDaysOfMonth(currentYear, currentMonth + 1);
      const lastDateOfMonth = getLastDateOfMonth(date);
      const mod = (firstWeekday + 7) % 7;

      const displayStartDate = new Date(
        currentYear,
        currentMonth,
        firstDateOfMonth.getDate() - (mod + 7)
      );

      const minTime = firstDateOfMonth.getTime();
      const maxTime = lastDateOfMonth.getTime();

      const rows = initialize2DArray(7, 7);
      const displayRows = rows.map((r, i) => {
        return r.map((c, j) => {
          const index = i * 7 + j;
          const d = nextDate(displayStartDate, index);
          const time = d.getTime();
          const isToday = time === getClearHoursTime(Date.now());
          const selected =
            getClearHoursTime(this.value.getTime()) ===
            getClearHoursTime(d.getTime())
              ? "selected"
              : "";
          return {
            date: d,
            text: d.getDate(),
            selected,
            type:
              time < minTime
                ? "prev-month"
                : time > maxTime ? "next-month" : "current-month",
            isToday
          };
        });
      });

      return deepFlatten(displayRows);
    },
    setMonth(offset) {
      const d = new Date();
      const day = this.value.getDate();
      d.setMonth(this.value.getMonth() + offset, day);
      this.$emit("input", d);
    },
    handleSelect(d) {
      this.$emit("input", d);
    }
  },
  computed: {
    currentMonth() {
      return getMonthName(this.value);
    },
    displayRows() {
      return this.init();
    },
    selectedDate() {
      return new Date(getClearHoursTime(Date.parse(this.value)));
    }
  }
};
</script>
