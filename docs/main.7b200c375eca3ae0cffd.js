(window.webpackJsonp = window.webpackJsonp || []).push([[1], {
    "+SKG": function(e, t) {
        e.exports = function(e) {
            return n && global.Buffer.isBuffer(e) || r && (e instanceof global.ArrayBuffer || o(e))
        }
        ;
        var n = "function" == typeof global.Buffer && "function" == typeof global.Buffer.isBuffer
          , r = "function" == typeof global.ArrayBuffer
          , o = r && "function" == typeof global.ArrayBuffer.isView ? global.ArrayBuffer.isView : function(e) {
            return e.buffer instanceof global.ArrayBuffer
        }
    },
    0: function(e, t, n) {
        e.exports = n("zUnb")
    },
    "0z79": function(e, t, n) {
        var r = n("AdPF")
          , o = n("CUme")
          , s = n("cpc2")
          , i = n("Yvos")
          , a = n("HjK1")("engine.io-client:polling-xhr");
        function l() {}
        function c(e) {
            if (o.call(this, e),
            this.requestTimeout = e.requestTimeout,
            this.extraHeaders = e.extraHeaders,
            global.location) {
                var t = "https:" === location.protocol
                  , n = location.port;
                n || (n = t ? 443 : 80),
                this.xd = e.hostname !== global.location.hostname || n !== e.port,
                this.xs = e.secure !== t
            }
        }
        function u(e) {
            this.method = e.method || "GET",
            this.uri = e.uri,
            this.xd = !!e.xd,
            this.xs = !!e.xs,
            this.async = !1 !== e.async,
            this.data = void 0 !== e.data ? e.data : null,
            this.agent = e.agent,
            this.isBinary = e.isBinary,
            this.supportsBinary = e.supportsBinary,
            this.enablesXDR = e.enablesXDR,
            this.requestTimeout = e.requestTimeout,
            this.pfx = e.pfx,
            this.key = e.key,
            this.passphrase = e.passphrase,
            this.cert = e.cert,
            this.ca = e.ca,
            this.ciphers = e.ciphers,
            this.rejectUnauthorized = e.rejectUnauthorized,
            this.extraHeaders = e.extraHeaders,
            this.create()
        }
        function h() {
            for (var e in u.requests)
                u.requests.hasOwnProperty(e) && u.requests[e].abort()
        }
        e.exports = c,
        e.exports.Request = u,
        i(c, o),
        c.prototype.supportsBinary = !0,
        c.prototype.request = function(e) {
            return (e = e || {}).uri = this.uri(),
            e.xd = this.xd,
            e.xs = this.xs,
            e.agent = this.agent || !1,
            e.supportsBinary = this.supportsBinary,
            e.enablesXDR = this.enablesXDR,
            e.pfx = this.pfx,
            e.key = this.key,
            e.passphrase = this.passphrase,
            e.cert = this.cert,
            e.ca = this.ca,
            e.ciphers = this.ciphers,
            e.rejectUnauthorized = this.rejectUnauthorized,
            e.requestTimeout = this.requestTimeout,
            e.extraHeaders = this.extraHeaders,
            new u(e)
        }
        ,
        c.prototype.doWrite = function(e, t) {
            var n = this.request({
                method: "POST",
                data: e,
                isBinary: "string" != typeof e && void 0 !== e
            })
              , r = this;
            n.on("success", t),
            n.on("error", function(e) {
                r.onError("xhr post error", e)
            }),
            this.sendXhr = n
        }
        ,
        c.prototype.doPoll = function() {
            a("xhr poll");
            var e = this.request()
              , t = this;
            e.on("data", function(e) {
                t.onData(e)
            }),
            e.on("error", function(e) {
                t.onError("xhr poll error", e)
            }),
            this.pollXhr = e
        }
        ,
        s(u.prototype),
        u.prototype.create = function() {
            var e = {
                agent: this.agent,
                xdomain: this.xd,
                xscheme: this.xs,
                enablesXDR: this.enablesXDR
            };
            e.pfx = this.pfx,
            e.key = this.key,
            e.passphrase = this.passphrase,
            e.cert = this.cert,
            e.ca = this.ca,
            e.ciphers = this.ciphers,
            e.rejectUnauthorized = this.rejectUnauthorized;
            var t = this.xhr = new r(e)
              , n = this;
            try {
                a("xhr open %s: %s", this.method, this.uri),
                t.open(this.method, this.uri, this.async);
                try {
                    if (this.extraHeaders)
                        for (var o in t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0),
                        this.extraHeaders)
                            this.extraHeaders.hasOwnProperty(o) && t.setRequestHeader(o, this.extraHeaders[o])
                } catch (s) {}
                if ("POST" === this.method)
                    try {
                        t.setRequestHeader("Content-type", this.isBinary ? "application/octet-stream" : "text/plain;charset=UTF-8")
                    } catch (s) {}
                try {
                    t.setRequestHeader("Accept", "*/*")
                } catch (s) {}
                "withCredentials"in t && (t.withCredentials = !0),
                this.requestTimeout && (t.timeout = this.requestTimeout),
                this.hasXDR() ? (t.onload = function() {
                    n.onLoad()
                }
                ,
                t.onerror = function() {
                    n.onError(t.responseText)
                }
                ) : t.onreadystatechange = function() {
                    if (2 === t.readyState)
                        try {
                            var e = t.getResponseHeader("Content-Type");
                            n.supportsBinary && "application/octet-stream" === e && (t.responseType = "arraybuffer")
                        } catch (s) {}
                    4 === t.readyState && (200 === t.status || 1223 === t.status ? n.onLoad() : setTimeout(function() {
                        n.onError(t.status)
                    }, 0))
                }
                ,
                a("xhr data %s", this.data),
                t.send(this.data)
            } catch (s) {
                return void setTimeout(function() {
                    n.onError(s)
                }, 0)
            }
            global.document && (this.index = u.requestsCount++,
            u.requests[this.index] = this)
        }
        ,
        u.prototype.onSuccess = function() {
            this.emit("success"),
            this.cleanup()
        }
        ,
        u.prototype.onData = function(e) {
            this.emit("data", e),
            this.onSuccess()
        }
        ,
        u.prototype.onError = function(e) {
            this.emit("error", e),
            this.cleanup(!0)
        }
        ,
        u.prototype.cleanup = function(e) {
            if (null != this.xhr) {
                if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = l : this.xhr.onreadystatechange = l,
                e)
                    try {
                        this.xhr.abort()
                    } catch (t) {}
                global.document && delete u.requests[this.index],
                this.xhr = null
            }
        }
        ,
        u.prototype.onLoad = function() {
            var e;
            try {
                var t;
                try {
                    t = this.xhr.getResponseHeader("Content-Type")
                } catch (n) {}
                e = "application/octet-stream" === t && this.xhr.response || this.xhr.responseText
            } catch (n) {
                this.onError(n)
            }
            null != e && this.onData(e)
        }
        ,
        u.prototype.hasXDR = function() {
            return void 0 !== global.XDomainRequest && !this.xs && this.enablesXDR
        }
        ,
        u.prototype.abort = function() {
            this.cleanup()
        }
        ,
        u.requestsCount = 0,
        u.requests = {},
        global.document && (global.attachEvent ? global.attachEvent("onunload", h) : global.addEventListener && global.addEventListener("beforeunload", h, !1))
    },
    1: function(e, t) {},
    "14A5": function(e, t) {
        var n = void 0 !== n ? n : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder
          , r = function() {
            try {
                return 2 === new Blob(["hi"]).size
            } catch (e) {
                return !1
            }
        }()
          , o = r && function() {
            try {
                return 2 === new Blob([new Uint8Array([1, 2])]).size
            } catch (e) {
                return !1
            }
        }()
          , s = n && n.prototype.append && n.prototype.getBlob;
        function i(e) {
            return e.map(function(e) {
                if (e.buffer instanceof ArrayBuffer) {
                    var t = e.buffer;
                    if (e.byteLength !== t.byteLength) {
                        var n = new Uint8Array(e.byteLength);
                        n.set(new Uint8Array(t,e.byteOffset,e.byteLength)),
                        t = n.buffer
                    }
                    return t
                }
                return e
            })
        }
        function a(e, t) {
            t = t || {};
            var r = new n;
            return i(e).forEach(function(e) {
                r.append(e)
            }),
            t.type ? r.getBlob(t.type) : r.getBlob()
        }
        function l(e, t) {
            return new Blob(i(e),t || {})
        }
        "undefined" != typeof Blob && (a.prototype = Blob.prototype,
        l.prototype = Blob.prototype),
        e.exports = r ? o ? Blob : l : s ? a : void 0
    },
    "2Dig": function(e, t) {
        e.exports = function(e, t, n) {
            return e.on(t, n),
            {
                destroy: function() {
                    e.removeListener(t, n)
                }
            }
        }
    },
    "2pII": function(e, t, n) {
        var r = n("akSB")
          , o = n("cpc2")
          , s = n("HjK1")("engine.io-client:socket")
          , i = n("7jRU")
          , a = n("Wm4p")
          , l = n("Uxeu")
          , c = n("TypT");
        function u(e, t) {
            if (!(this instanceof u))
                return new u(e,t);
            t = t || {},
            e && "object" == typeof e && (t = e,
            e = null),
            e ? (e = l(e),
            t.hostname = e.host,
            t.secure = "https" === e.protocol || "wss" === e.protocol,
            t.port = e.port,
            e.query && (t.query = e.query)) : t.host && (t.hostname = l(t.host).host),
            this.secure = null != t.secure ? t.secure : global.location && "https:" === location.protocol,
            t.hostname && !t.port && (t.port = this.secure ? "443" : "80"),
            this.agent = t.agent || !1,
            this.hostname = t.hostname || (global.location ? location.hostname : "localhost"),
            this.port = t.port || (global.location && location.port ? location.port : this.secure ? 443 : 80),
            this.query = t.query || {},
            "string" == typeof this.query && (this.query = c.decode(this.query)),
            this.upgrade = !1 !== t.upgrade,
            this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/",
            this.forceJSONP = !!t.forceJSONP,
            this.jsonp = !1 !== t.jsonp,
            this.forceBase64 = !!t.forceBase64,
            this.enablesXDR = !!t.enablesXDR,
            this.timestampParam = t.timestampParam || "t",
            this.timestampRequests = t.timestampRequests,
            this.transports = t.transports || ["polling", "websocket"],
            this.transportOptions = t.transportOptions || {},
            this.readyState = "",
            this.writeBuffer = [],
            this.prevBufferLen = 0,
            this.policyPort = t.policyPort || 843,
            this.rememberUpgrade = t.rememberUpgrade || !1,
            this.binaryType = null,
            this.onlyBinaryUpgrades = t.onlyBinaryUpgrades,
            this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}),
            !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
            this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
            this.pfx = t.pfx || null,
            this.key = t.key || null,
            this.passphrase = t.passphrase || null,
            this.cert = t.cert || null,
            this.ca = t.ca || null,
            this.ciphers = t.ciphers || null,
            this.rejectUnauthorized = void 0 === t.rejectUnauthorized || t.rejectUnauthorized,
            this.forceNode = !!t.forceNode;
            var n = "object" == typeof global && global;
            n.global === n && (t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders),
            t.localAddress && (this.localAddress = t.localAddress)),
            this.id = null,
            this.upgrades = null,
            this.pingInterval = null,
            this.pingTimeout = null,
            this.pingIntervalTimer = null,
            this.pingTimeoutTimer = null,
            this.open()
        }
        e.exports = u,
        u.priorWebsocketSuccess = !1,
        o(u.prototype),
        u.protocol = a.protocol,
        u.Socket = u,
        u.Transport = n("Gbct"),
        u.transports = n("akSB"),
        u.parser = n("Wm4p"),
        u.prototype.createTransport = function(e) {
            s('creating transport "%s"', e);
            var t = function(e) {
                var t = {};
                for (var n in e)
                    e.hasOwnProperty(n) && (t[n] = e[n]);
                return t
            }(this.query);
            t.EIO = a.protocol,
            t.transport = e;
            var n = this.transportOptions[e] || {};
            return this.id && (t.sid = this.id),
            new r[e]({
                query: t,
                socket: this,
                agent: n.agent || this.agent,
                hostname: n.hostname || this.hostname,
                port: n.port || this.port,
                secure: n.secure || this.secure,
                path: n.path || this.path,
                forceJSONP: n.forceJSONP || this.forceJSONP,
                jsonp: n.jsonp || this.jsonp,
                forceBase64: n.forceBase64 || this.forceBase64,
                enablesXDR: n.enablesXDR || this.enablesXDR,
                timestampRequests: n.timestampRequests || this.timestampRequests,
                timestampParam: n.timestampParam || this.timestampParam,
                policyPort: n.policyPort || this.policyPort,
                pfx: n.pfx || this.pfx,
                key: n.key || this.key,
                passphrase: n.passphrase || this.passphrase,
                cert: n.cert || this.cert,
                ca: n.ca || this.ca,
                ciphers: n.ciphers || this.ciphers,
                rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
                perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
                extraHeaders: n.extraHeaders || this.extraHeaders,
                forceNode: n.forceNode || this.forceNode,
                localAddress: n.localAddress || this.localAddress,
                requestTimeout: n.requestTimeout || this.requestTimeout,
                protocols: n.protocols || void 0
            })
        }
        ,
        u.prototype.open = function() {
            var e;
            if (this.rememberUpgrade && u.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket"))
                e = "websocket";
            else {
                if (0 === this.transports.length) {
                    var t = this;
                    return void setTimeout(function() {
                        t.emit("error", "No transports available")
                    }, 0)
                }
                e = this.transports[0]
            }
            this.readyState = "opening";
            try {
                e = this.createTransport(e)
            } catch (n) {
                return this.transports.shift(),
                void this.open()
            }
            e.open(),
            this.setTransport(e)
        }
        ,
        u.prototype.setTransport = function(e) {
            s("setting transport %s", e.name);
            var t = this;
            this.transport && (s("clearing existing transport %s", this.transport.name),
            this.transport.removeAllListeners()),
            this.transport = e,
            e.on("drain", function() {
                t.onDrain()
            }).on("packet", function(e) {
                t.onPacket(e)
            }).on("error", function(e) {
                t.onError(e)
            }).on("close", function() {
                t.onClose("transport close")
            })
        }
        ,
        u.prototype.probe = function(e) {
            s('probing transport "%s"', e);
            var t = this.createTransport(e, {
                probe: 1
            })
              , n = !1
              , r = this;
            function o() {
                r.onlyBinaryUpgrades && (n = n || !this.supportsBinary && r.transport.supportsBinary),
                n || (s('probe transport "%s" opened', e),
                t.send([{
                    type: "ping",
                    data: "probe"
                }]),
                t.once("packet", function(o) {
                    if (!n)
                        if ("pong" === o.type && "probe" === o.data) {
                            if (s('probe transport "%s" pong', e),
                            r.upgrading = !0,
                            r.emit("upgrading", t),
                            !t)
                                return;
                            u.priorWebsocketSuccess = "websocket" === t.name,
                            s('pausing current transport "%s"', r.transport.name),
                            r.transport.pause(function() {
                                n || "closed" !== r.readyState && (s("changing transport and sending upgrade packet"),
                                d(),
                                r.setTransport(t),
                                t.send([{
                                    type: "upgrade"
                                }]),
                                r.emit("upgrade", t),
                                t = null,
                                r.upgrading = !1,
                                r.flush())
                            })
                        } else {
                            s('probe transport "%s" failed', e);
                            var i = new Error("probe error");
                            i.transport = t.name,
                            r.emit("upgradeError", i)
                        }
                }))
            }
            function i() {
                n || (n = !0,
                d(),
                t.close(),
                t = null)
            }
            function a(n) {
                var o = new Error("probe error: " + n);
                o.transport = t.name,
                i(),
                s('probe transport "%s" failed because of error: %s', e, n),
                r.emit("upgradeError", o)
            }
            function l() {
                a("transport closed")
            }
            function c() {
                a("socket closed")
            }
            function h(e) {
                t && e.name !== t.name && (s('"%s" works - aborting "%s"', e.name, t.name),
                i())
            }
            function d() {
                t.removeListener("open", o),
                t.removeListener("error", a),
                t.removeListener("close", l),
                r.removeListener("close", c),
                r.removeListener("upgrading", h)
            }
            u.priorWebsocketSuccess = !1,
            t.once("open", o),
            t.once("error", a),
            t.once("close", l),
            this.once("close", c),
            this.once("upgrading", h),
            t.open()
        }
        ,
        u.prototype.onOpen = function() {
            if (s("socket open"),
            this.readyState = "open",
            u.priorWebsocketSuccess = "websocket" === this.transport.name,
            this.emit("open"),
            this.flush(),
            "open" === this.readyState && this.upgrade && this.transport.pause) {
                s("starting upgrade probes");
                for (var e = 0, t = this.upgrades.length; e < t; e++)
                    this.probe(this.upgrades[e])
            }
        }
        ,
        u.prototype.onPacket = function(e) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState)
                switch (s('socket receive: type "%s", data "%s"', e.type, e.data),
                this.emit("packet", e),
                this.emit("heartbeat"),
                e.type) {
                case "open":
                    this.onHandshake(JSON.parse(e.data));
                    break;
                case "pong":
                    this.setPing(),
                    this.emit("pong");
                    break;
                case "error":
                    var t = new Error("server error");
                    t.code = e.data,
                    this.onError(t);
                    break;
                case "message":
                    this.emit("data", e.data),
                    this.emit("message", e.data)
                }
            else
                s('packet received with socket readyState "%s"', this.readyState)
        }
        ,
        u.prototype.onHandshake = function(e) {
            this.emit("handshake", e),
            this.id = e.sid,
            this.transport.query.sid = e.sid,
            this.upgrades = this.filterUpgrades(e.upgrades),
            this.pingInterval = e.pingInterval,
            this.pingTimeout = e.pingTimeout,
            this.onOpen(),
            "closed" !== this.readyState && (this.setPing(),
            this.removeListener("heartbeat", this.onHeartbeat),
            this.on("heartbeat", this.onHeartbeat))
        }
        ,
        u.prototype.onHeartbeat = function(e) {
            clearTimeout(this.pingTimeoutTimer);
            var t = this;
            t.pingTimeoutTimer = setTimeout(function() {
                "closed" !== t.readyState && t.onClose("ping timeout")
            }, e || t.pingInterval + t.pingTimeout)
        }
        ,
        u.prototype.setPing = function() {
            var e = this;
            clearTimeout(e.pingIntervalTimer),
            e.pingIntervalTimer = setTimeout(function() {
                s("writing ping packet - expecting pong within %sms", e.pingTimeout),
                e.ping(),
                e.onHeartbeat(e.pingTimeout)
            }, e.pingInterval)
        }
        ,
        u.prototype.ping = function() {
            var e = this;
            this.sendPacket("ping", function() {
                e.emit("ping")
            })
        }
        ,
        u.prototype.onDrain = function() {
            this.writeBuffer.splice(0, this.prevBufferLen),
            this.prevBufferLen = 0,
            0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
        }
        ,
        u.prototype.flush = function() {
            "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (s("flushing %d packets in socket", this.writeBuffer.length),
            this.transport.send(this.writeBuffer),
            this.prevBufferLen = this.writeBuffer.length,
            this.emit("flush"))
        }
        ,
        u.prototype.write = u.prototype.send = function(e, t, n) {
            return this.sendPacket("message", e, t, n),
            this
        }
        ,
        u.prototype.sendPacket = function(e, t, n, r) {
            if ("function" == typeof t && (r = t,
            t = void 0),
            "function" == typeof n && (r = n,
            n = null),
            "closing" !== this.readyState && "closed" !== this.readyState) {
                (n = n || {}).compress = !1 !== n.compress;
                var o = {
                    type: e,
                    data: t,
                    options: n
                };
                this.emit("packetCreate", o),
                this.writeBuffer.push(o),
                r && this.once("flush", r),
                this.flush()
            }
        }
        ,
        u.prototype.close = function() {
            if ("opening" === this.readyState || "open" === this.readyState) {
                this.readyState = "closing";
                var e = this;
                this.writeBuffer.length ? this.once("drain", function() {
                    this.upgrading ? r() : t()
                }) : this.upgrading ? r() : t()
            }
            function t() {
                e.onClose("forced close"),
                s("socket closing - telling transport to close"),
                e.transport.close()
            }
            function n() {
                e.removeListener("upgrade", n),
                e.removeListener("upgradeError", n),
                t()
            }
            function r() {
                e.once("upgrade", n),
                e.once("upgradeError", n)
            }
            return this
        }
        ,
        u.prototype.onError = function(e) {
            s("socket error %j", e),
            u.priorWebsocketSuccess = !1,
            this.emit("error", e),
            this.onClose("transport error", e)
        }
        ,
        u.prototype.onClose = function(e, t) {
            "opening" !== this.readyState && "open" !== this.readyState && "closing" !== this.readyState || (s('socket close with reason: "%s"', e),
            clearTimeout(this.pingIntervalTimer),
            clearTimeout(this.pingTimeoutTimer),
            this.transport.removeAllListeners("close"),
            this.transport.close(),
            this.transport.removeAllListeners(),
            this.readyState = "closed",
            this.id = null,
            this.emit("close", e, t),
            this.writeBuffer = [],
            this.prevBufferLen = 0)
        }
        ,
        u.prototype.filterUpgrades = function(e) {
            for (var t = [], n = 0, r = e.length; n < r; n++)
                ~i(this.transports, e[n]) && t.push(e[n]);
            return t
        }
    },
    "5M3R": function(e, t, n) {
        function r() {
            var e;
            try {
                e = t.storage.debug
            } catch (n) {}
            return !e && "undefined" != typeof process && "env"in process && (e = process.env.DEBUG),
            e
        }
        (t = e.exports = n("Nq7k")).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }
        ,
        t.formatArgs = function(e) {
            var n = this.useColors;
            if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff),
            n) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var o = 0
                  , s = 0;
                e[0].replace(/%[a-zA-Z%]/g, function(e) {
                    "%%" !== e && (o++,
                    "%c" === e && (s = o))
                }),
                e.splice(s, 0, r)
            }
        }
        ,
        t.save = function(e) {
            try {
                null == e ? t.storage.removeItem("debug") : t.storage.debug = e
            } catch (n) {}
        }
        ,
        t.load = r,
        t.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }
        ,
        t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (e) {}
        }(),
        t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"],
        t.formatters.j = function(e) {
            try {
                return JSON.stringify(e)
            } catch (t) {
                return "[UnexpectedJSONParseError]: " + t.message
            }
        }
        ,
        t.enable(r())
    },
    "6C75": function(e, t) {
        var n = {}.toString;
        e.exports = Array.isArray || function(e) {
            return "[object Array]" == n.call(e)
        }
    },
    "7jRU": function(e, t) {
        var n = [].indexOf;
        e.exports = function(e, t) {
            if (n)
                return e.indexOf(t);
            for (var r = 0; r < e.length; ++r)
                if (e[r] === t)
                    return r;
            return -1
        }
    },
    AdPF: function(e, t, n) {
        var r = n("yeub");
        e.exports = function(e) {
            var t = e.xdomain
              , n = e.xscheme
              , o = e.enablesXDR;
            try {
                if ("undefined" != typeof XMLHttpRequest && (!t || r))
                    return new XMLHttpRequest
            } catch (s) {}
            try {
                if ("undefined" != typeof XDomainRequest && !n && o)
                    return new XDomainRequest
            } catch (s) {}
            if (!t)
                try {
                    return new (global[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                } catch (s) {}
        }
    },
    Aplp: function(e, t, n) {
        "use strict";
        var r, o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), s = 64, i = {}, a = 0, l = 0;
        function c(e) {
            var t = "";
            do {
                t = o[e % s] + t,
                e = Math.floor(e / s)
            } while (e > 0);
            return t
        }
        function u() {
            var e = c(+new Date);
            return e !== r ? (a = 0,
            r = e) : e + "." + c(a++)
        }
        for (; l < s; l++)
            i[o[l]] = l;
        u.encode = c,
        u.decode = function(e) {
            var t = 0;
            for (l = 0; l < e.length; l++)
                t = t * s + i[e.charAt(l)];
            return t
        }
        ,
        e.exports = u
    },
    C2QD: function(e, t) {
        function n(e) {
            this.ms = (e = e || {}).min || 100,
            this.max = e.max || 1e4,
            this.factor = e.factor || 2,
            this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0,
            this.attempts = 0
        }
        e.exports = n,
        n.prototype.duration = function() {
            var e = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var t = Math.random()
                  , n = Math.floor(t * this.jitter * e);
                e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n
            }
            return 0 | Math.min(e, this.max)
        }
        ,
        n.prototype.reset = function() {
            this.attempts = 0
        }
        ,
        n.prototype.setMin = function(e) {
            this.ms = e
        }
        ,
        n.prototype.setMax = function(e) {
            this.max = e
        }
        ,
        n.prototype.setJitter = function(e) {
            this.jitter = e
        }
    },
    CIKq: function(e, t, n) {
        var r, o = n("Gbct"), s = n("Wm4p"), i = n("TypT"), a = n("Yvos"), l = n("Aplp"), c = n("HjK1")("engine.io-client:websocket"), u = global.WebSocket || global.MozWebSocket;
        if ("undefined" == typeof window)
            try {
                r = n(1)
            } catch (p) {}
        var h = u;
        function d(e) {
            e && e.forceBase64 && (this.supportsBinary = !1),
            this.perMessageDeflate = e.perMessageDeflate,
            this.usingBrowserWebSocket = u && !e.forceNode,
            this.protocols = e.protocols,
            this.usingBrowserWebSocket || (h = r),
            o.call(this, e)
        }
        h || "undefined" != typeof window || (h = r),
        e.exports = d,
        a(d, o),
        d.prototype.name = "websocket",
        d.prototype.supportsBinary = !0,
        d.prototype.doOpen = function() {
            if (this.check()) {
                var e = this.uri()
                  , t = this.protocols
                  , n = {
                    agent: this.agent,
                    perMessageDeflate: this.perMessageDeflate
                };
                n.pfx = this.pfx,
                n.key = this.key,
                n.passphrase = this.passphrase,
                n.cert = this.cert,
                n.ca = this.ca,
                n.ciphers = this.ciphers,
                n.rejectUnauthorized = this.rejectUnauthorized,
                this.extraHeaders && (n.headers = this.extraHeaders),
                this.localAddress && (n.localAddress = this.localAddress);
                try {
                    this.ws = this.usingBrowserWebSocket ? t ? new h(e,t) : new h(e) : new h(e,t,n)
                } catch (r) {
                    return this.emit("error", r)
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1),
                this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0,
                this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer",
                this.addEventListeners()
            }
        }
        ,
        d.prototype.addEventListeners = function() {
            var e = this;
            this.ws.onopen = function() {
                e.onOpen()
            }
            ,
            this.ws.onclose = function() {
                e.onClose()
            }
            ,
            this.ws.onmessage = function(t) {
                e.onData(t.data)
            }
            ,
            this.ws.onerror = function(t) {
                e.onError("websocket error", t)
            }
        }
        ,
        d.prototype.write = function(e) {
            var t = this;
            this.writable = !1;
            for (var n = e.length, r = 0, o = n; r < o; r++)
                !function(e) {
                    s.encodePacket(e, t.supportsBinary, function(r) {
                        if (!t.usingBrowserWebSocket) {
                            var o = {};
                            e.options && (o.compress = e.options.compress),
                            t.perMessageDeflate && ("string" == typeof r ? global.Buffer.byteLength(r) : r.length) < t.perMessageDeflate.threshold && (o.compress = !1)
                        }
                        try {
                            t.usingBrowserWebSocket ? t.ws.send(r) : t.ws.send(r, o)
                        } catch (p) {
                            c("websocket closed before onclose event")
                        }
                        --n || (t.emit("flush"),
                        setTimeout(function() {
                            t.writable = !0,
                            t.emit("drain")
                        }, 0))
                    })
                }(e[r])
        }
        ,
        d.prototype.onClose = function() {
            o.prototype.onClose.call(this)
        }
        ,
        d.prototype.doClose = function() {
            void 0 !== this.ws && this.ws.close()
        }
        ,
        d.prototype.uri = function() {
            var e = this.query || {}
              , t = this.secure ? "wss" : "ws"
              , n = "";
            return this.port && ("wss" === t && 443 !== Number(this.port) || "ws" === t && 80 !== Number(this.port)) && (n = ":" + this.port),
            this.timestampRequests && (e[this.timestampParam] = l()),
            this.supportsBinary || (e.b64 = 1),
            (e = i.encode(e)).length && (e = "?" + e),
            t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e
        }
        ,
        d.prototype.check = function() {
            return !(!h || "__initialize"in h && this.name === d.prototype.name)
        }
    },
    CUme: function(e, t, n) {
        var r = n("Gbct")
          , o = n("TypT")
          , s = n("Wm4p")
          , i = n("Yvos")
          , a = n("Aplp")
          , l = n("HjK1")("engine.io-client:polling");
        e.exports = u;
        var c = null != new (n("AdPF"))({
            xdomain: !1
        }).responseType;
        function u(e) {
            c && !(e && e.forceBase64) || (this.supportsBinary = !1),
            r.call(this, e)
        }
        i(u, r),
        u.prototype.name = "polling",
        u.prototype.doOpen = function() {
            this.poll()
        }
        ,
        u.prototype.pause = function(e) {
            var t = this;
            function n() {
                l("paused"),
                t.readyState = "paused",
                e()
            }
            if (this.readyState = "pausing",
            this.polling || !this.writable) {
                var r = 0;
                this.polling && (l("we are currently polling - waiting to pause"),
                r++,
                this.once("pollComplete", function() {
                    l("pre-pause polling complete"),
                    --r || n()
                })),
                this.writable || (l("we are currently writing - waiting to pause"),
                r++,
                this.once("drain", function() {
                    l("pre-pause writing complete"),
                    --r || n()
                }))
            } else
                n()
        }
        ,
        u.prototype.poll = function() {
            l("polling"),
            this.polling = !0,
            this.doPoll(),
            this.emit("poll")
        }
        ,
        u.prototype.onData = function(e) {
            var t = this;
            l("polling got data %s", e),
            s.decodePayload(e, this.socket.binaryType, function(e, n, r) {
                if ("opening" === t.readyState && t.onOpen(),
                "close" === e.type)
                    return t.onClose(),
                    !1;
                t.onPacket(e)
            }),
            "closed" !== this.readyState && (this.polling = !1,
            this.emit("pollComplete"),
            "open" === this.readyState ? this.poll() : l('ignoring poll - transport state "%s"', this.readyState))
        }
        ,
        u.prototype.doClose = function() {
            var e = this;
            function t() {
                l("writing close packet"),
                e.write([{
                    type: "close"
                }])
            }
            "open" === this.readyState ? (l("transport open - closing"),
            t()) : (l("transport not open - deferring close"),
            this.once("open", t))
        }
        ,
        u.prototype.write = function(e) {
            var t = this;
            this.writable = !1;
            var n = function() {
                t.writable = !0,
                t.emit("drain")
            };
            s.encodePayload(e, this.supportsBinary, function(e) {
                t.doWrite(e, n)
            })
        }
        ,
        u.prototype.uri = function() {
            var e = this.query || {}
              , t = this.secure ? "https" : "http"
              , n = "";
            return !1 !== this.timestampRequests && (e[this.timestampParam] = a()),
            this.supportsBinary || e.sid || (e.b64 = 1),
            e = o.encode(e),
            this.port && ("https" === t && 443 !== Number(this.port) || "http" === t && 80 !== Number(this.port)) && (n = ":" + this.port),
            e.length && (e = "?" + e),
            t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e
        }
    },
    Cl5A: function(e, t, n) {
        var r = n("CUme")
          , o = n("Yvos");
        e.exports = c;
        var s, i = /\n/g, a = /\\n/g;
        function l() {}
        function c(e) {
            r.call(this, e),
            this.query = this.query || {},
            s || (global.___eio || (global.___eio = []),
            s = global.___eio),
            this.index = s.length;
            var t = this;
            s.push(function(e) {
                t.onData(e)
            }),
            this.query.j = this.index,
            global.document && global.addEventListener && global.addEventListener("beforeunload", function() {
                t.script && (t.script.onerror = l)
            }, !1)
        }
        o(c, r),
        c.prototype.supportsBinary = !1,
        c.prototype.doClose = function() {
            this.script && (this.script.parentNode.removeChild(this.script),
            this.script = null),
            this.form && (this.form.parentNode.removeChild(this.form),
            this.form = null,
            this.iframe = null),
            r.prototype.doClose.call(this)
        }
        ,
        c.prototype.doPoll = function() {
            var e = this
              , t = document.createElement("script");
            this.script && (this.script.parentNode.removeChild(this.script),
            this.script = null),
            t.async = !0,
            t.src = this.uri(),
            t.onerror = function(t) {
                e.onError("jsonp poll error", t)
            }
            ;
            var n = document.getElementsByTagName("script")[0];
            n ? n.parentNode.insertBefore(t, n) : (document.head || document.body).appendChild(t),
            this.script = t,
            "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
                var e = document.createElement("iframe");
                document.body.appendChild(e),
                document.body.removeChild(e)
            }, 100)
        }
        ,
        c.prototype.doWrite = function(e, t) {
            var n = this;
            if (!this.form) {
                var r, o = document.createElement("form"), s = document.createElement("textarea"), l = this.iframeId = "eio_iframe_" + this.index;
                o.className = "socketio",
                o.style.position = "absolute",
                o.style.top = "-1000px",
                o.style.left = "-1000px",
                o.target = l,
                o.method = "POST",
                o.setAttribute("accept-charset", "utf-8"),
                s.name = "d",
                o.appendChild(s),
                document.body.appendChild(o),
                this.form = o,
                this.area = s
            }
            function c() {
                u(),
                t()
            }
            function u() {
                if (n.iframe)
                    try {
                        n.form.removeChild(n.iframe)
                    } catch (e) {
                        n.onError("jsonp polling iframe removal error", e)
                    }
                try {
                    r = document.createElement('<iframe src="javascript:0" name="' + n.iframeId + '">')
                } catch (e) {
                    (r = document.createElement("iframe")).name = n.iframeId,
                    r.src = "javascript:0"
                }
                r.id = n.iframeId,
                n.form.appendChild(r),
                n.iframe = r
            }
            this.form.action = this.uri(),
            u(),
            e = e.replace(a, "\\\n"),
            this.area.value = e.replace(i, "\\n");
            try {
                this.form.submit()
            } catch (h) {}
            this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                "complete" === n.iframe.readyState && c()
            }
            : this.iframe.onload = c
        }
    },
    FGiv: function(e, t) {
        var n = 1e3
          , r = 6e4
          , o = 36e5
          , s = 24 * o;
        function i(e, t, n) {
            if (!(e < t))
                return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s"
        }
        e.exports = function(e, t) {
            t = t || {};
            var a, l = typeof e;
            if ("string" === l && e.length > 0)
                return function(e) {
                    if (!((e = String(e)).length > 100)) {
                        var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                        if (t) {
                            var i = parseFloat(t[1]);
                            switch ((t[2] || "ms").toLowerCase()) {
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return 315576e5 * i;
                            case "days":
                            case "day":
                            case "d":
                                return i * s;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return i * o;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return i * r;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return i * n;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return i;
                            default:
                                return
                            }
                        }
                    }
                }(e);
            if ("number" === l && !1 === isNaN(e))
                return t.long ? i(a = e, s, "day") || i(a, o, "hour") || i(a, r, "minute") || i(a, n, "second") || a + " ms" : function(e) {
                    return e >= s ? Math.round(e / s) + "d" : e >= o ? Math.round(e / o) + "h" : e >= r ? Math.round(e / r) + "m" : e >= n ? Math.round(e / n) + "s" : e + "ms"
                }(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        }
    },
    Gbct: function(e, t, n) {
        var r = n("Wm4p")
          , o = n("cpc2");
        function s(e) {
            this.path = e.path,
            this.hostname = e.hostname,
            this.port = e.port,
            this.secure = e.secure,
            this.query = e.query,
            this.timestampParam = e.timestampParam,
            this.timestampRequests = e.timestampRequests,
            this.readyState = "",
            this.agent = e.agent || !1,
            this.socket = e.socket,
            this.enablesXDR = e.enablesXDR,
            this.pfx = e.pfx,
            this.key = e.key,
            this.passphrase = e.passphrase,
            this.cert = e.cert,
            this.ca = e.ca,
            this.ciphers = e.ciphers,
            this.rejectUnauthorized = e.rejectUnauthorized,
            this.forceNode = e.forceNode,
            this.extraHeaders = e.extraHeaders,
            this.localAddress = e.localAddress
        }
        e.exports = s,
        o(s.prototype),
        s.prototype.onError = function(e, t) {
            var n = new Error(e);
            return n.type = "TransportError",
            n.description = t,
            this.emit("error", n),
            this
        }
        ,
        s.prototype.open = function() {
            return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening",
            this.doOpen()),
            this
        }
        ,
        s.prototype.close = function() {
            return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(),
            this.onClose()),
            this
        }
        ,
        s.prototype.send = function(e) {
            if ("open" !== this.readyState)
                throw new Error("Transport not open");
            this.write(e)
        }
        ,
        s.prototype.onOpen = function() {
            this.readyState = "open",
            this.writable = !0,
            this.emit("open")
        }
        ,
        s.prototype.onData = function(e) {
            var t = r.decodePacket(e, this.socket.binaryType);
            this.onPacket(t)
        }
        ,
        s.prototype.onPacket = function(e) {
            this.emit("packet", e)
        }
        ,
        s.prototype.onClose = function() {
            this.readyState = "closed",
            this.emit("close")
        }
    },
    HjK1: function(e, t, n) {
        function r() {
            var e;
            try {
                e = t.storage.debug
            } catch (n) {}
            return !e && "undefined" != typeof process && "env"in process && (e = process.env.DEBUG),
            e
        }
        (t = e.exports = n("lhf0")).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }
        ,
        t.formatArgs = function(e) {
            var n = this.useColors;
            if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff),
            n) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var o = 0
                  , s = 0;
                e[0].replace(/%[a-zA-Z%]/g, function(e) {
                    "%%" !== e && (o++,
                    "%c" === e && (s = o))
                }),
                e.splice(s, 0, r)
            }
        }
        ,
        t.save = function(e) {
            try {
                null == e ? t.storage.removeItem("debug") : t.storage.debug = e
            } catch (n) {}
        }
        ,
        t.load = r,
        t.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }
        ,
        t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (e) {}
        }(),
        t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"],
        t.formatters.j = function(e) {
            try {
                return JSON.stringify(e)
            } catch (t) {
                return "[UnexpectedJSONParseError]: " + t.message
            }
        }
        ,
        t.enable(r())
    },
    KFGy: function(e, t, n) {
        var r = n("Vo14")
          , o = n("cpc2")
          , s = n("kSER")
          , i = n("2Dig")
          , a = n("QN7Q")
          , l = n("x7D4")("socket.io-client:socket")
          , c = n("TypT")
          , u = n("WLGk");
        e.exports = p;
        var h = {
            connect: 1,
            connect_error: 1,
            connect_timeout: 1,
            connecting: 1,
            disconnect: 1,
            error: 1,
            reconnect: 1,
            reconnect_attempt: 1,
            reconnect_failed: 1,
            reconnect_error: 1,
            reconnecting: 1,
            ping: 1,
            pong: 1
        }
          , d = o.prototype.emit;
        function p(e, t, n) {
            this.io = e,
            this.nsp = t,
            this.json = this,
            this.ids = 0,
            this.acks = {},
            this.receiveBuffer = [],
            this.sendBuffer = [],
            this.connected = !1,
            this.disconnected = !0,
            this.flags = {},
            n && n.query && (this.query = n.query),
            this.io.autoConnect && this.open()
        }
        o(p.prototype),
        p.prototype.subEvents = function() {
            if (!this.subs) {
                var e = this.io;
                this.subs = [i(e, "open", a(this, "onopen")), i(e, "packet", a(this, "onpacket")), i(e, "close", a(this, "onclose"))]
            }
        }
        ,
        p.prototype.open = p.prototype.connect = function() {
            return this.connected ? this : (this.subEvents(),
            this.io.open(),
            "open" === this.io.readyState && this.onopen(),
            this.emit("connecting"),
            this)
        }
        ,
        p.prototype.send = function() {
            var e = s(arguments);
            return e.unshift("message"),
            this.emit.apply(this, e),
            this
        }
        ,
        p.prototype.emit = function(e) {
            if (h.hasOwnProperty(e))
                return d.apply(this, arguments),
                this;
            var t = s(arguments)
              , n = {
                type: (void 0 !== this.flags.binary ? this.flags.binary : u(t)) ? r.BINARY_EVENT : r.EVENT,
                data: t,
                options: {}
            };
            return n.options.compress = !this.flags || !1 !== this.flags.compress,
            "function" == typeof t[t.length - 1] && (l("emitting packet with ack id %d", this.ids),
            this.acks[this.ids] = t.pop(),
            n.id = this.ids++),
            this.connected ? this.packet(n) : this.sendBuffer.push(n),
            this.flags = {},
            this
        }
        ,
        p.prototype.packet = function(e) {
            e.nsp = this.nsp,
            this.io.packet(e)
        }
        ,
        p.prototype.onopen = function() {
            if (l("transport is open - connecting"),
            "/" !== this.nsp)
                if (this.query) {
                    var e = "object" == typeof this.query ? c.encode(this.query) : this.query;
                    l("sending connect packet with query %s", e),
                    this.packet({
                        type: r.CONNECT,
                        query: e
                    })
                } else
                    this.packet({
                        type: r.CONNECT
                    })
        }
        ,
        p.prototype.onclose = function(e) {
            l("close (%s)", e),
            this.connected = !1,
            this.disconnected = !0,
            delete this.id,
            this.emit("disconnect", e)
        }
        ,
        p.prototype.onpacket = function(e) {
            if (e.nsp === this.nsp || e.type === r.ERROR && "/" === e.nsp)
                switch (e.type) {
                case r.CONNECT:
                    this.onconnect();
                    break;
                case r.EVENT:
                case r.BINARY_EVENT:
                    this.onevent(e);
                    break;
                case r.ACK:
                case r.BINARY_ACK:
                    this.onack(e);
                    break;
                case r.DISCONNECT:
                    this.ondisconnect();
                    break;
                case r.ERROR:
                    this.emit("error", e.data)
                }
        }
        ,
        p.prototype.onevent = function(e) {
            var t = e.data || [];
            l("emitting event %j", t),
            null != e.id && (l("attaching ack callback to event"),
            t.push(this.ack(e.id))),
            this.connected ? d.apply(this, t) : this.receiveBuffer.push(t)
        }
        ,
        p.prototype.ack = function(e) {
            var t = this
              , n = !1;
            return function() {
                if (!n) {
                    n = !0;
                    var o = s(arguments);
                    l("sending ack %j", o),
                    t.packet({
                        type: u(o) ? r.BINARY_ACK : r.ACK,
                        id: e,
                        data: o
                    })
                }
            }
        }
        ,
        p.prototype.onack = function(e) {
            var t = this.acks[e.id];
            "function" == typeof t ? (l("calling ack %s with %j", e.id, e.data),
            t.apply(this, e.data),
            delete this.acks[e.id]) : l("bad ack %s", e.id)
        }
        ,
        p.prototype.onconnect = function() {
            this.connected = !0,
            this.disconnected = !1,
            this.emit("connect"),
            this.emitBuffered()
        }
        ,
        p.prototype.emitBuffered = function() {
            var e;
            for (e = 0; e < this.receiveBuffer.length; e++)
                d.apply(this, this.receiveBuffer[e]);
            for (this.receiveBuffer = [],
            e = 0; e < this.sendBuffer.length; e++)
                this.packet(this.sendBuffer[e]);
            this.sendBuffer = []
        }
        ,
        p.prototype.ondisconnect = function() {
            l("server disconnect (%s)", this.nsp),
            this.destroy(),
            this.onclose("io server disconnect")
        }
        ,
        p.prototype.destroy = function() {
            if (this.subs) {
                for (var e = 0; e < this.subs.length; e++)
                    this.subs[e].destroy();
                this.subs = null
            }
            this.io.destroy(this)
        }
        ,
        p.prototype.close = p.prototype.disconnect = function() {
            return this.connected && (l("performing disconnect (%s)", this.nsp),
            this.packet({
                type: r.DISCONNECT
            })),
            this.destroy(),
            this.connected && this.onclose("io client disconnect"),
            this
        }
        ,
        p.prototype.compress = function(e) {
            return this.flags.compress = e,
            this
        }
        ,
        p.prototype.binary = function(e) {
            return this.flags.binary = e,
            this
        }
    },
    Nq7k: function(e, t, n) {
        function r(e) {
            var n;
            function r() {
                if (r.enabled) {
                    var e = r
                      , o = +new Date;
                    e.diff = o - (n || o),
                    e.prev = n,
                    e.curr = o,
                    n = o;
                    for (var s = new Array(arguments.length), i = 0; i < s.length; i++)
                        s[i] = arguments[i];
                    s[0] = t.coerce(s[0]),
                    "string" != typeof s[0] && s.unshift("%O");
                    var a = 0;
                    s[0] = s[0].replace(/%([a-zA-Z%])/g, function(n, r) {
                        if ("%%" === n)
                            return n;
                        a++;
                        var o = t.formatters[r];
                        return "function" == typeof o && (n = o.call(e, s[a]),
                        s.splice(a, 1),
                        a--),
                        n
                    }),
                    t.formatArgs.call(e, s),
                    (r.log || t.log || console.log.bind(console)).apply(e, s)
                }
            }
            return r.namespace = e,
            r.enabled = t.enabled(e),
            r.useColors = t.useColors(),
            r.color = function(e) {
                var n, r = 0;
                for (n in e)
                    r = (r << 5) - r + e.charCodeAt(n),
                    r |= 0;
                return t.colors[Math.abs(r) % t.colors.length]
            }(e),
            r.destroy = o,
            "function" == typeof t.init && t.init(r),
            t.instances.push(r),
            r
        }
        function o() {
            var e = t.instances.indexOf(this);
            return -1 !== e && (t.instances.splice(e, 1),
            !0)
        }
        (t = e.exports = r.debug = r.default = r).coerce = function(e) {
            return e instanceof Error ? e.stack || e.message : e
        }
        ,
        t.disable = function() {
            t.enable("")
        }
        ,
        t.enable = function(e) {
            var n;
            t.save(e),
            t.names = [],
            t.skips = [];
            var r = ("string" == typeof e ? e : "").split(/[\s,]+/)
              , o = r.length;
            for (n = 0; n < o; n++)
                r[n] && ("-" === (e = r[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));
            for (n = 0; n < t.instances.length; n++) {
                var s = t.instances[n];
                s.enabled = t.enabled(s.namespace)
            }
        }
        ,
        t.enabled = function(e) {
            if ("*" === e[e.length - 1])
                return !0;
            var n, r;
            for (n = 0,
            r = t.skips.length; n < r; n++)
                if (t.skips[n].test(e))
                    return !1;
            for (n = 0,
            r = t.names.length; n < r; n++)
                if (t.names[n].test(e))
                    return !0;
            return !1
        }
        ,
        t.humanize = n("FGiv"),
        t.instances = [],
        t.names = [],
        t.skips = [],
        t.formatters = {}
    },
    Q80o: function(e, t, n) {
        function r(e) {
            var n;
            function r() {
                if (r.enabled) {
                    var e = r
                      , o = +new Date;
                    e.diff = o - (n || o),
                    e.prev = n,
                    e.curr = o,
                    n = o;
                    for (var s = new Array(arguments.length), i = 0; i < s.length; i++)
                        s[i] = arguments[i];
                    s[0] = t.coerce(s[0]),
                    "string" != typeof s[0] && s.unshift("%O");
                    var a = 0;
                    s[0] = s[0].replace(/%([a-zA-Z%])/g, function(n, r) {
                        if ("%%" === n)
                            return n;
                        a++;
                        var o = t.formatters[r];
                        return "function" == typeof o && (n = o.call(e, s[a]),
                        s.splice(a, 1),
                        a--),
                        n
                    }),
                    t.formatArgs.call(e, s),
                    (r.log || t.log || console.log.bind(console)).apply(e, s)
                }
            }
            return r.namespace = e,
            r.enabled = t.enabled(e),
            r.useColors = t.useColors(),
            r.color = function(e) {
                var n, r = 0;
                for (n in e)
                    r = (r << 5) - r + e.charCodeAt(n),
                    r |= 0;
                return t.colors[Math.abs(r) % t.colors.length]
            }(e),
            r.destroy = o,
            "function" == typeof t.init && t.init(r),
            t.instances.push(r),
            r
        }
        function o() {
            var e = t.instances.indexOf(this);
            return -1 !== e && (t.instances.splice(e, 1),
            !0)
        }
        (t = e.exports = r.debug = r.default = r).coerce = function(e) {
            return e instanceof Error ? e.stack || e.message : e
        }
        ,
        t.disable = function() {
            t.enable("")
        }
        ,
        t.enable = function(e) {
            var n;
            t.save(e),
            t.names = [],
            t.skips = [];
            var r = ("string" == typeof e ? e : "").split(/[\s,]+/)
              , o = r.length;
            for (n = 0; n < o; n++)
                r[n] && ("-" === (e = r[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));
            for (n = 0; n < t.instances.length; n++) {
                var s = t.instances[n];
                s.enabled = t.enabled(s.namespace)
            }
        }
        ,
        t.enabled = function(e) {
            if ("*" === e[e.length - 1])
                return !0;
            var n, r;
            for (n = 0,
            r = t.skips.length; n < r; n++)
                if (t.skips[n].test(e))
                    return !1;
            for (n = 0,
            r = t.names.length; n < r; n++)
                if (t.names[n].test(e))
                    return !0;
            return !1
        }
        ,
        t.humanize = n("FGiv"),
        t.instances = [],
        t.names = [],
        t.skips = [],
        t.formatters = {}
    },
    QN7Q: function(e, t) {
        var n = [].slice;
        e.exports = function(e, t) {
            if ("string" == typeof t && (t = e[t]),
            "function" != typeof t)
                throw new Error("bind() requires a function");
            var r = n.call(arguments, 2);
            return function() {
                return t.apply(e, r.concat(n.call(arguments)))
            }
        }
    },
    TypT: function(e, t) {
        t.encode = function(e) {
            var t = "";
            for (var n in e)
                e.hasOwnProperty(n) && (t.length && (t += "&"),
                t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
            return t
        }
        ,
        t.decode = function(e) {
            for (var t = {}, n = e.split("&"), r = 0, o = n.length; r < o; r++) {
                var s = n[r].split("=");
                t[decodeURIComponent(s[0])] = decodeURIComponent(s[1])
            }
            return t
        }
    },
    Uxeu: function(e, t) {
        var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
          , r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        e.exports = function(e) {
            var t = e
              , o = e.indexOf("[")
              , s = e.indexOf("]");
            -1 != o && -1 != s && (e = e.substring(0, o) + e.substring(o, s).replace(/:/g, ";") + e.substring(s, e.length));
            for (var i = n.exec(e || ""), a = {}, l = 14; l--; )
                a[r[l]] = i[l] || "";
            return -1 != o && -1 != s && (a.source = t,
            a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"),
            a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"),
            a.ipv6uri = !0),
            a
        }
    },
    Vo14: function(e, t, n) {
        var r = n("5M3R")("socket.io-parser")
          , o = n("cpc2")
          , s = n("cD5x")
          , i = n("ojuT")
          , a = n("+SKG");
        function l() {}
        t.protocol = 4,
        t.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"],
        t.CONNECT = 0,
        t.DISCONNECT = 1,
        t.EVENT = 2,
        t.ACK = 3,
        t.ERROR = 4,
        t.BINARY_EVENT = 5,
        t.BINARY_ACK = 6,
        t.Encoder = l,
        t.Decoder = h;
        var c = t.ERROR + '"encode error"';
        function u(e) {
            var n = "" + e.type;
            if (t.BINARY_EVENT !== e.type && t.BINARY_ACK !== e.type || (n += e.attachments + "-"),
            e.nsp && "/" !== e.nsp && (n += e.nsp + ","),
            null != e.id && (n += e.id),
            null != e.data) {
                var o = function(e) {
                    try {
                        return JSON.stringify(e)
                    } catch (t) {
                        return !1
                    }
                }(e.data);
                if (!1 === o)
                    return c;
                n += o
            }
            return r("encoded %j as %s", e, n),
            n
        }
        function h() {
            this.reconstructor = null
        }
        function d(e) {
            this.reconPack = e,
            this.buffers = []
        }
        function p(e) {
            return {
                type: t.ERROR,
                data: "parser error: " + e
            }
        }
        l.prototype.encode = function(e, n) {
            r("encoding packet %j", e),
            t.BINARY_EVENT === e.type || t.BINARY_ACK === e.type ? function(e, t) {
                s.removeBlobs(e, function(e) {
                    var n = s.deconstructPacket(e)
                      , r = u(n.packet)
                      , o = n.buffers;
                    o.unshift(r),
                    t(o)
                })
            }(e, n) : n([u(e)])
        }
        ,
        o(h.prototype),
        h.prototype.add = function(e) {
            var n;
            if ("string" == typeof e)
                n = function(e) {
                    var n = 0
                      , o = {
                        type: Number(e.charAt(0))
                    };
                    if (null == t.types[o.type])
                        return p("unknown packet type " + o.type);
                    if (t.BINARY_EVENT === o.type || t.BINARY_ACK === o.type) {
                        for (var s = ""; "-" !== e.charAt(++n) && (s += e.charAt(n),
                        n != e.length); )
                            ;
                        if (s != Number(s) || "-" !== e.charAt(n))
                            throw new Error("Illegal attachments");
                        o.attachments = Number(s)
                    }
                    if ("/" === e.charAt(n + 1))
                        for (o.nsp = ""; ++n && "," !== (l = e.charAt(n)) && (o.nsp += l,
                        n !== e.length); )
                            ;
                    else
                        o.nsp = "/";
                    var a = e.charAt(n + 1);
                    if ("" !== a && Number(a) == a) {
                        for (o.id = ""; ++n; ) {
                            var l;
                            if (null == (l = e.charAt(n)) || Number(l) != l) {
                                --n;
                                break
                            }
                            if (o.id += e.charAt(n),
                            n === e.length)
                                break
                        }
                        o.id = Number(o.id)
                    }
                    if (e.charAt(++n)) {
                        var c = function(e) {
                            try {
                                return JSON.parse(e)
                            } catch (t) {
                                return !1
                            }
                        }(e.substr(n));
                        if (!1 === c || o.type !== t.ERROR && !i(c))
                            return p("invalid payload");
                        o.data = c
                    }
                    return r("decoded %s as %j", e, o),
                    o
                }(e),
                t.BINARY_EVENT === n.type || t.BINARY_ACK === n.type ? (this.reconstructor = new d(n),
                0 === this.reconstructor.reconPack.attachments && this.emit("decoded", n)) : this.emit("decoded", n);
            else {
                if (!a(e) && !e.base64)
                    throw new Error("Unknown type: " + e);
                if (!this.reconstructor)
                    throw new Error("got binary data when not reconstructing a packet");
                (n = this.reconstructor.takeBinaryData(e)) && (this.reconstructor = null,
                this.emit("decoded", n))
            }
        }
        ,
        h.prototype.destroy = function() {
            this.reconstructor && this.reconstructor.finishedReconstruction()
        }
        ,
        d.prototype.takeBinaryData = function(e) {
            if (this.buffers.push(e),
            this.buffers.length === this.reconPack.attachments) {
                var t = s.reconstructPacket(this.reconPack, this.buffers);
                return this.finishedReconstruction(),
                t
            }
            return null
        }
        ,
        d.prototype.finishedReconstruction = function() {
            this.reconPack = null,
            this.buffers = []
        }
    },
    WLGk: function(e, t, n) {
        var r = n("6C75")
          , o = Object.prototype.toString
          , s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === o.call(Blob)
          , i = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === o.call(File);
        e.exports = function e(t) {
            if (!t || "object" != typeof t)
                return !1;
            if (r(t)) {
                for (var n = 0, o = t.length; n < o; n++)
                    if (e(t[n]))
                        return !0;
                return !1
            }
            if ("function" == typeof Buffer && Buffer.isBuffer && Buffer.isBuffer(t) || "function" == typeof ArrayBuffer && t instanceof ArrayBuffer || s && t instanceof Blob || i && t instanceof File)
                return !0;
            if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length)
                return e(t.toJSON(), !0);
            for (var a in t)
                if (Object.prototype.hasOwnProperty.call(t, a) && e(t[a]))
                    return !0;
            return !1
        }
    },
    Wm4p: function(e, t, n) {
        var r, o = n("dkv/"), s = n("WLGk"), i = n("ypnn"), a = n("zMFY"), l = n("oIG/");
        "undefined" != typeof ArrayBuffer && (r = n("g5Dd"));
        var c = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent)
          , u = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent)
          , h = c || u;
        t.protocol = 3;
        var d = t.packets = {
            open: 0,
            close: 1,
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6
        }
          , p = o(d)
          , f = {
            type: "error",
            data: "parser error"
        }
          , g = n("14A5");
        function m(e, t, n) {
            for (var r = new Array(e.length), o = a(e.length, n), s = function(e, n, o) {
                t(n, function(t, n) {
                    r[e] = n,
                    o(t, r)
                })
            }, i = 0; i < e.length; i++)
                s(i, e[i], o)
        }
        t.encodePacket = function(e, n, r, o) {
            "function" == typeof n && (o = n,
            n = !1),
            "function" == typeof r && (o = r,
            r = null);
            var s = void 0 === e.data ? void 0 : e.data.buffer || e.data;
            if ("undefined" != typeof ArrayBuffer && s instanceof ArrayBuffer)
                return function(e, n, r) {
                    if (!n)
                        return t.encodeBase64Packet(e, r);
                    var o = e.data
                      , s = new Uint8Array(o)
                      , i = new Uint8Array(1 + o.byteLength);
                    i[0] = d[e.type];
                    for (var a = 0; a < s.length; a++)
                        i[a + 1] = s[a];
                    return r(i.buffer)
                }(e, n, o);
            if (void 0 !== g && s instanceof g)
                return function(e, n, r) {
                    if (!n)
                        return t.encodeBase64Packet(e, r);
                    if (h)
                        return function(e, n, r) {
                            if (!n)
                                return t.encodeBase64Packet(e, r);
                            var o = new FileReader;
                            return o.onload = function() {
                                t.encodePacket({
                                    type: e.type,
                                    data: o.result
                                }, n, !0, r)
                            }
                            ,
                            o.readAsArrayBuffer(e.data)
                        }(e, n, r);
                    var o = new Uint8Array(1);
                    return o[0] = d[e.type],
                    r(new g([o.buffer, e.data]))
                }(e, n, o);
            if (s && s.base64)
                return function(e, n) {
                    return n("b" + t.packets[e.type] + e.data.data)
                }(e, o);
            var i = d[e.type];
            return void 0 !== e.data && (i += r ? l.encode(String(e.data), {
                strict: !1
            }) : String(e.data)),
            o("" + i)
        }
        ,
        t.encodeBase64Packet = function(e, n) {
            var r, o = "b" + t.packets[e.type];
            if (void 0 !== g && e.data instanceof g) {
                var s = new FileReader;
                return s.onload = function() {
                    var e = s.result.split(",")[1];
                    n(o + e)
                }
                ,
                s.readAsDataURL(e.data)
            }
            try {
                r = String.fromCharCode.apply(null, new Uint8Array(e.data))
            } catch (c) {
                for (var i = new Uint8Array(e.data), a = new Array(i.length), l = 0; l < i.length; l++)
                    a[l] = i[l];
                r = String.fromCharCode.apply(null, a)
            }
            return o += btoa(r),
            n(o)
        }
        ,
        t.decodePacket = function(e, n, r) {
            if (void 0 === e)
                return f;
            if ("string" == typeof e) {
                if ("b" === e.charAt(0))
                    return t.decodeBase64Packet(e.substr(1), n);
                if (r && !1 === (e = function(e) {
                    try {
                        e = l.decode(e, {
                            strict: !1
                        })
                    } catch (t) {
                        return !1
                    }
                    return e
                }(e)))
                    return f;
                var o = e.charAt(0);
                return Number(o) == o && p[o] ? e.length > 1 ? {
                    type: p[o],
                    data: e.substring(1)
                } : {
                    type: p[o]
                } : f
            }
            o = new Uint8Array(e)[0];
            var s = i(e, 1);
            return g && "blob" === n && (s = new g([s])),
            {
                type: p[o],
                data: s
            }
        }
        ,
        t.decodeBase64Packet = function(e, t) {
            var n = p[e.charAt(0)];
            if (!r)
                return {
                    type: n,
                    data: {
                        base64: !0,
                        data: e.substr(1)
                    }
                };
            var o = r.decode(e.substr(1));
            return "blob" === t && g && (o = new g([o])),
            {
                type: n,
                data: o
            }
        }
        ,
        t.encodePayload = function(e, n, r) {
            "function" == typeof n && (r = n,
            n = null);
            var o = s(e);
            return n && o ? g && !h ? t.encodePayloadAsBlob(e, r) : t.encodePayloadAsArrayBuffer(e, r) : e.length ? void m(e, function(e, r) {
                t.encodePacket(e, !!o && n, !1, function(e) {
                    r(null, function(e) {
                        return e.length + ":" + e
                    }(e))
                })
            }, function(e, t) {
                return r(t.join(""))
            }) : r("0:")
        }
        ,
        t.decodePayload = function(e, n, r) {
            if ("string" != typeof e)
                return t.decodePayloadAsBinary(e, n, r);
            var o;
            if ("function" == typeof n && (r = n,
            n = null),
            "" === e)
                return r(f, 0, 1);
            for (var s, i, a = "", l = 0, c = e.length; l < c; l++) {
                var u = e.charAt(l);
                if (":" === u) {
                    if ("" === a || a != (s = Number(a)))
                        return r(f, 0, 1);
                    if (a != (i = e.substr(l + 1, s)).length)
                        return r(f, 0, 1);
                    if (i.length) {
                        if (o = t.decodePacket(i, n, !1),
                        f.type === o.type && f.data === o.data)
                            return r(f, 0, 1);
                        if (!1 === r(o, l + s, c))
                            return
                    }
                    l += s,
                    a = ""
                } else
                    a += u
            }
            return "" !== a ? r(f, 0, 1) : void 0
        }
        ,
        t.encodePayloadAsArrayBuffer = function(e, n) {
            if (!e.length)
                return n(new ArrayBuffer(0));
            m(e, function(e, n) {
                t.encodePacket(e, !0, !0, function(e) {
                    return n(null, e)
                })
            }, function(e, t) {
                var r = t.reduce(function(e, t) {
                    var n;
                    return e + (n = "string" == typeof t ? t.length : t.byteLength).toString().length + n + 2
                }, 0)
                  , o = new Uint8Array(r)
                  , s = 0;
                return t.forEach(function(e) {
                    var t = "string" == typeof e
                      , n = e;
                    if (t) {
                        for (var r = new Uint8Array(e.length), i = 0; i < e.length; i++)
                            r[i] = e.charCodeAt(i);
                        n = r.buffer
                    }
                    o[s++] = t ? 0 : 1;
                    var a = n.byteLength.toString();
                    for (i = 0; i < a.length; i++)
                        o[s++] = parseInt(a[i]);
                    for (o[s++] = 255,
                    r = new Uint8Array(n),
                    i = 0; i < r.length; i++)
                        o[s++] = r[i]
                }),
                n(o.buffer)
            })
        }
        ,
        t.encodePayloadAsBlob = function(e, n) {
            m(e, function(e, n) {
                t.encodePacket(e, !0, !0, function(e) {
                    var t = new Uint8Array(1);
                    if (t[0] = 1,
                    "string" == typeof e) {
                        for (var r = new Uint8Array(e.length), o = 0; o < e.length; o++)
                            r[o] = e.charCodeAt(o);
                        e = r.buffer,
                        t[0] = 0
                    }
                    var s = (e instanceof ArrayBuffer ? e.byteLength : e.size).toString()
                      , i = new Uint8Array(s.length + 1);
                    for (o = 0; o < s.length; o++)
                        i[o] = parseInt(s[o]);
                    if (i[s.length] = 255,
                    g) {
                        var a = new g([t.buffer, i.buffer, e]);
                        n(null, a)
                    }
                })
            }, function(e, t) {
                return n(new g(t))
            })
        }
        ,
        t.decodePayloadAsBinary = function(e, n, r) {
            "function" == typeof n && (r = n,
            n = null);
            for (var o = e, s = []; o.byteLength > 0; ) {
                for (var a = new Uint8Array(o), l = 0 === a[0], c = "", u = 1; 255 !== a[u]; u++) {
                    if (c.length > 310)
                        return r(f, 0, 1);
                    c += a[u]
                }
                o = i(o, 2 + c.length),
                c = parseInt(c);
                var h = i(o, 0, c);
                if (l)
                    try {
                        h = String.fromCharCode.apply(null, new Uint8Array(h))
                    } catch (g) {
                        var d = new Uint8Array(h);
                        for (h = "",
                        u = 0; u < d.length; u++)
                            h += String.fromCharCode(d[u])
                    }
                s.push(h),
                o = i(o, c)
            }
            var p = s.length;
            s.forEach(function(e, o) {
                r(t.decodePacket(e, n, !0), o, p)
            })
        }
    },
    Yvos: function(e, t) {
        e.exports = function(e, t) {
            var n = function() {};
            n.prototype = t.prototype,
            e.prototype = new n,
            e.prototype.constructor = e
        }
    },
    akSB: function(e, t, n) {
        var r = n("AdPF")
          , o = n("0z79")
          , s = n("Cl5A")
          , i = n("CIKq");
        t.polling = function(e) {
            var t = !1
              , n = !1
              , i = !1 !== e.jsonp;
            if (global.location) {
                var a = "https:" === location.protocol
                  , l = location.port;
                l || (l = a ? 443 : 80),
                t = e.hostname !== location.hostname || l !== e.port,
                n = e.secure !== a
            }
            if (e.xdomain = t,
            e.xscheme = n,
            "open"in new r(e) && !e.forceJSONP)
                return new o(e);
            if (!i)
                throw new Error("JSONP disabled");
            return new s(e)
        }
        ,
        t.websocket = i
    },
    cD5x: function(e, t, n) {
        var r = n("ojuT")
          , o = n("+SKG")
          , s = Object.prototype.toString
          , i = "function" == typeof global.Blob || "[object BlobConstructor]" === s.call(global.Blob)
          , a = "function" == typeof global.File || "[object FileConstructor]" === s.call(global.File);
        t.deconstructPacket = function(e) {
            var t = []
              , n = e;
            return n.data = function e(t, n) {
                if (!t)
                    return t;
                if (o(t)) {
                    var s = {
                        _placeholder: !0,
                        num: n.length
                    };
                    return n.push(t),
                    s
                }
                if (r(t)) {
                    for (var i = new Array(t.length), a = 0; a < t.length; a++)
                        i[a] = e(t[a], n);
                    return i
                }
                if ("object" == typeof t && !(t instanceof Date)) {
                    for (var l in i = {},
                    t)
                        i[l] = e(t[l], n);
                    return i
                }
                return t
            }(e.data, t),
            n.attachments = t.length,
            {
                packet: n,
                buffers: t
            }
        }
        ,
        t.reconstructPacket = function(e, t) {
            return e.data = function e(t, n) {
                if (!t)
                    return t;
                if (t && t._placeholder)
                    return n[t.num];
                if (r(t))
                    for (var o = 0; o < t.length; o++)
                        t[o] = e(t[o], n);
                else if ("object" == typeof t)
                    for (var s in t)
                        t[s] = e(t[s], n);
                return t
            }(e.data, t),
            e.attachments = void 0,
            e
        }
        ,
        t.removeBlobs = function(e, t) {
            var n = 0
              , s = e;
            !function e(l, c, u) {
                if (!l)
                    return l;
                if (i && l instanceof Blob || a && l instanceof File) {
                    n++;
                    var h = new FileReader;
                    h.onload = function() {
                        u ? u[c] = this.result : s = this.result,
                        --n || t(s)
                    }
                    ,
                    h.readAsArrayBuffer(l)
                } else if (r(l))
                    for (var d = 0; d < l.length; d++)
                        e(l[d], d, l);
                else if ("object" == typeof l && !o(l))
                    for (var p in l)
                        e(l[p], p, l)
            }(s),
            n || t(s)
        }
    },
    cpc2: function(e, t, n) {
        function r(e) {
            if (e)
                return function(e) {
                    for (var t in r.prototype)
                        e[t] = r.prototype[t];
                    return e
                }(e)
        }
        e.exports = r,
        r.prototype.on = r.prototype.addEventListener = function(e, t) {
            return this._callbacks = this._callbacks || {},
            (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
            this
        }
        ,
        r.prototype.once = function(e, t) {
            function n() {
                this.off(e, n),
                t.apply(this, arguments)
            }
            return n.fn = t,
            this.on(e, n),
            this
        }
        ,
        r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(e, t) {
            if (this._callbacks = this._callbacks || {},
            0 == arguments.length)
                return this._callbacks = {},
                this;
            var n, r = this._callbacks["$" + e];
            if (!r)
                return this;
            if (1 == arguments.length)
                return delete this._callbacks["$" + e],
                this;
            for (var o = 0; o < r.length; o++)
                if ((n = r[o]) === t || n.fn === t) {
                    r.splice(o, 1);
                    break
                }
            return this
        }
        ,
        r.prototype.emit = function(e) {
            this._callbacks = this._callbacks || {};
            var t = [].slice.call(arguments, 1)
              , n = this._callbacks["$" + e];
            if (n)
                for (var r = 0, o = (n = n.slice(0)).length; r < o; ++r)
                    n[r].apply(this, t);
            return this
        }
        ,
        r.prototype.listeners = function(e) {
            return this._callbacks = this._callbacks || {},
            this._callbacks["$" + e] || []
        }
        ,
        r.prototype.hasListeners = function(e) {
            return !!this.listeners(e).length
        }
    },
    crnd: function(e, t) {
        function n(e) {
            return Promise.resolve().then(function() {
                var t = new Error("Cannot find module '" + e + "'");
                throw t.code = "MODULE_NOT_FOUND",
                t
            })
        }
        n.keys = function() {
            return []
        }
        ,
        n.resolve = n,
        e.exports = n,
        n.id = "crnd"
    },
    "dkv/": function(e, t) {
        e.exports = Object.keys || function(e) {
            var t = []
              , n = Object.prototype.hasOwnProperty;
            for (var r in e)
                n.call(e, r) && t.push(r);
            return t
        }
    },
    eOtv: function(e, t, n) {
        var r = n("lKxJ")
          , o = n("KFGy")
          , s = n("cpc2")
          , i = n("Vo14")
          , a = n("2Dig")
          , l = n("QN7Q")
          , c = n("x7D4")("socket.io-client:manager")
          , u = n("7jRU")
          , h = n("C2QD")
          , d = Object.prototype.hasOwnProperty;
        function p(e, t) {
            if (!(this instanceof p))
                return new p(e,t);
            e && "object" == typeof e && (t = e,
            e = void 0),
            (t = t || {}).path = "/proxy/3000/socket.io",
            this.nsps = {},
            this.subs = [],
            this.opts = t,
            this.reconnection(!1 !== t.reconnection),
            this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0),
            this.reconnectionDelay(t.reconnectionDelay || 1e3),
            this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3),
            this.randomizationFactor(t.randomizationFactor || .5),
            this.backoff = new h({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor()
            }),
            this.timeout(null == t.timeout ? 2e4 : t.timeout),
            this.readyState = "closed",
            this.uri = e,
            this.connecting = [],
            this.lastPing = null,
            this.encoding = !1,
            this.packetBuffer = [];
            var n = t.parser || i;
            this.encoder = new n.Encoder,
            this.decoder = new n.Decoder,
            this.autoConnect = !1 !== t.autoConnect,
            this.autoConnect && this.open()
        }
        e.exports = p,
        p.prototype.emitAll = function() {
            for (var e in this.emit.apply(this, arguments),
            this.nsps)
                d.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments)
        }
        ,
        p.prototype.updateSocketIds = function() {
            for (var e in this.nsps)
                d.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e))
        }
        ,
        p.prototype.generateId = function(e) {
            return ("/" === e ? "" : e + "#") + this.engine.id
        }
        ,
        s(p.prototype),
        p.prototype.reconnection = function(e) {
            return arguments.length ? (this._reconnection = !!e,
            this) : this._reconnection
        }
        ,
        p.prototype.reconnectionAttempts = function(e) {
            return arguments.length ? (this._reconnectionAttempts = e,
            this) : this._reconnectionAttempts
        }
        ,
        p.prototype.reconnectionDelay = function(e) {
            return arguments.length ? (this._reconnectionDelay = e,
            this.backoff && this.backoff.setMin(e),
            this) : this._reconnectionDelay
        }
        ,
        p.prototype.randomizationFactor = function(e) {
            return arguments.length ? (this._randomizationFactor = e,
            this.backoff && this.backoff.setJitter(e),
            this) : this._randomizationFactor
        }
        ,
        p.prototype.reconnectionDelayMax = function(e) {
            return arguments.length ? (this._reconnectionDelayMax = e,
            this.backoff && this.backoff.setMax(e),
            this) : this._reconnectionDelayMax
        }
        ,
        p.prototype.timeout = function(e) {
            return arguments.length ? (this._timeout = e,
            this) : this._timeout
        }
        ,
        p.prototype.maybeReconnectOnOpen = function() {
            !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
        }
        ,
        p.prototype.open = p.prototype.connect = function(e, t) {
            if (c("readyState %s", this.readyState),
            ~this.readyState.indexOf("open"))
                return this;
            c("opening %s", this.uri),
            this.engine = r(this.uri, this.opts);
            var n = this.engine
              , o = this;
            this.readyState = "opening",
            this.skipReconnect = !1;
            var s = a(n, "open", function() {
                o.onopen(),
                e && e()
            })
              , i = a(n, "error", function(t) {
                if (c("connect_error"),
                o.cleanup(),
                o.readyState = "closed",
                o.emitAll("connect_error", t),
                e) {
                    var n = new Error("Connection error");
                    n.data = t,
                    e(n)
                } else
                    o.maybeReconnectOnOpen()
            });
            if (!1 !== this._timeout) {
                var l = this._timeout;
                c("connect attempt will timeout after %d", l);
                var u = setTimeout(function() {
                    c("connect attempt timed out after %d", l),
                    s.destroy(),
                    n.close(),
                    n.emit("error", "timeout"),
                    o.emitAll("connect_timeout", l)
                }, l);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(u)
                    }
                })
            }
            return this.subs.push(s),
            this.subs.push(i),
            this
        }
        ,
        p.prototype.onopen = function() {
            c("open"),
            this.cleanup(),
            this.readyState = "open",
            this.emit("open");
            var e = this.engine;
            this.subs.push(a(e, "data", l(this, "ondata"))),
            this.subs.push(a(e, "ping", l(this, "onping"))),
            this.subs.push(a(e, "pong", l(this, "onpong"))),
            this.subs.push(a(e, "error", l(this, "onerror"))),
            this.subs.push(a(e, "close", l(this, "onclose"))),
            this.subs.push(a(this.decoder, "decoded", l(this, "ondecoded")))
        }
        ,
        p.prototype.onping = function() {
            this.lastPing = new Date,
            this.emitAll("ping")
        }
        ,
        p.prototype.onpong = function() {
            this.emitAll("pong", new Date - this.lastPing)
        }
        ,
        p.prototype.ondata = function(e) {
            this.decoder.add(e)
        }
        ,
        p.prototype.ondecoded = function(e) {
            this.emit("packet", e)
        }
        ,
        p.prototype.onerror = function(e) {
            c("error", e),
            this.emitAll("error", e)
        }
        ,
        p.prototype.socket = function(e, t) {
            var n = this.nsps[e];
            if (!n) {
                n = new o(this,e,t),
                this.nsps[e] = n;
                var r = this;
                n.on("connecting", s),
                n.on("connect", function() {
                    n.id = r.generateId(e)
                }),
                this.autoConnect && s()
            }
            function s() {
                ~u(r.connecting, n) || r.connecting.push(n)
            }
            return n
        }
        ,
        p.prototype.destroy = function(e) {
            var t = u(this.connecting, e);
            ~t && this.connecting.splice(t, 1),
            this.connecting.length || this.close()
        }
        ,
        p.prototype.packet = function(e) {
            c("writing packet %j", e);
            var t = this;
            e.query && 0 === e.type && (e.nsp += "?" + e.query),
            t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0,
            this.encoder.encode(e, function(n) {
                for (var r = 0; r < n.length; r++)
                    t.engine.write(n[r], e.options);
                t.encoding = !1,
                t.processPacketQueue()
            }))
        }
        ,
        p.prototype.processPacketQueue = function() {
            if (this.packetBuffer.length > 0 && !this.encoding) {
                var e = this.packetBuffer.shift();
                this.packet(e)
            }
        }
        ,
        p.prototype.cleanup = function() {
            c("cleanup");
            for (var e = this.subs.length, t = 0; t < e; t++)
                this.subs.shift().destroy();
            this.packetBuffer = [],
            this.encoding = !1,
            this.lastPing = null,
            this.decoder.destroy()
        }
        ,
        p.prototype.close = p.prototype.disconnect = function() {
            c("disconnect"),
            this.skipReconnect = !0,
            this.reconnecting = !1,
            "opening" === this.readyState && this.cleanup(),
            this.backoff.reset(),
            this.readyState = "closed",
            this.engine && this.engine.close()
        }
        ,
        p.prototype.onclose = function(e) {
            c("onclose"),
            this.cleanup(),
            this.backoff.reset(),
            this.readyState = "closed",
            this.emit("close", e),
            this._reconnection && !this.skipReconnect && this.reconnect()
        }
        ,
        p.prototype.reconnect = function() {
            if (this.reconnecting || this.skipReconnect)
                return this;
            var e = this;
            if (this.backoff.attempts >= this._reconnectionAttempts)
                c("reconnect failed"),
                this.backoff.reset(),
                this.emitAll("reconnect_failed"),
                this.reconnecting = !1;
            else {
                var t = this.backoff.duration();
                c("will wait %dms before reconnect attempt", t),
                this.reconnecting = !0;
                var n = setTimeout(function() {
                    e.skipReconnect || (c("attempting reconnect"),
                    e.emitAll("reconnect_attempt", e.backoff.attempts),
                    e.emitAll("reconnecting", e.backoff.attempts),
                    e.skipReconnect || e.open(function(t) {
                        t ? (c("reconnect attempt error"),
                        e.reconnecting = !1,
                        e.reconnect(),
                        e.emitAll("reconnect_error", t.data)) : (c("reconnect success"),
                        e.onreconnect())
                    }))
                }, t);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(n)
                    }
                })
            }
        }
        ,
        p.prototype.onreconnect = function() {
            var e = this.backoff.attempts;
            this.reconnecting = !1,
            this.backoff.reset(),
            this.updateSocketIds(),
            this.emitAll("reconnect", e)
        }
    },
    g5Dd: function(e, t) {
        !function() {
            "use strict";
            for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = new Uint8Array(256), r = 0; r < e.length; r++)
                n[e.charCodeAt(r)] = r;
            t.encode = function(t) {
                var n, r = new Uint8Array(t), o = r.length, s = "";
                for (n = 0; n < o; n += 3)
                    s += e[r[n] >> 2],
                    s += e[(3 & r[n]) << 4 | r[n + 1] >> 4],
                    s += e[(15 & r[n + 1]) << 2 | r[n + 2] >> 6],
                    s += e[63 & r[n + 2]];
                return o % 3 == 2 ? s = s.substring(0, s.length - 1) + "=" : o % 3 == 1 && (s = s.substring(0, s.length - 2) + "=="),
                s
            }
            ,
            t.decode = function(e) {
                var t, r, o, s, i, a = .75 * e.length, l = e.length, c = 0;
                "=" === e[e.length - 1] && (a--,
                "=" === e[e.length - 2] && a--);
                var u = new ArrayBuffer(a)
                  , h = new Uint8Array(u);
                for (t = 0; t < l; t += 4)
                    r = n[e.charCodeAt(t)],
                    o = n[e.charCodeAt(t + 1)],
                    s = n[e.charCodeAt(t + 2)],
                    i = n[e.charCodeAt(t + 3)],
                    h[c++] = r << 2 | o >> 4,
                    h[c++] = (15 & o) << 4 | s >> 2,
                    h[c++] = (3 & s) << 6 | 63 & i;
                return u
            }
        }()
    },
    gFX4: function(e, t, n) {
        var r = n("zJ60")
          , o = n("Vo14")
          , s = n("eOtv")
          , i = n("x7D4")("socket.io-client");
        e.exports = t = l;
        var a = t.managers = {};
        function l(e, t) {
            "object" == typeof e && (t = e,
            e = void 0),
            t = t || {};
            var n, o = r(e), l = o.source, c = o.id;
            return t.forceNew || t["force new connection"] || !1 === t.multiplex || a[c] && o.path in a[c].nsps ? (i("ignoring socket cache for %s", l),
            n = s(l, t)) : (a[c] || (i("new io instance for %s", l),
            a[c] = s(l, t)),
            n = a[c]),
            o.query && !t.query && (t.query = o.query),
            n.socket(o.path, t)
        }
        t.protocol = o.protocol,
        t.connect = l,
        t.Manager = n("eOtv"),
        t.Socket = n("KFGy")
    },
    kSER: function(e, t) {
        e.exports = function(e, t) {
            for (var n = [], r = (t = t || 0) || 0; r < e.length; r++)
                n[r - t] = e[r];
            return n
        }
    },
    lKxJ: function(e, t, n) {
        e.exports = n("2pII"),
        e.exports.parser = n("Wm4p")
    },
    lhf0: function(e, t, n) {
        function r(e) {
            var n;
            function r() {
                if (r.enabled) {
                    var e = r
                      , o = +new Date;
                    e.diff = o - (n || o),
                    e.prev = n,
                    e.curr = o,
                    n = o;
                    for (var s = new Array(arguments.length), i = 0; i < s.length; i++)
                        s[i] = arguments[i];
                    s[0] = t.coerce(s[0]),
                    "string" != typeof s[0] && s.unshift("%O");
                    var a = 0;
                    s[0] = s[0].replace(/%([a-zA-Z%])/g, function(n, r) {
                        if ("%%" === n)
                            return n;
                        a++;
                        var o = t.formatters[r];
                        return "function" == typeof o && (n = o.call(e, s[a]),
                        s.splice(a, 1),
                        a--),
                        n
                    }),
                    t.formatArgs.call(e, s),
                    (r.log || t.log || console.log.bind(console)).apply(e, s)
                }
            }
            return r.namespace = e,
            r.enabled = t.enabled(e),
            r.useColors = t.useColors(),
            r.color = function(e) {
                var n, r = 0;
                for (n in e)
                    r = (r << 5) - r + e.charCodeAt(n),
                    r |= 0;
                return t.colors[Math.abs(r) % t.colors.length]
            }(e),
            r.destroy = o,
            "function" == typeof t.init && t.init(r),
            t.instances.push(r),
            r
        }
        function o() {
            var e = t.instances.indexOf(this);
            return -1 !== e && (t.instances.splice(e, 1),
            !0)
        }
        (t = e.exports = r.debug = r.default = r).coerce = function(e) {
            return e instanceof Error ? e.stack || e.message : e
        }
        ,
        t.disable = function() {
            t.enable("")
        }
        ,
        t.enable = function(e) {
            var n;
            t.save(e),
            t.names = [],
            t.skips = [];
            var r = ("string" == typeof e ? e : "").split(/[\s,]+/)
              , o = r.length;
            for (n = 0; n < o; n++)
                r[n] && ("-" === (e = r[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));
            for (n = 0; n < t.instances.length; n++) {
                var s = t.instances[n];
                s.enabled = t.enabled(s.namespace)
            }
        }
        ,
        t.enabled = function(e) {
            if ("*" === e[e.length - 1])
                return !0;
            var n, r;
            for (n = 0,
            r = t.skips.length; n < r; n++)
                if (t.skips[n].test(e))
                    return !1;
            for (n = 0,
            r = t.names.length; n < r; n++)
                if (t.names[n].test(e))
                    return !0;
            return !1
        }
        ,
        t.humanize = n("FGiv"),
        t.instances = [],
        t.names = [],
        t.skips = [],
        t.formatters = {}
    },
    "oIG/": function(e, t) {
        var n, r, o, s = String.fromCharCode;
        function i(e) {
            for (var t, n, r = [], o = 0, s = e.length; o < s; )
                (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < s ? 56320 == (64512 & (n = e.charCodeAt(o++))) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t),
                o--) : r.push(t);
            return r
        }
        function a(e, t) {
            if (e >= 55296 && e <= 57343) {
                if (t)
                    throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value");
                return !1
            }
            return !0
        }
        function l(e, t) {
            return s(e >> t & 63 | 128)
        }
        function c(e, t) {
            if (0 == (4294967168 & e))
                return s(e);
            var n = "";
            return 0 == (4294965248 & e) ? n = s(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (a(e, t) || (e = 65533),
            n = s(e >> 12 & 15 | 224),
            n += l(e, 6)) : 0 == (4292870144 & e) && (n = s(e >> 18 & 7 | 240),
            n += l(e, 12),
            n += l(e, 6)),
            n + s(63 & e | 128)
        }
        function u() {
            if (o >= r)
                throw Error("Invalid byte index");
            var e = 255 & n[o];
            if (o++,
            128 == (192 & e))
                return 63 & e;
            throw Error("Invalid continuation byte")
        }
        function h(e) {
            var t, s;
            if (o > r)
                throw Error("Invalid byte index");
            if (o == r)
                return !1;
            if (t = 255 & n[o],
            o++,
            0 == (128 & t))
                return t;
            if (192 == (224 & t)) {
                if ((s = (31 & t) << 6 | u()) >= 128)
                    return s;
                throw Error("Invalid continuation byte")
            }
            if (224 == (240 & t)) {
                if ((s = (15 & t) << 12 | u() << 6 | u()) >= 2048)
                    return a(s, e) ? s : 65533;
                throw Error("Invalid continuation byte")
            }
            if (240 == (248 & t) && (s = (7 & t) << 18 | u() << 12 | u() << 6 | u()) >= 65536 && s <= 1114111)
                return s;
            throw Error("Invalid UTF-8 detected")
        }
        e.exports = {
            version: "2.1.2",
            encode: function(e, t) {
                for (var n = !1 !== (t = t || {}).strict, r = i(e), o = r.length, s = -1, a = ""; ++s < o; )
                    a += c(r[s], n);
                return a
            },
            decode: function(e, t) {
                var a = !1 !== (t = t || {}).strict;
                n = i(e),
                r = n.length,
                o = 0;
                for (var l, c = []; !1 !== (l = h(a)); )
                    c.push(l);
                return function(e) {
                    for (var t, n = e.length, r = -1, o = ""; ++r < n; )
                        (t = e[r]) > 65535 && (o += s((t -= 65536) >>> 10 & 1023 | 55296),
                        t = 56320 | 1023 & t),
                        o += s(t);
                    return o
                }(c)
            }
        }
    },
    ojuT: function(e, t) {
        var n = {}.toString;
        e.exports = Array.isArray || function(e) {
            return "[object Array]" == n.call(e)
        }
    },
    x7D4: function(e, t, n) {
        function r() {
            var e;
            try {
                e = t.storage.debug
            } catch (n) {}
            return !e && "undefined" != typeof process && "env"in process && (e = process.env.DEBUG),
            e
        }
        (t = e.exports = n("Q80o")).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }
        ,
        t.formatArgs = function(e) {
            var n = this.useColors;
            if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff),
            n) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var o = 0
                  , s = 0;
                e[0].replace(/%[a-zA-Z%]/g, function(e) {
                    "%%" !== e && (o++,
                    "%c" === e && (s = o))
                }),
                e.splice(s, 0, r)
            }
        }
        ,
        t.save = function(e) {
            try {
                null == e ? t.storage.removeItem("debug") : t.storage.debug = e
            } catch (n) {}
        }
        ,
        t.load = r,
        t.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }
        ,
        t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (e) {}
        }(),
        t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"],
        t.formatters.j = function(e) {
            try {
                return JSON.stringify(e)
            } catch (t) {
                return "[UnexpectedJSONParseError]: " + t.message
            }
        }
        ,
        t.enable(r())
    },
    yeub: function(e, t) {
        try {
            e.exports = "undefined" != typeof XMLHttpRequest && "withCredentials"in new XMLHttpRequest
        } catch (n) {
            e.exports = !1
        }
    },
    ypnn: function(e, t) {
        e.exports = function(e, t, n) {
            var r = e.byteLength;
            if (t = t || 0,
            n = n || r,
            e.slice)
                return e.slice(t, n);
            if (t < 0 && (t += r),
            n < 0 && (n += r),
            n > r && (n = r),
            t >= r || t >= n || 0 === r)
                return new ArrayBuffer(0);
            for (var o = new Uint8Array(e), s = new Uint8Array(n - t), i = t, a = 0; i < n; i++,
            a++)
                s[a] = o[i];
            return s.buffer
        }
    },
    zJ60: function(e, t, n) {
        var r = n("Uxeu")
          , o = n("x7D4")("socket.io-client:url");
        e.exports = function(e, t) {
            var n = e;
            t = t || global.location,
            null == e && (e = t.protocol + "//" + t.host),
            "string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? t.protocol + e : t.host + e),
            /^(https?|wss?):\/\//.test(e) || (o("protocol-less url %s", e),
            e = void 0 !== t ? t.protocol + "//" + e : "https://" + e),
            o("parse %s", e),
            n = r(e)),
            n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")),
            n.path = n.path || "/";
            var s = -1 !== n.host.indexOf(":") ? "[" + n.host + "]" : n.host;
            return n.id = n.protocol + "://" + s + ":" + n.port,
            n.href = n.protocol + "://" + s + (t && t.port === n.port ? "" : ":" + n.port),
            n
        }
    },
    zMFY: function(e, t) {
        function n() {}
        e.exports = function(e, t, r) {
            var o = !1;
            return r = r || n,
            s.count = e,
            0 === e ? t() : s;
            function s(e, n) {
                if (s.count <= 0)
                    throw new Error("after called too many times");
                --s.count,
                e ? (o = !0,
                t(e),
                t = r) : 0 !== s.count || o || t(null, n)
            }
        }
    },
    zUnb: function(e, t, n) {
        "use strict";
        function r(e) {
            return "function" == typeof e
        }
        n.r(t);
        let o = !1;
        const s = {
            Promise: void 0,
            set useDeprecatedSynchronousErrorHandling(e) {
                o = e
            },
            get useDeprecatedSynchronousErrorHandling() {
                return o
            }
        };
        function i(e) {
            setTimeout(()=>{
                throw e
            }
            )
        }
        const a = {
            closed: !0,
            next(e) {},
            error(e) {
                if (s.useDeprecatedSynchronousErrorHandling)
                    throw e;
                i(e)
            },
            complete() {}
        }
          , l = Array.isArray || (e=>e && "number" == typeof e.length);
        function c(e) {
            return null != e && "object" == typeof e
        }
        const u = {
            e: {}
        };
        let h;
        function d() {
            try {
                return h.apply(this, arguments)
            } catch (e) {
                return u.e = e,
                u
            }
        }
        function p(e) {
            return h = e,
            d
        }
        function f(e) {
            return Error.call(this),
            this.message = e ? `${e.length} errors occurred during unsubscription:\n${e.map((e,t)=>`${t + 1}) ${e.toString()}`).join("\n  ")}` : "",
            this.name = "UnsubscriptionError",
            this.errors = e,
            this
        }
        f.prototype = Object.create(Error.prototype);
        const g = f;
        class m {
            constructor(e) {
                this.closed = !1,
                this._parent = null,
                this._parents = null,
                this._subscriptions = null,
                e && (this._unsubscribe = e)
            }
            unsubscribe() {
                let e, t = !1;
                if (this.closed)
                    return;
                let {_parent: n, _parents: o, _unsubscribe: s, _subscriptions: i} = this;
                this.closed = !0,
                this._parent = null,
                this._parents = null,
                this._subscriptions = null;
                let a = -1
                  , h = o ? o.length : 0;
                for (; n; )
                    n.remove(this),
                    n = ++a < h && o[a] || null;
                if (r(s) && p(s).call(this) === u && (t = !0,
                e = e || (u.e instanceof g ? y(u.e.errors) : [u.e])),
                l(i))
                    for (a = -1,
                    h = i.length; ++a < h; ) {
                        const n = i[a];
                        if (c(n) && p(n.unsubscribe).call(n) === u) {
                            t = !0,
                            e = e || [];
                            let n = u.e;
                            n instanceof g ? e = e.concat(y(n.errors)) : e.push(n)
                        }
                    }
                if (t)
                    throw new g(e)
            }
            add(e) {
                if (!e || e === m.EMPTY)
                    return m.EMPTY;
                if (e === this)
                    return this;
                let t = e;
                switch (typeof e) {
                case "function":
                    t = new m(e);
                case "object":
                    if (t.closed || "function" != typeof t.unsubscribe)
                        return t;
                    if (this.closed)
                        return t.unsubscribe(),
                        t;
                    if ("function" != typeof t._addParent) {
                        const e = t;
                        (t = new m)._subscriptions = [e]
                    }
                    break;
                default:
                    throw new Error("unrecognized teardown " + e + " added to Subscription.")
                }
                return (this._subscriptions || (this._subscriptions = [])).push(t),
                t._addParent(this),
                t
            }
            remove(e) {
                const t = this._subscriptions;
                if (t) {
                    const n = t.indexOf(e);
                    -1 !== n && t.splice(n, 1)
                }
            }
            _addParent(e) {
                let {_parent: t, _parents: n} = this;
                t && t !== e ? n ? -1 === n.indexOf(e) && n.push(e) : this._parents = [e] : this._parent = e
            }
        }
        function y(e) {
            return e.reduce((e,t)=>e.concat(t instanceof g ? t.errors : t), [])
        }
        m.EMPTY = function(e) {
            return e.closed = !0,
            e
        }(new m);
        const v = "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random();
        class b extends m {
            constructor(e, t, n) {
                switch (super(),
                this.syncErrorValue = null,
                this.syncErrorThrown = !1,
                this.syncErrorThrowable = !1,
                this.isStopped = !1,
                this._parentSubscription = null,
                arguments.length) {
                case 0:
                    this.destination = a;
                    break;
                case 1:
                    if (!e) {
                        this.destination = a;
                        break
                    }
                    if ("object" == typeof e) {
                        e instanceof b ? (this.syncErrorThrowable = e.syncErrorThrowable,
                        this.destination = e,
                        e.add(this)) : (this.syncErrorThrowable = !0,
                        this.destination = new _(this,e));
                        break
                    }
                default:
                    this.syncErrorThrowable = !0,
                    this.destination = new _(this,e,t,n)
                }
            }
            [v]() {
                return this
            }
            static create(e, t, n) {
                const r = new b(e,t,n);
                return r.syncErrorThrowable = !1,
                r
            }
            next(e) {
                this.isStopped || this._next(e)
            }
            error(e) {
                this.isStopped || (this.isStopped = !0,
                this._error(e))
            }
            complete() {
                this.isStopped || (this.isStopped = !0,
                this._complete())
            }
            unsubscribe() {
                this.closed || (this.isStopped = !0,
                super.unsubscribe())
            }
            _next(e) {
                this.destination.next(e)
            }
            _error(e) {
                this.destination.error(e),
                this.unsubscribe()
            }
            _complete() {
                this.destination.complete(),
                this.unsubscribe()
            }
            _unsubscribeAndRecycle() {
                const {_parent: e, _parents: t} = this;
                return this._parent = null,
                this._parents = null,
                this.unsubscribe(),
                this.closed = !1,
                this.isStopped = !1,
                this._parent = e,
                this._parents = t,
                this._parentSubscription = null,
                this
            }
        }
        class _ extends b {
            constructor(e, t, n, o) {
                let s;
                super(),
                this._parentSubscriber = e;
                let i = this;
                r(t) ? s = t : t && (s = t.next,
                n = t.error,
                o = t.complete,
                t !== a && (r((i = Object.create(t)).unsubscribe) && this.add(i.unsubscribe.bind(i)),
                i.unsubscribe = this.unsubscribe.bind(this))),
                this._context = i,
                this._next = s,
                this._error = n,
                this._complete = o
            }
            next(e) {
                if (!this.isStopped && this._next) {
                    const {_parentSubscriber: t} = this;
                    s.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe() : this.__tryOrUnsub(this._next, e)
                }
            }
            error(e) {
                if (!this.isStopped) {
                    const {_parentSubscriber: t} = this
                      , {useDeprecatedSynchronousErrorHandling: n} = s;
                    if (this._error)
                        n && t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, e),
                        this.unsubscribe()) : (this.__tryOrUnsub(this._error, e),
                        this.unsubscribe());
                    else if (t.syncErrorThrowable)
                        n ? (t.syncErrorValue = e,
                        t.syncErrorThrown = !0) : i(e),
                        this.unsubscribe();
                    else {
                        if (this.unsubscribe(),
                        n)
                            throw e;
                        i(e)
                    }
                }
            }
            complete() {
                if (!this.isStopped) {
                    const {_parentSubscriber: e} = this;
                    if (this._complete) {
                        const t = ()=>this._complete.call(this._context);
                        s.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? (this.__tryOrSetError(e, t),
                        this.unsubscribe()) : (this.__tryOrUnsub(t),
                        this.unsubscribe())
                    } else
                        this.unsubscribe()
                }
            }
            __tryOrUnsub(e, t) {
                try {
                    e.call(this._context, t)
                } catch (n) {
                    if (this.unsubscribe(),
                    s.useDeprecatedSynchronousErrorHandling)
                        throw n;
                    i(n)
                }
            }
            __tryOrSetError(e, t, n) {
                if (!s.useDeprecatedSynchronousErrorHandling)
                    throw new Error("bad call");
                try {
                    t.call(this._context, n)
                } catch (r) {
                    return s.useDeprecatedSynchronousErrorHandling ? (e.syncErrorValue = r,
                    e.syncErrorThrown = !0,
                    !0) : (i(r),
                    !0)
                }
                return !1
            }
            _unsubscribe() {
                const {_parentSubscriber: e} = this;
                this._context = null,
                this._parentSubscriber = null,
                e.unsubscribe()
            }
        }
        const w = "function" == typeof Symbol && Symbol.observable || "@@observable";
        function C() {}
        class x {
            constructor(e) {
                this._isScalar = !1,
                e && (this._subscribe = e)
            }
            lift(e) {
                const t = new x;
                return t.source = this,
                t.operator = e,
                t
            }
            subscribe(e, t, n) {
                const {operator: r} = this
                  , o = function(e, t, n) {
                    if (e) {
                        if (e instanceof b)
                            return e;
                        if (e[v])
                            return e[v]()
                    }
                    return e || t || n ? new b(e,t,n) : new b(a)
                }(e, t, n);
                if (r ? r.call(o, this.source) : o.add(this.source || s.useDeprecatedSynchronousErrorHandling && !o.syncErrorThrowable ? this._subscribe(o) : this._trySubscribe(o)),
                s.useDeprecatedSynchronousErrorHandling && o.syncErrorThrowable && (o.syncErrorThrowable = !1,
                o.syncErrorThrown))
                    throw o.syncErrorValue;
                return o
            }
            _trySubscribe(e) {
                try {
                    return this._subscribe(e)
                } catch (t) {
                    s.useDeprecatedSynchronousErrorHandling && (e.syncErrorThrown = !0,
                    e.syncErrorValue = t),
                    function(e) {
                        for (; e; ) {
                            const {closed: t, destination: n, isStopped: r} = e;
                            if (t || r)
                                return !1;
                            e = n && n instanceof b ? n : null
                        }
                        return !0
                    }(e) ? e.error(t) : console.warn(t)
                }
            }
            forEach(e, t) {
                return new (t = E(t))((t,n)=>{
                    let r;
                    r = this.subscribe(t=>{
                        try {
                            e(t)
                        } catch (o) {
                            n(o),
                            r && r.unsubscribe()
                        }
                    }
                    , n, t)
                }
                )
            }
            _subscribe(e) {
                const {source: t} = this;
                return t && t.subscribe(e)
            }
            [w]() {
                return this
            }
            pipe(...e) {
                return 0 === e.length ? this : ((t = e) ? 1 === t.length ? t[0] : function(e) {
                    return t.reduce((e,t)=>t(e), e)
                }
                : C)(this);
                var t
            }
            toPromise(e) {
                return new (e = E(e))((e,t)=>{
                    let n;
                    this.subscribe(e=>n = e, e=>t(e), ()=>e(n))
                }
                )
            }
        }
        function E(e) {
            if (e || (e = s.Promise || Promise),
            !e)
                throw new Error("no Promise impl found");
            return e
        }
        function k() {
            return Error.call(this),
            this.message = "object unsubscribed",
            this.name = "ObjectUnsubscribedError",
            this
        }
        x.create = (e=>new x(e)),
        k.prototype = Object.create(Error.prototype);
        const A = k;
        class T extends m {
            constructor(e, t) {
                super(),
                this.subject = e,
                this.subscriber = t,
                this.closed = !1
            }
            unsubscribe() {
                if (this.closed)
                    return;
                this.closed = !0;
                const e = this.subject
                  , t = e.observers;
                if (this.subject = null,
                !t || 0 === t.length || e.isStopped || e.closed)
                    return;
                const n = t.indexOf(this.subscriber);
                -1 !== n && t.splice(n, 1)
            }
        }
        class S extends b {
            constructor(e) {
                super(e),
                this.destination = e
            }
        }
        class N extends x {
            constructor() {
                super(),
                this.observers = [],
                this.closed = !1,
                this.isStopped = !1,
                this.hasError = !1,
                this.thrownError = null
            }
            [v]() {
                return new S(this)
            }
            lift(e) {
                const t = new I(this,this);
                return t.operator = e,
                t
            }
            next(e) {
                if (this.closed)
                    throw new A;
                if (!this.isStopped) {
                    const {observers: t} = this
                      , n = t.length
                      , r = t.slice();
                    for (let o = 0; o < n; o++)
                        r[o].next(e)
                }
            }
            error(e) {
                if (this.closed)
                    throw new A;
                this.hasError = !0,
                this.thrownError = e,
                this.isStopped = !0;
                const {observers: t} = this
                  , n = t.length
                  , r = t.slice();
                for (let o = 0; o < n; o++)
                    r[o].error(e);
                this.observers.length = 0
            }
            complete() {
                if (this.closed)
                    throw new A;
                this.isStopped = !0;
                const {observers: e} = this
                  , t = e.length
                  , n = e.slice();
                for (let r = 0; r < t; r++)
                    n[r].complete();
                this.observers.length = 0
            }
            unsubscribe() {
                this.isStopped = !0,
                this.closed = !0,
                this.observers = null
            }
            _trySubscribe(e) {
                if (this.closed)
                    throw new A;
                return super._trySubscribe(e)
            }
            _subscribe(e) {
                if (this.closed)
                    throw new A;
                return this.hasError ? (e.error(this.thrownError),
                m.EMPTY) : this.isStopped ? (e.complete(),
                m.EMPTY) : (this.observers.push(e),
                new T(this,e))
            }
            asObservable() {
                const e = new x;
                return e.source = this,
                e
            }
        }
        N.create = ((e,t)=>new I(e,t));
        class I extends N {
            constructor(e, t) {
                super(),
                this.destination = e,
                this.source = t
            }
            next(e) {
                const {destination: t} = this;
                t && t.next && t.next(e)
            }
            error(e) {
                const {destination: t} = this;
                t && t.error && this.destination.error(e)
            }
            complete() {
                const {destination: e} = this;
                e && e.complete && this.destination.complete()
            }
            _subscribe(e) {
                const {source: t} = this;
                return t ? this.source.subscribe(e) : m.EMPTY
            }
        }
        function O(e) {
            return e && "function" == typeof e.schedule
        }
        class M extends b {
            constructor(e, t, n) {
                super(),
                this.parent = e,
                this.outerValue = t,
                this.outerIndex = n,
                this.index = 0
            }
            _next(e) {
                this.parent.notifyNext(this.outerValue, e, this.outerIndex, this.index++, this)
            }
            _error(e) {
                this.parent.notifyError(e, this),
                this.unsubscribe()
            }
            _complete() {
                this.parent.notifyComplete(this),
                this.unsubscribe()
            }
        }
        const F = e=>t=>{
            for (let n = 0, r = e.length; n < r && !t.closed; n++)
                t.next(e[n]);
            t.closed || t.complete()
        }
          , D = e=>t=>(e.then(e=>{
            t.closed || (t.next(e),
            t.complete())
        }
        , e=>t.error(e)).then(null, i),
        t);
        function P() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }
        const R = P()
          , V = e=>t=>{
            const n = e[R]();
            for (; ; ) {
                const e = n.next();
                if (e.done) {
                    t.complete();
                    break
                }
                if (t.next(e.value),
                t.closed)
                    break
            }
            return "function" == typeof n.return && t.add(()=>{
                n.return && n.return()
            }
            ),
            t
        }
          , B = e=>t=>{
            const n = e[w]();
            if ("function" != typeof n.subscribe)
                throw new TypeError("Provided object does not correctly implement Symbol.observable");
            return n.subscribe(t)
        }
          , j = e=>e && "number" == typeof e.length && "function" != typeof e;
        function L(e) {
            return e && "function" != typeof e.subscribe && "function" == typeof e.then
        }
        const H = e=>{
            if (e instanceof x)
                return t=>e._isScalar ? (t.next(e.value),
                void t.complete()) : e.subscribe(t);
            if (e && "function" == typeof e[w])
                return B(e);
            if (j(e))
                return F(e);
            if (L(e))
                return D(e);
            if (e && "function" == typeof e[R])
                return V(e);
            {
                const t = c(e) ? "an invalid object" : `'${e}'`;
                throw new TypeError(`You provided ${t} where a stream was expected.` + " You can provide an Observable, Promise, Array, or Iterable.")
            }
        }
        ;
        function U(e, t, n, r, o=new M(e,n,r)) {
            if (!o.closed)
                return H(t)(o)
        }
        class z extends b {
            notifyNext(e, t, n, r, o) {
                this.destination.next(t)
            }
            notifyError(e, t) {
                this.destination.error(e)
            }
            notifyComplete(e) {
                this.destination.complete()
            }
        }
        function $(e, t) {
            return function(n) {
                if ("function" != typeof e)
                    throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                return n.lift(new G(e,t))
            }
        }
        class G {
            constructor(e, t) {
                this.project = e,
                this.thisArg = t
            }
            call(e, t) {
                return t.subscribe(new q(e,this.project,this.thisArg))
            }
        }
        class q extends b {
            constructor(e, t, n) {
                super(e),
                this.project = t,
                this.count = 0,
                this.thisArg = n || this
            }
            _next(e) {
                let t;
                try {
                    t = this.project.call(this.thisArg, e, this.count++)
                } catch (n) {
                    return void this.destination.error(n)
                }
                this.destination.next(t)
            }
        }
        function W(e, t) {
            return new x(t ? n=>{
                const r = new m;
                let o = 0;
                return r.add(t.schedule(function() {
                    o !== e.length ? (n.next(e[o++]),
                    n.closed || r.add(this.schedule())) : n.complete()
                })),
                r
            }
            : F(e))
        }
        function Z(e, t) {
            if (!t)
                return e instanceof x ? e : new x(H(e));
            if (null != e) {
                if (function(e) {
                    return e && "function" == typeof e[w]
                }(e))
                    return function(e, t) {
                        return new x(t ? n=>{
                            const r = new m;
                            return r.add(t.schedule(()=>{
                                const o = e[w]();
                                r.add(o.subscribe({
                                    next(e) {
                                        r.add(t.schedule(()=>n.next(e)))
                                    },
                                    error(e) {
                                        r.add(t.schedule(()=>n.error(e)))
                                    },
                                    complete() {
                                        r.add(t.schedule(()=>n.complete()))
                                    }
                                }))
                            }
                            )),
                            r
                        }
                        : B(e))
                    }(e, t);
                if (L(e))
                    return function(e, t) {
                        return new x(t ? n=>{
                            const r = new m;
                            return r.add(t.schedule(()=>e.then(e=>{
                                r.add(t.schedule(()=>{
                                    n.next(e),
                                    r.add(t.schedule(()=>n.complete()))
                                }
                                ))
                            }
                            , e=>{
                                r.add(t.schedule(()=>n.error(e)))
                            }
                            ))),
                            r
                        }
                        : D(e))
                    }(e, t);
                if (j(e))
                    return W(e, t);
                if (function(e) {
                    return e && "function" == typeof e[R]
                }(e) || "string" == typeof e)
                    return function(e, t) {
                        if (!e)
                            throw new Error("Iterable cannot be null");
                        return new x(t ? n=>{
                            const r = new m;
                            let o;
                            return r.add(()=>{
                                o && "function" == typeof o.return && o.return()
                            }
                            ),
                            r.add(t.schedule(()=>{
                                o = e[R](),
                                r.add(t.schedule(function() {
                                    if (n.closed)
                                        return;
                                    let e, t;
                                    try {
                                        const s = o.next();
                                        e = s.value,
                                        t = s.done
                                    } catch (r) {
                                        return void n.error(r)
                                    }
                                    t ? n.complete() : (n.next(e),
                                    this.schedule())
                                }))
                            }
                            )),
                            r
                        }
                        : V(e))
                    }(e, t)
            }
            throw new TypeError((null !== e && typeof e || e) + " is not observable")
        }
        class K {
            constructor(e, t=Number.POSITIVE_INFINITY) {
                this.project = e,
                this.concurrent = t
            }
            call(e, t) {
                return t.subscribe(new Q(e,this.project,this.concurrent))
            }
        }
        class Q extends z {
            constructor(e, t, n=Number.POSITIVE_INFINITY) {
                super(e),
                this.project = t,
                this.concurrent = n,
                this.hasCompleted = !1,
                this.buffer = [],
                this.active = 0,
                this.index = 0
            }
            _next(e) {
                this.active < this.concurrent ? this._tryNext(e) : this.buffer.push(e)
            }
            _tryNext(e) {
                let t;
                const n = this.index++;
                try {
                    t = this.project(e, n)
                } catch (r) {
                    return void this.destination.error(r)
                }
                this.active++,
                this._innerSub(t, e, n)
            }
            _innerSub(e, t, n) {
                const r = new M(this,void 0,void 0);
                this.destination.add(r),
                U(this, e, t, n, r)
            }
            _complete() {
                this.hasCompleted = !0,
                0 === this.active && 0 === this.buffer.length && this.destination.complete(),
                this.unsubscribe()
            }
            notifyNext(e, t, n, r, o) {
                this.destination.next(t)
            }
            notifyComplete(e) {
                const t = this.buffer;
                this.remove(e),
                this.active--,
                t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
            }
        }
        function Y(e) {
            return e
        }
        function J(e=Number.POSITIVE_INFINITY) {
            return function e(t, n, r=Number.POSITIVE_INFINITY) {
                return "function" == typeof n ? o=>o.pipe(e((e,r)=>Z(t(e, r)).pipe($((t,o)=>n(e, t, r, o))), r)) : ("number" == typeof n && (r = n),
                e=>e.lift(new K(t,r)))
            }(Y, e)
        }
        function X(...e) {
            let t = Number.POSITIVE_INFINITY
              , n = null
              , r = e[e.length - 1];
            return O(r) ? (n = e.pop(),
            e.length > 1 && "number" == typeof e[e.length - 1] && (t = e.pop())) : "number" == typeof r && (t = e.pop()),
            null === n && 1 === e.length && e[0]instanceof x ? e[0] : J(t)(W(e, n))
        }
        function ee() {
            return function(e) {
                return e.lift(new te(e))
            }
        }
        class te {
            constructor(e) {
                this.connectable = e
            }
            call(e, t) {
                const {connectable: n} = this;
                n._refCount++;
                const r = new ne(e,n)
                  , o = t.subscribe(r);
                return r.closed || (r.connection = n.connect()),
                o
            }
        }
        class ne extends b {
            constructor(e, t) {
                super(e),
                this.connectable = t
            }
            _unsubscribe() {
                const {connectable: e} = this;
                if (!e)
                    return void (this.connection = null);
                this.connectable = null;
                const t = e._refCount;
                if (t <= 0)
                    return void (this.connection = null);
                if (e._refCount = t - 1,
                t > 1)
                    return void (this.connection = null);
                const {connection: n} = this
                  , r = e._connection;
                this.connection = null,
                !r || n && r !== n || r.unsubscribe()
            }
        }
        const re = class extends x {
            constructor(e, t) {
                super(),
                this.source = e,
                this.subjectFactory = t,
                this._refCount = 0,
                this._isComplete = !1
            }
            _subscribe(e) {
                return this.getSubject().subscribe(e)
            }
            getSubject() {
                const e = this._subject;
                return e && !e.isStopped || (this._subject = this.subjectFactory()),
                this._subject
            }
            connect() {
                let e = this._connection;
                return e || (this._isComplete = !1,
                (e = this._connection = new m).add(this.source.subscribe(new se(this.getSubject(),this))),
                e.closed ? (this._connection = null,
                e = m.EMPTY) : this._connection = e),
                e
            }
            refCount() {
                return ee()(this)
            }
        }
        .prototype
          , oe = {
            operator: {
                value: null
            },
            _refCount: {
                value: 0,
                writable: !0
            },
            _subject: {
                value: null,
                writable: !0
            },
            _connection: {
                value: null,
                writable: !0
            },
            _subscribe: {
                value: re._subscribe
            },
            _isComplete: {
                value: re._isComplete,
                writable: !0
            },
            getSubject: {
                value: re.getSubject
            },
            connect: {
                value: re.connect
            },
            refCount: {
                value: re.refCount
            }
        };
        class se extends S {
            constructor(e, t) {
                super(e),
                this.connectable = t
            }
            _error(e) {
                this._unsubscribe(),
                super._error(e)
            }
            _complete() {
                this.connectable._isComplete = !0,
                this._unsubscribe(),
                super._complete()
            }
            _unsubscribe() {
                const e = this.connectable;
                if (e) {
                    this.connectable = null;
                    const t = e._connection;
                    e._refCount = 0,
                    e._subject = null,
                    e._connection = null,
                    t && t.unsubscribe()
                }
            }
        }
        function ie(e, t) {
            return function(n) {
                let r;
                if (r = "function" == typeof e ? e : function() {
                    return e
                }
                ,
                "function" == typeof t)
                    return n.lift(new ae(r,t));
                const o = Object.create(n, oe);
                return o.source = n,
                o.subjectFactory = r,
                o
            }
        }
        class ae {
            constructor(e, t) {
                this.subjectFactory = e,
                this.selector = t
            }
            call(e, t) {
                const {selector: n} = this
                  , r = this.subjectFactory()
                  , o = n(r).subscribe(e);
                return o.add(t.subscribe(r)),
                o
            }
        }
        function le() {
            return new N
        }
        function ce() {
            return e=>ee()(ie(le)(e))
        }
        function ue(e) {
            for (let t in e)
                if (e[t] === ue)
                    return t;
            throw Error("Could not find renamed property on target object.")
        }
        const he = ue({
            ngInjectableDef: ue
        });
        function de(e) {
            return {
                providedIn: e.providedIn || null,
                factory: e.factory,
                value: void 0
            }
        }
        function pe(e) {
            return e.hasOwnProperty(he) ? e[he] : null
        }
        class fe {
            constructor(e, t) {
                this._desc = e,
                this.ngMetadataName = "InjectionToken",
                this.ngInjectableDef = void 0 !== t ? de({
                    providedIn: t.providedIn || "root",
                    factory: t.factory
                }) : void 0
            }
            toString() {
                return `InjectionToken ${this._desc}`
            }
        }
        const ge = "__annotations__"
          , me = "__parameters__"
          , ye = "__prop__metadata__";
        function ve(e, t, n) {
            const r = function(e) {
                return function(...t) {
                    if (e) {
                        const n = e(...t);
                        for (const e in n)
                            this[e] = n[e]
                    }
                }
            }(t);
            function o(...e) {
                if (this instanceof o)
                    return r.apply(this, e),
                    this;
                const t = new o(...e);
                return n.annotation = t,
                n;
                function n(e, n, r) {
                    const o = e.hasOwnProperty(me) ? e[me] : Object.defineProperty(e, me, {
                        value: []
                    })[me];
                    for (; o.length <= r; )
                        o.push(null);
                    return (o[r] = o[r] || []).push(t),
                    e
                }
            }
            return n && (o.prototype = Object.create(n.prototype)),
            o.prototype.ngMetadataName = e,
            o.annotationCls = o,
            o
        }
        const be = function() {
            var e = {
                Emulated: 0,
                Native: 1,
                None: 2,
                ShadowDom: 3
            };
            return e[e.Emulated] = "Emulated",
            e[e.Native] = "Native",
            e[e.None] = "None",
            e[e.ShadowDom] = "ShadowDom",
            e
        }()
          , _e = "undefined" != typeof window && window
          , we = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self
          , Ce = "undefined" != typeof global && global || _e || we
          , xe = Promise.resolve(0);
        let Ee = null;
        function ke() {
            if (!Ee) {
                const e = Ce.Symbol;
                if (e && e.iterator)
                    Ee = e.iterator;
                else {
                    const e = Object.getOwnPropertyNames(Map.prototype);
                    for (let t = 0; t < e.length; ++t) {
                        const n = e[t];
                        "entries" !== n && "size" !== n && Map.prototype[n] === Map.prototype.entries && (Ee = n)
                    }
                }
            }
            return Ee
        }
        function Ae(e) {
            "undefined" == typeof Zone ? xe.then(()=>{
                e && e.apply(null, null)
            }
            ) : Zone.current.scheduleMicroTask("scheduleMicrotask", e)
        }
        function Te(e, t) {
            return e === t || "number" == typeof e && "number" == typeof t && isNaN(e) && isNaN(t)
        }
        function Se(e) {
            if ("string" == typeof e)
                return e;
            if (e instanceof Array)
                return "[" + e.map(Se).join(", ") + "]";
            if (null == e)
                return "" + e;
            if (e.overriddenName)
                return `${e.overriddenName}`;
            if (e.name)
                return `${e.name}`;
            const t = e.toString();
            if (null == t)
                return "" + t;
            const n = t.indexOf("\n");
            return -1 === n ? t : t.substring(0, n)
        }
        const Ne = ve("Inject", e=>({
            token: e
        }))
          , Ie = ve("Optional")
          , Oe = ve("Self")
          , Me = ve("SkipSelf")
          , Fe = function() {
            var e = {
                Default: 0,
                Host: 1,
                Self: 2,
                SkipSelf: 4,
                Optional: 8
            };
            return e[e.Default] = "Default",
            e[e.Host] = "Host",
            e[e.Self] = "Self",
            e[e.SkipSelf] = "SkipSelf",
            e[e.Optional] = "Optional",
            e
        }();
        let De, Pe = void 0;
        function Re(e) {
            const t = Pe;
            return Pe = e,
            t
        }
        function Ve(e, t=Fe.Default) {
            return (De || function(e, t=Fe.Default) {
                if (void 0 === Pe)
                    throw new Error("inject() must be called from an injection context");
                return null === Pe ? function(e, t, n) {
                    const r = pe(e);
                    if (r && "root" == r.providedIn)
                        return void 0 === r.value ? r.value = r.factory() : r.value;
                    if (n & Fe.Optional)
                        return null;
                    throw new Error(`Injector: NOT_FOUND [${Se(e)}]`)
                }(e, 0, t) : Pe.get(e, t & Fe.Optional ? null : void 0, t)
            }
            )(e, t)
        }
        function Be(e, t) {
            const n = He(e)
              , r = He(t);
            if (n && r)
                return function(e, t, n) {
                    const r = e[ke()]()
                      , o = t[ke()]();
                    for (; ; ) {
                        const e = r.next()
                          , t = o.next();
                        if (e.done && t.done)
                            return !0;
                        if (e.done || t.done)
                            return !1;
                        if (!n(e.value, t.value))
                            return !1
                    }
                }(e, t, Be);
            {
                const o = e && ("object" == typeof e || "function" == typeof e)
                  , s = t && ("object" == typeof t || "function" == typeof t);
                return !(n || !o || r || !s) || Te(e, t)
            }
        }
        class je {
            constructor(e) {
                this.wrapped = e
            }
            static wrap(e) {
                return new je(e)
            }
            static unwrap(e) {
                return je.isWrapped(e) ? e.wrapped : e
            }
            static isWrapped(e) {
                return e instanceof je
            }
        }
        class Le {
            constructor(e, t, n) {
                this.previousValue = e,
                this.currentValue = t,
                this.firstChange = n
            }
            isFirstChange() {
                return this.firstChange
            }
        }
        function He(e) {
            return !!Ue(e) && (Array.isArray(e) || !(e instanceof Map) && ke()in e)
        }
        function Ue(e) {
            return null !== e && ("function" == typeof e || "object" == typeof e)
        }
        function ze(...e) {}
        const $e = ue({
            __forward_ref__: ue
        });
        function Ge(e) {
            return e.__forward_ref__ = Ge,
            e.toString = function() {
                return Se(this())
            }
            ,
            e
        }
        function qe(e) {
            const t = e;
            return "function" == typeof t && t.hasOwnProperty($e) && t.__forward_ref__ === Ge ? t() : e
        }
        const We = "__source"
          , Ze = new Object
          , Ke = Ze
          , Qe = new fe("INJECTOR");
        class Ye {
            get(e, t=Ze) {
                if (t === Ze)
                    throw new Error(`NullInjectorError: No provider for ${Se(e)}!`);
                return t
            }
        }
        class Je {
            static create(e, t) {
                return Array.isArray(e) ? new ut(e,t) : new ut(e.providers,e.parent,e.name || null)
            }
        }
        Je.THROW_IF_NOT_FOUND = Ze,
        Je.NULL = new Ye,
        Je.ngInjectableDef = de({
            providedIn: "any",
            factory: ()=>Ve(Qe)
        }),
        Je.__NG_ELEMENT_ID__ = (()=>Xe());
        const Xe = ze
          , et = function(e) {
            return e
        }
          , tt = []
          , nt = et
          , rt = function() {
            return Array.prototype.slice.call(arguments)
        }
          , ot = ue({
            provide: String,
            useValue: ue
        })
          , st = "ngTokenPath"
          , it = "ngTempTokenPath"
          , at = Je.NULL
          , lt = /\n/gm
          , ct = "\u0275";
        class ut {
            constructor(e, t=at, n=null) {
                this.parent = t,
                this.source = n;
                const r = this._records = new Map;
                r.set(Je, {
                    token: Je,
                    fn: et,
                    deps: tt,
                    value: this,
                    useNew: !1
                }),
                r.set(Qe, {
                    token: Qe,
                    fn: et,
                    deps: tt,
                    value: this,
                    useNew: !1
                }),
                function e(t, n) {
                    if (n)
                        if ((n = qe(n))instanceof Array)
                            for (let r = 0; r < n.length; r++)
                                e(t, n[r]);
                        else {
                            if ("function" == typeof n)
                                throw pt("Function/Class not supported", n);
                            if (!n || "object" != typeof n || !n.provide)
                                throw pt("Unexpected provider", n);
                            {
                                let e = qe(n.provide);
                                const r = function(e) {
                                    const t = function(e) {
                                        let t = tt;
                                        const n = e.deps;
                                        if (n && n.length) {
                                            t = [];
                                            for (let e = 0; e < n.length; e++) {
                                                let r = 6
                                                  , o = qe(n[e]);
                                                if (o instanceof Array)
                                                    for (let e = 0, t = o; e < t.length; e++) {
                                                        const n = t[e];
                                                        n instanceof Ie || n == Ie ? r |= 1 : n instanceof Me || n == Me ? r &= -3 : n instanceof Oe || n == Oe ? r &= -5 : o = n instanceof Ne ? n.token : qe(n)
                                                    }
                                                t.push({
                                                    token: o,
                                                    options: r
                                                })
                                            }
                                        } else if (e.useExisting)
                                            t = [{
                                                token: qe(e.useExisting),
                                                options: 6
                                            }];
                                        else if (!(n || ot in e))
                                            throw pt("'deps' required", e);
                                        return t
                                    }(e);
                                    let n = et
                                      , r = tt
                                      , o = !1
                                      , s = qe(e.provide);
                                    if (ot in e)
                                        r = e.useValue;
                                    else if (e.useFactory)
                                        n = e.useFactory;
                                    else if (e.useExisting)
                                        ;
                                    else if (e.useClass)
                                        o = !0,
                                        n = qe(e.useClass);
                                    else {
                                        if ("function" != typeof s)
                                            throw pt("StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable", e);
                                        o = !0,
                                        n = s
                                    }
                                    return {
                                        deps: t,
                                        fn: n,
                                        useNew: o,
                                        value: r
                                    }
                                }(n);
                                if (!0 === n.multi) {
                                    let r = t.get(e);
                                    if (r) {
                                        if (r.fn !== rt)
                                            throw ht(e)
                                    } else
                                        t.set(e, r = {
                                            token: n.provide,
                                            deps: [],
                                            useNew: !1,
                                            fn: rt,
                                            value: tt
                                        });
                                    r.deps.push({
                                        token: e = n,
                                        options: 6
                                    })
                                }
                                const o = t.get(e);
                                if (o && o.fn == rt)
                                    throw ht(e);
                                t.set(e, r)
                            }
                        }
                }(r, e)
            }
            get(e, t, n=Fe.Default) {
                const r = this._records.get(e);
                try {
                    return function e(t, n, r, o, s, i) {
                        try {
                            return function(t, n, r, o, s, i) {
                                let a;
                                if (!n || i & Fe.SkipSelf)
                                    i & Fe.Self || (a = o.get(t, s, Fe.Default));
                                else {
                                    if ((a = n.value) == nt)
                                        throw Error(ct + "Circular dependency");
                                    if (a === tt) {
                                        n.value = nt;
                                        let t = void 0
                                          , s = n.useNew
                                          , i = n.fn
                                          , l = n.deps
                                          , c = tt;
                                        if (l.length) {
                                            c = [];
                                            for (let t = 0; t < l.length; t++) {
                                                const n = l[t]
                                                  , s = n.options
                                                  , i = 2 & s ? r.get(n.token) : void 0;
                                                c.push(e(n.token, i, r, i || 4 & s ? o : at, 1 & s ? null : Je.THROW_IF_NOT_FOUND, Fe.Default))
                                            }
                                        }
                                        n.value = a = s ? new i(...c) : i.apply(t, c)
                                    }
                                }
                                return a
                            }(t, n, r, o, s, i)
                        } catch (a) {
                            throw a instanceof Error || (a = new Error(a)),
                            (a[it] = a[it] || []).unshift(t),
                            n && n.value == nt && (n.value = tt),
                            a
                        }
                    }(e, r, this._records, this.parent, t, n)
                } catch (o) {
                    const t = o[it];
                    throw e[We] && t.unshift(e[We]),
                    o.message = dt("\n" + o.message, t, this.source),
                    o[st] = t,
                    o[it] = null,
                    o
                }
            }
            toString() {
                const e = [];
                return this._records.forEach((t,n)=>e.push(Se(n))),
                `StaticInjector[${e.join(", ")}]`
            }
        }
        function ht(e) {
            return pt("Cannot mix multi providers and regular providers", e)
        }
        function dt(e, t, n=null) {
            e = e && "\n" === e.charAt(0) && e.charAt(1) == ct ? e.substr(2) : e;
            let r = Se(t);
            if (t instanceof Array)
                r = t.map(Se).join(" -> ");
            else if ("object" == typeof t) {
                let e = [];
                for (let n in t)
                    if (t.hasOwnProperty(n)) {
                        let r = t[n];
                        e.push(n + ":" + ("string" == typeof r ? JSON.stringify(r) : Se(r)))
                    }
                r = `{${e.join(", ")}}`
            }
            return `StaticInjectorError${n ? "(" + n + ")" : ""}[${r}]: ${e.replace(lt, "\n  ")}`
        }
        function pt(e, t) {
            return new Error(dt(e, t))
        }
        class ft {
        }
        class gt {
        }
        const mt = new fe("The presence of this token marks an injector as being the root injector.");
        class yt {
        }
        class vt {
        }
        function bt(e) {
            const t = Error(`No component factory found for ${Se(e)}. Did you add it to @NgModule.entryComponents?`);
            return t[_t] = e,
            t
        }
        const _t = "ngComponent";
        class wt {
            resolveComponentFactory(e) {
                throw bt(e)
            }
        }
        class Ct {
        }
        Ct.NULL = new wt;
        class xt {
            constructor(e, t, n) {
                this._parent = t,
                this._ngModule = n,
                this._factories = new Map;
                for (let r = 0; r < e.length; r++) {
                    const t = e[r];
                    this._factories.set(t.componentType, t)
                }
            }
            resolveComponentFactory(e) {
                let t = this._factories.get(e);
                if (!t && this._parent && (t = this._parent.resolveComponentFactory(e)),
                !t)
                    throw bt(e);
                return new Et(t,this._ngModule)
            }
        }
        class Et extends vt {
            constructor(e, t) {
                super(),
                this.factory = e,
                this.ngModule = t,
                this.selector = e.selector,
                this.componentType = e.componentType,
                this.ngContentSelectors = e.ngContentSelectors,
                this.inputs = e.inputs,
                this.outputs = e.outputs
            }
            create(e, t, n, r) {
                return this.factory.create(e, t, n, r || this.ngModule)
            }
        }
        class kt {
            constructor(e) {
                this.nativeElement = e
            }
        }
        kt.__NG_ELEMENT_ID__ = (()=>At(kt));
        const At = ze;
        class Tt {
        }
        class St {
        }
        const Nt = function() {
            var e = {
                Important: 1,
                DashCase: 2
            };
            return e[e.Important] = "Important",
            e[e.DashCase] = "DashCase",
            e
        }();
        class It {
        }
        It.__NG_ELEMENT_ID__ = (()=>Ot());
        const Ot = ze;
        class Mt {
            constructor(e) {
                this.full = e,
                this.major = e.split(".")[0],
                this.minor = e.split(".")[1],
                this.patch = e.split(".").slice(2).join(".")
            }
        }
        const Ft = new Mt("7.1.4");
        let Dt = !0
          , Pt = !1;
        function Rt() {
            return Pt = !0,
            Dt
        }
        class Vt {
            constructor(e) {
                if (this.defaultDoc = e,
                this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert"),
                this.inertBodyElement = this.inertDocument.body,
                null == this.inertBodyElement) {
                    const e = this.inertDocument.createElement("html");
                    this.inertDocument.appendChild(e),
                    this.inertBodyElement = this.inertDocument.createElement("body"),
                    e.appendChild(this.inertBodyElement)
                }
                this.inertBodyElement.innerHTML = '<svg><g onload="this.parentNode.remove()"></g></svg>',
                !this.inertBodyElement.querySelector || this.inertBodyElement.querySelector("svg") ? (this.inertBodyElement.innerHTML = '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">',
                this.getInertBodyElement = this.inertBodyElement.querySelector && this.inertBodyElement.querySelector("svg img") && function() {
                    try {
                        return !!window.DOMParser
                    } catch (e) {
                        return !1
                    }
                }() ? this.getInertBodyElement_DOMParser : this.getInertBodyElement_InertDocument) : this.getInertBodyElement = this.getInertBodyElement_XHR
            }
            getInertBodyElement_XHR(e) {
                e = "<body><remove></remove>" + e + "</body>";
                try {
                    e = encodeURI(e)
                } catch (r) {
                    return null
                }
                const t = new XMLHttpRequest;
                t.responseType = "document",
                t.open("GET", "data:text/html;charset=utf-8," + e, !1),
                t.send(void 0);
                const n = t.response.body;
                return n.removeChild(n.firstChild),
                n
            }
            getInertBodyElement_DOMParser(e) {
                e = "<body><remove></remove>" + e + "</body>";
                try {
                    const n = (new window.DOMParser).parseFromString(e, "text/html").body;
                    return n.removeChild(n.firstChild),
                    n
                } catch (t) {
                    return null
                }
            }
            getInertBodyElement_InertDocument(e) {
                const t = this.inertDocument.createElement("template");
                return "content"in t ? (t.innerHTML = e,
                t) : (this.inertBodyElement.innerHTML = e,
                this.defaultDoc.documentMode && this.stripCustomNsAttrs(this.inertBodyElement),
                this.inertBodyElement)
            }
            stripCustomNsAttrs(e) {
                const t = e.attributes;
                for (let r = t.length - 1; 0 < r; r--) {
                    const n = t.item(r).name;
                    "xmlns:ns1" !== n && 0 !== n.indexOf("ns1:") || e.removeAttribute(n)
                }
                let n = e.firstChild;
                for (; n; )
                    n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
                    n = n.nextSibling
            }
        }
        const Bt = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi
          , jt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
        function Lt(e) {
            return (e = String(e)).match(Bt) || e.match(jt) ? e : (Rt() && console.warn(`WARNING: sanitizing unsafe URL value ${e} (see http://g.co/ng/security#xss)`),
            "unsafe:" + e)
        }
        function Ht(e) {
            const t = {};
            for (const n of e.split(","))
                t[n] = !0;
            return t
        }
        function Ut(...e) {
            const t = {};
            for (const n of e)
                for (const e in n)
                    n.hasOwnProperty(e) && (t[e] = !0);
            return t
        }
        const zt = Ht("area,br,col,hr,img,wbr")
          , $t = Ht("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr")
          , Gt = Ht("rp,rt")
          , qt = Ut(Gt, $t)
          , Wt = Ut(zt, Ut($t, Ht("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), Ut(Gt, Ht("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), qt)
          , Zt = Ht("background,cite,href,itemtype,longdesc,poster,src,xlink:href")
          , Kt = Ht("srcset")
          , Qt = Ut(Zt, Kt, Ht("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"));
        class Yt {
            constructor() {
                this.sanitizedSomething = !1,
                this.buf = []
            }
            sanitizeChildren(e) {
                let t = e.firstChild
                  , n = !0;
                for (; t; )
                    if (t.nodeType === Node.ELEMENT_NODE ? n = this.startElement(t) : t.nodeType === Node.TEXT_NODE ? this.chars(t.nodeValue) : this.sanitizedSomething = !0,
                    n && t.firstChild)
                        t = t.firstChild;
                    else
                        for (; t; ) {
                            t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                            let e = this.checkClobberedElement(t, t.nextSibling);
                            if (e) {
                                t = e;
                                break
                            }
                            t = this.checkClobberedElement(t, t.parentNode)
                        }
                return this.buf.join("")
            }
            startElement(e) {
                const t = e.nodeName.toLowerCase();
                if (!Wt.hasOwnProperty(t))
                    return this.sanitizedSomething = !0,
                    !1;
                this.buf.push("<"),
                this.buf.push(t);
                const n = e.attributes;
                for (let o = 0; o < n.length; o++) {
                    const e = n.item(o)
                      , t = e.name
                      , s = t.toLowerCase();
                    if (!Qt.hasOwnProperty(s)) {
                        this.sanitizedSomething = !0;
                        continue
                    }
                    let i = e.value;
                    Zt[s] && (i = Lt(i)),
                    Kt[s] && (r = i,
                    i = (r = String(r)).split(",").map(e=>Lt(e.trim())).join(", ")),
                    this.buf.push(" ", t, '="', en(i), '"')
                }
                var r;
                return this.buf.push(">"),
                !0
            }
            endElement(e) {
                const t = e.nodeName.toLowerCase();
                Wt.hasOwnProperty(t) && !zt.hasOwnProperty(t) && (this.buf.push("</"),
                this.buf.push(t),
                this.buf.push(">"))
            }
            chars(e) {
                this.buf.push(en(e))
            }
            checkClobberedElement(e, t) {
                if (t && (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY)
                    throw new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`);
                return t
            }
        }
        const Jt = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
          , Xt = /([^\#-~ |!])/g;
        function en(e) {
            return e.replace(/&/g, "&amp;").replace(Jt, function(e) {
                return "&#" + (1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320) + 65536) + ";"
            }).replace(Xt, function(e) {
                return "&#" + e.charCodeAt(0) + ";"
            }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }
        let tn;
        function nn(e) {
            return "content"in e && function(e) {
                return e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
            }(e) ? e.content : null
        }
        class rn extends N {
            constructor(e=!1) {
                super(),
                this.__isAsync = e
            }
            emit(e) {
                super.next(e)
            }
            subscribe(e, t, n) {
                let r, o = e=>null, s = ()=>null;
                e && "object" == typeof e ? (r = this.__isAsync ? t=>{
                    setTimeout(()=>e.next(t))
                }
                : t=>{
                    e.next(t)
                }
                ,
                e.error && (o = this.__isAsync ? t=>{
                    setTimeout(()=>e.error(t))
                }
                : t=>{
                    e.error(t)
                }
                ),
                e.complete && (s = this.__isAsync ? ()=>{
                    setTimeout(()=>e.complete())
                }
                : ()=>{
                    e.complete()
                }
                )) : (r = this.__isAsync ? t=>{
                    setTimeout(()=>e(t))
                }
                : t=>{
                    e(t)
                }
                ,
                t && (o = this.__isAsync ? e=>{
                    setTimeout(()=>t(e))
                }
                : e=>{
                    t(e)
                }
                ),
                n && (s = this.__isAsync ? ()=>{
                    setTimeout(()=>n())
                }
                : ()=>{
                    n()
                }
                ));
                const i = super.subscribe(r, o, s);
                return e instanceof m && e.add(i),
                i
            }
        }
        class on {
        }
        on.__NG_ELEMENT_ID__ = (()=>sn(on, kt));
        const sn = ze
          , an = function() {
            var e = {
                NONE: 0,
                HTML: 1,
                STYLE: 2,
                SCRIPT: 3,
                URL: 4,
                RESOURCE_URL: 5
            };
            return e[e.NONE] = "NONE",
            e[e.HTML] = "HTML",
            e[e.STYLE] = "STYLE",
            e[e.SCRIPT] = "SCRIPT",
            e[e.URL] = "URL",
            e[e.RESOURCE_URL] = "RESOURCE_URL",
            e
        }();
        class ln {
        }
        const cn = new RegExp("^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$","g")
          , un = /^url\(([^)]+)\)$/
          , hn = Function;
        function dn(e) {
            return "function" == typeof e
        }
        const pn = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*arguments\)/
          , fn = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{/
          , gn = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(/;
        class mn {
            constructor(e) {
                this._reflect = e || Ce.Reflect
            }
            isReflectionEnabled() {
                return !0
            }
            factory(e) {
                return (...t)=>new e(...t)
            }
            _zipTypesAndAnnotations(e, t) {
                let n;
                n = void 0 === e ? new Array(t.length) : new Array(e.length);
                for (let r = 0; r < n.length; r++)
                    n[r] = void 0 === e ? [] : e[r] != Object ? [e[r]] : [],
                    t && null != t[r] && (n[r] = n[r].concat(t[r]));
                return n
            }
            _ownParameters(e, t) {
                const n = e.toString();
                if (pn.exec(n) || fn.exec(n) && !gn.exec(n))
                    return null;
                if (e.parameters && e.parameters !== t.parameters)
                    return e.parameters;
                const r = e.ctorParameters;
                if (r && r !== t.ctorParameters) {
                    const e = "function" == typeof r ? r() : r
                      , t = e.map(e=>e && e.type)
                      , n = e.map(e=>e && yn(e.decorators));
                    return this._zipTypesAndAnnotations(t, n)
                }
                const o = e.hasOwnProperty(me) && e[me]
                  , s = this._reflect && this._reflect.getOwnMetadata && this._reflect.getOwnMetadata("design:paramtypes", e);
                return s || o ? this._zipTypesAndAnnotations(s, o) : new Array(e.length).fill(void 0)
            }
            parameters(e) {
                if (!dn(e))
                    return [];
                const t = vn(e);
                let n = this._ownParameters(e, t);
                return n || t === Object || (n = this.parameters(t)),
                n || []
            }
            _ownAnnotations(e, t) {
                if (e.annotations && e.annotations !== t.annotations) {
                    let t = e.annotations;
                    return "function" == typeof t && t.annotations && (t = t.annotations),
                    t
                }
                return e.decorators && e.decorators !== t.decorators ? yn(e.decorators) : e.hasOwnProperty(ge) ? e[ge] : null
            }
            annotations(e) {
                if (!dn(e))
                    return [];
                const t = vn(e)
                  , n = this._ownAnnotations(e, t) || [];
                return (t !== Object ? this.annotations(t) : []).concat(n)
            }
            _ownPropMetadata(e, t) {
                if (e.propMetadata && e.propMetadata !== t.propMetadata) {
                    let t = e.propMetadata;
                    return "function" == typeof t && t.propMetadata && (t = t.propMetadata),
                    t
                }
                if (e.propDecorators && e.propDecorators !== t.propDecorators) {
                    const t = e.propDecorators
                      , n = {};
                    return Object.keys(t).forEach(e=>{
                        n[e] = yn(t[e])
                    }
                    ),
                    n
                }
                return e.hasOwnProperty(ye) ? e[ye] : null
            }
            propMetadata(e) {
                if (!dn(e))
                    return {};
                const t = vn(e)
                  , n = {};
                if (t !== Object) {
                    const e = this.propMetadata(t);
                    Object.keys(e).forEach(t=>{
                        n[t] = e[t]
                    }
                    )
                }
                const r = this._ownPropMetadata(e, t);
                return r && Object.keys(r).forEach(e=>{
                    const t = [];
                    n.hasOwnProperty(e) && t.push(...n[e]),
                    t.push(...r[e]),
                    n[e] = t
                }
                ),
                n
            }
            hasLifecycleHook(e, t) {
                return e instanceof hn && t in e.prototype
            }
            guards(e) {
                return {}
            }
            getter(e) {
                return new Function("o","return o." + e + ";")
            }
            setter(e) {
                return new Function("o","v","return o." + e + " = v;")
            }
            method(e) {
                return new Function("o","args",`if (!o.${e}) throw new Error('"${e}" is undefined');\n        return o.${e}.apply(o, args);`)
            }
            importUri(e) {
                return "object" == typeof e && e.filePath ? e.filePath : `./${Se(e)}`
            }
            resourceUri(e) {
                return `./${Se(e)}`
            }
            resolveIdentifier(e, t, n, r) {
                return r
            }
            resolveEnum(e, t) {
                return e[t]
            }
        }
        function yn(e) {
            return e ? e.map(e=>new (0,
            e.type.annotationCls)(...e.args ? e.args : [])) : []
        }
        function vn(e) {
            const t = e.prototype ? Object.getPrototypeOf(e.prototype) : null;
            return (t ? t.constructor : null) || Object
        }
        const bn = "ngDebugContext"
          , _n = "ngOriginalError"
          , wn = "ngErrorLogger";
        function Cn(e) {
            return e[bn]
        }
        function xn(e) {
            return e[_n]
        }
        function En(e, ...t) {
            e.error(...t)
        }
        class kn {
            constructor() {
                this._console = console
            }
            handleError(e) {
                const t = this._findOriginalError(e)
                  , n = this._findContext(e)
                  , r = function(e) {
                    return e[wn] || En
                }(e);
                r(this._console, "ERROR", e),
                t && r(this._console, "ORIGINAL ERROR", t),
                n && r(this._console, "ERROR CONTEXT", n)
            }
            _findContext(e) {
                return e ? Cn(e) ? Cn(e) : this._findContext(xn(e)) : null
            }
            _findOriginalError(e) {
                let t = xn(e);
                for (; t && xn(t); )
                    t = xn(t);
                return t
            }
        }
        function An(e) {
            return e.length > 1 ? " (" + function(e) {
                const t = [];
                for (let n = 0; n < e.length; ++n) {
                    if (t.indexOf(e[n]) > -1)
                        return t.push(e[n]),
                        t;
                    t.push(e[n])
                }
                return t
            }(e.slice().reverse()).map(e=>Se(e.token)).join(" -> ") + ")" : ""
        }
        function Tn(e, t, n, r) {
            const o = [t]
              , s = n(o)
              , i = r ? function(e, t) {
                const n = `${s} caused by: ${t instanceof Error ? t.message : t}`
                  , r = Error(n);
                return r[_n] = t,
                r
            }(0, r) : Error(s);
            return i.addKey = Sn,
            i.keys = o,
            i.injectors = [e],
            i.constructResolvingMessage = n,
            i[_n] = r,
            i
        }
        function Sn(e, t) {
            this.injectors.push(e),
            this.keys.push(t),
            this.message = this.constructResolvingMessage(this.keys)
        }
        function Nn(e, t) {
            const n = [];
            for (let r = 0, o = t.length; r < o; r++) {
                const e = t[r];
                n.push(e && 0 != e.length ? e.map(Se).join(" ") : "?")
            }
            return Error("Cannot resolve all parameters for '" + Se(e) + "'(" + n.join(", ") + "). Make sure that all the parameters are decorated with Inject or have valid type annotations and that '" + Se(e) + "' is decorated with Injectable.")
        }
        class In {
            constructor(e, t) {
                if (this.token = e,
                this.id = t,
                !e)
                    throw new Error("Token must be defined!");
                this.displayName = Se(this.token)
            }
            static get(e) {
                return Mn.get(qe(e))
            }
            static get numberOfKeys() {
                return Mn.numberOfKeys
            }
        }
        class On {
            constructor() {
                this._allKeys = new Map
            }
            get(e) {
                if (e instanceof In)
                    return e;
                if (this._allKeys.has(e))
                    return this._allKeys.get(e);
                const t = new In(e,In.numberOfKeys);
                return this._allKeys.set(e, t),
                t
            }
            get numberOfKeys() {
                return this._allKeys.size
            }
        }
        const Mn = new On;
        class Fn {
            constructor(e) {
                this.reflectionCapabilities = e
            }
            updateCapabilities(e) {
                this.reflectionCapabilities = e
            }
            factory(e) {
                return this.reflectionCapabilities.factory(e)
            }
            parameters(e) {
                return this.reflectionCapabilities.parameters(e)
            }
            annotations(e) {
                return this.reflectionCapabilities.annotations(e)
            }
            propMetadata(e) {
                return this.reflectionCapabilities.propMetadata(e)
            }
            hasLifecycleHook(e, t) {
                return this.reflectionCapabilities.hasLifecycleHook(e, t)
            }
            getter(e) {
                return this.reflectionCapabilities.getter(e)
            }
            setter(e) {
                return this.reflectionCapabilities.setter(e)
            }
            method(e) {
                return this.reflectionCapabilities.method(e)
            }
            importUri(e) {
                return this.reflectionCapabilities.importUri(e)
            }
            resourceUri(e) {
                return this.reflectionCapabilities.resourceUri(e)
            }
            resolveIdentifier(e, t, n, r) {
                return this.reflectionCapabilities.resolveIdentifier(e, t, n, r)
            }
            resolveEnum(e, t) {
                return this.reflectionCapabilities.resolveEnum(e, t)
            }
        }
        const Dn = new Fn(new mn);
        class Pn {
            constructor(e, t, n) {
                this.key = e,
                this.optional = t,
                this.visibility = n
            }
            static fromKey(e) {
                return new Pn(e,!1,null)
            }
        }
        const Rn = [];
        class Vn {
            constructor(e, t, n) {
                this.key = e,
                this.resolvedFactories = t,
                this.multiProvider = n,
                this.resolvedFactory = this.resolvedFactories[0]
            }
        }
        class Bn {
            constructor(e, t) {
                this.factory = e,
                this.dependencies = t
            }
        }
        function jn(e) {
            let t, n;
            if (e.useClass) {
                const r = qe(e.useClass);
                t = Dn.factory(r),
                n = Hn(r)
            } else
                e.useExisting ? (t = (e=>e),
                n = [Pn.fromKey(In.get(e.useExisting))]) : e.useFactory ? (t = e.useFactory,
                n = function(e, t) {
                    if (t) {
                        const n = t.map(e=>[e]);
                        return t.map(t=>Un(e, t, n))
                    }
                    return Hn(e)
                }(e.useFactory, e.deps)) : (t = (()=>e.useValue),
                n = Rn);
            return new Bn(t,n)
        }
        function Ln(e) {
            return new Vn(In.get(e.provide),[jn(e)],e.multi || !1)
        }
        function Hn(e) {
            const t = Dn.parameters(e);
            if (!t)
                return [];
            if (t.some(e=>null == e))
                throw Nn(e, t);
            return t.map(n=>Un(e, n, t))
        }
        function Un(e, t, n) {
            let r = null
              , o = !1;
            if (!Array.isArray(t))
                return zn(t instanceof Ne ? t.token : t, o, null);
            let s = null;
            for (let i = 0; i < t.length; ++i) {
                const e = t[i];
                e instanceof hn ? r = e : e instanceof Ne ? r = e.token : e instanceof Ie ? o = !0 : e instanceof Oe || e instanceof Me ? s = e : e instanceof fe && (r = e)
            }
            if (null != (r = qe(r)))
                return zn(r, o, s);
            throw Nn(e, n)
        }
        function zn(e, t, n) {
            return new Pn(In.get(e),t,n)
        }
        const $n = new Object;
        class Gn {
            static resolve(e) {
                return function(e) {
                    const t = function(e, t) {
                        for (let n = 0; n < e.length; n++) {
                            const r = e[n]
                              , o = t.get(r.key.id);
                            if (o) {
                                if (r.multiProvider !== o.multiProvider)
                                    throw Error(`Cannot mix multi providers and regular providers, got: ${o} ${r}`);
                                if (r.multiProvider)
                                    for (let e = 0; e < r.resolvedFactories.length; e++)
                                        o.resolvedFactories.push(r.resolvedFactories[e]);
                                else
                                    t.set(r.key.id, r)
                            } else {
                                let e;
                                e = r.multiProvider ? new Vn(r.key,r.resolvedFactories.slice(),r.multiProvider) : r,
                                t.set(r.key.id, e)
                            }
                        }
                        return t
                    }(function e(t, n) {
                        return t.forEach(t=>{
                            if (t instanceof hn)
                                n.push({
                                    provide: t,
                                    useClass: t
                                });
                            else if (t && "object" == typeof t && void 0 !== t.provide)
                                n.push(t);
                            else {
                                if (!(t instanceof Array))
                                    throw function(e) {
                                        return Error(`Invalid provider - only instances of Provider and Type are allowed, got: ${t}`)
                                    }();
                                e(t, n)
                            }
                        }
                        ),
                        n
                    }(e, []).map(Ln), new Map);
                    return Array.from(t.values())
                }(e)
            }
            static resolveAndCreate(e, t) {
                const n = Gn.resolve(e);
                return Gn.fromResolvedProviders(n, t)
            }
            static fromResolvedProviders(e, t) {
                return new qn(e,t)
            }
        }
        class qn {
            constructor(e, t) {
                this._constructionCounter = 0,
                this._providers = e,
                this.parent = t || null;
                const n = e.length;
                this.keyIds = new Array(n),
                this.objs = new Array(n);
                for (let r = 0; r < n; r++)
                    this.keyIds[r] = e[r].key.id,
                    this.objs[r] = $n
            }
            get(e, t=Ke) {
                return this._getByKey(In.get(e), null, t)
            }
            resolveAndCreateChild(e) {
                const t = Gn.resolve(e);
                return this.createChildFromResolved(t)
            }
            createChildFromResolved(e) {
                const t = new qn(e);
                return t.parent = this,
                t
            }
            resolveAndInstantiate(e) {
                return this.instantiateResolved(Gn.resolve([e])[0])
            }
            instantiateResolved(e) {
                return this._instantiateProvider(e)
            }
            getProviderAtIndex(e) {
                if (e < 0 || e >= this._providers.length)
                    throw function(e) {
                        return Error(`Index ${e} is out-of-bounds.`)
                    }(e);
                return this._providers[e]
            }
            _new(e) {
                if (this._constructionCounter++ > this._getMaxNumberOfObjects())
                    throw Tn(this, e.key, function(e) {
                        return `Cannot instantiate cyclic dependency!${An(e)}`
                    });
                return this._instantiateProvider(e)
            }
            _getMaxNumberOfObjects() {
                return this.objs.length
            }
            _instantiateProvider(e) {
                if (e.multiProvider) {
                    const t = new Array(e.resolvedFactories.length);
                    for (let n = 0; n < e.resolvedFactories.length; ++n)
                        t[n] = this._instantiate(e, e.resolvedFactories[n]);
                    return t
                }
                return this._instantiate(e, e.resolvedFactories[0])
            }
            _instantiate(e, t) {
                const n = t.factory;
                let r, o;
                try {
                    r = t.dependencies.map(e=>this._getByReflectiveDependency(e))
                } catch (i) {
                    throw i.addKey && i.addKey(this, e.key),
                    i
                }
                try {
                    o = n(...r)
                } catch (i) {
                    throw Tn(this, e.key, function(e) {
                        const t = Se(e[0].token);
                        return `${s.message}: Error during instantiation of ${t}!${An(e)}.`
                    }, s = i)
                }
                var s;
                return o
            }
            _getByReflectiveDependency(e) {
                return this._getByKey(e.key, e.visibility, e.optional ? null : Ke)
            }
            _getByKey(e, t, n) {
                return e === qn.INJECTOR_KEY ? this : t instanceof Oe ? this._getByKeySelf(e, n) : this._getByKeyDefault(e, n, t)
            }
            _getObjByKeyId(e) {
                for (let t = 0; t < this.keyIds.length; t++)
                    if (this.keyIds[t] === e)
                        return this.objs[t] === $n && (this.objs[t] = this._new(this._providers[t])),
                        this.objs[t];
                return $n
            }
            _throwOrNull(e, t) {
                if (t !== Ke)
                    return t;
                throw function(e, t) {
                    return Tn(e, t, function(e) {
                        return `No provider for ${Se(e[0].token)}!${An(e)}`
                    })
                }(this, e)
            }
            _getByKeySelf(e, t) {
                const n = this._getObjByKeyId(e.id);
                return n !== $n ? n : this._throwOrNull(e, t)
            }
            _getByKeyDefault(e, t, n) {
                let r;
                for (r = n instanceof Me ? this.parent : this; r instanceof qn; ) {
                    const t = r
                      , n = t._getObjByKeyId(e.id);
                    if (n !== $n)
                        return n;
                    r = t.parent
                }
                return null !== r ? r.get(e.token, t) : this._throwOrNull(e, t)
            }
            get displayName() {
                return `ReflectiveInjector(providers: [${function(e, t) {
                    const n = new Array(e._providers.length);
                    for (let r = 0; r < e._providers.length; ++r)
                        n[r] = t(e.getProviderAtIndex(r));
                    return n
                }(this, e=>' "' + e.key.displayName + '" ').join(", ")}])`
            }
            toString() {
                return this.displayName
            }
        }
        function Wn(e) {
            return !!e && "function" == typeof e.then
        }
        function Zn(e) {
            return !!e && "function" == typeof e.subscribe
        }
        qn.INJECTOR_KEY = In.get(Je);
        const Kn = new fe("Application Initializer");
        class Qn {
            constructor(e) {
                this.appInits = e,
                this.initialized = !1,
                this.done = !1,
                this.donePromise = new Promise((e,t)=>{
                    this.resolve = e,
                    this.reject = t
                }
                )
            }
            runInitializers() {
                if (this.initialized)
                    return;
                const e = []
                  , t = ()=>{
                    this.done = !0,
                    this.resolve()
                }
                ;
                if (this.appInits)
                    for (let n = 0; n < this.appInits.length; n++) {
                        const t = this.appInits[n]();
                        Wn(t) && e.push(t)
                    }
                Promise.all(e).then(()=>{
                    t()
                }
                ).catch(e=>{
                    this.reject(e)
                }
                ),
                0 === e.length && t(),
                this.initialized = !0
            }
        }
        const Yn = new fe("AppId");
        function Jn() {
            return `${Xn()}${Xn()}${Xn()}`
        }
        function Xn() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
        }
        const er = new fe("Platform Initializer")
          , tr = new fe("Platform ID")
          , nr = new fe("appBootstrapListener");
        class rr {
            log(e) {
                console.log(e)
            }
            warn(e) {
                console.warn(e)
            }
        }
        function or() {
            throw new Error("Runtime compiler is not loaded")
        }
        class sr {
            compileModuleSync(e) {
                throw or()
            }
            compileModuleAsync(e) {
                throw or()
            }
            compileModuleAndAllComponentsSync(e) {
                throw or()
            }
            compileModuleAndAllComponentsAsync(e) {
                throw or()
            }
            clearCache() {}
            clearCacheFor(e) {}
            getModuleId(e) {}
        }
        class ir {
        }
        let ar, lr;
        function cr() {
            const e = Ce.wtf;
            return !(!e || !(ar = e.trace) || (lr = ar.events,
            0))
        }
        const ur = cr()
          , hr = ur ? function(e, t=null) {
            return lr.createScope(e, t)
        }
        : (e,t)=>(function(e, t) {
            return null
        }
        )
          , dr = ur ? function(e, t) {
            return ar.leaveScope(e, t),
            t
        }
        : (e,t)=>t;
        class pr {
            constructor({enableLongStackTrace: e=!1}) {
                if (this.hasPendingMicrotasks = !1,
                this.hasPendingMacrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new rn(!1),
                this.onMicrotaskEmpty = new rn(!1),
                this.onStable = new rn(!1),
                this.onError = new rn(!1),
                "undefined" == typeof Zone)
                    throw new Error("In this configuration Angular requires Zone.js");
                var t;
                Zone.assertZonePatched(),
                this._nesting = 0,
                this._outer = this._inner = Zone.current,
                Zone.wtfZoneSpec && (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
                Zone.TaskTrackingZoneSpec && (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec)),
                e && Zone.longStackTraceZoneSpec && (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
                (t = this)._inner = t._inner.fork({
                    name: "angular",
                    properties: {
                        isAngularZone: !0
                    },
                    onInvokeTask: (e,n,r,o,s,i)=>{
                        try {
                            return yr(t),
                            e.invokeTask(r, o, s, i)
                        } finally {
                            vr(t)
                        }
                    }
                    ,
                    onInvoke: (e,n,r,o,s,i,a)=>{
                        try {
                            return yr(t),
                            e.invoke(r, o, s, i, a)
                        } finally {
                            vr(t)
                        }
                    }
                    ,
                    onHasTask: (e,n,r,o)=>{
                        e.hasTask(r, o),
                        n === r && ("microTask" == o.change ? (t.hasPendingMicrotasks = o.microTask,
                        mr(t)) : "macroTask" == o.change && (t.hasPendingMacrotasks = o.macroTask))
                    }
                    ,
                    onHandleError: (e,n,r,o)=>(e.handleError(r, o),
                    t.runOutsideAngular(()=>t.onError.emit(o)),
                    !1)
                })
            }
            static isInAngularZone() {
                return !0 === Zone.current.get("isAngularZone")
            }
            static assertInAngularZone() {
                if (!pr.isInAngularZone())
                    throw new Error("Expected to be in Angular Zone, but it is not!")
            }
            static assertNotInAngularZone() {
                if (pr.isInAngularZone())
                    throw new Error("Expected to not be in Angular Zone, but it is!")
            }
            run(e, t, n) {
                return this._inner.run(e, t, n)
            }
            runTask(e, t, n, r) {
                const o = this._inner
                  , s = o.scheduleEventTask("NgZoneEvent: " + r, e, gr, fr, fr);
                try {
                    return o.runTask(s, t, n)
                } finally {
                    o.cancelTask(s)
                }
            }
            runGuarded(e, t, n) {
                return this._inner.runGuarded(e, t, n)
            }
            runOutsideAngular(e) {
                return this._outer.run(e)
            }
        }
        function fr() {}
        const gr = {};
        function mr(e) {
            if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
                try {
                    e._nesting++,
                    e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--,
                    !e.hasPendingMicrotasks)
                        try {
                            e.runOutsideAngular(()=>e.onStable.emit(null))
                        } finally {
                            e.isStable = !0
                        }
                }
        }
        function yr(e) {
            e._nesting++,
            e.isStable && (e.isStable = !1,
            e.onUnstable.emit(null))
        }
        function vr(e) {
            e._nesting--,
            mr(e)
        }
        class br {
            constructor() {
                this.hasPendingMicrotasks = !1,
                this.hasPendingMacrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new rn,
                this.onMicrotaskEmpty = new rn,
                this.onStable = new rn,
                this.onError = new rn
            }
            run(e) {
                return e()
            }
            runGuarded(e) {
                return e()
            }
            runOutsideAngular(e) {
                return e()
            }
            runTask(e) {
                return e()
            }
        }
        class _r {
            constructor(e) {
                this._ngZone = e,
                this._pendingCount = 0,
                this._isZoneStable = !0,
                this._didWork = !1,
                this._callbacks = [],
                this.taskTrackingZone = null,
                this._watchAngularEvents(),
                e.run(()=>{
                    this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
                }
                )
            }
            _watchAngularEvents() {
                this._ngZone.onUnstable.subscribe({
                    next: ()=>{
                        this._didWork = !0,
                        this._isZoneStable = !1
                    }
                }),
                this._ngZone.runOutsideAngular(()=>{
                    this._ngZone.onStable.subscribe({
                        next: ()=>{
                            pr.assertNotInAngularZone(),
                            Ae(()=>{
                                this._isZoneStable = !0,
                                this._runCallbacksIfReady()
                            }
                            )
                        }
                    })
                }
                )
            }
            increasePendingRequestCount() {
                return this._pendingCount += 1,
                this._didWork = !0,
                this._pendingCount
            }
            decreasePendingRequestCount() {
                if (this._pendingCount -= 1,
                this._pendingCount < 0)
                    throw new Error("pending async requests below zero");
                return this._runCallbacksIfReady(),
                this._pendingCount
            }
            isStable() {
                return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
            }
            _runCallbacksIfReady() {
                if (this.isStable())
                    Ae(()=>{
                        for (; 0 !== this._callbacks.length; ) {
                            let e = this._callbacks.pop();
                            clearTimeout(e.timeoutId),
                            e.doneCb(this._didWork)
                        }
                        this._didWork = !1
                    }
                    );
                else {
                    let e = this.getPendingTasks();
                    this._callbacks = this._callbacks.filter(t=>!t.updateCb || !t.updateCb(e) || (clearTimeout(t.timeoutId),
                    !1)),
                    this._didWork = !0
                }
            }
            getPendingTasks() {
                return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(e=>({
                    source: e.source,
                    creationLocation: e.creationLocation,
                    data: e.data
                })) : []
            }
            addCallback(e, t, n) {
                let r = -1;
                t && t > 0 && (r = setTimeout(()=>{
                    this._callbacks = this._callbacks.filter(e=>e.timeoutId !== r),
                    e(this._didWork, this.getPendingTasks())
                }
                , t)),
                this._callbacks.push({
                    doneCb: e,
                    timeoutId: r,
                    updateCb: n
                })
            }
            whenStable(e, t, n) {
                if (n && !this.taskTrackingZone)
                    throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
                this.addCallback(e, t, n),
                this._runCallbacksIfReady()
            }
            getPendingRequestCount() {
                return this._pendingCount
            }
            findProviders(e, t, n) {
                return []
            }
        }
        class wr {
            constructor() {
                this._applications = new Map,
                Er.addToWindow(this)
            }
            registerApplication(e, t) {
                this._applications.set(e, t)
            }
            unregisterApplication(e) {
                this._applications.delete(e)
            }
            unregisterAllApplications() {
                this._applications.clear()
            }
            getTestability(e) {
                return this._applications.get(e) || null
            }
            getAllTestabilities() {
                return Array.from(this._applications.values())
            }
            getAllRootElements() {
                return Array.from(this._applications.keys())
            }
            findTestabilityInTree(e, t=!0) {
                return Er.findTestabilityInTree(this, e, t)
            }
        }
        wr.ctorParameters = (()=>[]);
        class Cr {
            addToWindow(e) {}
            findTestabilityInTree(e, t, n) {
                return null
            }
        }
        let xr, Er = new Cr, kr = function(e, t, n) {
            return e.get(ir).createCompiler([t]).compileModuleAsync(n)
        };
        const Ar = new fe("AllowMultipleToken");
        class Tr {
            constructor(e, t) {
                this.name = e,
                this.token = t
            }
        }
        function Sr(e, t, n=[]) {
            const r = `Platform: ${t}`
              , o = new fe(r);
            return (t=[])=>{
                let s = Nr();
                if (!s || s.injector.get(Ar, !1))
                    if (e)
                        e(n.concat(t).concat({
                            provide: o,
                            useValue: !0
                        }));
                    else {
                        const e = n.concat(t).concat({
                            provide: o,
                            useValue: !0
                        });
                        !function(e) {
                            if (xr && !xr.destroyed && !xr.injector.get(Ar, !1))
                                throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                            xr = e.get(Ir);
                            const t = e.get(er, null);
                            t && t.forEach(e=>e())
                        }(Je.create({
                            providers: e,
                            name: r
                        }))
                    }
                return function(e) {
                    const t = Nr();
                    if (!t)
                        throw new Error("No platform exists!");
                    if (!t.injector.get(e, null))
                        throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                    return t
                }(o)
            }
        }
        function Nr() {
            return xr && !xr.destroyed ? xr : null
        }
        class Ir {
            constructor(e) {
                this._injector = e,
                this._modules = [],
                this._destroyListeners = [],
                this._destroyed = !1
            }
            bootstrapModuleFactory(e, t) {
                const n = "noop" === (o = t ? t.ngZone : void 0) ? new br : ("zone.js" === o ? void 0 : o) || new pr({
                    enableLongStackTrace: Rt()
                })
                  , r = [{
                    provide: pr,
                    useValue: n
                }];
                var o;
                return n.run(()=>{
                    const t = Je.create({
                        providers: r,
                        parent: this.injector,
                        name: e.moduleType.name
                    })
                      , o = e.create(t)
                      , s = o.injector.get(kn, null);
                    if (!s)
                        throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                    return o.onDestroy(()=>Fr(this._modules, o)),
                    n.runOutsideAngular(()=>n.onError.subscribe({
                        next: e=>{
                            s.handleError(e)
                        }
                    })),
                    function(e, t, n) {
                        try {
                            const o = n();
                            return Wn(o) ? o.catch(n=>{
                                throw t.runOutsideAngular(()=>e.handleError(n)),
                                n
                            }
                            ) : o
                        } catch (r) {
                            throw t.runOutsideAngular(()=>e.handleError(r)),
                            r
                        }
                    }(s, n, ()=>{
                        const e = o.injector.get(Qn);
                        return e.runInitializers(),
                        e.donePromise.then(()=>(this._moduleDoBootstrap(o),
                        o))
                    }
                    )
                }
                )
            }
            bootstrapModule(e, t=[]) {
                const n = Or({}, t);
                return kr(this.injector, n, e).then(e=>this.bootstrapModuleFactory(e, n))
            }
            _moduleDoBootstrap(e) {
                const t = e.injector.get(Mr);
                if (e._bootstrapComponents.length > 0)
                    e._bootstrapComponents.forEach(e=>t.bootstrap(e));
                else {
                    if (!e.instance.ngDoBootstrap)
                        throw new Error(`The module ${Se(e.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` + "Please define one of these.");
                    e.instance.ngDoBootstrap(t)
                }
                this._modules.push(e)
            }
            onDestroy(e) {
                this._destroyListeners.push(e)
            }
            get injector() {
                return this._injector
            }
            destroy() {
                if (this._destroyed)
                    throw new Error("The platform has already been destroyed!");
                this._modules.slice().forEach(e=>e.destroy()),
                this._destroyListeners.forEach(e=>e()),
                this._destroyed = !0
            }
            get destroyed() {
                return this._destroyed
            }
        }
        function Or(e, t) {
            return Array.isArray(t) ? t.reduce(Or, e) : Object.assign({}, e, t)
        }
        class Mr {
            constructor(e, t, n, r, o, s) {
                this._zone = e,
                this._console = t,
                this._injector = n,
                this._exceptionHandler = r,
                this._componentFactoryResolver = o,
                this._initStatus = s,
                this._bootstrapListeners = [],
                this._views = [],
                this._runningTick = !1,
                this._enforceNoNewChanges = !1,
                this._stable = !0,
                this.componentTypes = [],
                this.components = [],
                this._enforceNoNewChanges = Rt(),
                this._zone.onMicrotaskEmpty.subscribe({
                    next: ()=>{
                        this._zone.run(()=>{
                            this.tick()
                        }
                        )
                    }
                });
                const i = new x(e=>{
                    this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks,
                    this._zone.runOutsideAngular(()=>{
                        e.next(this._stable),
                        e.complete()
                    }
                    )
                }
                )
                  , a = new x(e=>{
                    let t;
                    this._zone.runOutsideAngular(()=>{
                        t = this._zone.onStable.subscribe(()=>{
                            pr.assertNotInAngularZone(),
                            Ae(()=>{
                                this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || (this._stable = !0,
                                e.next(!0))
                            }
                            )
                        }
                        )
                    }
                    );
                    const n = this._zone.onUnstable.subscribe(()=>{
                        pr.assertInAngularZone(),
                        this._stable && (this._stable = !1,
                        this._zone.runOutsideAngular(()=>{
                            e.next(!1)
                        }
                        ))
                    }
                    );
                    return ()=>{
                        t.unsubscribe(),
                        n.unsubscribe()
                    }
                }
                );
                this.isStable = X(i, a.pipe(ce()))
            }
            bootstrap(e, t) {
                if (!this._initStatus.done)
                    throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                let n;
                n = e instanceof vt ? e : this._componentFactoryResolver.resolveComponentFactory(e),
                this.componentTypes.push(n.componentType);
                const r = n instanceof Et ? null : this._injector.get(ft)
                  , o = n.create(Je.NULL, [], t || n.selector, r);
                o.onDestroy(()=>{
                    this._unloadComponent(o)
                }
                );
                const s = o.injector.get(_r, null);
                return s && o.injector.get(wr).registerApplication(o.location.nativeElement, s),
                this._loadComponent(o),
                Rt() && this._console.log("Angular is running in the development mode. Call enableProdMode() to enable the production mode."),
                o
            }
            tick() {
                if (this._runningTick)
                    throw new Error("ApplicationRef.tick is called recursively");
                const e = Mr._tickScope();
                try {
                    this._runningTick = !0,
                    this._views.forEach(e=>e.detectChanges()),
                    this._enforceNoNewChanges && this._views.forEach(e=>e.checkNoChanges())
                } catch (t) {
                    this._zone.runOutsideAngular(()=>this._exceptionHandler.handleError(t))
                } finally {
                    this._runningTick = !1,
                    dr(e)
                }
            }
            attachView(e) {
                const t = e;
                this._views.push(t),
                t.attachToAppRef(this)
            }
            detachView(e) {
                const t = e;
                Fr(this._views, t),
                t.detachFromAppRef()
            }
            _loadComponent(e) {
                this.attachView(e.hostView),
                this.tick(),
                this.components.push(e),
                this._injector.get(nr, []).concat(this._bootstrapListeners).forEach(t=>t(e))
            }
            _unloadComponent(e) {
                this.detachView(e.hostView),
                Fr(this.components, e)
            }
            ngOnDestroy() {
                this._views.slice().forEach(e=>e.destroy())
            }
            get viewCount() {
                return this._views.length
            }
        }
        function Fr(e, t) {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        }
        Mr._tickScope = hr("ApplicationRef#tick()");
        class Dr {
            constructor() {
                this.dirty = !0,
                this._results = [],
                this.changes = new rn,
                this.length = 0
            }
            map(e) {
                return this._results.map(e)
            }
            filter(e) {
                return this._results.filter(e)
            }
            find(e) {
                return this._results.find(e)
            }
            reduce(e, t) {
                return this._results.reduce(e, t)
            }
            forEach(e) {
                this._results.forEach(e)
            }
            some(e) {
                return this._results.some(e)
            }
            toArray() {
                return this._results.slice()
            }
            [ke()]() {
                return this._results[ke()]()
            }
            toString() {
                return this._results.toString()
            }
            reset(e) {
                this._results = function e(t) {
                    return t.reduce((t,n)=>{
                        const r = Array.isArray(n) ? e(n) : n;
                        return t.concat(r)
                    }
                    , [])
                }(e),
                this.dirty = !1,
                this.length = this._results.length,
                this.last = this._results[this.length - 1],
                this.first = this._results[0]
            }
            notifyOnChanges() {
                this.changes.emit(this)
            }
            setDirty() {
                this.dirty = !0
            }
            destroy() {
                this.changes.complete(),
                this.changes.unsubscribe()
            }
        }
        class Pr {
        }
        Pr.__NG_ELEMENT_ID__ = (()=>Rr(Pr, kt));
        const Rr = ze;
        class Vr {
        }
        Vr.__NG_ELEMENT_ID__ = (()=>Br());
        const Br = (...e)=>{}
        ;
        class jr {
            constructor(e, t) {
                this.name = e,
                this.callback = t
            }
        }
        class Lr {
            constructor(e, t, n) {
                this.nativeNode = e,
                this._debugContext = n,
                this.listeners = [],
                this.parent = null,
                t && t instanceof Hr && t.addChild(this)
            }
            get injector() {
                return this._debugContext.injector
            }
            get componentInstance() {
                return this._debugContext.component
            }
            get context() {
                return this._debugContext.context
            }
            get references() {
                return this._debugContext.references
            }
            get providerTokens() {
                return this._debugContext.providerTokens
            }
        }
        class Hr extends Lr {
            constructor(e, t, n) {
                super(e, t, n),
                this.properties = {},
                this.attributes = {},
                this.classes = {},
                this.styles = {},
                this.childNodes = [],
                this.nativeElement = e
            }
            addChild(e) {
                e && (this.childNodes.push(e),
                e.parent = this)
            }
            removeChild(e) {
                const t = this.childNodes.indexOf(e);
                -1 !== t && (e.parent = null,
                this.childNodes.splice(t, 1))
            }
            insertChildrenAfter(e, t) {
                const n = this.childNodes.indexOf(e);
                -1 !== n && (this.childNodes.splice(n + 1, 0, ...t),
                t.forEach(e=>{
                    e.parent && e.parent.removeChild(e),
                    e.parent = this
                }
                ))
            }
            insertBefore(e, t) {
                const n = this.childNodes.indexOf(e);
                -1 === n ? this.addChild(t) : (t.parent && t.parent.removeChild(t),
                t.parent = this,
                this.childNodes.splice(n, 0, t))
            }
            query(e) {
                return this.queryAll(e)[0] || null
            }
            queryAll(e) {
                const t = [];
                return function e(t, n, r) {
                    t.childNodes.forEach(t=>{
                        t instanceof Hr && (n(t) && r.push(t),
                        e(t, n, r))
                    }
                    )
                }(this, e, t),
                t
            }
            queryAllNodes(e) {
                const t = [];
                return function e(t, n, r) {
                    t instanceof Hr && t.childNodes.forEach(t=>{
                        n(t) && r.push(t),
                        t instanceof Hr && e(t, n, r)
                    }
                    )
                }(this, e, t),
                t
            }
            get children() {
                return this.childNodes.filter(e=>e instanceof Hr)
            }
            triggerEventHandler(e, t) {
                this.listeners.forEach(n=>{
                    n.name == e && n.callback(t)
                }
                )
            }
        }
        const Ur = new Map;
        function zr(e) {
            return Ur.get(e) || null
        }
        function $r(e) {
            Ur.set(e.nativeNode, e)
        }
        class Gr {
            constructor() {}
            supports(e) {
                return He(e)
            }
            create(e) {
                return new Wr(e)
            }
        }
        const qr = (e,t)=>t;
        class Wr {
            constructor(e) {
                this.length = 0,
                this._linkedRecords = null,
                this._unlinkedRecords = null,
                this._previousItHead = null,
                this._itHead = null,
                this._itTail = null,
                this._additionsHead = null,
                this._additionsTail = null,
                this._movesHead = null,
                this._movesTail = null,
                this._removalsHead = null,
                this._removalsTail = null,
                this._identityChangesHead = null,
                this._identityChangesTail = null,
                this._trackByFn = e || qr
            }
            forEachItem(e) {
                let t;
                for (t = this._itHead; null !== t; t = t._next)
                    e(t)
            }
            forEachOperation(e) {
                let t = this._itHead
                  , n = this._removalsHead
                  , r = 0
                  , o = null;
                for (; t || n; ) {
                    const s = !n || t && t.currentIndex < Yr(n, r, o) ? t : n
                      , i = Yr(s, r, o)
                      , a = s.currentIndex;
                    if (s === n)
                        r--,
                        n = n._nextRemoved;
                    else if (t = t._next,
                    null == s.previousIndex)
                        r++;
                    else {
                        o || (o = []);
                        const e = i - r
                          , t = a - r;
                        if (e != t) {
                            for (let n = 0; n < e; n++) {
                                const r = n < o.length ? o[n] : o[n] = 0
                                  , s = r + n;
                                t <= s && s < e && (o[n] = r + 1)
                            }
                            o[s.previousIndex] = t - e
                        }
                    }
                    i !== a && e(s, i, a)
                }
            }
            forEachPreviousItem(e) {
                let t;
                for (t = this._previousItHead; null !== t; t = t._nextPrevious)
                    e(t)
            }
            forEachAddedItem(e) {
                let t;
                for (t = this._additionsHead; null !== t; t = t._nextAdded)
                    e(t)
            }
            forEachMovedItem(e) {
                let t;
                for (t = this._movesHead; null !== t; t = t._nextMoved)
                    e(t)
            }
            forEachRemovedItem(e) {
                let t;
                for (t = this._removalsHead; null !== t; t = t._nextRemoved)
                    e(t)
            }
            forEachIdentityChange(e) {
                let t;
                for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange)
                    e(t)
            }
            diff(e) {
                if (null == e && (e = []),
                !He(e))
                    throw new Error(`Error trying to diff '${Se(e)}'. Only arrays and iterables are allowed`);
                return this.check(e) ? this : null
            }
            onDestroy() {}
            check(e) {
                this._reset();
                let t, n, r, o = this._itHead, s = !1;
                if (Array.isArray(e)) {
                    this.length = e.length;
                    for (let t = 0; t < this.length; t++)
                        r = this._trackByFn(t, n = e[t]),
                        null !== o && Te(o.trackById, r) ? (s && (o = this._verifyReinsertion(o, n, r, t)),
                        Te(o.item, n) || this._addIdentityChange(o, n)) : (o = this._mismatch(o, n, r, t),
                        s = !0),
                        o = o._next
                } else
                    t = 0,
                    function(e, t) {
                        if (Array.isArray(e))
                            for (let n = 0; n < e.length; n++)
                                t(e[n]);
                        else {
                            const n = e[ke()]();
                            let r;
                            for (; !(r = n.next()).done; )
                                t(r.value)
                        }
                    }(e, e=>{
                        r = this._trackByFn(t, e),
                        null !== o && Te(o.trackById, r) ? (s && (o = this._verifyReinsertion(o, e, r, t)),
                        Te(o.item, e) || this._addIdentityChange(o, e)) : (o = this._mismatch(o, e, r, t),
                        s = !0),
                        o = o._next,
                        t++
                    }
                    ),
                    this.length = t;
                return this._truncate(o),
                this.collection = e,
                this.isDirty
            }
            get isDirty() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
            }
            _reset() {
                if (this.isDirty) {
                    let e, t;
                    for (e = this._previousItHead = this._itHead; null !== e; e = e._next)
                        e._nextPrevious = e._next;
                    for (e = this._additionsHead; null !== e; e = e._nextAdded)
                        e.previousIndex = e.currentIndex;
                    for (this._additionsHead = this._additionsTail = null,
                    e = this._movesHead; null !== e; e = t)
                        e.previousIndex = e.currentIndex,
                        t = e._nextMoved;
                    this._movesHead = this._movesTail = null,
                    this._removalsHead = this._removalsTail = null,
                    this._identityChangesHead = this._identityChangesTail = null
                }
            }
            _mismatch(e, t, n, r) {
                let o;
                return null === e ? o = this._itTail : (o = e._prev,
                this._remove(e)),
                null !== (e = null === this._linkedRecords ? null : this._linkedRecords.get(n, r)) ? (Te(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, o, r)) : null !== (e = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)) ? (Te(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, o, r)) : e = this._addAfter(new Zr(t,n), o, r),
                e
            }
            _verifyReinsertion(e, t, n, r) {
                let o = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
                return null !== o ? e = this._reinsertAfter(o, e._prev, r) : e.currentIndex != r && (e.currentIndex = r,
                this._addToMoves(e, r)),
                e
            }
            _truncate(e) {
                for (; null !== e; ) {
                    const t = e._next;
                    this._addToRemovals(this._unlink(e)),
                    e = t
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                null !== this._additionsTail && (this._additionsTail._nextAdded = null),
                null !== this._movesTail && (this._movesTail._nextMoved = null),
                null !== this._itTail && (this._itTail._next = null),
                null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
                null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
            }
            _reinsertAfter(e, t, n) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
                const r = e._prevRemoved
                  , o = e._nextRemoved;
                return null === r ? this._removalsHead = o : r._nextRemoved = o,
                null === o ? this._removalsTail = r : o._prevRemoved = r,
                this._insertAfter(e, t, n),
                this._addToMoves(e, n),
                e
            }
            _moveAfter(e, t, n) {
                return this._unlink(e),
                this._insertAfter(e, t, n),
                this._addToMoves(e, n),
                e
            }
            _addAfter(e, t, n) {
                return this._insertAfter(e, t, n),
                this._additionsTail = null === this._additionsTail ? this._additionsHead = e : this._additionsTail._nextAdded = e,
                e
            }
            _insertAfter(e, t, n) {
                const r = null === t ? this._itHead : t._next;
                return e._next = r,
                e._prev = t,
                null === r ? this._itTail = e : r._prev = e,
                null === t ? this._itHead = e : t._next = e,
                null === this._linkedRecords && (this._linkedRecords = new Qr),
                this._linkedRecords.put(e),
                e.currentIndex = n,
                e
            }
            _remove(e) {
                return this._addToRemovals(this._unlink(e))
            }
            _unlink(e) {
                null !== this._linkedRecords && this._linkedRecords.remove(e);
                const t = e._prev
                  , n = e._next;
                return null === t ? this._itHead = n : t._next = n,
                null === n ? this._itTail = t : n._prev = t,
                e
            }
            _addToMoves(e, t) {
                return e.previousIndex === t ? e : (this._movesTail = null === this._movesTail ? this._movesHead = e : this._movesTail._nextMoved = e,
                e)
            }
            _addToRemovals(e) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new Qr),
                this._unlinkedRecords.put(e),
                e.currentIndex = null,
                e._nextRemoved = null,
                null === this._removalsTail ? (this._removalsTail = this._removalsHead = e,
                e._prevRemoved = null) : (e._prevRemoved = this._removalsTail,
                this._removalsTail = this._removalsTail._nextRemoved = e),
                e
            }
            _addIdentityChange(e, t) {
                return e.item = t,
                this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = e : this._identityChangesTail._nextIdentityChange = e,
                e
            }
        }
        class Zr {
            constructor(e, t) {
                this.item = e,
                this.trackById = t,
                this.currentIndex = null,
                this.previousIndex = null,
                this._nextPrevious = null,
                this._prev = null,
                this._next = null,
                this._prevDup = null,
                this._nextDup = null,
                this._prevRemoved = null,
                this._nextRemoved = null,
                this._nextAdded = null,
                this._nextMoved = null,
                this._nextIdentityChange = null
            }
        }
        class Kr {
            constructor() {
                this._head = null,
                this._tail = null
            }
            add(e) {
                null === this._head ? (this._head = this._tail = e,
                e._nextDup = null,
                e._prevDup = null) : (this._tail._nextDup = e,
                e._prevDup = this._tail,
                e._nextDup = null,
                this._tail = e)
            }
            get(e, t) {
                let n;
                for (n = this._head; null !== n; n = n._nextDup)
                    if ((null === t || t <= n.currentIndex) && Te(n.trackById, e))
                        return n;
                return null
            }
            remove(e) {
                const t = e._prevDup
                  , n = e._nextDup;
                return null === t ? this._head = n : t._nextDup = n,
                null === n ? this._tail = t : n._prevDup = t,
                null === this._head
            }
        }
        class Qr {
            constructor() {
                this.map = new Map
            }
            put(e) {
                const t = e.trackById;
                let n = this.map.get(t);
                n || (n = new Kr,
                this.map.set(t, n)),
                n.add(e)
            }
            get(e, t) {
                const n = this.map.get(e);
                return n ? n.get(e, t) : null
            }
            remove(e) {
                const t = e.trackById;
                return this.map.get(t).remove(e) && this.map.delete(t),
                e
            }
            get isEmpty() {
                return 0 === this.map.size
            }
            clear() {
                this.map.clear()
            }
        }
        function Yr(e, t, n) {
            const r = e.previousIndex;
            if (null === r)
                return r;
            let o = 0;
            return n && r < n.length && (o = n[r]),
            r + t + o
        }
        class Jr {
            constructor() {}
            supports(e) {
                return e instanceof Map || Ue(e)
            }
            create() {
                return new Xr
            }
        }
        class Xr {
            constructor() {
                this._records = new Map,
                this._mapHead = null,
                this._appendAfter = null,
                this._previousMapHead = null,
                this._changesHead = null,
                this._changesTail = null,
                this._additionsHead = null,
                this._additionsTail = null,
                this._removalsHead = null,
                this._removalsTail = null
            }
            get isDirty() {
                return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
            }
            forEachItem(e) {
                let t;
                for (t = this._mapHead; null !== t; t = t._next)
                    e(t)
            }
            forEachPreviousItem(e) {
                let t;
                for (t = this._previousMapHead; null !== t; t = t._nextPrevious)
                    e(t)
            }
            forEachChangedItem(e) {
                let t;
                for (t = this._changesHead; null !== t; t = t._nextChanged)
                    e(t)
            }
            forEachAddedItem(e) {
                let t;
                for (t = this._additionsHead; null !== t; t = t._nextAdded)
                    e(t)
            }
            forEachRemovedItem(e) {
                let t;
                for (t = this._removalsHead; null !== t; t = t._nextRemoved)
                    e(t)
            }
            diff(e) {
                if (e) {
                    if (!(e instanceof Map || Ue(e)))
                        throw new Error(`Error trying to diff '${Se(e)}'. Only maps and objects are allowed`)
                } else
                    e = new Map;
                return this.check(e) ? this : null
            }
            onDestroy() {}
            check(e) {
                this._reset();
                let t = this._mapHead;
                if (this._appendAfter = null,
                this._forEach(e, (e,n)=>{
                    if (t && t.key === n)
                        this._maybeAddToChanges(t, e),
                        this._appendAfter = t,
                        t = t._next;
                    else {
                        const r = this._getOrCreateRecordForKey(n, e);
                        t = this._insertBeforeOrAppend(t, r)
                    }
                }
                ),
                t) {
                    t._prev && (t._prev._next = null),
                    this._removalsHead = t;
                    for (let e = t; null !== e; e = e._nextRemoved)
                        e === this._mapHead && (this._mapHead = null),
                        this._records.delete(e.key),
                        e._nextRemoved = e._next,
                        e.previousValue = e.currentValue,
                        e.currentValue = null,
                        e._prev = null,
                        e._next = null
                }
                return this._changesTail && (this._changesTail._nextChanged = null),
                this._additionsTail && (this._additionsTail._nextAdded = null),
                this.isDirty
            }
            _insertBeforeOrAppend(e, t) {
                if (e) {
                    const n = e._prev;
                    return t._next = e,
                    t._prev = n,
                    e._prev = t,
                    n && (n._next = t),
                    e === this._mapHead && (this._mapHead = t),
                    this._appendAfter = e,
                    e
                }
                return this._appendAfter ? (this._appendAfter._next = t,
                t._prev = this._appendAfter) : this._mapHead = t,
                this._appendAfter = t,
                null
            }
            _getOrCreateRecordForKey(e, t) {
                if (this._records.has(e)) {
                    const n = this._records.get(e);
                    this._maybeAddToChanges(n, t);
                    const r = n._prev
                      , o = n._next;
                    return r && (r._next = o),
                    o && (o._prev = r),
                    n._next = null,
                    n._prev = null,
                    n
                }
                const n = new eo(e);
                return this._records.set(e, n),
                n.currentValue = t,
                this._addToAdditions(n),
                n
            }
            _reset() {
                if (this.isDirty) {
                    let e;
                    for (this._previousMapHead = this._mapHead,
                    e = this._previousMapHead; null !== e; e = e._next)
                        e._nextPrevious = e._next;
                    for (e = this._changesHead; null !== e; e = e._nextChanged)
                        e.previousValue = e.currentValue;
                    for (e = this._additionsHead; null != e; e = e._nextAdded)
                        e.previousValue = e.currentValue;
                    this._changesHead = this._changesTail = null,
                    this._additionsHead = this._additionsTail = null,
                    this._removalsHead = null
                }
            }
            _maybeAddToChanges(e, t) {
                Te(t, e.currentValue) || (e.previousValue = e.currentValue,
                e.currentValue = t,
                this._addToChanges(e))
            }
            _addToAdditions(e) {
                null === this._additionsHead ? this._additionsHead = this._additionsTail = e : (this._additionsTail._nextAdded = e,
                this._additionsTail = e)
            }
            _addToChanges(e) {
                null === this._changesHead ? this._changesHead = this._changesTail = e : (this._changesTail._nextChanged = e,
                this._changesTail = e)
            }
            _forEach(e, t) {
                e instanceof Map ? e.forEach(t) : Object.keys(e).forEach(n=>t(e[n], n))
            }
        }
        class eo {
            constructor(e) {
                this.key = e,
                this.previousValue = null,
                this.currentValue = null,
                this._nextPrevious = null,
                this._next = null,
                this._prev = null,
                this._nextAdded = null,
                this._nextRemoved = null,
                this._nextChanged = null
            }
        }
        class to {
            constructor(e) {
                this.factories = e
            }
            static create(e, t) {
                if (null != t) {
                    const n = t.factories.slice();
                    e = e.concat(n)
                }
                return new to(e)
            }
            static extend(e) {
                return {
                    provide: to,
                    useFactory: t=>{
                        if (!t)
                            throw new Error("Cannot extend IterableDiffers without a parent injector");
                        return to.create(e, t)
                    }
                    ,
                    deps: [[to, new Me, new Ie]]
                }
            }
            find(e) {
                const t = this.factories.find(t=>t.supports(e));
                if (null != t)
                    return t;
                throw new Error(`Cannot find a differ supporting object '${e}' of type '${n = e,
                n.name || typeof n}'`);
                var n
            }
        }
        to.ngInjectableDef = de({
            providedIn: "root",
            factory: ()=>new to([new Gr])
        });
        class no {
            constructor(e) {
                this.factories = e
            }
            static create(e, t) {
                if (t) {
                    const n = t.factories.slice();
                    e = e.concat(n)
                }
                return new no(e)
            }
            static extend(e) {
                return {
                    provide: no,
                    useFactory: t=>{
                        if (!t)
                            throw new Error("Cannot extend KeyValueDiffers without a parent injector");
                        return no.create(e, t)
                    }
                    ,
                    deps: [[no, new Me, new Ie]]
                }
            }
            find(e) {
                const t = this.factories.find(t=>t.supports(e));
                if (t)
                    return t;
                throw new Error(`Cannot find a differ supporting object '${e}'`)
            }
        }
        no.ngInjectableDef = de({
            providedIn: "root",
            factory: ()=>new no([new Jr])
        });
        const ro = [new Jr]
          , oo = new to([new Gr])
          , so = new no(ro)
          , io = Sr(null, "core", [{
            provide: tr,
            useValue: "unknown"
        }, {
            provide: Ir,
            deps: [Je]
        }, {
            provide: wr,
            deps: []
        }, {
            provide: rr,
            deps: []
        }])
          , ao = new fe("LocaleId");
        function lo() {
            return oo
        }
        function co() {
            return so
        }
        function uo(e) {
            return e || "en-US"
        }
        class ho {
            constructor(e) {}
        }
        const po = !1;
        function fo(e, t, n) {
            const r = e.state
              , o = 1792 & r;
            return o === t ? (e.state = -1793 & r | n,
            e.initIndex = -1,
            !0) : o === n
        }
        function go(e, t, n) {
            return (1792 & e.state) === t && e.initIndex <= n && (e.initIndex = n + 1,
            !0)
        }
        function mo(e, t) {
            return e.nodes[t]
        }
        function yo(e, t) {
            return e.nodes[t]
        }
        function vo(e, t) {
            return e.nodes[t]
        }
        function bo(e, t) {
            return e.nodes[t]
        }
        function _o(e, t) {
            return e.nodes[t]
        }
        const wo = {
            setCurrentNode: void 0,
            createRootView: void 0,
            createEmbeddedView: void 0,
            createComponentView: void 0,
            createNgModuleRef: void 0,
            overrideProvider: void 0,
            overrideComponentView: void 0,
            clearOverrides: void 0,
            checkAndUpdateView: void 0,
            checkNoChangesView: void 0,
            destroyView: void 0,
            resolveDep: void 0,
            createDebugContext: void 0,
            handleEvent: void 0,
            updateDirectives: void 0,
            updateRenderer: void 0,
            dirtyParentQueries: void 0
        };
        function Co(e, t, n, r) {
            let o = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${t}'. Current value: '${n}'.`;
            return r && (o += " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"),
            function(e, t) {
                const n = new Error(e);
                return xo(n, t),
                n
            }(o, e)
        }
        function xo(e, t) {
            e[bn] = t,
            e[wn] = t.logError.bind(t)
        }
        function Eo(e) {
            return new Error(`ViewDestroyedError: Attempt to use a destroyed view: ${e}`)
        }
        const ko = ()=>{}
          , Ao = new Map;
        function To(e) {
            let t = Ao.get(e);
            return t || (t = Se(e) + "_" + Ao.size,
            Ao.set(e, t)),
            t
        }
        const So = "$$undefined"
          , No = "$$empty";
        function Io(e) {
            return {
                id: So,
                styles: e.styles,
                encapsulation: e.encapsulation,
                data: e.data
            }
        }
        let Oo = 0;
        function Mo(e, t, n, r) {
            return !(!(2 & e.state) && Te(e.oldValues[t.bindingIndex + n], r))
        }
        function Fo(e, t, n, r) {
            return !!Mo(e, t, n, r) && (e.oldValues[t.bindingIndex + n] = r,
            !0)
        }
        function Do(e, t, n, r) {
            const o = e.oldValues[t.bindingIndex + n];
            if (1 & e.state || !Be(o, r)) {
                const s = t.bindings[n].name;
                throw Co(wo.createDebugContext(e, t.nodeIndex), `${s}: ${o}`, `${s}: ${r}`, 0 != (1 & e.state))
            }
        }
        function Po(e) {
            let t = e;
            for (; t; )
                2 & t.def.flags && (t.state |= 8),
                t = t.viewContainerParent || t.parent
        }
        function Ro(e, t) {
            let n = e;
            for (; n && n !== t; )
                n.state |= 64,
                n = n.viewContainerParent || n.parent
        }
        function Vo(e, t, n, r) {
            try {
                return Po(33554432 & e.def.nodes[t].flags ? yo(e, t).componentView : e),
                wo.handleEvent(e, t, n, r)
            } catch (o) {
                e.root.errorHandler.handleError(o)
            }
        }
        function Bo(e) {
            return e.parent ? yo(e.parent, e.parentNodeDef.nodeIndex) : null
        }
        function jo(e) {
            return e.parent ? e.parentNodeDef.parent : null
        }
        function Lo(e, t) {
            switch (201347067 & t.flags) {
            case 1:
                return yo(e, t.nodeIndex).renderElement;
            case 2:
                return mo(e, t.nodeIndex).renderText
            }
        }
        function Ho(e) {
            return !!e.parent && !!(32768 & e.parentNodeDef.flags)
        }
        function Uo(e) {
            return !(!e.parent || 32768 & e.parentNodeDef.flags)
        }
        function zo(e) {
            const t = {};
            let n = 0;
            const r = {};
            return e && e.forEach(([e,o])=>{
                "number" == typeof e ? (t[e] = o,
                n |= function(e) {
                    return 1 << e % 32
                }(e)) : r[e] = o
            }
            ),
            {
                matchedQueries: t,
                references: r,
                matchedQueryIds: n
            }
        }
        function $o(e, t) {
            return e.map(e=>{
                let n, r;
                return Array.isArray(e) ? [r,n] = e : (r = 0,
                n = e),
                n && ("function" == typeof n || "object" == typeof n) && t && Object.defineProperty(n, We, {
                    value: t,
                    configurable: !0
                }),
                {
                    flags: r,
                    token: n,
                    tokenKey: To(n)
                }
            }
            )
        }
        function Go(e, t, n) {
            let r = n.renderParent;
            return r ? 0 == (1 & r.flags) || 0 == (33554432 & r.flags) || r.element.componentRendererType && r.element.componentRendererType.encapsulation === be.Native ? yo(e, n.renderParent.nodeIndex).renderElement : void 0 : t
        }
        const qo = new WeakMap;
        function Wo(e) {
            let t = qo.get(e);
            return t || ((t = e(()=>ko)).factory = e,
            qo.set(e, t)),
            t
        }
        function Zo(e, t, n, r, o) {
            3 === t && (n = e.renderer.parentNode(Lo(e, e.def.lastRenderRootNode))),
            Ko(e, t, 0, e.def.nodes.length - 1, n, r, o)
        }
        function Ko(e, t, n, r, o, s, i) {
            for (let a = n; a <= r; a++) {
                const n = e.def.nodes[a];
                11 & n.flags && Yo(e, n, t, o, s, i),
                a += n.childCount
            }
        }
        function Qo(e, t, n, r, o, s) {
            let i = e;
            for (; i && !Ho(i); )
                i = i.parent;
            const a = i.parent
              , l = jo(i)
              , c = l.nodeIndex + l.childCount;
            for (let u = l.nodeIndex + 1; u <= c; u++) {
                const e = a.def.nodes[u];
                e.ngContentIndex === t && Yo(a, e, n, r, o, s),
                u += e.childCount
            }
            if (!a.parent) {
                const i = e.root.projectableNodes[t];
                if (i)
                    for (let t = 0; t < i.length; t++)
                        Jo(e, i[t], n, r, o, s)
            }
        }
        function Yo(e, t, n, r, o, s) {
            if (8 & t.flags)
                Qo(e, t.ngContent.index, n, r, o, s);
            else {
                const i = Lo(e, t);
                if (3 === n && 33554432 & t.flags && 48 & t.bindingFlags ? (16 & t.bindingFlags && Jo(e, i, n, r, o, s),
                32 & t.bindingFlags && Jo(yo(e, t.nodeIndex).componentView, i, n, r, o, s)) : Jo(e, i, n, r, o, s),
                16777216 & t.flags) {
                    const i = yo(e, t.nodeIndex).viewContainer._embeddedViews;
                    for (let e = 0; e < i.length; e++)
                        Zo(i[e], n, r, o, s)
                }
                1 & t.flags && !t.element.name && Ko(e, n, t.nodeIndex + 1, t.nodeIndex + t.childCount, r, o, s)
            }
        }
        function Jo(e, t, n, r, o, s) {
            const i = e.renderer;
            switch (n) {
            case 1:
                i.appendChild(r, t);
                break;
            case 2:
                i.insertBefore(r, t, o);
                break;
            case 3:
                i.removeChild(r, t);
                break;
            case 0:
                s.push(t)
            }
        }
        const Xo = /^:([^:]+):(.+)$/;
        function es(e) {
            if (":" === e[0]) {
                const t = e.match(Xo);
                return [t[1], t[2]]
            }
            return ["", e]
        }
        function ts(e) {
            let t = 0;
            for (let n = 0; n < e.length; n++)
                t |= e[n].flags;
            return t
        }
        function ns(e, t, n, r, o, s) {
            e |= 1;
            const {matchedQueries: i, references: a, matchedQueryIds: l} = zo(t);
            return {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                flags: e,
                checkIndex: -1,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: i,
                matchedQueryIds: l,
                references: a,
                ngContentIndex: n,
                childCount: r,
                bindings: [],
                bindingFlags: 0,
                outputs: [],
                element: {
                    ns: null,
                    name: null,
                    attrs: null,
                    template: s ? Wo(s) : null,
                    componentProvider: null,
                    componentView: null,
                    componentRendererType: null,
                    publicProviders: null,
                    allProviders: null,
                    handleEvent: o || ko
                },
                provider: null,
                text: null,
                query: null,
                ngContent: null
            }
        }
        function rs(e, t, n, r, o, s, i=[], a, l, c, u, h) {
            c || (c = ko);
            const {matchedQueries: d, references: p, matchedQueryIds: f} = zo(n);
            let g = null
              , m = null;
            s && ([g,m] = es(s)),
            a = a || [];
            const y = new Array(a.length);
            for (let _ = 0; _ < a.length; _++) {
                const [e,t,n] = a[_]
                  , [r,o] = es(t);
                let s = void 0
                  , i = void 0;
                switch (15 & e) {
                case 4:
                    i = n;
                    break;
                case 1:
                case 8:
                    s = n
                }
                y[_] = {
                    flags: e,
                    ns: r,
                    name: o,
                    nonMinifiedName: o,
                    securityContext: s,
                    suffix: i
                }
            }
            l = l || [];
            const v = new Array(l.length);
            for (let _ = 0; _ < l.length; _++) {
                const [e,t] = l[_];
                v[_] = {
                    type: 0,
                    target: e,
                    eventName: t,
                    propName: null
                }
            }
            const b = (i = i || []).map(([e,t])=>{
                const [n,r] = es(e);
                return [n, r, t]
            }
            );
            return h = function(e) {
                if (e && e.id === So) {
                    const t = null != e.encapsulation && e.encapsulation !== be.None || e.styles.length || Object.keys(e.data).length;
                    e.id = t ? `c${Oo++}` : No
                }
                return e && e.id === No && (e = null),
                e || null
            }(h),
            u && (t |= 33554432),
            {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                checkIndex: e,
                flags: t |= 1,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: d,
                matchedQueryIds: f,
                references: p,
                ngContentIndex: r,
                childCount: o,
                bindings: y,
                bindingFlags: ts(y),
                outputs: v,
                element: {
                    ns: g,
                    name: m,
                    attrs: b,
                    template: null,
                    componentProvider: null,
                    componentView: u || null,
                    componentRendererType: h,
                    publicProviders: null,
                    allProviders: null,
                    handleEvent: c || ko
                },
                provider: null,
                text: null,
                query: null,
                ngContent: null
            }
        }
        function os(e, t, n) {
            const r = n.element
              , o = e.root.selectorOrNode
              , s = e.renderer;
            let i;
            if (e.parent || !o) {
                i = r.name ? s.createElement(r.name, r.ns) : s.createComment("");
                const o = Go(e, t, n);
                o && s.appendChild(o, i)
            } else
                i = s.selectRootElement(o, !!r.componentRendererType && r.componentRendererType.encapsulation === be.ShadowDom);
            if (r.attrs)
                for (let a = 0; a < r.attrs.length; a++) {
                    const [e,t,n] = r.attrs[a];
                    s.setAttribute(i, t, n, e)
                }
            return i
        }
        function ss(e, t, n, r) {
            for (let i = 0; i < n.outputs.length; i++) {
                const a = n.outputs[i]
                  , l = is(e, n.nodeIndex, (s = a.eventName,
                (o = a.target) ? `${o}:${s}` : s));
                let c = a.target
                  , u = e;
                "component" === a.target && (c = null,
                u = t);
                const h = u.renderer.listen(c || r, a.eventName, l);
                e.disposables[n.outputIndex + i] = h
            }
            var o, s
        }
        function is(e, t, n) {
            return r=>Vo(e, t, n, r)
        }
        function as(e, t, n, r) {
            if (!Fo(e, t, n, r))
                return !1;
            const o = t.bindings[n]
              , s = yo(e, t.nodeIndex)
              , i = s.renderElement
              , a = o.name;
            switch (15 & o.flags) {
            case 1:
                !function(e, t, n, r, o, s) {
                    const i = t.securityContext;
                    let a = i ? e.root.sanitizer.sanitize(i, s) : s;
                    a = null != a ? a.toString() : null;
                    const l = e.renderer;
                    null != s ? l.setAttribute(n, o, a, r) : l.removeAttribute(n, o, r)
                }(e, o, i, o.ns, a, r);
                break;
            case 2:
                !function(e, t, n, r) {
                    const o = e.renderer;
                    r ? o.addClass(t, n) : o.removeClass(t, n)
                }(e, i, a, r);
                break;
            case 4:
                !function(e, t, n, r, o) {
                    let s = e.root.sanitizer.sanitize(an.STYLE, o);
                    if (null != s) {
                        s = s.toString();
                        const e = t.suffix;
                        null != e && (s += e)
                    } else
                        s = null;
                    const i = e.renderer;
                    null != s ? i.setStyle(n, r, s) : i.removeStyle(n, r)
                }(e, o, i, a, r);
                break;
            case 8:
                !function(e, t, n, r, o) {
                    const s = t.securityContext;
                    let i = s ? e.root.sanitizer.sanitize(s, o) : o;
                    e.renderer.setProperty(n, r, i)
                }(33554432 & t.flags && 32 & o.flags ? s.componentView : e, o, i, a, r)
            }
            return !0
        }
        const ls = new Object
          , cs = To(Je)
          , us = To(Qe)
          , hs = To(ft);
        function ds(e, t, n, r) {
            return n = qe(n),
            {
                index: -1,
                deps: $o(r, Se(t)),
                flags: e,
                token: t,
                value: n
            }
        }
        function ps(e, t, n=Je.THROW_IF_NOT_FOUND) {
            const r = Re(e);
            try {
                if (8 & t.flags)
                    return t.token;
                if (2 & t.flags && (n = null),
                1 & t.flags)
                    return e._parent.get(t.token, n);
                const i = t.tokenKey;
                switch (i) {
                case cs:
                case us:
                case hs:
                    return e
                }
                const a = e._def.providersByKey[i];
                let l;
                if (a) {
                    let t = e._providers[a.index];
                    return void 0 === t && (t = e._providers[a.index] = fs(e, a)),
                    t === ls ? void 0 : t
                }
                if ((l = pe(t.token)) && (o = e,
                null != (s = l).providedIn && (function(e, t) {
                    return e._def.modules.indexOf(s.providedIn) > -1
                }(o) || "root" === s.providedIn && o._def.isRoot))) {
                    const n = e._providers.length;
                    return e._def.providersByKey[t.tokenKey] = {
                        flags: 5120,
                        value: l.factory,
                        deps: [],
                        index: n,
                        token: t.token
                    },
                    e._providers[n] = ls,
                    e._providers[n] = fs(e, e._def.providersByKey[t.tokenKey])
                }
                return 4 & t.flags ? n : e._parent.get(t.token, n)
            } finally {
                Re(r)
            }
            var o, s
        }
        function fs(e, t) {
            let n;
            switch (201347067 & t.flags) {
            case 512:
                n = function(e, t, n) {
                    const r = n.length;
                    switch (r) {
                    case 0:
                        return new t;
                    case 1:
                        return new t(ps(e, n[0]));
                    case 2:
                        return new t(ps(e, n[0]),ps(e, n[1]));
                    case 3:
                        return new t(ps(e, n[0]),ps(e, n[1]),ps(e, n[2]));
                    default:
                        const o = new Array(r);
                        for (let t = 0; t < r; t++)
                            o[t] = ps(e, n[t]);
                        return new t(...o)
                    }
                }(e, t.value, t.deps);
                break;
            case 1024:
                n = function(e, t, n) {
                    const r = n.length;
                    switch (r) {
                    case 0:
                        return t();
                    case 1:
                        return t(ps(e, n[0]));
                    case 2:
                        return t(ps(e, n[0]), ps(e, n[1]));
                    case 3:
                        return t(ps(e, n[0]), ps(e, n[1]), ps(e, n[2]));
                    default:
                        const o = Array(r);
                        for (let t = 0; t < r; t++)
                            o[t] = ps(e, n[t]);
                        return t(...o)
                    }
                }(e, t.value, t.deps);
                break;
            case 2048:
                n = ps(e, t.deps[0]);
                break;
            case 256:
                n = t.value
            }
            return n === ls || null == n || "object" != typeof n || 131072 & t.flags || "function" != typeof n.ngOnDestroy || (t.flags |= 131072),
            void 0 === n ? ls : n
        }
        function gs(e, t) {
            const n = e.viewContainer._embeddedViews;
            if ((null == t || t >= n.length) && (t = n.length - 1),
            t < 0)
                return null;
            const r = n[t];
            return r.viewContainerParent = null,
            bs(n, t),
            wo.dirtyParentQueries(r),
            ys(r),
            r
        }
        function ms(e, t, n) {
            const r = t ? Lo(t, t.def.lastRenderRootNode) : e.renderElement
              , o = n.renderer.parentNode(r)
              , s = n.renderer.nextSibling(r);
            Zo(n, 2, o, s, void 0)
        }
        function ys(e) {
            Zo(e, 3, null, null, void 0)
        }
        function vs(e, t, n) {
            t >= e.length ? e.push(n) : e.splice(t, 0, n)
        }
        function bs(e, t) {
            t >= e.length - 1 ? e.pop() : e.splice(t, 1)
        }
        const _s = new Object;
        function ws(e, t, n, r, o, s) {
            return new Cs(e,t,n,r,o,s)
        }
        class Cs extends vt {
            constructor(e, t, n, r, o, s) {
                super(),
                this.selector = e,
                this.componentType = t,
                this._inputs = r,
                this._outputs = o,
                this.ngContentSelectors = s,
                this.viewDefFactory = n
            }
            get inputs() {
                const e = []
                  , t = this._inputs;
                for (let n in t)
                    e.push({
                        propName: n,
                        templateName: t[n]
                    });
                return e
            }
            get outputs() {
                const e = [];
                for (let t in this._outputs)
                    e.push({
                        propName: t,
                        templateName: this._outputs[t]
                    });
                return e
            }
            create(e, t, n, r) {
                if (!r)
                    throw new Error("ngModule should be provided");
                const o = Wo(this.viewDefFactory)
                  , s = o.nodes[0].element.componentProvider.nodeIndex
                  , i = wo.createRootView(e, t || [], n, o, r, _s)
                  , a = vo(i, s).instance;
                return n && i.renderer.setAttribute(yo(i, 0).renderElement, "ng-version", Ft.full),
                new xs(i,new Ts(i),a)
            }
        }
        class xs extends yt {
            constructor(e, t, n) {
                super(),
                this._view = e,
                this._viewRef = t,
                this._component = n,
                this._elDef = this._view.def.nodes[0],
                this.hostView = t,
                this.changeDetectorRef = t,
                this.instance = n
            }
            get location() {
                return new kt(yo(this._view, this._elDef.nodeIndex).renderElement)
            }
            get injector() {
                return new Os(this._view,this._elDef)
            }
            get componentType() {
                return this._component.constructor
            }
            destroy() {
                this._viewRef.destroy()
            }
            onDestroy(e) {
                this._viewRef.onDestroy(e)
            }
        }
        function Es(e, t, n) {
            return new ks(e,t,n)
        }
        class ks {
            constructor(e, t, n) {
                this._view = e,
                this._elDef = t,
                this._data = n,
                this._embeddedViews = []
            }
            get element() {
                return new kt(this._data.renderElement)
            }
            get injector() {
                return new Os(this._view,this._elDef)
            }
            get parentInjector() {
                let e = this._view
                  , t = this._elDef.parent;
                for (; !t && e; )
                    t = jo(e),
                    e = e.parent;
                return e ? new Os(e,t) : new Os(this._view,null)
            }
            clear() {
                for (let e = this._embeddedViews.length - 1; e >= 0; e--) {
                    const t = gs(this._data, e);
                    wo.destroyView(t)
                }
            }
            get(e) {
                const t = this._embeddedViews[e];
                if (t) {
                    const e = new Ts(t);
                    return e.attachToViewContainerRef(this),
                    e
                }
                return null
            }
            get length() {
                return this._embeddedViews.length
            }
            createEmbeddedView(e, t, n) {
                const r = e.createEmbeddedView(t || {});
                return this.insert(r, n),
                r
            }
            createComponent(e, t, n, r, o) {
                const s = n || this.parentInjector;
                o || e instanceof Et || (o = s.get(ft));
                const i = e.create(s, r, void 0, o);
                return this.insert(i.hostView, t),
                i
            }
            insert(e, t) {
                if (e.destroyed)
                    throw new Error("Cannot insert a destroyed View in a ViewContainer!");
                const n = e;
                return function(e, t, n, r) {
                    let o = t.viewContainer._embeddedViews;
                    null == n && (n = o.length),
                    r.viewContainerParent = e,
                    vs(o, n, r),
                    function(e, t) {
                        const n = Bo(t);
                        if (!n || n === e || 16 & t.state)
                            return;
                        t.state |= 16;
                        let r = n.template._projectedViews;
                        r || (r = n.template._projectedViews = []),
                        r.push(t),
                        function(e, n) {
                            if (4 & n.flags)
                                return;
                            t.parent.def.nodeFlags |= 4,
                            n.flags |= 4;
                            let r = n.parent;
                            for (; r; )
                                r.childFlags |= 4,
                                r = r.parent
                        }(0, t.parentNodeDef)
                    }(t, r),
                    wo.dirtyParentQueries(r),
                    ms(t, n > 0 ? o[n - 1] : null, r)
                }(this._view, this._data, t, n._view),
                n.attachToViewContainerRef(this),
                e
            }
            move(e, t) {
                if (e.destroyed)
                    throw new Error("Cannot move a destroyed View in a ViewContainer!");
                const n = this._embeddedViews.indexOf(e._view);
                return function(e, t, r) {
                    const o = e.viewContainer._embeddedViews
                      , s = o[n];
                    bs(o, n),
                    null == r && (r = o.length),
                    vs(o, r, s),
                    wo.dirtyParentQueries(s),
                    ys(s),
                    ms(e, r > 0 ? o[r - 1] : null, s)
                }(this._data, 0, t),
                e
            }
            indexOf(e) {
                return this._embeddedViews.indexOf(e._view)
            }
            remove(e) {
                const t = gs(this._data, e);
                t && wo.destroyView(t)
            }
            detach(e) {
                const t = gs(this._data, e);
                return t ? new Ts(t) : null
            }
        }
        function As(e) {
            return new Ts(e)
        }
        class Ts {
            constructor(e) {
                this._view = e,
                this._viewContainerRef = null,
                this._appRef = null
            }
            get rootNodes() {
                return function(e) {
                    const t = [];
                    return Zo(e, 0, void 0, void 0, t),
                    t
                }(this._view)
            }
            get context() {
                return this._view.context
            }
            get destroyed() {
                return 0 != (128 & this._view.state)
            }
            markForCheck() {
                Po(this._view)
            }
            detach() {
                this._view.state &= -5
            }
            detectChanges() {
                const e = this._view.root.rendererFactory;
                e.begin && e.begin();
                try {
                    wo.checkAndUpdateView(this._view)
                } finally {
                    e.end && e.end()
                }
            }
            checkNoChanges() {
                wo.checkNoChangesView(this._view)
            }
            reattach() {
                this._view.state |= 4
            }
            onDestroy(e) {
                this._view.disposables || (this._view.disposables = []),
                this._view.disposables.push(e)
            }
            destroy() {
                this._appRef ? this._appRef.detachView(this) : this._viewContainerRef && this._viewContainerRef.detach(this._viewContainerRef.indexOf(this)),
                wo.destroyView(this._view)
            }
            detachFromAppRef() {
                this._appRef = null,
                ys(this._view),
                wo.dirtyParentQueries(this._view)
            }
            attachToAppRef(e) {
                if (this._viewContainerRef)
                    throw new Error("This view is already attached to a ViewContainer!");
                this._appRef = e
            }
            attachToViewContainerRef(e) {
                if (this._appRef)
                    throw new Error("This view is already attached directly to the ApplicationRef!");
                this._viewContainerRef = e
            }
        }
        function Ss(e, t) {
            return new Ns(e,t)
        }
        class Ns extends on {
            constructor(e, t) {
                super(),
                this._parentView = e,
                this._def = t
            }
            createEmbeddedView(e) {
                return new Ts(wo.createEmbeddedView(this._parentView, this._def, this._def.element.template, e))
            }
            get elementRef() {
                return new kt(yo(this._parentView, this._def.nodeIndex).renderElement)
            }
        }
        function Is(e, t) {
            return new Os(e,t)
        }
        class Os {
            constructor(e, t) {
                this.view = e,
                this.elDef = t
            }
            get(e, t=Je.THROW_IF_NOT_FOUND) {
                return wo.resolveDep(this.view, this.elDef, !!this.elDef && 0 != (33554432 & this.elDef.flags), {
                    flags: 0,
                    token: e,
                    tokenKey: To(e)
                }, t)
            }
        }
        function Ms(e, t) {
            const n = e.def.nodes[t];
            if (1 & n.flags) {
                const t = yo(e, n.nodeIndex);
                return n.element.template ? t.template : t.renderElement
            }
            if (2 & n.flags)
                return mo(e, n.nodeIndex).renderText;
            if (20240 & n.flags)
                return vo(e, n.nodeIndex).instance;
            throw new Error(`Illegal state: read nodeValue for node index ${t}`)
        }
        function Fs(e) {
            return new Ds(e.renderer)
        }
        class Ds {
            constructor(e) {
                this.delegate = e
            }
            selectRootElement(e) {
                return this.delegate.selectRootElement(e)
            }
            createElement(e, t) {
                const [n,r] = es(t)
                  , o = this.delegate.createElement(r, n);
                return e && this.delegate.appendChild(e, o),
                o
            }
            createViewRoot(e) {
                return e
            }
            createTemplateAnchor(e) {
                const t = this.delegate.createComment("");
                return e && this.delegate.appendChild(e, t),
                t
            }
            createText(e, t) {
                const n = this.delegate.createText(t);
                return e && this.delegate.appendChild(e, n),
                n
            }
            projectNodes(e, t) {
                for (let n = 0; n < t.length; n++)
                    this.delegate.appendChild(e, t[n])
            }
            attachViewAfter(e, t) {
                const n = this.delegate.parentNode(e)
                  , r = this.delegate.nextSibling(e);
                for (let o = 0; o < t.length; o++)
                    this.delegate.insertBefore(n, t[o], r)
            }
            detachView(e) {
                for (let t = 0; t < e.length; t++) {
                    const n = e[t]
                      , r = this.delegate.parentNode(n);
                    this.delegate.removeChild(r, n)
                }
            }
            destroyView(e, t) {
                for (let n = 0; n < t.length; n++)
                    this.delegate.destroyNode(t[n])
            }
            listen(e, t, n) {
                return this.delegate.listen(e, t, n)
            }
            listenGlobal(e, t, n) {
                return this.delegate.listen(e, t, n)
            }
            setElementProperty(e, t, n) {
                this.delegate.setProperty(e, t, n)
            }
            setElementAttribute(e, t, n) {
                const [r,o] = es(t);
                null != n ? this.delegate.setAttribute(e, o, n, r) : this.delegate.removeAttribute(e, o, r)
            }
            setBindingDebugInfo(e, t, n) {}
            setElementClass(e, t, n) {
                n ? this.delegate.addClass(e, t) : this.delegate.removeClass(e, t)
            }
            setElementStyle(e, t, n) {
                null != n ? this.delegate.setStyle(e, t, n) : this.delegate.removeStyle(e, t)
            }
            invokeElementMethod(e, t, n) {
                e[t].apply(e, n)
            }
            setText(e, t) {
                this.delegate.setValue(e, t)
            }
            animate() {
                throw new Error("Renderer.animate is no longer supported!")
            }
        }
        function Ps(e, t, n, r) {
            return new Rs(e,t,n,r)
        }
        class Rs {
            constructor(e, t, n, r) {
                this._moduleType = e,
                this._parent = t,
                this._bootstrapComponents = n,
                this._def = r,
                this._destroyListeners = [],
                this._destroyed = !1,
                this.injector = this,
                function(e) {
                    const t = e._def
                      , n = e._providers = new Array(t.providers.length);
                    for (let r = 0; r < t.providers.length; r++) {
                        const o = t.providers[r];
                        4096 & o.flags || void 0 === n[r] && (n[r] = fs(e, o))
                    }
                }(this)
            }
            get(e, t=Je.THROW_IF_NOT_FOUND, n=Fe.Default) {
                let r = 0;
                return n & Fe.SkipSelf ? r |= 1 : n & Fe.Self && (r |= 4),
                ps(this, {
                    token: e,
                    tokenKey: To(e),
                    flags: r
                }, t)
            }
            get instance() {
                return this.get(this._moduleType)
            }
            get componentFactoryResolver() {
                return this.get(Ct)
            }
            destroy() {
                if (this._destroyed)
                    throw new Error(`The ng module ${Se(this.instance.constructor)} has already been destroyed.`);
                this._destroyed = !0,
                function(e, t) {
                    const n = e._def
                      , r = new Set;
                    for (let o = 0; o < n.providers.length; o++)
                        if (131072 & n.providers[o].flags) {
                            const t = e._providers[o];
                            if (t && t !== ls) {
                                const e = t.ngOnDestroy;
                                "function" != typeof e || r.has(t) || (e.apply(t),
                                r.add(t))
                            }
                        }
                }(this),
                this._destroyListeners.forEach(e=>e())
            }
            onDestroy(e) {
                this._destroyListeners.push(e)
            }
        }
        const Vs = To(Tt)
          , Bs = To(It)
          , js = To(kt)
          , Ls = To(Pr)
          , Hs = To(on)
          , Us = To(Vr)
          , zs = To(Je)
          , $s = To(Qe);
        function Gs(e, t, n, r, o, s, i, a) {
            const l = [];
            if (i)
                for (let u in i) {
                    const [e,t] = i[u];
                    l[e] = {
                        flags: 8,
                        name: u,
                        nonMinifiedName: t,
                        ns: null,
                        securityContext: null,
                        suffix: null
                    }
                }
            const c = [];
            if (a)
                for (let u in a)
                    c.push({
                        type: 1,
                        propName: u,
                        target: null,
                        eventName: a[u]
                    });
            return qs(e, t |= 16384, n, r, o, o, s, l, c)
        }
        function qs(e, t, n, r, o, s, i, a, l) {
            const {matchedQueries: c, references: u, matchedQueryIds: h} = zo(n);
            l || (l = []),
            a || (a = []),
            s = qe(s);
            const d = $o(i, Se(o));
            return {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                checkIndex: e,
                flags: t,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: c,
                matchedQueryIds: h,
                references: u,
                ngContentIndex: -1,
                childCount: r,
                bindings: a,
                bindingFlags: ts(a),
                outputs: l,
                element: null,
                provider: {
                    token: o,
                    value: s,
                    deps: d
                },
                text: null,
                query: null,
                ngContent: null
            }
        }
        function Ws(e, t) {
            return Ys(e, t)
        }
        function Zs(e, t) {
            let n = e;
            for (; n.parent && !Ho(n); )
                n = n.parent;
            return Js(n.parent, jo(n), !0, t.provider.value, t.provider.deps)
        }
        function Ks(e, t) {
            const n = Js(e, t.parent, (32768 & t.flags) > 0, t.provider.value, t.provider.deps);
            if (t.outputs.length)
                for (let r = 0; r < t.outputs.length; r++) {
                    const o = t.outputs[r]
                      , s = n[o.propName];
                    if (!Zn(s))
                        throw new Error(`@Output ${o.propName} not initialized in '${n.constructor.name}'.`);
                    {
                        const n = s.subscribe(Qs(e, t.parent.nodeIndex, o.eventName));
                        e.disposables[t.outputIndex + r] = n.unsubscribe.bind(n)
                    }
                }
            return n
        }
        function Qs(e, t, n) {
            return r=>Vo(e, t, n, r)
        }
        function Ys(e, t) {
            const n = (8192 & t.flags) > 0
              , r = t.provider;
            switch (201347067 & t.flags) {
            case 512:
                return Js(e, t.parent, n, r.value, r.deps);
            case 1024:
                return function(e, t, n, r, o) {
                    const s = o.length;
                    switch (s) {
                    case 0:
                        return r();
                    case 1:
                        return r(ei(e, t, n, o[0]));
                    case 2:
                        return r(ei(e, t, n, o[0]), ei(e, t, n, o[1]));
                    case 3:
                        return r(ei(e, t, n, o[0]), ei(e, t, n, o[1]), ei(e, t, n, o[2]));
                    default:
                        const i = Array(s);
                        for (let r = 0; r < s; r++)
                            i[r] = ei(e, t, n, o[r]);
                        return r(...i)
                    }
                }(e, t.parent, n, r.value, r.deps);
            case 2048:
                return ei(e, t.parent, n, r.deps[0]);
            case 256:
                return r.value
            }
        }
        function Js(e, t, n, r, o) {
            const s = o.length;
            switch (s) {
            case 0:
                return new r;
            case 1:
                return new r(ei(e, t, n, o[0]));
            case 2:
                return new r(ei(e, t, n, o[0]),ei(e, t, n, o[1]));
            case 3:
                return new r(ei(e, t, n, o[0]),ei(e, t, n, o[1]),ei(e, t, n, o[2]));
            default:
                const i = new Array(s);
                for (let r = 0; r < s; r++)
                    i[r] = ei(e, t, n, o[r]);
                return new r(...i)
            }
        }
        const Xs = {};
        function ei(e, t, n, r, o=Je.THROW_IF_NOT_FOUND) {
            if (8 & r.flags)
                return r.token;
            const s = e;
            2 & r.flags && (o = null);
            const i = r.tokenKey;
            i === Us && (n = !(!t || !t.element.componentView)),
            t && 1 & r.flags && (n = !1,
            t = t.parent);
            let a = e;
            for (; a; ) {
                if (t)
                    switch (i) {
                    case Vs:
                        return Fs(ti(a, t, n));
                    case Bs:
                        return ti(a, t, n).renderer;
                    case js:
                        return new kt(yo(a, t.nodeIndex).renderElement);
                    case Ls:
                        return yo(a, t.nodeIndex).viewContainer;
                    case Hs:
                        if (t.element.template)
                            return yo(a, t.nodeIndex).template;
                        break;
                    case Us:
                        return As(ti(a, t, n));
                    case zs:
                    case $s:
                        return Is(a, t);
                    default:
                        const e = (n ? t.element.allProviders : t.element.publicProviders)[i];
                        if (e) {
                            let t = vo(a, e.nodeIndex);
                            return t || (t = {
                                instance: Ys(a, e)
                            },
                            a.nodes[e.nodeIndex] = t),
                            t.instance
                        }
                    }
                n = Ho(a),
                t = jo(a),
                a = a.parent,
                4 & r.flags && (a = null)
            }
            const l = s.root.injector.get(r.token, Xs);
            return l !== Xs || o === Xs ? l : s.root.ngModule.injector.get(r.token, o)
        }
        function ti(e, t, n) {
            let r;
            if (n)
                r = yo(e, t.nodeIndex).componentView;
            else
                for (r = e; r.parent && !Ho(r); )
                    r = r.parent;
            return r
        }
        function ni(e, t, n, r, o, s) {
            if (32768 & n.flags) {
                const t = yo(e, n.parent.nodeIndex).componentView;
                2 & t.def.flags && (t.state |= 8)
            }
            if (t.instance[n.bindings[r].name] = o,
            524288 & n.flags) {
                s = s || {};
                const t = je.unwrap(e.oldValues[n.bindingIndex + r]);
                s[n.bindings[r].nonMinifiedName] = new Le(t,o,0 != (2 & e.state))
            }
            return e.oldValues[n.bindingIndex + r] = o,
            s
        }
        function ri(e, t) {
            if (!(e.def.nodeFlags & t))
                return;
            const n = e.def.nodes;
            let r = 0;
            for (let o = 0; o < n.length; o++) {
                const s = n[o];
                let i = s.parent;
                for (!i && s.flags & t && si(e, o, s.flags & t, r++),
                0 == (s.childFlags & t) && (o += s.childCount); i && 1 & i.flags && o === i.nodeIndex + i.childCount; )
                    i.directChildFlags & t && (r = oi(e, i, t, r)),
                    i = i.parent
            }
        }
        function oi(e, t, n, r) {
            for (let o = t.nodeIndex + 1; o <= t.nodeIndex + t.childCount; o++) {
                const t = e.def.nodes[o];
                t.flags & n && si(e, o, t.flags & n, r++),
                o += t.childCount
            }
            return r
        }
        function si(e, t, n, r) {
            const o = vo(e, t);
            if (!o)
                return;
            const s = o.instance;
            s && (wo.setCurrentNode(e, t),
            1048576 & n && go(e, 512, r) && s.ngAfterContentInit(),
            2097152 & n && s.ngAfterContentChecked(),
            4194304 & n && go(e, 768, r) && s.ngAfterViewInit(),
            8388608 & n && s.ngAfterViewChecked(),
            131072 & n && s.ngOnDestroy())
        }
        function ii(e) {
            const t = e.def.nodeMatchedQueries;
            for (; e.parent && Uo(e); ) {
                let n = e.parentNodeDef;
                e = e.parent;
                const r = n.nodeIndex + n.childCount;
                for (let o = 0; o <= r; o++) {
                    const r = e.def.nodes[o];
                    67108864 & r.flags && 536870912 & r.flags && (r.query.filterId & t) === r.query.filterId && _o(e, o).setDirty(),
                    !(1 & r.flags && o + r.childCount < n.nodeIndex) && 67108864 & r.childFlags && 536870912 & r.childFlags || (o += r.childCount)
                }
            }
            if (134217728 & e.def.nodeFlags)
                for (let n = 0; n < e.def.nodes.length; n++) {
                    const t = e.def.nodes[n];
                    134217728 & t.flags && 536870912 & t.flags && _o(e, n).setDirty(),
                    n += t.childCount
                }
        }
        function ai(e, t) {
            const n = _o(e, t.nodeIndex);
            if (!n.dirty)
                return;
            let r, o = void 0;
            if (67108864 & t.flags) {
                const n = t.parent.parent;
                o = li(e, n.nodeIndex, n.nodeIndex + n.childCount, t.query, []),
                r = vo(e, t.parent.nodeIndex).instance
            } else
                134217728 & t.flags && (o = li(e, 0, e.def.nodes.length - 1, t.query, []),
                r = e.component);
            n.reset(o);
            const s = t.query.bindings;
            let i = !1;
            for (let a = 0; a < s.length; a++) {
                const e = s[a];
                let t;
                switch (e.bindingType) {
                case 0:
                    t = n.first;
                    break;
                case 1:
                    t = n,
                    i = !0
                }
                r[e.propName] = t
            }
            i && n.notifyOnChanges()
        }
        function li(e, t, n, r, o) {
            for (let s = t; s <= n; s++) {
                const t = e.def.nodes[s]
                  , n = t.matchedQueries[r.id];
                if (null != n && o.push(ci(e, t, n)),
                1 & t.flags && t.element.template && (t.element.template.nodeMatchedQueries & r.filterId) === r.filterId) {
                    const n = yo(e, s);
                    if ((t.childMatchedQueries & r.filterId) === r.filterId && (li(e, s + 1, s + t.childCount, r, o),
                    s += t.childCount),
                    16777216 & t.flags) {
                        const e = n.viewContainer._embeddedViews;
                        for (let t = 0; t < e.length; t++) {
                            const s = e[t]
                              , i = Bo(s);
                            i && i === n && li(s, 0, s.def.nodes.length - 1, r, o)
                        }
                    }
                    const i = n.template._projectedViews;
                    if (i)
                        for (let e = 0; e < i.length; e++) {
                            const t = i[e];
                            li(t, 0, t.def.nodes.length - 1, r, o)
                        }
                }
                (t.childMatchedQueries & r.filterId) !== r.filterId && (s += t.childCount)
            }
            return o
        }
        function ci(e, t, n) {
            if (null != n)
                switch (n) {
                case 1:
                    return yo(e, t.nodeIndex).renderElement;
                case 0:
                    return new kt(yo(e, t.nodeIndex).renderElement);
                case 2:
                    return yo(e, t.nodeIndex).template;
                case 3:
                    return yo(e, t.nodeIndex).viewContainer;
                case 4:
                    return vo(e, t.nodeIndex).instance
                }
        }
        function ui(e, t, n) {
            const r = Go(e, t, n);
            r && Qo(e, n.ngContent.index, 1, r, null, void 0)
        }
        function hi(e, t, n) {
            const r = new Array(n.length - 1);
            for (let o = 1; o < n.length; o++)
                r[o - 1] = {
                    flags: 8,
                    name: null,
                    ns: null,
                    nonMinifiedName: null,
                    securityContext: null,
                    suffix: n[o]
                };
            return {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                checkIndex: e,
                flags: 2,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: {},
                matchedQueryIds: 0,
                references: {},
                ngContentIndex: t,
                childCount: 0,
                bindings: r,
                bindingFlags: 8,
                outputs: [],
                element: null,
                provider: null,
                text: {
                    prefix: n[0]
                },
                query: null,
                ngContent: null
            }
        }
        function di(e, t, n) {
            let r;
            const o = e.renderer;
            r = o.createText(n.text.prefix);
            const s = Go(e, t, n);
            return s && o.appendChild(s, r),
            {
                renderText: r
            }
        }
        function pi(e, t) {
            return (null != e ? e.toString() : "") + t.suffix
        }
        function fi(e, t, n, r) {
            let o = 0
              , s = 0
              , i = 0
              , a = 0
              , l = 0
              , c = null
              , u = null
              , h = !1
              , d = !1
              , p = null;
            for (let f = 0; f < t.length; f++) {
                const e = t[f];
                if (e.nodeIndex = f,
                e.parent = c,
                e.bindingIndex = o,
                e.outputIndex = s,
                e.renderParent = u,
                i |= e.flags,
                l |= e.matchedQueryIds,
                e.element) {
                    const t = e.element;
                    t.publicProviders = c ? c.element.publicProviders : Object.create(null),
                    t.allProviders = t.publicProviders,
                    h = !1,
                    d = !1,
                    e.element.template && (l |= e.element.template.nodeMatchedQueries)
                }
                if (mi(c, e, t.length),
                o += e.bindings.length,
                s += e.outputs.length,
                !u && 3 & e.flags && (p = e),
                20224 & e.flags) {
                    h || (h = !0,
                    c.element.publicProviders = Object.create(c.element.publicProviders),
                    c.element.allProviders = c.element.publicProviders);
                    const t = 0 != (32768 & e.flags);
                    0 == (8192 & e.flags) || t ? c.element.publicProviders[To(e.provider.token)] = e : (d || (d = !0,
                    c.element.allProviders = Object.create(c.element.publicProviders)),
                    c.element.allProviders[To(e.provider.token)] = e),
                    t && (c.element.componentProvider = e)
                }
                if (c ? (c.childFlags |= e.flags,
                c.directChildFlags |= e.flags,
                c.childMatchedQueries |= e.matchedQueryIds,
                e.element && e.element.template && (c.childMatchedQueries |= e.element.template.nodeMatchedQueries)) : a |= e.flags,
                e.childCount > 0)
                    c = e,
                    gi(e) || (u = e);
                else
                    for (; c && f === c.nodeIndex + c.childCount; ) {
                        const e = c.parent;
                        e && (e.childFlags |= c.childFlags,
                        e.childMatchedQueries |= c.childMatchedQueries),
                        u = (c = e) && gi(c) ? c.renderParent : c
                    }
            }
            return {
                factory: null,
                nodeFlags: i,
                rootNodeFlags: a,
                nodeMatchedQueries: l,
                flags: e,
                nodes: t,
                updateDirectives: n || ko,
                updateRenderer: r || ko,
                handleEvent: (e,n,r,o)=>t[n].element.handleEvent(e, r, o),
                bindingCount: o,
                outputCount: s,
                lastRenderRootNode: p
            }
        }
        function gi(e) {
            return 0 != (1 & e.flags) && null === e.element.name
        }
        function mi(e, t, n) {
            const r = t.element && t.element.template;
            if (r) {
                if (!r.lastRenderRootNode)
                    throw new Error("Illegal State: Embedded templates without nodes are not allowed!");
                if (r.lastRenderRootNode && 16777216 & r.lastRenderRootNode.flags)
                    throw new Error(`Illegal State: Last root node of a template can't have embedded views, at index ${t.nodeIndex}!`)
            }
            if (20224 & t.flags && 0 == (1 & (e ? e.flags : 0)))
                throw new Error(`Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index ${t.nodeIndex}!`);
            if (t.query) {
                if (67108864 & t.flags && (!e || 0 == (16384 & e.flags)))
                    throw new Error(`Illegal State: Content Query nodes need to be children of directives, at index ${t.nodeIndex}!`);
                if (134217728 & t.flags && e)
                    throw new Error(`Illegal State: View Query nodes have to be top level nodes, at index ${t.nodeIndex}!`)
            }
            if (t.childCount) {
                const r = e ? e.nodeIndex + e.childCount : n - 1;
                if (t.nodeIndex <= r && t.nodeIndex + t.childCount > r)
                    throw new Error(`Illegal State: childCount of node leads outside of parent, at index ${t.nodeIndex}!`)
            }
        }
        function yi(e, t, n, r) {
            const o = _i(e.root, e.renderer, e, t, n);
            return wi(o, e.component, r),
            Ci(o),
            o
        }
        function vi(e, t, n) {
            const r = _i(e, e.renderer, null, null, t);
            return wi(r, n, n),
            Ci(r),
            r
        }
        function bi(e, t, n, r) {
            const o = t.element.componentRendererType;
            let s;
            return s = o ? e.root.rendererFactory.createRenderer(r, o) : e.root.renderer,
            _i(e.root, s, e, t.element.componentProvider, n)
        }
        function _i(e, t, n, r, o) {
            const s = new Array(o.nodes.length)
              , i = o.outputCount ? new Array(o.outputCount) : null;
            return {
                def: o,
                parent: n,
                viewContainerParent: null,
                parentNodeDef: r,
                context: null,
                component: null,
                nodes: s,
                state: 13,
                root: e,
                renderer: t,
                oldValues: new Array(o.bindingCount),
                disposables: i,
                initIndex: -1
            }
        }
        function wi(e, t, n) {
            e.component = t,
            e.context = n
        }
        function Ci(e) {
            let t;
            Ho(e) && (t = yo(e.parent, e.parentNodeDef.parent.nodeIndex).renderElement);
            const n = e.def
              , r = e.nodes;
            for (let o = 0; o < n.nodes.length; o++) {
                const s = n.nodes[o];
                let i;
                switch (wo.setCurrentNode(e, o),
                201347067 & s.flags) {
                case 1:
                    const n = os(e, t, s);
                    let a = void 0;
                    if (33554432 & s.flags) {
                        const t = Wo(s.element.componentView);
                        a = wo.createComponentView(e, s, t, n)
                    }
                    ss(e, a, s, n),
                    i = {
                        renderElement: n,
                        componentView: a,
                        viewContainer: null,
                        template: s.element.template ? Ss(e, s) : void 0
                    },
                    16777216 & s.flags && (i.viewContainer = Es(e, s, i));
                    break;
                case 2:
                    i = di(e, t, s);
                    break;
                case 512:
                case 1024:
                case 2048:
                case 256:
                    (i = r[o]) || 4096 & s.flags || (i = {
                        instance: Ws(e, s)
                    });
                    break;
                case 16:
                    i = {
                        instance: Zs(e, s)
                    };
                    break;
                case 16384:
                    (i = r[o]) || (i = {
                        instance: Ks(e, s)
                    }),
                    32768 & s.flags && wi(yo(e, s.parent.nodeIndex).componentView, i.instance, i.instance);
                    break;
                case 32:
                case 64:
                case 128:
                    i = {
                        value: void 0
                    };
                    break;
                case 67108864:
                case 134217728:
                    i = new Dr;
                    break;
                case 8:
                    ui(e, t, s),
                    i = void 0
                }
                r[o] = i
            }
            Oi(e, Ii.CreateViewNodes),
            Pi(e, 201326592, 268435456, 0)
        }
        function xi(e) {
            Ai(e),
            wo.updateDirectives(e, 1),
            Mi(e, Ii.CheckNoChanges),
            wo.updateRenderer(e, 1),
            Oi(e, Ii.CheckNoChanges),
            e.state &= -97
        }
        function Ei(e) {
            1 & e.state ? (e.state &= -2,
            e.state |= 2) : e.state &= -3,
            fo(e, 0, 256),
            Ai(e),
            wo.updateDirectives(e, 0),
            Mi(e, Ii.CheckAndUpdate),
            Pi(e, 67108864, 536870912, 0);
            let t = fo(e, 256, 512);
            ri(e, 2097152 | (t ? 1048576 : 0)),
            wo.updateRenderer(e, 0),
            Oi(e, Ii.CheckAndUpdate),
            Pi(e, 134217728, 536870912, 0),
            ri(e, 8388608 | ((t = fo(e, 512, 768)) ? 4194304 : 0)),
            2 & e.def.flags && (e.state &= -9),
            e.state &= -97,
            fo(e, 768, 1024)
        }
        function ki(e, t, n, r, o, s, i, a, l, c, u, h, d) {
            return 0 === n ? function(e, t, n, r, o, s, i, a, l, c, u, h) {
                switch (201347067 & t.flags) {
                case 1:
                    return function(e, t, n, r, o, s, i, a, l, c, u, h) {
                        const d = t.bindings.length;
                        let p = !1;
                        return d > 0 && as(e, t, 0, n) && (p = !0),
                        d > 1 && as(e, t, 1, r) && (p = !0),
                        d > 2 && as(e, t, 2, o) && (p = !0),
                        d > 3 && as(e, t, 3, s) && (p = !0),
                        d > 4 && as(e, t, 4, i) && (p = !0),
                        d > 5 && as(e, t, 5, a) && (p = !0),
                        d > 6 && as(e, t, 6, l) && (p = !0),
                        d > 7 && as(e, t, 7, c) && (p = !0),
                        d > 8 && as(e, t, 8, u) && (p = !0),
                        d > 9 && as(e, t, 9, h) && (p = !0),
                        p
                    }(e, t, n, r, o, s, i, a, l, c, u, h);
                case 2:
                    return function(e, t, n, r, o, s, i, a, l, c, u, h) {
                        let d = !1;
                        const p = t.bindings
                          , f = p.length;
                        if (f > 0 && Fo(e, t, 0, n) && (d = !0),
                        f > 1 && Fo(e, t, 1, r) && (d = !0),
                        f > 2 && Fo(e, t, 2, o) && (d = !0),
                        f > 3 && Fo(e, t, 3, s) && (d = !0),
                        f > 4 && Fo(e, t, 4, i) && (d = !0),
                        f > 5 && Fo(e, t, 5, a) && (d = !0),
                        f > 6 && Fo(e, t, 6, l) && (d = !0),
                        f > 7 && Fo(e, t, 7, c) && (d = !0),
                        f > 8 && Fo(e, t, 8, u) && (d = !0),
                        f > 9 && Fo(e, t, 9, h) && (d = !0),
                        d) {
                            let d = t.text.prefix;
                            f > 0 && (d += pi(n, p[0])),
                            f > 1 && (d += pi(r, p[1])),
                            f > 2 && (d += pi(o, p[2])),
                            f > 3 && (d += pi(s, p[3])),
                            f > 4 && (d += pi(i, p[4])),
                            f > 5 && (d += pi(a, p[5])),
                            f > 6 && (d += pi(l, p[6])),
                            f > 7 && (d += pi(c, p[7])),
                            f > 8 && (d += pi(u, p[8])),
                            f > 9 && (d += pi(h, p[9]));
                            const g = mo(e, t.nodeIndex).renderText;
                            e.renderer.setValue(g, d)
                        }
                        return d
                    }(e, t, n, r, o, s, i, a, l, c, u, h);
                case 16384:
                    return function(e, t, n, r, o, s, i, a, l, c, u, h) {
                        const d = vo(e, t.nodeIndex)
                          , p = d.instance;
                        let f = !1
                          , g = void 0;
                        const m = t.bindings.length;
                        return m > 0 && Mo(e, t, 0, n) && (f = !0,
                        g = ni(e, d, t, 0, n, g)),
                        m > 1 && Mo(e, t, 1, r) && (f = !0,
                        g = ni(e, d, t, 1, r, g)),
                        m > 2 && Mo(e, t, 2, o) && (f = !0,
                        g = ni(e, d, t, 2, o, g)),
                        m > 3 && Mo(e, t, 3, s) && (f = !0,
                        g = ni(e, d, t, 3, s, g)),
                        m > 4 && Mo(e, t, 4, i) && (f = !0,
                        g = ni(e, d, t, 4, i, g)),
                        m > 5 && Mo(e, t, 5, a) && (f = !0,
                        g = ni(e, d, t, 5, a, g)),
                        m > 6 && Mo(e, t, 6, l) && (f = !0,
                        g = ni(e, d, t, 6, l, g)),
                        m > 7 && Mo(e, t, 7, c) && (f = !0,
                        g = ni(e, d, t, 7, c, g)),
                        m > 8 && Mo(e, t, 8, u) && (f = !0,
                        g = ni(e, d, t, 8, u, g)),
                        m > 9 && Mo(e, t, 9, h) && (f = !0,
                        g = ni(e, d, t, 9, h, g)),
                        g && p.ngOnChanges(g),
                        65536 & t.flags && go(e, 256, t.nodeIndex) && p.ngOnInit(),
                        262144 & t.flags && p.ngDoCheck(),
                        f
                    }(e, t, n, r, o, s, i, a, l, c, u, h);
                case 32:
                case 64:
                case 128:
                    return function(e, t, n, r, o, s, i, a, l, c, u, h) {
                        const d = t.bindings;
                        let p = !1;
                        const f = d.length;
                        if (f > 0 && Fo(e, t, 0, n) && (p = !0),
                        f > 1 && Fo(e, t, 1, r) && (p = !0),
                        f > 2 && Fo(e, t, 2, o) && (p = !0),
                        f > 3 && Fo(e, t, 3, s) && (p = !0),
                        f > 4 && Fo(e, t, 4, i) && (p = !0),
                        f > 5 && Fo(e, t, 5, a) && (p = !0),
                        f > 6 && Fo(e, t, 6, l) && (p = !0),
                        f > 7 && Fo(e, t, 7, c) && (p = !0),
                        f > 8 && Fo(e, t, 8, u) && (p = !0),
                        f > 9 && Fo(e, t, 9, h) && (p = !0),
                        p) {
                            const p = bo(e, t.nodeIndex);
                            let g;
                            switch (201347067 & t.flags) {
                            case 32:
                                g = new Array(d.length),
                                f > 0 && (g[0] = n),
                                f > 1 && (g[1] = r),
                                f > 2 && (g[2] = o),
                                f > 3 && (g[3] = s),
                                f > 4 && (g[4] = i),
                                f > 5 && (g[5] = a),
                                f > 6 && (g[6] = l),
                                f > 7 && (g[7] = c),
                                f > 8 && (g[8] = u),
                                f > 9 && (g[9] = h);
                                break;
                            case 64:
                                g = {},
                                f > 0 && (g[d[0].name] = n),
                                f > 1 && (g[d[1].name] = r),
                                f > 2 && (g[d[2].name] = o),
                                f > 3 && (g[d[3].name] = s),
                                f > 4 && (g[d[4].name] = i),
                                f > 5 && (g[d[5].name] = a),
                                f > 6 && (g[d[6].name] = l),
                                f > 7 && (g[d[7].name] = c),
                                f > 8 && (g[d[8].name] = u),
                                f > 9 && (g[d[9].name] = h);
                                break;
                            case 128:
                                const e = n;
                                switch (f) {
                                case 1:
                                    g = e.transform(n);
                                    break;
                                case 2:
                                    g = e.transform(r);
                                    break;
                                case 3:
                                    g = e.transform(r, o);
                                    break;
                                case 4:
                                    g = e.transform(r, o, s);
                                    break;
                                case 5:
                                    g = e.transform(r, o, s, i);
                                    break;
                                case 6:
                                    g = e.transform(r, o, s, i, a);
                                    break;
                                case 7:
                                    g = e.transform(r, o, s, i, a, l);
                                    break;
                                case 8:
                                    g = e.transform(r, o, s, i, a, l, c);
                                    break;
                                case 9:
                                    g = e.transform(r, o, s, i, a, l, c, u);
                                    break;
                                case 10:
                                    g = e.transform(r, o, s, i, a, l, c, u, h)
                                }
                            }
                            p.value = g
                        }
                        return p
                    }(e, t, n, r, o, s, i, a, l, c, u, h);
                default:
                    throw "unreachable"
                }
            }(e, t, r, o, s, i, a, l, c, u, h, d) : function(e, t, n) {
                switch (201347067 & t.flags) {
                case 1:
                    return function(e, t, n) {
                        let r = !1;
                        for (let o = 0; o < n.length; o++)
                            as(e, t, o, n[o]) && (r = !0);
                        return r
                    }(e, t, n);
                case 2:
                    return function(e, t, n) {
                        const r = t.bindings;
                        let o = !1;
                        for (let s = 0; s < n.length; s++)
                            Fo(e, t, s, n[s]) && (o = !0);
                        if (o) {
                            let o = "";
                            for (let e = 0; e < n.length; e++)
                                o += pi(n[e], r[e]);
                            o = t.text.prefix + o;
                            const s = mo(e, t.nodeIndex).renderText;
                            e.renderer.setValue(s, o)
                        }
                        return o
                    }(e, t, n);
                case 16384:
                    return function(e, t, n) {
                        const r = vo(e, t.nodeIndex)
                          , o = r.instance;
                        let s = !1
                          , i = void 0;
                        for (let a = 0; a < n.length; a++)
                            Mo(e, t, a, n[a]) && (s = !0,
                            i = ni(e, r, t, a, n[a], i));
                        return i && o.ngOnChanges(i),
                        65536 & t.flags && go(e, 256, t.nodeIndex) && o.ngOnInit(),
                        262144 & t.flags && o.ngDoCheck(),
                        s
                    }(e, t, n);
                case 32:
                case 64:
                case 128:
                    return function(e, t, n) {
                        const r = t.bindings;
                        let o = !1;
                        for (let s = 0; s < n.length; s++)
                            Fo(e, t, s, n[s]) && (o = !0);
                        if (o) {
                            const o = bo(e, t.nodeIndex);
                            let s;
                            switch (201347067 & t.flags) {
                            case 32:
                                s = n;
                                break;
                            case 64:
                                s = {};
                                for (let t = 0; t < n.length; t++)
                                    s[r[t].name] = n[t];
                                break;
                            case 128:
                                const e = n[0]
                                  , o = n.slice(1);
                                s = e.transform(...o)
                            }
                            o.value = s
                        }
                        return o
                    }(e, t, n);
                default:
                    throw "unreachable"
                }
            }(e, t, r)
        }
        function Ai(e) {
            const t = e.def;
            if (4 & t.nodeFlags)
                for (let n = 0; n < t.nodes.length; n++) {
                    const r = t.nodes[n];
                    if (4 & r.flags) {
                        const t = yo(e, n).template._projectedViews;
                        if (t)
                            for (let n = 0; n < t.length; n++) {
                                const r = t[n];
                                r.state |= 32,
                                Ro(r, e)
                            }
                    } else
                        0 == (4 & r.childFlags) && (n += r.childCount)
                }
        }
        function Ti(e, t, n, r, o, s, i, a, l, c, u, h, d) {
            return 0 === n ? function(e, t, n, r, o, s, i, a, l, c, u, h) {
                const d = t.bindings.length;
                d > 0 && Do(e, t, 0, n),
                d > 1 && Do(e, t, 1, r),
                d > 2 && Do(e, t, 2, o),
                d > 3 && Do(e, t, 3, s),
                d > 4 && Do(e, t, 4, i),
                d > 5 && Do(e, t, 5, a),
                d > 6 && Do(e, t, 6, l),
                d > 7 && Do(e, t, 7, c),
                d > 8 && Do(e, t, 8, u),
                d > 9 && Do(e, t, 9, h)
            }(e, t, r, o, s, i, a, l, c, u, h, d) : function(e, t, n) {
                for (let r = 0; r < n.length; r++)
                    Do(e, t, r, n[r])
            }(e, t, r),
            !1
        }
        function Si(e, t) {
            if (_o(e, t.nodeIndex).dirty)
                throw Co(wo.createDebugContext(e, t.nodeIndex), `Query ${t.query.id} not dirty`, `Query ${t.query.id} dirty`, 0 != (1 & e.state))
        }
        function Ni(e) {
            if (!(128 & e.state)) {
                if (Mi(e, Ii.Destroy),
                Oi(e, Ii.Destroy),
                ri(e, 131072),
                e.disposables)
                    for (let t = 0; t < e.disposables.length; t++)
                        e.disposables[t]();
                !function(e) {
                    if (!(16 & e.state))
                        return;
                    const t = Bo(e);
                    if (t) {
                        const n = t.template._projectedViews;
                        n && (bs(n, n.indexOf(e)),
                        wo.dirtyParentQueries(e))
                    }
                }(e),
                e.renderer.destroyNode && function(e) {
                    const t = e.def.nodes.length;
                    for (let n = 0; n < t; n++) {
                        const t = e.def.nodes[n];
                        1 & t.flags ? e.renderer.destroyNode(yo(e, n).renderElement) : 2 & t.flags ? e.renderer.destroyNode(mo(e, n).renderText) : (67108864 & t.flags || 134217728 & t.flags) && _o(e, n).destroy()
                    }
                }(e),
                Ho(e) && e.renderer.destroy(),
                e.state |= 128
            }
        }
        const Ii = function() {
            var e = {
                CreateViewNodes: 0,
                CheckNoChanges: 1,
                CheckNoChangesProjectedViews: 2,
                CheckAndUpdate: 3,
                CheckAndUpdateProjectedViews: 4,
                Destroy: 5
            };
            return e[e.CreateViewNodes] = "CreateViewNodes",
            e[e.CheckNoChanges] = "CheckNoChanges",
            e[e.CheckNoChangesProjectedViews] = "CheckNoChangesProjectedViews",
            e[e.CheckAndUpdate] = "CheckAndUpdate",
            e[e.CheckAndUpdateProjectedViews] = "CheckAndUpdateProjectedViews",
            e[e.Destroy] = "Destroy",
            e
        }();
        function Oi(e, t) {
            const n = e.def;
            if (33554432 & n.nodeFlags)
                for (let r = 0; r < n.nodes.length; r++) {
                    const o = n.nodes[r];
                    33554432 & o.flags ? Fi(yo(e, r).componentView, t) : 0 == (33554432 & o.childFlags) && (r += o.childCount)
                }
        }
        function Mi(e, t) {
            const n = e.def;
            if (16777216 & n.nodeFlags)
                for (let r = 0; r < n.nodes.length; r++) {
                    const o = n.nodes[r];
                    if (16777216 & o.flags) {
                        const n = yo(e, r).viewContainer._embeddedViews;
                        for (let e = 0; e < n.length; e++)
                            Fi(n[e], t)
                    } else
                        0 == (16777216 & o.childFlags) && (r += o.childCount)
                }
        }
        function Fi(e, t) {
            const n = e.state;
            switch (t) {
            case Ii.CheckNoChanges:
                0 == (128 & n) && (12 == (12 & n) ? xi(e) : 64 & n && Di(e, Ii.CheckNoChangesProjectedViews));
                break;
            case Ii.CheckNoChangesProjectedViews:
                0 == (128 & n) && (32 & n ? xi(e) : 64 & n && Di(e, t));
                break;
            case Ii.CheckAndUpdate:
                0 == (128 & n) && (12 == (12 & n) ? Ei(e) : 64 & n && Di(e, Ii.CheckAndUpdateProjectedViews));
                break;
            case Ii.CheckAndUpdateProjectedViews:
                0 == (128 & n) && (32 & n ? Ei(e) : 64 & n && Di(e, t));
                break;
            case Ii.Destroy:
                Ni(e);
                break;
            case Ii.CreateViewNodes:
                Ci(e)
            }
        }
        function Di(e, t) {
            Mi(e, t),
            Oi(e, t)
        }
        function Pi(e, t, n, r) {
            if (!(e.def.nodeFlags & t && e.def.nodeFlags & n))
                return;
            const o = e.def.nodes.length;
            for (let s = 0; s < o; s++) {
                const o = e.def.nodes[s];
                if (o.flags & t && o.flags & n)
                    switch (wo.setCurrentNode(e, o.nodeIndex),
                    r) {
                    case 0:
                        ai(e, o);
                        break;
                    case 1:
                        Si(e, o)
                    }
                o.childFlags & t && o.childFlags & n || (s += o.childCount)
            }
        }
        let Ri = !1;
        function Vi(e, t, n, r, o, s) {
            const i = o.injector.get(St);
            return vi(ji(e, o, i, t, n), r, s)
        }
        function Bi(e, t, n, r, o, s) {
            const i = o.injector.get(St)
              , a = ji(e, o, new ba(i), t, n)
              , l = Ki(r);
            return ya(ta.create, vi, null, [a, l, s])
        }
        function ji(e, t, n, r, o) {
            const s = t.injector.get(ln)
              , i = t.injector.get(kn)
              , a = n.createRenderer(null, null);
            return {
                ngModule: t,
                injector: e,
                projectableNodes: r,
                selectorOrNode: o,
                sanitizer: s,
                rendererFactory: n,
                renderer: a,
                errorHandler: i
            }
        }
        function Li(e, t, n, r) {
            const o = Ki(n);
            return ya(ta.create, yi, null, [e, t, o, r])
        }
        function Hi(e, t, n, r) {
            return n = Gi.get(t.element.componentProvider.provider.token) || Ki(n),
            ya(ta.create, bi, null, [e, t, n, r])
        }
        function Ui(e, t, n, r) {
            return Ps(e, t, n, function(e) {
                const {hasOverrides: t, hasDeprecatedOverrides: n} = function(e) {
                    let t = !1
                      , n = !1;
                    return 0 === zi.size ? {
                        hasOverrides: t,
                        hasDeprecatedOverrides: n
                    } : (e.providers.forEach(e=>{
                        const r = zi.get(e.token);
                        3840 & e.flags && r && (t = !0,
                        n = n || r.deprecatedBehavior)
                    }
                    ),
                    e.modules.forEach(e=>{
                        $i.forEach((r,o)=>{
                            pe(o).providedIn === e && (t = !0,
                            n = n || r.deprecatedBehavior)
                        }
                        )
                    }
                    ),
                    {
                        hasOverrides: t,
                        hasDeprecatedOverrides: n
                    })
                }(e);
                return t ? (function(e) {
                    for (let t = 0; t < e.providers.length; t++) {
                        const r = e.providers[t];
                        n && (r.flags |= 4096);
                        const o = zi.get(r.token);
                        o && (r.flags = -3841 & r.flags | o.flags,
                        r.deps = $o(o.deps),
                        r.value = o.value)
                    }
                    if ($i.size > 0) {
                        let t = new Set(e.modules);
                        $i.forEach((r,o)=>{
                            if (t.has(pe(o).providedIn)) {
                                let t = {
                                    token: o,
                                    flags: r.flags | (n ? 4096 : 0),
                                    deps: $o(r.deps),
                                    value: r.value,
                                    index: e.providers.length
                                };
                                e.providers.push(t),
                                e.providersByKey[To(o)] = t
                            }
                        }
                        )
                    }
                }(e = e.factory(()=>ko)),
                e) : e
            }(r))
        }
        const zi = new Map
          , $i = new Map
          , Gi = new Map;
        function qi(e) {
            let t;
            zi.set(e.token, e),
            "function" == typeof e.token && (t = pe(e.token)) && "function" == typeof t.providedIn && $i.set(e.token, e)
        }
        function Wi(e, t) {
            const n = Wo(t.viewDefFactory)
              , r = Wo(n.nodes[0].element.componentView);
            Gi.set(e, r)
        }
        function Zi() {
            zi.clear(),
            $i.clear(),
            Gi.clear()
        }
        function Ki(e) {
            if (0 === zi.size)
                return e;
            const t = function(e) {
                const t = [];
                let n = null;
                for (let r = 0; r < e.nodes.length; r++) {
                    const o = e.nodes[r];
                    1 & o.flags && (n = o),
                    n && 3840 & o.flags && zi.has(o.provider.token) && (t.push(n.nodeIndex),
                    n = null)
                }
                return t
            }(e);
            if (0 === t.length)
                return e;
            e = e.factory(()=>ko);
            for (let r = 0; r < t.length; r++)
                n(e, t[r]);
            return e;
            function n(e, t) {
                for (let n = t + 1; n < e.nodes.length; n++) {
                    const t = e.nodes[n];
                    if (1 & t.flags)
                        return;
                    if (3840 & t.flags) {
                        const e = t.provider
                          , n = zi.get(e.token);
                        n && (t.flags = -3841 & t.flags | n.flags,
                        e.deps = $o(n.deps),
                        e.value = n.value)
                    }
                }
            }
        }
        function Qi(e, t, n, r, o, s, i, a, l, c, u, h, d) {
            const p = e.def.nodes[t];
            return ki(e, p, n, r, o, s, i, a, l, c, u, h, d),
            224 & p.flags ? bo(e, t).value : void 0
        }
        function Yi(e, t, n, r, o, s, i, a, l, c, u, h, d) {
            const p = e.def.nodes[t];
            return Ti(e, p, n, r, o, s, i, a, l, c, u, h, d),
            224 & p.flags ? bo(e, t).value : void 0
        }
        function Ji(e) {
            return ya(ta.detectChanges, Ei, null, [e])
        }
        function Xi(e) {
            return ya(ta.checkNoChanges, xi, null, [e])
        }
        function ea(e) {
            return ya(ta.destroy, Ni, null, [e])
        }
        const ta = function() {
            var e = {
                create: 0,
                detectChanges: 1,
                checkNoChanges: 2,
                destroy: 3,
                handleEvent: 4
            };
            return e[e.create] = "create",
            e[e.detectChanges] = "detectChanges",
            e[e.checkNoChanges] = "checkNoChanges",
            e[e.destroy] = "destroy",
            e[e.handleEvent] = "handleEvent",
            e
        }();
        let na, ra, oa;
        function sa(e, t) {
            ra = e,
            oa = t
        }
        function ia(e, t, n, r) {
            return sa(e, t),
            ya(ta.handleEvent, e.def.handleEvent, null, [e, t, n, r])
        }
        function aa(e, t) {
            if (128 & e.state)
                throw Eo(ta[na]);
            return sa(e, pa(e, 0)),
            e.def.updateDirectives(function(e, n, r, ...o) {
                const s = e.def.nodes[n];
                return 0 === t ? ca(e, s, r, o) : ua(e, s, r, o),
                16384 & s.flags && sa(e, pa(e, n)),
                224 & s.flags ? bo(e, s.nodeIndex).value : void 0
            }, e)
        }
        function la(e, t) {
            if (128 & e.state)
                throw Eo(ta[na]);
            return sa(e, fa(e, 0)),
            e.def.updateRenderer(function(e, n, r, ...o) {
                const s = e.def.nodes[n];
                return 0 === t ? ca(e, s, r, o) : ua(e, s, r, o),
                3 & s.flags && sa(e, fa(e, n)),
                224 & s.flags ? bo(e, s.nodeIndex).value : void 0
            }, e)
        }
        function ca(e, t, n, r) {
            if (ki(e, t, n, ...r)) {
                const i = 1 === n ? r[0] : r;
                if (16384 & t.flags) {
                    const n = {};
                    for (let e = 0; e < t.bindings.length; e++) {
                        const r = t.bindings[e]
                          , a = i[e];
                        8 & r.flags && (n[(o = r.nonMinifiedName,
                        s = void 0,
                        s = o.replace(/[$@]/g, "_"),
                        `ng-reflect-${o = s.replace(ha, (...e)=>"-" + e[1].toLowerCase())}`)] = da(a))
                    }
                    const r = t.parent
                      , a = yo(e, r.nodeIndex).renderElement;
                    if (r.element.name)
                        for (let t in n) {
                            const r = n[t];
                            null != r ? e.renderer.setAttribute(a, t, r) : e.renderer.removeAttribute(a, t)
                        }
                    else
                        e.renderer.setValue(a, `bindings=${JSON.stringify(n, null, 2)}`)
                }
            }
            var o, s
        }
        function ua(e, t, n, r) {
            Ti(e, t, n, ...r)
        }
        const ha = /([A-Z])/g;
        function da(e) {
            try {
                return null != e ? e.toString().slice(0, 30) : e
            } catch (t) {
                return "[ERROR] Exception while trying to serialize the value"
            }
        }
        function pa(e, t) {
            for (let n = t; n < e.def.nodes.length; n++) {
                const t = e.def.nodes[n];
                if (16384 & t.flags && t.bindings && t.bindings.length)
                    return n
            }
            return null
        }
        function fa(e, t) {
            for (let n = t; n < e.def.nodes.length; n++) {
                const t = e.def.nodes[n];
                if (3 & t.flags && t.bindings && t.bindings.length)
                    return n
            }
            return null
        }
        class ga {
            constructor(e, t) {
                this.view = e,
                this.nodeIndex = t,
                null == t && (this.nodeIndex = t = 0),
                this.nodeDef = e.def.nodes[t];
                let n = this.nodeDef
                  , r = e;
                for (; n && 0 == (1 & n.flags); )
                    n = n.parent;
                if (!n)
                    for (; !n && r; )
                        n = jo(r),
                        r = r.parent;
                this.elDef = n,
                this.elView = r
            }
            get elOrCompView() {
                return yo(this.elView, this.elDef.nodeIndex).componentView || this.view
            }
            get injector() {
                return Is(this.elView, this.elDef)
            }
            get component() {
                return this.elOrCompView.component
            }
            get context() {
                return this.elOrCompView.context
            }
            get providerTokens() {
                const e = [];
                if (this.elDef)
                    for (let t = this.elDef.nodeIndex + 1; t <= this.elDef.nodeIndex + this.elDef.childCount; t++) {
                        const n = this.elView.def.nodes[t];
                        20224 & n.flags && e.push(n.provider.token),
                        t += n.childCount
                    }
                return e
            }
            get references() {
                const e = {};
                if (this.elDef) {
                    ma(this.elView, this.elDef, e);
                    for (let t = this.elDef.nodeIndex + 1; t <= this.elDef.nodeIndex + this.elDef.childCount; t++) {
                        const n = this.elView.def.nodes[t];
                        20224 & n.flags && ma(this.elView, n, e),
                        t += n.childCount
                    }
                }
                return e
            }
            get componentRenderElement() {
                const e = function(e) {
                    for (; e && !Ho(e); )
                        e = e.parent;
                    return e.parent ? yo(e.parent, jo(e).nodeIndex) : null
                }(this.elOrCompView);
                return e ? e.renderElement : void 0
            }
            get renderNode() {
                return 2 & this.nodeDef.flags ? Lo(this.view, this.nodeDef) : Lo(this.elView, this.elDef)
            }
            logError(e, ...t) {
                let n, r;
                2 & this.nodeDef.flags ? (n = this.view.def,
                r = this.nodeDef.nodeIndex) : (n = this.elView.def,
                r = this.elDef.nodeIndex);
                const o = function(e, t) {
                    let n = -1;
                    for (let r = 0; r <= t; r++)
                        3 & e.nodes[r].flags && n++;
                    return n
                }(n, r);
                let s = -1;
                n.factory(()=>++s === o ? e.error.bind(e, ...t) : ko),
                s < o && (e.error("Illegal state: the ViewDefinitionFactory did not call the logger!"),
                e.error(...t))
            }
        }
        function ma(e, t, n) {
            for (let r in t.references)
                n[r] = ci(e, t, t.references[r])
        }
        function ya(e, t, n, r) {
            const o = na
              , s = ra
              , i = oa;
            try {
                na = e;
                const l = t.apply(n, r);
                return ra = s,
                oa = i,
                na = o,
                l
            } catch (a) {
                if (Cn(a) || !ra)
                    throw a;
                throw function(e, t) {
                    return e instanceof Error || (e = new Error(e.toString())),
                    xo(e, t),
                    e
                }(a, va())
            }
        }
        function va() {
            return ra ? new ga(ra,oa) : null
        }
        class ba {
            constructor(e) {
                this.delegate = e
            }
            createRenderer(e, t) {
                return new _a(this.delegate.createRenderer(e, t))
            }
            begin() {
                this.delegate.begin && this.delegate.begin()
            }
            end() {
                this.delegate.end && this.delegate.end()
            }
            whenRenderingDone() {
                return this.delegate.whenRenderingDone ? this.delegate.whenRenderingDone() : Promise.resolve(null)
            }
        }
        class _a {
            constructor(e) {
                this.delegate = e,
                this.debugContextFactory = va,
                this.data = this.delegate.data
            }
            createDebugContext(e) {
                return this.debugContextFactory(e)
            }
            destroyNode(e) {
                !function(e) {
                    Ur.delete(e.nativeNode)
                }(zr(e)),
                this.delegate.destroyNode && this.delegate.destroyNode(e)
            }
            destroy() {
                this.delegate.destroy()
            }
            createElement(e, t) {
                const n = this.delegate.createElement(e, t)
                  , r = this.createDebugContext(n);
                if (r) {
                    const t = new Hr(n,null,r);
                    t.name = e,
                    $r(t)
                }
                return n
            }
            createComment(e) {
                const t = this.delegate.createComment(e)
                  , n = this.createDebugContext(t);
                return n && $r(new Lr(t,null,n)),
                t
            }
            createText(e) {
                const t = this.delegate.createText(e)
                  , n = this.createDebugContext(t);
                return n && $r(new Lr(t,null,n)),
                t
            }
            appendChild(e, t) {
                const n = zr(e)
                  , r = zr(t);
                n && r && n instanceof Hr && n.addChild(r),
                this.delegate.appendChild(e, t)
            }
            insertBefore(e, t, n) {
                const r = zr(e)
                  , o = zr(t)
                  , s = zr(n);
                r && o && r instanceof Hr && r.insertBefore(s, o),
                this.delegate.insertBefore(e, t, n)
            }
            removeChild(e, t) {
                const n = zr(e)
                  , r = zr(t);
                n && r && n instanceof Hr && n.removeChild(r),
                this.delegate.removeChild(e, t)
            }
            selectRootElement(e, t) {
                const n = this.delegate.selectRootElement(e, t)
                  , r = va() || (po ? this.createDebugContext(n) : null);
                return r && $r(new Hr(n,null,r)),
                n
            }
            setAttribute(e, t, n, r) {
                const o = zr(e);
                o && o instanceof Hr && (o.attributes[r ? r + ":" + t : t] = n),
                this.delegate.setAttribute(e, t, n, r)
            }
            removeAttribute(e, t, n) {
                const r = zr(e);
                r && r instanceof Hr && (r.attributes[n ? n + ":" + t : t] = null),
                this.delegate.removeAttribute(e, t, n)
            }
            addClass(e, t) {
                const n = zr(e);
                n && n instanceof Hr && (n.classes[t] = !0),
                this.delegate.addClass(e, t)
            }
            removeClass(e, t) {
                const n = zr(e);
                n && n instanceof Hr && (n.classes[t] = !1),
                this.delegate.removeClass(e, t)
            }
            setStyle(e, t, n, r) {
                const o = zr(e);
                o && o instanceof Hr && (o.styles[t] = n),
                this.delegate.setStyle(e, t, n, r)
            }
            removeStyle(e, t, n) {
                const r = zr(e);
                r && r instanceof Hr && (r.styles[t] = null),
                this.delegate.removeStyle(e, t, n)
            }
            setProperty(e, t, n) {
                const r = zr(e);
                r && r instanceof Hr && (r.properties[t] = n),
                this.delegate.setProperty(e, t, n)
            }
            listen(e, t, n) {
                if ("string" != typeof e) {
                    const r = zr(e);
                    r && r.listeners.push(new jr(t,n))
                }
                return this.delegate.listen(e, t, n)
            }
            parentNode(e) {
                return this.delegate.parentNode(e)
            }
            nextSibling(e) {
                return this.delegate.nextSibling(e)
            }
            setValue(e, t) {
                return this.delegate.setValue(e, t)
            }
        }
        function wa(e, t, n) {
            return new Ca(e,t,n)
        }
        class Ca extends gt {
            constructor(e, t, n) {
                super(),
                this.moduleType = e,
                this._bootstrapComponents = t,
                this._ngModuleDefFactory = n
            }
            create(e) {
                !function() {
                    if (Ri)
                        return;
                    Ri = !0;
                    const e = Rt() ? {
                        setCurrentNode: sa,
                        createRootView: Bi,
                        createEmbeddedView: Li,
                        createComponentView: Hi,
                        createNgModuleRef: Ui,
                        overrideProvider: qi,
                        overrideComponentView: Wi,
                        clearOverrides: Zi,
                        checkAndUpdateView: Ji,
                        checkNoChangesView: Xi,
                        destroyView: ea,
                        createDebugContext: (e,t)=>new ga(e,t),
                        handleEvent: ia,
                        updateDirectives: aa,
                        updateRenderer: la
                    } : {
                        setCurrentNode: ()=>{}
                        ,
                        createRootView: Vi,
                        createEmbeddedView: yi,
                        createComponentView: bi,
                        createNgModuleRef: Ps,
                        overrideProvider: ko,
                        overrideComponentView: ko,
                        clearOverrides: ko,
                        checkAndUpdateView: Ei,
                        checkNoChangesView: xi,
                        destroyView: Ni,
                        createDebugContext: (e,t)=>new ga(e,t),
                        handleEvent: (e,t,n,r)=>e.def.handleEvent(e, t, n, r),
                        updateDirectives: (e,t)=>e.def.updateDirectives(0 === t ? Qi : Yi, e),
                        updateRenderer: (e,t)=>e.def.updateRenderer(0 === t ? Qi : Yi, e)
                    };
                    wo.setCurrentNode = e.setCurrentNode,
                    wo.createRootView = e.createRootView,
                    wo.createEmbeddedView = e.createEmbeddedView,
                    wo.createComponentView = e.createComponentView,
                    wo.createNgModuleRef = e.createNgModuleRef,
                    wo.overrideProvider = e.overrideProvider,
                    wo.overrideComponentView = e.overrideComponentView,
                    wo.clearOverrides = e.clearOverrides,
                    wo.checkAndUpdateView = e.checkAndUpdateView,
                    wo.checkNoChangesView = e.checkNoChangesView,
                    wo.destroyView = e.destroyView,
                    wo.resolveDep = ei,
                    wo.createDebugContext = e.createDebugContext,
                    wo.handleEvent = e.handleEvent,
                    wo.updateDirectives = e.updateDirectives,
                    wo.updateRenderer = e.updateRenderer,
                    wo.dirtyParentQueries = ii
                }();
                const t = function(e) {
                    const t = Array.from(e.providers)
                      , n = Array.from(e.modules)
                      , r = {};
                    for (const o in e.providersByKey)
                        r[o] = e.providersByKey[o];
                    return {
                        factory: e.factory,
                        isRoot: e.isRoot,
                        providers: t,
                        modules: n,
                        providersByKey: r
                    }
                }(Wo(this._ngModuleDefFactory));
                return wo.createNgModuleRef(this.moduleType, e || Je.NULL, this._bootstrapComponents, t)
            }
        }
        var xa = n("gFX4")
          , Ea = n.n(xa)
          , ka = function() {
            function e(e) {
                this.subscribersCounter = 0,
                this.emptyConfig = {
                    url: "",
                    options: {}
                },
                void 0 === e && (e = this.emptyConfig),
                this.ioSocket = (Ea.a ? Ea.a : xa)(e.url, e.options)
            }
            return e.prototype.of = function(e) {
                this.ioSocket.of(e)
            }
            ,
            e.prototype.on = function(e, t) {
                this.ioSocket.on(e, t)
            }
            ,
            e.prototype.once = function(e, t) {
                this.ioSocket.once(e, t)
            }
            ,
            e.prototype.connect = function() {
                return this.ioSocket.connect()
            }
            ,
            e.prototype.disconnect = function(e) {
                return this.ioSocket.disconnect.apply(this.ioSocket, arguments)
            }
            ,
            e.prototype.emit = function(e, t, n) {
                return this.ioSocket.emit.apply(this.ioSocket, arguments)
            }
            ,
            e.prototype.removeListener = function(e, t) {
                return this.ioSocket.removeListener.apply(this.ioSocket, arguments)
            }
            ,
            e.prototype.removeAllListeners = function(e) {
                return this.ioSocket.removeAllListeners.apply(this.ioSocket, arguments)
            }
            ,
            e.prototype.fromEvent = function(e) {
                var t = this;
                return this.subscribersCounter++,
                x.create(function(n) {
                    return t.ioSocket.on(e, function(e) {
                        n.next(e)
                    }),
                    function() {
                        1 === t.subscribersCounter && t.ioSocket.removeListener(e)
                    }
                }).pipe(ce())
            }
            ,
            e.prototype.fromOneTimeEvent = function(e) {
                var t = this;
                return new Promise(function(n) {
                    return t.once(e, n)
                }
                )
            }
            ,
            e
        }();
        function Aa(e) {
            return new ka(e)
        }
        var Ta = new fe("__SOCKET_IO_CONFIG__")
          , Sa = function() {
            function e() {}
            return e.forRoot = function(t) {
                return {
                    ngModule: e,
                    providers: [{
                        provide: Ta,
                        useValue: t
                    }, {
                        provide: ka,
                        useFactory: Aa,
                        deps: [Ta]
                    }]
                }
            }
            ,
            e
        }();
        class Na {
        }
        class Ia {
            constructor() {
                this.title = "ChatAppClient"
            }
        }
        class Oa {
        }
        const Ma = void 0;
        var Fa = ["en", [["a", "p"], ["AM", "PM"], Ma], [["AM", "PM"], Ma, Ma], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], Ma, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], Ma, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", Ma, "{1} 'at' {0}", Ma], [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"], ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "$", "US Dollar", {}, function(e) {
            let t = Math.floor(Math.abs(e))
              , n = e.toString().replace(/^[^.]*\.?/, "").length;
            return 1 === t && 0 === n ? 1 : 5
        }
        ];
        const Da = {}
          , Pa = function() {
            var e = {
                Zero: 0,
                One: 1,
                Two: 2,
                Few: 3,
                Many: 4,
                Other: 5
            };
            return e[e.Zero] = "Zero",
            e[e.One] = "One",
            e[e.Two] = "Two",
            e[e.Few] = "Few",
            e[e.Many] = "Many",
            e[e.Other] = "Other",
            e
        }()
          , Ra = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/
          , Va = new fe("UseV4Plurals");
        class Ba {
        }
        class ja extends Ba {
            constructor(e, t) {
                super(),
                this.locale = e,
                this.deprecatedPluralFn = t
            }
            getPluralCategory(e, t) {
                switch (this.deprecatedPluralFn ? this.deprecatedPluralFn(t || this.locale, e) : function(e) {
                    return function(e) {
                        const t = e.toLowerCase().replace(/_/g, "-");
                        let n = Da[t];
                        if (n)
                            return n;
                        const r = t.split("-")[0];
                        if (n = Da[r])
                            return n;
                        if ("en" === r)
                            return Fa;
                        throw new Error(`Missing locale data for the locale "${e}".`)
                    }(e)[18]
                }(t || this.locale)(e)) {
                case Pa.Zero:
                    return "zero";
                case Pa.One:
                    return "one";
                case Pa.Two:
                    return "two";
                case Pa.Few:
                    return "few";
                case Pa.Many:
                    return "many";
                default:
                    return "other"
                }
            }
        }
        class La {
            constructor(e, t, n, r) {
                this.$implicit = e,
                this.ngForOf = t,
                this.index = n,
                this.count = r
            }
            get first() {
                return 0 === this.index
            }
            get last() {
                return this.index === this.count - 1
            }
            get even() {
                return this.index % 2 == 0
            }
            get odd() {
                return !this.even
            }
        }
        class Ha {
            constructor(e, t, n) {
                this._viewContainer = e,
                this._template = t,
                this._differs = n,
                this._ngForOfDirty = !0,
                this._differ = null
            }
            set ngForOf(e) {
                this._ngForOf = e,
                this._ngForOfDirty = !0
            }
            set ngForTrackBy(e) {
                Rt() && null != e && "function" != typeof e && console && console.warn && console.warn(`trackBy must be a function, but received ${JSON.stringify(e)}. ` + "See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information."),
                this._trackByFn = e
            }
            get ngForTrackBy() {
                return this._trackByFn
            }
            set ngForTemplate(e) {
                e && (this._template = e)
            }
            ngDoCheck() {
                if (this._ngForOfDirty) {
                    this._ngForOfDirty = !1;
                    const n = this._ngForOf;
                    if (!this._differ && n)
                        try {
                            this._differ = this._differs.find(n).create(this.ngForTrackBy)
                        } catch (t) {
                            throw new Error(`Cannot find a differ supporting object '${n}' of type '${e = n,
                            e.name || typeof e}'. NgFor only supports binding to Iterables such as Arrays.`)
                        }
                }
                var e;
                if (this._differ) {
                    const e = this._differ.diff(this._ngForOf);
                    e && this._applyChanges(e)
                }
            }
            _applyChanges(e) {
                const t = [];
                e.forEachOperation((e,n,r)=>{
                    if (null == e.previousIndex) {
                        const n = this._viewContainer.createEmbeddedView(this._template, new La(null,this._ngForOf,-1,-1), r)
                          , o = new Ua(e,n);
                        t.push(o)
                    } else if (null == r)
                        this._viewContainer.remove(n);
                    else {
                        const o = this._viewContainer.get(n);
                        this._viewContainer.move(o, r);
                        const s = new Ua(e,o);
                        t.push(s)
                    }
                }
                );
                for (let n = 0; n < t.length; n++)
                    this._perViewChange(t[n].view, t[n].record);
                for (let n = 0, r = this._viewContainer.length; n < r; n++) {
                    const e = this._viewContainer.get(n);
                    e.context.index = n,
                    e.context.count = r,
                    e.context.ngForOf = this._ngForOf
                }
                e.forEachIdentityChange(e=>{
                    this._viewContainer.get(e.currentIndex).context.$implicit = e.item
                }
                )
            }
            _perViewChange(e, t) {
                e.context.$implicit = t.item
            }
            static ngTemplateContextGuard(e, t) {
                return !0
            }
        }
        class Ua {
            constructor(e, t) {
                this.record = e,
                this.view = t
            }
        }
        class za {
            constructor(e, t) {
                this._viewContainer = e,
                this._context = new $a,
                this._thenTemplateRef = null,
                this._elseTemplateRef = null,
                this._thenViewRef = null,
                this._elseViewRef = null,
                this._thenTemplateRef = t
            }
            set ngIf(e) {
                this._context.$implicit = this._context.ngIf = e,
                this._updateView()
            }
            set ngIfThen(e) {
                Ga("ngIfThen", e),
                this._thenTemplateRef = e,
                this._thenViewRef = null,
                this._updateView()
            }
            set ngIfElse(e) {
                Ga("ngIfElse", e),
                this._elseTemplateRef = e,
                this._elseViewRef = null,
                this._updateView()
            }
            _updateView() {
                this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(),
                this._elseViewRef = null,
                this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(),
                this._thenViewRef = null,
                this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
            }
            static ngTemplateGuard_ngIf(e, t) {
                return !0
            }
        }
        class $a {
            constructor() {
                this.$implicit = null,
                this.ngIf = null
            }
        }
        function Ga(e, t) {
            if (t && !t.createEmbeddedView)
                throw new Error(`${e} must be a TemplateRef, but received '${Se(t)}'.`)
        }
        function qa(e, t) {
            return Error(`InvalidPipeArgument: '${t}' for pipe '${Se(e)}'`)
        }
        const Wa = /((?:[^yMLdHhmsazZEwGjJ']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|J+|j+|m+|s+|a|z|Z|G+|w+))(.*)/
          , Za = {
            yMMMdjms: sl(ol([nl("year", 1), rl("month", 3), nl("day", 1), nl("hour", 1), nl("minute", 1), nl("second", 1)])),
            yMdjm: sl(ol([nl("year", 1), nl("month", 1), nl("day", 1), nl("hour", 1), nl("minute", 1)])),
            yMMMMEEEEd: sl(ol([nl("year", 1), rl("month", 4), rl("weekday", 4), nl("day", 1)])),
            yMMMMd: sl(ol([nl("year", 1), rl("month", 4), nl("day", 1)])),
            yMMMd: sl(ol([nl("year", 1), rl("month", 3), nl("day", 1)])),
            yMd: sl(ol([nl("year", 1), nl("month", 1), nl("day", 1)])),
            jms: sl(ol([nl("hour", 1), nl("second", 1), nl("minute", 1)])),
            jm: sl(ol([nl("hour", 1), nl("minute", 1)]))
        }
          , Ka = {
            yyyy: sl(nl("year", 4)),
            yy: sl(nl("year", 2)),
            y: sl(nl("year", 1)),
            MMMM: sl(rl("month", 4)),
            MMM: sl(rl("month", 3)),
            MM: sl(nl("month", 2)),
            M: sl(nl("month", 1)),
            LLLL: sl(rl("month", 4)),
            L: sl(rl("month", 1)),
            dd: sl(nl("day", 2)),
            d: sl(nl("day", 1)),
            HH: Qa(Ja(sl(tl(nl("hour", 2), !1)))),
            H: Ja(sl(tl(nl("hour", 1), !1))),
            hh: Qa(Ja(sl(tl(nl("hour", 2), !0)))),
            h: Ja(sl(tl(nl("hour", 1), !0))),
            jj: sl(nl("hour", 2)),
            j: sl(nl("hour", 1)),
            mm: Qa(sl(nl("minute", 2))),
            m: sl(nl("minute", 1)),
            ss: Qa(sl(nl("second", 2))),
            s: sl(nl("second", 1)),
            sss: sl(nl("second", 3)),
            EEEE: sl(rl("weekday", 4)),
            EEE: sl(rl("weekday", 3)),
            EE: sl(rl("weekday", 2)),
            E: sl(rl("weekday", 1)),
            a: Ya(sl(tl(nl("hour", 1), !0))),
            Z: el("short"),
            z: el("long"),
            ww: sl({}),
            w: sl({}),
            G: sl(rl("era", 1)),
            GG: sl(rl("era", 2)),
            GGG: sl(rl("era", 3)),
            GGGG: sl(rl("era", 4))
        };
        function Qa(e) {
            return function(t, n) {
                const r = e(t, n);
                return 1 == r.length ? "0" + r : r
            }
        }
        function Ya(e) {
            return function(t, n) {
                return e(t, n).split(" ")[1]
            }
        }
        function Ja(e) {
            return function(t, n) {
                return e(t, n).split(" ")[0]
            }
        }
        function Xa(e, t, n) {
            return new Intl.DateTimeFormat(t,n).format(e).replace(/[\u200e\u200f]/g, "")
        }
        function el(e) {
            const t = {
                hour: "2-digit",
                hour12: !1,
                timeZoneName: e
            };
            return function(e, n) {
                const r = Xa(e, n, t);
                return r ? r.substring(3) : ""
            }
        }
        function tl(e, t) {
            return e.hour12 = t,
            e
        }
        function nl(e, t) {
            const n = {};
            return n[e] = 2 === t ? "2-digit" : "numeric",
            n
        }
        function rl(e, t) {
            const n = {};
            return n[e] = t < 4 ? t > 1 ? "short" : "narrow" : "long",
            n
        }
        function ol(e) {
            return e.reduce((e,t)=>Object.assign({}, e, t), {})
        }
        function sl(e) {
            return (t,n)=>Xa(t, n, e)
        }
        const il = new Map;
        class al {
            static format(e, t, n) {
                return function(e, t, n) {
                    const r = Za[e];
                    if (r)
                        return r(t, n);
                    const o = e;
                    let s = il.get(o);
                    if (!s) {
                        let t;
                        s = [],
                        Wa.exec(e);
                        let n = e;
                        for (; n; )
                            (t = Wa.exec(n)) ? n = (s = s.concat(t.slice(1))).pop() : (s.push(n),
                            n = null);
                        il.set(o, s)
                    }
                    return s.reduce((e,r)=>{
                        const o = Ka[r];
                        return e + (o ? o(t, n) : function(e) {
                            return "''" === e ? "'" : e.replace(/(^'|'$)/g, "").replace(/''/g, "'")
                        }(r))
                    }
                    , "")
                }(n, e, t)
            }
        }
        class ll {
            constructor(e) {
                this._locale = e
            }
            transform(e, t="mediumDate") {
                if (null == e || "" === e || e != e)
                    return null;
                let n;
                if ("string" == typeof e && (e = e.trim()),
                cl(e))
                    n = e;
                else if (isNaN(e - parseFloat(e)))
                    if ("string" == typeof e && /^(\d{4}-\d{1,2}-\d{1,2})$/.test(e)) {
                        const [t,r,o] = e.split("-").map(e=>parseInt(e, 10));
                        n = new Date(t,r - 1,o)
                    } else
                        n = new Date(e);
                else
                    n = new Date(parseFloat(e));
                if (!cl(n)) {
                    let t;
                    if ("string" != typeof e || !(t = e.match(Ra)))
                        throw qa(ll, e);
                    n = function(e) {
                        const t = new Date(0);
                        let n = 0
                          , r = 0;
                        const o = e[8] ? t.setUTCFullYear : t.setFullYear
                          , s = e[8] ? t.setUTCHours : t.setHours;
                        e[9] && (n = Number(e[9] + e[10]),
                        r = Number(e[9] + e[11])),
                        o.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
                        const i = Number(e[4] || 0) - n
                          , a = Number(e[5] || 0) - r
                          , l = Number(e[6] || 0)
                          , c = Math.round(1e3 * parseFloat("0." + (e[7] || 0)));
                        return s.call(t, i, a, l, c),
                        t
                    }(t)
                }
                return al.format(n, this._locale, ll._ALIASES[t] || t)
            }
        }
        function cl(e) {
            return e instanceof Date && !isNaN(e.valueOf())
        }
        ll._ALIASES = {
            medium: "yMMMdjms",
            short: "yMdjm",
            fullDate: "yMMMMEEEEd",
            longDate: "yMMMMd",
            mediumDate: "yMMMd",
            shortDate: "yMd",
            mediumTime: "jms",
            shortTime: "jm"
        };
        class ul {
            createSubscription(e, t) {
                return e.subscribe({
                    next: t,
                    error: e=>{
                        throw e
                    }
                })
            }
            dispose(e) {
                e.unsubscribe()
            }
            onDestroy(e) {
                e.unsubscribe()
            }
        }
        class hl {
            createSubscription(e, t) {
                return e.then(t, e=>{
                    throw e
                }
                )
            }
            dispose(e) {}
            onDestroy(e) {}
        }
        const dl = new hl
          , pl = new ul;
        class fl {
            constructor(e) {
                this._ref = e,
                this._latestValue = null,
                this._latestReturnedValue = null,
                this._subscription = null,
                this._obj = null,
                this._strategy = null
            }
            ngOnDestroy() {
                this._subscription && this._dispose()
            }
            transform(e) {
                return this._obj ? e !== this._obj ? (this._dispose(),
                this.transform(e)) : this._latestValue === this._latestReturnedValue ? this._latestReturnedValue : (this._latestReturnedValue = this._latestValue,
                je.wrap(this._latestValue)) : (e && this._subscribe(e),
                this._latestReturnedValue = this._latestValue,
                this._latestValue)
            }
            _subscribe(e) {
                this._obj = e,
                this._strategy = this._selectStrategy(e),
                this._subscription = this._strategy.createSubscription(e, t=>this._updateLatestValue(e, t))
            }
            _selectStrategy(e) {
                if (Wn(e))
                    return dl;
                if (Zn(e))
                    return pl;
                throw qa(fl, e)
            }
            _dispose() {
                this._strategy.dispose(this._subscription),
                this._latestValue = null,
                this._latestReturnedValue = null,
                this._subscription = null,
                this._obj = null
            }
            _updateLatestValue(e, t) {
                e === this._obj && (this._latestValue = t,
                this._ref.markForCheck())
            }
        }
        class gl {
        }
        const ml = new fe("DocumentToken")
          , yl = "browser"
          , vl = "server";
        function bl(e) {
            return e === yl
        }
        class _l {
            constructor() {
                this.userName = "test"
            }
        }
        class wl {
            constructor(e, t) {
                this.socket = e,
                this.globals = t,
                this.uniqueOT = this.docId(),
                this.username = window.localStorage.getItem("UserName"),
                this.documents = this.socket.fromEvent("documents" + this.username + "END"),
                this.currDocument = this.socket.fromEvent("doc-Arr"),
                this.currDocMsg = this.socket.fromEvent("doc-Msg"),
                this.newMsg = this.socket.fromEvent("newMsg" + this.username),
                this.userConfirm = this.socket.fromEvent("userAuth" + this.uniqueOT)
            }
            getContacts() {
                let e = window.localStorage.getItem("UserName");
                this.socket.emit("arrDocuments", e)
            }
            loadDoc(e) {
                this.socket.emit("getDocArr", e)
            }
            newDocument(e, t) {
                this.socket.emit("addDoc", {
                    id: this.docId(),
                    users: [t, e],
                    doc: [{
                        sender: "",
                        content: "",
                        time: "",
                        date: ""
                    }]
                })
            }
            addUser(e, t) {
                this.socket.emit("userAuth", [e, t, this.uniqueOT])
            }
            registerUser(e) {
                this.socket.emit("userReg", [e, this.uniqueOT])
            }
            sendMsg(e) {
                this.socket.emit("sendMsg", e)
            }
            docId() {
                let e = "";
                const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (let n = 0; n < 10; n++)
                    e += t.charAt(Math.floor(Math.random() * t.length));
                return e
            }
        }
        wl.ngInjectableDef = de({
            factory: function() {
                return new wl(Ve(ka),Ve(_l))
            },
            token: wl,
            providedIn: "root"
        });
        class Cl {
            constructor(e, t, n) {
                this.documentService = e,
                this.globals = t,
                this.cd = n,
                this.loggedIn = !1,
                this.register = !1,
                this.unreadMsg = [""],
                this.emailSave = window.localStorage.getItem("UserName")
            }
            ngOnInit() {
                this.loggedInCheck(),
                this.getContacts(),
                this.logResponse = this.documentService.userConfirm,
                this._docSub = this.documentService.userConfirm.subscribe(e=>{
                    this.logginReply(e)
                }
                )
            }
            ngAfterViewInit() {
                this.documentService.newMsg.subscribe(e=>{
                    console.log(e),
                    this.unreadMsg.push(e),
                    this.cd.markForCheck()
                }
                )
            }
            ngOnDestroy() {
                this._docSub.unsubscribe()
            }
            loadDoc(e, t) {
                this.unreadMsg = this.unreadMsg.filter(t=>t !== e[1]),
                this.documentService.loadDoc(e[0])
            }
            newDoc(e) {
                this.documentService.newDocument(e, this.globals.userName),
                this.getContacts()
            }
            hideNav() {
                document.getElementById("nav").style.display = "none"
            }
            getContacts() {
                this.documentService.getContacts(),
                this.documents = this.documentService.documents
            }
            saveName() {
                window.localStorage.setItem("UserName", this.globals.userName)
            }
            registerToggle() {
                this.register = !this.register
            }
            registerUser(e, t, n, r, o) {
                if (r === o) {
                    const o = {
                        email: n,
                        firstName: e,
                        lastName: t,
                        password: r,
                        tempPass: "",
                        permId: ""
                    };
                    this.globals.userName = n,
                    console.log(o),
                    this.documentService.registerUser(o)
                } else
                    alert("Passwords dont match")
            }
            login(e, t) {
                console.log('e, t',e, t)
                this.globals.userName = e,
                this.getContacts(),
                this.documentService.addUser(e, t)
            }
            loggedInCheck() {
                let e = window.localStorage.getItem("UserName");
                null !== e && -1 == e.indexOf("test") ? (this.loggedIn = !0,
                this.globals.userName = e) : this.emailSave = ""
            }
            reload() {
                window.location.reload()
            }
            logginReply(e) {
                e.indexOf("confirm") > -1 ? (this.loggedIn = !0,
                this.register = !1,
                this.saveName()) : e[0].indexOf("You Can now log in") > -1 ? (this.loggedIn = !0,
                this.register = !1,
                this.saveName()) : alert(e)
            }
            loggOut() {
                localStorage.removeItem("UserName"),
                window.location.reload()
            }
            getUnread(e) {
                const t = [...this.unreadMsg].filter(t=>t === e[1]).length;
                return t > 0 ? "   " + t : ""
            }
        }
        var xl = Io({
            encapsulation: 0,
            styles: [[".header[_ngcontent-%COMP%]{left:0;top:0;background-color:navy;width:100%;height:55px;padding-top:10px;z-index:9999999;display:block}.header[_ngcontent-%COMP%]   #loggedInParagraph[_ngcontent-%COMP%]{color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:25px;margin-top:10px;margin-bottom:10px}.header[_ngcontent-%COMP%]   #loggedOut[_ngcontent-%COMP%]{height:100%;background-color:navy}div[_ngcontent-%COMP%]{position:fixed;height:100%;width:100%;top:0;bottom:0;left:0;background-color:#d7dff5;overflow-x:hidden;text-align:center;margin:0;z-index:1500}div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{text-decoration:none;z-index:999999;font-size:30px;color:navy;background-color:#f6f6f6;width:80%;margin-left:10%;margin-top:17px;display:block;padding-top:10px;padding-bottom:10px;border-radius:2px}div[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]{color:#e1e1e1}div[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover{cursor:pointer}div[_ngcontent-%COMP%]   .loginInput[_ngcontent-%COMP%]{color:#000;font-family:Arial,Helvetica,sans-serif;font-size:25px;margin-bottom:10px;text-align:center}div[_ngcontent-%COMP%]   #contactNameInput[_ngcontent-%COMP%]{font-family:Arial,Helvetica,sans-serif;color:#000;font-size:20px;text-align:center;margin-top:10px;margin-bottom:10px}h3[_ngcontent-%COMP%]{margin-bottom:0;padding-top:4px;font-size:30px;margin-top:10px}button[_ngcontent-%COMP%]{font-family:Arial,Helvetica,sans-serif;width:80px;height:30px;border-radius:20px;font-size:20px;border:none}#addContButton[_ngcontent-%COMP%]{background-color:navy;color:#fff}#loginButton[_ngcontent-%COMP%]{background-color:#fff}#addContact[_ngcontent-%COMP%]{position:relative;z-index:999999;font-size:20px;color:navy;background-color:#f6f6f6;width:90%;height:auto;margin-top:65px;margin-left:5%;margin-bottom:3%;padding-bottom:10px;border-radius:2px}.listBackButtonLeft[_ngcontent-%COMP%]{position:fixed;font-family:Arial,Helvetica,sans-serif;display:inline;font-size:18px;margin-top:3px;left:0!important;margin-left:1%!important;border-radius:50%;width:45px;height:45px;z-index:499;background-color:#fff;border:none}.listBackButtonRight[_ngcontent-%COMP%]{position:fixed;font-family:Arial,Helvetica,sans-serif;display:inline;font-size:18px;margin-top:3px;right:0!important;margin-right:1%!important;border-radius:50%;width:45px;height:45px;z-index:499;background-color:#fff;border:none}#receiver[_ngcontent-%COMP%]{color:#fff;margin-top:5px!important;margin-bottom:15px!important;font-size:30px;display:block}#username[_ngcontent-%COMP%]{float:left;left:0!important;margin:0 0 0 15px}#unread[_ngcontent-%COMP%]{font-size:15px;width:16px;float:right;border-radius:50%;padding:5px;border:1px solid navy;right:0!important;margin:2px 15px 0 0}"]],
            data: {}
        });
        function El(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 1, "button", [["class", "listBackButtonLeft"]], null, [[null, "click"]], function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.loggOut() && r),
                r
            }, null, null)), (e()(),
            hi(-1, null, ["Out"]))], null, null)
        }
        function kl(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 1, "button", [["class", "listBackButtonRight"]], null, [[null, "click"]], function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.reload() && r),
                r
            }, null, null)), (e()(),
            hi(-1, null, ["Ref"]))], null, null)
        }
        function Al(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 12, "div", [["id", "loggedOut"]], null, null, null, null, null)), (e()(),
            rs(1, 0, null, null, 1, "p", [["id", "loggedInParagraph"]], null, null, null, null, null)), (e()(),
            hi(-1, null, ["Login or Sign up"])), (e()(),
            rs(3, 0, [["email", 1]], null, 0, "input", [["class", "loginInput"], ["placeholder", "Email..."], ["type", "text"]], null, [[null, "keyup"]], function(e, t, n) {
                var r = !0;
                return "keyup" === t && (r = !1 !== e.component.saveName() && r),
                r
            }, null, null)), (e()(),
            rs(4, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            rs(5, 0, [["userPass", 1]], null, 0, "input", [["class", "loginInput"], ["placeholder", "Password..."], ["type", "password"]], null, null, null, null, null)), (e()(),
            rs(6, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            rs(7, 0, null, null, 1, "button", [["id", "loginButton"]], null, [[null, "click"]], function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.login(Ms(e, 3).value, Ms(e, 5).value) && r),
                r
            }, null, null)), (e()(),
            hi(-1, null, ["Login"])), (e()(),
            rs(9, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            rs(10, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            rs(11, 0, null, null, 1, "button", [["id", "loginButton"]], null, [[null, "click"]], function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.registerToggle() && r),
                r
            }, null, null)), (e()(),
            hi(-1, null, ["Sign up"]))], null, null)
        }
        function Tl(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 18, "div", [["id", "loggedOut"]], null, null, null, null, null)), (e()(),
            rs(1, 0, null, null, 1, "p", [["id", "loggedInParagraph"]], null, null, null, null, null)), (e()(),
            hi(-1, null, ["Sign up to login"])), (e()(),
            rs(3, 0, [["firstName", 1]], null, 0, "input", [["class", "loginInput"], ["placeholder", "First name..."], ["type", "text"]], null, null, null, null, null)), (e()(),
            rs(4, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            rs(5, 0, [["lastName", 1]], null, 0, "input", [["class", "loginInput"], ["placeholder", "Last name..."], ["type", "text"]], null, null, null, null, null)), (e()(),
            rs(6, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            rs(7, 0, [["email", 1]], null, 0, "input", [["class", "loginInput"], ["placeholder", "Email..."], ["type", "text"]], null, [[null, "keyup"]], function(e, t, n) {
                var r = !0;
                return "keyup" === t && (r = !1 !== e.component.saveName() && r),
                r
            }, null, null)), (e()(),
            rs(8, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            rs(9, 0, [["userPass", 1]], null, 0, "input", [["class", "loginInput"], ["placeholder", "Password..."], ["type", "password"]], null, null, null, null, null)), (e()(),
            rs(10, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            rs(11, 0, [["userPass2", 1]], null, 0, "input", [["class", "loginInput"], ["placeholder", "Password2..."], ["type", "password"]], null, null, null, null, null)), (e()(),
            rs(12, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            rs(13, 0, null, null, 1, "button", [["id", "loginButton"]], null, [[null, "click"]], function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.registerUser(Ms(e, 3).value, Ms(e, 5).value, Ms(e, 7).value, Ms(e, 9).value, Ms(e, 11).value) && r),
                r
            }, null, null)), (e()(),
            hi(-1, null, [" Sign up"])), (e()(),
            rs(15, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            rs(16, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            rs(17, 0, null, null, 1, "button", [["id", "loginButton"]], null, [[null, "click"]], function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.registerToggle() && r),
                r
            }, null, null)), (e()(),
            hi(-1, null, ["Login"]))], null, null)
        }
        function Sl(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 1, "p", [["id", "unread"]], null, null, null, null, null)), (e()(),
            hi(1, null, ["", ""]))], null, function(e, t) {
                e(t, 1, 0, t.component.getUnread(t.parent.context.$implicit))
            })
        }
        function Nl(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 5, "span", [["class", "contactList"]], [[2, "selected", null]], [[null, "click"]], function(e, t, n) {
                var r = !0
                  , o = e.component;
                return "click" === t && (o.loadDoc(e.context.$implicit),
                r = !1 !== o.hideNav() && r),
                r
            }, null, null)), (e()(),
            rs(1, 0, null, null, 1, "p", [["id", "username"]], null, null, null, null, null)), (e()(),
            hi(2, null, ["", ""])), (e()(),
            ns(16777216, null, null, 1, null, Sl)), Gs(4, 16384, null, 0, za, [Pr, on], {
                ngIf: [0, "ngIf"]
            }, null), (e()(),
            rs(5, 0, null, null, 0, "br", [], null, null, null, null, null))], function(e, t) {
                e(t, 4, 0, t.component.getUnread(t.context.$implicit) > 0)
            }, function(e, t) {
                e(t, 0, 0, t.context.$implicit === t.component.currArr2),
                e(t, 2, 0, t.context.$implicit[1])
            })
        }
        function Il(e) {
            return fi(2, [(e()(),
            rs(0, 0, null, null, 23, "div", [["class", "container"], ["id", "nav"]], null, null, null, null, null)), (e()(),
            rs(1, 0, null, null, 11, "div", [["class", "header"]], null, null, null, null, null)), (e()(),
            ns(16777216, null, null, 1, null, El)), Gs(3, 16384, null, 0, za, [Pr, on], {
                ngIf: [0, "ngIf"]
            }, null), (e()(),
            ns(16777216, null, null, 1, null, kl)), Gs(5, 16384, null, 0, za, [Pr, on], {
                ngIf: [0, "ngIf"]
            }, null), (e()(),
            rs(6, 0, null, null, 2, "strong", [], null, null, null, null, null)), (e()(),
            rs(7, 0, null, null, 1, "p", [["id", "receiver"]], null, null, null, null, null)), (e()(),
            hi(8, null, ["", ""])), (e()(),
            ns(16777216, null, null, 1, null, Al)), Gs(10, 16384, null, 0, za, [Pr, on], {
                ngIf: [0, "ngIf"]
            }, null), (e()(),
            ns(16777216, null, null, 1, null, Tl)), Gs(12, 16384, null, 0, za, [Pr, on], {
                ngIf: [0, "ngIf"]
            }, null), (e()(),
            rs(13, 0, null, null, 6, "div", [["id", "addContact"]], null, null, null, null, null)), (e()(),
            rs(14, 0, null, null, 1, "h3", [], null, null, null, null, null)), (e()(),
            hi(-1, null, ["Add New Contact"])), (e()(),
            rs(16, 0, [["contactNameInput", 1]], null, 0, "input", [["id", "contactNameInput"], ["placeholder", "Enter Name..."], ["type", "text"]], null, [[null, "keydown.enter"]], function(e, t, n) {
                var r = !0;
                return "keydown.enter" === t && (e.component.newDoc(Ms(e, 16).value),
                r = !1 !== (Ms(e, 16).value = "") && r),
                r
            }, null, null)), (e()(),
            rs(17, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            rs(18, 0, null, null, 1, "button", [["id", "addContButton"]], null, [[null, "click"]], function(e, t, n) {
                var r = !0;
                return "click" === t && (e.component.newDoc(Ms(e, 16).value),
                r = !1 !== (Ms(e, 16).value = "") && r),
                r
            }, null, null)), (e()(),
            hi(-1, null, ["Add"])), (e()(),
            ns(16777216, null, null, 2, null, Nl)), Gs(21, 278528, null, 0, Ha, [Pr, on, to], {
                ngForOf: [0, "ngForOf"]
            }, null), (t = 131072,
            n = fl,
            r = [Vr],
            qs(-1, t |= 16, null, 0, n, n, r)), (e()(),
            rs(23, 0, null, null, 0, "br", [], null, null, null, null, null))], function(e, t) {
                var n = t.component;
                e(t, 3, 0, n.loggedIn),
                e(t, 5, 0, n.loggedIn),
                e(t, 10, 0, !n.loggedIn && !n.register),
                e(t, 12, 0, n.register),
                e(t, 21, 0, function(e, t, n, r) {
                    if (je.isWrapped(r)) {
                        r = je.unwrap(r);
                        const t = e.def.nodes[21].bindingIndex + 0
                          , n = je.unwrap(e.oldValues[t]);
                        e.oldValues[t] = new je(n)
                    }
                    return r
                }(t, 0, 0, Ms(t, 22).transform(n.documents)))
            }, function(e, t) {
                e(t, 8, 0, t.component.globals.userName)
            });
            var t, n, r
        }
        function Ol(e) {
            const t = new x(t=>{
                t.next(e),
                t.complete()
            }
            );
            return t._isScalar = !0,
            t.value = e,
            t
        }
        const Ml = new x(e=>e.complete());
        function Fl(e) {
            return e ? function(e) {
                return new x(t=>e.schedule(()=>t.complete()))
            }(e) : Ml
        }
        function Dl(...e) {
            let t = e[e.length - 1];
            switch (O(t) ? e.pop() : t = void 0,
            e.length) {
            case 0:
                return Fl(t);
            case 1:
                return t ? W(e, t) : Ol(e[0]);
            default:
                return W(e, t)
            }
        }
        function Pl(...e) {
            return 1 === e.length || 2 === e.length && O(e[1]) ? Z(e[0]) : J(1)(Dl(...e))
        }
        class Rl {
            constructor(e, t) {
                this.documentService = e,
                this.globals = t
            }
            ngOnInit() {
                this._docSub = this.documentService.currDocument.pipe(function(...e) {
                    return t=>{
                        let n = e[e.length - 1];
                        O(n) ? e.pop() : n = null;
                        const r = e.length;
                        return Pl(1 !== r || n ? r > 0 ? W(e, n) : Fl(n) : Ol(e[0]), t)
                    }
                }({
                    id: "",
                    users: [""],
                    doc: [{
                        sender: "",
                        receiver: "",
                        content: "",
                        time: "",
                        date: ""
                    }]
                })).subscribe(e=>{
                    this.docArr = e
                }
                ),
                this._docSub = this.documentService.currDocMsg.subscribe(e=>{
                    this.docArr.doc.push(e.doc[0]),
                    window.scrollTo(0, 5e3)
                }
                )
            }
            ngOnDestroy() {
                this._docSub.unsubscribe()
            }
            sendMsg(e) {
                let t = new Date
                  , n = t.getHours() + ":" + t.getMinutes()
                  , r = t.getUTCDate() + ""
                  , o = this.contactName()
                  , s = {
                    sender: this.globals.userName,
                    receiver: o,
                    content: e,
                    time: n,
                    date: r
                }
                  , i = {
                    id: this.docArr.id,
                    doc: [s]
                };
                this.docArr.doc.push(s),
                this.documentService.sendMsg(i)
            }
            showNav() {
                document.getElementById("nav").style.display = "block"
            }
            isUser(e) {
                let t = !1;
                return this.globals.userName == e && (t = !0),
                t
            }
            contactName() {
                return this.docArr.users[0] == this.globals.userName ? this.docArr.users[1] : this.docArr.users[0]
            }
            notEmpty(e) {
                return e.length > 0
            }
        }
        var Vl = Io({
            encapsulation: 0,
            styles: [["#doc-body[_ngcontent-%COMP%]{position:fixed;background-color:#d7dff5;width:100%;left:0;padding-left:3%}#header[_ngcontent-%COMP%]{clear:right;position:fixed;display:inline;text-align:center;top:0;left:0;height:55px;width:100%;background-color:navy;z-index:600;border:1px solid #000}#receiver[_ngcontent-%COMP%]{color:#fff;margin-top:13px!important;font-size:30px;display:block}#messArea[_ngcontent-%COMP%]{position:fixed;overflow:scroll;width:100%;padding-top:50px;height:79%;background-color:#d7dff5;bottom:30px;left:0;padding-bottom:20px;padding-left:20px}#container[_ngcontent-%COMP%]{margin-top:5px;padding-right:5px}#usrMsg[_ngcontent-%COMP%]{font-size:18px;border:1px solid #000;border-radius:2px;clear:both;float:right;margin-right:40px;margin-top:5px;color:#fff;background-color:navy;padding:0}#ntUsr[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], #usrMsg[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:3px}#ntUsr[_ngcontent-%COMP%]{margin-top:5px;font-size:18px;border:1px solid #000;border-radius:2px;clear:both;float:left;background-color:#fff}.timeStamp[_ngcontent-%COMP%]{font-size:10px}#msgType[_ngcontent-%COMP%]{position:relative;width:75%;left:calc(15% - 2px);height:80%;margin-top:5px;font-size:20px;border:0 solid #fff;bottom:1px;z-index:499;border-radius:2px;font-family:Arial,Helvetica,sans-serif;text-align:center}input[type=text][_ngcontent-%COMP%]:focus{outline:0}#bottom[_ngcontent-%COMP%]{position:fixed;bottom:0;left:0;width:100%;background-color:#d7dff5}#typeArea[_ngcontent-%COMP%]{-webkit-backface-visibility:none;backface-visibility:none;float:left;height:35px;bottom:0;margin-top:6px;margin-left:2%;width:calc(94% - 42px);z-index:600;background-color:#fff;border-radius:20px}#sendButton[_ngcontent-%COMP%]{margin-left:2%;padding-left:5px;border-radius:50%;width:45px;height:45px;z-index:499;font-size:10px;background-color:navy;color:#fff;border:none;font-family:Arial,Helvetica,sans-serif}.backButton[_ngcontent-%COMP%]{position:fixed;font-family:Arial,Helvetica,sans-serif;display:inline;margin-top:3px;left:0;margin-left:1%;border-radius:50%;width:45px;height:45px;z-index:499;background-color:#fff;border:none}[_ngcontent-%COMP%]::-webkit-scrollbar{width:0;background:0 0}"]],
            data: {}
        });
        function Bl(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 4, "div", [["id", "usrMsg"]], null, null, null, null, null)), (e()(),
            rs(1, 0, null, null, 1, "p", [], null, null, null, null, null)), (e()(),
            hi(2, null, ["", " "])), (e()(),
            rs(3, 0, null, null, 1, "p", [["class", "timeStamp"]], null, null, null, null, null)), (e()(),
            hi(4, null, ["", ""]))], null, function(e, t) {
                e(t, 2, 0, t.parent.parent.context.$implicit.content),
                e(t, 4, 0, t.parent.parent.context.$implicit.time)
            })
        }
        function jl(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 4, "div", [["id", "ntUsr"]], null, null, null, null, null)), (e()(),
            rs(1, 0, null, null, 1, "p", [], null, null, null, null, null)), (e()(),
            hi(2, null, ["", " "])), (e()(),
            rs(3, 0, null, null, 1, "p", [["class", "timeStamp"]], null, null, null, null, null)), (e()(),
            hi(4, null, ["", ""]))], null, function(e, t) {
                e(t, 2, 0, t.parent.parent.context.$implicit.content),
                e(t, 4, 0, t.parent.parent.context.$implicit.time)
            })
        }
        function Ll(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 4, "div", [], null, null, null, null, null)), (e()(),
            ns(16777216, null, null, 1, null, Bl)), Gs(2, 16384, null, 0, za, [Pr, on], {
                ngIf: [0, "ngIf"]
            }, null), (e()(),
            ns(16777216, null, null, 1, null, jl)), Gs(4, 16384, null, 0, za, [Pr, on], {
                ngIf: [0, "ngIf"]
            }, null)], function(e, t) {
                var n = t.component;
                e(t, 2, 0, n.isUser(t.parent.context.$implicit.sender)),
                e(t, 4, 0, !n.isUser(t.parent.context.$implicit.sender))
            }, null)
        }
        function Hl(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 2, "div", [], null, null, null, null, null)), (e()(),
            ns(16777216, null, null, 1, null, Ll)), Gs(2, 16384, null, 0, za, [Pr, on], {
                ngIf: [0, "ngIf"]
            }, null)], function(e, t) {
                e(t, 2, 0, t.component.notEmpty(t.context.$implicit.content))
            }, null)
        }
        function Ul(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 15, "div", [["id", "doc-body"]], null, null, null, null, null)), (e()(),
            rs(1, 0, null, null, 5, "div", [["id", "header"]], null, null, null, null, null)), (e()(),
            rs(2, 0, null, null, 1, "button", [["class", "backButton"]], null, [[null, "click"]], function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.showNav() && r),
                r
            }, null, null)), (e()(),
            hi(-1, null, ["Back"])), (e()(),
            rs(4, 0, null, null, 2, "strong", [], null, null, null, null, null)), (e()(),
            rs(5, 0, null, null, 1, "p", [["id", "receiver"]], null, null, null, null, null)), (e()(),
            hi(6, null, ["", ""])), (e()(),
            rs(7, 0, null, null, 3, "div", [["id", "messArea"]], null, null, null, null, null)), (e()(),
            rs(8, 0, null, null, 2, "div", [], null, null, null, null, null)), (e()(),
            ns(16777216, null, null, 1, null, Hl)), Gs(10, 278528, null, 0, Ha, [Pr, on, to], {
                ngForOf: [0, "ngForOf"]
            }, null), (e()(),
            rs(11, 0, null, null, 4, "div", [["id", "bottom"]], null, null, null, null, null)), (e()(),
            rs(12, 0, null, null, 1, "div", [["id", "typeArea"]], null, null, null, null, null)), (e()(),
            rs(13, 0, [["text", 1]], null, 0, "input", [["id", "msgType"], ["placeholder", "Start typing..."], ["type", "text"]], null, [[null, "keydown.enter"]], function(e, t, n) {
                var r = !0;
                return "keydown.enter" === t && (e.component.sendMsg(Ms(e, 13).value),
                r = !1 !== (Ms(e, 13).value = "") && r),
                r
            }, null, null)), (e()(),
            rs(14, 0, null, null, 1, "button", [["id", "sendButton"]], null, [[null, "click"]], function(e, t, n) {
                var r = !0;
                return "click" === t && (e.component.sendMsg(Ms(e, 13).value),
                r = !1 !== (Ms(e, 13).value = "") && r),
                r
            }, null, null)), (e()(),
            hi(-1, null, ["Send"]))], function(e, t) {
                e(t, 10, 0, t.component.docArr.doc)
            }, function(e, t) {
                e(t, 6, 0, t.component.contactName())
            })
        }
        var zl = Io({
            encapsulation: 0,
            styles: [[""]],
            data: {}
        });
        function $l(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 1, "app-document-list", [], null, null, null, Il, xl)), Gs(1, 4440064, null, 0, Cl, [wl, _l, Vr], null, null), (e()(),
            rs(2, 0, null, null, 1, "app-document", [], null, null, null, Ul, Vl)), Gs(3, 245760, null, 0, Rl, [wl, _l], null, null)], function(e, t) {
                e(t, 1, 0),
                e(t, 3, 0)
            }, null)
        }
        function Gl(e) {
            return fi(0, [(e()(),
            rs(0, 0, null, null, 1, "app-root", [], null, null, null, $l, zl)), Gs(1, 49152, null, 0, Ia, [], null, null)], null, null)
        }
        var ql = ws("app-root", Ia, Gl, {}, {}, []);
        let Wl = null;
        function Zl() {
            return Wl
        }
        class Kl {
            constructor() {
                this.resourceLoaderType = null
            }
            get attrToPropMap() {
                return this._attrToPropMap
            }
            set attrToPropMap(e) {
                this._attrToPropMap = e
            }
        }
        class Ql extends Kl {
            constructor() {
                super(),
                this._animationPrefix = null,
                this._transitionEnd = null;
                try {
                    const t = this.createElement("div", document);
                    if (null != this.getStyle(t, "animationName"))
                        this._animationPrefix = "";
                    else {
                        const e = ["Webkit", "Moz", "O", "ms"];
                        for (let n = 0; n < e.length; n++)
                            if (null != this.getStyle(t, e[n] + "AnimationName")) {
                                this._animationPrefix = "-" + e[n].toLowerCase() + "-";
                                break
                            }
                    }
                    const n = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                    Object.keys(n).forEach(e=>{
                        null != this.getStyle(t, e) && (this._transitionEnd = n[e])
                    }
                    )
                } catch (e) {
                    this._animationPrefix = null,
                    this._transitionEnd = null
                }
            }
            getDistributedNodes(e) {
                return e.getDistributedNodes()
            }
            resolveAndSetHref(e, t, n) {
                e.href = null == n ? t : t + "/../" + n
            }
            supportsDOMEvents() {
                return !0
            }
            supportsNativeShadowDOM() {
                return "function" == typeof document.body.createShadowRoot
            }
            getAnimationPrefix() {
                return this._animationPrefix ? this._animationPrefix : ""
            }
            getTransitionEnd() {
                return this._transitionEnd ? this._transitionEnd : ""
            }
            supportsAnimation() {
                return null != this._animationPrefix && null != this._transitionEnd
            }
        }
        const Yl = {
            class: "className",
            innerHtml: "innerHTML",
            readonly: "readOnly",
            tabindex: "tabIndex"
        }
          , Jl = 3
          , Xl = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }
          , ec = {
            A: "1",
            B: "2",
            C: "3",
            D: "4",
            E: "5",
            F: "6",
            G: "7",
            H: "8",
            I: "9",
            J: "*",
            K: "+",
            M: "-",
            N: ".",
            O: "/",
            "`": "0",
            "\x90": "NumLock"
        };
        let tc;
        Ce.Node && (tc = Ce.Node.prototype.contains || function(e) {
            return !!(16 & this.compareDocumentPosition(e))
        }
        );
        class nc extends Ql {
            parse(e) {
                throw new Error("parse not implemented")
            }
            static makeCurrent() {
                var e;
                e = new nc,
                Wl || (Wl = e)
            }
            hasProperty(e, t) {
                return t in e
            }
            setProperty(e, t, n) {
                e[t] = n
            }
            getProperty(e, t) {
                return e[t]
            }
            invoke(e, t, n) {
                e[t](...n)
            }
            logError(e) {
                window.console && (console.error ? console.error(e) : console.log(e))
            }
            log(e) {
                window.console && window.console.log && window.console.log(e)
            }
            logGroup(e) {
                window.console && window.console.group && window.console.group(e)
            }
            logGroupEnd() {
                window.console && window.console.groupEnd && window.console.groupEnd()
            }
            get attrToPropMap() {
                return Yl
            }
            contains(e, t) {
                return tc.call(e, t)
            }
            querySelector(e, t) {
                return e.querySelector(t)
            }
            querySelectorAll(e, t) {
                return e.querySelectorAll(t)
            }
            on(e, t, n) {
                e.addEventListener(t, n, !1)
            }
            onAndCancel(e, t, n) {
                return e.addEventListener(t, n, !1),
                ()=>{
                    e.removeEventListener(t, n, !1)
                }
            }
            dispatchEvent(e, t) {
                e.dispatchEvent(t)
            }
            createMouseEvent(e) {
                const t = this.getDefaultDocument().createEvent("MouseEvent");
                return t.initEvent(e, !0, !0),
                t
            }
            createEvent(e) {
                const t = this.getDefaultDocument().createEvent("Event");
                return t.initEvent(e, !0, !0),
                t
            }
            preventDefault(e) {
                e.preventDefault(),
                e.returnValue = !1
            }
            isPrevented(e) {
                return e.defaultPrevented || null != e.returnValue && !e.returnValue
            }
            getInnerHTML(e) {
                return e.innerHTML
            }
            getTemplateContent(e) {
                return "content"in e && this.isTemplateElement(e) ? e.content : null
            }
            getOuterHTML(e) {
                return e.outerHTML
            }
            nodeName(e) {
                return e.nodeName
            }
            nodeValue(e) {
                return e.nodeValue
            }
            type(e) {
                return e.type
            }
            content(e) {
                return this.hasProperty(e, "content") ? e.content : e
            }
            firstChild(e) {
                return e.firstChild
            }
            nextSibling(e) {
                return e.nextSibling
            }
            parentElement(e) {
                return e.parentNode
            }
            childNodes(e) {
                return e.childNodes
            }
            childNodesAsList(e) {
                const t = e.childNodes
                  , n = new Array(t.length);
                for (let r = 0; r < t.length; r++)
                    n[r] = t[r];
                return n
            }
            clearNodes(e) {
                for (; e.firstChild; )
                    e.removeChild(e.firstChild)
            }
            appendChild(e, t) {
                e.appendChild(t)
            }
            removeChild(e, t) {
                e.removeChild(t)
            }
            replaceChild(e, t, n) {
                e.replaceChild(t, n)
            }
            remove(e) {
                return e.parentNode && e.parentNode.removeChild(e),
                e
            }
            insertBefore(e, t, n) {
                e.insertBefore(n, t)
            }
            insertAllBefore(e, t, n) {
                n.forEach(n=>e.insertBefore(n, t))
            }
            insertAfter(e, t, n) {
                e.insertBefore(n, t.nextSibling)
            }
            setInnerHTML(e, t) {
                e.innerHTML = t
            }
            getText(e) {
                return e.textContent
            }
            setText(e, t) {
                e.textContent = t
            }
            getValue(e) {
                return e.value
            }
            setValue(e, t) {
                e.value = t
            }
            getChecked(e) {
                return e.checked
            }
            setChecked(e, t) {
                e.checked = t
            }
            createComment(e) {
                return this.getDefaultDocument().createComment(e)
            }
            createTemplate(e) {
                const t = this.getDefaultDocument().createElement("template");
                return t.innerHTML = e,
                t
            }
            createElement(e, t) {
                return (t = t || this.getDefaultDocument()).createElement(e)
            }
            createElementNS(e, t, n) {
                return (n = n || this.getDefaultDocument()).createElementNS(e, t)
            }
            createTextNode(e, t) {
                return (t = t || this.getDefaultDocument()).createTextNode(e)
            }
            createScriptTag(e, t, n) {
                const r = (n = n || this.getDefaultDocument()).createElement("SCRIPT");
                return r.setAttribute(e, t),
                r
            }
            createStyleElement(e, t) {
                const n = (t = t || this.getDefaultDocument()).createElement("style");
                return this.appendChild(n, this.createTextNode(e, t)),
                n
            }
            createShadowRoot(e) {
                return e.createShadowRoot()
            }
            getShadowRoot(e) {
                return e.shadowRoot
            }
            getHost(e) {
                return e.host
            }
            clone(e) {
                return e.cloneNode(!0)
            }
            getElementsByClassName(e, t) {
                return e.getElementsByClassName(t)
            }
            getElementsByTagName(e, t) {
                return e.getElementsByTagName(t)
            }
            classList(e) {
                return Array.prototype.slice.call(e.classList, 0)
            }
            addClass(e, t) {
                e.classList.add(t)
            }
            removeClass(e, t) {
                e.classList.remove(t)
            }
            hasClass(e, t) {
                return e.classList.contains(t)
            }
            setStyle(e, t, n) {
                e.style[t] = n
            }
            removeStyle(e, t) {
                e.style[t] = ""
            }
            getStyle(e, t) {
                return e.style[t]
            }
            hasStyle(e, t, n) {
                const r = this.getStyle(e, t) || "";
                return n ? r == n : r.length > 0
            }
            tagName(e) {
                return e.tagName
            }
            attributeMap(e) {
                const t = new Map
                  , n = e.attributes;
                for (let r = 0; r < n.length; r++) {
                    const e = n.item(r);
                    t.set(e.name, e.value)
                }
                return t
            }
            hasAttribute(e, t) {
                return e.hasAttribute(t)
            }
            hasAttributeNS(e, t, n) {
                return e.hasAttributeNS(t, n)
            }
            getAttribute(e, t) {
                return e.getAttribute(t)
            }
            getAttributeNS(e, t, n) {
                return e.getAttributeNS(t, n)
            }
            setAttribute(e, t, n) {
                e.setAttribute(t, n)
            }
            setAttributeNS(e, t, n, r) {
                e.setAttributeNS(t, n, r)
            }
            removeAttribute(e, t) {
                e.removeAttribute(t)
            }
            removeAttributeNS(e, t, n) {
                e.removeAttributeNS(t, n)
            }
            templateAwareRoot(e) {
                return this.isTemplateElement(e) ? this.content(e) : e
            }
            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }
            getDefaultDocument() {
                return document
            }
            getBoundingClientRect(e) {
                try {
                    return e.getBoundingClientRect()
                } catch (t) {
                    return {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    }
                }
            }
            getTitle(e) {
                return e.title
            }
            setTitle(e, t) {
                e.title = t || ""
            }
            elementMatches(e, t) {
                return !!this.isElementNode(e) && (e.matches && e.matches(t) || e.msMatchesSelector && e.msMatchesSelector(t) || e.webkitMatchesSelector && e.webkitMatchesSelector(t))
            }
            isTemplateElement(e) {
                return this.isElementNode(e) && "TEMPLATE" === e.nodeName
            }
            isTextNode(e) {
                return e.nodeType === Node.TEXT_NODE
            }
            isCommentNode(e) {
                return e.nodeType === Node.COMMENT_NODE
            }
            isElementNode(e) {
                return e.nodeType === Node.ELEMENT_NODE
            }
            hasShadowRoot(e) {
                return null != e.shadowRoot && e instanceof HTMLElement
            }
            isShadowRoot(e) {
                return e instanceof DocumentFragment
            }
            importIntoDoc(e) {
                return document.importNode(this.templateAwareRoot(e), !0)
            }
            adoptNode(e) {
                return document.adoptNode(e)
            }
            getHref(e) {
                return e.getAttribute("href")
            }
            getEventKey(e) {
                let t = e.key;
                if (null == t) {
                    if (null == (t = e.keyIdentifier))
                        return "Unidentified";
                    t.startsWith("U+") && (t = String.fromCharCode(parseInt(t.substring(2), 16)),
                    e.location === Jl && ec.hasOwnProperty(t) && (t = ec[t]))
                }
                return Xl[t] || t
            }
            getGlobalEventTarget(e, t) {
                return "window" === t ? window : "document" === t ? e : "body" === t ? e.body : null
            }
            getHistory() {
                return window.history
            }
            getLocation() {
                return window.location
            }
            getBaseHref(e) {
                const t = oc || (oc = document.querySelector("base")) ? oc.getAttribute("href") : null;
                return null == t ? null : (n = t,
                rc || (rc = document.createElement("a")),
                rc.setAttribute("href", n),
                "/" === rc.pathname.charAt(0) ? rc.pathname : "/" + rc.pathname);
                var n
            }
            resetBaseElement() {
                oc = null
            }
            getUserAgent() {
                return window.navigator.userAgent
            }
            setData(e, t, n) {
                this.setAttribute(e, "data-" + t, n)
            }
            getData(e, t) {
                return this.getAttribute(e, "data-" + t)
            }
            getComputedStyle(e) {
                return getComputedStyle(e)
            }
            supportsWebAnimation() {
                return "function" == typeof Element.prototype.animate
            }
            performanceNow() {
                return window.performance && window.performance.now ? window.performance.now() : (new Date).getTime()
            }
            supportsCookies() {
                return !0
            }
            getCookie(e) {
                return function(e, t) {
                    t = encodeURIComponent(t);
                    for (const n of e.split(";")) {
                        const e = n.indexOf("=")
                          , [r,o] = -1 == e ? [n, ""] : [n.slice(0, e), n.slice(e + 1)];
                        if (r.trim() === t)
                            return decodeURIComponent(o)
                    }
                    return null
                }(document.cookie, e)
            }
            setCookie(e, t) {
                document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            }
        }
        let rc, oc = null;
        const sc = ml;
        function ic() {
            return !!window.history.pushState
        }
        class ac extends Oa {
            constructor(e) {
                super(),
                this._doc = e,
                this._init()
            }
            _init() {
                this.location = Zl().getLocation(),
                this._history = Zl().getHistory()
            }
            getBaseHrefFromDOM() {
                return Zl().getBaseHref(this._doc)
            }
            onPopState(e) {
                Zl().getGlobalEventTarget(this._doc, "window").addEventListener("popstate", e, !1)
            }
            onHashChange(e) {
                Zl().getGlobalEventTarget(this._doc, "window").addEventListener("hashchange", e, !1)
            }
            get pathname() {
                return this.location.pathname
            }
            get search() {
                return this.location.search
            }
            get hash() {
                return this.location.hash
            }
            set pathname(e) {
                this.location.pathname = e
            }
            pushState(e, t, n) {
                ic() ? this._history.pushState(e, t, n) : this.location.hash = n
            }
            replaceState(e, t, n) {
                ic() ? this._history.replaceState(e, t, n) : this.location.hash = n
            }
            forward() {
                this._history.forward()
            }
            back() {
                this._history.back()
            }
        }
        ac.ctorParameters = (()=>[{
            type: void 0,
            decorators: [{
                type: Ne,
                args: [sc]
            }]
        }]);
        const lc = new fe("TRANSITION_ID")
          , cc = [{
            provide: Kn,
            useFactory: function(e, t, n) {
                return ()=>{
                    n.get(Qn).donePromise.then(()=>{
                        const n = Zl();
                        Array.prototype.slice.apply(n.querySelectorAll(t, "style[ng-transition]")).filter(t=>n.getAttribute(t, "ng-transition") === e).forEach(e=>n.remove(e))
                    }
                    )
                }
            },
            deps: [lc, sc, Je],
            multi: !0
        }];
        class uc {
            static init() {
                var e;
                e = new uc,
                Er = e
            }
            addToWindow(e) {
                Ce.getAngularTestability = ((t,n=!0)=>{
                    const r = e.findTestabilityInTree(t, n);
                    if (null == r)
                        throw new Error("Could not find testability for element.");
                    return r
                }
                ),
                Ce.getAllAngularTestabilities = (()=>e.getAllTestabilities()),
                Ce.getAllAngularRootElements = (()=>e.getAllRootElements()),
                Ce.frameworkStabilizers || (Ce.frameworkStabilizers = []),
                Ce.frameworkStabilizers.push(e=>{
                    const t = Ce.getAllAngularTestabilities();
                    let n = t.length
                      , r = !1;
                    const o = function(t) {
                        r = r || t,
                        0 == --n && e(r)
                    };
                    t.forEach(function(e) {
                        e.whenStable(o)
                    })
                }
                )
            }
            findTestabilityInTree(e, t, n) {
                if (null == t)
                    return null;
                const r = e.getTestability(t);
                return null != r ? r : n ? Zl().isShadowRoot(t) ? this.findTestabilityInTree(e, Zl().getHost(t), !0) : this.findTestabilityInTree(e, Zl().parentElement(t), !0) : null
            }
        }
        function hc(e, t) {
            "undefined" != typeof COMPILED && COMPILED || ((Ce.ng = Ce.ng || {})[e] = t)
        }
        const dc = {
            ApplicationRef: Mr,
            NgZone: pr
        };
        function pc(e) {
            return zr(e)
        }
        const fc = new fe("EventManagerPlugins");
        class gc {
            constructor(e, t) {
                this._zone = t,
                this._eventNameToPlugin = new Map,
                e.forEach(e=>e.manager = this),
                this._plugins = e.slice().reverse()
            }
            addEventListener(e, t, n) {
                return this._findPluginFor(t).addEventListener(e, t, n)
            }
            addGlobalEventListener(e, t, n) {
                return this._findPluginFor(t).addGlobalEventListener(e, t, n)
            }
            getZone() {
                return this._zone
            }
            _findPluginFor(e) {
                const t = this._eventNameToPlugin.get(e);
                if (t)
                    return t;
                const n = this._plugins;
                for (let r = 0; r < n.length; r++) {
                    const t = n[r];
                    if (t.supports(e))
                        return this._eventNameToPlugin.set(e, t),
                        t
                }
                throw new Error(`No event manager plugin found for event ${e}`)
            }
        }
        class mc {
            constructor(e) {
                this._doc = e
            }
            addGlobalEventListener(e, t, n) {
                const r = Zl().getGlobalEventTarget(this._doc, e);
                if (!r)
                    throw new Error(`Unsupported event target ${r} for event ${t}`);
                return this.addEventListener(r, t, n)
            }
        }
        class yc {
            constructor() {
                this._stylesSet = new Set
            }
            addStyles(e) {
                const t = new Set;
                e.forEach(e=>{
                    this._stylesSet.has(e) || (this._stylesSet.add(e),
                    t.add(e))
                }
                ),
                this.onStylesAdded(t)
            }
            onStylesAdded(e) {}
            getAllStyles() {
                return Array.from(this._stylesSet)
            }
        }
        class vc extends yc {
            constructor(e) {
                super(),
                this._doc = e,
                this._hostNodes = new Set,
                this._styleNodes = new Set,
                this._hostNodes.add(e.head)
            }
            _addStylesToHost(e, t) {
                e.forEach(e=>{
                    const n = this._doc.createElement("style");
                    n.textContent = e,
                    this._styleNodes.add(t.appendChild(n))
                }
                )
            }
            addHost(e) {
                this._addStylesToHost(this._stylesSet, e),
                this._hostNodes.add(e)
            }
            removeHost(e) {
                this._hostNodes.delete(e)
            }
            onStylesAdded(e) {
                this._hostNodes.forEach(t=>this._addStylesToHost(e, t))
            }
            ngOnDestroy() {
                this._styleNodes.forEach(e=>Zl().remove(e))
            }
        }
        const bc = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        }
          , _c = /%COMP%/g
          , wc = "_nghost-%COMP%"
          , Cc = "_ngcontent-%COMP%";
        function xc(e, t, n) {
            for (let r = 0; r < t.length; r++) {
                let o = t[r];
                Array.isArray(o) ? xc(e, o, n) : (o = o.replace(_c, e),
                n.push(o))
            }
            return n
        }
        function Ec(e) {
            return t=>{
                !1 === e(t) && (t.preventDefault(),
                t.returnValue = !1)
            }
        }
        class kc {
            constructor(e, t) {
                this.eventManager = e,
                this.sharedStylesHost = t,
                this.rendererByCompId = new Map,
                this.defaultRenderer = new Ac(e)
            }
            createRenderer(e, t) {
                if (!e || !t)
                    return this.defaultRenderer;
                switch (t.encapsulation) {
                case be.Emulated:
                    {
                        let n = this.rendererByCompId.get(t.id);
                        return n || (n = new Nc(this.eventManager,this.sharedStylesHost,t),
                        this.rendererByCompId.set(t.id, n)),
                        n.applyToHost(e),
                        n
                    }
                case be.Native:
                case be.ShadowDom:
                    return new Ic(this.eventManager,this.sharedStylesHost,e,t);
                default:
                    if (!this.rendererByCompId.has(t.id)) {
                        const e = xc(t.id, t.styles, []);
                        this.sharedStylesHost.addStyles(e),
                        this.rendererByCompId.set(t.id, this.defaultRenderer)
                    }
                    return this.defaultRenderer
                }
            }
            begin() {}
            end() {}
        }
        class Ac {
            constructor(e) {
                this.eventManager = e,
                this.data = Object.create(null)
            }
            destroy() {}
            createElement(e, t) {
                return t ? document.createElementNS(bc[t], e) : document.createElement(e)
            }
            createComment(e) {
                return document.createComment(e)
            }
            createText(e) {
                return document.createTextNode(e)
            }
            appendChild(e, t) {
                e.appendChild(t)
            }
            insertBefore(e, t, n) {
                e && e.insertBefore(t, n)
            }
            removeChild(e, t) {
                e && e.removeChild(t)
            }
            selectRootElement(e, t) {
                let n = "string" == typeof e ? document.querySelector(e) : e;
                if (!n)
                    throw new Error(`The selector "${e}" did not match any elements`);
                return t || (n.textContent = ""),
                n
            }
            parentNode(e) {
                return e.parentNode
            }
            nextSibling(e) {
                return e.nextSibling
            }
            setAttribute(e, t, n, r) {
                if (r) {
                    t = `${r}:${t}`;
                    const o = bc[r];
                    o ? e.setAttributeNS(o, t, n) : e.setAttribute(t, n)
                } else
                    e.setAttribute(t, n)
            }
            removeAttribute(e, t, n) {
                if (n) {
                    const r = bc[n];
                    r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${n}:${t}`)
                } else
                    e.removeAttribute(t)
            }
            addClass(e, t) {
                e.classList.add(t)
            }
            removeClass(e, t) {
                e.classList.remove(t)
            }
            setStyle(e, t, n, r) {
                r & Nt.DashCase ? e.style.setProperty(t, n, r & Nt.Important ? "important" : "") : e.style[t] = n
            }
            removeStyle(e, t, n) {
                n & Nt.DashCase ? e.style.removeProperty(t) : e.style[t] = ""
            }
            setProperty(e, t, n) {
                Sc(t, "property"),
                e[t] = n
            }
            setValue(e, t) {
                e.nodeValue = t
            }
            listen(e, t, n) {
                return Sc(t, "listener"),
                "string" == typeof e ? this.eventManager.addGlobalEventListener(e, t, Ec(n)) : this.eventManager.addEventListener(e, t, Ec(n))
            }
        }
        const Tc = "@".charCodeAt(0);
        function Sc(e, t) {
            if (e.charCodeAt(0) === Tc)
                throw new Error(`Found the synthetic ${t} ${e}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`)
        }
        class Nc extends Ac {
            constructor(e, t, n) {
                super(e),
                this.component = n;
                const r = xc(n.id, n.styles, []);
                t.addStyles(r),
                this.contentAttr = Cc.replace(_c, n.id),
                this.hostAttr = wc.replace(_c, n.id)
            }
            applyToHost(e) {
                super.setAttribute(e, this.hostAttr, "")
            }
            createElement(e, t) {
                const n = super.createElement(e, t);
                return super.setAttribute(n, this.contentAttr, ""),
                n
            }
        }
        class Ic extends Ac {
            constructor(e, t, n, r) {
                super(e),
                this.sharedStylesHost = t,
                this.hostEl = n,
                this.component = r,
                this.shadowRoot = r.encapsulation === be.ShadowDom ? n.attachShadow({
                    mode: "open"
                }) : n.createShadowRoot(),
                this.sharedStylesHost.addHost(this.shadowRoot);
                const o = xc(r.id, r.styles, []);
                for (let s = 0; s < o.length; s++) {
                    const e = document.createElement("style");
                    e.textContent = o[s],
                    this.shadowRoot.appendChild(e)
                }
            }
            nodeOrShadowRoot(e) {
                return e === this.hostEl ? this.shadowRoot : e
            }
            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }
            appendChild(e, t) {
                return super.appendChild(this.nodeOrShadowRoot(e), t)
            }
            insertBefore(e, t, n) {
                return super.insertBefore(this.nodeOrShadowRoot(e), t, n)
            }
            removeChild(e, t) {
                return super.removeChild(this.nodeOrShadowRoot(e), t)
            }
            parentNode(e) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))
            }
        }
        const Oc = "undefined" != typeof Zone && Zone.__symbol__ || function(e) {
            return "__zone_symbol__" + e
        }
          , Mc = Oc("addEventListener")
          , Fc = Oc("removeEventListener")
          , Dc = {}
          , Pc = "FALSE"
          , Rc = "ANGULAR"
          , Vc = "addEventListener"
          , Bc = "removeEventListener"
          , jc = "__zone_symbol__propagationStopped"
          , Lc = "__zone_symbol__stopImmediatePropagation";
        let Hc;
        "undefined" != typeof Zone && Zone[Oc("BLACK_LISTED_EVENTS")] && (Hc = {});
        const Uc = function(e) {
            return !!Hc && Hc.hasOwnProperty(e)
        }
          , zc = function(e) {
            const t = Dc[e.type];
            if (!t)
                return;
            const n = this[t];
            if (!n)
                return;
            const r = [e];
            if (1 === n.length) {
                const e = n[0];
                return e.zone !== Zone.current ? e.zone.run(e.handler, this, r) : e.handler.apply(this, r)
            }
            {
                const t = n.slice();
                for (let n = 0; n < t.length && !0 !== e[jc]; n++) {
                    const e = t[n];
                    e.zone !== Zone.current ? e.zone.run(e.handler, this, r) : e.handler.apply(this, r)
                }
            }
        };
        class $c extends mc {
            constructor(e, t, n) {
                super(e),
                this.ngZone = t,
                n && function(e) {
                    return e === vl
                }(n) || this.patchEvent()
            }
            patchEvent() {
                if ("undefined" == typeof Event || !Event || !Event.prototype)
                    return;
                if (Event.prototype[Lc])
                    return;
                const e = Event.prototype[Lc] = Event.prototype.stopImmediatePropagation;
                Event.prototype.stopImmediatePropagation = function() {
                    this && (this[jc] = !0),
                    e && e.apply(this, arguments)
                }
            }
            supports(e) {
                return !0
            }
            addEventListener(e, t, n) {
                let r = n;
                if (!e[Mc] || pr.isInAngularZone() && !Uc(t))
                    e[Vc](t, r, !1);
                else {
                    let n = Dc[t];
                    n || (n = Dc[t] = Oc(Rc + t + Pc));
                    let o = e[n];
                    const s = o && o.length > 0;
                    o || (o = e[n] = []);
                    const i = Uc(t) ? Zone.root : Zone.current;
                    if (0 === o.length)
                        o.push({
                            zone: i,
                            handler: r
                        });
                    else {
                        let e = !1;
                        for (let t = 0; t < o.length; t++)
                            if (o[t].handler === r) {
                                e = !0;
                                break
                            }
                        e || o.push({
                            zone: i,
                            handler: r
                        })
                    }
                    s || e[Mc](t, zc, !1)
                }
                return ()=>this.removeEventListener(e, t, r)
            }
            removeEventListener(e, t, n) {
                let r = e[Fc];
                if (!r)
                    return e[Bc].apply(e, [t, n, !1]);
                let o = Dc[t]
                  , s = o && e[o];
                if (!s)
                    return e[Bc].apply(e, [t, n, !1]);
                let i = !1;
                for (let a = 0; a < s.length; a++)
                    if (s[a].handler === n) {
                        i = !0,
                        s.splice(a, 1);
                        break
                    }
                i ? 0 === s.length && r.apply(e, [t, zc, !1]) : e[Bc].apply(e, [t, n, !1])
            }
        }
        const Gc = {
            pan: !0,
            panstart: !0,
            panmove: !0,
            panend: !0,
            pancancel: !0,
            panleft: !0,
            panright: !0,
            panup: !0,
            pandown: !0,
            pinch: !0,
            pinchstart: !0,
            pinchmove: !0,
            pinchend: !0,
            pinchcancel: !0,
            pinchin: !0,
            pinchout: !0,
            press: !0,
            pressup: !0,
            rotate: !0,
            rotatestart: !0,
            rotatemove: !0,
            rotateend: !0,
            rotatecancel: !0,
            swipe: !0,
            swipeleft: !0,
            swiperight: !0,
            swipeup: !0,
            swipedown: !0,
            tap: !0
        }
          , qc = new fe("HammerGestureConfig")
          , Wc = new fe("HammerLoader");
        class Zc {
            constructor() {
                this.events = [],
                this.overrides = {}
            }
            buildHammer(e) {
                const t = new Hammer(e,this.options);
                t.get("pinch").set({
                    enable: !0
                }),
                t.get("rotate").set({
                    enable: !0
                });
                for (const n in this.overrides)
                    t.get(n).set(this.overrides[n]);
                return t
            }
        }
        class Kc extends mc {
            constructor(e, t, n, r) {
                super(e),
                this._config = t,
                this.console = n,
                this.loader = r
            }
            supports(e) {
                return !(!Gc.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e) || !window.Hammer && !this.loader && (this.console.warn(`The "${e}" event cannot be bound because Hammer.JS is not ` + "loaded and no custom loader has been specified."),
                1))
            }
            addEventListener(e, t, n) {
                const r = this.manager.getZone();
                if (t = t.toLowerCase(),
                !window.Hammer && this.loader) {
                    let r = !1
                      , o = ()=>{
                        r = !0
                    }
                    ;
                    return this.loader().then(()=>{
                        if (!window.Hammer)
                            return this.console.warn("The custom HAMMER_LOADER completed, but Hammer.JS is not present."),
                            void (o = (()=>{}
                            ));
                        r || (o = this.addEventListener(e, t, n))
                    }
                    ).catch(()=>{
                        this.console.warn(`The "${t}" event cannot be bound because the custom ` + "Hammer.JS loader failed."),
                        o = (()=>{}
                        )
                    }
                    ),
                    ()=>{
                        o()
                    }
                }
                return r.runOutsideAngular(()=>{
                    const o = this._config.buildHammer(e)
                      , s = function(e) {
                        r.runGuarded(function() {
                            n(e)
                        })
                    };
                    return o.on(t, s),
                    ()=>{
                        o.off(t, s),
                        "function" == typeof o.destroy && o.destroy()
                    }
                }
                )
            }
            isCustomEvent(e) {
                return this._config.events.indexOf(e) > -1
            }
        }
        const Qc = ["alt", "control", "meta", "shift"]
          , Yc = {
            alt: e=>e.altKey,
            control: e=>e.ctrlKey,
            meta: e=>e.metaKey,
            shift: e=>e.shiftKey
        };
        class Jc extends mc {
            constructor(e) {
                super(e)
            }
            supports(e) {
                return null != Jc.parseEventName(e)
            }
            addEventListener(e, t, n) {
                const r = Jc.parseEventName(t)
                  , o = Jc.eventCallback(r.fullKey, n, this.manager.getZone());
                return this.manager.getZone().runOutsideAngular(()=>Zl().onAndCancel(e, r.domEventName, o))
            }
            static parseEventName(e) {
                const t = e.toLowerCase().split(".")
                  , n = t.shift();
                if (0 === t.length || "keydown" !== n && "keyup" !== n)
                    return null;
                const r = Jc._normalizeKey(t.pop());
                let o = "";
                if (Qc.forEach(e=>{
                    const n = t.indexOf(e);
                    n > -1 && (t.splice(n, 1),
                    o += e + ".")
                }
                ),
                o += r,
                0 != t.length || 0 === r.length)
                    return null;
                const s = {};
                return s.domEventName = n,
                s.fullKey = o,
                s
            }
            static getEventFullKey(e) {
                let t = ""
                  , n = Zl().getEventKey(e);
                return " " === (n = n.toLowerCase()) ? n = "space" : "." === n && (n = "dot"),
                Qc.forEach(r=>{
                    r != n && (0,
                    Yc[r])(e) && (t += r + ".")
                }
                ),
                t += n
            }
            static eventCallback(e, t, n) {
                return r=>{
                    Jc.getEventFullKey(r) === e && n.runGuarded(()=>t(r))
                }
            }
            static _normalizeKey(e) {
                switch (e) {
                case "esc":
                    return "escape";
                default:
                    return e
                }
            }
        }
        class Xc {
        }
        class eu extends Xc {
            constructor(e) {
                super(),
                this._doc = e
            }
            sanitize(e, t) {
                if (null == t)
                    return null;
                switch (e) {
                case an.NONE:
                    return t;
                case an.HTML:
                    return t instanceof nu ? t.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(t, "HTML"),
                    function(e, t) {
                        let n = null;
                        try {
                            tn = tn || new Vt(e);
                            let r = t ? String(t) : "";
                            n = tn.getInertBodyElement(r);
                            let o = 5
                              , s = r;
                            do {
                                if (0 === o)
                                    throw new Error("Failed to sanitize html because the input is unstable");
                                o--,
                                r = s,
                                s = n.innerHTML,
                                n = tn.getInertBodyElement(r)
                            } while (r !== s);
                            const i = new Yt
                              , a = i.sanitizeChildren(nn(n) || n);
                            return Rt() && i.sanitizedSomething && console.warn("WARNING: sanitizing HTML stripped some content (see http://g.co/ng/security#xss)."),
                            a
                        } finally {
                            if (n) {
                                const e = nn(n) || n;
                                for (; e.firstChild; )
                                    e.removeChild(e.firstChild)
                            }
                        }
                    }(this._doc, String(t)));
                case an.STYLE:
                    return t instanceof ru ? t.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(t, "Style"),
                    function(e) {
                        if (!(e = String(e).trim()))
                            return "";
                        const t = e.match(un);
                        return t && Lt(t[1]) === t[1] || e.match(cn) && function(e) {
                            let t = !0
                              , n = !0;
                            for (let r = 0; r < e.length; r++) {
                                const o = e.charAt(r);
                                "'" === o && n ? t = !t : '"' === o && t && (n = !n)
                            }
                            return t && n
                        }(e) ? e : (Rt() && console.warn(`WARNING: sanitizing unsafe style value ${e} (see http://g.co/ng/security#xss).`),
                        "unsafe")
                    }(t));
                case an.SCRIPT:
                    if (t instanceof ou)
                        return t.changingThisBreaksApplicationSecurity;
                    throw this.checkNotSafeValue(t, "Script"),
                    new Error("unsafe value used in a script context");
                case an.URL:
                    return t instanceof iu || t instanceof su ? t.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(t, "URL"),
                    Lt(String(t)));
                case an.RESOURCE_URL:
                    if (t instanceof iu)
                        return t.changingThisBreaksApplicationSecurity;
                    throw this.checkNotSafeValue(t, "ResourceURL"),
                    new Error("unsafe value used in a resource URL context (see http://g.co/ng/security#xss)");
                default:
                    throw new Error(`Unexpected SecurityContext ${e} (see http://g.co/ng/security#xss)`)
                }
            }
            checkNotSafeValue(e, t) {
                if (e instanceof tu)
                    throw new Error(`Required a safe ${t}, got a ${e.getTypeName()} ` + "(see http://g.co/ng/security#xss)")
            }
            bypassSecurityTrustHtml(e) {
                return new nu(e)
            }
            bypassSecurityTrustStyle(e) {
                return new ru(e)
            }
            bypassSecurityTrustScript(e) {
                return new ou(e)
            }
            bypassSecurityTrustUrl(e) {
                return new su(e)
            }
            bypassSecurityTrustResourceUrl(e) {
                return new iu(e)
            }
        }
        class tu {
            constructor(e) {
                this.changingThisBreaksApplicationSecurity = e
            }
            toString() {
                return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` + " (see http://g.co/ng/security#xss)"
            }
        }
        class nu extends tu {
            getTypeName() {
                return "HTML"
            }
        }
        class ru extends tu {
            getTypeName() {
                return "Style"
            }
        }
        class ou extends tu {
            getTypeName() {
                return "Script"
            }
        }
        class su extends tu {
            getTypeName() {
                return "URL"
            }
        }
        class iu extends tu {
            getTypeName() {
                return "ResourceURL"
            }
        }
        const au = Sr(io, "browser", [{
            provide: tr,
            useValue: yl
        }, {
            provide: er,
            useValue: function() {
                nc.makeCurrent(),
                uc.init()
            },
            multi: !0
        }, {
            provide: Oa,
            useClass: ac,
            deps: [sc]
        }, {
            provide: sc,
            useFactory: function() {
                return document
            },
            deps: []
        }]);
        function lu() {
            return new kn
        }
        class cu {
            constructor(e) {
                if (e)
                    throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
            }
            static withServerTransition(e) {
                return {
                    ngModule: cu,
                    providers: [{
                        provide: Yn,
                        useValue: e.appId
                    }, {
                        provide: lc,
                        useExisting: Yn
                    }, cc]
                }
            }
        }
        class uu {
            constructor(e) {
                this._doc = e,
                this._dom = Zl()
            }
            addTag(e, t=!1) {
                return e ? this._getOrCreateElement(e, t) : null
            }
            addTags(e, t=!1) {
                return e ? e.reduce((e,n)=>(n && e.push(this._getOrCreateElement(n, t)),
                e), []) : []
            }
            getTag(e) {
                return e && this._dom.querySelector(this._doc, `meta[${e}]`) || null
            }
            getTags(e) {
                if (!e)
                    return [];
                const t = this._dom.querySelectorAll(this._doc, `meta[${e}]`);
                return t ? [].slice.call(t) : []
            }
            updateTag(e, t) {
                if (!e)
                    return null;
                t = t || this._parseSelector(e);
                const n = this.getTag(t);
                return n ? this._setMetaElementAttributes(e, n) : this._getOrCreateElement(e, !0)
            }
            removeTag(e) {
                this.removeTagElement(this.getTag(e))
            }
            removeTagElement(e) {
                e && this._dom.remove(e)
            }
            _getOrCreateElement(e, t=!1) {
                if (!t) {
                    const t = this._parseSelector(e)
                      , n = this.getTag(t);
                    if (n && this._containsAttributes(e, n))
                        return n
                }
                const n = this._dom.createElement("meta");
                this._setMetaElementAttributes(e, n);
                const r = this._dom.getElementsByTagName(this._doc, "head")[0];
                return this._dom.appendChild(r, n),
                n
            }
            _setMetaElementAttributes(e, t) {
                return Object.keys(e).forEach(n=>this._dom.setAttribute(t, n, e[n])),
                t
            }
            _parseSelector(e) {
                const t = e.name ? "name" : "property";
                return `${t}="${e[t]}"`
            }
            _containsAttributes(e, t) {
                return Object.keys(e).every(n=>this._dom.getAttribute(t, n) === e[n])
            }
        }
        uu.ngInjectableDef = de({
            factory: function() {
                return new uu(Ve(sc))
            },
            token: uu,
            providedIn: "root"
        });
        class hu {
            constructor(e) {
                this._doc = e
            }
            getTitle() {
                return Zl().getTitle(this._doc)
            }
            setTitle(e) {
                Zl().setTitle(this._doc, e)
            }
        }
        hu.ngInjectableDef = de({
            factory: function() {
                return new hu(Ve(sc))
            },
            token: hu,
            providedIn: "root"
        }),
        "undefined" != typeof window && window;
        class du extends z {
            constructor(e, t) {
                super(e),
                this.sources = t,
                this.completed = 0,
                this.haveValues = 0;
                const n = t.length;
                this.values = new Array(n);
                for (let r = 0; r < n; r++) {
                    const e = U(this, t[r], null, r);
                    e && this.add(e)
                }
            }
            notifyNext(e, t, n, r, o) {
                this.values[n] = t,
                o._hasValue || (o._hasValue = !0,
                this.haveValues++)
            }
            notifyComplete(e) {
                const {destination: t, haveValues: n, values: r} = this
                  , o = r.length;
                e._hasValue ? (this.completed++,
                this.completed === o && (n === o && t.next(r),
                t.complete())) : t.complete()
            }
        }
        class pu {
            get value() {
                return this.control ? this.control.value : null
            }
            get valid() {
                return this.control ? this.control.valid : null
            }
            get invalid() {
                return this.control ? this.control.invalid : null
            }
            get pending() {
                return this.control ? this.control.pending : null
            }
            get disabled() {
                return this.control ? this.control.disabled : null
            }
            get enabled() {
                return this.control ? this.control.enabled : null
            }
            get errors() {
                return this.control ? this.control.errors : null
            }
            get pristine() {
                return this.control ? this.control.pristine : null
            }
            get dirty() {
                return this.control ? this.control.dirty : null
            }
            get touched() {
                return this.control ? this.control.touched : null
            }
            get status() {
                return this.control ? this.control.status : null
            }
            get untouched() {
                return this.control ? this.control.untouched : null
            }
            get statusChanges() {
                return this.control ? this.control.statusChanges : null
            }
            get valueChanges() {
                return this.control ? this.control.valueChanges : null
            }
            get path() {
                return null
            }
            reset(e) {
                this.control && this.control.reset(e)
            }
            hasError(e, t) {
                return !!this.control && this.control.hasError(e, t)
            }
            getError(e, t) {
                return this.control ? this.control.getError(e, t) : null
            }
        }
        class fu extends pu {
            get formDirective() {
                return null
            }
            get path() {
                return null
            }
        }
        function gu(e) {
            return null == e || 0 === e.length
        }
        const mu = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
        class yu {
            static min(e) {
                return t=>{
                    if (gu(t.value) || gu(e))
                        return null;
                    const n = parseFloat(t.value);
                    return !isNaN(n) && n < e ? {
                        min: {
                            min: e,
                            actual: t.value
                        }
                    } : null
                }
            }
            static max(e) {
                return t=>{
                    if (gu(t.value) || gu(e))
                        return null;
                    const n = parseFloat(t.value);
                    return !isNaN(n) && n > e ? {
                        max: {
                            max: e,
                            actual: t.value
                        }
                    } : null
                }
            }
            static required(e) {
                return gu(e.value) ? {
                    required: !0
                } : null
            }
            static requiredTrue(e) {
                return !0 === e.value ? null : {
                    required: !0
                }
            }
            static email(e) {
                return gu(e.value) ? null : mu.test(e.value) ? null : {
                    email: !0
                }
            }
            static minLength(e) {
                return t=>{
                    if (gu(t.value))
                        return null;
                    const n = t.value ? t.value.length : 0;
                    return n < e ? {
                        minlength: {
                            requiredLength: e,
                            actualLength: n
                        }
                    } : null
                }
            }
            static maxLength(e) {
                return t=>{
                    const n = t.value ? t.value.length : 0;
                    return n > e ? {
                        maxlength: {
                            requiredLength: e,
                            actualLength: n
                        }
                    } : null
                }
            }
            static pattern(e) {
                if (!e)
                    return yu.nullValidator;
                let t, n;
                return "string" == typeof e ? (n = "",
                "^" !== e.charAt(0) && (n += "^"),
                n += e,
                "$" !== e.charAt(e.length - 1) && (n += "$"),
                t = new RegExp(n)) : (n = e.toString(),
                t = e),
                e=>{
                    if (gu(e.value))
                        return null;
                    const r = e.value;
                    return t.test(r) ? null : {
                        pattern: {
                            requiredPattern: n,
                            actualValue: r
                        }
                    }
                }
            }
            static nullValidator(e) {
                return null
            }
            static compose(e) {
                if (!e)
                    return null;
                const t = e.filter(vu);
                return 0 == t.length ? null : function(e) {
                    return _u(function(e, n) {
                        return t.map(t=>t(e))
                    }(e))
                }
            }
            static composeAsync(e) {
                if (!e)
                    return null;
                const t = e.filter(vu);
                return 0 == t.length ? null : function(e) {
                    return function e(...t) {
                        let n;
                        return "function" == typeof t[t.length - 1] && (n = t.pop()),
                        1 === t.length && l(t[0]) && (t = t[0]),
                        0 === t.length ? Ml : n ? e(t).pipe($(e=>n(...e))) : new x(e=>new du(e,t))
                    }(function(e, n) {
                        return t.map(t=>t(e))
                    }(e).map(bu)).pipe($(_u))
                }
            }
        }
        function vu(e) {
            return null != e
        }
        function bu(e) {
            const t = Wn(e) ? Z(e) : e;
            if (!Zn(t))
                throw new Error("Expected validator to return Promise or Observable.");
            return t
        }
        function _u(e) {
            const t = e.reduce((e,t)=>null != t ? Object.assign({}, e, t) : e, {});
            return 0 === Object.keys(t).length ? null : t
        }
        class wu {
            constructor(e, t, n) {
                this._renderer = e,
                this._elementRef = t,
                this._compositionMode = n,
                this.onChange = (e=>{}
                ),
                this.onTouched = (()=>{}
                ),
                this._composing = !1,
                null == this._compositionMode && (this._compositionMode = !function() {
                    const e = Zl() ? Zl().getUserAgent() : "";
                    return /android (\d+)/.test(e.toLowerCase())
                }())
            }
            writeValue(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "value", null == e ? "" : e)
            }
            registerOnChange(e) {
                this.onChange = e
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
            _handleInput(e) {
                (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(e)
            }
            _compositionStart() {
                this._composing = !0
            }
            _compositionEnd(e) {
                this._composing = !1,
                this._compositionMode && this.onChange(e)
            }
        }
        function Cu(e) {
            return e.validate ? t=>e.validate(t) : e
        }
        function xu(e) {
            return e.validate ? t=>e.validate(t) : e
        }
        function Eu() {
            throw new Error("unimplemented")
        }
        class ku extends pu {
            constructor() {
                super(...arguments),
                this._parent = null,
                this.name = null,
                this.valueAccessor = null,
                this._rawValidators = [],
                this._rawAsyncValidators = []
            }
            get validator() {
                return Eu()
            }
            get asyncValidator() {
                return Eu()
            }
        }
        class Au {
            constructor() {
                this._accessors = []
            }
            add(e, t) {
                this._accessors.push([e, t])
            }
            remove(e) {
                for (let t = this._accessors.length - 1; t >= 0; --t)
                    if (this._accessors[t][1] === e)
                        return void this._accessors.splice(t, 1)
            }
            select(e) {
                this._accessors.forEach(t=>{
                    this._isSameGroup(t, e) && t[1] !== e && t[1].fireUncheck(e.value)
                }
                )
            }
            _isSameGroup(e, t) {
                return !!e[0].control && e[0]._parent === t._control._parent && e[1].name === t.name
            }
        }
        const Tu = {
            formControlName: '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });',
            formGroupName: '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
            formArrayName: '\n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });',
            ngModelGroup: '\n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>',
            ngModelWithFormGroup: '\n    <div [formGroup]="myGroup">\n       <input formControlName="firstName">\n       <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">\n    </div>\n  '
        };
        class Su {
            static controlParentException() {
                throw new Error(`formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      ${Tu.formControlName}`)
            }
            static ngModelGroupException() {
                throw new Error(`formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        ${Tu.formGroupName}\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        ${Tu.ngModelGroup}`)
            }
            static missingFormException() {
                throw new Error(`formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       ${Tu.formControlName}`)
            }
            static groupParentException() {
                throw new Error(`formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      ${Tu.formGroupName}`)
            }
            static arrayParentException() {
                throw new Error(`formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        ${Tu.formArrayName}`)
            }
            static disabledAttrWarning() {
                console.warn("\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    ")
            }
            static ngModelWarning(e) {
                console.warn(`\n    It looks like you're using ngModel on the same form field as ${e}. \n    Support for using the ngModel input property and ngModelChange event with \n    reactive form directives has been deprecated in Angular v6 and will be removed \n    in Angular v7.\n    \n    For more information on this, see our API docs here:\n    https://angular.io/api/forms/${"formControl" === e ? "FormControlDirective" : "FormControlName"}#use-with-ngmodel\n    `)
            }
        }
        function Nu(e, t) {
            return [...t.path, e]
        }
        function Iu(e, t) {
            e || Du(t, "Cannot find control with"),
            t.valueAccessor || Du(t, "No value accessor for form control with"),
            e.validator = yu.compose([e.validator, t.validator]),
            e.asyncValidator = yu.composeAsync([e.asyncValidator, t.asyncValidator]),
            t.valueAccessor.writeValue(e.value),
            function(e, t) {
                t.valueAccessor.registerOnChange(n=>{
                    e._pendingValue = n,
                    e._pendingChange = !0,
                    e._pendingDirty = !0,
                    "change" === e.updateOn && Ou(e, t)
                }
                )
            }(e, t),
            function(e, t) {
                e.registerOnChange((e,n)=>{
                    t.valueAccessor.writeValue(e),
                    n && t.viewToModelUpdate(e)
                }
                )
            }(e, t),
            function(e, t) {
                t.valueAccessor.registerOnTouched(()=>{
                    e._pendingTouched = !0,
                    "blur" === e.updateOn && e._pendingChange && Ou(e, t),
                    "submit" !== e.updateOn && e.markAsTouched()
                }
                )
            }(e, t),
            t.valueAccessor.setDisabledState && e.registerOnDisabledChange(e=>{
                t.valueAccessor.setDisabledState(e)
            }
            ),
            t._rawValidators.forEach(t=>{
                t.registerOnValidatorChange && t.registerOnValidatorChange(()=>e.updateValueAndValidity())
            }
            ),
            t._rawAsyncValidators.forEach(t=>{
                t.registerOnValidatorChange && t.registerOnValidatorChange(()=>e.updateValueAndValidity())
            }
            )
        }
        function Ou(e, t) {
            e._pendingDirty && e.markAsDirty(),
            e.setValue(e._pendingValue, {
                emitModelToViewChange: !1
            }),
            t.viewToModelUpdate(e._pendingValue),
            e._pendingChange = !1
        }
        function Mu(e, t) {
            null == e && Du(t, "Cannot find control with"),
            e.validator = yu.compose([e.validator, t.validator]),
            e.asyncValidator = yu.composeAsync([e.asyncValidator, t.asyncValidator])
        }
        function Fu(e) {
            return Du(e, "There is no FormControl instance attached to form control element with")
        }
        function Du(e, t) {
            let n;
            throw n = e.path.length > 1 ? `path: '${e.path.join(" -> ")}'` : e.path[0] ? `name: '${e.path}'` : "unspecified name attribute",
            new Error(`${t} ${n}`)
        }
        function Pu(e) {
            return null != e ? yu.compose(e.map(Cu)) : null
        }
        function Ru(e) {
            return null != e ? yu.composeAsync(e.map(xu)) : null
        }
        function Vu(e, t) {
            if (!e.hasOwnProperty("model"))
                return !1;
            const n = e.model;
            return !!n.isFirstChange() || !Te(t, n.currentValue)
        }
        const Bu = [class {
            constructor(e, t) {
                this._renderer = e,
                this._elementRef = t,
                this.onChange = (e=>{}
                ),
                this.onTouched = (()=>{}
                )
            }
            writeValue(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "checked", e)
            }
            registerOnChange(e) {
                this.onChange = e
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
        }
        , class {
            constructor(e, t) {
                this._renderer = e,
                this._elementRef = t,
                this.onChange = (e=>{}
                ),
                this.onTouched = (()=>{}
                )
            }
            writeValue(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "value", parseFloat(e))
            }
            registerOnChange(e) {
                this.onChange = (t=>{
                    e("" == t ? null : parseFloat(t))
                }
                )
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
        }
        , class {
            constructor(e, t) {
                this._renderer = e,
                this._elementRef = t,
                this.onChange = (e=>{}
                ),
                this.onTouched = (()=>{}
                )
            }
            writeValue(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "value", null == e ? "" : e)
            }
            registerOnChange(e) {
                this.onChange = (t=>{
                    e("" == t ? null : parseFloat(t))
                }
                )
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
        }
        , class {
            constructor(e, t) {
                this._renderer = e,
                this._elementRef = t,
                this._optionMap = new Map,
                this._idCounter = 0,
                this.onChange = (e=>{}
                ),
                this.onTouched = (()=>{}
                ),
                this._compareWith = Te
            }
            set compareWith(e) {
                if ("function" != typeof e)
                    throw new Error(`compareWith must be a function, but received ${JSON.stringify(e)}`);
                this._compareWith = e
            }
            writeValue(e) {
                this.value = e;
                const t = this._getOptionId(e);
                null == t && this._renderer.setProperty(this._elementRef.nativeElement, "selectedIndex", -1);
                const n = function(e, t) {
                    return null == e ? `${t}` : (t && "object" == typeof t && (t = "Object"),
                    `${e}: ${t}`.slice(0, 50))
                }(t, e);
                this._renderer.setProperty(this._elementRef.nativeElement, "value", n)
            }
            registerOnChange(e) {
                this.onChange = (t=>{
                    this.value = this._getOptionValue(t),
                    e(this.value)
                }
                )
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
            _registerOption() {
                return (this._idCounter++).toString()
            }
            _getOptionId(e) {
                for (const t of Array.from(this._optionMap.keys()))
                    if (this._compareWith(this._optionMap.get(t), e))
                        return t;
                return null
            }
            _getOptionValue(e) {
                const t = function(e) {
                    return e.split(":")[0]
                }(e);
                return this._optionMap.has(t) ? this._optionMap.get(t) : e
            }
        }
        , class {
            constructor(e, t) {
                this._renderer = e,
                this._elementRef = t,
                this._optionMap = new Map,
                this._idCounter = 0,
                this.onChange = (e=>{}
                ),
                this.onTouched = (()=>{}
                ),
                this._compareWith = Te
            }
            set compareWith(e) {
                if ("function" != typeof e)
                    throw new Error(`compareWith must be a function, but received ${JSON.stringify(e)}`);
                this._compareWith = e
            }
            writeValue(e) {
                let t;
                if (this.value = e,
                Array.isArray(e)) {
                    const n = e.map(e=>this._getOptionId(e));
                    t = ((e,t)=>{
                        e._setSelected(n.indexOf(t.toString()) > -1)
                    }
                    )
                } else
                    t = ((e,t)=>{
                        e._setSelected(!1)
                    }
                    );
                this._optionMap.forEach(t)
            }
            registerOnChange(e) {
                this.onChange = (t=>{
                    const n = [];
                    if (t.hasOwnProperty("selectedOptions")) {
                        const e = t.selectedOptions;
                        for (let t = 0; t < e.length; t++) {
                            const r = e.item(t)
                              , o = this._getOptionValue(r.value);
                            n.push(o)
                        }
                    } else {
                        const e = t.options;
                        for (let t = 0; t < e.length; t++) {
                            const r = e.item(t);
                            if (r.selected) {
                                const e = this._getOptionValue(r.value);
                                n.push(e)
                            }
                        }
                    }
                    this.value = n,
                    e(n)
                }
                )
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
            _registerOption(e) {
                const t = (this._idCounter++).toString();
                return this._optionMap.set(t, e),
                t
            }
            _getOptionId(e) {
                for (const t of Array.from(this._optionMap.keys()))
                    if (this._compareWith(this._optionMap.get(t)._value, e))
                        return t;
                return null
            }
            _getOptionValue(e) {
                const t = function(e) {
                    return e.split(":")[0]
                }(e);
                return this._optionMap.has(t) ? this._optionMap.get(t)._value : e
            }
        }
        , class {
            constructor(e, t, n, r) {
                this._renderer = e,
                this._elementRef = t,
                this._registry = n,
                this._injector = r,
                this.onChange = (()=>{}
                ),
                this.onTouched = (()=>{}
                )
            }
            ngOnInit() {
                this._control = this._injector.get(ku),
                this._checkName(),
                this._registry.add(this._control, this)
            }
            ngOnDestroy() {
                this._registry.remove(this)
            }
            writeValue(e) {
                this._state = e === this.value,
                this._renderer.setProperty(this._elementRef.nativeElement, "checked", this._state)
            }
            registerOnChange(e) {
                this._fn = e,
                this.onChange = (()=>{
                    e(this.value),
                    this._registry.select(this)
                }
                )
            }
            fireUncheck(e) {
                this.writeValue(e)
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
            _checkName() {
                this.name && this.formControlName && this.name !== this.formControlName && this._throwNameError(),
                !this.name && this.formControlName && (this.name = this.formControlName)
            }
            _throwNameError() {
                throw new Error('\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    ')
            }
        }
        ];
        function ju(e, t) {
            if (!t)
                return null;
            Array.isArray(t) || Du(e, "Value accessor was not provided as an array for form control with");
            let n = void 0
              , r = void 0
              , o = void 0;
            return t.forEach(t=>{
                t.constructor === wu ? n = t : function(e) {
                    return Bu.some(t=>e.constructor === t)
                }(t) ? (r && Du(e, "More than one built-in value accessor matches form control with"),
                r = t) : (o && Du(e, "More than one custom value accessor matches form control with"),
                o = t)
            }
            ),
            o || r || n || (Du(e, "No valid value accessor for form control with"),
            null)
        }
        function Lu(e, t, n, r) {
            Rt() && "never" !== r && ((null !== r && "once" !== r || t._ngModelWarningSentOnce) && ("always" !== r || n._ngModelWarningSent) || (Su.ngModelWarning(e),
            t._ngModelWarningSentOnce = !0,
            n._ngModelWarningSent = !0))
        }
        class Hu extends fu {
            ngOnInit() {
                this._checkParentType(),
                this.formDirective.addFormGroup(this)
            }
            ngOnDestroy() {
                this.formDirective && this.formDirective.removeFormGroup(this)
            }
            get control() {
                return this.formDirective.getFormGroup(this)
            }
            get path() {
                return Nu(this.name, this._parent)
            }
            get formDirective() {
                return this._parent ? this._parent.formDirective : null
            }
            get validator() {
                return Pu(this._validators)
            }
            get asyncValidator() {
                return Ru(this._asyncValidators)
            }
            _checkParentType() {}
        }
        class Uu {
            static modelParentException() {
                throw new Error(`\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive "formControlName" instead.  Example:\n\n      ${Tu.formControlName}\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      ${Tu.ngModelWithFormGroup}`)
            }
            static formGroupNameException() {
                throw new Error(`\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ${Tu.formGroupName}\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ${Tu.ngModelGroup}`)
            }
            static missingNameException() {
                throw new Error('If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">')
            }
            static modelGroupParentException() {
                throw new Error(`\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ${Tu.formGroupName}\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ${Tu.ngModelGroup}`)
            }
            static ngFormWarning() {
                console.warn("\n    It looks like you're using 'ngForm'.\n\n    Support for using the 'ngForm' element selector has been deprecated in Angular v6 and will be removed\n    in Angular v9.\n\n    Use 'ng-form' instead.\n\n    Before:\n    <ngForm #myForm=\"ngForm\">\n\n    After:\n    <ng-form #myForm=\"ngForm\">\n    ")
            }
        }
        const zu = new fe("NgFormSelectorWarning");
        class $u {
            constructor(e) {
                (e && "once" !== e || $u._ngFormWarning) && "always" !== e || (Uu.ngFormWarning(),
                $u._ngFormWarning = !0)
            }
        }
        $u._ngFormWarning = !1;
        class Gu extends ku {
            constructor(e, t, n, r) {
                super(),
                this._ngModelWarningConfig = r,
                this.update = new rn,
                this._ngModelWarningSent = !1,
                this._rawValidators = e || [],
                this._rawAsyncValidators = t || [],
                this.valueAccessor = ju(this, n)
            }
            set isDisabled(e) {
                Su.disabledAttrWarning()
            }
            ngOnChanges(e) {
                this._isControlChanged(e) && (Iu(this.form, this),
                this.control.disabled && this.valueAccessor.setDisabledState && this.valueAccessor.setDisabledState(!0),
                this.form.updateValueAndValidity({
                    emitEvent: !1
                })),
                Vu(e, this.viewModel) && (Lu("formControl", Gu, this, this._ngModelWarningConfig),
                this.form.setValue(this.model),
                this.viewModel = this.model)
            }
            get path() {
                return []
            }
            get validator() {
                return Pu(this._rawValidators)
            }
            get asyncValidator() {
                return Ru(this._rawAsyncValidators)
            }
            get control() {
                return this.form
            }
            viewToModelUpdate(e) {
                this.viewModel = e,
                this.update.emit(e)
            }
            _isControlChanged(e) {
                return e.hasOwnProperty("form")
            }
        }
        Gu._ngModelWarningSentOnce = !1;
        class qu extends fu {
            constructor(e, t) {
                super(),
                this._validators = e,
                this._asyncValidators = t,
                this.submitted = !1,
                this.directives = [],
                this.form = null,
                this.ngSubmit = new rn
            }
            ngOnChanges(e) {
                this._checkFormPresent(),
                e.hasOwnProperty("form") && (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations())
            }
            get formDirective() {
                return this
            }
            get control() {
                return this.form
            }
            get path() {
                return []
            }
            addControl(e) {
                const t = this.form.get(e.path);
                return Iu(t, e),
                t.updateValueAndValidity({
                    emitEvent: !1
                }),
                this.directives.push(e),
                t
            }
            getControl(e) {
                return this.form.get(e.path)
            }
            removeControl(e) {
                !function(t, n) {
                    const r = t.indexOf(e);
                    r > -1 && t.splice(r, 1)
                }(this.directives)
            }
            addFormGroup(e) {
                const t = this.form.get(e.path);
                Mu(t, e),
                t.updateValueAndValidity({
                    emitEvent: !1
                })
            }
            removeFormGroup(e) {}
            getFormGroup(e) {
                return this.form.get(e.path)
            }
            addFormArray(e) {
                const t = this.form.get(e.path);
                Mu(t, e),
                t.updateValueAndValidity({
                    emitEvent: !1
                })
            }
            removeFormArray(e) {}
            getFormArray(e) {
                return this.form.get(e.path)
            }
            updateModel(e, t) {
                this.form.get(e.path).setValue(t)
            }
            onSubmit(e) {
                return this.submitted = !0,
                t = this.directives,
                this.form._syncPendingControls(),
                t.forEach(e=>{
                    const t = e.control;
                    "submit" === t.updateOn && t._pendingChange && (e.viewToModelUpdate(t._pendingValue),
                    t._pendingChange = !1)
                }
                ),
                this.ngSubmit.emit(e),
                !1;
                var t
            }
            onReset() {
                this.resetForm()
            }
            resetForm(e) {
                this.form.reset(e),
                this.submitted = !1
            }
            _updateDomValue() {
                this.directives.forEach(e=>{
                    const t = this.form.get(e.path);
                    e.control !== t && (function(e, t) {
                        t.valueAccessor.registerOnChange(()=>Fu(t)),
                        t.valueAccessor.registerOnTouched(()=>Fu(t)),
                        t._rawValidators.forEach(e=>{
                            e.registerOnValidatorChange && e.registerOnValidatorChange(null)
                        }
                        ),
                        t._rawAsyncValidators.forEach(e=>{
                            e.registerOnValidatorChange && e.registerOnValidatorChange(null)
                        }
                        ),
                        e && e._clearChangeFns()
                    }(e.control, e),
                    t && Iu(t, e),
                    e.control = t)
                }
                ),
                this.form._updateTreeValidity({
                    emitEvent: !1
                })
            }
            _updateRegistrations() {
                this.form._registerOnCollectionChange(()=>this._updateDomValue()),
                this._oldForm && this._oldForm._registerOnCollectionChange(()=>{}
                ),
                this._oldForm = this.form
            }
            _updateValidators() {
                const e = Pu(this._validators);
                this.form.validator = yu.compose([this.form.validator, e]);
                const t = Ru(this._asyncValidators);
                this.form.asyncValidator = yu.composeAsync([this.form.asyncValidator, t])
            }
            _checkFormPresent() {
                this.form || Su.missingFormException()
            }
        }
        class Wu extends Hu {
            constructor(e, t, n) {
                super(),
                this._parent = e,
                this._validators = t,
                this._asyncValidators = n
            }
            _checkParentType() {
                Ku(this._parent) && Su.groupParentException()
            }
        }
        class Zu extends fu {
            constructor(e, t, n) {
                super(),
                this._parent = e,
                this._validators = t,
                this._asyncValidators = n
            }
            ngOnInit() {
                this._checkParentType(),
                this.formDirective.addFormArray(this)
            }
            ngOnDestroy() {
                this.formDirective && this.formDirective.removeFormArray(this)
            }
            get control() {
                return this.formDirective.getFormArray(this)
            }
            get formDirective() {
                return this._parent ? this._parent.formDirective : null
            }
            get path() {
                return Nu(this.name, this._parent)
            }
            get validator() {
                return Pu(this._validators)
            }
            get asyncValidator() {
                return Ru(this._asyncValidators)
            }
            _checkParentType() {
                Ku(this._parent) && Su.arrayParentException()
            }
        }
        function Ku(e) {
            return !(e instanceof Wu || e instanceof qu || e instanceof Zu)
        }
        class Qu extends ku {
            constructor(e, t, n, r, o) {
                super(),
                this._ngModelWarningConfig = o,
                this._added = !1,
                this.update = new rn,
                this._ngModelWarningSent = !1,
                this._parent = e,
                this._rawValidators = t || [],
                this._rawAsyncValidators = n || [],
                this.valueAccessor = ju(this, r)
            }
            set isDisabled(e) {
                Su.disabledAttrWarning()
            }
            ngOnChanges(e) {
                this._added || this._setUpControl(),
                Vu(e, this.viewModel) && (Lu("formControlName", Qu, this, this._ngModelWarningConfig),
                this.viewModel = this.model,
                this.formDirective.updateModel(this, this.model))
            }
            ngOnDestroy() {
                this.formDirective && this.formDirective.removeControl(this)
            }
            viewToModelUpdate(e) {
                this.viewModel = e,
                this.update.emit(e)
            }
            get path() {
                return Nu(this.name, this._parent)
            }
            get formDirective() {
                return this._parent ? this._parent.formDirective : null
            }
            get validator() {
                return Pu(this._rawValidators)
            }
            get asyncValidator() {
                return Ru(this._rawAsyncValidators)
            }
            _checkParentType() {
                !(this._parent instanceof Wu) && this._parent instanceof Hu ? Su.ngModelGroupException() : this._parent instanceof Wu || this._parent instanceof qu || this._parent instanceof Zu || Su.controlParentException()
            }
            _setUpControl() {
                this._checkParentType(),
                this.control = this.formDirective.addControl(this),
                this.control.disabled && this.valueAccessor.setDisabledState && this.valueAccessor.setDisabledState(!0),
                this._added = !0
            }
        }
        Qu._ngModelWarningSentOnce = !1;
        class Yu {
        }
        class Ju {
            static withConfig(e) {
                return {
                    ngModule: Ju,
                    providers: [{
                        provide: zu,
                        useValue: e.warnOnDeprecatedNgFormSelector
                    }]
                }
            }
        }
        function Xu(e) {
            return new x(t=>{
                let n;
                try {
                    n = e()
                } catch (r) {
                    return void t.error(r)
                }
                return (n ? Z(n) : Fl()).subscribe(t)
            }
            )
        }
        function eh(e, t, n, o) {
            return r(n) && (o = n,
            n = void 0),
            o ? eh(e, t, n).pipe($(e=>l(e) ? o(...e) : o(e))) : new x(r=>{
                !function e(t, n, r, o, s) {
                    let i;
                    if (function(e) {
                        return e && "function" == typeof e.addEventListener && "function" == typeof e.removeEventListener
                    }(t)) {
                        const e = t;
                        t.addEventListener(n, r, s),
                        i = (()=>e.removeEventListener(n, r, s))
                    } else if (function(e) {
                        return e && "function" == typeof e.on && "function" == typeof e.off
                    }(t)) {
                        const e = t;
                        t.on(n, r),
                        i = (()=>e.off(n, r))
                    } else if (function(e) {
                        return e && "function" == typeof e.addListener && "function" == typeof e.removeListener
                    }(t)) {
                        const e = t;
                        t.addListener(n, r),
                        i = (()=>e.removeListener(n, r))
                    } else {
                        if (!t || !t.length)
                            throw new TypeError("Invalid event target");
                        for (let i = 0, a = t.length; i < a; i++)
                            e(t[i], n, r, o, s)
                    }
                    o.add(i)
                }(e, t, function(e) {
                    r.next(arguments.length > 1 ? Array.prototype.slice.call(arguments) : e)
                }, r, n)
            }
            )
        }
        const th = new x(C);
        function nh(e, t) {
            return function(n) {
                return n.lift(new rh(e,t))
            }
        }
        class rh {
            constructor(e, t) {
                this.predicate = e,
                this.thisArg = t
            }
            call(e, t) {
                return t.subscribe(new oh(e,this.predicate,this.thisArg))
            }
        }
        class oh extends b {
            constructor(e, t, n) {
                super(e),
                this.predicate = t,
                this.thisArg = n,
                this.count = 0
            }
            _next(e) {
                let t;
                try {
                    t = this.predicate.call(this.thisArg, e, this.count++)
                } catch (n) {
                    return void this.destination.error(n)
                }
                t && this.destination.next(e)
            }
        }
        function sh(e, t) {
            return "function" == typeof t ? n=>n.pipe(sh((n,r)=>Z(e(n, r)).pipe($((e,o)=>t(n, e, r, o))))) : t=>t.lift(new ih(e))
        }
        class ih {
            constructor(e) {
                this.project = e
            }
            call(e, t) {
                return t.subscribe(new ah(e,this.project))
            }
        }
        class ah extends z {
            constructor(e, t) {
                super(e),
                this.project = t,
                this.index = 0
            }
            _next(e) {
                let t;
                const n = this.index++;
                try {
                    t = this.project(e, n)
                } catch (r) {
                    return void this.destination.error(r)
                }
                this._innerSub(t, e, n)
            }
            _innerSub(e, t, n) {
                const r = this.innerSubscription;
                r && r.unsubscribe();
                const o = new M(this,void 0,void 0);
                this.destination.add(o),
                this.innerSubscription = U(this, e, t, n, o)
            }
            _complete() {
                const {innerSubscription: e} = this;
                e && !e.closed || super._complete(),
                this.unsubscribe()
            }
            _unsubscribe() {
                this.innerSubscription = null
            }
            notifyComplete(e) {
                this.destination.remove(e),
                this.innerSubscription = null,
                this.isStopped && super._complete()
            }
            notifyNext(e, t, n, r, o) {
                this.destination.next(t)
            }
        }
        function lh() {
            return Error.call(this),
            this.message = "argument out of range",
            this.name = "ArgumentOutOfRangeError",
            this
        }
        lh.prototype = Object.create(Error.prototype);
        const ch = lh;
        function uh(e) {
            return t=>0 === e ? Fl() : t.lift(new hh(e))
        }
        class hh {
            constructor(e) {
                if (this.total = e,
                this.total < 0)
                    throw new ch
            }
            call(e, t) {
                return t.subscribe(new dh(e,this.total))
            }
        }
        class dh extends b {
            constructor(e, t) {
                super(e),
                this.total = t,
                this.count = 0
            }
            _next(e) {
                const t = this.total
                  , n = ++this.count;
                n <= t && (this.destination.next(e),
                n === t && (this.destination.complete(),
                this.unsubscribe()))
            }
        }
        class ph {
            constructor(e, t, n) {
                this.nextOrObserver = e,
                this.error = t,
                this.complete = n
            }
            call(e, t) {
                return t.subscribe(new fh(e,this.nextOrObserver,this.error,this.complete))
            }
        }
        class fh extends b {
            constructor(e, t, n, o) {
                super(e),
                this._tapNext = C,
                this._tapError = C,
                this._tapComplete = C,
                this._tapError = n || C,
                this._tapComplete = o || C,
                r(t) ? (this._context = this,
                this._tapNext = t) : t && (this._context = t,
                this._tapNext = t.next || C,
                this._tapError = t.error || C,
                this._tapComplete = t.complete || C)
            }
            _next(e) {
                try {
                    this._tapNext.call(this._context, e)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.destination.next(e)
            }
            _error(e) {
                try {
                    this._tapError.call(this._context, e)
                } catch (e) {
                    return void this.destination.error(e)
                }
                this.destination.error(e)
            }
            _complete() {
                try {
                    this._tapComplete.call(this._context)
                } catch (e) {
                    return void this.destination.error(e)
                }
                return this.destination.complete()
            }
        }
        const gh = "Service workers are disabled or not supported by this browser";
        class mh {
            constructor(e) {
                if (this.serviceWorker = e,
                e) {
                    const t = eh(e, "controllerchange").pipe($(()=>e.controller))
                      , n = Pl(Xu(()=>Dl(e.controller)), t);
                    this.worker = n.pipe(nh(e=>!!e)),
                    this.registration = this.worker.pipe(sh(()=>e.getRegistration()));
                    const r = eh(e, "message").pipe($(e=>e.data)).pipe(nh(e=>e && e.type)).pipe(ie(new N));
                    r.connect(),
                    this.events = r
                } else
                    this.worker = this.events = this.registration = (t = gh,
                    Xu(()=>(function(e, t) {
                        return new x(t=>t.error(e))
                    }
                    )(new Error(t))));
                var t
            }
            postMessage(e, t) {
                return this.worker.pipe(uh(1), (n = (n=>{
                    n.postMessage(Object.assign({
                        action: e
                    }, t))
                }
                ),
                function(e) {
                    return e.lift(new ph(n,void 0,void 0))
                }
                )).toPromise().then(()=>void 0);
                var n
            }
            postMessageWithStatus(e, t, n) {
                const r = this.waitForStatus(n)
                  , o = this.postMessage(e, t);
                return Promise.all([r, o]).then(()=>void 0)
            }
            generateNonce() {
                return Math.round(1e7 * Math.random())
            }
            eventsOfType(e) {
                return this.events.pipe(nh(t=>t.type === e))
            }
            nextEventOfType(e) {
                return this.eventsOfType(e).pipe(uh(1))
            }
            waitForStatus(e) {
                return this.eventsOfType("STATUS").pipe(nh(t=>t.nonce === e), uh(1), $(e=>{
                    if (!e.status)
                        throw new Error(e.error)
                }
                )).toPromise()
            }
            get isEnabled() {
                return !!this.serviceWorker
            }
        }
        class yh {
            constructor(e) {
                if (this.sw = e,
                this.subscriptionChanges = new N,
                !e.isEnabled)
                    return this.messages = th,
                    this.notificationClicks = th,
                    void (this.subscription = th);
                this.messages = this.sw.eventsOfType("PUSH").pipe($(e=>e.data)),
                this.notificationClicks = this.sw.eventsOfType("NOTIFICATION_CLICK").pipe($(e=>e.data)),
                this.pushManager = this.sw.registration.pipe($(e=>e.pushManager));
                const t = this.pushManager.pipe(sh(e=>e.getSubscription()));
                this.subscription = X(t, this.subscriptionChanges)
            }
            get isEnabled() {
                return this.sw.isEnabled
            }
            requestSubscription(e) {
                if (!this.sw.isEnabled)
                    return Promise.reject(new Error(gh));
                const t = {
                    userVisibleOnly: !0
                };
                let n = this.decodeBase64(e.serverPublicKey.replace(/_/g, "/").replace(/-/g, "+"))
                  , r = new Uint8Array(new ArrayBuffer(n.length));
                for (let o = 0; o < n.length; o++)
                    r[o] = n.charCodeAt(o);
                return t.applicationServerKey = r,
                this.pushManager.pipe(sh(e=>e.subscribe(t)), uh(1)).toPromise().then(e=>(this.subscriptionChanges.next(e),
                e))
            }
            unsubscribe() {
                return this.sw.isEnabled ? this.subscription.pipe(uh(1), sh(e=>{
                    if (null === e)
                        throw new Error("Not subscribed to push notifications.");
                    return e.unsubscribe().then(e=>{
                        if (!e)
                            throw new Error("Unsubscribe failed!");
                        this.subscriptionChanges.next(null)
                    }
                    )
                }
                )).toPromise() : Promise.reject(new Error(gh))
            }
            decodeBase64(e) {
                return atob(e)
            }
        }
        class vh {
            constructor(e) {
                if (this.sw = e,
                !e.isEnabled)
                    return this.available = th,
                    void (this.activated = th);
                this.available = this.sw.eventsOfType("UPDATE_AVAILABLE"),
                this.activated = this.sw.eventsOfType("UPDATE_ACTIVATED")
            }
            get isEnabled() {
                return this.sw.isEnabled
            }
            checkForUpdate() {
                if (!this.sw.isEnabled)
                    return Promise.reject(new Error(gh));
                const e = this.sw.generateNonce();
                return this.sw.postMessageWithStatus("CHECK_FOR_UPDATES", {
                    statusNonce: e
                }, e)
            }
            activateUpdate() {
                if (!this.sw.isEnabled)
                    return Promise.reject(new Error(gh));
                const e = this.sw.generateNonce();
                return this.sw.postMessageWithStatus("ACTIVATE_UPDATE", {
                    statusNonce: e
                }, e)
            }
        }
        class bh {
        }
        const _h = new fe("NGSW_REGISTER_SCRIPT");
        function wh(e, t, n, r) {
            return ()=>{
                const o = e.get(Mr);
                if (!(bl(r) && "serviceWorker"in navigator && !1 !== n.enabled))
                    return;
                const s = o.isStable.pipe(nh(e=>!!e), uh(1)).toPromise();
                navigator.serviceWorker.addEventListener("controllerchange", ()=>{
                    null !== navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage({
                        action: "INITIALIZE"
                    })
                }
                ),
                s.then(()=>navigator.serviceWorker.register(t, {
                    scope: n.scope
                }))
            }
        }
        function Ch(e, t) {
            return new mh(bl(t) && !1 !== e.enabled ? navigator.serviceWorker : void 0)
        }
        class xh {
            static register(e, t={}) {
                return {
                    ngModule: xh,
                    providers: [{
                        provide: _h,
                        useValue: e
                    }, {
                        provide: bh,
                        useValue: t
                    }, {
                        provide: mh,
                        useFactory: Ch,
                        deps: [bh, tr]
                    }, {
                        provide: Kn,
                        useFactory: wh,
                        deps: [Je, _h, bh, tr],
                        multi: !0
                    }]
                }
            }
        }
        var Eh = wa(Na, [Ia], function(e) {
            return function(e) {
                const t = {}
                  , n = [];
                let r = !1;
                for (let o = 0; o < e.length; o++) {
                    const s = e[o];
                    s.token === mt && !0 === s.value && (r = !0),
                    1073741824 & s.flags && n.push(s.token),
                    s.index = o,
                    t[To(s.token)] = s
                }
                return {
                    factory: null,
                    providersByKey: t,
                    providers: e,
                    modules: n,
                    isRoot: r
                }
            }([ds(512, Ct, xt, [[8, [ql]], [3, Ct], ft]), ds(5120, ao, uo, [[3, ao]]), ds(4608, Ba, ja, [ao, [2, Va]]), ds(4608, sr, sr, []), ds(5120, Yn, Jn, []), ds(5120, to, lo, []), ds(5120, no, co, []), ds(4608, Xc, eu, [ml]), ds(6144, ln, null, [Xc]), ds(4608, qc, Zc, []), ds(5120, fc, function(e, t, n, r, o, s, i, a) {
                return [new $c(e,t,n), new Jc(r), new Kc(o,s,i,a)]
            }, [ml, pr, tr, ml, ml, qc, rr, [2, Wc]]), ds(4608, gc, gc, [fc, pr]), ds(135680, vc, vc, [ml]), ds(4608, kc, kc, [gc, vc]), ds(6144, St, null, [kc]), ds(6144, yc, null, [vc]), ds(4608, _r, _r, [pr]), ds(4608, Au, Au, []), ds(5120, mh, Ch, [bh, tr]), ds(4608, yh, yh, [mh]), ds(4608, vh, vh, [mh]), ds(5120, ka, Aa, [Ta]), ds(4608, _l, _l, []), ds(1073742336, gl, gl, []), ds(1024, kn, lu, []), ds(256, _h, "/ChatAppClient/ngsw-worker.js", []), ds(256, bh, {
                enabled: !0
            }, []), ds(1024, Kn, function(e, t, n, r, o) {
                return [(s = e,
                hc("probe", pc),
                hc("coreTokens", Object.assign({}, dc, (s || []).reduce((e,t)=>(e[t.name] = t.token,
                e), {}))),
                ()=>pc), wh(t, n, r, o)];
                var s
            }, [[2, Tr], Je, _h, bh, tr]), ds(512, Qn, Qn, [[2, Kn]]), ds(131584, Mr, Mr, [pr, rr, Je, kn, Ct, Qn]), ds(1073742336, ho, ho, [Mr]), ds(1073742336, cu, cu, [[3, cu]]), ds(1073742336, Yu, Yu, []), ds(1073742336, Ju, Ju, []), ds(1073742336, Sa, Sa, []), ds(1073742336, xh, xh, []), ds(1073742336, Na, Na, []), ds(256, mt, !0, []), ds(256, Ta, {
                url: "https://vs-code-heroku.herokuapp.com/proxy/3000/",
                options: {}
            }, [])])
        });
        (function() {
            if (Pt)
                throw new Error("Cannot enable prod mode after platform setup.");
            Dt = !1
        }
        )(),
        au().bootstrapModuleFactory(Eh).then(()=>{
            "serviceWorker"in navigator && navigator.serviceWorker.register("/ChatAppClient/ngsw-worker.js")
        }
        ).catch(e=>console.log(e))
    }
}, [[0, 0]]]);
