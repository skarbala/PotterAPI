<template>
  <div>
    <h1>Sorting Hat</h1>
    <button v-on:click="getQuote">Sort me</button>
    <h1>{{quote.sortingHatSays}}</h1>
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
      console.log("yay clicked");
      this.$http
        .get("/sortingHat")
        .then(response => (this.quote = response.data));
    }
  }
};
</script>
<style>
</style>