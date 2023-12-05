<template>
  <div id="app">
    <h1>Football Match of the Day</h1>
    <div v-if="match">
      <p>{{ match.homeTeam.name }} vs {{ match.awayTeam.name }}</p>
      <p>Date: {{ match.utcDate }}</p>
      <button @click="fetchNewMatch">Get Another Match</button>
    </div>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-else>No matches found.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      match: null,
      loading: true,
    };
  },
  mounted() {
    this.fetchNewMatch();
  },
  methods: {
    async fetchNewMatch() {
      this.loading = true;

      try {
        const response = await fetch(
          "https://api.football-data.org/v2/competitions/PL/matches?season=2022",
          {
            headers: {
              "X-Auth-Token": "313b1ceb88e84c02bd85b622eb6329fb", // Replace with your Football Data API key
            },
          }
        );
        const data = await response.json();

        if (data.matches && data.matches.length > 0) {
          // Assuming the first match in the response
          this.match = data.matches[0];
          console.log("Fetched Football Match:", this.match);
        } else {
          console.warn("No matches found");
        }
      } catch (error) {
        console.error("Error fetching Football Match:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
