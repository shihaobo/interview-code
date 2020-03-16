
/**
 * 1
 */
const res1 = [10, 20, 10].map(parseInt)
console.log(res1) //[10, NaN, 2]

/**
 * 2、手写字符串trim
 */
String.prototype.trim = function () {
    return this.replace(/^\s+/,'').replace(/\s+$/,'')
}

/**
 * 手写bind函数
 */
Function.prototype.bind1 = function(){
    // 将参数拆分为数组
    const args = Array.prototype.slice.call(arguments)

    // 获取 this 数组第一项
    const t = args.shift()
    console.log(t,'ttt')

    // f1.bind(...)中的f1
    const self = this;
    // 返回一个函数
    return function(){
        return self.apply(t,args)
    }
}

function fn1(a, b, c){
    console.log('this', this)
    console.log(a, b, c)
    return 'this is fn1'
}
const fn2 = fn1.bind1({x :100}, 10 ,20, 30)
let res2 = fn2()

var ipt1 = document.querySelectorAll('input')[0]
var div1 = document.querySelectorAll('#div1')[0]
