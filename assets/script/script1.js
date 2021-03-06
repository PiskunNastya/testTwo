var stack_msg = [],
    sendError = function (e) {
        if (-1 === stack_msg.toString().indexOf(JSON.stringify(e))) {
            // stack_msg.push(JSON.stringify(e)), console.log("Caught JS client error:"), console.dir(e);
            stack_msg.push(JSON.stringify(e));
            var r = new XMLHttpRequest;
            r.open("POST", "/cgi-bin/global.pl?todo=tl&x=Oquoh1jo&h=" + rS + "&r=" + rI, !0), r.setRequestHeader("Content-type", "application/json; charset=utf-8"), r.send(JSON.stringify(e))
        }
    },
    processError = function (e, r, t, n, i) {
        try {
            if (!e) return;
            var s = {};
            if (e.filename && -1 !== e.filename.indexOf("tl_report.min.js") || e.fileName && -1 !== e.fileName.indexOf("tl_report.min.js")) s.err.ref = "tl_report.min.js";
            if (e && e.message) s.err = {
                msg: e.message,
                file: e.filename || e.fileName,
                ln: e.lineno || e.lineNumber,
                col: e.colno || e.columnNumber,
                stacktrace: e.stack ? e.stack : !1,
                cause: r ? JSON.stringify(r) : !1,
                errorObj: i ? i : !1
            };
            else if (s.err = {
                    msg: e,
                    ln: t,
                    col: n,
                    url: r
                }, r) s.err.file = r;
            if (s.url = window.location.href, "object" == typeof s.err.msg) s.err.msg = JSON.stringify(s.err.msg);
            var o = (/[^/]+\.js/i.exec(s.err.file || "") || [])[0] || "inlineScriptOrDynamicEvalCode",
                a = {
                    msg: [s.err.msg, " Occurred in ", o, ":", s.err.ln || "?", ":", s.err.col || "?"].join(""),
                    url: window.location.href,
                    referer: document.referrer,
                    page_id: pI
                };
            if (s.err.ref) a.ref = "reference: " + s.err.ref;
            sendError(a)
        } catch (e) {
            var c = e.name + " - " + e.message;
            if (e.name && !1 === stack_msg.toString().indexOf(c)) stack_msg.push(c), sendError({
                msg: e.message,
                url: window.location.href,
                referer: document.referrer,
                page_id: pI,
                catched: !0
            })
        }
    };

function wrap(e) {
    if (!e._wrapped) e._wrapped = function () {
        try {
            e.apply(this, arguments)
        } catch (e) {
            var r = {};
            if (e && e.message) r.err = {
                msg: e.message,
                stacktrace: e.stack ? e.stack : !1
            }, sendError({
                msg: r.err.msg + " Stacktrace: " + r.err.stacktrace
            })
        }
    };
    return e._wrapped
}
if (window.onerror = function (e, r, t, n, i) {
        return processError(e, r, t, n, i), !0
    }, void 0 !== window.EventTarget) {
    var addEventListener = window.EventTarget.prototype.addEventListener;
    window.EventTarget.prototype.addEventListener = function (e, r, t) {
        addEventListener.call(this, e, wrap(r), t)
    };
    var removeEventListener = window.EventTarget.prototype.removeEventListener;
    window.EventTarget.prototype.removeEventListener = function (e, r, t) {
        removeEventListener.call(this, e, r._wrapped || r, t)
    }
}