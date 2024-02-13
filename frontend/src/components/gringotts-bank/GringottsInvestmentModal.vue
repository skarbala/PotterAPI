<!-- GringottsInvestmentModal.vue -->
<template>
  <div v-if="isOpen" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ investment.customerName }} Investment Details</h2>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeInvestmentModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="closeInvestmentModal"
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

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
  }
}
</style>
