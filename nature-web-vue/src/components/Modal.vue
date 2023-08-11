<template>
  <div className="modal-container">
    <div className="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
          <slot name="title"></slot>
        </h5>
        <!-- <button type="button" class="close"> -->
        <span className="btn btn-close" @click="onClose">&times;</span>
        <!-- </button> -->
      </div>
      <div className="modal-body">
        <slot name="body"></slot>
      </div>
      <span className="modal-footer">
        <slot name="footer"></slot>
      </span>
    </div>

  </div>
</template>
<script>

export default {
  setup(props, context) {
    const onClose = () => {
      context.emit("close");
    }

    return {
      onClose
    }
  }
}
</script>
<style scoped>
.modal-container {
  position: fixed;
  /* Stay in place */
  z-index: 100;
  /* Sit on top */
  padding-top: 100px;
  /* Location of the box */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  height: 30px;
  margin: 0 1px 3px 1px;
}

.modal-body {
  /* width: 80%; */
  height: calc(100vh - 200px);
  padding: 30px;
  margin: 0 auto;
  border: 1px solid #777;
  background-color: #fff;
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.btn.btn-close {
  float: right;
  font-weight: bold;
  color: black;
  text-align: center;
  font-size: 25px;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  position: absolute;
  right: 10px;
}
</style>