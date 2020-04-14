
<template>
  <div>
    <ul class="spells row text-center">
      <li v-bind:key="spell.id" v-for="spell in spells">
        <div>{{spell.effect}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SpellList",
  props: ["spells"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./SpellList.css"></style>

