<template>
  <div class="modal" v-if="visible">
    <div class="modal-mask" @click="close"></div>
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"></slot>
          <button class="modal-close" @click="close">×</button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="close">OK</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
}

.modal-container {
  width: 400px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
}

.modal-close {
  border: none;
  background-color: transparent;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  padding: 16px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #e8e8e8;
}

.modal-default-button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}
</style>