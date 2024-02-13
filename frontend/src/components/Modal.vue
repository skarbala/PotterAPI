 <template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h2 name="header">{{ spell.spell }}</h2>
        </div>

        <div class="modal-body">
          <h3 name="body">{{ spell.effect }}</h3>
          <h4 class="body">{{ spell.type }}</h4>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button btn-block btn" @click="close">
              Close
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: ["spell"],

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped >
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  text-align: center;
  width: 900px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #822724;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.2s ease-in-out;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h2 {
  margin: 0 auto;
  color: white;
  font-family: "Harry", serif;
  font-size: 6em;
}

.modal-body {
  margin: 20px 0;
  color: white;
  font-family: "Lora", serif;
}
.modal-body h3 {
  margin-bottom: 20px;
}
.modal-body h4 {
  font-family: "Kanit", serif;
  font-size: 1.5em;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
}

.modal-default-button {
  font-family: "Harry", serif;
  font-size: 2em;
  color: white;
  background-color: transparent;
}
.modal-default-button:active,
.modal-default-button:focus {
  outline: none;
  border: none;
  box-shadow: none;
}
</style>
