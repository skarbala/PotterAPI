<template>
  <div class="main">
    <div class="container">
      <h1>Gringotts Bank</h1>
      <h2>Investments for witches and wizards</h2>
      <div class="row">
        <div class="col">
          <GringottsCalculator @calculation-done="handleCalculationDone" />

          <GringottsForm
            v-if="newInvestment"
            :newInvestment="newInvestment"
            @create-investment="handleCreateInvestment"
            @reject-offer="handleRejectOffer"
          />
        </div>
        <div class="col">
          <GringottsInvestmentList :investments="investments" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GringottsCalculator from "../components/gringotts-bank/GringottsCalculator.vue";
import GringottsForm from "../components/gringotts-bank/GringottsForm.vue";
import GringottsInvestmentList from "../components/gringotts-bank/GringottsInvestmentList.vue";

export default {
  components: {
    GringottsCalculator,
    GringottsForm,
    GringottsInvestmentList,
  },
  data() {
    return {
      newInvestment: null,
      investments: [],
    };
  },
  methods: {
    handleCalculationDone(newInvestmentData) {
      this.newInvestment = newInvestmentData;
    },
    handleCreateInvestment(customerName) {
      if (this.newInvestment) {
        // Create a new investment object with customer name
        const investment = {
          ...this.newInvestment,
          customerName,
        };
        // Log the new investment to the console
        console.log("New Investment:", investment);
        this.investments.push(investment);
        // Optionally, reset the newInvestment data
        this.newInvestment = null;
        //this.$refs.calculator.resetInputFields();
      }
    },
    handleRejectOffer() {
      this.newInvestment = null;

      // Handle the rejected offer, e.g., log a message or perform other actions
      console.log("Offer Rejected");
    },
  },
};
</script>

<style scoped lang="scss">
div.main {
  background-color: #eeedeb;
  h1,
  h2 {
    color: #747264;
  }
}
</style>
