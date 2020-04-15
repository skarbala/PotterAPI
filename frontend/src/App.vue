
<template>
  <div id="app">
    <div class="container-fluid">
      <h1 class="text-center title">Spelleology</h1>
      <div class="col-md-6 mx-auto">
        <search-component v-model="search" />
        <button v-on:click="clearAll" class="custom-underline fancy-button">Delete all</button>
        <button v-on:click="reset" class="custom-underline">Reset</button>
      </div>
      <div class="row">
        <div class="col col-md-12 mx-auto">
          <spell-list
            v-if="spells.length >=1"
            :spells="filteredList"
            v-on:clickOnspell="selectSpell"
          />
          <h1 class="subtitle" v-else>Mischief managed</h1>
        </div>
      </div>
    </div>
    <modal :spell="selectedSpell" v-show="showModal" @close="closeModal" />
  </div>
</template>

<script>
import SpellList from "./components/SpellList.vue";
import SearchComponent from "./components/SearchComponent.vue";
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    SpellList,
    SearchComponent,
    Modal
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
    closeModal() {
      this.showModal = false;
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
  color: #dca39e;
}

button {
  padding: 1px 20px;
  background-color: #822724;
  border: none;
  font-family: "Kanit", serif;
  color: #fffcf9;
  font-size: 2em;
  cursor: pointer;
  border-bottom: 2px solid #dca39e;
  margin: 0 20px;
}
button.custom-underline:hover {
  border-bottom: 2px solid white;
  color: white;
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
