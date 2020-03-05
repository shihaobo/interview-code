

let util = {

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