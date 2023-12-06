<template>
  <header>
    <div class="wrapper">
      <nav>
        <div class="logo-container">
          <img :src="logoImage" alt="Left Logo" class="logo" />
        </div>
        <router-link to="/">
          <button class="nav-button">News</button>
        </router-link>
        <router-link to="/reddit">
          <button class="nav-button">Reddit</button>
        </router-link>
        <router-link to="/dadjoke">
          <button class="nav-button">Dad Joke</button>
        </router-link>
        <router-link to="/facts">
          <button class="nav-button">Facts</button>
        </router-link>
        <router-link to="/history">
          <button class="nav-button">History</button>
        </router-link>
        <router-link to="/trivia">
          <button class="nav-button">Trivia</button>
        </router-link>
        <router-link to="/chuck">
          <button class="nav-button">Chuck</button>
        </router-link>
        <div class="logo-container">
          <img :src="reddit" alt="Right Logo" class="logo" />
        </div>
      </nav>
    </div>
  </header>

  <router-view />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import logoImage from "../public/socialThreadLogo.jpg";
import reddit from "../public/reddit.jpeg";
export default {
  data() {
    return {
      logoImage,
      reddit,
    };
  },
};
</script>

<style scoped>
header {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 15px 0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.nav-button {
  background-color: #3498db;
  color: #ecf0f1;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
  }

  .nav-button {
    margin-bottom: 10px;
  }
}
.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  max-height: 30px;
  margin-right: 10px;
}
</style>
