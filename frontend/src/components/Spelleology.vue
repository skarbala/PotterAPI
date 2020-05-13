
<template>
  <div class="main spells-main">
    <h1 class="text-center title">Spelleology</h1>
    <div class="col-md-6 mx-auto">
      <search-component v-model="search" />
      <button v-on:click="clearAll" class="spell-button">Delete all</button>
      <button v-on:click="reset" class="spell-button">Reset</button>
    </div>
    <div class="row col-md-12 mx-auto">
      <spell-list v-if="spells.length >=1" :spells="filteredList" v-on:clickOnspell="selectSpell" />
    </div>
    <h1 class="subtitle text-center" v-if="spells.length ==0">Mischief managed</h1>
    <modal :spell="selectedSpell" v-show="showModal" @close="closeModal" />
  </div>
</template>

<script>
import SpellList from "./SpellList.vue";
import SearchComponent from "./SearchComponent.vue";
import Modal from "./Modal.vue";

export default {
  name: "Spelleology",
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
      this.$http
        .delete("spells/actions/deleteAll")
        .then(() => (this.spells = []));
    },
    reset: function() {
      this.$http.get("spells/actions/reset").then(response => {
        this.spells = response.data.spells;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
div.spells-main {
  background-color: #822724;
}

h1 {
  font-family: "Harry", serif;
  &.title {
    color: white;
    font-size: 8em;
    text-shadow: 7px 7px 2px #671e1c;
  }
  &.subtitle {
    margin: 100px;
    font-size: 6em;
    color: #dca39e;
  }
}

.spell-button {
  padding: 1px 20px;
  background-color: #822724;
  font-family: "Kanit", serif;
  color: #fffcf9;
  font-size: 2em;
  cursor: pointer;
  border-bottom: 2px solid #dca39e;
  margin: 0 20px;
  &:hover {
    border-bottom: 2px solid white;
    color: white;
  }
}

@font-face {
  font-family: "Harry";
  src: url("../assets/HARRYP.TTF");
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
