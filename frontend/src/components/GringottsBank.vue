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
          <GringottsInvestmentList
            :investments="investments"
            @delete-investment="handleDeleteInvestment"
            @clear-all-investments="handleClearAllInvestments"
          />
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
  created: function () {
    this.loadInvestments();
  },
  data() {
    return {
      newInvestment: null,
      investments: [],
    };
  },
  methods: {
    loadInvestments() {
      this.$http
        .get("/investments")
        .then((response) => {
          this.investments = response.data;
        })
        .catch((error) => {
          console.error("Failed to load investments:", error);
          this.investments = [];
        });
    },
    handleCalculationDone(newInvestmentData) {
      this.newInvestment = newInvestmentData;
    },
    handleCreateInvestment(customerName) {
      if (this.newInvestment) {
        const investment = {
          ...this.newInvestment,
          customerName,
        };
        this.investments.push(investment);

        this.saveInvestments();
        this.newInvestment = null;
      }
    },
    handleRejectOffer() {
      this.newInvestment = null;
      console.log("Offer Rejected");
    },
    handleDeleteInvestment(index) {
      this.investments.splice(index, 1);
      this.saveInvestments();
    },
    handleClearAllInvestments() {
      this.$http
        .delete("/investments")
        .then(() => {
          this.investments = [];
        })
        .catch((error) => {
          console.error("Failed to clear investments:", error);
        });
    },
    saveInvestments() {
      this.$http
        .put("/investments", this.investments)
        .then((response) => {
          this.investments = response.data;
        })
        .catch((error) => {
          console.error("Failed to save investments:", error);
        });
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
