<template>
  <div class="main">
    <h1 class="heading">Sorting Hat</h1>
    <button class="main sort" v-on:click="getQuote">Sort me</button>
    <div class="row">
      <div class="col-md-6">
        <img class="hat" src="../assets/sortinghat.jpg" alt />
      </div>
      <div class="col-md-4 my-auto message">
        <h1 class="message" v-if="quote">{{quote.sortingHatSays}}</h1>
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
<style lang="scss">
div.message {
  h1 {
    text-align: left;
    color: rgb(45, 41, 32);
  }
  h2 {
    text-align: center;
    color: rgb(154, 154, 154);
  }
  img.hat {
    width: 60%;
  }
}

button.sort {
  background-color: #3f3f8c;
  &:hover {
    background-color: #333373;
  }
}
</style>