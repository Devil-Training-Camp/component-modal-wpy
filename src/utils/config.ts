export const propsObj= {
    cancelText : '取消',
    centered : false,
    closable : true,
    confirmLoading : false,
    destroyOnClose : false,
    footer:'',
    forceRender : false,
    keyboard : true,
    mask : true,
    maskClosable : true,
    okText : '确定',
    okType : 'primary',
    title : '无',
    width : 520,
    zIndex : 1000,
    getContainer:'body',
    autoFocusButton:'ok',
    dialogStyle:{},
}
let transType = '';
let displayObj = {};
// 策略模式可以优化
let transObj:any = {
    'start':function (){
        this.moveStart('start')
        if(JSON.stringify(displayObj) == "{}"){
            this.node.style.setProperty('--x1',`${window.innerWidth / 2 - this.node.scrollWidth / 2}px`);
            this.node.style.setProperty('--y1',`${15}%`);
        }
    },
    'end':function (){
        this.moveEndBegin(transType)
        this.node.style.setProperty('--x1',`${this.left - this.node.scrollWidth / 2 + 50}px`);
        this.node.style.setProperty('--y1',`${this.top - this.node.scrollHeight / 2}px`)
    },
    'center':function (){
        this.moveStart('center')
        this.node.style.setProperty('--x1',`${window.innerWidth / 2 - this.node.scrollWidth / 2}px`);
        this.node.style.setProperty('--y1',`${window.innerHeight / 2 - this.node.scrollHeight / 2}px`);
    }
}
//可以优化
export class Coordinate{
    readonly left: number
    readonly top: number
    private node:HTMLElement;
    readonly displayStyle:object
    constructor(eventTarget:Event,node:HTMLElement,displayStyle:object = {}) {
        this.left = (eventTarget.target as HTMLInputElement).offsetLeft;
        this.top = (eventTarget.target as HTMLInputElement).offsetTop;
        this.node = node
        this.displayStyle = displayStyle
    }
    moveScanner(className:string,type:any){
        this.node.classList.add(className)
        transObj[type].call(this);
    }
    moveStart(type:string){
        transType = type
        if(type == 'center' && JSON.stringify(this.displayStyle) != '{}'){
            throw new Error('centered and dialogStyle origin 1 but 2')
        }else{
            this.node.style.setProperty('--x',`${this.left - this.node.scrollWidth / 2 - 80}px`);
            this.node.style.setProperty('--y',`${this.top - this.node.scrollHeight / 2 - 50}px`);
        }
        displayObj = this.displayStyle;
        if(JSON.stringify(this.displayStyle) != '{}'){
            for(let key in this.displayStyle){
                let objKey:string = JSON.stringify(key);
                if(objKey == 'left'){
                    this.node.style.setProperty('--x1',(this.displayStyle as any).left && `${this.left - this.node.scrollWidth / 2 - 80}px`);
                    continue
                }
                if (objKey == 'top'){
                    this.node.style.setProperty('--y1',(this.displayStyle as any).top && `${this.top - this.node.scrollHeight / 2 - 50}px`);
                    continue
                }
                (this.node.style as any).objKey = (this.displayStyle as any).objKey;
            }

        }
    }
    moveEndBegin(type:string){
        if(type == 'start'){
            this.node.style.setProperty('--x',`${window.innerWidth / 2 - this.node.scrollWidth / 2}px`);
            this.node.style.setProperty('--y',`${15}%`)
        }else{
            this.node.style.setProperty('--x',`${window.innerWidth / 2 - this.node.scrollWidth / 2}px`);
            this.node.style.setProperty('--y',`${window.innerHeight / 2 - this.node.scrollHeight / 2}px`);
        }
    }
}