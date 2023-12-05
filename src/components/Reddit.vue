<template>
  <div id="app">
    <h1>Top Threads in r/programming</h1>
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
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      threads: [],
      subreddit: "programming",
      loading: true,
    };
  },
  mounted() {
    this.fetchRedditThreads();
  },
  methods: {
    async fetchRedditThreads() {
      try {
        const response = await fetch(
          `https://www.reddit.com/r/${this.subreddit}/top.json?sort=top&t=day&limit=30`
        );
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
  },
};
</script>
