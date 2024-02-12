<template>
  <div class="mt-5">
    <p>Net income: {{ newInvestment.netIncome }}</p>
    <p>Interest income: {{ newInvestment.interestIncome }}</p>
    <p>Risk: {{ newInvestment.fund.name }}</p>
    <label for="customerName">Customer Name:</label>
    <input type="text" id="customerName" v-model="customerName" />

    <button @click="createInvestment">Create Investment</button>
  </div>
</template>

<script>
export default {
  props: {
    newInvestment: Object, // Pass the calculatedData as a prop
  },
  data() {
    return {
      customerName: "",
    };
  },
  methods: {
    createInvestment() {
      if (this.customerName) {
        this.$emit("create-investment", this.customerName);
        // Optionally, clear the input field after creating the investment
        this.customerName = "";
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
