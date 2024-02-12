<!-- GringottsBank.vue -->

<template>
  <div>
    <h1>Gringotts Bank</h1>
    <h2>Investments for witches and wizards</h2>

    <GringottCalculator @calculation-done="handleCalculationDone" />

    <!-- Display GringottsForm when newInvestment is filled -->
  </div>
</template>

<script>
import GringottCalculator from "../components/gringotts-bank/GringottCalculator.vue";

export default {
  components: {
    GringottCalculator,
  },
  data() {
    return {
      newInvestment: null,
    };
  },
  methods: {
    handleCalculationDone(calculatedData) {
      this.newInvestment = calculatedData;
    },
    handleSubmitInvestment(customerName) {
      // Handle the submitted investment data, e.g., push it to a list
      const investmentData = {
        ...this.newInvestment,
        customerName,
      };
      // You can then push this data to your list or perform other actions
      this.newInvestment = null;
      console.log("Submitted Investment Data:", investmentData);
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
