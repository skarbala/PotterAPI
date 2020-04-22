<template>
  <div class="container-fluid">
    <div class="col-md-6 mx-auto">
      <h1>Potter Quotes</h1>
      <button v-on:click="getQuote">Get Quote</button>

      <h1>"{{quote.quote}}"</h1>
      <h2>{{quote.author}}</h2>
    </div>
  </div>
</template>  

<script>
export default {
  name: "QuoteGenerator",
  data: function() {
    return {
      quote: ""
    };
  },
  methods: {
    getQuote: function() {
      this.quote = "";
      console.log("yay clicked");
      this.$http.get("/quote").then(response => (this.quote = response.data));
    }
  }
};
</script>
<style>
h1 {
  font-family: "Allura", cursive;
}
h2 {
  text-align: right;
}
</style>