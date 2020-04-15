
<template>
  <div id="app">
    <div class="container-fluid">
      <h1 class="text-center title">Spelleology</h1>
      <div class="row">
        <div class="col col-md-8 offset-md-1">
          <SpellList
            v-if="spells.length >=1"
            :spells="filteredList"
            v-on:clickOnspell="selectSpell"
          />
          <h1 class="subtitle" v-else>Mischief managed</h1>
        </div>
        <div class="col col-md-3 sticky-top">
          <button v-on:click="clearAll">Clear</button>
          <button v-on:click="reset">Reset</button>

          <input
            type="text"
            placeholder="search for spell effect"
            v-model="search"
            class="form-control search"
          />
        </div>
      </div>
    </div>
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
    return { spells: [], selectedSpell: "", showModal: false, search: "" };
  },
  computed: {
    filteredList: function() {
      return this.spells.filter(spell => {
        return spell.effect.toLowerCase().includes(this.search.toLowerCase());
      });
    }
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
      this.$http.get("spells/actions/deleteAll").then(() => (this.spells = []));
    },
    reset: function() {
      this.$http.get("spells/actions/reset").then(response => {
        this.spells = response.data.spells;
      });
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

h1.subtitle {
  font-family: "Harry", serif;
  margin: 100px;
  font-size: 6em;
  color: white;
  text-shadow: 7px 7px 2px #671e1c;
}

button {
  background-color: #822724;
  border: none;
  font-family: "Lora", serif;
  color: #fffcf9;
  font-size: 1.5em;
  margin: 30px;
  padding: 10px 30px;
  cursor: pointer;
  border-radius: 3px;
  -webkit-box-shadow: 0px 0px 17px -4px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 17px -4px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 17px -4px rgba(0, 0, 0, 1);
}
button:focus {
  outline: none;
}
div.controller {
  position: fixed;
}
@font-face {
  font-family: "Harry";
  src: url("./assets/HARRYP.TTF");
}
</style>
