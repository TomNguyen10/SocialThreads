<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="news">
      <div v-for="article in news.articles" :key="article.url" class="news-box">
        <h3>{{ article.title }}</h3>
        <p><strong>Description:</strong> {{ article.description }}</p>
        <p><strong>Author:</strong> {{ article.author }}</p>
        <p><strong>Published At:</strong> {{ article.publishedAt }}</p>

        <button @click="openArticle(article.url)">Read more</button>
      </div>
    </div>
    <div v-if="error">
      <!-- Display error message here -->
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      news: null,
      error: null,
    };
  },
  mounted() {
    this.fetchNews(); // Automatically fetch news when the component is mounted
  },
  methods: {
    async fetchNews() {
      this.loading = true;
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              country: "us", // You can adjust the country parameter based on your preference
              apiKey: "5aaf4b9ba62b4df4844ee5819cab7c9f",
            },
          }
        );

        this.news = response.data;
      } catch (error) {
        this.error = error.response ? error.response.data : error.message;
      } finally {
        this.loading = false;
      }
    },
    openArticle(url) {
      window.open(url, "_blank"); // Open the article in a new tab
    },
  },
};
</script>

<style scoped>
.news-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
