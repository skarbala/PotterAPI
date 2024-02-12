<template>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <img src="../assets/gringottsbanklogo.png" alt="" />
        </div>
        <div class="col-10">
          <h1>Gringotts Bank</h1>
          <h2>Investments for witches and wizards</h2>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col mx-5">
          <GringottsCalculator @calculation-done="handleCalculationDone" />

          <GringottsForm
            v-if="newInvestment"
            :newInvestment="newInvestment"
            @create-investment="handleCreateInvestment"
            @reject-offer="handleRejectOffer"
          />
        </div>
        <div class="col mx-5">
          <GringottsInvestmentList :investments="investments" />
          <div v-if="investments.length === 0" class="no-investments-message">
            <p>No investments yet. Make your first one!</p>
          </div>
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
  img {
    width: 70%;
  }
  background-color: #eeedeb;
  h1,
  h2 {
    color: #747264;
    text-align: left;
  }
  p {
    color: #868475;
    text-align: left;
  }
}
</style>
