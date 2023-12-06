<template>
  <div>
    <div class="search-bar">
      <input v-model="customTopic" placeholder="Enter custom topic" />
      <button @click="fetchCustomNews">Search</button>
      <button @click="fetchTopHeadlines">Top Headlines</button>
    </div>

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
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "./Firebase/init.js";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      loading: false,
      news: null,
      error: null,
      customTopic: "",
    };
  },
  methods: {
    async fetchNews(url) {
      this.loading = true;
      try {
        const response = await axios.get(url);
        this.news = response.data;
      } catch (error) {
        this.error = error.response ? error.response.data : error.message;
      } finally {
        this.loading = false;
      }
    },
    async checkTopicInDatabase(topic) {
      const q = query(collection(db, "news"), where("topic", "==", topic));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    },
    async addTopicToDatabase(topic) {
      const collectionRef = collection(db, "news");
      const data = {
        topic: topic,
      };
      await addDoc(collectionRef, data);
    },
    async fetchCustomNews() {
      const customUrl = `https://newsapi.org/v2/everything?q=${this.customTopic}&apiKey=5aaf4b9ba62b4df4844ee5819cab7c9f`;
      const topicExists = await this.checkTopicInDatabase(this.customTopic);
      if (!topicExists) {
        await this.addTopicToDatabase(this.customTopic);
      }
      this.fetchNews(customUrl);
    },
    fetchTopHeadlines() {
      const topHeadlinesUrl =
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=5aaf4b9ba62b4df4844ee5819cab7c9f";
      this.fetchNews(topHeadlinesUrl);
    },
    openArticle(url) {
      window.open(url, "_blank");
    },
  },
  mounted() {
    const defaultUrl =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=5aaf4b9ba62b4df4844ee5819cab7c9f";
    this.fetchNews(defaultUrl);
  },
};
</script>

<style scoped>
.news-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.search-bar {
  margin-bottom: 10px;
}

.search-bar button {
  margin-left: 10px;
}
</style>
