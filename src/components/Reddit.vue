<template>
  <div>
    <div class="container">
      <div class="search-bar">
        <input v-model="customSubreddit" placeholder="Enter custom subreddit" />
        <button @click="fetchCustomThreads">Search</button>
        <button @click="fetchTopThreads">Top Threads</button>
        <div class="subreddit-list">
          <h3>Subreddits:</h3>
          <ul>
            <li
              v-for="subreddit in subreddits"
              :key="subreddit"
              @click="fetchThreadsBySubreddit(subreddit)">
              {{ subreddit }}
            </li>
          </ul>
        </div>
      </div>

      <div class="main-content">
        <h1 v-if="!loading && threads.length > 0">
          Top Threads in r/{{ subreddit }}
        </h1>

        <ul v-if="threads.length > 0">
          <li v-for="thread in threads" :key="thread.id">
            <strong>{{ thread.title }}</strong> by {{ thread.author }} (
            {{ thread.score }} points)
            <p>{{ thread.selftext }}</p>
            <a
              :href="'https://www.reddit.com' + thread.permalink"
              target="_blank"
              >Read more</a
            >
            <button @click="addToReadLater(thread)">Read Later</button>
          </li>
        </ul>

        <div v-else-if="loading">
          <p>Loading...</p>
        </div>

        <div v-else>
          <p>No threads found</p>
        </div>
      </div>

      <div class="read-later-section">
        <h3>Read Later</h3>
        <ul>
          <li v-for="(item, index) in readLaterItems" :key="index">
            <strong>{{ item.title }}</strong> - {{ item.author }} -
            <a :href="'https://www.reddit.com' + item.permalink" target="_blank"
              >Link</a
            >
            <button @click="removeFromReadLater(index)">Remove</button>
          </li>
        </ul>
        <button @click="clearReadLater">Clear All</button>
      </div>
    </div>
  </div>
</template>

<script>
import { addDoc, collection, getDocs } from "firebase/firestore";
import db from "./Firebase/init";
import { useReadLaterStore } from "../stores/readLater";

export default {
  data() {
    return {
      threads: [],
      subreddit: "all",
      loading: true,
      customSubreddit: "",
      subreddits: [],
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
      const q = collection(db, "subreddits");
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.some(
        (doc) => doc.data().subreddit === subreddit
      );
    },
    async addSubredditToDatabase(subreddit) {
      const collectionRef = collection(db, "subreddits");
      const data = {
        subreddit: subreddit,
      };
      await addDoc(collectionRef, data);
    },
    async fetchSubredditsFromDatabase() {
      const q = collection(db, "subreddits");
      const querySnapshot = await getDocs(q);
      this.subreddits = querySnapshot.docs.map((doc) => doc.data().subreddit);
    },
    async fetchCustomThreads() {
      const customUrl = `https://www.reddit.com/r/${this.customSubreddit}/top.json?sort=top&t=day&limit=30`;
      const subredditExists = await this.checkSubredditInDatabase(
        this.customSubreddit
      );
      if (!subredditExists) {
        await this.addSubredditToDatabase(this.customSubreddit);
        this.subreddits.unshift(this.customSubreddit);
      }
      this.subreddit = this.customSubreddit;
      this.fetchRedditThreads(customUrl);
    },
    fetchTopThreads() {
      this.subreddit = "all";
      const topThreadsUrl = `https://www.reddit.com/r/${this.subreddit}/top.json?sort=top&t=day&limit=30`;
      this.fetchRedditThreads(topThreadsUrl);
    },
    addToReadLater(item) {
      const readLaterStore = useReadLaterStore();
      readLaterStore.addItem(item);
    },
    removeFromReadLater(index) {
      const readLaterStore = useReadLaterStore();
      readLaterStore.removeItem(index);
    },
    clearReadLater() {
      const readLaterStore = useReadLaterStore();
      readLaterStore.clearItems();
    },
    async fetchThreadsBySubreddit(subreddit) {
      const subredditUrl = `https://www.reddit.com/r/${subreddit}/top.json?sort=top&t=day&limit=30`;
      this.subreddit = subreddit;
      this.fetchRedditThreads(subredditUrl);
    },
  },
  computed: {
    readLaterItems() {
      const readLaterStore = useReadLaterStore();
      return readLaterStore.items;
    },
  },
  mounted() {
    this.fetchSubredditsFromDatabase();

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

.container {
  display: flex;
  justify-content: space-between;
}

.main-content {
  flex: 2; /* Adjust as needed */
}

.read-later-section {
  flex: 1; /* Adjust as needed */
}

.subreddit-list {
  margin-bottom: 10px;
}

.subreddit-list ul {
  list-style-type: none;
  padding: 0;
}

.subreddit-list li {
  cursor: pointer;
  margin-bottom: 5px;
  color: blue; /* Add styling as needed */
}

.subreddit-list li:hover {
  text-decoration: underline;
}
</style>
