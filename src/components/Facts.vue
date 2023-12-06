<template>
  <div class="centered-container">
    <h2>Facts</h2>
    <ul v-if="facts.length > 0" class="facts-list">
      <li v-for="(fact, index) in facts" :key="index" class="fact-item">
        {{ fact.fact }}
      </li>
    </ul>
    <div v-else class="no-facts">
      <p>No facts available.</p>
    </div>

    <button @click="getMoreFacts" class="more-facts-button">
      Get More Facts
    </button>
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

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.facts-list {
  list-style-type: none;
  padding: 0;
}

.fact-item {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.no-facts {
  text-align: center;
  margin-top: 20px;
}

.more-facts-button {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
}

.more-facts-button:hover {
  background-color: #0056b3;
}
</style>
