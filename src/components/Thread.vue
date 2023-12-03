<template>
  <div>
    <button @click="fetchNews">Click</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    async fetchNews() {
      try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: "Apple",
            apiKey: "5aaf4b9ba62b4df4844ee5819cab7c9f",
          },
        });

        console.log("News API Response:", response.data);
      } catch (error) {
        console.error(
          "Error fetching news:",
          error.response ? error.response.data : error.message
        );
      }
    },
  },
};
</script>
