<template>
  <!--  蒙层-->
  <Teleport :to="props.getContainer" :disabled="props.destroyOnClose">
    <div class="mask" v-if="mask && props.visible" @click="throwSet('cancel',$event)"
    :style="props.maskStyle"></div>
    <!--   对话框-->
    <Transition  type="animation" name="modal" @before-leave="onLeave" @after-enter="onAfterEnter"
                 @after-leave="onAfterLeave">
      <div  class="model" style="--y:200px;--x:200px;--y1:200px;--x1:200px"
            :style="{width:props.width + 'px',zIndex:props.zIndex}" ref="models"
            v-if="props.visible">
        <!--头部-->
        <div class="header-nav">
          <div>{{ props.title }}</div>
          <slot name="closeIcon" v-if="props.closable">
            <div @click="throwSet('cancel',$event)">X</div>
          </slot>
        </div>
        <!--内容-->
        <div style="padding: 30px 20px">
          <slot></slot>
        </div>
        <!--      底部-->
        <slot name="footer" v-if="props.footer !== null">
          <div v-if="props.footer != ''" v-html="props.footer" class="footer"></div>
          <div class="footer" v-else>
            <button @click="throwSet('cancel',$event)" ref="butCancel">{{ props.cancelText }}</button>
            <button @click="throwSet('ok',$event)" ref="butOk">{{ props.okText }}</button>
          </div>
        </slot>
      </div>
    </Transition>

  </Teleport>
</template>

<script setup lang="ts">
import { defineEmits, watch, nextTick, withDefaults, defineProps, ref, getCurrentInstance } from 'vue'
import {propsObj} from "../utils/config";
let event:Event;
let downEvent:Event;
let n = 1;
//弹框实例
const models = ref();
//取消实例
const butCancel = ref();
//确定实例
const butOk = ref();
//强制刷新
const upload = getCurrentInstance()
//从全局下获取到config实例对象
const anitionsConfig = getCurrentInstance()?.appContext.config.globalProperties.$moveModel;
interface Model {
  afterClose?: any,
  bodyStyle?: object,
  cancelText?: string,
  centered?: boolean,
  closable?: boolean,
  confirmLoading?: boolean,
  destroyOnClose?: boolean,
  footer?: object | string,
  forceRender?: boolean,
  getContainer?: Element | string,
  keyboard?: boolean,
  mask?: boolean,
  maskClosable?: boolean,
  maskStyle?: object,
  okText?: string,
  okType?: string,
  title?: string,
  visible?: boolean,
  width?: string | number,
  wrapClassName?: string,
  zIndex?: number,
  dialogStyle?: object | string,
  dialogClass?: string
  autoFocusButton?:null | string,
}
const props = withDefaults(defineProps<Model>(), {
  ...propsObj
})
const emit = defineEmits([ 'ok', 'cancel'])
//给window绑定键盘事件用于监听ESC关闭
function clearKeyCode(event:Event):any{
  if (event.keyCode == 27) {
    if (props.visible) throwSet('cancel',event);
  }
}
//window绑定点击事件用于获取当前点击元素的位置来触发开始动画
function newConfig(event:Event):any{
  if(n == 1){
    n++;
    downEvent = event;
    const config = new anitionsConfig(event,models?.value,props.dialogStyle);
    if(props.centered){
      return config.moveScanner('go-mover','center')
    }
    config.moveScanner('go-mover','start')
  }
}
//向子组件抛事件的回调
function throwSet(type:any,$event:Event) {
  if(($event.target as HTMLInputElement).classList.contains('mask')){
    if (!props.maskClosable) return
  }
  event=$event
  emit(type)
}
let configClose:any; // 保存离开时的实例
//动画进入完成时的回调
function onAfterEnter(){
  configClose = new anitionsConfig(downEvent, models.value);
}
//监听动画离开回调
function onLeave(){
  configClose.moveScanner('out-mover','end');
}
//Modal 完全关闭后的回调
function onAfterLeave(){
  if(typeof props.afterClose == 'function'){
    props.afterClose();
  }
}
watch(()=>props.visible,(val)=>{
  if(val){
    nextTick(()=>{
      if(props.forceRender){
        upload?.proxy?.$forceUpdate();
      }
      if(props.autoFocusButton == 'ok'){
        butOk?.value.focus();
      }else if(props.autoFocusButton == 'cancel'){
        butCancel?.value.focus();
      }
      if (props.keyboard) window.addEventListener('keydown',clearKeyCode)
      window.addEventListener('click',newConfig)
    })
  }else{
    n = 1;
    window.removeEventListener('click',newConfig);
    window.removeEventListener('keydown',clearKeyCode)
  }
},{deep:true})
</script>