<template>
  <div>
    <h2>Enter your data muggle!</h2>

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

    <button class="btn btn-block" @click="calculate" data-test="create-offer">
      Make me an offer
    </button>
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
        { id: 1, name: "Galleon Guardian Fund", risk: "LOW", interestRate: 4 },
        {
          id: 2,
          name: "Phoenix Feather Portfolio",
          risk: "MEDIUM",
          interestRate: 6,
        },
        { id: 3, name: "Basilisk Bonds", risk: "HIGH", interestRate: 9 },
        {
          id: 4,
          name: "Polyjuice Potion Fund",
          risk: "MEDIUM",
          interestRate: 5,
        },
        {
          id: 5,
          name: "Marauder's Map Mutuals",
          risk: "HIGH",
          interestRate: 8,
        },
        {
          id: 6,
          name: "Dementor Defense Dividends",
          risk: "INSANE",
          interestRate: 12,
        },
        {
          id: 7,
          name: "Quidditch Quest Equities",
          risk: "MEDIUM",
          interestRate: 6,
        },
        {
          id: 8,
          name: "Hogwarts Heritage Holdings",
          risk: "HIGH",
          interestRate: 9,
        },
        {
          id: 9,
          name: "Pensieve Prosperity Partners",
          risk: "LOW",
          interestRate: 3,
        },
        { id: 10, name: "Owl Post Options", risk: "MEDIUM", interestRate: 5 },
        {
          id: 11,
          name: "Death Eater Dominance Fund",
          risk: "INSANE",
          interestRate: 15,
        },
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
        this.selectedFundId = "";
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
  margin-top: 0px;
  border-radius: 0;
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
  text-align: left;
}
</style>
