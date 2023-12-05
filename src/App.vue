<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/dadjoke">Dad Joke</RouterLink>
        <RouterLink to="/football">Football</RouterLink>
        <RouterLink to="/anime">Anime</RouterLink>
        <RouterLink to="/trivia">Trivia</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
</script>
