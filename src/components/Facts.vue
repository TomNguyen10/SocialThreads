<template>
  <div>
    <h2>Facts</h2>
    <ul v-if="facts.length > 0">
      <li v-for="(fact, index) in facts" :key="index" style="color: black">
        {{ fact.fact }}
      </li>
    </ul>
    <div v-else>
      <p>No facts available.</p>
    </div>

    <button @click="getMoreFacts">Get More Facts</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      facts: [],
      limit: 3,
      apiKey: "RL0iYC4bnEo2bhHVr3Io7Q==pustejX98lfGGeTc",
    };
  },
  mounted() {
    this.fetchFacts();
  },
  methods: {
    async fetchFacts() {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/facts?limit=${this.limit}`,
          {
            headers: {
              "X-Api-Key": this.apiKey,
            },
          }
        );

        const data = await response.json();

        if (data && data.length > 0) {
          this.facts = data;
          console.log("Fetched facts:", this.facts);
        } else {
          console.warn("No facts found");
        }
      } catch (error) {
        console.error("Error fetching facts:", error);
      }
    },

    async getMoreFacts() {
      await this.fetchFacts();
    },
  },
};
</script>

<style>
/* Add any styling as needed */
</style>
