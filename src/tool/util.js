

let util = {
    /**
     * 对象深度比较
     */
    isEqual(obj1, obj2){
        if(!util.isObject(obj1) || !util.isObject(obj2)){
            return obj1 === obj2
        }
        if(obj1 === obj2){
            return true
        }
        // 两个都是对象，而且不相等
        // 1.先取出obj1和obj2的keys，比较个数
        const obj1keys = Object.keys(obj1)
        const obj2keys = Object.keys(obj2)
        if(obj1keys.length !== obj2keys.length){
            return false
        }
        // 2.以obj1为基准，和obj2 递归比较
        for(let key in obj1){
            // 比较当前key的val  -- 递归
            const res = util.isEqual(obj1[key], obj2[key])
            if(!res){
                return false
            }
        }
        // 3.全相等
        return true
    },
    /**
     * queryString 获取Url参数
     */
    queryString(key){
        const search = location.search.substr(1)
        // search: 'a=10&b=20&c=30'
        const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`,'i')
        const res = search.match(reg)
        if(res === null){
            return null
        }
        return res[2]
    },
    queryStringTwo(key){
        const search = location.search.substr(1)
        const searchArr = search.split('&')
        let val = ''
        for(let v of searchArr){
            let varr = v.split('=')
            if(varr[0] === key){
                val = varr[1]
                break;
            }
        }
        return val
    },
    queryStringNew(key){
        const search = location.search
        const p = new URLSearchParams(search)
        return p.get(key)
    },
    /**
     * 数组拍平 
     */
    flat(arr){
        // 验证arr中，还有没有深层次的数组 [1,2,[3,4]]
        const isDeep = arr.some(item => item instanceof Array)
        if(!isDeep){
            return arr
        }

        const res = Array.prototype.concat.apply([],arr)
        return util.flat(res) //递归
    },
    /**
     * 数组去重
     */
    unique(arr){
        const res = []
        arr.forEach(item => {
            if(res.indexOf(item) < 0){
                res.push(item)
            }
        })
        return res
    },
    uniqueNew(arr){
        const set = new Set(arr)
        return [...set]
    },
    /**
     * 数组深拷贝
     */
    deepClone(obj = {}){
        if(typeof obj !== 'object' || obj == null){
            // obj是null，或者不是对象和数组，直接返回
            return obj
        }

        // 初始化返回结果
        let res
        if(obj instanceof Array){
            res = []
        }else{
            res = {}
        }

        for(let key in obj){
            // 保证key不是原型的属性
            if(obj.hasOwnProperty(key)){
                // 递归调用
                res[key] = util.deepClone(obj[key])
            }
        }

        // 返回结果
        return res
    },
    /**
     * 防抖：用户操作结束或暂停时，触发 debounce 
     */
    debounce(fn, delay = 500){
        // Timer是在闭包中的
        let timer = null

        return function () {
            if(timer){
               clearTimeout(timer) 
            }
            timer = setTimeout(() => {
                fn.apply(this, arguments)
                timer = null
            }, delay);
        }
    },
    /**
     * 节流 保持一个频率连续触发 throttle
     */
    throttle(fn,delay){

        let timer = null

        return function () {
            if(timer){
                return
            }
            timer = setTimeout(() => {
                console.log(delay,'3333333')
                fn.apply(this,arguments)
                timer = null
            }, delay);
        }

    }

}

/**
 * 类型判断
 */
~['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp', 'NaN', 'Infinite', 'Storage'].forEach(function(t) {
    util['is' + t] = function(o) {
        return Object.prototype.toString.call(o).slice(8, -1).toLowerCase() === t.toLowerCase();
    };
});

export default util