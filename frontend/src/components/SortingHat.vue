<template>
  <div class="main">
    <h1 class="title">Sorting Hat</h1>
    <h2 class="subtitle">Find yourself a new home in Hogwarts</h2>
    <button class="main" v-on:click="getQuote">Sort me</button>
    <div class="row">
      <div class="col-md-6">
        <img class="hat" src="../assets/sortinghat.jpg" alt />
      </div>
      <div class="col-md-4 my-auto message">
        <h1 v-if="quote">{{quote.sortingHatSays}}</h1>
        <h2 v-else>Click sort me and get yourself a house</h2>
      </div>
    </div>
  </div>
</template>  

<script>
export default {
  name: "SortingHat",
  data: function() {
    return {
      quote: ""
    };
  },
  methods: {
    getQuote: function() {
      this.quote = "";
      this.$http
        .get("/sortingHat")
        .then(response => (this.quote = response.data));
    }
  }
};
</script>
<style lang="scss" scoped >
$gray-color: rgb(189, 189, 189);
div.main {
  font-family: "Roboto Slab", serif;
  h2.subtitle {
    color: $gray-color;
    font-size: 1.5em;
  }
  div.message {
    h1 {
      text-align: left;
      color: rgb(45, 41, 32);
    }
    h2 {
      text-align: center;
      color: $gray-color;
    }
  }
  .hat {
    width: 60%;
  }
  button {
    margin-top: 20px;
    background-color: #3f3f8c;
    &:hover {
      background-color: #333373;
    }
  }
}
</style>