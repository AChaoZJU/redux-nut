export function compose(...funcs) {
    if(funcs.length === 0) {
        return arg => arg
    }
    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a,b) => (...args) => a(b(...args)))
}
//
// var f1 = () => (args) => { console.log('omg1',args); return 'omg1'}
// var f2 = () => (args) => { console.log('omg2',args); return 'omg2'}
// var f3 = () => (args) => { console.log('omg3',args); return 'omg3'}
// var DD = (args) => { console.log('DD',args); return 'DD'}
// console.log((compose(f1, f2, f3)(DD))('QQQ'))

