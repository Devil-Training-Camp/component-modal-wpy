<template>

</template>

<script setup lang="ts">
//基础类型
// 布尔值
let isDone: boolean = false;
// 数字
let binaryLiteral: number = 1;
//字符串
let names: string = 'bob';
//string类型也可以接受模板字符串
// 数组
// 有两种方法可以定义数组
// 第一种:可以在元素类型后面接上[]
let list: number[] = [1, 2, 3]
// 第二种方式使用数组泛型
let list2: Array<number> = [1, 3, 3, 4, 4];
/**
 * 元组
 * 元组类型允许表示一个已知元素数量和类型的数组，
 * 各元素的类型不必相同,比如。你可以定义一对值分别为string和number类型的元组
 * */
// 栗子
let x: [string, number];
x = ['hello', 10];

/**
 * 枚举
 * enum类型是对javascript标准数据类型的一个补充,使用枚举类型可以
 * 为一组数值赋予友好的名字
 * 默认情况下,从0开始为元素编号，你也可以手动的指定成员的数值
 * */
enum Color {
  Red='red',
  Green=3,
  Blue,
}
let c:Color = Color.Red
let b:Color = Color.Green
console.log(c)
console.log(b)

//任意值
let D: any = 3;
//逃避类型检测机制

/**
 * 空值
 * 某种程度上来说,void类型像是与any类型相反，它表示没有任何类型。当一个函数没有返回值时
 * 你通常会见到其返回值类型是void
 * */
function warnUser(): void{
  alert('this is my warning message');
}

// Null和Undefined
// ts里,undefined和null两者各自有自己的类型分别叫做
// undefined和null。和void相似


/**
 * Never
 * never类型表示的是那些用不存在值的类型。例如，never类型是那些总是会抛出
 * 异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
 * */

</script>