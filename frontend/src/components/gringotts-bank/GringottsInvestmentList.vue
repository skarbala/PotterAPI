<template>
  <div>
    <h2>Gringotts Investment List</h2>

    <ul class="investment-list mt-3">
      <li class="my-2" v-for="(investment, index) in investments" :key="index">
        <h4>
          Investment issued for <span>{{ investment.customerName }}</span>
          <hr />
        </h4>

        <div class="row">
          <div class="col">
            <p>
              Investment:
              {{ formatAsMoneyGBP(investment.oneTimeInvestment) }}
            </p>
            <p>Period: {{ investment.years }} years</p>
            <p>Fund: {{ investment.fund.name }}</p>
            <p>Risk: {{ investment.fund.risk }}</p>
          </div>

          <div class="col">
            <p>Net income: {{ formatAsMoneyGBP(investment.netIncome) }}</p>
            <p>
              Interest income:
              {{ formatAsMoneyGBP(investment.interestIncome) }}
            </p>
            <p>
              <span>
                Total income:
                {{
                  formatAsMoneyGBP(
                    investment.netIncome + investment.interestIncome
                  )
                }}
              </span>
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button
              class="btn btn-primary mr-2 float-left"
              id="showDetail"
              @click="openInvestmentModal(index)"
            >
              View Details
            </button>
            <button
              class="btn btn-danger float-left"
              id="delete"
              @click="deleteInvestment(index)"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
    <GringottsInvestmentModal
      v-if="selectedInvestment !== null"
      :investment="selectedInvestment"
      :is-open="isModalOpen"
      @close-investment-modal="closeInvestmentModal"
    />
  </div>
</template>

<script>
import GringottsInvestmentModal from "../gringotts-bank/GringottsInvestmentModal.vue";

export default {
  props: {
    investments: Array, // Array of investments passed as a prop
  },
  components: {
    GringottsInvestmentModal,
  },
  data() {
    return {
      selectedInvestment: null,
      isModalOpen: false,
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
    deleteInvestment(index) {
      // Trigger the deletion of the investment at the specified index
      this.$emit("delete-investment", index);
    },
    openInvestmentModal(index) {
      this.selectedInvestment = this.investments[index];
      this.isModalOpen = true;
    },
    closeInvestmentModal() {
      this.selectedInvestment = null;
      this.isModalOpen = false;
    },
  },
};
</script>

<style scoped lang="scss">
h2 {
  color: #747264;
  text-align: left;
}
ul.investment-list {
  list-style: none;
  padding: 0;
  li {
    hr {
      background-color: #fff;
    }
    h4 {
      text-align: left;
      span {
        font-weight: 900;
      }
    }
    color: #fff;
    background-color: #747264;
    padding: 20px;
    button {
      border-radius: 0;
    }
    button#showDetail {
      background-color: #504e44;
      border: none;
      &:hover {
        background-color: #676458;
        cursor: pointer;
      }
    }
    p {
      text-align: left;
      span {
        font-weight: 800;
      }
    }
    h5 {
      text-align: left;
    }
    transition: all 200ms ease-in;

    &:hover {
      background-color: #817f71;
      cursor: pointer;
    }
  }
}
</style>
