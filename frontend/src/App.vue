
<template>
  <div id="app">
    <h1 class="text-center title">Spelleology</h1>
    <SpellList :spells="spells" />
  </div>
</template>

<script>
import SpellList from "./components/SpellList.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    SpellList
  },
  data: function() {
    return { spells: [] };
  },

  created: function() {
    axios
      .get("http://localhost:3000/spells")
      .then(response => (this.spells = response.data));
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
  margin-top: 60px;
}
body {
  background-color: #822724;
}
h1.title {
  font-family: "Harry", serif;
  font-size: 12em;
  color: white;
  margin-top: 20px;
  text-shadow: 7px 7px 2px #671e1c;
}
@font-face {
  font-family: "Harry";
  src: url("./assets/HARRYP.TTF");
}
</style>
