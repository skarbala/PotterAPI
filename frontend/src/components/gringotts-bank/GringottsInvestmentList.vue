<template>
  <div>
    <h2>Gringotts Investment List</h2>
    <ul>
      <li v-for="(investment, index) in investments" :key="index">
        <p>Customer: {{ investment.customerName }}</p>
        <p>Net Income: {{ formatAsMoneyGBP(investment.netIncome) }}</p>
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
  methods: {
    formatAsMoneyGBP(number) {
      // Use Intl.NumberFormat to format the number as GBP
      const formatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      // Return the formatted string
      return formatter.format(number);
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
