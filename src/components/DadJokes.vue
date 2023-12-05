<template>
  <div id="app">
    <h1>Dad Joke of the Day</h1>
    <div v-if="joke">
      <p>{{ joke.joke }}</p>
      <button @click="fetchNewJoke">Get Another Joke</button>
    </div>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-else>No jokes found.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      joke: null,
      loading: true,
    };
  },
  mounted() {
    this.fetchNewJoke();
  },
  methods: {
    async fetchNewJoke() {
      this.loading = true;

      try {
        const response = await fetch("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();

        if (data.joke) {
          this.joke = { id: data.id, joke: data.joke };
          console.log("Fetched Dad Joke:", this.joke);
        } else {
          console.warn("No joke found");
        }
      } catch (error) {
        console.error("Error fetching Dad Joke:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
