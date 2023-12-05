<template>
  <div id="trivia-app">
    <h1>Trivia Question of the Day</h1>
    <div v-if="question">
      <p>{{ question.question }}</p>
      <ul>
        <li v-for="(option, index) in question.options" :key="index">
          {{ option }}
        </li>
      </ul>
      <button @click="fetchNewQuestion">Get Another Question</button>
    </div>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-else>No question found.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: null,
      loading: true,
    };
  },
  mounted() {
    this.fetchNewQuestion();
  },
  methods: {
    async fetchNewQuestion() {
      this.loading = true;

      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=1&type=multiple"
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          // Assuming the first question in the response
          this.question = {
            question: data.results[0].question,
            options: [
              data.results[0].correct_answer,
              ...data.results[0].incorrect_answers,
            ],
          };
          console.log("Fetched Question:", this.question);
        } else {
          console.warn("No question found");
        }
      } catch (error) {
        console.error("Error fetching Question:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
