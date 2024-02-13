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
            </div>

            <div class="col">
              <p>Risk: {{ investment.fund.risk }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <p>Name: {{ investment.customerName }}</p>
              <p>Investment: {{ investment.oneTimeInvestment }}</p>
            </div>
            <div class="col"></div>
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
    width: 1000px;
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
