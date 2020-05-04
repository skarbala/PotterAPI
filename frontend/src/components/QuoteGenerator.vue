<template>
  <div class="main">
    <h1>Potter Quotes</h1>
    <div class="quote-controls">
      <button v-on:click="getQuote" class="main">Get Quote</button>
      <p>Wisdom +{{this.quoteList.length}} points</p>
    </div>

    <div class="col-md-6 mx-auto">
      <div class="quote-container">
        <div v-if="quote" class="quote">
          <h1>"{{quote.quote}}"</h1>
          <h2>{{quote.author}}</h2>
        </div>
        <div v-else>Click button to get first knowledge</div>
      </div>

      <transition-group name="fade" tag="ul" class="recent-quotes">
        <li v-for="quoteitem in quoteList" :key="quoteitem.quote">
          <div>
            <p>{{ quoteitem.quote }}</p>
            <p>{{ quoteitem.author }}</p>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>  

<script>
export default {
  name: "QuoteGenerator",
  data: function() {
    return {
      quote: "",
      quoteList: []
    };
  },
  methods: {
    getQuote: function() {
      this.quote = "";
      this.$http.get("/quote").then(response => {
        this.quote = response.data;
        this.quoteList.unshift(this.quote);
        this.qouteCounter++;
      });
    }
  }
};
</script>
<style >
div.quote {
  margin-top: 50px;
}
div.quote-container {
  min-height: 200px;
  margin-bottom: 50px;
}
div.quote h1 {
  text-align: left;
  color: rgb(92, 92, 92);
}
div.quote h2 {
  text-align: left;
  color: rgb(189, 189, 189);
}
button {
  background-color: rgb(189, 189, 189);
  border: none;
  cursor: pointer;
  padding: 10px 30px;
  margin-top: 50px;
}

ul.recent-quotes {
  list-style: none;
}
ul.recent-quotes div {
  text-align: left;
  padding: 20px;
  margin-bottom: 10px;
  -webkit-box-shadow: 0px 0px 7px 1px rgba(230, 230, 230, 1);
  -moz-box-shadow: 0px 0px 7px 1px rgba(230, 230, 230, 1);
  box-shadow: 0px 0px 7px 1px rgba(230, 230, 230, 1);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
div.quote-controls p {
  display: inline-block;
  margin: 50px;
  color: #822724;
  font-weight: 700;
  font-size: 1.5em;
}
div.quote-controls button:active {
  transform: scale(1.1);
}

div.quote-controls button {
  transition: all 200ms ease-in;
}
</style>