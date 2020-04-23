<template>
  <div class="container-fluid">
    <div class="col-md-6 mx-auto">
      <h1>Potter Quotes</h1>
      <button v-on:click="getQuote">Get Quote</button>

      <div v-if="quote" class="quote">
        <p>"{{quote.quote}}"</p>
        <h2>{{quote.author}}</h2>
      </div>
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
div.quote p {
  text-align: left;
}
div.quote h2 {
  text-align: right;
}
</style>