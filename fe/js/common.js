define("common", function () {
    let parseURL = url => {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    }
    let url = parseURL(window.location.href);
    let args=url.params;
    args.page = url.segments[0];

    function setCookie(c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    }

    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    function delCookie(name) { //为cookie name
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=a; expires=" + date.toGMTString();
    }

    function changePage(page, args, replace) {
        let argsStr = [];
        for (let i in args) {
            argsStr.push(`${i}=${args[i]}`);
        }
        argsStr.join("&");
        let targetUrl = `${location.origin}/${page}?${argsStr}`;
        if (replace) {
            location.replace(targetUrl)
        } else {
            location.href = targetUrl;
        }

    }
    let initPage = () => {

    };
    let exports = {
        initPage,
        parseURL,
        args,
        url,
        setCookie,
        getCookie,
        delCookie,
    }
    return exports;
})