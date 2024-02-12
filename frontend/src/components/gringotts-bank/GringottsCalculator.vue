<template>
  <div>
    <h2>Gringotts Calculator</h2>

    <div class="input-group mb-3">
      <select class="custom-select" id="selectedFund" v-model="selectedFundId">
        <option disabled value="">Please select fund</option>
        <option
          v-for="(product, index) in products"
          :value="product.id"
          :key="index"
        >
          {{ product.name }}
        </option>
      </select>
    </div>

    <div class="input-group mb-3">
      <input
        class="form-control"
        aria-describedby="inputGroup-sizing-default"
        type="number"
        id="oneTimeInvestment"
        v-model="oneTimeInvestment"
        step="1000"
        placeholder="one time investment"
      />
    </div>

    <div class="input-group mb-3">
      <input
        class="form-control"
        aria-describedby="inputGroup-sizing-default"
        type="number"
        id="years"
        v-model="years"
        step="1"
        placeholder="years"
      />
    </div>

    <button class="btn btn-block" @click="calculate">Make me an offer</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFundId: "",
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
        this.oneTimeInvestment = null;
        this.selectedFundId = null;
        this.years = null;
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
button {
  background-color: #747264;
  color: #fff;
  font-weight: 700;
  padding: 10px;
  font-size: 1.2em;
}
h2 {
  color: #747264;
}
</style>
