<template>
  <div class="jokes-container">
    <h2>Chuck Norris Jokes</h2>
    <div v-if="loading" class="loading-text">Loading...</div>
    <div v-if="joke" class="joke-card">
      <p class="joke-text">{{ joke }}</p>
      <button @click="fetchChuckNorrisJoke" class="get-another-button">
        Get Another One
      </button>
    </div>
    <div v-if="error" class="error-text">{{ error }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      joke: null,
      error: null,
    };
  },
  mounted() {
    this.fetchChuckNorrisJoke();
  },
  methods: {
    async fetchChuckNorrisJoke() {
      this.loading = true;

      try {
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/chucknorris",
          {
            headers: {
              "X-Api-Key": "RL0iYC4bnEo2bhHVr3Io7Q==pustejX98lfGGeTc",
            },
          }
        );

        this.joke = response.data.joke;
      } catch (error) {
        this.error =
          "Error: " + (error.response ? error.response.status : error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.jokes-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.joke-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  max-width: 500px;
  text-align: center;
}

.joke-text {
  font-size: 18px;
  margin-bottom: 20px;
}

.loading-text,
.error-text {
  margin-top: 20px;
  font-size: 16px;
  color: #dc3545;
}

.error-text {
  color: #dc3545;
  font-weight: bold;
}

.get-another-button {
  background-color: #007bff;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}

.get-another-button:hover {
  background-color: #0056b3;
}
</style>
