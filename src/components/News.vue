<template>
  <div>
    <div class="container">
      <div class="search-bar">
        <input v-model="customTopic" placeholder="Enter custom topic" />
        <button @click="fetchCustomNews">Search</button>
        <button @click="fetchTopHeadlines">Top Headlines</button>
        <div class="topic-list">
          <h3>Topics:</h3>
          <ul>
            <li
              v-for="topic in topics"
              :key="topic"
              @click="fetchNewsByTopic(topic)">
              {{ topic }}
            </li>
          </ul>
        </div>
      </div>

      <div class="main-content">
        <div v-if="loading">Loading...</div>
        <div v-if="news">
          <div
            v-for="article in news.articles"
            :key="article.url"
            class="news-box">
            <h3>{{ article.title }}</h3>
            <p><strong>Description:</strong> {{ article.description }}</p>
            <p><strong>Author:</strong> {{ article.author }}</p>
            <p><strong>Published At:</strong> {{ article.publishedAt }}</p>
            <button @click="openArticle(article.url)">Read more</button>
            <button @click="addToReadLater(article)">Read Later</button>
          </div>
        </div>
        <div v-if="error">{{ error }}</div>
      </div>

      <div class="read-later-section">
        <h3>Read Later</h3>
        <ul>
          <li v-for="(item, index) in readLaterItems" :key="index">
            <strong>{{ item.title }}</strong> - {{ item.author }} -
            <a :href="item.url" target="_blank">Link</a>
            <button @click="removeFromReadLater(index)">Remove</button>
          </li>
        </ul>
        <button @click="clearReadLater">Clear All</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "./Firebase/init.js";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useReadLaterStore } from "../stores/readLater";

export default {
  data() {
    return {
      loading: false,
      news: null,
      error: null,
      customTopic: "",
      topics: [],
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
      const q = collection(db, "news");
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.some((doc) => doc.data().topic === topic);
    },
    async addTopicToDatabase(topic) {
      const collectionRef = collection(db, "news");
      const data = {
        topic: topic,
      };
      await addDoc(collectionRef, data);
    },
    async fetchTopicsFromDatabase() {
      const q = collection(db, "news");
      const querySnapshot = await getDocs(q);
      this.topics = querySnapshot.docs.map((doc) => doc.data().topic);
    },
    async fetchCustomNews() {
      const customUrl = `https://newsapi.org/v2/everything?q=${this.customTopic}&apiKey=5aaf4b9ba62b4df4844ee5819cab7c9f`;
      const topicExists = await this.checkTopicInDatabase(this.customTopic);
      if (!topicExists) {
        await this.addTopicToDatabase(this.customTopic);
        this.topics.push(this.customTopic);
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
    addToReadLater(article) {
      const readLaterStore = useReadLaterStore();
      readLaterStore.addItem(article);
    },
    removeFromReadLater(index) {
      const readLaterStore = useReadLaterStore();
      readLaterStore.removeItem(index);
    },
    clearReadLater() {
      const readLaterStore = useReadLaterStore();
      readLaterStore.clearItems();
    },
    async fetchNewsByTopic(topic) {
      const customUrl = `https://newsapi.org/v2/everything?q=${topic}&apiKey=5aaf4b9ba62b4df4844ee5819cab7c9f`;
      this.fetchNews(customUrl);
    },
  },
  computed: {
    readLaterItems() {
      const readLaterStore = useReadLaterStore();
      return readLaterStore.items;
    },
  },
  mounted() {
    this.fetchTopicsFromDatabase();

    const defaultUrl =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=5aaf4b9ba62b4df4844ee5819cab7c9f";
    this.fetchNews(defaultUrl);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.main-content {
  flex: 2;
}

.read-later-section {
  flex: 1;
}

.topic-list {
  margin-bottom: 10px;
}

.topic-list ul {
  list-style-type: none;
  padding: 0;
}

.topic-list li {
  cursor: pointer;
  margin-bottom: 5px;
  color: blue; /* Add styling as needed */
}

.topic-list li:hover {
  text-decoration: underline;
}
</style>
