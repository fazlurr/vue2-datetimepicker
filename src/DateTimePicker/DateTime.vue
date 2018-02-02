<template>
  <div class="date-time input-group" 
    @click="$emit('update')" :class="editing ? 'open' : 'closed'">
	  <div class="form-control">
      {{displayDateTime.date}}, {{displayDateTime.time}}
    </div>
    <div class="input-group-append">
      <div class="input-group-text">
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate, formatTime } from "./utils";

export default {
  name: "DateTime",
  props: {
    date: {
      type: Date,
      default: () => new Date()
    },
    editing: {
      type: Boolean
    }
  },
  computed: {
    displayDateTime() {
      const date = this.date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
      });
      const time = this.date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });
      return {
        date,
        time
      };
    }
  }
};
</script>
