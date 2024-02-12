<!-- GringottsInvestmentList.vue -->

<template>
  <div>
    <h2>Gringotts Investment List</h2>
    <ul>
      <li v-for="(investment, index) in investments" :key="index">
        <p>Customer: {{ investment.customerName }}</p>
        <p>Net Income: {{ investment.netIncome }}</p>
        <!-- Display other investment details as needed -->
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    investments: Array, // Array of investments passed as a prop
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
