<!-- GringottsInvestmentModal.vue -->
<template>
  <div v-if="isOpen" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Investment Details</h2>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <p>Fund: {{ investment.fund.name }}</p>
              <p>Risk: {{ investment.fund.risk }}</p>
              <p>Name: {{ investment.customerName }}</p>
              <p>
                Investment: {{ formatAsMoneyGBP(investment.oneTimeInvestment) }}
              </p>
              <p>Years: {{ investment.years }}</p>
            </div>
            <div class="col">
              <p>Net income: {{ formatAsMoneyGBP(investment.netIncome) }}</p>
              <p>
                Interest income:
                {{ formatAsMoneyGBP(investment.interestIncome) }}
              </p>

              <p>
                Total income:
                {{
                  formatAsMoneyGBP(
                    investment.netIncome + investment.interestIncome
                  )
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="closeInvestmentModal"
            id="close"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    investment: Object, // The specific investment object to display details
    isOpen: Boolean, // Whether the modal is open or not
  },
  methods: {
    closeInvestmentModal() {
      this.$emit("close-investment-modal"); // Emit an event to close the modal
    },
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
  },
};
</script>

<style scoped lang="scss">
/* Add your modal styles here */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-dialog {
    margin: 0 auto;
    width: 1200px;
    .modal-content {
      color: #fff;
      padding: 20px;
      border-radius: 0;
      background-color: #747264;
      border: none;
      p {
        text-align: left;
      }

      button#close {
        background-color: #504e44;
        border: none;
        border-radius: 0;
        &:hover {
          background-color: #676458;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
