<template>
  <div class="mt-5">
    <p>Net income: {{ newInvestment.netIncome }}</p>
    <p>Interest income: {{ newInvestment.interestIncome }}</p>
    <p>Risk: {{ newInvestment.fund.name }}</p>
    <label for="customerName">Customer Name:</label>
    <input type="text" id="customerName" v-model="customerName" />

    <button class="btn btn-primary" @click="createInvestment">
      Create Investment
    </button>
    <button class="btn btn-secondary" @click="rejectOffer">Reject Offer</button>
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
        console.log("emiting");
        this.$emit("create-investment", this.customerName);
        // Optionally, clear the input field after creating the investment
        this.customerName = "";
      }
    },
    rejectOffer() {
      // Handle the rejection, e.g., emit an event or perform other actions
      this.$emit("reject-offer");
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>