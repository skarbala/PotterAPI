
<template>
  <div id="app">
    <h1 class="text-center title">Spelleology</h1>
    <div>
      <button v-on:click="clearAll">Clear</button>
      <button v-on:click="reset">Reset</button>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <h2 slot="header">{{selectedSpell.spell}}</h2>
      <h3
        slot="body"
      >{{selectedSpell.effect.charAt(0).toUpperCase() + selectedSpell.effect.slice(1)}}</h3>
      <h4 slot="body">{{selectedSpell.type}}</h4>
    </modal>
    <SpellList :spells="spells" v-on:clickOnspell="selectSpell" />
  </div>
</template>

<script>
import SpellList from "./components/SpellList.vue";

export default {
  name: "App",
  components: {
    SpellList
  },
  data: function() {
    return { spells: [], selectedSpell: "", showModal: false };
  },

  created: function() {
    this.$http.get("/spells").then(response => (this.spells = response.data));
  },
  methods: {
    selectSpell: function(spell) {
      this.selectedSpell = spell;
      this.showModal = true;
    },
    clearAll: function() {
      this.$http
        .get("spells/actions/deleteAll")
        .then(response => console.log(response.data.message));
      this.spells = [];
    },
    reset: function() {
      this.$http
        .get("spells/actions/reset")
        .then(response => (this.spells = response.data.spells));
      this.spells = [];
    }
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
