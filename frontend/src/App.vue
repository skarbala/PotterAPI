
<template>
  <div id="app">
    <navigation />
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button.main {
  padding: 10px 40px;
  background-color: #822724;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
}

button.main:hover {
  background-color: #72221f;
}
</style>
