
<template>
  <div>
    <ul class="spells row text-center">
      <li v-bind:key="spell.id" v-for="spell in spells" v-on:click="$emit('clickOnspell', spell)">
        <div>{{spell.effect}}</div>
      </li>
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
<style src="./SpellList.css"></style>

