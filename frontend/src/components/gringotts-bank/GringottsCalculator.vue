<template>
  <div>
    <h2>Gringotts Calculator</h2>
    <label for="selectedFund">Select your fund:</label>
    <select id="selectedFund" v-model="selectedFundId">
      <option value="" disabled>Select your fund</option>
      <option
        v-for="(product, index) in products"
        :value="product.id"
        :key="index"
      >
        {{ product.name }}
      </option>
    </select>

    <label for="oneTimeInvestment">One-time Investment:</label>
    <input
      type="number"
      id="oneTimeInvestment"
      v-model="oneTimeInvestment"
      step="1000"
    />

    <label for="years">Number of Years:</label>
    <input type="number" id="years" v-model="years" step="1" />

    <button @click="calculate">Make me an offer</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFundId: null,
      oneTimeInvestment: null,
      years: null,
      products: [
        { id: 1, name: "Safe Fund", interestRate: 3 },
        { id: 2, name: "Balanced Fund", interestRate: 5 },
        { id: 3, name: "High Growth Fund", interestRate: 8 },
      ],
    };
  },
  computed: {
    selectedFund() {
      return this.products.find((fund) => fund.id == this.selectedFundId);
    },
  },
  methods: {
    calculate() {
      if (this.selectedFund && this.oneTimeInvestment && this.years) {
        const oneTimeInvestment = parseFloat(this.oneTimeInvestment);
        const interestRate = this.selectedFund.interestRate / 100;
        const years = parseInt(this.years);

        // Simple compound interest calculation
        const totalInvestment =
          oneTimeInvestment * Math.pow(1 + interestRate, years);
        const interestIncome = totalInvestment - oneTimeInvestment;
        const taxes = interestIncome * 0.19;
        const netIncome = totalInvestment - taxes;

        const calculatedData = {
          oneTimeInvestment,
          fund: this.selectedFund,
          years,
          totalInvestment,
          interestIncome,
          taxes,
          netIncome,
        };

        this.$emit("calculation-done", calculatedData);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
label {
  display: block;
  margin-top: 10px;
}
input,
select,
button {
  margin-top: 5px;
}
</style>
