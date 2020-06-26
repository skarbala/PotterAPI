<template>
  <div class="main">
    <h1 class="title">Sorting Hat</h1>
    <h2 class="subtitle">Find yourself a new home in Hogwarts</h2>
    <button class="main" :disabled="disabled" v-on:click="getQuote">{{sortButtonLabel}}</button>
    <div class="row">
      <div class="col-md-6">
        <img class="hat" src="../assets/sortinghat.jpg" alt />
      </div>
      <div class="col-md-4 my-auto message">
        <h2 v-if="quote">{{quote.sortingHatSays}}</h2>
        <h1 v-if="quote">{{quote.house}}</h1>
        <h3 class="message" v-else>{{loadingMessage}}</h3>
      </div>
    </div>
  </div>
</template>  

<script>
export default {
  name: "SortingHat",
  data: function() {
    return {
      disabled: false,
      quote: "",
      isSorted: false,
      loadingMessage: "Click on sort to get yourself a new home"
    };
  },
  computed: {
    sortButtonLabel: function() {
      if (this.isSorted) {
        return "Sort me again!";
      }
      return "Sort me";
    }
  },
  methods: {
    getQuote: function() {
      this.disabled = true;
      this.loadingMessage = "Let me think...";
      this.quote = "";
      this.$http
        .get("/sortingHat")
        .then(response => (this.quote = response.data))
        .then(() => {
          (this.isSorted = true), (this.disabled = false);
        });
    }
  }
};
</script>
<style lang="scss" scoped >
$gray-color: rgb(155, 154, 154);
div.main {
  font-family: "Roboto Slab", serif;
  h2.subtitle {
    color: $gray-color;
    font-size: 1.5em;
  }
  div.message {
    h1 {
      margin: 20px 0;
      text-align: left;
      color: #3f3f8c;
      font-size: 3em;
    }
    h2 {
      font-size: 1.9em;
      text-align: left;
      color: $gray-color;
    }
    .message {
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
    &:disabled {
      background-color: $gray-color;
    }
  }
}
</style>