<template>
  <div>{{shallObj.count}}</div>
<button @click="count" class="btnRose">点击弹框</button>
  <baseType></baseType>
</template>

<script setup>
import {getCurrentInstance,shallowRef,triggerRef} from 'vue'
const confirm = getCurrentInstance().appContext.config.globalProperties.$confirm;
import baseType from './components/baseType.vue'
function showMoadl(){
  confirm({
    onOk(){
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    content:'张三',
    centered:true
  });
}

const shallObj = shallowRef({count:0});
function count(){
  shallObj.value.count++;
  triggerRef(shallObj);
}
</script>

<style scoped>
.btnRose{
  position: fixed;
  top: 70%;
  left: 0;
}
</style>