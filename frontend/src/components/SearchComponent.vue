
<template>
  <input
    type="text"
    class="search"
    placeholder="search for spell effect"
    id="search"
    data-test="search-input"
    v-bind="$attrs"
    v-bind:value="value"
    v-on="inputListeners"
  />
</template>

<script>
export default {
  name: "SearchComponent",
  props: ["value"],
  computed: {
    inputListeners: function() {
      var vm = this;
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: function(event) {
            vm.$emit("input", event.target.value);
          }
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
input.search {
  outline: none;
  border: none;
  color: #fff;
  font-family: "Lora", serif;
  border-bottom: 2px solid #dca39e;
  background-color: #822724;
  border-radius: 0;
  font-size: 2em;
  margin-bottom: 50px;
  transition: all 200ms ease;
  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
    background-color: #822724;
    border-radius: 0;
    border-bottom: 2px solid #fff;
    color: white;
  }
  &::placeholder {
    color: #dca39e;
    font-family: "Kanit", serif;
  }
  &:focus::placeholder {
    color: #fff;
    font-family: "Kanit", serif;
  }
}
</style>