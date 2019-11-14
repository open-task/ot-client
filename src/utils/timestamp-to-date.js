
function toDouble(n) {
    return (n < 10 ? '0' : '') + n;
}
export default function timestampToDate(stamp) {
    let d = new Date( stamp * 1000 );
    return d.getFullYear() + "-" +
        toDouble(d.getMonth() + 1) + "-" +
        toDouble(d.getDate()) + " " +
        toDouble(d.getHours()) + ":" + 
        toDouble(d.getMinutes()) + ":" + 
        toDouble(d.getSeconds())
}