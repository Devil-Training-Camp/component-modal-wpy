export interface confirm{
    autoFocusButton?:null | string, //指定自动获得焦点的按钮
    cancelText?:string, // 取消按钮文字
    centered?:boolean, // 垂直居中展示 Modal
    closable?:boolean, // 是否显示右上角的关闭按钮
    class?:string, // 容器类名
    content?:string, // 内容
    icon?:string,
    mask?:boolean, // 是否显示遮罩
    maskClosable?:boolean, // 点击蒙层是否关闭
    keyboard?:boolean, // 是否支持键盘esc关闭
    okText?:string,//确认按钮文字
    okType?:string, // 确认按钮类型
    title?: string, //标题
    width?:string | number, //宽度
    zIndex?:number, // 设置Modal的z-index
    onCancel?: any, 	// 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭
    onOk?:any, // 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭
}
interface Content{
    ():void
}
interface Element{
    (node:string):HTMLElement
}
export interface Model{
    afterClose?:Function,
    bodyStyle?:object,
    cancelText?:string,
    centered?:boolean,
    closable?:boolean,
    confirmLoading?:boolean,
    destroyOnClose?:boolean,
    footer?:string,
    forceRender?:boolean,
    getContainer?:Element | string,
    keyboard?:boolean,
    mask?:boolean,
    maskClosable?:boolean,
    maskStyle?:object,
    okText?:string,
    okType?:string,
    title?:string,
    visible?:boolean,
    width?:string | number,
    wrapClassName?:string,
    zIndex?:number,
    dialogStyle?:object,
    dialogClass?:string
}
