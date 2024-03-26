<template>
  <div class="mt-5 offer-detail">
    <h2>The offer</h2>
    <hr />
    <div class="row">
      <div class="col your-data">
        <h4>Your data</h4>
        <p>
          Investment: <span>{{ formatAsMoneyGBP(newInvestment.oneTimeInvestment) }}</span>
        </p>
        <p class="period">Period: <span>{{ newInvestment.years }} years</span></p>
        <p class="fund">Fund: <span>{{ newInvestment.fund.name }}</span></p>
        <p class="risk">Risk: <span>{{ newInvestment.fund.risk }}</span></p>
      </div>

      <div class="col our-calculations">
        <h4>Our calculations</h4>
        <p>Net income: <span> {{ formatAsMoneyGBP(newInvestment.netIncome) }}</span></p>
        <p>
          Interest income: <span>{{ formatAsMoneyGBP(newInvestment.interestIncome) }}</span>
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
      <input class="form-control" aria-describedby="inputGroup-sizing-default" type="text" id="customerName"
        data-test="customer-name" v-model="customerName" placeholder="enter your name" />
    </div>

    <button class="btn btn-success mx-3" @click="createInvestment" data-test="create-investment">
      Create Investment
    </button>
    <button class="btn btn-danger mx-3" @click="rejectOffer" data-test="decline-investment">
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
  button {
    font-weight: 700;
    border-radius: 0;
  }

  input {
    border-radius: 0;
  }

  hr {
    background-color: #fff;
  }

  color: #fff;
  background-color: #747264;
  padding: 20px;

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
  text-align: left;
  font-weight: 900;
}
</style>
