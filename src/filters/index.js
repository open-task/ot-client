import moment from 'moment/moment'
function change(t) {
    if (t < 10) {
        return "0" + t;
    } else {
        return t;
    }
}
export default {
    isShowThousands: function(num) {
        if (!num || num == '-') {
            return num

        }
        //判断是否有小数点
        var s = num.toString().indexOf(".");
        if (s == -1) { //是整数
            return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + ".00";
        } else { //是小数
            var arr = num.toString().split(".");
            if (arr.length > 1 && arr[1].length < 2) { //一位小数
                return (arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + "." + arr[1] + "0";
            } else { //两位小数
                return (arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + "." + arr[1];
            }
        }

    },
    ldm_thousand: function(num, len = 2) {
        if (!num || num == '-') {
            return num
        }
        //判断是否有小数点
        if (num.toString().includes(".")) {
            //如果是小数
            var arr = num.toString().split(".");
            let integer = (arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                //            let float_part =`${arr[1].slice(0,2)}${(arr[1].length-1)?"":"0"}`
                //分别是取两位小数,补0

            let float_part = `${arr[1].slice(0,len)}`
            return `${integer}.${float_part}`
        } else {
            //如果是整数
            return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + ".00";
        }
    },
    //设置ABC钱包title
   
    dateFormat(value, type) {
        if (value == 0 || value == "" || !value) {
            return "--"
        }
        value = value * 1000
        let time = moment(value).format()
        if (type == 'YMD') {
            return moment(time).format('YYYY-MM-DD')

        }
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    
    timestampToTime: function(timestamp, type) {
        let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
        let D = change(date.getDate()) + '';
        let h = change(date.getHours())
        let m = change(date.getMinutes())
        let s = change(date.getSeconds());

        if (type == 'isShowM') {
            return M + '月' + D + '日 ' + h + m + s;
        }
        if (type == 'labsTime') {
            return Y + '.' + M + '.' + D
        }
        return `${Y}年${M}月${D}日 ${h}:${m}:${s}`;

    },
    isdept(dept, num) {
        let sum = "";
        let regStrs = [
            ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
            ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
            ['^(\\d+\\.\\d{' + dept + '}).+', '$1'] //禁止录入小数点后两位以上
        ];
        for (var i = 0; i < regStrs.length; i++) {
            var reg = new RegExp(regStrs[i][0]);
            sum = num.replace(reg, regStrs[i][1]);
        }
        return sum
    },
    isTime: function(StarTime, endTime) {
        let _this = this;
        let date1 = (new Date()).getTime();
        // let date1 = StarTime * 1000;//开始时间
        let date2 = endTime * 1000; //结束时间
        let total = (date2 - date1) / 1000;
        let day = parseInt(total / (24 * 60 * 60)); //计算整数天数
        let afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
        let hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
        let afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
        let min = parseInt(afterHour / 60); //计算整数分
        let afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数
        if (day < 0 || hour < 0 || min < 0) {
            return '-----'
        }
        return day + '天' + hour + '时' + min + '分'
    },
}