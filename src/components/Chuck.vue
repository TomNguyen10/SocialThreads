<template>
  <div>
    <h2>Chuck Norris Jokes</h2>
    <div v-if="loading">Loading...</div>
    <div v-if="joke">{{ joke }}</div>
    <div v-if="error">{{ error }}</div>
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

<style scoped></style>
