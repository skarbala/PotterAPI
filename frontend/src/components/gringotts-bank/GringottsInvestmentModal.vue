<!-- GringottsInvestmentModal.vue -->
<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <h2>{{ investment.customerName }} Investment Details</h2>
      <!-- Display other investment details here -->
      <button @click="closeInvestmentModal">Close</button>
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
