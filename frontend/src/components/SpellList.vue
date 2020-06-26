
<template>
  <div>
    <ul class="spells row text-center">
      <li
        v-bind:key="spell.id"
        v-for="spell in spells"
        v-on:click="$emit('clickOnspell', spell)"
      >{{spell.effect}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SpellList",
  props: ["spells"],
  methods: {
    clickOnspell: function() {
      this.$emit("selectSpell");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.spells {
  list-style: none;
  padding: 20px;
  li {
    padding: 10px;
    color: #dca39e;
    font-family: "Lora", serif;
    vertical-align: middle;
    font-size: 2em;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    &:nth-child(1n + 2) {
      font-size: 1.3em;
    }
    &:nth-child(2n + 3) {
      font-size: 1.7em;
    }
    &:nth-child(3n) {
      font-size: 2.2em;
    }
    &:hover {
      color: #fffcf9;
    }
  }
}
</style>

