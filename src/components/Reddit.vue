<template>
  <div id="app">
    <div class="search-bar">
      <input v-model="customSubreddit" placeholder="Enter custom subreddit" />
      <button @click="fetchCustomThreads">Search</button>
      <button @click="fetchTopThreads">Top Threads</button>
    </div>

    <h1 v-if="!loading && threads.length > 0">
      Top Threads in r/{{ subreddit }}
    </h1>

    <ul v-if="threads.length > 0">
      <li v-for="thread in threads" :key="thread.id">
        <strong>{{ thread.title }}</strong> by {{ thread.author }} (
        {{ thread.score }} points)
        <p>{{ thread.selftext }}</p>
        <a :href="'https://www.reddit.com' + thread.permalink" target="_blank"
          >Read more</a
        >
        <hr />
      </li>
    </ul>

    <div v-else-if="loading">
      <p>Loading...</p>
    </div>

    <div v-else>
      <p>No threads found</p>
    </div>
  </div>
</template>

<script>
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import db from "./Firebase/init";

export default {
  data() {
    return {
      threads: [],
      subreddit: "programming",
      loading: true,
      customSubreddit: "",
    };
  },
  methods: {
    async fetchRedditThreads(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.data && data.data.children.length > 0) {
          this.threads = data.data.children.map((post) => post.data);
          console.log("Fetched Reddit threads:", this.threads);
        } else {
          console.warn("No threads found");
        }
      } catch (error) {
        console.error("Error fetching Reddit threads:", error);
      } finally {
        this.loading = false;
      }
    },
    async checkSubredditInDatabase(subreddit) {
      const q = query(
        collection(db, "subreddits"),
        where("subreddit", "==", subreddit)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    },
    async addSubredditToDatabase(subreddit) {
      const collectionRef = collection(db, "subreddits");
      const data = {
        subreddit: subreddit,
      };
      await addDoc(collectionRef, data);
    },
    async fetchCustomThreads() {
      const customUrl = `https://www.reddit.com/r/${this.customSubreddit}/top.json?sort=top&t=day&limit=30`;
      const subredditExists = await this.checkSubredditInDatabase(
        this.customSubreddit
      );
      if (!subredditExists) {
        await this.addSubredditToDatabase(this.customSubreddit);
      }
      this.subreddit = this.customSubreddit;
      this.fetchRedditThreads(customUrl);
    },
    fetchTopThreads() {
      this.subreddit = "programming";
      const topThreadsUrl = `https://www.reddit.com/r/${this.subreddit}/top.json?sort=top&t=day&limit=30`;
      this.fetchRedditThreads(topThreadsUrl);
    },
  },
  mounted() {
    const defaultUrl = `https://www.reddit.com/r/${this.subreddit}/top.json?sort=top&t=day&limit=30`;
    this.fetchRedditThreads(defaultUrl);
  },
};
</script>

<style scoped>
/* Add any styling as needed */
.search-bar {
  margin-bottom: 10px;
}

.search-bar button {
  margin-left: 10px;
}
</style>
