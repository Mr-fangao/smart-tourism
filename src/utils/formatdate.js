/**
 Usage:
 var formatter = new DateFormatter('yyyy-MM-dd HH:mm:ss 星期w');
 formatter.format(new Date(1409894060000))

 2014-09-05 13:14:20 星期五
 */
 function DateFormatter(/* string */fmt) {
    this.fmt = fmt;
}

DateFormatter.prototype.format = function(/* Date */ t) {
    const date = {
        "M+": t.getMonth() + 1,
        "d+": t.getDate(),
        "[H|h]+": t.getHours(),
        "m+": t.getMinutes(),
        "s+": t.getSeconds(),
        "q+": Math.floor((t.getMonth()+3) / 3),
        "S+": t.getMilliseconds(),
        "w": ['日', '一', '二', '三', '四', '五', '六'][t.getDay()]
    };
    let format = this.fmt;
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

module.exports = DateFormatter;
