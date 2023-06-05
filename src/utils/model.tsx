import {confirm} from './instance'
import {createApp, defineComponent, onMounted, ref,onUnmounted} from 'vue'
import type {Ref} from "vue";
import {Coordinate} from './config'

let app: any;
let div: any;
import '../assets/model.css'

const confirmObjs: any = {
    autoFocusButton: {
        default: 'ok'
    },
    cancelText: {
        default: '取消'
    },
    centered: {
        default: false
    },
    closable: {
        default: false
    },
    content: {
        default: 'my is confirmAPI'
    },
    mask: {
        default: true
    },
    maskClosable: {
        default: false
    },
    keyboard: {
        default: true
    },
    okText: {
        default: '确定'
    },
    title: {
        default: '标题'
    },
    width: {
        default: 416
    },
    zIndex: {
        default: 1000
    },
    onCancel: {
        default() {
            return ()=>{}
        }
    },
    onOk: {
        default() {
            return ()=>{}
        }
    },
    isShow: {
        default: false
    }
}
const modalStyles = {
    'background': '#fff',
    'position': 'fixed',
    'border-radius': '4px 4px',
    'height': '200px'
}
let n = 1;
const model = defineComponent({
    name: 'model',
    props:{
        ...confirmObjs
    },
    setup(props) {
        const models: Ref<HTMLElement | null> = ref(null);
        function newConfig(event: Event): any {
            if (n == 1) {
                n++;
                const config = new Coordinate(event, models?.value);
                if (props.centered == true || props.centered.default) {
                    return config.moveScanner('go-mover', 'center')
                }
                config.moveScanner('go-mover', 'start')
            }
        }
        function closeModal(e){
            if(props.keyboard.default || props.keyboard == true){
                if(e.keyCode == 27){
                    closeModel(()=>{})
                }
            }
        }
        function maskClick(){
            if(props.maskClosable.default || props.maskClosable == true){
                closeModel(()=>{});
            }
        }
        onMounted(() => {
            n = 1;
            window.addEventListener('click', newConfig)
            window.addEventListener('keydown',closeModal)
        });
        onUnmounted(()=>{
            window.removeEventListener('click',newConfig);
            window.removeEventListener('keydown',closeModal)
        })
        const modalStyle = {...modalStyles, width: (props.width.default || props.width) + 'px', zIndex: (props.zIndex.default || props.zIndex)}
        return () => {
            return (
                <div>
                    <div class={props.mask.default || props.mask ? 'mask' : ''} onClick={maskClick}></div>
                    <div style={modalStyle} class='flex-cloumn' ref={models}>
                        <div>{props.title.default|| props.title }</div>
                        <div>{props.content.default || props.content}</div>
                        <div>
                            <button onClick={()=>closeModel(props.onCancel.default || props.onCancel)}>{props.cancelText.default || props.cancelText}</button>
                            <button onClick={()=>closeModel(props.onOk.default || props.onOk)} style={{'margin-left': '10px'}}>{props.okText.default || props.okText}</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
})
// 定义confirm默认值
export const confirm1 = (confirmObj: confirm): void => {
    for (let key in confirmObj) {
        confirmObjs[key] = confirmObj[key as keyof typeof confirmObj]
    }
    div = document.createElement('div');
    document.body.appendChild(div);
    app = createApp(model,{...confirmObjs})
    app.mount(div);
}

//定义关闭函数
async function closeModel(callback:any) {
    if(callback() instanceof Promise){
        const res = await callback();
    }else{
        callback();
    }
    app.unmount();
    div.remove();
}

export default {}

