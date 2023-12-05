<template>
  <div id="anime-app">
    <h1>Anime of the Day</h1>
    <div v-if="anime">
      <h2>{{ anime.title }}</h2>
      <p>{{ anime.synopsis }}</p>
      <p>Episodes: {{ anime.episodes }}</p>
      <p>Score: {{ anime.score }}</p>
      <button @click="fetchNewAnime">Get Another Anime</button>
    </div>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-else>No anime found.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anime: null,
      loading: true,
      animeId: 1,
    };
  },
  mounted() {
    this.fetchNewAnime();
  },
  methods: {
    async fetchNewAnime() {
      this.loading = true;

      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${this.animeId}/full`
        );
        const data = await response.json();

        if (data) {
          this.anime = data;
          console.log("Fetched Anime:", this.anime);
        } else {
          console.warn("No anime found");
        }
      } catch (error) {
        console.error("Error fetching Anime:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
