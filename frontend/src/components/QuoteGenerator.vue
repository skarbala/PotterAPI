<template>
  <div class="main">
    <h1 class="title">Potter Quotes</h1>
    <h2 class="subtitle">Level up by getting some wisdom</h2>

    <div class="quote-controls">
      <button v-on:click="getQuote" class="main">Get Quote</button>
      <div class="row wisdom-level col-md-8 mx-auto">
        <div class="col">
          <p>
            <span>wisdom points</span>
            +{{this.quoteList.length}}
          </p>
        </div>
        <div class="col">
          <p>
            <span>current level</span>
            {{wizardLevel}}
          </p>
        </div>
      </div>
    </div>

    <div class="col-md-6 mx-auto">
      <div class="quote-container">
        <div
          v-if="this.qouteCounter ==0"
          class="empty-list-message"
        >Click the button to get some wisdom</div>
        <transition-group v-else name="fade" tag="ul" class="recent-quotes">
          <li v-for="quoteitem in quoteList" :key="quoteitem.quote">
            <div>
              <p>{{ quoteitem.quote }}</p>
              <p class="author">{{ quoteitem.author }}</p>
            </div>
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>  

<script>
export default {
  name: "QuoteGenerator",
  data: function() {
    return {
      quote: "",
      quoteList: [],
      qouteCounter: ""
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
  },
  computed: {
    wizardLevel: function() {
      let level = "";
      if (this.qouteCounter <= 5) {
        level = "NOOB";
      }
      if (this.qouteCounter > 5) {
        level = "ROOKIE wand polisher";
      }
      if (this.qouteCounter > 10) {
        level = "Experienced broom SUMMONER";
      }
      if (this.qouteCounter > 15) {
        level = "NIGHTMARE Alchemist";
      }
      if (this.qouteCounter > 20) {
        level = "Spell OVERLORD";
      }
      if (this.qouteCounter > 25) {
        level = "Death potion EVANGELIST";
      }
      if (this.qouteCounter > 30) {
        level = "Dementor the HAPPINESS SPECIALIST";
      }
      if (this.qouteCounter > 35) {
        level = "Part-Time DEATHEATER";
      }
      if (this.qouteCounter > 40) {
        level = "First Impression SPOILER";
      }
      if (this.qouteCounter > 45) {
        level = "Azcaban INFLUENCER";
      }
      return level;
    }
  }
};
</script>
<style scoped>
h1.title {
  font-family: "Roboto Slab", serif;
}
h2.subtitle {
  font-family: "Roboto Slab", serif;
  color: rgb(189, 189, 189);
  font-size: 1.5em;
}

div.quote-container {
  margin-top: 50px;
}

button {
  border: none;
  cursor: pointer;
  padding: 10px 30px;
  margin-top: 20px;
  background-color: #822724;
}
ul.recent-quotes {
  list-style: none;
}
ul.recent-quotes li:nth-child(1) {
  transform: scale(1.05);
  margin-bottom: 20px;
  -webkit-box-shadow: 0px 0px 7px 1px #822724;
  -moz-box-shadow: 0px 0px 7px 1px #822724;
  box-shadow: 0px 0px 15px 3px #c17f7d;
}
ul.recent-quotes div {
  font-family: "Roboto Slab", serif;
  text-align: left;
  padding: 20px;
  margin-bottom: 10px;
  -webkit-box-shadow: 0px 0px 7px 1px rgba(230, 230, 230, 1);
  -moz-box-shadow: 0px 0px 7px 1px rgba(230, 230, 230, 1);
  box-shadow: 0px 0px 7px 1px rgba(230, 230, 230, 1);
}
ul.recent-quotes p.author {
  color: rgb(189, 189, 189);
}
.fade-enter-to,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

div.quote-controls p {
  display: inline-block;
  color: #822724;
  font-weight: 700;
  font-size: 1.5em;
  text-align: justify;
}
div.quote-controls button:active {
  transform: scale(1.1);
}
.empty-list-message {
  color: rgb(189, 189, 189);
  font-size: 2em;
  font-family: "Roboto Slab", serif;
}

div.quote-controls button {
  transition: all 200ms ease-in;
}
div.wisdom-level p span {
  color: rgb(189, 189, 189);
  font-weight: 300;
}
div.wisdom-level {
  margin-top: 20px;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>