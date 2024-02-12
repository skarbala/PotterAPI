<template>
  <div class="mt-5 offer-detail">
    <h2>The offer</h2>
    <div class="row">
      <div class="col">
        <h4>Your data</h4>
        <p>
          Investment: {{ formatAsMoneyGBP(newInvestment.oneTimeInvestment) }}
        </p>
        <p>Period: {{ newInvestment.years }} years</p>
        <p>Fund: {{ newInvestment.fund.name }}</p>
      </div>

      <div class="col">
        <h4>Our calculations</h4>
        <p>Net income: {{ formatAsMoneyGBP(newInvestment.netIncome) }}</p>
        <p>
          Interest income: {{ formatAsMoneyGBP(newInvestment.interestIncome) }}
        </p>
        <p>
          <span>
            Total income:
            {{
              formatAsMoneyGBP(
                newInvestment.netIncome + newInvestment.interestIncome
              )
            }}
          </span>
        </p>
      </div>
    </div>
    <div class="input-group mb-3">
      <input
        class="form-control"
        aria-describedby="inputGroup-sizing-default"
        type="text"
        id="customerName"
        v-model="customerName"
        placeholder="name"
      />
    </div>

    <button class="btn btn-success mx-3" @click="createInvestment">
      Create Investment
    </button>
    <button class="btn btn-danger mx-3" @click="rejectOffer">
      Reject Offer
    </button>
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
    createInvestment() {
      if (this.customerName) {
        console.log("emitting");
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

<style scoped lang="scss">
div.offer-detail {
  padding: 0;
  h4 {
    text-align: left;
  }
  p {
    text-align: left;
    span {
      font-weight: 800;
    }
  }
}
h2 {
  color: #747264;
}
</style>
