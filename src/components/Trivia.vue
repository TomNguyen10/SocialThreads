<template>
  <div id="trivia-app" class="centered-container">
    <h1>Trivia Question of the Day</h1>
    <div v-if="question" class="trivia-container">
      <p class="question-text">{{ question.question }}</p>
      <ul class="options-list">
        <li
          v-for="(option, index) in question.options"
          :key="index"
          class="option-item">
          {{ option }}
        </li>
      </ul>
      <button @click="revealAnswer" class="reveal-button">Reveal Answer</button>
      <p v-if="answerRevealed" class="correct-answer">
        Correct Answer: {{ question.correctAnswer }}
      </p>
    </div>
    <div v-else class="no-question">
      <p v-if="loading">Loading...</p>
      <p v-else>No question found.</p>
    </div>

    <button @click="getAnotherTrivia" class="get-another-button">
      Get Another Trivia
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: null,
      loading: true,
      answerRevealed: false,
    };
  },
  mounted() {
    this.fetchNewQuestion();
  },
  methods: {
    async fetchNewQuestion() {
      this.loading = true;
      this.answerRevealed = false;

      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=1&type=multiple"
        );

        if (response.status === 429) {
          console.warn(
            "Rate limit exceeded. Please wait before fetching another question."
          );
        } else {
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            this.question = {
              question: data.results[0].question,
              options: [
                data.results[0].correct_answer,
                ...data.results[0].incorrect_answers,
              ],
              correctAnswer: data.results[0].correct_answer,
            };
            console.log("Fetched Question:", this.question);
          } else {
            console.warn("No question found");
          }
        }
      } catch (error) {
        console.error("Error fetching Question:", error);
      } finally {
        this.loading = false;
      }
    },

    revealAnswer() {
      this.answerRevealed = true;
    },
    async getAnotherTrivia() {
      await this.fetchNewQuestion();
    },
  },
};
</script>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.trivia-container {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.question-text {
  font-size: 18px;
  margin-bottom: 15px;
}

.options-list {
  list-style-type: none;
  padding: 0;
}

.option-item {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.option-item:hover {
  background-color: #f0f0f0;
}

.reveal-button {
  background-color: #007bff;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reveal-button:hover {
  background-color: #0056b3;
}

.correct-answer {
  margin-top: 15px;
  font-weight: bold;
  color: #28a745;
}

.no-question {
  text-align: center;
  margin-top: 20px;
}

.get-another-button {
  background-color: #28a745;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.get-another-button:hover {
  background-color: #218838;
}
</style>
