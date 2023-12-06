<template>
  <div class="centered-container">
    <h2>On this day in the past</h2>
    <div v-if="events.length > 0">
      <ul class="events-list">
        <li v-for="(event, index) in events" :key="index" class="event-item">
          {{ event.year }} : {{ event.event }}
        </li>
      </ul>
    </div>
    <div v-else class="no-events">
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

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.events-list {
  list-style-type: none;
  padding: 0;
}

.event-item {
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
}

.event-year {
  color: #007bff;
}

.event-text {
  color: #333;
}

.no-events {
  text-align: center;
  margin-top: 20px;
}
</style>
