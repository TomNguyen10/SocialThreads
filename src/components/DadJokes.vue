<template>
  <div id="app" class="centered-container">
    <h1>Dad Joke of the Day</h1>
    <div v-if="joke" class="joke-container">
      <p>{{ joke.joke }}</p>
      <button @click="fetchNewJoke">Get Another Joke</button>
    </div>
    <div v-else class="no-joke-container">
      <p v-if="loading">Loading...</p>
      <p v-else>No jokes found.</p>
    </div>
  </div>
</template>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.joke-container,
.no-joke-container {
  text-align: center;
  margin-top: 20px;
}

.joke-container p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.joke-container button {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
}

.joke-container button:hover {
  background-color: #0056b3;
}

.no-joke-container p {
  color: #555;
  font-size: 1.2em;
}
</style>

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
