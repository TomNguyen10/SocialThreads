<template>
  <div>
    <h2>On this day in the past</h2>
    <div v-if="events.length > 0">
      <ul>
        <li v-for="(event, index) in events" :key="index">
          {{ event.year }}: {{ event.event }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No historical events found.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
      apiKey: "RL0iYC4bnEo2bhHVr3Io7Q==pustejX98lfGGeTc",
    };
  },
  mounted() {
    this.fetchHistoricalEvents();
  },
  methods: {
    async fetchHistoricalEvents() {
      try {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const response = await fetch(
          `https://api.api-ninjas.com/v1/historicalevents?month=${month}&day=${day}`,
          {
            headers: {
              "X-Api-Key": this.apiKey,
            },
          }
        );

        const data = await response.json();

        if (data && data.length > 0) {
          this.events = data;
          console.log("Fetched historical events:", this.events);
        } else {
          console.warn("No historical events found");
        }
      } catch (error) {
        console.error("Error fetching historical events:", error);
      }
    },
  },
};
</script>

<style>
/* Add any styling as needed */
</style>
