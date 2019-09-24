(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    '+SKG': function(e, t) {
      e.exports = function(e) {
        return (n && global.Buffer.isBuffer(e)) || (r && (e instanceof global.ArrayBuffer || o(e)));
      };
      var n = 'function' == typeof global.Buffer && 'function' == typeof global.Buffer.isBuffer,
        r = 'function' == typeof global.ArrayBuffer,
        o =
          r && 'function' == typeof global.ArrayBuffer.isView
            ? global.ArrayBuffer.isView
            : function(e) {
                return e.buffer instanceof global.ArrayBuffer;
              };
    },
    0: function(e, t, n) {
      e.exports = n('zUnb');
    },
    '0z79': function(e, t, n) {
      var r = n('AdPF'),
        o = n('CUme'),
        i = n('cpc2'),
        s = n('Yvos'),
        a = n('HjK1')('engine.io-client:polling-xhr');
      function u() {}
      function c(e) {
        if ((o.call(this, e), (this.requestTimeout = e.requestTimeout), (this.extraHeaders = e.extraHeaders), global.location)) {
          var t = 'https:' === location.protocol,
            n = location.port;
          n || (n = t ? 443 : 80), (this.xd = e.hostname !== global.location.hostname || n !== e.port), (this.xs = e.secure !== t);
        }
      }
      function l(e) {
        (this.method = e.method || 'GET'),
          (this.uri = e.uri),
          (this.xd = !!e.xd),
          (this.xs = !!e.xs),
          (this.async = !1 !== e.async),
          (this.data = void 0 !== e.data ? e.data : null),
          (this.agent = e.agent),
          (this.isBinary = e.isBinary),
          (this.supportsBinary = e.supportsBinary),
          (this.enablesXDR = e.enablesXDR),
          (this.requestTimeout = e.requestTimeout),
          (this.pfx = e.pfx),
          (this.key = e.key),
          (this.passphrase = e.passphrase),
          (this.cert = e.cert),
          (this.ca = e.ca),
          (this.ciphers = e.ciphers),
          (this.rejectUnauthorized = e.rejectUnauthorized),
          (this.extraHeaders = e.extraHeaders),
          this.create();
      }
      function p() {
        for (var e in l.requests) l.requests.hasOwnProperty(e) && l.requests[e].abort();
      }
      (e.exports = c),
        (e.exports.Request = l),
        s(c, o),
        (c.prototype.supportsBinary = !0),
        (c.prototype.request = function(e) {
          return (
            ((e = e || {}).uri = this.uri()),
            (e.xd = this.xd),
            (e.xs = this.xs),
            (e.agent = this.agent || !1),
            (e.supportsBinary = this.supportsBinary),
            (e.enablesXDR = this.enablesXDR),
            (e.pfx = this.pfx),
            (e.key = this.key),
            (e.passphrase = this.passphrase),
            (e.cert = this.cert),
            (e.ca = this.ca),
            (e.ciphers = this.ciphers),
            (e.rejectUnauthorized = this.rejectUnauthorized),
            (e.requestTimeout = this.requestTimeout),
            (e.extraHeaders = this.extraHeaders),
            new l(e)
          );
        }),
        (c.prototype.doWrite = function(e, t) {
          var n = this.request({ method: 'POST', data: e, isBinary: 'string' != typeof e && void 0 !== e }),
            r = this;
          n.on('success', t),
            n.on('error', function(e) {
              r.onError('xhr post error', e);
            }),
            (this.sendXhr = n);
        }),
        (c.prototype.doPoll = function() {
          a('xhr poll');
          var e = this.request(),
            t = this;
          e.on('data', function(e) {
            t.onData(e);
          }),
            e.on('error', function(e) {
              t.onError('xhr poll error', e);
            }),
            (this.pollXhr = e);
        }),
        i(l.prototype),
        (l.prototype.create = function() {
          var e = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };
          (e.pfx = this.pfx),
            (e.key = this.key),
            (e.passphrase = this.passphrase),
            (e.cert = this.cert),
            (e.ca = this.ca),
            (e.ciphers = this.ciphers),
            (e.rejectUnauthorized = this.rejectUnauthorized);
          var t = (this.xhr = new r(e)),
            n = this;
          try {
            a('xhr open %s: %s', this.method, this.uri), t.open(this.method, this.uri, this.async);
            try {
              if (this.extraHeaders)
                for (var o in (t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0), this.extraHeaders))
                  this.extraHeaders.hasOwnProperty(o) && t.setRequestHeader(o, this.extraHeaders[o]);
            } catch (i) {}
            if ('POST' === this.method)
              try {
                t.setRequestHeader('Content-type', this.isBinary ? 'application/octet-stream' : 'text/plain;charset=UTF-8');
              } catch (i) {}
            try {
              t.setRequestHeader('Accept', '*/*');
            } catch (i) {}
            'withCredentials' in t && (t.withCredentials = !0),
              this.requestTimeout && (t.timeout = this.requestTimeout),
              this.hasXDR()
                ? ((t.onload = function() {
                    n.onLoad();
                  }),
                  (t.onerror = function() {
                    n.onError(t.responseText);
                  }))
                : (t.onreadystatechange = function() {
                    if (2 === t.readyState)
                      try {
                        var e = t.getResponseHeader('Content-Type');
                        n.supportsBinary && 'application/octet-stream' === e && (t.responseType = 'arraybuffer');
                      } catch (i) {}
                    4 === t.readyState &&
                      (200 === t.status || 1223 === t.status
                        ? n.onLoad()
                        : setTimeout(function() {
                            n.onError(t.status);
                          }, 0));
                  }),
              a('xhr data %s', this.data),
              t.send(this.data);
          } catch (i) {
            return void setTimeout(function() {
              n.onError(i);
            }, 0);
          }
          global.document && ((this.index = l.requestsCount++), (l.requests[this.index] = this));
        }),
        (l.prototype.onSuccess = function() {
          this.emit('success'), this.cleanup();
        }),
        (l.prototype.onData = function(e) {
          this.emit('data', e), this.onSuccess();
        }),
        (l.prototype.onError = function(e) {
          this.emit('error', e), this.cleanup(!0);
        }),
        (l.prototype.cleanup = function(e) {
          if (null != this.xhr) {
            if ((this.hasXDR() ? (this.xhr.onload = this.xhr.onerror = u) : (this.xhr.onreadystatechange = u), e))
              try {
                this.xhr.abort();
              } catch (t) {}
            global.document && delete l.requests[this.index], (this.xhr = null);
          }
        }),
        (l.prototype.onLoad = function() {
          var e;
          try {
            var t;
            try {
              t = this.xhr.getResponseHeader('Content-Type');
            } catch (n) {}
            e = ('application/octet-stream' === t && this.xhr.response) || this.xhr.responseText;
          } catch (n) {
            this.onError(n);
          }
          null != e && this.onData(e);
        }),
        (l.prototype.hasXDR = function() {
          return void 0 !== global.XDomainRequest && !this.xs && this.enablesXDR;
        }),
        (l.prototype.abort = function() {
          this.cleanup();
        }),
        (l.requestsCount = 0),
        (l.requests = {}),
        global.document &&
          (global.attachEvent
            ? global.attachEvent('onunload', p)
            : global.addEventListener && global.addEventListener('beforeunload', p, !1));
    },
    1: function(e, t) {},
    '14A5': function(e, t) {
      var n =
          void 0 !== n
            ? n
            : 'undefined' != typeof WebKitBlobBuilder
            ? WebKitBlobBuilder
            : 'undefined' != typeof MSBlobBuilder
            ? MSBlobBuilder
            : 'undefined' != typeof MozBlobBuilder && MozBlobBuilder,
        r = (function() {
          try {
            return 2 === new Blob(['hi']).size;
          } catch (e) {
            return !1;
          }
        })(),
        o =
          r &&
          (function() {
            try {
              return 2 === new Blob([new Uint8Array([1, 2])]).size;
            } catch (e) {
              return !1;
            }
          })(),
        i = n && n.prototype.append && n.prototype.getBlob;
      function s(e) {
        return e.map(function(e) {
          if (e.buffer instanceof ArrayBuffer) {
            var t = e.buffer;
            if (e.byteLength !== t.byteLength) {
              var n = new Uint8Array(e.byteLength);
              n.set(new Uint8Array(t, e.byteOffset, e.byteLength)), (t = n.buffer);
            }
            return t;
          }
          return e;
        });
      }
      function a(e, t) {
        t = t || {};
        var r = new n();
        return (
          s(e).forEach(function(e) {
            r.append(e);
          }),
          t.type ? r.getBlob(t.type) : r.getBlob()
        );
      }
      function u(e, t) {
        return new Blob(s(e), t || {});
      }
      'undefined' != typeof Blob && ((a.prototype = Blob.prototype), (u.prototype = Blob.prototype)),
        (e.exports = r ? (o ? Blob : u) : i ? a : void 0);
    },
    '2Dig': function(e, t) {
      e.exports = function(e, t, n) {
        return (
          e.on(t, n),
          {
            destroy: function() {
              e.removeListener(t, n);
            }
          }
        );
      };
    },
    '2pII': function(e, t, n) {
      var r = n('akSB'),
        o = n('cpc2'),
        i = n('HjK1')('engine.io-client:socket'),
        s = n('7jRU'),
        a = n('Wm4p'),
        u = n('Uxeu'),
        c = n('TypT');
      function l(e, t) {
        if (!(this instanceof l)) return new l(e, t);
        (t = t || {}),
          e && 'object' == typeof e && ((t = e), (e = null)),
          e
            ? ((e = u(e)),
              (t.hostname = e.host),
              (t.secure = 'https' === e.protocol || 'wss' === e.protocol),
              (t.port = e.port),
              e.query && (t.query = e.query))
            : t.host && (t.hostname = u(t.host).host),
          (this.secure = null != t.secure ? t.secure : global.location && 'https:' === location.protocol),
          t.hostname && !t.port && (t.port = this.secure ? '443' : '80'),
          (this.agent = t.agent || !1),
          (this.hostname = t.hostname || (global.location ? location.hostname : 'localhost')),
          (this.port = t.port || (global.location && location.port ? location.port : this.secure ? 443 : 80)),
          (this.query = t.query || {}),
          'string' == typeof this.query && (this.query = c.decode(this.query)),
          (this.upgrade = !1 !== t.upgrade),
          (this.path = (t.path || '/engine.io').replace(/\/$/, '') + '/'),
          (this.forceJSONP = !!t.forceJSONP),
          (this.jsonp = !1 !== t.jsonp),
          (this.forceBase64 = !!t.forceBase64),
          (this.enablesXDR = !!t.enablesXDR),
          (this.timestampParam = t.timestampParam || 't'),
          (this.timestampRequests = t.timestampRequests),
          (this.transports = t.transports || ['polling', 'websocket']),
          (this.transportOptions = t.transportOptions || {}),
          (this.readyState = ''),
          (this.writeBuffer = []),
          (this.prevBufferLen = 0),
          (this.policyPort = t.policyPort || 843),
          (this.rememberUpgrade = t.rememberUpgrade || !1),
          (this.binaryType = null),
          (this.onlyBinaryUpgrades = t.onlyBinaryUpgrades),
          (this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {})),
          !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
          this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
          (this.pfx = t.pfx || null),
          (this.key = t.key || null),
          (this.passphrase = t.passphrase || null),
          (this.cert = t.cert || null),
          (this.ca = t.ca || null),
          (this.ciphers = t.ciphers || null),
          (this.rejectUnauthorized = void 0 === t.rejectUnauthorized || t.rejectUnauthorized),
          (this.forceNode = !!t.forceNode);
        var n = 'object' == typeof global && global;
        n.global === n &&
          (t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders),
          t.localAddress && (this.localAddress = t.localAddress)),
          (this.id = null),
          (this.upgrades = null),
          (this.pingInterval = null),
          (this.pingTimeout = null),
          (this.pingIntervalTimer = null),
          (this.pingTimeoutTimer = null),
          this.open();
      }
      (e.exports = l),
        (l.priorWebsocketSuccess = !1),
        o(l.prototype),
        (l.protocol = a.protocol),
        (l.Socket = l),
        (l.Transport = n('Gbct')),
        (l.transports = n('akSB')),
        (l.parser = n('Wm4p')),
        (l.prototype.createTransport = function(e) {
          i('creating transport "%s"', e);
          var t = (function(e) {
            var t = {};
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            return t;
          })(this.query);
          (t.EIO = a.protocol), (t.transport = e);
          var n = this.transportOptions[e] || {};
          return (
            this.id && (t.sid = this.id),
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
          );
        }),
        (l.prototype.open = function() {
          var e;
          if (this.rememberUpgrade && l.priorWebsocketSuccess && -1 !== this.transports.indexOf('websocket')) e = 'websocket';
          else {
            if (0 === this.transports.length) {
              var t = this;
              return void setTimeout(function() {
                t.emit('error', 'No transports available');
              }, 0);
            }
            e = this.transports[0];
          }
          this.readyState = 'opening';
          try {
            e = this.createTransport(e);
          } catch (n) {
            return this.transports.shift(), void this.open();
          }
          e.open(), this.setTransport(e);
        }),
        (l.prototype.setTransport = function(e) {
          i('setting transport %s', e.name);
          var t = this;
          this.transport && (i('clearing existing transport %s', this.transport.name), this.transport.removeAllListeners()),
            (this.transport = e),
            e
              .on('drain', function() {
                t.onDrain();
              })
              .on('packet', function(e) {
                t.onPacket(e);
              })
              .on('error', function(e) {
                t.onError(e);
              })
              .on('close', function() {
                t.onClose('transport close');
              });
        }),
        (l.prototype.probe = function(e) {
          i('probing transport "%s"', e);
          var t = this.createTransport(e, { probe: 1 }),
            n = !1,
            r = this;
          function o() {
            r.onlyBinaryUpgrades && (n = n || (!this.supportsBinary && r.transport.supportsBinary)),
              n ||
                (i('probe transport "%s" opened', e),
                t.send([{ type: 'ping', data: 'probe' }]),
                t.once('packet', function(o) {
                  if (!n)
                    if ('pong' === o.type && 'probe' === o.data) {
                      if ((i('probe transport "%s" pong', e), (r.upgrading = !0), r.emit('upgrading', t), !t)) return;
                      (l.priorWebsocketSuccess = 'websocket' === t.name),
                        i('pausing current transport "%s"', r.transport.name),
                        r.transport.pause(function() {
                          n ||
                            ('closed' !== r.readyState &&
                              (i('changing transport and sending upgrade packet'),
                              f(),
                              r.setTransport(t),
                              t.send([{ type: 'upgrade' }]),
                              r.emit('upgrade', t),
                              (t = null),
                              (r.upgrading = !1),
                              r.flush()));
                        });
                    } else {
                      i('probe transport "%s" failed', e);
                      var s = new Error('probe error');
                      (s.transport = t.name), r.emit('upgradeError', s);
                    }
                }));
          }
          function s() {
            n || ((n = !0), f(), t.close(), (t = null));
          }
          function a(n) {
            var o = new Error('probe error: ' + n);
            (o.transport = t.name), s(), i('probe transport "%s" failed because of error: %s', e, n), r.emit('upgradeError', o);
          }
          function u() {
            a('transport closed');
          }
          function c() {
            a('socket closed');
          }
          function p(e) {
            t && e.name !== t.name && (i('"%s" works - aborting "%s"', e.name, t.name), s());
          }
          function f() {
            t.removeListener('open', o),
              t.removeListener('error', a),
              t.removeListener('close', u),
              r.removeListener('close', c),
              r.removeListener('upgrading', p);
          }
          (l.priorWebsocketSuccess = !1),
            t.once('open', o),
            t.once('error', a),
            t.once('close', u),
            this.once('close', c),
            this.once('upgrading', p),
            t.open();
        }),
        (l.prototype.onOpen = function() {
          if (
            (i('socket open'),
            (this.readyState = 'open'),
            (l.priorWebsocketSuccess = 'websocket' === this.transport.name),
            this.emit('open'),
            this.flush(),
            'open' === this.readyState && this.upgrade && this.transport.pause)
          ) {
            i('starting upgrade probes');
            for (var e = 0, t = this.upgrades.length; e < t; e++) this.probe(this.upgrades[e]);
          }
        }),
        (l.prototype.onPacket = function(e) {
          if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState)
            switch ((i('socket receive: type "%s", data "%s"', e.type, e.data), this.emit('packet', e), this.emit('heartbeat'), e.type)) {
              case 'open':
                this.onHandshake(JSON.parse(e.data));
                break;
              case 'pong':
                this.setPing(), this.emit('pong');
                break;
              case 'error':
                var t = new Error('server error');
                (t.code = e.data), this.onError(t);
                break;
              case 'message':
                this.emit('data', e.data), this.emit('message', e.data);
            }
          else i('packet received with socket readyState "%s"', this.readyState);
        }),
        (l.prototype.onHandshake = function(e) {
          this.emit('handshake', e),
            (this.id = e.sid),
            (this.transport.query.sid = e.sid),
            (this.upgrades = this.filterUpgrades(e.upgrades)),
            (this.pingInterval = e.pingInterval),
            (this.pingTimeout = e.pingTimeout),
            this.onOpen(),
            'closed' !== this.readyState &&
              (this.setPing(), this.removeListener('heartbeat', this.onHeartbeat), this.on('heartbeat', this.onHeartbeat));
        }),
        (l.prototype.onHeartbeat = function(e) {
          clearTimeout(this.pingTimeoutTimer);
          var t = this;
          t.pingTimeoutTimer = setTimeout(function() {
            'closed' !== t.readyState && t.onClose('ping timeout');
          }, e || t.pingInterval + t.pingTimeout);
        }),
        (l.prototype.setPing = function() {
          var e = this;
          clearTimeout(e.pingIntervalTimer),
            (e.pingIntervalTimer = setTimeout(function() {
              i('writing ping packet - expecting pong within %sms', e.pingTimeout), e.ping(), e.onHeartbeat(e.pingTimeout);
            }, e.pingInterval));
        }),
        (l.prototype.ping = function() {
          var e = this;
          this.sendPacket('ping', function() {
            e.emit('ping');
          });
        }),
        (l.prototype.onDrain = function() {
          this.writeBuffer.splice(0, this.prevBufferLen),
            (this.prevBufferLen = 0),
            0 === this.writeBuffer.length ? this.emit('drain') : this.flush();
        }),
        (l.prototype.flush = function() {
          'closed' !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length &&
            (i('flushing %d packets in socket', this.writeBuffer.length),
            this.transport.send(this.writeBuffer),
            (this.prevBufferLen = this.writeBuffer.length),
            this.emit('flush'));
        }),
        (l.prototype.write = l.prototype.send = function(e, t, n) {
          return this.sendPacket('message', e, t, n), this;
        }),
        (l.prototype.sendPacket = function(e, t, n, r) {
          if (
            ('function' == typeof t && ((r = t), (t = void 0)),
            'function' == typeof n && ((r = n), (n = null)),
            'closing' !== this.readyState && 'closed' !== this.readyState)
          ) {
            (n = n || {}).compress = !1 !== n.compress;
            var o = { type: e, data: t, options: n };
            this.emit('packetCreate', o), this.writeBuffer.push(o), r && this.once('flush', r), this.flush();
          }
        }),
        (l.prototype.close = function() {
          if ('opening' === this.readyState || 'open' === this.readyState) {
            this.readyState = 'closing';
            var e = this;
            this.writeBuffer.length
              ? this.once('drain', function() {
                  this.upgrading ? r() : t();
                })
              : this.upgrading
              ? r()
              : t();
          }
          function t() {
            e.onClose('forced close'), i('socket closing - telling transport to close'), e.transport.close();
          }
          function n() {
            e.removeListener('upgrade', n), e.removeListener('upgradeError', n), t();
          }
          function r() {
            e.once('upgrade', n), e.once('upgradeError', n);
          }
          return this;
        }),
        (l.prototype.onError = function(e) {
          i('socket error %j', e), (l.priorWebsocketSuccess = !1), this.emit('error', e), this.onClose('transport error', e);
        }),
        (l.prototype.onClose = function(e, t) {
          ('opening' !== this.readyState && 'open' !== this.readyState && 'closing' !== this.readyState) ||
            (i('socket close with reason: "%s"', e),
            clearTimeout(this.pingIntervalTimer),
            clearTimeout(this.pingTimeoutTimer),
            this.transport.removeAllListeners('close'),
            this.transport.close(),
            this.transport.removeAllListeners(),
            (this.readyState = 'closed'),
            (this.id = null),
            this.emit('close', e, t),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0));
        }),
        (l.prototype.filterUpgrades = function(e) {
          for (var t = [], n = 0, r = e.length; n < r; n++) ~s(this.transports, e[n]) && t.push(e[n]);
          return t;
        });
    },
    '5M3R': function(e, t, n) {
      function r() {
        var e;
        try {
          e = t.storage.debug;
        } catch (n) {}
        return !e && 'undefined' != typeof process && 'env' in process && (e = process.env.DEBUG), e;
      }
      ((t = e.exports = n('Nq7k')).log = function() {
        return 'object' == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
      }),
        (t.formatArgs = function(e) {
          var n = this.useColors;
          if (((e[0] = (n ? '%c' : '') + this.namespace + (n ? ' %c' : ' ') + e[0] + (n ? '%c ' : ' ') + '+' + t.humanize(this.diff)), n)) {
            var r = 'color: ' + this.color;
            e.splice(1, 0, r, 'color: inherit');
            var o = 0,
              i = 0;
            e[0].replace(/%[a-zA-Z%]/g, function(e) {
              '%%' !== e && (o++, '%c' === e && (i = o));
            }),
              e.splice(i, 0, r);
          }
        }),
        (t.save = function(e) {
          try {
            null == e ? t.storage.removeItem('debug') : (t.storage.debug = e);
          } catch (n) {}
        }),
        (t.load = r),
        (t.useColors = function() {
          return (
            !('undefined' == typeof window || !window.process || 'renderer' !== window.process.type) ||
            (('undefined' == typeof navigator ||
              !navigator.userAgent ||
              !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) &&
              (('undefined' != typeof document &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
                ('undefined' != typeof window &&
                  window.console &&
                  (window.console.firebug || (window.console.exception && window.console.table))) ||
                ('undefined' != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                ('undefined' != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))))
          );
        }),
        (t.storage =
          'undefined' != typeof chrome && void 0 !== chrome.storage
            ? chrome.storage.local
            : (function() {
                try {
                  return window.localStorage;
                } catch (e) {}
              })()),
        (t.colors = [
          '#0000CC',
          '#0000FF',
          '#0033CC',
          '#0033FF',
          '#0066CC',
          '#0066FF',
          '#0099CC',
          '#0099FF',
          '#00CC00',
          '#00CC33',
          '#00CC66',
          '#00CC99',
          '#00CCCC',
          '#00CCFF',
          '#3300CC',
          '#3300FF',
          '#3333CC',
          '#3333FF',
          '#3366CC',
          '#3366FF',
          '#3399CC',
          '#3399FF',
          '#33CC00',
          '#33CC33',
          '#33CC66',
          '#33CC99',
          '#33CCCC',
          '#33CCFF',
          '#6600CC',
          '#6600FF',
          '#6633CC',
          '#6633FF',
          '#66CC00',
          '#66CC33',
          '#9900CC',
          '#9900FF',
          '#9933CC',
          '#9933FF',
          '#99CC00',
          '#99CC33',
          '#CC0000',
          '#CC0033',
          '#CC0066',
          '#CC0099',
          '#CC00CC',
          '#CC00FF',
          '#CC3300',
          '#CC3333',
          '#CC3366',
          '#CC3399',
          '#CC33CC',
          '#CC33FF',
          '#CC6600',
          '#CC6633',
          '#CC9900',
          '#CC9933',
          '#CCCC00',
          '#CCCC33',
          '#FF0000',
          '#FF0033',
          '#FF0066',
          '#FF0099',
          '#FF00CC',
          '#FF00FF',
          '#FF3300',
          '#FF3333',
          '#FF3366',
          '#FF3399',
          '#FF33CC',
          '#FF33FF',
          '#FF6600',
          '#FF6633',
          '#FF9900',
          '#FF9933',
          '#FFCC00',
          '#FFCC33'
        ]),
        (t.formatters.j = function(e) {
          try {
            return JSON.stringify(e);
          } catch (t) {
            return '[UnexpectedJSONParseError]: ' + t.message;
          }
        }),
        t.enable(r());
    },
    '6C75': function(e, t) {
      var n = {}.toString;
      e.exports =
        Array.isArray ||
        function(e) {
          return '[object Array]' == n.call(e);
        };
    },
    '7jRU': function(e, t) {
      var n = [].indexOf;
      e.exports = function(e, t) {
        if (n) return e.indexOf(t);
        for (var r = 0; r < e.length; ++r) if (e[r] === t) return r;
        return -1;
      };
    },
    AdPF: function(e, t, n) {
      var r = n('yeub');
      e.exports = function(e) {
        var t = e.xdomain,
          n = e.xscheme,
          o = e.enablesXDR;
        try {
          if ('undefined' != typeof XMLHttpRequest && (!t || r)) return new XMLHttpRequest();
        } catch (i) {}
        try {
          if ('undefined' != typeof XDomainRequest && !n && o) return new XDomainRequest();
        } catch (i) {}
        if (!t)
          try {
            return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
          } catch (i) {}
      };
    },
    Aplp: function(e, t, n) {
      'use strict';
      var r,
        o = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
        i = 64,
        s = {},
        a = 0,
        u = 0;
      function c(e) {
        var t = '';
        do {
          (t = o[e % i] + t), (e = Math.floor(e / i));
        } while (e > 0);
        return t;
      }
      function l() {
        var e = c(+new Date());
        return e !== r ? ((a = 0), (r = e)) : e + '.' + c(a++);
      }
      for (; u < i; u++) s[o[u]] = u;
      (l.encode = c),
        (l.decode = function(e) {
          var t = 0;
          for (u = 0; u < e.length; u++) t = t * i + s[e.charAt(u)];
          return t;
        }),
        (e.exports = l);
    },
    C2QD: function(e, t) {
      function n(e) {
        (this.ms = (e = e || {}).min || 100),
          (this.max = e.max || 1e4),
          (this.factor = e.factor || 2),
          (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
          (this.attempts = 0);
      }
      (e.exports = n),
        (n.prototype.duration = function() {
          var e = this.ms * Math.pow(this.factor, this.attempts++);
          if (this.jitter) {
            var t = Math.random(),
              n = Math.floor(t * this.jitter * e);
            e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n;
          }
          return 0 | Math.min(e, this.max);
        }),
        (n.prototype.reset = function() {
          this.attempts = 0;
        }),
        (n.prototype.setMin = function(e) {
          this.ms = e;
        }),
        (n.prototype.setMax = function(e) {
          this.max = e;
        }),
        (n.prototype.setJitter = function(e) {
          this.jitter = e;
        });
    },
    CIKq: function(e, t, n) {
      var r,
        o = n('Gbct'),
        i = n('Wm4p'),
        s = n('TypT'),
        a = n('Yvos'),
        u = n('Aplp'),
        c = n('HjK1')('engine.io-client:websocket'),
        l = global.WebSocket || global.MozWebSocket;
      if ('undefined' == typeof window)
        try {
          r = n(1);
        } catch (d) {}
      var p = l;
      function f(e) {
        e && e.forceBase64 && (this.supportsBinary = !1),
          (this.perMessageDeflate = e.perMessageDeflate),
          (this.usingBrowserWebSocket = l && !e.forceNode),
          (this.protocols = e.protocols),
          this.usingBrowserWebSocket || (p = r),
          o.call(this, e);
      }
      p || 'undefined' != typeof window || (p = r),
        (e.exports = f),
        a(f, o),
        (f.prototype.name = 'websocket'),
        (f.prototype.supportsBinary = !0),
        (f.prototype.doOpen = function() {
          if (this.check()) {
            var e = this.uri(),
              t = this.protocols,
              n = { agent: this.agent, perMessageDeflate: this.perMessageDeflate };
            (n.pfx = this.pfx),
              (n.key = this.key),
              (n.passphrase = this.passphrase),
              (n.cert = this.cert),
              (n.ca = this.ca),
              (n.ciphers = this.ciphers),
              (n.rejectUnauthorized = this.rejectUnauthorized),
              this.extraHeaders && (n.headers = this.extraHeaders),
              this.localAddress && (n.localAddress = this.localAddress);
            try {
              this.ws = this.usingBrowserWebSocket ? (t ? new p(e, t) : new p(e)) : new p(e, t, n);
            } catch (r) {
              return this.emit('error', r);
            }
            void 0 === this.ws.binaryType && (this.supportsBinary = !1),
              this.ws.supports && this.ws.supports.binary
                ? ((this.supportsBinary = !0), (this.ws.binaryType = 'nodebuffer'))
                : (this.ws.binaryType = 'arraybuffer'),
              this.addEventListeners();
          }
        }),
        (f.prototype.addEventListeners = function() {
          var e = this;
          (this.ws.onopen = function() {
            e.onOpen();
          }),
            (this.ws.onclose = function() {
              e.onClose();
            }),
            (this.ws.onmessage = function(t) {
              e.onData(t.data);
            }),
            (this.ws.onerror = function(t) {
              e.onError('websocket error', t);
            });
        }),
        (f.prototype.write = function(e) {
          var t = this;
          this.writable = !1;
          for (var n = e.length, r = 0, o = n; r < o; r++)
            !(function(e) {
              i.encodePacket(e, t.supportsBinary, function(r) {
                if (!t.usingBrowserWebSocket) {
                  var o = {};
                  e.options && (o.compress = e.options.compress),
                    t.perMessageDeflate &&
                      ('string' == typeof r ? global.Buffer.byteLength(r) : r.length) < t.perMessageDeflate.threshold &&
                      (o.compress = !1);
                }
                try {
                  t.usingBrowserWebSocket ? t.ws.send(r) : t.ws.send(r, o);
                } catch (d) {
                  c('websocket closed before onclose event');
                }
                --n ||
                  (t.emit('flush'),
                  setTimeout(function() {
                    (t.writable = !0), t.emit('drain');
                  }, 0));
              });
            })(e[r]);
        }),
        (f.prototype.onClose = function() {
          o.prototype.onClose.call(this);
        }),
        (f.prototype.doClose = function() {
          void 0 !== this.ws && this.ws.close();
        }),
        (f.prototype.uri = function() {
          var e = this.query || {},
            t = this.secure ? 'wss' : 'ws',
            n = '';
          return (
            this.port && (('wss' === t && 443 !== Number(this.port)) || ('ws' === t && 80 !== Number(this.port))) && (n = ':' + this.port),
            this.timestampRequests && (e[this.timestampParam] = u()),
            this.supportsBinary || (e.b64 = 1),
            (e = s.encode(e)).length && (e = '?' + e),
            t + '://' + (-1 !== this.hostname.indexOf(':') ? '[' + this.hostname + ']' : this.hostname) + n + this.path + e
          );
        }),
        (f.prototype.check = function() {
          return !(!p || ('__initialize' in p && this.name === f.prototype.name));
        });
    },
    CUme: function(e, t, n) {
      var r = n('Gbct'),
        o = n('TypT'),
        i = n('Wm4p'),
        s = n('Yvos'),
        a = n('Aplp'),
        u = n('HjK1')('engine.io-client:polling');
      e.exports = l;
      var c = null != new (n('AdPF'))({ xdomain: !1 }).responseType;
      function l(e) {
        (c && !(e && e.forceBase64)) || (this.supportsBinary = !1), r.call(this, e);
      }
      s(l, r),
        (l.prototype.name = 'polling'),
        (l.prototype.doOpen = function() {
          this.poll();
        }),
        (l.prototype.pause = function(e) {
          var t = this;
          function n() {
            u('paused'), (t.readyState = 'paused'), e();
          }
          if (((this.readyState = 'pausing'), this.polling || !this.writable)) {
            var r = 0;
            this.polling &&
              (u('we are currently polling - waiting to pause'),
              r++,
              this.once('pollComplete', function() {
                u('pre-pause polling complete'), --r || n();
              })),
              this.writable ||
                (u('we are currently writing - waiting to pause'),
                r++,
                this.once('drain', function() {
                  u('pre-pause writing complete'), --r || n();
                }));
          } else n();
        }),
        (l.prototype.poll = function() {
          u('polling'), (this.polling = !0), this.doPoll(), this.emit('poll');
        }),
        (l.prototype.onData = function(e) {
          var t = this;
          u('polling got data %s', e),
            i.decodePayload(e, this.socket.binaryType, function(e, n, r) {
              if (('opening' === t.readyState && t.onOpen(), 'close' === e.type)) return t.onClose(), !1;
              t.onPacket(e);
            }),
            'closed' !== this.readyState &&
              ((this.polling = !1),
              this.emit('pollComplete'),
              'open' === this.readyState ? this.poll() : u('ignoring poll - transport state "%s"', this.readyState));
        }),
        (l.prototype.doClose = function() {
          var e = this;
          function t() {
            u('writing close packet'), e.write([{ type: 'close' }]);
          }
          'open' === this.readyState
            ? (u('transport open - closing'), t())
            : (u('transport not open - deferring close'), this.once('open', t));
        }),
        (l.prototype.write = function(e) {
          var t = this;
          this.writable = !1;
          var n = function() {
            (t.writable = !0), t.emit('drain');
          };
          i.encodePayload(e, this.supportsBinary, function(e) {
            t.doWrite(e, n);
          });
        }),
        (l.prototype.uri = function() {
          var e = this.query || {},
            t = this.secure ? 'https' : 'http',
            n = '';
          return (
            !1 !== this.timestampRequests && (e[this.timestampParam] = a()),
            this.supportsBinary || e.sid || (e.b64 = 1),
            (e = o.encode(e)),
            this.port &&
              (('https' === t && 443 !== Number(this.port)) || ('http' === t && 80 !== Number(this.port))) &&
              (n = ':' + this.port),
            e.length && (e = '?' + e),
            t + '://' + (-1 !== this.hostname.indexOf(':') ? '[' + this.hostname + ']' : this.hostname) + n + this.path + e
          );
        });
    },
    Cl5A: function(e, t, n) {
      var r = n('CUme'),
        o = n('Yvos');
      e.exports = c;
      var i,
        s = /\n/g,
        a = /\\n/g;
      function u() {}
      function c(e) {
        r.call(this, e),
          (this.query = this.query || {}),
          i || (global.___eio || (global.___eio = []), (i = global.___eio)),
          (this.index = i.length);
        var t = this;
        i.push(function(e) {
          t.onData(e);
        }),
          (this.query.j = this.index),
          global.document &&
            global.addEventListener &&
            global.addEventListener(
              'beforeunload',
              function() {
                t.script && (t.script.onerror = u);
              },
              !1
            );
      }
      o(c, r),
        (c.prototype.supportsBinary = !1),
        (c.prototype.doClose = function() {
          this.script && (this.script.parentNode.removeChild(this.script), (this.script = null)),
            this.form && (this.form.parentNode.removeChild(this.form), (this.form = null), (this.iframe = null)),
            r.prototype.doClose.call(this);
        }),
        (c.prototype.doPoll = function() {
          var e = this,
            t = document.createElement('script');
          this.script && (this.script.parentNode.removeChild(this.script), (this.script = null)),
            (t.async = !0),
            (t.src = this.uri()),
            (t.onerror = function(t) {
              e.onError('jsonp poll error', t);
            });
          var n = document.getElementsByTagName('script')[0];
          n ? n.parentNode.insertBefore(t, n) : (document.head || document.body).appendChild(t),
            (this.script = t),
            'undefined' != typeof navigator &&
              /gecko/i.test(navigator.userAgent) &&
              setTimeout(function() {
                var e = document.createElement('iframe');
                document.body.appendChild(e), document.body.removeChild(e);
              }, 100);
        }),
        (c.prototype.doWrite = function(e, t) {
          var n = this;
          if (!this.form) {
            var r,
              o = document.createElement('form'),
              i = document.createElement('textarea'),
              u = (this.iframeId = 'eio_iframe_' + this.index);
            (o.className = 'socketio'),
              (o.style.position = 'absolute'),
              (o.style.top = '-1000px'),
              (o.style.left = '-1000px'),
              (o.target = u),
              (o.method = 'POST'),
              o.setAttribute('accept-charset', 'utf-8'),
              (i.name = 'd'),
              o.appendChild(i),
              document.body.appendChild(o),
              (this.form = o),
              (this.area = i);
          }
          function c() {
            l(), t();
          }
          function l() {
            if (n.iframe)
              try {
                n.form.removeChild(n.iframe);
              } catch (e) {
                n.onError('jsonp polling iframe removal error', e);
              }
            try {
              r = document.createElement('<iframe src="javascript:0" name="' + n.iframeId + '">');
            } catch (e) {
              ((r = document.createElement('iframe')).name = n.iframeId), (r.src = 'javascript:0');
            }
            (r.id = n.iframeId), n.form.appendChild(r), (n.iframe = r);
          }
          (this.form.action = this.uri()), l(), (e = e.replace(a, '\\\n')), (this.area.value = e.replace(s, '\\n'));
          try {
            this.form.submit();
          } catch (p) {}
          this.iframe.attachEvent
            ? (this.iframe.onreadystatechange = function() {
                'complete' === n.iframe.readyState && c();
              })
            : (this.iframe.onload = c);
        });
    },
    FGiv: function(e, t) {
      var n = 1e3,
        r = 6e4,
        o = 36e5,
        i = 24 * o;
      function s(e, t, n) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + ' ' + n : Math.ceil(e / t) + ' ' + n + 's';
      }
      e.exports = function(e, t) {
        t = t || {};
        var a,
          u = typeof e;
        if ('string' === u && e.length > 0)
          return (function(e) {
            if (!((e = String(e)).length > 100)) {
              var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                e
              );
              if (t) {
                var s = parseFloat(t[1]);
                switch ((t[2] || 'ms').toLowerCase()) {
                  case 'years':
                  case 'year':
                  case 'yrs':
                  case 'yr':
                  case 'y':
                    return 315576e5 * s;
                  case 'days':
                  case 'day':
                  case 'd':
                    return s * i;
                  case 'hours':
                  case 'hour':
                  case 'hrs':
                  case 'hr':
                  case 'h':
                    return s * o;
                  case 'minutes':
                  case 'minute':
                  case 'mins':
                  case 'min':
                  case 'm':
                    return s * r;
                  case 'seconds':
                  case 'second':
                  case 'secs':
                  case 'sec':
                  case 's':
                    return s * n;
                  case 'milliseconds':
                  case 'millisecond':
                  case 'msecs':
                  case 'msec':
                  case 'ms':
                    return s;
                  default:
                    return;
                }
              }
            }
          })(e);
        if ('number' === u && !1 === isNaN(e))
          return t.long
            ? s((a = e), i, 'day') || s(a, o, 'hour') || s(a, r, 'minute') || s(a, n, 'second') || a + ' ms'
            : (function(e) {
                return e >= i
                  ? Math.round(e / i) + 'd'
                  : e >= o
                  ? Math.round(e / o) + 'h'
                  : e >= r
                  ? Math.round(e / r) + 'm'
                  : e >= n
                  ? Math.round(e / n) + 's'
                  : e + 'ms';
              })(e);
        throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(e));
      };
    },
    Gbct: function(e, t, n) {
      var r = n('Wm4p'),
        o = n('cpc2');
      function i(e) {
        (this.path = e.path),
          (this.hostname = e.hostname),
          (this.port = e.port),
          (this.secure = e.secure),
          (this.query = e.query),
          (this.timestampParam = e.timestampParam),
          (this.timestampRequests = e.timestampRequests),
          (this.readyState = ''),
          (this.agent = e.agent || !1),
          (this.socket = e.socket),
          (this.enablesXDR = e.enablesXDR),
          (this.pfx = e.pfx),
          (this.key = e.key),
          (this.passphrase = e.passphrase),
          (this.cert = e.cert),
          (this.ca = e.ca),
          (this.ciphers = e.ciphers),
          (this.rejectUnauthorized = e.rejectUnauthorized),
          (this.forceNode = e.forceNode),
          (this.extraHeaders = e.extraHeaders),
          (this.localAddress = e.localAddress);
      }
      (e.exports = i),
        o(i.prototype),
        (i.prototype.onError = function(e, t) {
          var n = new Error(e);
          return (n.type = 'TransportError'), (n.description = t), this.emit('error', n), this;
        }),
        (i.prototype.open = function() {
          return ('closed' !== this.readyState && '' !== this.readyState) || ((this.readyState = 'opening'), this.doOpen()), this;
        }),
        (i.prototype.close = function() {
          return ('opening' !== this.readyState && 'open' !== this.readyState) || (this.doClose(), this.onClose()), this;
        }),
        (i.prototype.send = function(e) {
          if ('open' !== this.readyState) throw new Error('Transport not open');
          this.write(e);
        }),
        (i.prototype.onOpen = function() {
          (this.readyState = 'open'), (this.writable = !0), this.emit('open');
        }),
        (i.prototype.onData = function(e) {
          var t = r.decodePacket(e, this.socket.binaryType);
          this.onPacket(t);
        }),
        (i.prototype.onPacket = function(e) {
          this.emit('packet', e);
        }),
        (i.prototype.onClose = function() {
          (this.readyState = 'closed'), this.emit('close');
        });
    },
    HjK1: function(e, t, n) {
      function r() {
        var e;
        try {
          e = t.storage.debug;
        } catch (n) {}
        return !e && 'undefined' != typeof process && 'env' in process && (e = process.env.DEBUG), e;
      }
      ((t = e.exports = n('lhf0')).log = function() {
        return 'object' == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
      }),
        (t.formatArgs = function(e) {
          var n = this.useColors;
          if (((e[0] = (n ? '%c' : '') + this.namespace + (n ? ' %c' : ' ') + e[0] + (n ? '%c ' : ' ') + '+' + t.humanize(this.diff)), n)) {
            var r = 'color: ' + this.color;
            e.splice(1, 0, r, 'color: inherit');
            var o = 0,
              i = 0;
            e[0].replace(/%[a-zA-Z%]/g, function(e) {
              '%%' !== e && (o++, '%c' === e && (i = o));
            }),
              e.splice(i, 0, r);
          }
        }),
        (t.save = function(e) {
          try {
            null == e ? t.storage.removeItem('debug') : (t.storage.debug = e);
          } catch (n) {}
        }),
        (t.load = r),
        (t.useColors = function() {
          return (
            !('undefined' == typeof window || !window.process || 'renderer' !== window.process.type) ||
            (('undefined' == typeof navigator ||
              !navigator.userAgent ||
              !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) &&
              (('undefined' != typeof document &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
                ('undefined' != typeof window &&
                  window.console &&
                  (window.console.firebug || (window.console.exception && window.console.table))) ||
                ('undefined' != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                ('undefined' != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))))
          );
        }),
        (t.storage =
          'undefined' != typeof chrome && void 0 !== chrome.storage
            ? chrome.storage.local
            : (function() {
                try {
                  return window.localStorage;
                } catch (e) {}
              })()),
        (t.colors = [
          '#0000CC',
          '#0000FF',
          '#0033CC',
          '#0033FF',
          '#0066CC',
          '#0066FF',
          '#0099CC',
          '#0099FF',
          '#00CC00',
          '#00CC33',
          '#00CC66',
          '#00CC99',
          '#00CCCC',
          '#00CCFF',
          '#3300CC',
          '#3300FF',
          '#3333CC',
          '#3333FF',
          '#3366CC',
          '#3366FF',
          '#3399CC',
          '#3399FF',
          '#33CC00',
          '#33CC33',
          '#33CC66',
          '#33CC99',
          '#33CCCC',
          '#33CCFF',
          '#6600CC',
          '#6600FF',
          '#6633CC',
          '#6633FF',
          '#66CC00',
          '#66CC33',
          '#9900CC',
          '#9900FF',
          '#9933CC',
          '#9933FF',
          '#99CC00',
          '#99CC33',
          '#CC0000',
          '#CC0033',
          '#CC0066',
          '#CC0099',
          '#CC00CC',
          '#CC00FF',
          '#CC3300',
          '#CC3333',
          '#CC3366',
          '#CC3399',
          '#CC33CC',
          '#CC33FF',
          '#CC6600',
          '#CC6633',
          '#CC9900',
          '#CC9933',
          '#CCCC00',
          '#CCCC33',
          '#FF0000',
          '#FF0033',
          '#FF0066',
          '#FF0099',
          '#FF00CC',
          '#FF00FF',
          '#FF3300',
          '#FF3333',
          '#FF3366',
          '#FF3399',
          '#FF33CC',
          '#FF33FF',
          '#FF6600',
          '#FF6633',
          '#FF9900',
          '#FF9933',
          '#FFCC00',
          '#FFCC33'
        ]),
        (t.formatters.j = function(e) {
          try {
            return JSON.stringify(e);
          } catch (t) {
            return '[UnexpectedJSONParseError]: ' + t.message;
          }
        }),
        t.enable(r());
    },
    KFGy: function(e, t, n) {
      var r = n('Vo14'),
        o = n('cpc2'),
        i = n('kSER'),
        s = n('2Dig'),
        a = n('QN7Q'),
        u = n('x7D4')('socket.io-client:socket'),
        c = n('TypT'),
        l = n('WLGk');
      e.exports = d;
      var p = {
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
        },
        f = o.prototype.emit;
      function d(e, t, n) {
        (this.io = e),
          (this.nsp = t),
          (this.json = this),
          (this.ids = 0),
          (this.acks = {}),
          (this.receiveBuffer = []),
          (this.sendBuffer = []),
          (this.connected = !1),
          (this.disconnected = !0),
          (this.flags = {}),
          n && n.query && (this.query = n.query),
          this.io.autoConnect && this.open();
      }
      o(d.prototype),
        (d.prototype.subEvents = function() {
          if (!this.subs) {
            var e = this.io;
            this.subs = [s(e, 'open', a(this, 'onopen')), s(e, 'packet', a(this, 'onpacket')), s(e, 'close', a(this, 'onclose'))];
          }
        }),
        (d.prototype.open = d.prototype.connect = function() {
          return this.connected
            ? this
            : (this.subEvents(), this.io.open(), 'open' === this.io.readyState && this.onopen(), this.emit('connecting'), this);
        }),
        (d.prototype.send = function() {
          var e = i(arguments);
          return e.unshift('message'), this.emit.apply(this, e), this;
        }),
        (d.prototype.emit = function(e) {
          if (p.hasOwnProperty(e)) return f.apply(this, arguments), this;
          var t = i(arguments),
            n = { type: (void 0 !== this.flags.binary ? this.flags.binary : l(t)) ? r.BINARY_EVENT : r.EVENT, data: t, options: {} };
          return (
            (n.options.compress = !this.flags || !1 !== this.flags.compress),
            'function' == typeof t[t.length - 1] &&
              (u('emitting packet with ack id %d', this.ids), (this.acks[this.ids] = t.pop()), (n.id = this.ids++)),
            this.connected ? this.packet(n) : this.sendBuffer.push(n),
            (this.flags = {}),
            this
          );
        }),
        (d.prototype.packet = function(e) {
          (e.nsp = this.nsp), this.io.packet(e);
        }),
        (d.prototype.onopen = function() {
          if ((u('transport is open - connecting'), '/' !== this.nsp))
            if (this.query) {
              var e = 'object' == typeof this.query ? c.encode(this.query) : this.query;
              u('sending connect packet with query %s', e), this.packet({ type: r.CONNECT, query: e });
            } else this.packet({ type: r.CONNECT });
        }),
        (d.prototype.onclose = function(e) {
          u('close (%s)', e), (this.connected = !1), (this.disconnected = !0), delete this.id, this.emit('disconnect', e);
        }),
        (d.prototype.onpacket = function(e) {
          if (e.nsp === this.nsp || (e.type === r.ERROR && '/' === e.nsp))
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
                this.emit('error', e.data);
            }
        }),
        (d.prototype.onevent = function(e) {
          var t = e.data || [];
          u('emitting event %j', t),
            null != e.id && (u('attaching ack callback to event'), t.push(this.ack(e.id))),
            this.connected ? f.apply(this, t) : this.receiveBuffer.push(t);
        }),
        (d.prototype.ack = function(e) {
          var t = this,
            n = !1;
          return function() {
            if (!n) {
              n = !0;
              var o = i(arguments);
              u('sending ack %j', o), t.packet({ type: l(o) ? r.BINARY_ACK : r.ACK, id: e, data: o });
            }
          };
        }),
        (d.prototype.onack = function(e) {
          var t = this.acks[e.id];
          'function' == typeof t
            ? (u('calling ack %s with %j', e.id, e.data), t.apply(this, e.data), delete this.acks[e.id])
            : u('bad ack %s', e.id);
        }),
        (d.prototype.onconnect = function() {
          (this.connected = !0), (this.disconnected = !1), this.emit('connect'), this.emitBuffered();
        }),
        (d.prototype.emitBuffered = function() {
          var e;
          for (e = 0; e < this.receiveBuffer.length; e++) f.apply(this, this.receiveBuffer[e]);
          for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) this.packet(this.sendBuffer[e]);
          this.sendBuffer = [];
        }),
        (d.prototype.ondisconnect = function() {
          u('server disconnect (%s)', this.nsp), this.destroy(), this.onclose('io server disconnect');
        }),
        (d.prototype.destroy = function() {
          if (this.subs) {
            for (var e = 0; e < this.subs.length; e++) this.subs[e].destroy();
            this.subs = null;
          }
          this.io.destroy(this);
        }),
        (d.prototype.close = d.prototype.disconnect = function() {
          return (
            this.connected && (u('performing disconnect (%s)', this.nsp), this.packet({ type: r.DISCONNECT })),
            this.destroy(),
            this.connected && this.onclose('io client disconnect'),
            this
          );
        }),
        (d.prototype.compress = function(e) {
          return (this.flags.compress = e), this;
        }),
        (d.prototype.binary = function(e) {
          return (this.flags.binary = e), this;
        });
    },
    Nq7k: function(e, t, n) {
      function r(e) {
        var n;
        function r() {
          if (r.enabled) {
            var e = r,
              o = +new Date();
            (e.diff = o - (n || o)), (e.prev = n), (e.curr = o), (n = o);
            for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
            (i[0] = t.coerce(i[0])), 'string' != typeof i[0] && i.unshift('%O');
            var a = 0;
            (i[0] = i[0].replace(/%([a-zA-Z%])/g, function(n, r) {
              if ('%%' === n) return n;
              a++;
              var o = t.formatters[r];
              return 'function' == typeof o && ((n = o.call(e, i[a])), i.splice(a, 1), a--), n;
            })),
              t.formatArgs.call(e, i),
              (r.log || t.log || console.log.bind(console)).apply(e, i);
          }
        }
        return (
          (r.namespace = e),
          (r.enabled = t.enabled(e)),
          (r.useColors = t.useColors()),
          (r.color = (function(e) {
            var n,
              r = 0;
            for (n in e) (r = (r << 5) - r + e.charCodeAt(n)), (r |= 0);
            return t.colors[Math.abs(r) % t.colors.length];
          })(e)),
          (r.destroy = o),
          'function' == typeof t.init && t.init(r),
          t.instances.push(r),
          r
        );
      }
      function o() {
        var e = t.instances.indexOf(this);
        return -1 !== e && (t.instances.splice(e, 1), !0);
      }
      ((t = e.exports = r.debug = r.default = r).coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e;
      }),
        (t.disable = function() {
          t.enable('');
        }),
        (t.enable = function(e) {
          var n;
          t.save(e), (t.names = []), (t.skips = []);
          var r = ('string' == typeof e ? e : '').split(/[\s,]+/),
            o = r.length;
          for (n = 0; n < o; n++)
            r[n] &&
              ('-' === (e = r[n].replace(/\*/g, '.*?'))[0]
                ? t.skips.push(new RegExp('^' + e.substr(1) + '$'))
                : t.names.push(new RegExp('^' + e + '$')));
          for (n = 0; n < t.instances.length; n++) {
            var i = t.instances[n];
            i.enabled = t.enabled(i.namespace);
          }
        }),
        (t.enabled = function(e) {
          if ('*' === e[e.length - 1]) return !0;
          var n, r;
          for (n = 0, r = t.skips.length; n < r; n++) if (t.skips[n].test(e)) return !1;
          for (n = 0, r = t.names.length; n < r; n++) if (t.names[n].test(e)) return !0;
          return !1;
        }),
        (t.humanize = n('FGiv')),
        (t.instances = []),
        (t.names = []),
        (t.skips = []),
        (t.formatters = {});
    },
    Q80o: function(e, t, n) {
      function r(e) {
        var n;
        function r() {
          if (r.enabled) {
            var e = r,
              o = +new Date();
            (e.diff = o - (n || o)), (e.prev = n), (e.curr = o), (n = o);
            for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
            (i[0] = t.coerce(i[0])), 'string' != typeof i[0] && i.unshift('%O');
            var a = 0;
            (i[0] = i[0].replace(/%([a-zA-Z%])/g, function(n, r) {
              if ('%%' === n) return n;
              a++;
              var o = t.formatters[r];
              return 'function' == typeof o && ((n = o.call(e, i[a])), i.splice(a, 1), a--), n;
            })),
              t.formatArgs.call(e, i),
              (r.log || t.log || console.log.bind(console)).apply(e, i);
          }
        }
        return (
          (r.namespace = e),
          (r.enabled = t.enabled(e)),
          (r.useColors = t.useColors()),
          (r.color = (function(e) {
            var n,
              r = 0;
            for (n in e) (r = (r << 5) - r + e.charCodeAt(n)), (r |= 0);
            return t.colors[Math.abs(r) % t.colors.length];
          })(e)),
          (r.destroy = o),
          'function' == typeof t.init && t.init(r),
          t.instances.push(r),
          r
        );
      }
      function o() {
        var e = t.instances.indexOf(this);
        return -1 !== e && (t.instances.splice(e, 1), !0);
      }
      ((t = e.exports = r.debug = r.default = r).coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e;
      }),
        (t.disable = function() {
          t.enable('');
        }),
        (t.enable = function(e) {
          var n;
          t.save(e), (t.names = []), (t.skips = []);
          var r = ('string' == typeof e ? e : '').split(/[\s,]+/),
            o = r.length;
          for (n = 0; n < o; n++)
            r[n] &&
              ('-' === (e = r[n].replace(/\*/g, '.*?'))[0]
                ? t.skips.push(new RegExp('^' + e.substr(1) + '$'))
                : t.names.push(new RegExp('^' + e + '$')));
          for (n = 0; n < t.instances.length; n++) {
            var i = t.instances[n];
            i.enabled = t.enabled(i.namespace);
          }
        }),
        (t.enabled = function(e) {
          if ('*' === e[e.length - 1]) return !0;
          var n, r;
          for (n = 0, r = t.skips.length; n < r; n++) if (t.skips[n].test(e)) return !1;
          for (n = 0, r = t.names.length; n < r; n++) if (t.names[n].test(e)) return !0;
          return !1;
        }),
        (t.humanize = n('FGiv')),
        (t.instances = []),
        (t.names = []),
        (t.skips = []),
        (t.formatters = {});
    },
    QN7Q: function(e, t) {
      var n = [].slice;
      e.exports = function(e, t) {
        if (('string' == typeof t && (t = e[t]), 'function' != typeof t)) throw new Error('bind() requires a function');
        var r = n.call(arguments, 2);
        return function() {
          return t.apply(e, r.concat(n.call(arguments)));
        };
      };
    },
    TypT: function(e, t) {
      (t.encode = function(e) {
        var t = '';
        for (var n in e) e.hasOwnProperty(n) && (t.length && (t += '&'), (t += encodeURIComponent(n) + '=' + encodeURIComponent(e[n])));
        return t;
      }),
        (t.decode = function(e) {
          for (var t = {}, n = e.split('&'), r = 0, o = n.length; r < o; r++) {
            var i = n[r].split('=');
            t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
          }
          return t;
        });
    },
    Uxeu: function(e, t) {
      var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        r = [
          'source',
          'protocol',
          'authority',
          'userInfo',
          'user',
          'password',
          'host',
          'port',
          'relative',
          'path',
          'directory',
          'file',
          'query',
          'anchor'
        ];
      e.exports = function(e) {
        var t = e,
          o = e.indexOf('['),
          i = e.indexOf(']');
        -1 != o && -1 != i && (e = e.substring(0, o) + e.substring(o, i).replace(/:/g, ';') + e.substring(i, e.length));
        for (var s = n.exec(e || ''), a = {}, u = 14; u--; ) a[r[u]] = s[u] || '';
        return (
          -1 != o &&
            -1 != i &&
            ((a.source = t),
            (a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ':')),
            (a.authority = a.authority
              .replace('[', '')
              .replace(']', '')
              .replace(/;/g, ':')),
            (a.ipv6uri = !0)),
          a
        );
      };
    },
    Vo14: function(e, t, n) {
      var r = n('5M3R')('socket.io-parser'),
        o = n('cpc2'),
        i = n('cD5x'),
        s = n('ojuT'),
        a = n('+SKG');
      function u() {}
      (t.protocol = 4),
        (t.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'ACK', 'ERROR', 'BINARY_EVENT', 'BINARY_ACK']),
        (t.CONNECT = 0),
        (t.DISCONNECT = 1),
        (t.EVENT = 2),
        (t.ACK = 3),
        (t.ERROR = 4),
        (t.BINARY_EVENT = 5),
        (t.BINARY_ACK = 6),
        (t.Encoder = u),
        (t.Decoder = p);
      var c = t.ERROR + '"encode error"';
      function l(e) {
        var n = '' + e.type;
        if (
          ((t.BINARY_EVENT !== e.type && t.BINARY_ACK !== e.type) || (n += e.attachments + '-'),
          e.nsp && '/' !== e.nsp && (n += e.nsp + ','),
          null != e.id && (n += e.id),
          null != e.data)
        ) {
          var o = (function(e) {
            try {
              return JSON.stringify(e);
            } catch (t) {
              return !1;
            }
          })(e.data);
          if (!1 === o) return c;
          n += o;
        }
        return r('encoded %j as %s', e, n), n;
      }
      function p() {
        this.reconstructor = null;
      }
      function f(e) {
        (this.reconPack = e), (this.buffers = []);
      }
      function d(e) {
        return { type: t.ERROR, data: 'parser error: ' + e };
      }
      (u.prototype.encode = function(e, n) {
        r('encoding packet %j', e),
          t.BINARY_EVENT === e.type || t.BINARY_ACK === e.type
            ? (function(e, t) {
                i.removeBlobs(e, function(e) {
                  var n = i.deconstructPacket(e),
                    r = l(n.packet),
                    o = n.buffers;
                  o.unshift(r), t(o);
                });
              })(e, n)
            : n([l(e)]);
      }),
        o(p.prototype),
        (p.prototype.add = function(e) {
          var n;
          if ('string' == typeof e)
            (n = (function(e) {
              var n = 0,
                o = { type: Number(e.charAt(0)) };
              if (null == t.types[o.type]) return d('unknown packet type ' + o.type);
              if (t.BINARY_EVENT === o.type || t.BINARY_ACK === o.type) {
                for (var i = ''; '-' !== e.charAt(++n) && ((i += e.charAt(n)), n != e.length); );
                if (i != Number(i) || '-' !== e.charAt(n)) throw new Error('Illegal attachments');
                o.attachments = Number(i);
              }
              if ('/' === e.charAt(n + 1)) for (o.nsp = ''; ++n && ',' !== (u = e.charAt(n)) && ((o.nsp += u), n !== e.length); );
              else o.nsp = '/';
              var a = e.charAt(n + 1);
              if ('' !== a && Number(a) == a) {
                for (o.id = ''; ++n; ) {
                  var u;
                  if (null == (u = e.charAt(n)) || Number(u) != u) {
                    --n;
                    break;
                  }
                  if (((o.id += e.charAt(n)), n === e.length)) break;
                }
                o.id = Number(o.id);
              }
              if (e.charAt(++n)) {
                var c = (function(e) {
                  try {
                    return JSON.parse(e);
                  } catch (t) {
                    return !1;
                  }
                })(e.substr(n));
                if (!1 === c || (o.type !== t.ERROR && !s(c))) return d('invalid payload');
                o.data = c;
              }
              return r('decoded %s as %j', e, o), o;
            })(e)),
              t.BINARY_EVENT === n.type || t.BINARY_ACK === n.type
                ? ((this.reconstructor = new f(n)), 0 === this.reconstructor.reconPack.attachments && this.emit('decoded', n))
                : this.emit('decoded', n);
          else {
            if (!a(e) && !e.base64) throw new Error('Unknown type: ' + e);
            if (!this.reconstructor) throw new Error('got binary data when not reconstructing a packet');
            (n = this.reconstructor.takeBinaryData(e)) && ((this.reconstructor = null), this.emit('decoded', n));
          }
        }),
        (p.prototype.destroy = function() {
          this.reconstructor && this.reconstructor.finishedReconstruction();
        }),
        (f.prototype.takeBinaryData = function(e) {
          if ((this.buffers.push(e), this.buffers.length === this.reconPack.attachments)) {
            var t = i.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), t;
          }
          return null;
        }),
        (f.prototype.finishedReconstruction = function() {
          (this.reconPack = null), (this.buffers = []);
        });
    },
    WLGk: function(e, t, n) {
      var r = n('6C75'),
        o = Object.prototype.toString,
        i = 'function' == typeof Blob || ('undefined' != typeof Blob && '[object BlobConstructor]' === o.call(Blob)),
        s = 'function' == typeof File || ('undefined' != typeof File && '[object FileConstructor]' === o.call(File));
      e.exports = function e(t) {
        if (!t || 'object' != typeof t) return !1;
        if (r(t)) {
          for (var n = 0, o = t.length; n < o; n++) if (e(t[n])) return !0;
          return !1;
        }
        if (
          ('function' == typeof Buffer && Buffer.isBuffer && Buffer.isBuffer(t)) ||
          ('function' == typeof ArrayBuffer && t instanceof ArrayBuffer) ||
          (i && t instanceof Blob) ||
          (s && t instanceof File)
        )
          return !0;
        if (t.toJSON && 'function' == typeof t.toJSON && 1 === arguments.length) return e(t.toJSON(), !0);
        for (var a in t) if (Object.prototype.hasOwnProperty.call(t, a) && e(t[a])) return !0;
        return !1;
      };
    },
    Wm4p: function(e, t, n) {
      var r,
        o = n('dkv/'),
        i = n('WLGk'),
        s = n('ypnn'),
        a = n('zMFY'),
        u = n('oIG/');
      'undefined' != typeof ArrayBuffer && (r = n('g5Dd'));
      var c = 'undefined' != typeof navigator && /Android/i.test(navigator.userAgent),
        l = 'undefined' != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
        p = c || l;
      t.protocol = 3;
      var f = (t.packets = { open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6 }),
        d = o(f),
        h = { type: 'error', data: 'parser error' },
        y = n('14A5');
      function v(e, t, n) {
        for (
          var r = new Array(e.length),
            o = a(e.length, n),
            i = function(e, n, o) {
              t(n, function(t, n) {
                (r[e] = n), o(t, r);
              });
            },
            s = 0;
          s < e.length;
          s++
        )
          i(s, e[s], o);
      }
      (t.encodePacket = function(e, n, r, o) {
        'function' == typeof n && ((o = n), (n = !1)), 'function' == typeof r && ((o = r), (r = null));
        var i = void 0 === e.data ? void 0 : e.data.buffer || e.data;
        if ('undefined' != typeof ArrayBuffer && i instanceof ArrayBuffer)
          return (function(e, n, r) {
            if (!n) return t.encodeBase64Packet(e, r);
            var o = e.data,
              i = new Uint8Array(o),
              s = new Uint8Array(1 + o.byteLength);
            s[0] = f[e.type];
            for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
            return r(s.buffer);
          })(e, n, o);
        if (void 0 !== y && i instanceof y)
          return (function(e, n, r) {
            if (!n) return t.encodeBase64Packet(e, r);
            if (p)
              return (function(e, n, r) {
                if (!n) return t.encodeBase64Packet(e, r);
                var o = new FileReader();
                return (
                  (o.onload = function() {
                    t.encodePacket({ type: e.type, data: o.result }, n, !0, r);
                  }),
                  o.readAsArrayBuffer(e.data)
                );
              })(e, n, r);
            var o = new Uint8Array(1);
            return (o[0] = f[e.type]), r(new y([o.buffer, e.data]));
          })(e, n, o);
        if (i && i.base64)
          return (function(e, n) {
            return n('b' + t.packets[e.type] + e.data.data);
          })(e, o);
        var s = f[e.type];
        return void 0 !== e.data && (s += r ? u.encode(String(e.data), { strict: !1 }) : String(e.data)), o('' + s);
      }),
        (t.encodeBase64Packet = function(e, n) {
          var r,
            o = 'b' + t.packets[e.type];
          if (void 0 !== y && e.data instanceof y) {
            var i = new FileReader();
            return (
              (i.onload = function() {
                var e = i.result.split(',')[1];
                n(o + e);
              }),
              i.readAsDataURL(e.data)
            );
          }
          try {
            r = String.fromCharCode.apply(null, new Uint8Array(e.data));
          } catch (c) {
            for (var s = new Uint8Array(e.data), a = new Array(s.length), u = 0; u < s.length; u++) a[u] = s[u];
            r = String.fromCharCode.apply(null, a);
          }
          return (o += btoa(r)), n(o);
        }),
        (t.decodePacket = function(e, n, r) {
          if (void 0 === e) return h;
          if ('string' == typeof e) {
            if ('b' === e.charAt(0)) return t.decodeBase64Packet(e.substr(1), n);
            if (
              r &&
              !1 ===
                (e = (function(e) {
                  try {
                    e = u.decode(e, { strict: !1 });
                  } catch (t) {
                    return !1;
                  }
                  return e;
                })(e))
            )
              return h;
            var o = e.charAt(0);
            return Number(o) == o && d[o] ? (e.length > 1 ? { type: d[o], data: e.substring(1) } : { type: d[o] }) : h;
          }
          o = new Uint8Array(e)[0];
          var i = s(e, 1);
          return y && 'blob' === n && (i = new y([i])), { type: d[o], data: i };
        }),
        (t.decodeBase64Packet = function(e, t) {
          var n = d[e.charAt(0)];
          if (!r) return { type: n, data: { base64: !0, data: e.substr(1) } };
          var o = r.decode(e.substr(1));
          return 'blob' === t && y && (o = new y([o])), { type: n, data: o };
        }),
        (t.encodePayload = function(e, n, r) {
          'function' == typeof n && ((r = n), (n = null));
          var o = i(e);
          return n && o
            ? y && !p
              ? t.encodePayloadAsBlob(e, r)
              : t.encodePayloadAsArrayBuffer(e, r)
            : e.length
            ? void v(
                e,
                function(e, r) {
                  t.encodePacket(e, !!o && n, !1, function(e) {
                    r(
                      null,
                      (function(e) {
                        return e.length + ':' + e;
                      })(e)
                    );
                  });
                },
                function(e, t) {
                  return r(t.join(''));
                }
              )
            : r('0:');
        }),
        (t.decodePayload = function(e, n, r) {
          if ('string' != typeof e) return t.decodePayloadAsBinary(e, n, r);
          var o;
          if (('function' == typeof n && ((r = n), (n = null)), '' === e)) return r(h, 0, 1);
          for (var i, s, a = '', u = 0, c = e.length; u < c; u++) {
            var l = e.charAt(u);
            if (':' === l) {
              if ('' === a || a != (i = Number(a))) return r(h, 0, 1);
              if (a != (s = e.substr(u + 1, i)).length) return r(h, 0, 1);
              if (s.length) {
                if (((o = t.decodePacket(s, n, !1)), h.type === o.type && h.data === o.data)) return r(h, 0, 1);
                if (!1 === r(o, u + i, c)) return;
              }
              (u += i), (a = '');
            } else a += l;
          }
          return '' !== a ? r(h, 0, 1) : void 0;
        }),
        (t.encodePayloadAsArrayBuffer = function(e, n) {
          if (!e.length) return n(new ArrayBuffer(0));
          v(
            e,
            function(e, n) {
              t.encodePacket(e, !0, !0, function(e) {
                return n(null, e);
              });
            },
            function(e, t) {
              var r = t.reduce(function(e, t) {
                  var n;
                  return e + (n = 'string' == typeof t ? t.length : t.byteLength).toString().length + n + 2;
                }, 0),
                o = new Uint8Array(r),
                i = 0;
              return (
                t.forEach(function(e) {
                  var t = 'string' == typeof e,
                    n = e;
                  if (t) {
                    for (var r = new Uint8Array(e.length), s = 0; s < e.length; s++) r[s] = e.charCodeAt(s);
                    n = r.buffer;
                  }
                  o[i++] = t ? 0 : 1;
                  var a = n.byteLength.toString();
                  for (s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                  for (o[i++] = 255, r = new Uint8Array(n), s = 0; s < r.length; s++) o[i++] = r[s];
                }),
                n(o.buffer)
              );
            }
          );
        }),
        (t.encodePayloadAsBlob = function(e, n) {
          v(
            e,
            function(e, n) {
              t.encodePacket(e, !0, !0, function(e) {
                var t = new Uint8Array(1);
                if (((t[0] = 1), 'string' == typeof e)) {
                  for (var r = new Uint8Array(e.length), o = 0; o < e.length; o++) r[o] = e.charCodeAt(o);
                  (e = r.buffer), (t[0] = 0);
                }
                var i = (e instanceof ArrayBuffer ? e.byteLength : e.size).toString(),
                  s = new Uint8Array(i.length + 1);
                for (o = 0; o < i.length; o++) s[o] = parseInt(i[o]);
                if (((s[i.length] = 255), y)) {
                  var a = new y([t.buffer, s.buffer, e]);
                  n(null, a);
                }
              });
            },
            function(e, t) {
              return n(new y(t));
            }
          );
        }),
        (t.decodePayloadAsBinary = function(e, n, r) {
          'function' == typeof n && ((r = n), (n = null));
          for (var o = e, i = []; o.byteLength > 0; ) {
            for (var a = new Uint8Array(o), u = 0 === a[0], c = '', l = 1; 255 !== a[l]; l++) {
              if (c.length > 310) return r(h, 0, 1);
              c += a[l];
            }
            (o = s(o, 2 + c.length)), (c = parseInt(c));
            var p = s(o, 0, c);
            if (u)
              try {
                p = String.fromCharCode.apply(null, new Uint8Array(p));
              } catch (y) {
                var f = new Uint8Array(p);
                for (p = '', l = 0; l < f.length; l++) p += String.fromCharCode(f[l]);
              }
            i.push(p), (o = s(o, c));
          }
          var d = i.length;
          i.forEach(function(e, o) {
            r(t.decodePacket(e, n, !0), o, d);
          });
        });
    },
    Yvos: function(e, t) {
      e.exports = function(e, t) {
        var n = function() {};
        (n.prototype = t.prototype), (e.prototype = new n()), (e.prototype.constructor = e);
      };
    },
    akSB: function(e, t, n) {
      var r = n('AdPF'),
        o = n('0z79'),
        i = n('Cl5A'),
        s = n('CIKq');
      (t.polling = function(e) {
        var t = !1,
          n = !1,
          s = !1 !== e.jsonp;
        if (global.location) {
          var a = 'https:' === location.protocol,
            u = location.port;
          u || (u = a ? 443 : 80), (t = e.hostname !== location.hostname || u !== e.port), (n = e.secure !== a);
        }
        if (((e.xdomain = t), (e.xscheme = n), 'open' in new r(e) && !e.forceJSONP)) return new o(e);
        if (!s) throw new Error('JSONP disabled');
        return new i(e);
      }),
        (t.websocket = s);
    },
    cD5x: function(e, t, n) {
      var r = n('ojuT'),
        o = n('+SKG'),
        i = Object.prototype.toString,
        s = 'function' == typeof global.Blob || '[object BlobConstructor]' === i.call(global.Blob),
        a = 'function' == typeof global.File || '[object FileConstructor]' === i.call(global.File);
      (t.deconstructPacket = function(e) {
        var t = [],
          n = e;
        return (
          (n.data = (function e(t, n) {
            if (!t) return t;
            if (o(t)) {
              var i = { _placeholder: !0, num: n.length };
              return n.push(t), i;
            }
            if (r(t)) {
              for (var s = new Array(t.length), a = 0; a < t.length; a++) s[a] = e(t[a], n);
              return s;
            }
            if ('object' == typeof t && !(t instanceof Date)) {
              for (var u in ((s = {}), t)) s[u] = e(t[u], n);
              return s;
            }
            return t;
          })(e.data, t)),
          (n.attachments = t.length),
          { packet: n, buffers: t }
        );
      }),
        (t.reconstructPacket = function(e, t) {
          return (
            (e.data = (function e(t, n) {
              if (!t) return t;
              if (t && t._placeholder) return n[t.num];
              if (r(t)) for (var o = 0; o < t.length; o++) t[o] = e(t[o], n);
              else if ('object' == typeof t) for (var i in t) t[i] = e(t[i], n);
              return t;
            })(e.data, t)),
            (e.attachments = void 0),
            e
          );
        }),
        (t.removeBlobs = function(e, t) {
          var n = 0,
            i = e;
          !(function e(u, c, l) {
            if (!u) return u;
            if ((s && u instanceof Blob) || (a && u instanceof File)) {
              n++;
              var p = new FileReader();
              (p.onload = function() {
                l ? (l[c] = this.result) : (i = this.result), --n || t(i);
              }),
                p.readAsArrayBuffer(u);
            } else if (r(u)) for (var f = 0; f < u.length; f++) e(u[f], f, u);
            else if ('object' == typeof u && !o(u)) for (var d in u) e(u[d], d, u);
          })(i),
            n || t(i);
        });
    },
    cpc2: function(e, t, n) {
      function r(e) {
        if (e)
          return (function(e) {
            for (var t in r.prototype) e[t] = r.prototype[t];
            return e;
          })(e);
      }
      (e.exports = r),
        (r.prototype.on = r.prototype.addEventListener = function(e, t) {
          return (this._callbacks = this._callbacks || {}), (this._callbacks['$' + e] = this._callbacks['$' + e] || []).push(t), this;
        }),
        (r.prototype.once = function(e, t) {
          function n() {
            this.off(e, n), t.apply(this, arguments);
          }
          return (n.fn = t), this.on(e, n), this;
        }),
        (r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(e, t) {
          if (((this._callbacks = this._callbacks || {}), 0 == arguments.length)) return (this._callbacks = {}), this;
          var n,
            r = this._callbacks['$' + e];
          if (!r) return this;
          if (1 == arguments.length) return delete this._callbacks['$' + e], this;
          for (var o = 0; o < r.length; o++)
            if ((n = r[o]) === t || n.fn === t) {
              r.splice(o, 1);
              break;
            }
          return this;
        }),
        (r.prototype.emit = function(e) {
          this._callbacks = this._callbacks || {};
          var t = [].slice.call(arguments, 1),
            n = this._callbacks['$' + e];
          if (n) for (var r = 0, o = (n = n.slice(0)).length; r < o; ++r) n[r].apply(this, t);
          return this;
        }),
        (r.prototype.listeners = function(e) {
          return (this._callbacks = this._callbacks || {}), this._callbacks['$' + e] || [];
        }),
        (r.prototype.hasListeners = function(e) {
          return !!this.listeners(e).length;
        });
    },
    crnd: function(e, t) {
      function n(e) {
        return Promise.resolve().then(function() {
          var t = new Error("Cannot find module '" + e + "'");
          throw ((t.code = 'MODULE_NOT_FOUND'), t);
        });
      }
      (n.keys = function() {
        return [];
      }),
        (n.resolve = n),
        (e.exports = n),
        (n.id = 'crnd');
    },
    'dkv/': function(e, t) {
      e.exports =
        Object.keys ||
        function(e) {
          var t = [],
            n = Object.prototype.hasOwnProperty;
          for (var r in e) n.call(e, r) && t.push(r);
          return t;
        };
    },
    eOtv: function(e, t, n) {
      var r = n('lKxJ'),
        o = n('KFGy'),
        i = n('cpc2'),
        s = n('Vo14'),
        a = n('2Dig'),
        u = n('QN7Q'),
        c = n('x7D4')('socket.io-client:manager'),
        l = n('7jRU'),
        p = n('C2QD'),
        f = Object.prototype.hasOwnProperty;
      function d(e, t) {
        if (!(this instanceof d)) return new d(e, t);
        e && 'object' == typeof e && ((t = e), (e = void 0)),
          ((t = t || {}).path = t.path || '/socket.io'),
          (this.nsps = {}),
          (this.subs = []),
          (this.opts = t),
          this.reconnection(!1 !== t.reconnection),
          this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0),
          this.reconnectionDelay(t.reconnectionDelay || 1e3),
          this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3),
          this.randomizationFactor(t.randomizationFactor || 0.5),
          (this.backoff = new p({ min: this.reconnectionDelay(), max: this.reconnectionDelayMax(), jitter: this.randomizationFactor() })),
          this.timeout(null == t.timeout ? 2e4 : t.timeout),
          (this.readyState = 'closed'),
          (this.uri = e),
          (this.connecting = []),
          (this.lastPing = null),
          (this.encoding = !1),
          (this.packetBuffer = []);
        var n = t.parser || s;
        (this.encoder = new n.Encoder()),
          (this.decoder = new n.Decoder()),
          (this.autoConnect = !1 !== t.autoConnect),
          this.autoConnect && this.open();
      }
      (e.exports = d),
        (d.prototype.emitAll = function() {
          for (var e in (this.emit.apply(this, arguments), this.nsps))
            f.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments);
        }),
        (d.prototype.updateSocketIds = function() {
          for (var e in this.nsps) f.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e));
        }),
        (d.prototype.generateId = function(e) {
          return ('/' === e ? '' : e + '#') + this.engine.id;
        }),
        i(d.prototype),
        (d.prototype.reconnection = function(e) {
          return arguments.length ? ((this._reconnection = !!e), this) : this._reconnection;
        }),
        (d.prototype.reconnectionAttempts = function(e) {
          return arguments.length ? ((this._reconnectionAttempts = e), this) : this._reconnectionAttempts;
        }),
        (d.prototype.reconnectionDelay = function(e) {
          return arguments.length ? ((this._reconnectionDelay = e), this.backoff && this.backoff.setMin(e), this) : this._reconnectionDelay;
        }),
        (d.prototype.randomizationFactor = function(e) {
          return arguments.length
            ? ((this._randomizationFactor = e), this.backoff && this.backoff.setJitter(e), this)
            : this._randomizationFactor;
        }),
        (d.prototype.reconnectionDelayMax = function(e) {
          return arguments.length
            ? ((this._reconnectionDelayMax = e), this.backoff && this.backoff.setMax(e), this)
            : this._reconnectionDelayMax;
        }),
        (d.prototype.timeout = function(e) {
          return arguments.length ? ((this._timeout = e), this) : this._timeout;
        }),
        (d.prototype.maybeReconnectOnOpen = function() {
          !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
        }),
        (d.prototype.open = d.prototype.connect = function(e, t) {
          if ((c('readyState %s', this.readyState), ~this.readyState.indexOf('open'))) return this;
          c('opening %s', this.uri), (this.engine = r(this.uri, this.opts));
          var n = this.engine,
            o = this;
          (this.readyState = 'opening'), (this.skipReconnect = !1);
          var i = a(n, 'open', function() {
              o.onopen(), e && e();
            }),
            s = a(n, 'error', function(t) {
              if ((c('connect_error'), o.cleanup(), (o.readyState = 'closed'), o.emitAll('connect_error', t), e)) {
                var n = new Error('Connection error');
                (n.data = t), e(n);
              } else o.maybeReconnectOnOpen();
            });
          if (!1 !== this._timeout) {
            var u = this._timeout;
            c('connect attempt will timeout after %d', u);
            var l = setTimeout(function() {
              c('connect attempt timed out after %d', u),
                i.destroy(),
                n.close(),
                n.emit('error', 'timeout'),
                o.emitAll('connect_timeout', u);
            }, u);
            this.subs.push({
              destroy: function() {
                clearTimeout(l);
              }
            });
          }
          return this.subs.push(i), this.subs.push(s), this;
        }),
        (d.prototype.onopen = function() {
          c('open'), this.cleanup(), (this.readyState = 'open'), this.emit('open');
          var e = this.engine;
          this.subs.push(a(e, 'data', u(this, 'ondata'))),
            this.subs.push(a(e, 'ping', u(this, 'onping'))),
            this.subs.push(a(e, 'pong', u(this, 'onpong'))),
            this.subs.push(a(e, 'error', u(this, 'onerror'))),
            this.subs.push(a(e, 'close', u(this, 'onclose'))),
            this.subs.push(a(this.decoder, 'decoded', u(this, 'ondecoded')));
        }),
        (d.prototype.onping = function() {
          (this.lastPing = new Date()), this.emitAll('ping');
        }),
        (d.prototype.onpong = function() {
          this.emitAll('pong', new Date() - this.lastPing);
        }),
        (d.prototype.ondata = function(e) {
          this.decoder.add(e);
        }),
        (d.prototype.ondecoded = function(e) {
          this.emit('packet', e);
        }),
        (d.prototype.onerror = function(e) {
          c('error', e), this.emitAll('error', e);
        }),
        (d.prototype.socket = function(e, t) {
          var n = this.nsps[e];
          if (!n) {
            (n = new o(this, e, t)), (this.nsps[e] = n);
            var r = this;
            n.on('connecting', i),
              n.on('connect', function() {
                n.id = r.generateId(e);
              }),
              this.autoConnect && i();
          }
          function i() {
            ~l(r.connecting, n) || r.connecting.push(n);
          }
          return n;
        }),
        (d.prototype.destroy = function(e) {
          var t = l(this.connecting, e);
          ~t && this.connecting.splice(t, 1), this.connecting.length || this.close();
        }),
        (d.prototype.packet = function(e) {
          c('writing packet %j', e);
          var t = this;
          e.query && 0 === e.type && (e.nsp += '?' + e.query),
            t.encoding
              ? t.packetBuffer.push(e)
              : ((t.encoding = !0),
                this.encoder.encode(e, function(n) {
                  for (var r = 0; r < n.length; r++) t.engine.write(n[r], e.options);
                  (t.encoding = !1), t.processPacketQueue();
                }));
        }),
        (d.prototype.processPacketQueue = function() {
          if (this.packetBuffer.length > 0 && !this.encoding) {
            var e = this.packetBuffer.shift();
            this.packet(e);
          }
        }),
        (d.prototype.cleanup = function() {
          c('cleanup');
          for (var e = this.subs.length, t = 0; t < e; t++) this.subs.shift().destroy();
          (this.packetBuffer = []), (this.encoding = !1), (this.lastPing = null), this.decoder.destroy();
        }),
        (d.prototype.close = d.prototype.disconnect = function() {
          c('disconnect'),
            (this.skipReconnect = !0),
            (this.reconnecting = !1),
            'opening' === this.readyState && this.cleanup(),
            this.backoff.reset(),
            (this.readyState = 'closed'),
            this.engine && this.engine.close();
        }),
        (d.prototype.onclose = function(e) {
          c('onclose'),
            this.cleanup(),
            this.backoff.reset(),
            (this.readyState = 'closed'),
            this.emit('close', e),
            this._reconnection && !this.skipReconnect && this.reconnect();
        }),
        (d.prototype.reconnect = function() {
          if (this.reconnecting || this.skipReconnect) return this;
          var e = this;
          if (this.backoff.attempts >= this._reconnectionAttempts)
            c('reconnect failed'), this.backoff.reset(), this.emitAll('reconnect_failed'), (this.reconnecting = !1);
          else {
            var t = this.backoff.duration();
            c('will wait %dms before reconnect attempt', t), (this.reconnecting = !0);
            var n = setTimeout(function() {
              e.skipReconnect ||
                (c('attempting reconnect'),
                e.emitAll('reconnect_attempt', e.backoff.attempts),
                e.emitAll('reconnecting', e.backoff.attempts),
                e.skipReconnect ||
                  e.open(function(t) {
                    t
                      ? (c('reconnect attempt error'), (e.reconnecting = !1), e.reconnect(), e.emitAll('reconnect_error', t.data))
                      : (c('reconnect success'), e.onreconnect());
                  }));
            }, t);
            this.subs.push({
              destroy: function() {
                clearTimeout(n);
              }
            });
          }
        }),
        (d.prototype.onreconnect = function() {
          var e = this.backoff.attempts;
          (this.reconnecting = !1), this.backoff.reset(), this.updateSocketIds(), this.emitAll('reconnect', e);
        });
    },
    g5Dd: function(e, t) {
      !(function() {
        'use strict';
        for (var e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', n = new Uint8Array(256), r = 0; r < e.length; r++)
          n[e.charCodeAt(r)] = r;
        (t.encode = function(t) {
          var n,
            r = new Uint8Array(t),
            o = r.length,
            i = '';
          for (n = 0; n < o; n += 3)
            (i += e[r[n] >> 2]),
              (i += e[((3 & r[n]) << 4) | (r[n + 1] >> 4)]),
              (i += e[((15 & r[n + 1]) << 2) | (r[n + 2] >> 6)]),
              (i += e[63 & r[n + 2]]);
          return o % 3 == 2 ? (i = i.substring(0, i.length - 1) + '=') : o % 3 == 1 && (i = i.substring(0, i.length - 2) + '=='), i;
        }),
          (t.decode = function(e) {
            var t,
              r,
              o,
              i,
              s,
              a = 0.75 * e.length,
              u = e.length,
              c = 0;
            '=' === e[e.length - 1] && (a--, '=' === e[e.length - 2] && a--);
            var l = new ArrayBuffer(a),
              p = new Uint8Array(l);
            for (t = 0; t < u; t += 4)
              (r = n[e.charCodeAt(t)]),
                (o = n[e.charCodeAt(t + 1)]),
                (i = n[e.charCodeAt(t + 2)]),
                (s = n[e.charCodeAt(t + 3)]),
                (p[c++] = (r << 2) | (o >> 4)),
                (p[c++] = ((15 & o) << 4) | (i >> 2)),
                (p[c++] = ((3 & i) << 6) | (63 & s));
            return l;
          });
      })();
    },
    gFX4: function(e, t, n) {
      var r = n('zJ60'),
        o = n('Vo14'),
        i = n('eOtv'),
        s = n('x7D4')('socket.io-client');
      e.exports = t = u;
      var a = (t.managers = {});
      function u(e, t) {
        'object' == typeof e && ((t = e), (e = void 0)), (t = t || {});
        var n,
          o = r(e),
          u = o.source,
          c = o.id;
        return (
          t.forceNew || t['force new connection'] || !1 === t.multiplex || (a[c] && o.path in a[c].nsps)
            ? (s('ignoring socket cache for %s', u), (n = i(u, t)))
            : (a[c] || (s('new io instance for %s', u), (a[c] = i(u, t))), (n = a[c])),
          o.query && !t.query && (t.query = o.query),
          n.socket(o.path, t)
        );
      }
      (t.protocol = o.protocol), (t.connect = u), (t.Manager = n('eOtv')), (t.Socket = n('KFGy'));
    },
    kSER: function(e, t) {
      e.exports = function(e, t) {
        for (var n = [], r = (t = t || 0) || 0; r < e.length; r++) n[r - t] = e[r];
        return n;
      };
    },
    lKxJ: function(e, t, n) {
      (e.exports = n('2pII')), (e.exports.parser = n('Wm4p'));
    },
    lhf0: function(e, t, n) {
      function r(e) {
        var n;
        function r() {
          if (r.enabled) {
            var e = r,
              o = +new Date();
            (e.diff = o - (n || o)), (e.prev = n), (e.curr = o), (n = o);
            for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
            (i[0] = t.coerce(i[0])), 'string' != typeof i[0] && i.unshift('%O');
            var a = 0;
            (i[0] = i[0].replace(/%([a-zA-Z%])/g, function(n, r) {
              if ('%%' === n) return n;
              a++;
              var o = t.formatters[r];
              return 'function' == typeof o && ((n = o.call(e, i[a])), i.splice(a, 1), a--), n;
            })),
              t.formatArgs.call(e, i),
              (r.log || t.log || console.log.bind(console)).apply(e, i);
          }
        }
        return (
          (r.namespace = e),
          (r.enabled = t.enabled(e)),
          (r.useColors = t.useColors()),
          (r.color = (function(e) {
            var n,
              r = 0;
            for (n in e) (r = (r << 5) - r + e.charCodeAt(n)), (r |= 0);
            return t.colors[Math.abs(r) % t.colors.length];
          })(e)),
          (r.destroy = o),
          'function' == typeof t.init && t.init(r),
          t.instances.push(r),
          r
        );
      }
      function o() {
        var e = t.instances.indexOf(this);
        return -1 !== e && (t.instances.splice(e, 1), !0);
      }
      ((t = e.exports = r.debug = r.default = r).coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e;
      }),
        (t.disable = function() {
          t.enable('');
        }),
        (t.enable = function(e) {
          var n;
          t.save(e), (t.names = []), (t.skips = []);
          var r = ('string' == typeof e ? e : '').split(/[\s,]+/),
            o = r.length;
          for (n = 0; n < o; n++)
            r[n] &&
              ('-' === (e = r[n].replace(/\*/g, '.*?'))[0]
                ? t.skips.push(new RegExp('^' + e.substr(1) + '$'))
                : t.names.push(new RegExp('^' + e + '$')));
          for (n = 0; n < t.instances.length; n++) {
            var i = t.instances[n];
            i.enabled = t.enabled(i.namespace);
          }
        }),
        (t.enabled = function(e) {
          if ('*' === e[e.length - 1]) return !0;
          var n, r;
          for (n = 0, r = t.skips.length; n < r; n++) if (t.skips[n].test(e)) return !1;
          for (n = 0, r = t.names.length; n < r; n++) if (t.names[n].test(e)) return !0;
          return !1;
        }),
        (t.humanize = n('FGiv')),
        (t.instances = []),
        (t.names = []),
        (t.skips = []),
        (t.formatters = {});
    },
    'oIG/': function(e, t) {
      var n,
        r,
        o,
        i = String.fromCharCode;
      function s(e) {
        for (var t, n, r = [], o = 0, i = e.length; o < i; )
          (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i
            ? 56320 == (64512 & (n = e.charCodeAt(o++)))
              ? r.push(((1023 & t) << 10) + (1023 & n) + 65536)
              : (r.push(t), o--)
            : r.push(t);
        return r;
      }
      function a(e, t) {
        if (e >= 55296 && e <= 57343) {
          if (t) throw Error('Lone surrogate U+' + e.toString(16).toUpperCase() + ' is not a scalar value');
          return !1;
        }
        return !0;
      }
      function u(e, t) {
        return i(((e >> t) & 63) | 128);
      }
      function c(e, t) {
        if (0 == (4294967168 & e)) return i(e);
        var n = '';
        return (
          0 == (4294965248 & e)
            ? (n = i(((e >> 6) & 31) | 192))
            : 0 == (4294901760 & e)
            ? (a(e, t) || (e = 65533), (n = i(((e >> 12) & 15) | 224)), (n += u(e, 6)))
            : 0 == (4292870144 & e) && ((n = i(((e >> 18) & 7) | 240)), (n += u(e, 12)), (n += u(e, 6))),
          n + i((63 & e) | 128)
        );
      }
      function l() {
        if (o >= r) throw Error('Invalid byte index');
        var e = 255 & n[o];
        if ((o++, 128 == (192 & e))) return 63 & e;
        throw Error('Invalid continuation byte');
      }
      function p(e) {
        var t, i;
        if (o > r) throw Error('Invalid byte index');
        if (o == r) return !1;
        if (((t = 255 & n[o]), o++, 0 == (128 & t))) return t;
        if (192 == (224 & t)) {
          if ((i = ((31 & t) << 6) | l()) >= 128) return i;
          throw Error('Invalid continuation byte');
        }
        if (224 == (240 & t)) {
          if ((i = ((15 & t) << 12) | (l() << 6) | l()) >= 2048) return a(i, e) ? i : 65533;
          throw Error('Invalid continuation byte');
        }
        if (240 == (248 & t) && (i = ((7 & t) << 18) | (l() << 12) | (l() << 6) | l()) >= 65536 && i <= 1114111) return i;
        throw Error('Invalid UTF-8 detected');
      }
      e.exports = {
        version: '2.1.2',
        encode: function(e, t) {
          for (var n = !1 !== (t = t || {}).strict, r = s(e), o = r.length, i = -1, a = ''; ++i < o; ) a += c(r[i], n);
          return a;
        },
        decode: function(e, t) {
          var a = !1 !== (t = t || {}).strict;
          (n = s(e)), (r = n.length), (o = 0);
          for (var u, c = []; !1 !== (u = p(a)); ) c.push(u);
          return (function(e) {
            for (var t, n = e.length, r = -1, o = ''; ++r < n; )
              (t = e[r]) > 65535 && ((o += i((((t -= 65536) >>> 10) & 1023) | 55296)), (t = 56320 | (1023 & t))), (o += i(t));
            return o;
          })(c);
        }
      };
    },
    ojuT: function(e, t) {
      var n = {}.toString;
      e.exports =
        Array.isArray ||
        function(e) {
          return '[object Array]' == n.call(e);
        };
    },
    x7D4: function(e, t, n) {
      function r() {
        var e;
        try {
          e = t.storage.debug;
        } catch (n) {}
        return !e && 'undefined' != typeof process && 'env' in process && (e = process.env.DEBUG), e;
      }
      ((t = e.exports = n('Q80o')).log = function() {
        return 'object' == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
      }),
        (t.formatArgs = function(e) {
          var n = this.useColors;
          if (((e[0] = (n ? '%c' : '') + this.namespace + (n ? ' %c' : ' ') + e[0] + (n ? '%c ' : ' ') + '+' + t.humanize(this.diff)), n)) {
            var r = 'color: ' + this.color;
            e.splice(1, 0, r, 'color: inherit');
            var o = 0,
              i = 0;
            e[0].replace(/%[a-zA-Z%]/g, function(e) {
              '%%' !== e && (o++, '%c' === e && (i = o));
            }),
              e.splice(i, 0, r);
          }
        }),
        (t.save = function(e) {
          try {
            null == e ? t.storage.removeItem('debug') : (t.storage.debug = e);
          } catch (n) {}
        }),
        (t.load = r),
        (t.useColors = function() {
          return (
            !('undefined' == typeof window || !window.process || 'renderer' !== window.process.type) ||
            (('undefined' == typeof navigator ||
              !navigator.userAgent ||
              !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) &&
              (('undefined' != typeof document &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
                ('undefined' != typeof window &&
                  window.console &&
                  (window.console.firebug || (window.console.exception && window.console.table))) ||
                ('undefined' != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                ('undefined' != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))))
          );
        }),
        (t.storage =
          'undefined' != typeof chrome && void 0 !== chrome.storage
            ? chrome.storage.local
            : (function() {
                try {
                  return window.localStorage;
                } catch (e) {}
              })()),
        (t.colors = [
          '#0000CC',
          '#0000FF',
          '#0033CC',
          '#0033FF',
          '#0066CC',
          '#0066FF',
          '#0099CC',
          '#0099FF',
          '#00CC00',
          '#00CC33',
          '#00CC66',
          '#00CC99',
          '#00CCCC',
          '#00CCFF',
          '#3300CC',
          '#3300FF',
          '#3333CC',
          '#3333FF',
          '#3366CC',
          '#3366FF',
          '#3399CC',
          '#3399FF',
          '#33CC00',
          '#33CC33',
          '#33CC66',
          '#33CC99',
          '#33CCCC',
          '#33CCFF',
          '#6600CC',
          '#6600FF',
          '#6633CC',
          '#6633FF',
          '#66CC00',
          '#66CC33',
          '#9900CC',
          '#9900FF',
          '#9933CC',
          '#9933FF',
          '#99CC00',
          '#99CC33',
          '#CC0000',
          '#CC0033',
          '#CC0066',
          '#CC0099',
          '#CC00CC',
          '#CC00FF',
          '#CC3300',
          '#CC3333',
          '#CC3366',
          '#CC3399',
          '#CC33CC',
          '#CC33FF',
          '#CC6600',
          '#CC6633',
          '#CC9900',
          '#CC9933',
          '#CCCC00',
          '#CCCC33',
          '#FF0000',
          '#FF0033',
          '#FF0066',
          '#FF0099',
          '#FF00CC',
          '#FF00FF',
          '#FF3300',
          '#FF3333',
          '#FF3366',
          '#FF3399',
          '#FF33CC',
          '#FF33FF',
          '#FF6600',
          '#FF6633',
          '#FF9900',
          '#FF9933',
          '#FFCC00',
          '#FFCC33'
        ]),
        (t.formatters.j = function(e) {
          try {
            return JSON.stringify(e);
          } catch (t) {
            return '[UnexpectedJSONParseError]: ' + t.message;
          }
        }),
        t.enable(r());
    },
    yeub: function(e, t) {
      try {
        e.exports = 'undefined' != typeof XMLHttpRequest && 'withCredentials' in new XMLHttpRequest();
      } catch (n) {
        e.exports = !1;
      }
    },
    ypnn: function(e, t) {
      e.exports = function(e, t, n) {
        var r = e.byteLength;
        if (((t = t || 0), (n = n || r), e.slice)) return e.slice(t, n);
        if ((t < 0 && (t += r), n < 0 && (n += r), n > r && (n = r), t >= r || t >= n || 0 === r)) return new ArrayBuffer(0);
        for (var o = new Uint8Array(e), i = new Uint8Array(n - t), s = t, a = 0; s < n; s++, a++) i[a] = o[s];
        return i.buffer;
      };
    },
    zJ60: function(e, t, n) {
      var r = n('Uxeu'),
        o = n('x7D4')('socket.io-client:url');
      e.exports = function(e, t) {
        var n = e;
        (t = t || global.location),
          null == e && (e = t.protocol + '//' + t.host),
          'string' == typeof e &&
            ('/' === e.charAt(0) && (e = '/' === e.charAt(1) ? t.protocol + e : t.host + e),
            /^(https?|wss?):\/\//.test(e) || (o('protocol-less url %s', e), (e = void 0 !== t ? t.protocol + '//' + e : 'https://' + e)),
            o('parse %s', e),
            (n = r(e))),
          n.port || (/^(http|ws)$/.test(n.protocol) ? (n.port = '80') : /^(http|ws)s$/.test(n.protocol) && (n.port = '443')),
          (n.path = n.path || '/');
        var i = -1 !== n.host.indexOf(':') ? '[' + n.host + ']' : n.host;
        return (
          (n.id = n.protocol + '://' + i + ':' + n.port),
          (n.href = n.protocol + '://' + i + (t && t.port === n.port ? '' : ':' + n.port)),
          n
        );
      };
    },
    zMFY: function(e, t) {
      function n() {}
      e.exports = function(e, t, r) {
        var o = !1;
        return (r = r || n), (i.count = e), 0 === e ? t() : i;
        function i(e, n) {
          if (i.count <= 0) throw new Error('after called too many times');
          --i.count, e ? ((o = !0), t(e), (t = r)) : 0 !== i.count || o || t(null, n);
        }
      };
    },
    zUnb: function(e, t, n) {
      'use strict';
      n.r(t);
      var r = function(e, t) {
        return (r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, t) {
              e.__proto__ = t;
            }) ||
          function(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          })(e, t);
      };
      function o(e, t) {
        function n() {
          this.constructor = e;
        }
        r(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
      }
      var i = function() {
        return (i =
          Object.assign ||
          function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          }).apply(this, arguments);
      };
      function s(e, t, n, r) {
        var o,
          i = arguments.length,
          s = i < 3 ? t : null === r ? (r = Object.getOwnPropertyDescriptor(t, n)) : r;
        if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
        else for (var a = e.length - 1; a >= 0; a--) (o = e[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, n, s) : o(t, n)) || s);
        return i > 3 && s && Object.defineProperty(t, n, s), s;
      }
      function a(e, t) {
        if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata) return Reflect.metadata(e, t);
      }
      function u(e) {
        var t = 'function' == typeof Symbol && e[Symbol.iterator],
          n = 0;
        return t
          ? t.call(e)
          : {
              next: function() {
                return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
              }
            };
      }
      function c(e, t) {
        var n = 'function' == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r,
          o,
          i = n.call(e),
          s = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; ) s.push(r.value);
        } catch (a) {
          o = { error: a };
        } finally {
          try {
            r && !r.done && (n = i.return) && n.call(i);
          } finally {
            if (o) throw o.error;
          }
        }
        return s;
      }
      function l() {
        for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(c(arguments[t]));
        return e;
      }
      var p =
        Array.isArray ||
        function(e) {
          return e && 'number' == typeof e.length;
        };
      function f(e) {
        return null != e && 'object' == typeof e;
      }
      function d(e) {
        return 'function' == typeof e;
      }
      var h,
        y = { e: {} };
      function v() {
        try {
          return h.apply(this, arguments);
        } catch (e) {
          return (y.e = e), y;
        }
      }
      function g(e) {
        return (h = e), v;
      }
      function m(e) {
        return (
          Error.call(this),
          (this.message = e
            ? e.length +
              ' errors occurred during unsubscription:\n' +
              e
                .map(function(e, t) {
                  return t + 1 + ') ' + e.toString();
                })
                .join('\n  ')
            : ''),
          (this.name = 'UnsubscriptionError'),
          (this.errors = e),
          this
        );
      }
      m.prototype = Object.create(Error.prototype);
      var b = m,
        w = (function() {
          function e(e) {
            (this.closed = !1), (this._parent = null), (this._parents = null), (this._subscriptions = null), e && (this._unsubscribe = e);
          }
          var t;
          return (
            (e.prototype.unsubscribe = function() {
              var e,
                t = !1;
              if (!this.closed) {
                var n = this._parent,
                  r = this._parents,
                  o = this._unsubscribe,
                  i = this._subscriptions;
                (this.closed = !0), (this._parent = null), (this._parents = null), (this._subscriptions = null);
                for (var s = -1, a = r ? r.length : 0; n; ) n.remove(this), (n = (++s < a && r[s]) || null);
                if ((d(o) && g(o).call(this) === y && ((t = !0), (e = e || (y.e instanceof b ? _(y.e.errors) : [y.e]))), p(i)))
                  for (s = -1, a = i.length; ++s < a; ) {
                    var u = i[s];
                    if (f(u) && g(u.unsubscribe).call(u) === y) {
                      (t = !0), (e = e || []);
                      var c = y.e;
                      c instanceof b ? (e = e.concat(_(c.errors))) : e.push(c);
                    }
                  }
                if (t) throw new b(e);
              }
            }),
            (e.prototype.add = function(t) {
              if (!t || t === e.EMPTY) return e.EMPTY;
              if (t === this) return this;
              var n = t;
              switch (typeof t) {
                case 'function':
                  n = new e(t);
                case 'object':
                  if (n.closed || 'function' != typeof n.unsubscribe) return n;
                  if (this.closed) return n.unsubscribe(), n;
                  if ('function' != typeof n._addParent) {
                    var r = n;
                    (n = new e())._subscriptions = [r];
                  }
                  break;
                default:
                  throw new Error('unrecognized teardown ' + t + ' added to Subscription.');
              }
              return (this._subscriptions || (this._subscriptions = [])).push(n), n._addParent(this), n;
            }),
            (e.prototype.remove = function(e) {
              var t = this._subscriptions;
              if (t) {
                var n = t.indexOf(e);
                -1 !== n && t.splice(n, 1);
              }
            }),
            (e.prototype._addParent = function(e) {
              var t = this._parent,
                n = this._parents;
              t && t !== e ? (n ? -1 === n.indexOf(e) && n.push(e) : (this._parents = [e])) : (this._parent = e);
            }),
            (e.EMPTY = (((t = new e()).closed = !0), t)),
            e
          );
        })();
      function _(e) {
        return e.reduce(function(e, t) {
          return e.concat(t instanceof b ? t.errors : t);
        }, []);
      }
      var C = !1,
        x = {
          Promise: void 0,
          set useDeprecatedSynchronousErrorHandling(e) {
            C = e;
          },
          get useDeprecatedSynchronousErrorHandling() {
            return C;
          }
        };
      function k(e) {
        setTimeout(function() {
          throw e;
        });
      }
      var E = {
          closed: !0,
          next: function(e) {},
          error: function(e) {
            if (x.useDeprecatedSynchronousErrorHandling) throw e;
            k(e);
          },
          complete: function() {}
        },
        T = 'function' == typeof Symbol ? Symbol('rxSubscriber') : '@@rxSubscriber_' + Math.random(),
        S = (function(e) {
          function t(n, r, o) {
            var i = e.call(this) || this;
            switch (
              ((i.syncErrorValue = null),
              (i.syncErrorThrown = !1),
              (i.syncErrorThrowable = !1),
              (i.isStopped = !1),
              (i._parentSubscription = null),
              arguments.length)
            ) {
              case 0:
                i.destination = E;
                break;
              case 1:
                if (!n) {
                  i.destination = E;
                  break;
                }
                if ('object' == typeof n) {
                  n instanceof t
                    ? ((i.syncErrorThrowable = n.syncErrorThrowable), (i.destination = n), n.add(i))
                    : ((i.syncErrorThrowable = !0), (i.destination = new A(i, n)));
                  break;
                }
              default:
                (i.syncErrorThrowable = !0), (i.destination = new A(i, n, r, o));
            }
            return i;
          }
          return (
            o(t, e),
            (t.prototype[T] = function() {
              return this;
            }),
            (t.create = function(e, n, r) {
              var o = new t(e, n, r);
              return (o.syncErrorThrowable = !1), o;
            }),
            (t.prototype.next = function(e) {
              this.isStopped || this._next(e);
            }),
            (t.prototype.error = function(e) {
              this.isStopped || ((this.isStopped = !0), this._error(e));
            }),
            (t.prototype.complete = function() {
              this.isStopped || ((this.isStopped = !0), this._complete());
            }),
            (t.prototype.unsubscribe = function() {
              this.closed || ((this.isStopped = !0), e.prototype.unsubscribe.call(this));
            }),
            (t.prototype._next = function(e) {
              this.destination.next(e);
            }),
            (t.prototype._error = function(e) {
              this.destination.error(e), this.unsubscribe();
            }),
            (t.prototype._complete = function() {
              this.destination.complete(), this.unsubscribe();
            }),
            (t.prototype._unsubscribeAndRecycle = function() {
              var e = this._parent,
                t = this._parents;
              return (
                (this._parent = null),
                (this._parents = null),
                this.unsubscribe(),
                (this.closed = !1),
                (this.isStopped = !1),
                (this._parent = e),
                (this._parents = t),
                (this._parentSubscription = null),
                this
              );
            }),
            t
          );
        })(w),
        A = (function(e) {
          function t(t, n, r, o) {
            var i,
              s = e.call(this) || this;
            s._parentSubscriber = t;
            var a = s;
            return (
              d(n)
                ? (i = n)
                : n &&
                  ((i = n.next),
                  (r = n.error),
                  (o = n.complete),
                  n !== E &&
                    (d((a = Object.create(n)).unsubscribe) && s.add(a.unsubscribe.bind(a)), (a.unsubscribe = s.unsubscribe.bind(s)))),
              (s._context = a),
              (s._next = i),
              (s._error = r),
              (s._complete = o),
              s
            );
          }
          return (
            o(t, e),
            (t.prototype.next = function(e) {
              if (!this.isStopped && this._next) {
                var t = this._parentSubscriber;
                x.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                  ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe()
                  : this.__tryOrUnsub(this._next, e);
              }
            }),
            (t.prototype.error = function(e) {
              if (!this.isStopped) {
                var t = this._parentSubscriber,
                  n = x.useDeprecatedSynchronousErrorHandling;
                if (this._error)
                  n && t.syncErrorThrowable
                    ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe())
                    : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
                else if (t.syncErrorThrowable) n ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0)) : k(e), this.unsubscribe();
                else {
                  if ((this.unsubscribe(), n)) throw e;
                  k(e);
                }
              }
            }),
            (t.prototype.complete = function() {
              var e = this;
              if (!this.isStopped) {
                var t = this._parentSubscriber;
                if (this._complete) {
                  var n = function() {
                    return e._complete.call(e._context);
                  };
                  x.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                    ? (this.__tryOrSetError(t, n), this.unsubscribe())
                    : (this.__tryOrUnsub(n), this.unsubscribe());
                } else this.unsubscribe();
              }
            }),
            (t.prototype.__tryOrUnsub = function(e, t) {
              try {
                e.call(this._context, t);
              } catch (n) {
                if ((this.unsubscribe(), x.useDeprecatedSynchronousErrorHandling)) throw n;
                k(n);
              }
            }),
            (t.prototype.__tryOrSetError = function(e, t, n) {
              if (!x.useDeprecatedSynchronousErrorHandling) throw new Error('bad call');
              try {
                t.call(this._context, n);
              } catch (r) {
                return x.useDeprecatedSynchronousErrorHandling ? ((e.syncErrorValue = r), (e.syncErrorThrown = !0), !0) : (k(r), !0);
              }
              return !1;
            }),
            (t.prototype._unsubscribe = function() {
              var e = this._parentSubscriber;
              (this._context = null), (this._parentSubscriber = null), e.unsubscribe();
            }),
            t
          );
        })(S),
        I = ('function' == typeof Symbol && Symbol.observable) || '@@observable';
      function N() {}
      var O = (function() {
        function e(e) {
          (this._isScalar = !1), e && (this._subscribe = e);
        }
        return (
          (e.prototype.lift = function(t) {
            var n = new e();
            return (n.source = this), (n.operator = t), n;
          }),
          (e.prototype.subscribe = function(e, t, n) {
            var r = this.operator,
              o = (function(e, t, n) {
                if (e) {
                  if (e instanceof S) return e;
                  if (e[T]) return e[T]();
                }
                return e || t || n ? new S(e, t, n) : new S(E);
              })(e, t, n);
            if (
              (r
                ? r.call(o, this.source)
                : o.add(
                    this.source || (x.useDeprecatedSynchronousErrorHandling && !o.syncErrorThrowable)
                      ? this._subscribe(o)
                      : this._trySubscribe(o)
                  ),
              x.useDeprecatedSynchronousErrorHandling && o.syncErrorThrowable && ((o.syncErrorThrowable = !1), o.syncErrorThrown))
            )
              throw o.syncErrorValue;
            return o;
          }),
          (e.prototype._trySubscribe = function(e) {
            try {
              return this._subscribe(e);
            } catch (t) {
              x.useDeprecatedSynchronousErrorHandling && ((e.syncErrorThrown = !0), (e.syncErrorValue = t)),
                (function(e) {
                  for (; e; ) {
                    var t = e.destination;
                    if (e.closed || e.isStopped) return !1;
                    e = t && t instanceof S ? t : null;
                  }
                  return !0;
                })(e)
                  ? e.error(t)
                  : console.warn(t);
            }
          }),
          (e.prototype.forEach = function(e, t) {
            var n = this;
            return new (t = P(t))(function(t, r) {
              var o;
              o = n.subscribe(
                function(t) {
                  try {
                    e(t);
                  } catch (n) {
                    r(n), o && o.unsubscribe();
                  }
                },
                r,
                t
              );
            });
          }),
          (e.prototype._subscribe = function(e) {
            var t = this.source;
            return t && t.subscribe(e);
          }),
          (e.prototype[I] = function() {
            return this;
          }),
          (e.prototype.pipe = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return 0 === e.length
              ? this
              : ((n = e)
                  ? 1 === n.length
                    ? n[0]
                    : function(e) {
                        return n.reduce(function(e, t) {
                          return t(e);
                        }, e);
                      }
                  : N)(this);
            var n;
          }),
          (e.prototype.toPromise = function(e) {
            var t = this;
            return new (e = P(e))(function(e, n) {
              var r;
              t.subscribe(
                function(e) {
                  return (r = e);
                },
                function(e) {
                  return n(e);
                },
                function() {
                  return e(r);
                }
              );
            });
          }),
          (e.create = function(t) {
            return new e(t);
          }),
          e
        );
      })();
      function P(e) {
        if ((e || (e = x.Promise || Promise), !e)) throw new Error('no Promise impl found');
        return e;
      }
      function D() {
        return Error.call(this), (this.message = 'object unsubscribed'), (this.name = 'ObjectUnsubscribedError'), this;
      }
      D.prototype = Object.create(Error.prototype);
      var R = D,
        F = (function(e) {
          function t(t, n) {
            var r = e.call(this) || this;
            return (r.subject = t), (r.subscriber = n), (r.closed = !1), r;
          }
          return (
            o(t, e),
            (t.prototype.unsubscribe = function() {
              if (!this.closed) {
                this.closed = !0;
                var e = this.subject,
                  t = e.observers;
                if (((this.subject = null), t && 0 !== t.length && !e.isStopped && !e.closed)) {
                  var n = t.indexOf(this.subscriber);
                  -1 !== n && t.splice(n, 1);
                }
              }
            }),
            t
          );
        })(w),
        M = (function(e) {
          function t(t) {
            var n = e.call(this, t) || this;
            return (n.destination = t), n;
          }
          return o(t, e), t;
        })(S),
        j = (function(e) {
          function t() {
            var t = e.call(this) || this;
            return (t.observers = []), (t.closed = !1), (t.isStopped = !1), (t.hasError = !1), (t.thrownError = null), t;
          }
          return (
            o(t, e),
            (t.prototype[T] = function() {
              return new M(this);
            }),
            (t.prototype.lift = function(e) {
              var t = new V(this, this);
              return (t.operator = e), t;
            }),
            (t.prototype.next = function(e) {
              if (this.closed) throw new R();
              if (!this.isStopped) for (var t = this.observers, n = t.length, r = t.slice(), o = 0; o < n; o++) r[o].next(e);
            }),
            (t.prototype.error = function(e) {
              if (this.closed) throw new R();
              (this.hasError = !0), (this.thrownError = e), (this.isStopped = !0);
              for (var t = this.observers, n = t.length, r = t.slice(), o = 0; o < n; o++) r[o].error(e);
              this.observers.length = 0;
            }),
            (t.prototype.complete = function() {
              if (this.closed) throw new R();
              this.isStopped = !0;
              for (var e = this.observers, t = e.length, n = e.slice(), r = 0; r < t; r++) n[r].complete();
              this.observers.length = 0;
            }),
            (t.prototype.unsubscribe = function() {
              (this.isStopped = !0), (this.closed = !0), (this.observers = null);
            }),
            (t.prototype._trySubscribe = function(t) {
              if (this.closed) throw new R();
              return e.prototype._trySubscribe.call(this, t);
            }),
            (t.prototype._subscribe = function(e) {
              if (this.closed) throw new R();
              return this.hasError
                ? (e.error(this.thrownError), w.EMPTY)
                : this.isStopped
                ? (e.complete(), w.EMPTY)
                : (this.observers.push(e), new F(this, e));
            }),
            (t.prototype.asObservable = function() {
              var e = new O();
              return (e.source = this), e;
            }),
            (t.create = function(e, t) {
              return new V(e, t);
            }),
            t
          );
        })(O),
        V = (function(e) {
          function t(t, n) {
            var r = e.call(this) || this;
            return (r.destination = t), (r.source = n), r;
          }
          return (
            o(t, e),
            (t.prototype.next = function(e) {
              var t = this.destination;
              t && t.next && t.next(e);
            }),
            (t.prototype.error = function(e) {
              var t = this.destination;
              t && t.error && this.destination.error(e);
            }),
            (t.prototype.complete = function() {
              var e = this.destination;
              e && e.complete && this.destination.complete();
            }),
            (t.prototype._subscribe = function(e) {
              return this.source ? this.source.subscribe(e) : w.EMPTY;
            }),
            t
          );
        })(j);
      function B(e) {
        return e && 'function' == typeof e.schedule;
      }
      var H = (function(e) {
          function t(t, n, r) {
            var o = e.call(this) || this;
            return (o.parent = t), (o.outerValue = n), (o.outerIndex = r), (o.index = 0), o;
          }
          return (
            o(t, e),
            (t.prototype._next = function(e) {
              this.parent.notifyNext(this.outerValue, e, this.outerIndex, this.index++, this);
            }),
            (t.prototype._error = function(e) {
              this.parent.notifyError(e, this), this.unsubscribe();
            }),
            (t.prototype._complete = function() {
              this.parent.notifyComplete(this), this.unsubscribe();
            }),
            t
          );
        })(S),
        L = function(e) {
          return function(t) {
            for (var n = 0, r = e.length; n < r && !t.closed; n++) t.next(e[n]);
            t.closed || t.complete();
          };
        },
        U = function(e) {
          return function(t) {
            return (
              e
                .then(
                  function(e) {
                    t.closed || (t.next(e), t.complete());
                  },
                  function(e) {
                    return t.error(e);
                  }
                )
                .then(null, k),
              t
            );
          };
        };
      function z() {
        return 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator';
      }
      var q = z(),
        W = function(e) {
          return function(t) {
            for (var n = e[q](); ; ) {
              var r = n.next();
              if (r.done) {
                t.complete();
                break;
              }
              if ((t.next(r.value), t.closed)) break;
            }
            return (
              'function' == typeof n.return &&
                t.add(function() {
                  n.return && n.return();
                }),
              t
            );
          };
        },
        Z = function(e) {
          return function(t) {
            var n = e[I]();
            if ('function' != typeof n.subscribe) throw new TypeError('Provided object does not correctly implement Symbol.observable');
            return n.subscribe(t);
          };
        },
        K = function(e) {
          return e && 'number' == typeof e.length && 'function' != typeof e;
        };
      function Q(e) {
        return e && 'function' != typeof e.subscribe && 'function' == typeof e.then;
      }
      var G = function(e) {
        if (e instanceof O)
          return function(t) {
            return e._isScalar ? (t.next(e.value), void t.complete()) : e.subscribe(t);
          };
        if (e && 'function' == typeof e[I]) return Z(e);
        if (K(e)) return L(e);
        if (Q(e)) return U(e);
        if (e && 'function' == typeof e[q]) return W(e);
        var t = f(e) ? 'an invalid object' : "'" + e + "'";
        throw new TypeError(
          'You provided ' + t + ' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.'
        );
      };
      function J(e, t, n, r, o) {
        if ((void 0 === o && (o = new H(e, n, r)), !o.closed)) return G(t)(o);
      }
      var Y = (function(e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          o(t, e),
          (t.prototype.notifyNext = function(e, t, n, r, o) {
            this.destination.next(t);
          }),
          (t.prototype.notifyError = function(e, t) {
            this.destination.error(e);
          }),
          (t.prototype.notifyComplete = function(e) {
            this.destination.complete();
          }),
          t
        );
      })(S);
      function $(e, t) {
        return function(n) {
          if ('function' != typeof e) throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
          return n.lift(new X(e, t));
        };
      }
      var X = (function() {
          function e(e, t) {
            (this.project = e), (this.thisArg = t);
          }
          return (
            (e.prototype.call = function(e, t) {
              return t.subscribe(new ee(e, this.project, this.thisArg));
            }),
            e
          );
        })(),
        ee = (function(e) {
          function t(t, n, r) {
            var o = e.call(this, t) || this;
            return (o.project = n), (o.count = 0), (o.thisArg = r || o), o;
          }
          return (
            o(t, e),
            (t.prototype._next = function(e) {
              var t;
              try {
                t = this.project.call(this.thisArg, e, this.count++);
              } catch (n) {
                return void this.destination.error(n);
              }
              this.destination.next(t);
            }),
            t
          );
        })(S);
      function te(e, t) {
        return new O(
          t
            ? function(n) {
                var r = new w(),
                  o = 0;
                return (
                  r.add(
                    t.schedule(function() {
                      o !== e.length ? (n.next(e[o++]), n.closed || r.add(this.schedule())) : n.complete();
                    })
                  ),
                  r
                );
              }
            : L(e)
        );
      }
      function ne(e, t) {
        if (!t) return e instanceof O ? e : new O(G(e));
        if (null != e) {
          if (
            (function(e) {
              return e && 'function' == typeof e[I];
            })(e)
          )
            return (function(e, t) {
              return new O(
                t
                  ? function(n) {
                      var r = new w();
                      return (
                        r.add(
                          t.schedule(function() {
                            var o = e[I]();
                            r.add(
                              o.subscribe({
                                next: function(e) {
                                  r.add(
                                    t.schedule(function() {
                                      return n.next(e);
                                    })
                                  );
                                },
                                error: function(e) {
                                  r.add(
                                    t.schedule(function() {
                                      return n.error(e);
                                    })
                                  );
                                },
                                complete: function() {
                                  r.add(
                                    t.schedule(function() {
                                      return n.complete();
                                    })
                                  );
                                }
                              })
                            );
                          })
                        ),
                        r
                      );
                    }
                  : Z(e)
              );
            })(e, t);
          if (Q(e))
            return (function(e, t) {
              return new O(
                t
                  ? function(n) {
                      var r = new w();
                      return (
                        r.add(
                          t.schedule(function() {
                            return e.then(
                              function(e) {
                                r.add(
                                  t.schedule(function() {
                                    n.next(e),
                                      r.add(
                                        t.schedule(function() {
                                          return n.complete();
                                        })
                                      );
                                  })
                                );
                              },
                              function(e) {
                                r.add(
                                  t.schedule(function() {
                                    return n.error(e);
                                  })
                                );
                              }
                            );
                          })
                        ),
                        r
                      );
                    }
                  : U(e)
              );
            })(e, t);
          if (K(e)) return te(e, t);
          if (
            (function(e) {
              return e && 'function' == typeof e[q];
            })(e) ||
            'string' == typeof e
          )
            return (function(e, t) {
              if (!e) throw new Error('Iterable cannot be null');
              return new O(
                t
                  ? function(n) {
                      var r,
                        o = new w();
                      return (
                        o.add(function() {
                          r && 'function' == typeof r.return && r.return();
                        }),
                        o.add(
                          t.schedule(function() {
                            (r = e[q]()),
                              o.add(
                                t.schedule(function() {
                                  if (!n.closed) {
                                    var e, t;
                                    try {
                                      var o = r.next();
                                      (e = o.value), (t = o.done);
                                    } catch (i) {
                                      return void n.error(i);
                                    }
                                    t ? n.complete() : (n.next(e), this.schedule());
                                  }
                                })
                              );
                          })
                        ),
                        o
                      );
                    }
                  : W(e)
              );
            })(e, t);
        }
        throw new TypeError(((null !== e && typeof e) || e) + ' is not observable');
      }
      var re = (function() {
          function e(e, t) {
            void 0 === t && (t = Number.POSITIVE_INFINITY), (this.project = e), (this.concurrent = t);
          }
          return (
            (e.prototype.call = function(e, t) {
              return t.subscribe(new oe(e, this.project, this.concurrent));
            }),
            e
          );
        })(),
        oe = (function(e) {
          function t(t, n, r) {
            void 0 === r && (r = Number.POSITIVE_INFINITY);
            var o = e.call(this, t) || this;
            return (o.project = n), (o.concurrent = r), (o.hasCompleted = !1), (o.buffer = []), (o.active = 0), (o.index = 0), o;
          }
          return (
            o(t, e),
            (t.prototype._next = function(e) {
              this.active < this.concurrent ? this._tryNext(e) : this.buffer.push(e);
            }),
            (t.prototype._tryNext = function(e) {
              var t,
                n = this.index++;
              try {
                t = this.project(e, n);
              } catch (r) {
                return void this.destination.error(r);
              }
              this.active++, this._innerSub(t, e, n);
            }),
            (t.prototype._innerSub = function(e, t, n) {
              var r = new H(this, void 0, void 0);
              this.destination.add(r), J(this, e, t, n, r);
            }),
            (t.prototype._complete = function() {
              (this.hasCompleted = !0), 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe();
            }),
            (t.prototype.notifyNext = function(e, t, n, r, o) {
              this.destination.next(t);
            }),
            (t.prototype.notifyComplete = function(e) {
              var t = this.buffer;
              this.remove(e),
                this.active--,
                t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete();
            }),
            t
          );
        })(Y);
      function ie(e) {
        return e;
      }
      function se(e) {
        return (
          void 0 === e && (e = Number.POSITIVE_INFINITY),
          (function e(t, n, r) {
            return (
              void 0 === r && (r = Number.POSITIVE_INFINITY),
              'function' == typeof n
                ? function(o) {
                    return o.pipe(
                      e(function(e, r) {
                        return ne(t(e, r)).pipe(
                          $(function(t, o) {
                            return n(e, t, r, o);
                          })
                        );
                      }, r)
                    );
                  }
                : ('number' == typeof n && (r = n),
                  function(e) {
                    return e.lift(new re(t, r));
                  })
            );
          })(ie, e)
        );
      }
      function ae() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var n = Number.POSITIVE_INFINITY,
          r = null,
          o = e[e.length - 1];
        return (
          B(o)
            ? ((r = e.pop()), e.length > 1 && 'number' == typeof e[e.length - 1] && (n = e.pop()))
            : 'number' == typeof o && (n = e.pop()),
          null === r && 1 === e.length && e[0] instanceof O ? e[0] : se(n)(te(e, r))
        );
      }
      function ue() {
        return function(e) {
          return e.lift(new ce(e));
        };
      }
      var ce = (function() {
          function e(e) {
            this.connectable = e;
          }
          return (
            (e.prototype.call = function(e, t) {
              var n = this.connectable;
              n._refCount++;
              var r = new le(e, n),
                o = t.subscribe(r);
              return r.closed || (r.connection = n.connect()), o;
            }),
            e
          );
        })(),
        le = (function(e) {
          function t(t, n) {
            var r = e.call(this, t) || this;
            return (r.connectable = n), r;
          }
          return (
            o(t, e),
            (t.prototype._unsubscribe = function() {
              var e = this.connectable;
              if (e) {
                this.connectable = null;
                var t = e._refCount;
                if (t <= 0) this.connection = null;
                else if (((e._refCount = t - 1), t > 1)) this.connection = null;
                else {
                  var n = this.connection,
                    r = e._connection;
                  (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
                }
              } else this.connection = null;
            }),
            t
          );
        })(S),
        pe = (function(e) {
          function t(t, n) {
            var r = e.call(this) || this;
            return (r.source = t), (r.subjectFactory = n), (r._refCount = 0), (r._isComplete = !1), r;
          }
          return (
            o(t, e),
            (t.prototype._subscribe = function(e) {
              return this.getSubject().subscribe(e);
            }),
            (t.prototype.getSubject = function() {
              var e = this._subject;
              return (e && !e.isStopped) || (this._subject = this.subjectFactory()), this._subject;
            }),
            (t.prototype.connect = function() {
              var e = this._connection;
              return (
                e ||
                  ((this._isComplete = !1),
                  (e = this._connection = new w()).add(this.source.subscribe(new de(this.getSubject(), this))),
                  e.closed ? ((this._connection = null), (e = w.EMPTY)) : (this._connection = e)),
                e
              );
            }),
            (t.prototype.refCount = function() {
              return ue()(this);
            }),
            t
          );
        })(O).prototype,
        fe = {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: pe._subscribe },
          _isComplete: { value: pe._isComplete, writable: !0 },
          getSubject: { value: pe.getSubject },
          connect: { value: pe.connect },
          refCount: { value: pe.refCount }
        },
        de = (function(e) {
          function t(t, n) {
            var r = e.call(this, t) || this;
            return (r.connectable = n), r;
          }
          return (
            o(t, e),
            (t.prototype._error = function(t) {
              this._unsubscribe(), e.prototype._error.call(this, t);
            }),
            (t.prototype._complete = function() {
              (this.connectable._isComplete = !0), this._unsubscribe(), e.prototype._complete.call(this);
            }),
            (t.prototype._unsubscribe = function() {
              var e = this.connectable;
              if (e) {
                this.connectable = null;
                var t = e._connection;
                (e._refCount = 0), (e._subject = null), (e._connection = null), t && t.unsubscribe();
              }
            }),
            t
          );
        })(M);
      function he(e, t) {
        return function(n) {
          var r;
          if (
            ((r =
              'function' == typeof e
                ? e
                : function() {
                    return e;
                  }),
            'function' == typeof t)
          )
            return n.lift(new ye(r, t));
          var o = Object.create(n, fe);
          return (o.source = n), (o.subjectFactory = r), o;
        };
      }
      var ye = (function() {
        function e(e, t) {
          (this.subjectFactory = e), (this.selector = t);
        }
        return (
          (e.prototype.call = function(e, t) {
            var n = this.selector,
              r = this.subjectFactory(),
              o = n(r).subscribe(e);
            return o.add(t.subscribe(r)), o;
          }),
          e
        );
      })();
      function ve() {
        return new j();
      }
      function ge() {
        return function(e) {
          return ue()(he(ve)(e));
        };
      }
      function me(e) {
        for (var t in e) if (e[t] === me) return t;
        throw Error('Could not find renamed property on target object.');
      }
      var be = me({ ngComponentDef: me }),
        we = me({ ngInjectableDef: me }),
        _e = me({ ngInjectorDef: me }),
        Ce = me({ ngModuleDef: me }),
        xe = me({ __NG_ELEMENT_ID__: me });
      function ke(e) {
        return { providedIn: e.providedIn || null, factory: e.factory, value: void 0 };
      }
      function Ee(e) {
        return e.hasOwnProperty(we) ? e[we] : null;
      }
      function Te(e) {
        return e.hasOwnProperty(_e) ? e[_e] : null;
      }
      var Se = (function() {
          function e(e, t) {
            (this._desc = e),
              (this.ngMetadataName = 'InjectionToken'),
              (this.ngInjectableDef = void 0 !== t ? ke({ providedIn: t.providedIn || 'root', factory: t.factory }) : void 0);
          }
          return (
            (e.prototype.toString = function() {
              return 'InjectionToken ' + this._desc;
            }),
            e
          );
        })(),
        Ae = '__parameters__';
      function Ie(e, t, n) {
        var r = (function(e) {
          return function() {
            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
            if (e) {
              var r = e.apply(void 0, l(t));
              for (var o in r) this[o] = r[o];
            }
          };
        })(t);
        function o() {
          for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
          if (this instanceof o) return r.apply(this, t), this;
          var i = new ((e = o).bind.apply(e, l([void 0], t)))();
          return (s.annotation = i), s;
          function s(e, t, n) {
            for (var r = e.hasOwnProperty(Ae) ? e[Ae] : Object.defineProperty(e, Ae, { value: [] })[Ae]; r.length <= n; ) r.push(null);
            return (r[n] = r[n] || []).push(i), e;
          }
        }
        return n && (o.prototype = Object.create(n.prototype)), (o.prototype.ngMetadataName = e), (o.annotationCls = o), o;
      }
      var Ne = (function(e) {
          return (
            (e[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.Native = 1)] = 'Native'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            e
          );
        })({}),
        Oe = 'undefined' != typeof window && window,
        Pe = 'undefined' != typeof self && 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
        De = ('undefined' != typeof global && global) || Oe || Pe,
        Re = Promise.resolve(0),
        Fe = null;
      function Me() {
        if (!Fe) {
          var e = De.Symbol;
          if (e && e.iterator) Fe = e.iterator;
          else
            for (var t = Object.getOwnPropertyNames(Map.prototype), n = 0; n < t.length; ++n) {
              var r = t[n];
              'entries' !== r && 'size' !== r && Map.prototype[r] === Map.prototype.entries && (Fe = r);
            }
        }
        return Fe;
      }
      function je(e) {
        'undefined' == typeof Zone
          ? Re.then(function() {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', e);
      }
      function Ve(e, t) {
        return e === t || ('number' == typeof e && 'number' == typeof t && isNaN(e) && isNaN(t));
      }
      function Be(e) {
        if ('string' == typeof e) return e;
        if (e instanceof Array) return '[' + e.map(Be).join(', ') + ']';
        if (null == e) return '' + e;
        if (e.overriddenName) return '' + e.overriddenName;
        if (e.name) return '' + e.name;
        var t = e.toString();
        if (null == t) return '' + t;
        var n = t.indexOf('\n');
        return -1 === n ? t : t.substring(0, n);
      }
      var He,
        Le = Ie('Inject', function(e) {
          return { token: e };
        }),
        Ue = Ie('Optional'),
        ze = Ie('Self'),
        qe = Ie('SkipSelf'),
        We = (function(e) {
          return (
            (e[(e.Default = 0)] = 'Default'),
            (e[(e.Host = 1)] = 'Host'),
            (e[(e.Self = 2)] = 'Self'),
            (e[(e.SkipSelf = 4)] = 'SkipSelf'),
            (e[(e.Optional = 8)] = 'Optional'),
            e
          );
        })({}),
        Ze = void 0;
      function Ke(e) {
        var t = Ze;
        return (Ze = e), t;
      }
      function Qe(e) {
        var t = He;
        return (He = e), t;
      }
      function Ge(e, t) {
        return (
          void 0 === t && (t = We.Default),
          (He ||
            function(e, t) {
              if ((void 0 === t && (t = We.Default), void 0 === Ze)) throw new Error('inject() must be called from an injection context');
              return null === Ze ? Je(e, void 0, t) : Ze.get(e, t & We.Optional ? null : void 0, t);
            })(e, t)
        );
      }
      function Je(e, t, n) {
        var r = Ee(e);
        if (r && 'root' == r.providedIn) return void 0 === r.value ? (r.value = r.factory()) : r.value;
        if (n & We.Optional) return null;
        if (void 0 !== t) return t;
        throw new Error('Injector: NOT_FOUND [' + Be(e) + ']');
      }
      function Ye(e) {
        for (var t = [], n = 0; n < e.length; n++) {
          var r = e[n];
          if (Array.isArray(r)) {
            if (0 === r.length) throw new Error('Arguments array must have arguments.');
            for (var o = void 0, i = We.Default, s = 0; s < r.length; s++) {
              var a = r[s];
              a instanceof Ue || 'Optional' === a.ngMetadataName
                ? (i |= We.Optional)
                : a instanceof qe || 'SkipSelf' === a.ngMetadataName
                ? (i |= We.SkipSelf)
                : a instanceof ze || 'Self' === a.ngMetadataName
                ? (i |= We.Self)
                : (o = a instanceof Le ? a.token : a);
            }
            t.push(Ge(o, i));
          } else t.push(Ge(r));
        }
        return t;
      }
      var $e = 8,
        Xe = 8,
        et = 9,
        tt = -1,
        nt = (function() {
          return function(e, t, n) {
            (this.factory = e), (this.resolving = !1), (this.canSeeViewProviders = t), (this.injectImpl = n);
          };
        })(),
        rt = nt.prototype,
        ot = 17,
        it = 0,
        st = 1,
        at = 2,
        ut = 3,
        ct = 4,
        lt = 5,
        pt = 6,
        ft = 7,
        dt = 8,
        ht = 9,
        yt = 10,
        vt = 11,
        gt = 12,
        mt = 14,
        bt = 16;
      function wt(e, t, n) {
        e.afterContentInit && (t.contentHooks || (t.contentHooks = [])).push(n, e.afterContentInit),
          e.afterContentChecked &&
            ((t.contentHooks || (t.contentHooks = [])).push(n, e.afterContentChecked),
            (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, e.afterContentChecked));
      }
      function _t(e, t, n) {
        e.afterViewInit && (t.viewHooks || (t.viewHooks = [])).push(n, e.afterViewInit),
          e.afterViewChecked &&
            ((t.viewHooks || (t.viewHooks = [])).push(n, e.afterViewChecked),
            (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, e.afterViewChecked));
      }
      function Ct(e, t, n) {
        null != e.onDestroy && (t.destroyHooks || (t.destroyHooks = [])).push(n, e.onDestroy);
      }
      function xt(e, t, n, r) {
        var o = r ? t : n;
        o && kt(e, o);
      }
      function kt(e, t) {
        for (var n = 0; n < t.length; n += 2) t[n + 1].call(e[t[n]]);
      }
      function Et(e, t) {
        var n = At(e),
          r = At(t);
        return n && r
          ? (function(e, t, n) {
              for (var r = e[Me()](), o = t[Me()](); ; ) {
                var i = r.next(),
                  s = o.next();
                if (i.done && s.done) return !0;
                if (i.done || s.done) return !1;
                if (!n(i.value, s.value)) return !1;
              }
            })(e, t, Et)
          : !(n || !e || ('object' != typeof e && 'function' != typeof e) || r || !t || ('object' != typeof t && 'function' != typeof t)) ||
              Ve(e, t);
      }
      var Tt = (function() {
          function e(e) {
            this.wrapped = e;
          }
          return (
            (e.wrap = function(t) {
              return new e(t);
            }),
            (e.unwrap = function(t) {
              return e.isWrapped(t) ? t.wrapped : t;
            }),
            (e.isWrapped = function(t) {
              return t instanceof e;
            }),
            e
          );
        })(),
        St = (function() {
          function e(e, t, n) {
            (this.previousValue = e), (this.currentValue = t), (this.firstChange = n);
          }
          return (
            (e.prototype.isFirstChange = function() {
              return this.firstChange;
            }),
            e
          );
        })();
      function At(e) {
        return !!It(e) && (Array.isArray(e) || (!(e instanceof Map) && Me() in e));
      }
      function It(e) {
        return null !== e && ('function' == typeof e || 'object' == typeof e);
      }
      var Nt = 0,
        Ot = 1,
        Pt = 6,
        Dt = '__ngContext__';
      function Rt(e) {
        return 'function' == typeof e ? e.name || e : 'string' == typeof e ? e : null == e ? '' : '' + e;
      }
      function Ft(e) {
        for (; Array.isArray(e); ) e = e[lt];
        return e;
      }
      function Mt(e, t) {
        return Ft(t[e.index]);
      }
      function jt(e, t) {
        var n = t[e];
        return n.length >= ot ? n : n[lt];
      }
      function Vt(e) {
        return e[Dt];
      }
      function Bt(e) {
        var t = Vt(e);
        return t ? (Array.isArray(t) ? t : t.lViewData) : null;
      }
      function Ht(e) {
        return 32767 & e;
      }
      function Lt(e, t) {
        for (var n = e >> 16, r = t; n > 0; ) (r = r[bt]), n--;
        return r;
      }
      var Ut,
        zt,
        qt,
        Wt,
        Zt,
        Kt,
        Qt,
        Gt,
        Jt = (('undefined' != typeof requestAnimationFrame && requestAnimationFrame) || setTimeout).bind(De);
      function Yt() {
        return Ut;
      }
      function $t() {
        return zt;
      }
      function Xt() {
        return qt;
      }
      function en(e) {
        qt = e;
      }
      function tn(e, t) {
        (qt = e), (Gt = t);
      }
      function nn() {
        return Wt;
      }
      function rn(e) {
        Wt = e;
      }
      function on() {
        return Zt;
      }
      function sn() {
        return Qt;
      }
      function an() {
        return Gt;
      }
      var un = !1;
      function cn() {
        return un;
      }
      function ln(e) {
        un = e;
      }
      var pn = !0;
      function fn(e) {
        pn = e;
      }
      function dn(e, t) {
        var n = Gt;
        return (
          (Zt = e && e[it]),
          (Qt = e && 1 == (1 & e[st])),
          (pn = e && Zt.firstTemplatePass),
          (Ut = e && e[vt]),
          (qt = t),
          (Wt = !0),
          (Gt = e),
          n && (n[ct] = Kt),
          (Kt = e && e[ct]),
          n
        );
      }
      function hn(e, t) {
        t || (un || xt(Gt, Zt.viewHooks, Zt.viewCheckHooks, Qt), (Gt[st] &= -6)),
          (Gt[st] |= 16),
          (Gt[ft] = Zt.bindingStartIndex),
          dn(e, null);
      }
      var yn = !1;
      function vn(e) {
        var t = yn;
        return (yn = e), t;
      }
      var gn = 255,
        mn = 0;
      function bn(e, t) {
        var n = _n(e, t);
        if (-1 !== n) return n;
        var r = t[it];
        r.firstTemplatePass && ((e.injectorIndex = t.length), wn(r.data, e), wn(t, null), wn(r.blueprint, null));
        var o = Cn(e, t),
          i = Ht(o),
          s = Lt(o, t),
          a = e.injectorIndex;
        if (o !== tt) for (var u = s[it].data, c = 0; c < 8; c++) t[a + c] = s[i + c] | u[i + c];
        return (t[a + Xe] = o), a;
      }
      function wn(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function _n(e, t) {
        return -1 === e.injectorIndex || (e.parent && e.parent.injectorIndex === e.injectorIndex) || null == t[e.injectorIndex + Xe]
          ? -1
          : e.injectorIndex;
      }
      function Cn(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
        for (var n = t[pt], r = 1; n && -1 === n.injectorIndex; ) (n = (t = t[bt])[pt]), r++;
        return n ? n.injectorIndex | (r << 16) | (n && 3 === n.type ? 32768 : 0) : -1;
      }
      var xn = {};
      function kn(e, t, n, r) {
        var o = t[it],
          i = o.data[e + $e],
          s = i.flags,
          a = i.providerIndexes,
          u = o.data,
          c = !1;
        ((null == r &&
          (function(e) {
            return 4096 == (4096 & e.flags);
          })(i) &&
          yn) ||
          (null != r && r != o && (null == o.node || 3 === o.node.type))) &&
          (c = !0);
        for (var l = 65535 & a, p = s >> 16, f = 4095 & s, d = c ? l : l + (a >> 16); d < p + f; d++) {
          var h = u[d];
          if ((d < p && n === h) || (d >= p && h.type === n)) return En(u, t, d, i);
        }
        return xn;
      }
      function En(e, t, n, r) {
        var o,
          i = t[n];
        if (null != (o = i) && 'object' == typeof o && Object.getPrototypeOf(o) == rt) {
          var s = i;
          if (s.resolving) throw new Error('Circular dep for ' + Rt(e[n]));
          var a = vn(s.canSeeViewProviders);
          s.resolving = !0;
          var u = void 0;
          s.injectImpl && (u = Qe(s.injectImpl));
          var c = Xt(),
            l = an();
          tn(r, t);
          try {
            i = t[n] = s.factory(null, e, t, r);
          } finally {
            s.injectImpl && Qe(u), vn(a), (s.resolving = !1), tn(c, l);
          }
        }
        return i;
      }
      function Tn(e, t, n) {
        var r = 64 & e,
          o = 32 & e;
        return !!(
          (128 & e ? (r ? (o ? n[t + 7] : n[t + 6]) : o ? n[t + 5] : n[t + 4]) : r ? (o ? n[t + 3] : n[t + 2]) : o ? n[t + 1] : n[t]) &
          (1 << e)
        );
      }
      function Sn(e, t) {
        return !(e & We.Self || (e & We.Host && 32768 & t));
      }
      var An = (function() {
        function e(e, t) {
          (this._tNode = e), (this._hostView = t), (this._injectorIndex = bn(e, t));
        }
        return (
          (e.prototype.get = function(e) {
            return (
              tn(this._tNode, this._hostView),
              (function(e, t, n, r, o) {
                void 0 === r && (r = We.Default);
                var i = (function(e) {
                  var t = e[xe];
                  return 'number' == typeof t ? t & gn : t;
                })(n);
                if ('function' == typeof i) {
                  var s = Xt(),
                    a = an();
                  tn(e, t);
                  try {
                    var u = i();
                    if (null != u || r & We.Optional) return u;
                    throw new Error('No provider for ' + Rt(n));
                  } finally {
                    tn(s, a);
                  }
                } else if ('number' == typeof i) {
                  var c = null,
                    l = _n(e, t),
                    p = tt;
                  for (
                    (-1 === l || r & We.SkipSelf) &&
                    (Sn(r, (p = -1 === l ? Cn(e, t) : t[l + Xe])) ? ((c = t[it]), (l = Ht(p)), (t = Lt(p, t))) : (l = -1));
                    -1 !== l;

                  ) {
                    p = t[l + Xe];
                    var f = t[it];
                    if (Tn(i, l, f.data)) {
                      var d = kn(l, t, n, c);
                      if (d !== xn) return d;
                    }
                    Sn(r, p) && Tn(i, l, t) ? ((c = f), (l = Ht(p)), (t = Lt(p, t))) : (l = -1);
                  }
                }
                if ((r & We.Optional && void 0 === o && (o = null), 0 == (r & (We.Self | We.Host)))) {
                  var h = t[yt];
                  return h ? h.get(n, o, r & We.Optional) : Je(n, o, r & We.Optional);
                }
                if (r & We.Optional) return o;
                throw new Error('NodeInjector: NOT_FOUND [' + Rt(n) + ']');
              })(this._tNode, this._hostView, e)
            );
          }),
          e
        );
      })();
      function In(e, t) {
        e[Dt] = t;
      }
      function Nn() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      }
      var On = me({ __forward_ref__: me });
      function Pn(e) {
        return (
          (e.__forward_ref__ = Pn),
          (e.toString = function() {
            return Be(this());
          }),
          e
        );
      }
      function Dn(e) {
        var t = e;
        return 'function' == typeof t && t.hasOwnProperty(On) && t.__forward_ref__ === Pn ? t() : e;
      }
      var Rn = '__source',
        Fn = new Object(),
        Mn = Fn,
        jn = new Se('INJECTOR'),
        Vn = (function() {
          function e() {}
          return (
            (e.prototype.get = function(e, t) {
              if ((void 0 === t && (t = Fn), t === Fn)) throw new Error('NullInjectorError: No provider for ' + Be(e) + '!');
              return t;
            }),
            e
          );
        })(),
        Bn = (function() {
          function e() {}
          return (
            (e.create = function(e, t) {
              return Array.isArray(e) ? new Gn(e, t) : new Gn(e.providers, e.parent, e.name || null);
            }),
            (e.THROW_IF_NOT_FOUND = Fn),
            (e.NULL = new Vn()),
            (e.ngInjectableDef = ke({
              providedIn: 'any',
              factory: function() {
                return Ge(jn);
              }
            })),
            (e.__NG_ELEMENT_ID__ = function() {
              return Hn();
            }),
            e
          );
        })(),
        Hn = Nn,
        Ln = function(e) {
          return e;
        },
        Un = [],
        zn = Ln,
        qn = function() {
          return Array.prototype.slice.call(arguments);
        },
        Wn = me({ provide: String, useValue: me }),
        Zn = Bn.NULL,
        Kn = /\n/gm,
        Qn = '\u0275',
        Gn = (function() {
          function e(e, t, n) {
            void 0 === t && (t = Zn), void 0 === n && (n = null), (this.parent = t), (this.source = n);
            var r = (this._records = new Map());
            r.set(Bn, { token: Bn, fn: Ln, deps: Un, value: this, useNew: !1 }),
              r.set(jn, { token: jn, fn: Ln, deps: Un, value: this, useNew: !1 }),
              (function e(t, n) {
                if (n)
                  if ((n = Dn(n)) instanceof Array) for (var r = 0; r < n.length; r++) e(t, n[r]);
                  else {
                    if ('function' == typeof n) throw $n('Function/Class not supported', n);
                    if (!n || 'object' != typeof n || !n.provide) throw $n('Unexpected provider', n);
                    var o = Dn(n.provide),
                      i = (function(e) {
                        var t = (function(e) {
                            var t = Un,
                              n = e.deps;
                            if (n && n.length) {
                              t = [];
                              for (var r = 0; r < n.length; r++) {
                                var o = 6;
                                if ((u = Dn(n[r])) instanceof Array)
                                  for (var i = 0, s = u; i < s.length; i++) {
                                    var a = s[i];
                                    a instanceof Ue || a == Ue
                                      ? (o |= 1)
                                      : a instanceof qe || a == qe
                                      ? (o &= -3)
                                      : a instanceof ze || a == ze
                                      ? (o &= -5)
                                      : (u = a instanceof Le ? a.token : Dn(a));
                                  }
                                t.push({ token: u, options: o });
                              }
                            } else if (e.useExisting) {
                              var u;
                              t = [{ token: (u = Dn(e.useExisting)), options: 6 }];
                            } else if (!(n || Wn in e)) throw $n("'deps' required", e);
                            return t;
                          })(e),
                          n = Ln,
                          r = Un,
                          o = !1,
                          i = Dn(e.provide);
                        if (Wn in e) r = e.useValue;
                        else if (e.useFactory) n = e.useFactory;
                        else if (e.useExisting);
                        else if (e.useClass) (o = !0), (n = Dn(e.useClass));
                        else {
                          if ('function' != typeof i)
                            throw $n(
                              'StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable',
                              e
                            );
                          (o = !0), (n = i);
                        }
                        return { deps: t, fn: n, useNew: o, value: r };
                      })(n);
                    if (!0 === n.multi) {
                      var s = t.get(o);
                      if (s) {
                        if (s.fn !== qn) throw Jn(o);
                      } else t.set(o, (s = { token: n.provide, deps: [], useNew: !1, fn: qn, value: Un }));
                      s.deps.push({ token: (o = n), options: 6 });
                    }
                    var a = t.get(o);
                    if (a && a.fn == qn) throw Jn(o);
                    t.set(o, i);
                  }
              })(r, e);
          }
          return (
            (e.prototype.get = function(e, t, n) {
              void 0 === n && (n = We.Default);
              var r = this._records.get(e);
              try {
                return (function e(t, n, r, o, i, s) {
                  try {
                    return (function(t, n, r, o, i, s) {
                      var a, u;
                      if (!n || s & We.SkipSelf) s & We.Self || (u = o.get(t, i, We.Default));
                      else {
                        if ((u = n.value) == zn) throw Error(Qn + 'Circular dependency');
                        if (u === Un) {
                          n.value = zn;
                          var c = n.useNew,
                            p = n.fn,
                            f = n.deps,
                            d = Un;
                          if (f.length) {
                            d = [];
                            for (var h = 0; h < f.length; h++) {
                              var y = f[h],
                                v = y.options,
                                g = 2 & v ? r.get(y.token) : void 0;
                              d.push(e(y.token, g, r, g || 4 & v ? o : Zn, 1 & v ? null : Bn.THROW_IF_NOT_FOUND, We.Default));
                            }
                          }
                          n.value = u = c ? new ((a = p).bind.apply(a, l([void 0], d)))() : p.apply(void 0, d);
                        }
                      }
                      return u;
                    })(t, n, r, o, i, s);
                  } catch (a) {
                    throw (a instanceof Error || (a = new Error(a)),
                    (a.ngTempTokenPath = a.ngTempTokenPath || []).unshift(t),
                    n && n.value == zn && (n.value = Un),
                    a);
                  }
                })(e, r, this._records, this.parent, t, n);
              } catch (i) {
                var o = i.ngTempTokenPath;
                throw (e[Rn] && o.unshift(e[Rn]),
                (i.message = Yn('\n' + i.message, o, this.source)),
                (i.ngTokenPath = o),
                (i.ngTempTokenPath = null),
                i);
              }
            }),
            (e.prototype.toString = function() {
              var e = [];
              return (
                this._records.forEach(function(t, n) {
                  return e.push(Be(n));
                }),
                'StaticInjector[' + e.join(', ') + ']'
              );
            }),
            e
          );
        })();
      function Jn(e) {
        return $n('Cannot mix multi providers and regular providers', e);
      }
      function Yn(e, t, n) {
        void 0 === n && (n = null), (e = e && '\n' === e.charAt(0) && e.charAt(1) == Qn ? e.substr(2) : e);
        var r = Be(t);
        if (t instanceof Array) r = t.map(Be).join(' -> ');
        else if ('object' == typeof t) {
          var o = [];
          for (var i in t)
            if (t.hasOwnProperty(i)) {
              var s = t[i];
              o.push(i + ':' + ('string' == typeof s ? JSON.stringify(s) : Be(s)));
            }
          r = '{' + o.join(', ') + '}';
        }
        return 'StaticInjectorError' + (n ? '(' + n + ')' : '') + '[' + r + ']: ' + e.replace(Kn, '\n  ');
      }
      function $n(e, t) {
        return new Error(Yn(e, t));
      }
      var Xn = (function() {
          return function() {};
        })(),
        er = (function() {
          return function() {};
        })(),
        tr = 'ngProjectAs';
      function nr(e) {
        return !!e.listen;
      }
      var rr = {
          createRenderer: function(e, t) {
            return document;
          }
        },
        or = [];
      function ir(e) {
        for (var t = e[pt]; t && 2 === t.type; ) t = (e = e[at])[pt];
        return e;
      }
      function sr(e, t, n, r, o) {
        0 === e
          ? nr(t)
            ? t.insertBefore(n, r, o)
            : n.insertBefore(r, o, !0)
          : 1 === e
          ? nr(t)
            ? t.removeChild(n, r)
            : n.removeChild(r)
          : 2 === e && t.destroyNode(r);
      }
      function ar(e) {
        var t = e[it].childIndex;
        return -1 === t ? null : e[t];
      }
      function ur(e, t) {
        var n;
        return e.length >= ot && (n = e[pt]) && 2 === n.type
          ? (function(t, n) {
              if (-1 === t.index) {
                var r = e[mt];
                return r > -1 ? e[at][r] : null;
              }
              return e[at][t.parent.index];
            })(n)
          : e[at] === t
          ? null
          : e[at];
      }
      function cr(e) {
        if (e.length >= ot) {
          var t = e;
          !(function(e) {
            var t = e[it].cleanup;
            if (null != t) {
              for (var n = 0; n < t.length - 1; n += 2)
                'string' == typeof t[n]
                  ? (Ft(e[t[n + 1]]).removeEventListener(t[n], e[dt][t[n + 2]], t[n + 3]), (n += 2))
                  : 'number' == typeof t[n]
                  ? (0, e[dt][t[n]])()
                  : t[n].call(e[dt][t[n + 1]]);
              e[dt] = null;
            }
          })(t),
            (function(e) {
              var t,
                n = e[it];
              null != n && null != (t = n.destroyHooks) && kt(e, t);
            })(t),
            (r = (n = t)[it] && n[it].pipeDestroyHooks) && kt(n, r),
            -1 === t[it].id && nr(t[vt]) && t[vt].destroy();
        }
        var n, r;
      }
      var lr = {},
        pr = Promise.resolve(null);
      function fr(e, t) {
        var n = on(),
          r = pn;
        if (((n.firstTemplatePass = !1), fn(!1), 1 !== t)) {
          var o = sn(),
            i = cn();
          i ||
            (function(e, t, n) {
              16 & e[st] && (xt(e, t.initHooks, t.checkHooks, n), (e[st] &= -17));
            })(e, n, o),
            (function(t) {
              for (var n = ar(e); null !== n; n = n[ut])
                if (n.length < ot && -1 === n[Nt])
                  for (var r = n, o = 0; o < r[Ot].length; o++) {
                    var i = r[Ot][o];
                    yr(i, i[it], i[ht], 2);
                  }
            })(),
            (function(e) {
              if (null != e.contentQueries)
                for (var t = 0; t < e.contentQueries.length; t += 2) {
                  var n = e.contentQueries[t];
                  e.data[n].contentQueriesRefresh(n - ot, e.contentQueries[t + 1]);
                }
            })(n),
            i || xt(e, n.contentHooks, n.contentCheckHooks, o),
            (function(e, t) {
              if (e.expandoInstructions)
                for (var n = (t[ft] = e.expandoStartIndex), r = -1, o = -1, i = 0; i < e.expandoInstructions.length; i++) {
                  var s = e.expandoInstructions[i];
                  if ('number' == typeof s)
                    if (s <= 0) {
                      o = -s;
                      var a = e.expandoInstructions[++i];
                      r = n += et + a;
                    } else n += s;
                  else (t[ft] = n), en(on().data[o + ot]), s(r - ot, o), r++;
                }
            })(n, e);
        }
        !(function(e, t, n) {
          if (null != e) for (var r = 0; r < e.length; r++) xr(e[r], t, n);
        })(n.components, r, t);
      }
      function dr(e, t, n, r, o, i, s) {
        var a = n.blueprint.slice();
        return (
          (a[st] = 25 | o),
          (a[at] = a[bt] = e),
          (a[ht] = r),
          (a[yt] = void 0 === s ? (e ? e[yt] : null) : s),
          (a[vt] = t),
          (a[gt] = i || null),
          a
        );
      }
      function hr(e, t, n, r, o) {
        var i = an(),
          s = on(),
          a = e + ot;
        i[a] = n;
        var u = s.data[a];
        if (null == u) {
          var c = Xt(),
            l = nn();
          (u = s.data[a] = Cr(i, t, a, r, o, null)),
            c && (!l || null != c.child || (null === u.parent && 2 !== c.type) ? l || (c.next = u) : (c.child = u));
        }
        return null == s.firstChild && 3 === t && (s.firstChild = u), en(u), rn(!0), u;
      }
      function yr(e, t, n, r) {
        var o,
          i = nn(),
          s = Xt();
        if ((rn(!0), en(null), 64 & e[st]))
          Er(
            (function(e) {
              for (var t = Array.isArray(e) ? e : Bt(e); t && !(64 & t[st]); ) t = t[at];
              return t;
            })(e)[ht]
          );
        else
          try {
            rn(!0), en(null), (o = dn(e, e[pt])), br(), t.template(r, n), 2 & r ? fr(e, null) : ((e[it].firstTemplatePass = !1), fn(!1));
          } finally {
            hn(o, 1 == (1 & r)), rn(i), en(s);
          }
      }
      function vr(e, t, n, r) {
        var o = $t(),
          i = dn(e, e[pt]);
        try {
          o.begin && o.begin(), r && (br(), r(n || gr(e), t)), fr(e, n);
        } finally {
          o.end && o.end(), hn(i);
        }
      }
      function gr(e) {
        return 1 & e[st] ? 3 : 2;
      }
      var mr = null;
      function br() {
        mr = null;
      }
      function wr(e, t, n, r, o, i, s) {
        var a = ot + n,
          u = a + r,
          c = (function(e, t) {
            var n = new Array(t).fill(null, 0, e).fill(lr, e);
            return (n[mt] = -1), (n[ft] = e), n;
          })(a, u);
        return (c[it] = {
          id: e,
          blueprint: c,
          template: t,
          viewQuery: s,
          node: null,
          data: c.slice(),
          childIndex: -1,
          bindingStartIndex: a,
          expandoStartIndex: u,
          expandoInstructions: null,
          firstTemplatePass: !0,
          initHooks: null,
          checkHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          pipeDestroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof o ? o() : o,
          pipeRegistry: 'function' == typeof i ? i() : i,
          firstChild: null
        });
      }
      function _r(e, t) {
        !(function(e) {
          zt = e;
        })(e);
        var n = e.createRenderer(null, null);
        return 'string' == typeof t ? (nr(n) ? n.selectRootElement(t) : n.querySelector(t)) : t;
      }
      function Cr(e, t, n, r, o, i) {
        var s = Xt(),
          a = nn() ? s : s && s.parent,
          u = a && e && a !== e[pt] ? a : null;
        return {
          type: t,
          index: n,
          injectorIndex: u ? u.injectorIndex : -1,
          flags: 0,
          providerIndexes: 0,
          tagName: r,
          attrs: o,
          localNames: null,
          initialInputs: void 0,
          inputs: void 0,
          outputs: void 0,
          tViews: i,
          next: null,
          child: null,
          parent: u,
          detached: null,
          stylingTemplate: null,
          projection: null
        };
      }
      function xr(e, t, n) {
        var r = jt(e, an());
        kr(r) &&
          6 & r[st] &&
          (t &&
            (function(e) {
              for (var t = e[it], n = e.length; n < t.blueprint.length; n++) e[n] = t.blueprint[n];
            })(r),
          Ar(r, r[ht], n));
      }
      function kr(e) {
        return 8 == (8 & e[st]);
      }
      function Er(e) {
        for (var t = 0; t < e.components.length; t++) {
          var n = e.components[t];
          vr(Bt(n), n, 2);
        }
      }
      function Tr(e) {
        Ar(
          (function(e) {
            var t,
              n = Vt(e);
            if (Array.isArray(n)) {
              var r = (function(e, t) {
                var n = e[it].components;
                if (n)
                  for (var r = 0; r < n.length; r++) {
                    var o = n[r];
                    if (jt(o, e)[ht] === t) return o;
                  }
                else if (jt(ot, e)[ht] === t) return ot;
                return -1;
              })(n, e);
              ((o = (function(e, t, n) {
                return { lViewData: e, nodeIndex: t, native: n, component: void 0, directives: void 0, localRefs: void 0 };
              })(n, r, (t = jt(r, n))[lt])).component = e),
                In(e, o),
                In(o.native, o);
            } else {
              var o;
              t = jt((o = n).nodeIndex, o.lViewData);
            }
            return t;
          })(e),
          e,
          null
        );
      }
      function Sr(e) {
        Er(e[ht]);
      }
      function Ar(e, t, n) {
        var r = e[it],
          o = dn(e, e[pt]),
          i = r.template,
          s = r.viewQuery;
        try {
          br(),
            (function(t, r, o, i) {
              t && (1 === n || (null === n && 1 & e[st])) && t(1, i);
            })(s, 0, 0, t),
            i(n || gr(e), t),
            fr(e, n),
            (function(t, n, r) {
              t && 2 & e[st] && t(2, r);
            })(s, 0, t);
        } finally {
          hn(o, 1 === n);
        }
      }
      var Ir,
        Nr = pr,
        Or = (function(e) {
          function t(t) {
            var n = e.call(this, t, null, -1) || this;
            return (n._view = t), n;
          }
          return (
            o(t, e),
            (t.prototype.detectChanges = function() {
              Sr(this._view);
            }),
            (t.prototype.checkNoChanges = function() {
              !(function(e) {
                ln(!0);
                try {
                  Sr(e);
                } finally {
                  ln(!1);
                }
              })(this._view);
            }),
            Object.defineProperty(t.prototype, 'context', {
              get: function() {
                return null;
              },
              enumerable: !0,
              configurable: !0
            }),
            t
          );
        })(
          (function() {
            function e(e, t, n) {
              (this._context = t),
                (this._componentIndex = n),
                (this._appRef = null),
                (this._viewContainerRef = null),
                (this._tViewNode = null),
                (this._view = e);
            }
            return (
              Object.defineProperty(e.prototype, 'rootNodes', {
                get: function() {
                  return null == this._view[lt]
                    ? (function e(t, n, r) {
                        for (var o = n.child; o; ) r.push(Mt(o, t)), 4 === o.type && e(t, o, r), (o = o.next);
                        return r;
                      })(this._view, this._view[pt], [])
                    : [];
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, 'context', {
                get: function() {
                  return this._context ? this._context : this._lookUpContext();
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, 'destroyed', {
                get: function() {
                  return 32 == (32 & this._view[st]);
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.destroy = function() {
                var e, t;
                this._viewContainerRef &&
                  kr(this._view) &&
                  (this._viewContainerRef.detach(this._viewContainerRef.indexOf(this)), (this._viewContainerRef = null)),
                  nr((t = (e = this._view)[vt])) &&
                    t.destroyNode &&
                    (function(t, n, r, o, i) {
                      for (var s = e[it].node, a = -1, u = e, c = s.child; c; ) {
                        var l = null;
                        if (3 === c.type) {
                          sr(2, r, null, Mt(c, u), i);
                          var p = u[c.index];
                          (y = p), Array.isArray(y) && 'number' == typeof y[Nt] && sr(2, r, null, p[Pt], i);
                        } else if (0 === c.type) {
                          var f = u[c.index];
                          sr(2, r, null, f[Pt], i), f[Ot].length && ((l = (u = f[Ot][0])[it].node), (i = f[Pt]));
                        } else if (1 === c.type) {
                          var d = ir(u),
                            h = d[pt].projection[c.projection];
                          (or[++a] = c), (or[++a] = u), h && (l = (u = d[at])[it].data[h.index]);
                        } else l = c.child;
                        if (null === l)
                          for (null === c.next && 8192 & c.flags && ((u = or[a--]), (c = or[a--])), l = c.next; !l; ) {
                            if (null === (c = c.parent || u[it].node) || c === s) return null;
                            0 === c.type && (i = (u = u[at])[c.index][Pt]), (l = 2 === c.type && u[ut] ? (u = u[ut])[it].node : c.next);
                          }
                        c = l;
                      }
                      var y;
                    })(0, 0, t),
                  (function(e) {
                    if (-1 === e[it].childIndex) return cr(e);
                    for (var t = ar(e); t; ) {
                      var n = null;
                      if ((t.length >= ot ? t[it].childIndex > -1 && (n = ar(t)) : t[Ot].length && (n = t[Ot][0]), null == n)) {
                        for (; t && !t[ut] && t !== e; ) cr(t), (t = ur(t, e));
                        cr(t || e), (n = t && t[ut]);
                      }
                      t = n;
                    }
                  })(e),
                  (e[st] |= 32);
              }),
              (e.prototype.onDestroy = function(e) {
                var t, n;
                (n = e),
                  (function(e) {
                    return e[dt] || (e[dt] = []);
                  })((t = this._view)).push(n),
                  t[it].firstTemplatePass &&
                    (function(e) {
                      return e[it].cleanup || (e[it].cleanup = []);
                    })(t).push(t[dt].length - 1, null);
              }),
              (e.prototype.markForCheck = function() {
                !(function(e) {
                  for (var t = e; t && !(64 & t[st]); ) (t[st] |= 4), (t = t[at]);
                  var n, r, o;
                  (t[st] |= 4),
                    (o = 0 === (n = t[ht]).flags),
                    (n.flags |= 1),
                    o &&
                      n.clean == pr &&
                      ((n.clean = new Promise(function(e) {
                        return (r = e);
                      })),
                      n.scheduler(function() {
                        if ((1 & n.flags && ((n.flags &= -2), Er(n)), 2 & n.flags)) {
                          n.flags &= -3;
                          var e = n.playerHandler;
                          e && e.flushPlayers();
                        }
                        (n.clean = pr), r(null);
                      }));
                })(this._view);
              }),
              (e.prototype.detach = function() {
                this._view[st] &= -9;
              }),
              (e.prototype.reattach = function() {
                this._view[st] |= 8;
              }),
              (e.prototype.detectChanges = function() {
                var e = $t();
                e.begin && e.begin(), Tr(this.context), e.end && e.end();
              }),
              (e.prototype.checkNoChanges = function() {
                !(function(e) {
                  ln(!0);
                  try {
                    Tr(e);
                  } finally {
                    ln(!1);
                  }
                })(this.context);
              }),
              (e.prototype.attachToViewContainerRef = function(e) {
                this._viewContainerRef = e;
              }),
              (e.prototype.detachFromAppRef = function() {
                this._appRef = null;
              }),
              (e.prototype.attachToAppRef = function(e) {
                this._appRef = e;
              }),
              (e.prototype._lookUpContext = function() {
                return (this._context = this._view[at][this._componentIndex]);
              }),
              e
            );
          })()
        );
      function Pr(e, t, n, r, o) {
        var i = n[it],
          s = (function(e, t, n) {
            var r = Xt();
            e.firstTemplatePass &&
              (n.providersResolver && n.providersResolver(n),
              (function(e, t, n) {
                var o = -(r.index - ot),
                  i = e.data.length - (65535 & r.providerIndexes);
                (e.expandoInstructions || (e.expandoInstructions = [])).push(o, i, 1);
              })(e),
              (function(e, t, n, r) {
                e.data.push(n);
                var o = new nt(
                  r,
                  (function(e) {
                    return null !== e.template;
                  })(n),
                  null
                );
                e.blueprint.push(o),
                  t.push(o),
                  (function(e, t) {
                    e.expandoInstructions.push(t.hostBindings || Nn), t.hostVars && e.expandoInstructions.push(t.hostVars);
                  })(e, n);
              })(e, t, n, n.factory));
            var o = En(e.data, t, t.length - 1, r);
            return (
              (function(e, t, n, r) {
                var o = Mt(t, e);
                In(n, e),
                  o && In(o, e),
                  null != r.attributes &&
                    3 == t.type &&
                    (function(e, t) {
                      for (var n = Yt(), r = nr(n), o = 0; o < t.length; ) {
                        var i = t[o];
                        if (1 === i) break;
                        if (i === tr) o += 2;
                        else if (0 === i) {
                          var s = t[o + 1],
                            a = t[o + 2],
                            u = t[o + 3];
                          r ? n.setAttribute(e, a, u, s) : e.setAttributeNS(s, a, u), (o += 4);
                        } else (u = t[o + 1]), r ? n.setAttribute(e, i, u) : e.setAttribute(i, u), (o += 2);
                      }
                    })(o, r.attributes);
              })(t, r, o, n),
              o
            );
          })(i, n, t);
        return (
          r.components.push(s),
          (e[ht] = s),
          o &&
            o.forEach(function(e) {
              return e(s, t);
            }),
          i.firstTemplatePass &&
            (function(e, t, n) {
              for (var r = 0; r < n; r++) t.push(lr), e.blueprint.push(lr), e.data.push(null);
            })(i, n, t.hostVars),
          s
        );
      }
      function Dr(e, t) {
        return { components: [], scheduler: e || Jt, clean: Nr, playerHandler: t || null, flags: 0 };
      }
      function Rr(e, t) {
        var n,
          r,
          o,
          i,
          s = Bt(e)[it],
          a = s.data.length - 1;
        (n = a),
          (o = t.doCheck),
          (i = s),
          (r = t.onInit) && (i.initHooks || (i.initHooks = [])).push(n, r),
          o && ((i.initHooks || (i.initHooks = [])).push(n, o), (i.checkHooks || (i.checkHooks = [])).push(n, o)),
          (function(e, t) {
            if (t.firstTemplatePass)
              for (var n = e >> 16, r = n + (4095 & e), o = n; o < r; o++) {
                var i = t.data[o];
                wt(i, t, o), _t(i, t, o), Ct(i, t, o);
              }
          })((a << 16) | 1, s);
      }
      var Fr = new Se('The presence of this token marks an injector as being the root injector.'),
        Mr = {},
        jr = {},
        Vr = [],
        Br = void 0;
      function Hr() {
        return void 0 === Br && (Br = new Vn()), Br;
      }
      var Lr = (function() {
        function e(e, t, n) {
          var r = this;
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this.destroyed = !1);
          var o = [];
          qr([e], function(e) {
            return r.processInjectorType(e, [], o);
          }),
            t &&
              qr(t, function(e) {
                return r.processProvider(e);
              }),
            this.records.set(jn, zr(void 0, this)),
            (this.isRootInjector = this.records.has(Fr)),
            this.injectorDefTypes.forEach(function(e) {
              return r.get(e);
            });
        }
        return (
          (e.prototype.destroy = function() {
            this.assertNotDestroyed(), (this.destroyed = !0);
            try {
              this.onDestroy.forEach(function(e) {
                return e.ngOnDestroy();
              });
            } finally {
              this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear();
            }
          }),
          (e.prototype.get = function(e, t, n) {
            void 0 === t && (t = Mn), void 0 === n && (n = We.Default), this.assertNotDestroyed();
            var r,
              o = Ke(this);
            try {
              if (!(n & We.SkipSelf)) {
                var i = this.records.get(e);
                if (void 0 === i) {
                  var s = ('function' == typeof (r = e) || ('object' == typeof r && r instanceof Se)) && Ee(e);
                  s && this.injectableDefInScope(s) && ((i = zr(Ur(e), Mr)), this.records.set(e, i));
                }
                if (void 0 !== i) return this.hydrate(e, i);
              }
              return (n & We.Self ? Hr() : this.parent).get(e, t);
            } finally {
              Ke(o);
            }
          }),
          (e.prototype.assertNotDestroyed = function() {
            if (this.destroyed) throw new Error('Injector has already been destroyed.');
          }),
          (e.prototype.processInjectorType = function(e, t, n) {
            var r = this;
            if ((e = Dn(e))) {
              var o = Te(e),
                i = (null == o && e.ngModule) || void 0,
                s = void 0 === i ? e : i;
              if (-1 === n.indexOf(s)) {
                var a = (void 0 !== i && e.providers) || Vr;
                if ((void 0 !== i && (o = Te(i)), null != o)) {
                  if ((this.injectorDefTypes.add(s), this.records.set(s, zr(o.factory)), null != o.imports)) {
                    n.push(s);
                    try {
                      qr(o.imports, function(e) {
                        return r.processInjectorType(e, t, n);
                      });
                    } finally {
                    }
                  }
                  null != o.providers &&
                    qr(o.providers, function(e) {
                      return r.processProvider(e);
                    }),
                    qr(a, function(e) {
                      return r.processProvider(e);
                    });
                }
              }
            }
          }),
          (e.prototype.processProvider = function(e) {
            var t = Zr((e = Dn(e))) ? e : Dn(e.provide),
              n = (function(e) {
                var t = (function(e) {
                  var t = void 0;
                  if (Zr(e)) return Ur(Dn(e));
                  if (Wr(e))
                    t = function() {
                      return Dn(e.useValue);
                    };
                  else if (e.useExisting)
                    t = function() {
                      return Ge(Dn(e.useExisting));
                    };
                  else if (e.useFactory)
                    t = function() {
                      return e.useFactory.apply(e, l(Ye(e.deps || [])));
                    };
                  else {
                    var n = Dn(e.useClass || e.provide);
                    if (!e.deps) return Ur(n);
                    t = function() {
                      return new (n.bind.apply(n, l([void 0], Ye(e.deps))))();
                    };
                  }
                  return t;
                })(e);
                return Wr(e) ? zr(void 0, e.useValue) : zr(t, Mr);
              })(e);
            if (Zr(e) || !0 !== e.multi) {
              var r = this.records.get(t);
              if (r && void 0 !== r.multi) throw new Error('Mixed multi-provider for ' + Be(t));
            } else {
              var o = this.records.get(t);
              if (o) {
                if (void 0 === o.multi) throw new Error('Mixed multi-provider for ' + t + '.');
              } else
                ((o = zr(void 0, Mr, !0)).factory = function() {
                  return Ye(o.multi);
                }),
                  this.records.set(t, o);
              (t = e), o.multi.push(e);
            }
            this.records.set(t, n);
          }),
          (e.prototype.hydrate = function(e, t) {
            if (t.value === jr) throw new Error('Circular dep for ' + Be(e));
            var n;
            return (
              t.value === Mr && ((t.value = jr), (t.value = t.factory())),
              'object' == typeof t.value &&
                t.value &&
                'object' == typeof (n = t.value) &&
                null != n &&
                n.ngOnDestroy &&
                'function' == typeof n.ngOnDestroy &&
                this.onDestroy.add(t.value),
              t.value
            );
          }),
          (e.prototype.injectableDefInScope = function(e) {
            return (
              !!e.providedIn &&
              ('string' == typeof e.providedIn
                ? 'any' === e.providedIn || ('root' === e.providedIn && this.isRootInjector)
                : this.injectorDefTypes.has(e.providedIn))
            );
          }),
          e
        );
      })();
      function Ur(e) {
        var t = Ee(e);
        if (null === t) {
          if (e instanceof Se) throw new Error('Token ' + Be(e) + ' is missing an ngInjectableDef definition.');
          return function() {
            return new e();
          };
        }
        return t.factory;
      }
      function zr(e, t, n) {
        return void 0 === t && (t = Mr), void 0 === n && (n = !1), { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function qr(e, t) {
        e.forEach(function(e) {
          return Array.isArray(e) ? qr(e, t) : t(e);
        });
      }
      function Wr(e) {
        return Wn in e;
      }
      function Zr(e) {
        return 'function' == typeof e;
      }
      var Kr = (function() {
          return function() {};
        })(),
        Qr = (function() {
          return function() {};
        })();
      function Gr(e) {
        var t = Error('No component factory found for ' + Be(e) + '. Did you add it to @NgModule.entryComponents?');
        return (t[Jr] = e), t;
      }
      var Jr = 'ngComponent',
        Yr = (function() {
          function e() {}
          return (
            (e.prototype.resolveComponentFactory = function(e) {
              throw Gr(e);
            }),
            e
          );
        })(),
        $r = (function() {
          function e() {}
          return (e.NULL = new Yr()), e;
        })(),
        Xr = (function() {
          function e(e, t, n) {
            (this._parent = t), (this._ngModule = n), (this._factories = new Map());
            for (var r = 0; r < e.length; r++) {
              var o = e[r];
              this._factories.set(o.componentType, o);
            }
          }
          return (
            (e.prototype.resolveComponentFactory = function(e) {
              var t = this._factories.get(e);
              if ((!t && this._parent && (t = this._parent.resolveComponentFactory(e)), !t)) throw Gr(e);
              return new eo(t, this._ngModule);
            }),
            e
          );
        })(),
        eo = (function(e) {
          function t(t, n) {
            var r = e.call(this) || this;
            return (
              (r.factory = t),
              (r.ngModule = n),
              (r.selector = t.selector),
              (r.componentType = t.componentType),
              (r.ngContentSelectors = t.ngContentSelectors),
              (r.inputs = t.inputs),
              (r.outputs = t.outputs),
              r
            );
          }
          return (
            o(t, e),
            (t.prototype.create = function(e, t, n, r) {
              return this.factory.create(e, t, n, r || this.ngModule);
            }),
            t
          );
        })(Qr),
        to = (function() {
          function e(e) {
            this.nativeElement = e;
          }
          return (
            (e.__NG_ELEMENT_ID__ = function() {
              return no(e);
            }),
            e
          );
        })(),
        no = Nn,
        ro = (function() {
          return function() {};
        })(),
        oo = (function() {
          return function() {};
        })(),
        io = (function(e) {
          return (e[(e.Important = 1)] = 'Important'), (e[(e.DashCase = 2)] = 'DashCase'), e;
        })({}),
        so = (function() {
          function e() {}
          return (
            (e.__NG_ELEMENT_ID__ = function() {
              return ao();
            }),
            e
          );
        })(),
        ao = Nn,
        uo = new ((function() {
          return function(e) {
            (this.full = e),
              (this.major = e.split('.')[0]),
              (this.minor = e.split('.')[1]),
              (this.patch = e
                .split('.')
                .slice(2)
                .join('.'));
          };
        })())('7.1.4'),
        co = (function(e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            o(t, e),
            (t.prototype.resolveComponentFactory = function(e) {
              return new vo(e[be] || null);
            }),
            t
          );
        })($r);
      function lo(e) {
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      var po = new Se('ROOT_CONTEXT_TOKEN', {
          providedIn: 'root',
          factory: function() {
            return Dr(Ge(fo));
          }
        }),
        fo = new Se('SCHEDULER_TOKEN', {
          providedIn: 'root',
          factory: function() {
            return Jt;
          }
        }),
        ho = new Se('WRAP_RENDERER_FACTORY2'),
        yo = {},
        vo = (function(e) {
          function t(t) {
            var n = e.call(this) || this;
            return (n.componentDef = t), (n.componentType = t.type), (n.selector = t.selectors[0][0]), (n.ngContentSelectors = []), n;
          }
          return (
            o(t, e),
            Object.defineProperty(t.prototype, 'inputs', {
              get: function() {
                return lo(this.componentDef.inputs);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'outputs', {
              get: function() {
                return lo(this.componentDef.outputs);
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.create = function(e, t, n, r) {
              var i,
                s = void 0 === n;
              i = r
                ? r.injector.get(ho, function(e) {
                    return e;
                  })(r.injector.get(oo))
                : rr;
              var a,
                u,
                c = s
                  ? ((a = this.selector),
                    nr((u = i.createRenderer(null, this.componentDef) || Yt()))
                      ? u.createElement(a, mr)
                      : null === mr
                      ? u.createElement(a)
                      : u.createElementNS(mr, a))
                  : _r(i, n),
                l = this.componentDef.onPush ? 68 : 66,
                p = r && !s ? r.injector.get(po) : Dr(),
                f = i.createRenderer(c, this.componentDef),
                d = r
                  ? (function(e, t) {
                      return {
                        get: function(n, r) {
                          var o = e.get(n, yo);
                          return o !== yo ? o : t.get(n, r);
                        }
                      };
                    })(e, r.injector)
                  : e;
              n && c && (nr(f) ? f.setAttribute(c, 'ng-version', uo.full) : c.setAttribute('ng-version', uo.full));
              var h,
                y,
                v = dr(null, f, wr(-1, null, 1, 0, null, null, null), p, l, void 0, d),
                g = dn(v, null);
              try {
                i.begin && i.begin();
                var m = (function(e, t, n, r, o) {
                  (Wt = !1), (qt = null);
                  var i,
                    s,
                    a,
                    u = n[it],
                    c = dr(
                      n,
                      r,
                      (i = t.template).ngPrivateData ||
                        (i.ngPrivateData = wr(-1, i, t.consts, t.vars, t.directiveDefs, t.pipeDefs, t.viewQuery)),
                      null,
                      t.onPush ? 4 : 2,
                      o
                    ),
                    l = hr(0, 3, e, null, null);
                  return (
                    u.firstTemplatePass &&
                      ((s = bn(l, n)),
                      (a = t.type),
                      (function(e, t, n) {
                        var r = a[xe];
                        null == r && (r = a[xe] = mn++);
                        var o = r & gn,
                          i = 1 << o,
                          s = 64 & o,
                          u = 32 & o,
                          c = t.data;
                        128 & o
                          ? s
                            ? u
                              ? (c[e + 7] |= i)
                              : (c[e + 6] |= i)
                            : u
                            ? (c[e + 5] |= i)
                            : (c[e + 4] |= i)
                          : s
                          ? u
                            ? (c[e + 3] |= i)
                            : (c[e + 2] |= i)
                          : u
                          ? (c[e + 1] |= i)
                          : (c[e] |= i);
                      })(s, n[it]),
                      (l.flags = 4096),
                      (function(e, t, n) {
                        (e.flags = (t << 16) | (4096 & e.flags) | 1), (e.providerIndexes = t);
                      })(l, n.length),
                      (function(e) {
                        var t = on();
                        (t.components || (t.components = [])).push(e.index);
                      })(l)),
                    (c[lt] = n[ot]),
                    (c[pt] = l),
                    (n[ot] = c)
                  );
                })(c, this.componentDef, v, f);
                if (((y = v[it].data[0 + ot]), t))
                  for (var b = 0, w = v[it], _ = (y.projection = []), C = 0; C < t.length; C++) {
                    for (var x = t[C], k = null, E = null, T = 0; T < x.length; T++) {
                      w.firstTemplatePass &&
                        (w.expandoStartIndex++,
                        w.blueprint.splice(++b + ot, 0, null),
                        w.data.splice(b + ot, 0, null),
                        v.splice(b + ot, 0, null));
                      var S = hr(b, 3, x[T], null, null);
                      E ? (E.next = S) : (k = S), (E = S);
                    }
                    _.push(k);
                  }
                (h = Pr(m, this.componentDef, v, p, [Rr])), fr(v, 1);
              } finally {
                hn(g, !0), i.end && i.end();
              }
              var A = new go(
                this.componentType,
                h,
                (function(e, t, n) {
                  return (
                    Ir ||
                      (Ir = (function(e) {
                        function t() {
                          return (null !== e && e.apply(this, arguments)) || this;
                        }
                        return o(t, e), t;
                      })(to)),
                    new Ir(Mt(t, n))
                  );
                })(0, y, v),
                v,
                y
              );
              return s && (A.hostView._tViewNode.child = y), A;
            }),
            t
          );
        })(Qr),
        go = (function(e) {
          function t(t, n, r, o, i) {
            var s = e.call(this) || this;
            return (
              (s.location = r),
              (s._rootView = o),
              (s._tNode = i),
              (s.destroyCbs = []),
              (s.instance = n),
              (s.hostView = s.changeDetectorRef = new Or(o)),
              (s.hostView._tViewNode = (function(e, t) {
                null == t[it].node && (t[it].node = Cr(t, 2, -1, null, null, null)), rn(!0);
                var n = t[it].node;
                return en(n), (t[pt] = n);
              })(0, o)),
              (s.componentType = t),
              s
            );
          }
          return (
            o(t, e),
            Object.defineProperty(t.prototype, 'injector', {
              get: function() {
                return new An(this._tNode, this._rootView);
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.destroy = function() {
              this.destroyCbs.forEach(function(e) {
                return e();
              }),
                (this.destroyCbs = null);
            }),
            (t.prototype.onDestroy = function(e) {
              this.destroyCbs.push(e);
            }),
            t
          );
        })(Kr),
        mo = !0,
        bo = !1;
      function wo() {
        return (bo = !0), mo;
      }
      var _o = (function() {
          function e(e) {
            if (
              ((this.defaultDoc = e),
              (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument('sanitization-inert')),
              (this.inertBodyElement = this.inertDocument.body),
              null == this.inertBodyElement)
            ) {
              var t = this.inertDocument.createElement('html');
              this.inertDocument.appendChild(t),
                (this.inertBodyElement = this.inertDocument.createElement('body')),
                t.appendChild(this.inertBodyElement);
            }
            (this.inertBodyElement.innerHTML = '<svg><g onload="this.parentNode.remove()"></g></svg>'),
              !this.inertBodyElement.querySelector || this.inertBodyElement.querySelector('svg')
                ? ((this.inertBodyElement.innerHTML = '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">'),
                  (this.getInertBodyElement =
                    this.inertBodyElement.querySelector &&
                    this.inertBodyElement.querySelector('svg img') &&
                    (function() {
                      try {
                        return !!window.DOMParser;
                      } catch (e) {
                        return !1;
                      }
                    })()
                      ? this.getInertBodyElement_DOMParser
                      : this.getInertBodyElement_InertDocument))
                : (this.getInertBodyElement = this.getInertBodyElement_XHR);
          }
          return (
            (e.prototype.getInertBodyElement_XHR = function(e) {
              e = '<body><remove></remove>' + e + '</body>';
              try {
                e = encodeURI(e);
              } catch (r) {
                return null;
              }
              var t = new XMLHttpRequest();
              (t.responseType = 'document'), t.open('GET', 'data:text/html;charset=utf-8,' + e, !1), t.send(void 0);
              var n = t.response.body;
              return n.removeChild(n.firstChild), n;
            }),
            (e.prototype.getInertBodyElement_DOMParser = function(e) {
              e = '<body><remove></remove>' + e + '</body>';
              try {
                var t = new window.DOMParser().parseFromString(e, 'text/html').body;
                return t.removeChild(t.firstChild), t;
              } catch (n) {
                return null;
              }
            }),
            (e.prototype.getInertBodyElement_InertDocument = function(e) {
              var t = this.inertDocument.createElement('template');
              return 'content' in t
                ? ((t.innerHTML = e), t)
                : ((this.inertBodyElement.innerHTML = e),
                  this.defaultDoc.documentMode && this.stripCustomNsAttrs(this.inertBodyElement),
                  this.inertBodyElement);
            }),
            (e.prototype.stripCustomNsAttrs = function(e) {
              for (var t = e.attributes, n = t.length - 1; 0 < n; n--) {
                var r = t.item(n).name;
                ('xmlns:ns1' !== r && 0 !== r.indexOf('ns1:')) || e.removeAttribute(r);
              }
              for (var o = e.firstChild; o; ) o.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(o), (o = o.nextSibling);
            }),
            e
          );
        })(),
        Co = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
        xo = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function ko(e) {
        return (e = String(e)).match(Co) || e.match(xo)
          ? e
          : (wo() && console.warn('WARNING: sanitizing unsafe URL value ' + e + ' (see http://g.co/ng/security#xss)'), 'unsafe:' + e);
      }
      function Eo(e) {
        var t,
          n,
          r = {};
        try {
          for (var o = u(e.split(',')), i = o.next(); !i.done; i = o.next()) r[i.value] = !0;
        } catch (s) {
          t = { error: s };
        } finally {
          try {
            i && !i.done && (n = o.return) && n.call(o);
          } finally {
            if (t) throw t.error;
          }
        }
        return r;
      }
      function To() {
        for (var e, t, n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
        var o = {};
        try {
          for (var i = u(n), s = i.next(); !s.done; s = i.next()) {
            var a = s.value;
            for (var c in a) a.hasOwnProperty(c) && (o[c] = !0);
          }
        } catch (l) {
          e = { error: l };
        } finally {
          try {
            s && !s.done && (t = i.return) && t.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return o;
      }
      var So,
        Ao = Eo('area,br,col,hr,img,wbr'),
        Io = Eo('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        No = Eo('rp,rt'),
        Oo = To(No, Io),
        Po = To(
          Ao,
          To(
            Io,
            Eo(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
            )
          ),
          To(
            No,
            Eo(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
            )
          ),
          Oo
        ),
        Do = Eo('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        Ro = Eo('srcset'),
        Fo = To(
          Do,
          Ro,
          Eo(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
          )
        ),
        Mo = (function() {
          function e() {
            (this.sanitizedSomething = !1), (this.buf = []);
          }
          return (
            (e.prototype.sanitizeChildren = function(e) {
              for (var t = e.firstChild, n = !0; t; )
                if (
                  (t.nodeType === Node.ELEMENT_NODE
                    ? (n = this.startElement(t))
                    : t.nodeType === Node.TEXT_NODE
                    ? this.chars(t.nodeValue)
                    : (this.sanitizedSomething = !0),
                  n && t.firstChild)
                )
                  t = t.firstChild;
                else
                  for (; t; ) {
                    t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                    var r = this.checkClobberedElement(t, t.nextSibling);
                    if (r) {
                      t = r;
                      break;
                    }
                    t = this.checkClobberedElement(t, t.parentNode);
                  }
              return this.buf.join('');
            }),
            (e.prototype.startElement = function(e) {
              var t,
                n = e.nodeName.toLowerCase();
              if (!Po.hasOwnProperty(n)) return (this.sanitizedSomething = !0), !1;
              this.buf.push('<'), this.buf.push(n);
              for (var r = e.attributes, o = 0; o < r.length; o++) {
                var i = r.item(o),
                  s = i.name,
                  a = s.toLowerCase();
                if (Fo.hasOwnProperty(a)) {
                  var u = i.value;
                  Do[a] && (u = ko(u)),
                    Ro[a] &&
                      ((t = u),
                      (u = (t = String(t))
                        .split(',')
                        .map(function(e) {
                          return ko(e.trim());
                        })
                        .join(', '))),
                    this.buf.push(' ', s, '="', Bo(u), '"');
                } else this.sanitizedSomething = !0;
              }
              return this.buf.push('>'), !0;
            }),
            (e.prototype.endElement = function(e) {
              var t = e.nodeName.toLowerCase();
              Po.hasOwnProperty(t) && !Ao.hasOwnProperty(t) && (this.buf.push('</'), this.buf.push(t), this.buf.push('>'));
            }),
            (e.prototype.chars = function(e) {
              this.buf.push(Bo(e));
            }),
            (e.prototype.checkClobberedElement = function(e, t) {
              if (t && (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY)
                throw new Error('Failed to sanitize html because the element is clobbered: ' + e.outerHTML);
              return t;
            }),
            e
          );
        })(),
        jo = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        Vo = /([^\#-~ |!])/g;
      function Bo(e) {
        return e
          .replace(/&/g, '&amp;')
          .replace(jo, function(e) {
            return '&#' + (1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320) + 65536) + ';';
          })
          .replace(Vo, function(e) {
            return '&#' + e.charCodeAt(0) + ';';
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      function Ho(e) {
        return 'content' in e &&
          (function(e) {
            return e.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === e.nodeName;
          })(e)
          ? e.content
          : null;
      }
      var Lo = {
          provide: $r,
          useFactory: function() {
            return new co();
          },
          deps: []
        },
        Uo = (function(e) {
          function t(t, n) {
            var r = e.call(this) || this;
            return (
              (r._bootstrapComponents = []),
              (r.destroyCbs = []),
              (r._bootstrapComponents = (t[Ce] || null).bootstrap),
              (r.injector = (function(e, t, n) {
                return void 0 === t && (t = null), void 0 === n && (n = null), (t = t || Hr()), new Lr(e, n, t);
              })(t, n, [Lo, { provide: Xn, useValue: r }])),
              (r.instance = r.injector.get(t)),
              (r.componentFactoryResolver = new co()),
              r
            );
          }
          return (
            o(t, e),
            (t.prototype.destroy = function() {
              this.destroyCbs.forEach(function(e) {
                return e();
              }),
                (this.destroyCbs = null);
            }),
            (t.prototype.onDestroy = function(e) {
              this.destroyCbs.push(e);
            }),
            t
          );
        })(Xn);
      !(function(e) {
        function t(t) {
          var n = e.call(this) || this;
          return (n.moduleType = t), n;
        }
        o(t, e),
          (t.prototype.create = function(e) {
            return new Uo(this.moduleType, e);
          });
      })(er);
      var zo = (function(e) {
          function t(t) {
            void 0 === t && (t = !1);
            var n = e.call(this) || this;
            return (n.__isAsync = t), n;
          }
          return (
            o(t, e),
            (t.prototype.emit = function(t) {
              e.prototype.next.call(this, t);
            }),
            (t.prototype.subscribe = function(t, n, r) {
              var o,
                i = function(e) {
                  return null;
                },
                s = function() {
                  return null;
                };
              t && 'object' == typeof t
                ? ((o = this.__isAsync
                    ? function(e) {
                        setTimeout(function() {
                          return t.next(e);
                        });
                      }
                    : function(e) {
                        t.next(e);
                      }),
                  t.error &&
                    (i = this.__isAsync
                      ? function(e) {
                          setTimeout(function() {
                            return t.error(e);
                          });
                        }
                      : function(e) {
                          t.error(e);
                        }),
                  t.complete &&
                    (s = this.__isAsync
                      ? function() {
                          setTimeout(function() {
                            return t.complete();
                          });
                        }
                      : function() {
                          t.complete();
                        }))
                : ((o = this.__isAsync
                    ? function(e) {
                        setTimeout(function() {
                          return t(e);
                        });
                      }
                    : function(e) {
                        t(e);
                      }),
                  n &&
                    (i = this.__isAsync
                      ? function(e) {
                          setTimeout(function() {
                            return n(e);
                          });
                        }
                      : function(e) {
                          n(e);
                        }),
                  r &&
                    (s = this.__isAsync
                      ? function() {
                          setTimeout(function() {
                            return r();
                          });
                        }
                      : function() {
                          r();
                        }));
              var a = e.prototype.subscribe.call(this, o, i, s);
              return t instanceof w && t.add(a), a;
            }),
            t
          );
        })(j),
        qo = (function() {
          function e() {}
          return (
            (e.__NG_ELEMENT_ID__ = function() {
              return Wo(e, to);
            }),
            e
          );
        })(),
        Wo = Nn,
        Zo = (function(e) {
          return (
            (e[(e.NONE = 0)] = 'NONE'),
            (e[(e.HTML = 1)] = 'HTML'),
            (e[(e.STYLE = 2)] = 'STYLE'),
            (e[(e.SCRIPT = 3)] = 'SCRIPT'),
            (e[(e.URL = 4)] = 'URL'),
            (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
            e
          );
        })({}),
        Ko = (function() {
          return function() {};
        })(),
        Qo = new RegExp(
          '^([-,."\'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$',
          'g'
        ),
        Go = /^url\(([^)]+)\)$/,
        Jo = 'ngDebugContext',
        Yo = 'ngOriginalError',
        $o = 'ngErrorLogger';
      function Xo(e) {
        return e[Jo];
      }
      function ei(e) {
        return e[Yo];
      }
      function ti(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        e.error.apply(e, l(t));
      }
      var ni = (function() {
        function e() {
          this._console = console;
        }
        return (
          (e.prototype.handleError = function(e) {
            var t = this._findOriginalError(e),
              n = this._findContext(e),
              r = (function(e) {
                return e[$o] || ti;
              })(e);
            r(this._console, 'ERROR', e), t && r(this._console, 'ORIGINAL ERROR', t), n && r(this._console, 'ERROR CONTEXT', n);
          }),
          (e.prototype._findContext = function(e) {
            return e ? (Xo(e) ? Xo(e) : this._findContext(ei(e))) : null;
          }),
          (e.prototype._findOriginalError = function(e) {
            for (var t = ei(e); t && ei(t); ) t = ei(t);
            return t;
          }),
          e
        );
      })();
      function ri(e) {
        return !!e && 'function' == typeof e.then;
      }
      function oi(e) {
        return !!e && 'function' == typeof e.subscribe;
      }
      var ii = new Se('Application Initializer'),
        si = (function() {
          function e(e) {
            var t = this;
            (this.appInits = e),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise(function(e, n) {
                (t.resolve = e), (t.reject = n);
              }));
          }
          return (
            (e.prototype.runInitializers = function() {
              var e = this;
              if (!this.initialized) {
                var t = [],
                  n = function() {
                    (e.done = !0), e.resolve();
                  };
                if (this.appInits)
                  for (var r = 0; r < this.appInits.length; r++) {
                    var o = this.appInits[r]();
                    ri(o) && t.push(o);
                  }
                Promise.all(t)
                  .then(function() {
                    n();
                  })
                  .catch(function(t) {
                    e.reject(t);
                  }),
                  0 === t.length && n(),
                  (this.initialized = !0);
              }
            }),
            e
          );
        })(),
        ai = new Se('AppId');
      function ui() {
        return '' + ci() + ci() + ci();
      }
      function ci() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      var li = new Se('Platform Initializer'),
        pi = new Se('Platform ID'),
        fi = new Se('appBootstrapListener'),
        di = (function() {
          function e() {}
          return (
            (e.prototype.log = function(e) {
              console.log(e);
            }),
            (e.prototype.warn = function(e) {
              console.warn(e);
            }),
            e
          );
        })();
      function hi() {
        throw new Error('Runtime compiler is not loaded');
      }
      var yi,
        vi,
        gi = (function() {
          function e() {}
          return (
            (e.prototype.compileModuleSync = function(e) {
              throw hi();
            }),
            (e.prototype.compileModuleAsync = function(e) {
              throw hi();
            }),
            (e.prototype.compileModuleAndAllComponentsSync = function(e) {
              throw hi();
            }),
            (e.prototype.compileModuleAndAllComponentsAsync = function(e) {
              throw hi();
            }),
            (e.prototype.clearCache = function() {}),
            (e.prototype.clearCacheFor = function(e) {}),
            (e.prototype.getModuleId = function(e) {}),
            e
          );
        })(),
        mi = (function() {
          return function() {};
        })();
      function bi() {
        var e = De.wtf;
        return !(!e || !(yi = e.trace) || ((vi = yi.events), 0));
      }
      var wi = bi();
      function _i(e, t) {
        return null;
      }
      var Ci = wi
          ? function(e, t) {
              return void 0 === t && (t = null), vi.createScope(e, t);
            }
          : function(e, t) {
              return _i;
            },
        xi = wi
          ? function(e, t) {
              return yi.leaveScope(e, t), t;
            }
          : function(e, t) {
              return t;
            },
        ki = (function() {
          function e(e) {
            var t,
              n = e.enableLongStackTrace,
              r = void 0 !== n && n;
            if (
              ((this.hasPendingMicrotasks = !1),
              (this.hasPendingMacrotasks = !1),
              (this.isStable = !0),
              (this.onUnstable = new zo(!1)),
              (this.onMicrotaskEmpty = new zo(!1)),
              (this.onStable = new zo(!1)),
              (this.onError = new zo(!1)),
              'undefined' == typeof Zone)
            )
              throw new Error('In this configuration Angular requires Zone.js');
            Zone.assertZonePatched(),
              (this._nesting = 0),
              (this._outer = this._inner = Zone.current),
              Zone.wtfZoneSpec && (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
              Zone.TaskTrackingZoneSpec && (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
              r && Zone.longStackTraceZoneSpec && (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
              ((t = this)._inner = t._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: function(e, n, r, o, i, s) {
                  try {
                    return Ai(t), e.invokeTask(r, o, i, s);
                  } finally {
                    Ii(t);
                  }
                },
                onInvoke: function(e, n, r, o, i, s, a) {
                  try {
                    return Ai(t), e.invoke(r, o, i, s, a);
                  } finally {
                    Ii(t);
                  }
                },
                onHasTask: function(e, n, r, o) {
                  e.hasTask(r, o),
                    n === r &&
                      ('microTask' == o.change
                        ? ((t.hasPendingMicrotasks = o.microTask), Si(t))
                        : 'macroTask' == o.change && (t.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: function(e, n, r, o) {
                  return (
                    e.handleError(r, o),
                    t.runOutsideAngular(function() {
                      return t.onError.emit(o);
                    }),
                    !1
                  );
                }
              }));
          }
          return (
            (e.isInAngularZone = function() {
              return !0 === Zone.current.get('isAngularZone');
            }),
            (e.assertInAngularZone = function() {
              if (!e.isInAngularZone()) throw new Error('Expected to be in Angular Zone, but it is not!');
            }),
            (e.assertNotInAngularZone = function() {
              if (e.isInAngularZone()) throw new Error('Expected to not be in Angular Zone, but it is!');
            }),
            (e.prototype.run = function(e, t, n) {
              return this._inner.run(e, t, n);
            }),
            (e.prototype.runTask = function(e, t, n, r) {
              var o = this._inner,
                i = o.scheduleEventTask('NgZoneEvent: ' + r, e, Ti, Ei, Ei);
              try {
                return o.runTask(i, t, n);
              } finally {
                o.cancelTask(i);
              }
            }),
            (e.prototype.runGuarded = function(e, t, n) {
              return this._inner.runGuarded(e, t, n);
            }),
            (e.prototype.runOutsideAngular = function(e) {
              return this._outer.run(e);
            }),
            e
          );
        })();
      function Ei() {}
      var Ti = {};
      function Si(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(function() {
                  return e.onStable.emit(null);
                });
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Ai(e) {
        e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Ii(e) {
        e._nesting--, Si(e);
      }
      var Ni,
        Oi = (function() {
          function e() {
            (this.hasPendingMicrotasks = !1),
              (this.hasPendingMacrotasks = !1),
              (this.isStable = !0),
              (this.onUnstable = new zo()),
              (this.onMicrotaskEmpty = new zo()),
              (this.onStable = new zo()),
              (this.onError = new zo());
          }
          return (
            (e.prototype.run = function(e) {
              return e();
            }),
            (e.prototype.runGuarded = function(e) {
              return e();
            }),
            (e.prototype.runOutsideAngular = function(e) {
              return e();
            }),
            (e.prototype.runTask = function(e) {
              return e();
            }),
            e
          );
        })(),
        Pi = (function() {
          function e(e) {
            var t = this;
            (this._ngZone = e),
              (this._pendingCount = 0),
              (this._isZoneStable = !0),
              (this._didWork = !1),
              (this._callbacks = []),
              (this.taskTrackingZone = null),
              this._watchAngularEvents(),
              e.run(function() {
                t.taskTrackingZone = 'undefined' == typeof Zone ? null : Zone.current.get('TaskTrackingZone');
              });
          }
          return (
            (e.prototype._watchAngularEvents = function() {
              var e = this;
              this._ngZone.onUnstable.subscribe({
                next: function() {
                  (e._didWork = !0), (e._isZoneStable = !1);
                }
              }),
                this._ngZone.runOutsideAngular(function() {
                  e._ngZone.onStable.subscribe({
                    next: function() {
                      ki.assertNotInAngularZone(),
                        je(function() {
                          (e._isZoneStable = !0), e._runCallbacksIfReady();
                        });
                    }
                  });
                });
            }),
            (e.prototype.increasePendingRequestCount = function() {
              return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
            }),
            (e.prototype.decreasePendingRequestCount = function() {
              if (((this._pendingCount -= 1), this._pendingCount < 0)) throw new Error('pending async requests below zero');
              return this._runCallbacksIfReady(), this._pendingCount;
            }),
            (e.prototype.isStable = function() {
              return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
            }),
            (e.prototype._runCallbacksIfReady = function() {
              var e = this;
              if (this.isStable())
                je(function() {
                  for (; 0 !== e._callbacks.length; ) {
                    var t = e._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(e._didWork);
                  }
                  e._didWork = !1;
                });
              else {
                var t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(function(e) {
                  return !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1);
                })),
                  (this._didWork = !0);
              }
            }),
            (e.prototype.getPendingTasks = function() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map(function(e) {
                    return { source: e.source, creationLocation: e.creationLocation, data: e.data };
                  })
                : [];
            }),
            (e.prototype.addCallback = function(e, t, n) {
              var r = this,
                o = -1;
              t &&
                t > 0 &&
                (o = setTimeout(function() {
                  (r._callbacks = r._callbacks.filter(function(e) {
                    return e.timeoutId !== o;
                  })),
                    e(r._didWork, r.getPendingTasks());
                }, t)),
                this._callbacks.push({ doneCb: e, timeoutId: o, updateCb: n });
            }),
            (e.prototype.whenStable = function(e, t, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(e, t, n), this._runCallbacksIfReady();
            }),
            (e.prototype.getPendingRequestCount = function() {
              return this._pendingCount;
            }),
            (e.prototype.findProviders = function(e, t, n) {
              return [];
            }),
            e
          );
        })(),
        Di = (function() {
          function e() {
            (this._applications = new Map()), Ri.addToWindow(this);
          }
          return (
            (e.prototype.registerApplication = function(e, t) {
              this._applications.set(e, t);
            }),
            (e.prototype.unregisterApplication = function(e) {
              this._applications.delete(e);
            }),
            (e.prototype.unregisterAllApplications = function() {
              this._applications.clear();
            }),
            (e.prototype.getTestability = function(e) {
              return this._applications.get(e) || null;
            }),
            (e.prototype.getAllTestabilities = function() {
              return Array.from(this._applications.values());
            }),
            (e.prototype.getAllRootElements = function() {
              return Array.from(this._applications.keys());
            }),
            (e.prototype.findTestabilityInTree = function(e, t) {
              return void 0 === t && (t = !0), Ri.findTestabilityInTree(this, e, t);
            }),
            s([a('design:paramtypes', [])], e)
          );
        })(),
        Ri = new ((function() {
          function e() {}
          return (
            (e.prototype.addToWindow = function(e) {}),
            (e.prototype.findTestabilityInTree = function(e, t, n) {
              return null;
            }),
            e
          );
        })())(),
        Fi = new Se('AllowMultipleToken'),
        Mi = (function() {
          return function(e, t) {
            (this.name = e), (this.token = t);
          };
        })();
      function ji(e, t, n) {
        void 0 === n && (n = []);
        var r = 'Platform: ' + t,
          o = new Se(r);
        return function(t) {
          void 0 === t && (t = []);
          var i = Vi();
          if (!i || i.injector.get(Fi, !1))
            if (e) e(n.concat(t).concat({ provide: o, useValue: !0 }));
            else {
              var s = n.concat(t).concat({ provide: o, useValue: !0 });
              !(function(e) {
                if (Ni && !Ni.destroyed && !Ni.injector.get(Fi, !1))
                  throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
                Ni = e.get(Bi);
                var t = e.get(li, null);
                t &&
                  t.forEach(function(e) {
                    return e();
                  });
              })(Bn.create({ providers: s, name: r }));
            }
          return (function(e) {
            var t = Vi();
            if (!t) throw new Error('No platform exists!');
            if (!t.injector.get(e, null))
              throw new Error('A platform with a different configuration has been created. Please destroy it first.');
            return t;
          })(o);
        };
      }
      function Vi() {
        return Ni && !Ni.destroyed ? Ni : null;
      }
      var Bi = (function() {
        function e(e) {
          (this._injector = e), (this._modules = []), (this._destroyListeners = []), (this._destroyed = !1);
        }
        return (
          (e.prototype.bootstrapModuleFactory = function(e, t) {
            var n,
              r = this,
              o =
                'noop' === (n = t ? t.ngZone : void 0)
                  ? new Oi()
                  : ('zone.js' === n ? void 0 : n) || new ki({ enableLongStackTrace: wo() }),
              i = [{ provide: ki, useValue: o }];
            return o.run(function() {
              var t = Bn.create({ providers: i, parent: r.injector, name: e.moduleType.name }),
                n = e.create(t),
                s = n.injector.get(ni, null);
              if (!s) throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
              return (
                n.onDestroy(function() {
                  return Ui(r._modules, n);
                }),
                o.runOutsideAngular(function() {
                  return o.onError.subscribe({
                    next: function(e) {
                      s.handleError(e);
                    }
                  });
                }),
                (function(e, t, o) {
                  try {
                    var i =
                      ((s = n.injector.get(si)).runInitializers(),
                      s.donePromise.then(function() {
                        return r._moduleDoBootstrap(n), n;
                      }));
                    return ri(i)
                      ? i.catch(function(n) {
                          throw (t.runOutsideAngular(function() {
                            return e.handleError(n);
                          }),
                          n);
                        })
                      : i;
                  } catch (a) {
                    throw (t.runOutsideAngular(function() {
                      return e.handleError(a);
                    }),
                    a);
                  }
                  var s;
                })(s, o)
              );
            });
          }),
          (e.prototype.bootstrapModule = function(e, t) {
            var n = this;
            void 0 === t && (t = []);
            var r = Hi({}, t);
            return (function(e, t, n) {
              return e
                .get(mi)
                .createCompiler([t])
                .compileModuleAsync(n);
            })(this.injector, r, e).then(function(e) {
              return n.bootstrapModuleFactory(e, r);
            });
          }),
          (e.prototype._moduleDoBootstrap = function(e) {
            var t = e.injector.get(Li);
            if (e._bootstrapComponents.length > 0)
              e._bootstrapComponents.forEach(function(e) {
                return t.bootstrap(e);
              });
            else {
              if (!e.instance.ngDoBootstrap)
                throw new Error(
                  'The module ' +
                    Be(e.instance.constructor) +
                    ' was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.'
                );
              e.instance.ngDoBootstrap(t);
            }
            this._modules.push(e);
          }),
          (e.prototype.onDestroy = function(e) {
            this._destroyListeners.push(e);
          }),
          Object.defineProperty(e.prototype, 'injector', {
            get: function() {
              return this._injector;
            },
            enumerable: !0,
            configurable: !0
          }),
          (e.prototype.destroy = function() {
            if (this._destroyed) throw new Error('The platform has already been destroyed!');
            this._modules.slice().forEach(function(e) {
              return e.destroy();
            }),
              this._destroyListeners.forEach(function(e) {
                return e();
              }),
              (this._destroyed = !0);
          }),
          Object.defineProperty(e.prototype, 'destroyed', {
            get: function() {
              return this._destroyed;
            },
            enumerable: !0,
            configurable: !0
          }),
          e
        );
      })();
      function Hi(e, t) {
        return Array.isArray(t) ? t.reduce(Hi, e) : i({}, e, t);
      }
      var Li = (function() {
        function e(e, t, n, r, o, i) {
          var s = this;
          (this._zone = e),
            (this._console = t),
            (this._injector = n),
            (this._exceptionHandler = r),
            (this._componentFactoryResolver = o),
            (this._initStatus = i),
            (this._bootstrapListeners = []),
            (this._views = []),
            (this._runningTick = !1),
            (this._enforceNoNewChanges = !1),
            (this._stable = !0),
            (this.componentTypes = []),
            (this.components = []),
            (this._enforceNoNewChanges = wo()),
            this._zone.onMicrotaskEmpty.subscribe({
              next: function() {
                s._zone.run(function() {
                  s.tick();
                });
              }
            });
          var a = new O(function(e) {
              (s._stable = s._zone.isStable && !s._zone.hasPendingMacrotasks && !s._zone.hasPendingMicrotasks),
                s._zone.runOutsideAngular(function() {
                  e.next(s._stable), e.complete();
                });
            }),
            u = new O(function(e) {
              var t;
              s._zone.runOutsideAngular(function() {
                t = s._zone.onStable.subscribe(function() {
                  ki.assertNotInAngularZone(),
                    je(function() {
                      s._stable || s._zone.hasPendingMacrotasks || s._zone.hasPendingMicrotasks || ((s._stable = !0), e.next(!0));
                    });
                });
              });
              var n = s._zone.onUnstable.subscribe(function() {
                ki.assertInAngularZone(),
                  s._stable &&
                    ((s._stable = !1),
                    s._zone.runOutsideAngular(function() {
                      e.next(!1);
                    }));
              });
              return function() {
                t.unsubscribe(), n.unsubscribe();
              };
            });
          this.isStable = ae(a, u.pipe(ge()));
        }
        var t;
        return (
          (t = e),
          (e.prototype.bootstrap = function(e, t) {
            var n,
              r = this;
            if (!this._initStatus.done)
              throw new Error(
                'Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.'
              );
            (n = e instanceof Qr ? e : this._componentFactoryResolver.resolveComponentFactory(e)),
              this.componentTypes.push(n.componentType);
            var o = n instanceof eo ? null : this._injector.get(Xn),
              i = n.create(Bn.NULL, [], t || n.selector, o);
            i.onDestroy(function() {
              r._unloadComponent(i);
            });
            var s = i.injector.get(Pi, null);
            return (
              s && i.injector.get(Di).registerApplication(i.location.nativeElement, s),
              this._loadComponent(i),
              wo() && this._console.log('Angular is running in the development mode. Call enableProdMode() to enable the production mode.'),
              i
            );
          }),
          (e.prototype.tick = function() {
            var e = this;
            if (this._runningTick) throw new Error('ApplicationRef.tick is called recursively');
            var n = t._tickScope();
            try {
              (this._runningTick = !0),
                this._views.forEach(function(e) {
                  return e.detectChanges();
                }),
                this._enforceNoNewChanges &&
                  this._views.forEach(function(e) {
                    return e.checkNoChanges();
                  });
            } catch (r) {
              this._zone.runOutsideAngular(function() {
                return e._exceptionHandler.handleError(r);
              });
            } finally {
              (this._runningTick = !1), xi(n);
            }
          }),
          (e.prototype.attachView = function(e) {
            var t = e;
            this._views.push(t), t.attachToAppRef(this);
          }),
          (e.prototype.detachView = function(e) {
            var t = e;
            Ui(this._views, t), t.detachFromAppRef();
          }),
          (e.prototype._loadComponent = function(e) {
            this.attachView(e.hostView),
              this.tick(),
              this.components.push(e),
              this._injector
                .get(fi, [])
                .concat(this._bootstrapListeners)
                .forEach(function(t) {
                  return t(e);
                });
          }),
          (e.prototype._unloadComponent = function(e) {
            this.detachView(e.hostView), Ui(this.components, e);
          }),
          (e.prototype.ngOnDestroy = function() {
            this._views.slice().forEach(function(e) {
              return e.destroy();
            });
          }),
          Object.defineProperty(e.prototype, 'viewCount', {
            get: function() {
              return this._views.length;
            },
            enumerable: !0,
            configurable: !0
          }),
          (e._tickScope = Ci('ApplicationRef#tick()')),
          e
        );
      })();
      function Ui(e, t) {
        var n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      var zi,
        qi = (function() {
          function e() {
            (this.dirty = !0), (this._results = []), (this.changes = new zo()), (this.length = 0);
          }
          return (
            (e.prototype.map = function(e) {
              return this._results.map(e);
            }),
            (e.prototype.filter = function(e) {
              return this._results.filter(e);
            }),
            (e.prototype.find = function(e) {
              return this._results.find(e);
            }),
            (e.prototype.reduce = function(e, t) {
              return this._results.reduce(e, t);
            }),
            (e.prototype.forEach = function(e) {
              this._results.forEach(e);
            }),
            (e.prototype.some = function(e) {
              return this._results.some(e);
            }),
            (e.prototype.toArray = function() {
              return this._results.slice();
            }),
            (e.prototype[Me()] = function() {
              return this._results[Me()]();
            }),
            (e.prototype.toString = function() {
              return this._results.toString();
            }),
            (e.prototype.reset = function(e) {
              (this._results = (function e(t) {
                return t.reduce(function(t, n) {
                  var r = Array.isArray(n) ? e(n) : n;
                  return t.concat(r);
                }, []);
              })(e)),
                (this.dirty = !1),
                (this.length = this._results.length),
                (this.last = this._results[this.length - 1]),
                (this.first = this._results[0]);
            }),
            (e.prototype.notifyOnChanges = function() {
              this.changes.emit(this);
            }),
            (e.prototype.setDirty = function() {
              this.dirty = !0;
            }),
            (e.prototype.destroy = function() {
              this.changes.complete(), this.changes.unsubscribe();
            }),
            e
          );
        })(),
        Wi = (function() {
          function e() {}
          return (
            (e.__NG_ELEMENT_ID__ = function() {
              return Zi(e, to);
            }),
            e
          );
        })(),
        Zi = Nn,
        Ki = (function() {
          function e() {}
          return (
            (e.__NG_ELEMENT_ID__ = function() {
              return Qi();
            }),
            e
          );
        })(),
        Qi = function() {
          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        },
        Gi =
          (o(function() {
            return (null !== zi && zi.apply(this, arguments)) || this;
          }, (zi = Ki)),
          (function() {
            return function(e, t) {
              (this.name = e), (this.callback = t);
            };
          })()),
        Ji = (function() {
          function e(e, t, n) {
            (this.nativeNode = e),
              (this._debugContext = n),
              (this.listeners = []),
              (this.parent = null),
              t && t instanceof Yi && t.addChild(this);
          }
          return (
            Object.defineProperty(e.prototype, 'injector', {
              get: function() {
                return this._debugContext.injector;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'componentInstance', {
              get: function() {
                return this._debugContext.component;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'context', {
              get: function() {
                return this._debugContext.context;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'references', {
              get: function() {
                return this._debugContext.references;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'providerTokens', {
              get: function() {
                return this._debugContext.providerTokens;
              },
              enumerable: !0,
              configurable: !0
            }),
            e
          );
        })(),
        Yi = (function(e) {
          function t(t, n, r) {
            var o = e.call(this, t, n, r) || this;
            return (
              (o.properties = {}), (o.attributes = {}), (o.classes = {}), (o.styles = {}), (o.childNodes = []), (o.nativeElement = t), o
            );
          }
          return (
            o(t, e),
            (t.prototype.addChild = function(e) {
              e && (this.childNodes.push(e), (e.parent = this));
            }),
            (t.prototype.removeChild = function(e) {
              var t = this.childNodes.indexOf(e);
              -1 !== t && ((e.parent = null), this.childNodes.splice(t, 1));
            }),
            (t.prototype.insertChildrenAfter = function(e, t) {
              var n,
                r = this,
                o = this.childNodes.indexOf(e);
              -1 !== o &&
                ((n = this.childNodes).splice.apply(n, l([o + 1, 0], t)),
                t.forEach(function(e) {
                  e.parent && e.parent.removeChild(e), (e.parent = r);
                }));
            }),
            (t.prototype.insertBefore = function(e, t) {
              var n = this.childNodes.indexOf(e);
              -1 === n ? this.addChild(t) : (t.parent && t.parent.removeChild(t), (t.parent = this), this.childNodes.splice(n, 0, t));
            }),
            (t.prototype.query = function(e) {
              return this.queryAll(e)[0] || null;
            }),
            (t.prototype.queryAll = function(e) {
              var t = [];
              return (
                (function e(t, n, r) {
                  t.childNodes.forEach(function(t) {
                    t instanceof Yi && (n(t) && r.push(t), e(t, n, r));
                  });
                })(this, e, t),
                t
              );
            }),
            (t.prototype.queryAllNodes = function(e) {
              var t = [];
              return (
                (function e(t, n, r) {
                  t instanceof Yi &&
                    t.childNodes.forEach(function(t) {
                      n(t) && r.push(t), t instanceof Yi && e(t, n, r);
                    });
                })(this, e, t),
                t
              );
            }),
            Object.defineProperty(t.prototype, 'children', {
              get: function() {
                return this.childNodes.filter(function(e) {
                  return e instanceof t;
                });
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.triggerEventHandler = function(e, t) {
              this.listeners.forEach(function(n) {
                n.name == e && n.callback(t);
              });
            }),
            t
          );
        })(Ji),
        $i = new Map();
      function Xi(e) {
        return $i.get(e) || null;
      }
      function es(e) {
        $i.set(e.nativeNode, e);
      }
      var ts = (function() {
          function e() {}
          return (
            (e.prototype.supports = function(e) {
              return At(e);
            }),
            (e.prototype.create = function(e) {
              return new rs(e);
            }),
            e
          );
        })(),
        ns = function(e, t) {
          return t;
        },
        rs = (function() {
          function e(e) {
            (this.length = 0),
              (this._linkedRecords = null),
              (this._unlinkedRecords = null),
              (this._previousItHead = null),
              (this._itHead = null),
              (this._itTail = null),
              (this._additionsHead = null),
              (this._additionsTail = null),
              (this._movesHead = null),
              (this._movesTail = null),
              (this._removalsHead = null),
              (this._removalsTail = null),
              (this._identityChangesHead = null),
              (this._identityChangesTail = null),
              (this._trackByFn = e || ns);
          }
          return (
            (e.prototype.forEachItem = function(e) {
              var t;
              for (t = this._itHead; null !== t; t = t._next) e(t);
            }),
            (e.prototype.forEachOperation = function(e) {
              for (var t = this._itHead, n = this._removalsHead, r = 0, o = null; t || n; ) {
                var i = !n || (t && t.currentIndex < as(n, r, o)) ? t : n,
                  s = as(i, r, o),
                  a = i.currentIndex;
                if (i === n) r--, (n = n._nextRemoved);
                else if (((t = t._next), null == i.previousIndex)) r++;
                else {
                  o || (o = []);
                  var u = s - r,
                    c = a - r;
                  if (u != c) {
                    for (var l = 0; l < u; l++) {
                      var p = l < o.length ? o[l] : (o[l] = 0),
                        f = p + l;
                      c <= f && f < u && (o[l] = p + 1);
                    }
                    o[i.previousIndex] = c - u;
                  }
                }
                s !== a && e(i, s, a);
              }
            }),
            (e.prototype.forEachPreviousItem = function(e) {
              var t;
              for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
            }),
            (e.prototype.forEachAddedItem = function(e) {
              var t;
              for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
            }),
            (e.prototype.forEachMovedItem = function(e) {
              var t;
              for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
            }),
            (e.prototype.forEachRemovedItem = function(e) {
              var t;
              for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
            }),
            (e.prototype.forEachIdentityChange = function(e) {
              var t;
              for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange) e(t);
            }),
            (e.prototype.diff = function(e) {
              if ((null == e && (e = []), !At(e)))
                throw new Error("Error trying to diff '" + Be(e) + "'. Only arrays and iterables are allowed");
              return this.check(e) ? this : null;
            }),
            (e.prototype.onDestroy = function() {}),
            (e.prototype.check = function(e) {
              var t = this;
              this._reset();
              var n,
                r,
                o,
                i = this._itHead,
                s = !1;
              if (Array.isArray(e)) {
                this.length = e.length;
                for (var a = 0; a < this.length; a++)
                  (o = this._trackByFn(a, (r = e[a]))),
                    null !== i && Ve(i.trackById, o)
                      ? (s && (i = this._verifyReinsertion(i, r, o, a)), Ve(i.item, r) || this._addIdentityChange(i, r))
                      : ((i = this._mismatch(i, r, o, a)), (s = !0)),
                    (i = i._next);
              } else
                (n = 0),
                  (function(e, t) {
                    if (Array.isArray(e)) for (var n = 0; n < e.length; n++) t(e[n]);
                    else for (var r = e[Me()](), o = void 0; !(o = r.next()).done; ) t(o.value);
                  })(e, function(e) {
                    (o = t._trackByFn(n, e)),
                      null !== i && Ve(i.trackById, o)
                        ? (s && (i = t._verifyReinsertion(i, e, o, n)), Ve(i.item, e) || t._addIdentityChange(i, e))
                        : ((i = t._mismatch(i, e, o, n)), (s = !0)),
                      (i = i._next),
                      n++;
                  }),
                  (this.length = n);
              return this._truncate(i), (this.collection = e), this.isDirty;
            }),
            Object.defineProperty(e.prototype, 'isDirty', {
              get: function() {
                return (
                  null !== this._additionsHead ||
                  null !== this._movesHead ||
                  null !== this._removalsHead ||
                  null !== this._identityChangesHead
                );
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype._reset = function() {
              if (this.isDirty) {
                var e = void 0,
                  t = void 0;
                for (e = this._previousItHead = this._itHead; null !== e; e = e._next) e._nextPrevious = e._next;
                for (e = this._additionsHead; null !== e; e = e._nextAdded) e.previousIndex = e.currentIndex;
                for (this._additionsHead = this._additionsTail = null, e = this._movesHead; null !== e; e = t)
                  (e.previousIndex = e.currentIndex), (t = e._nextMoved);
                (this._movesHead = this._movesTail = null),
                  (this._removalsHead = this._removalsTail = null),
                  (this._identityChangesHead = this._identityChangesTail = null);
              }
            }),
            (e.prototype._mismatch = function(e, t, n, r) {
              var o;
              return (
                null === e ? (o = this._itTail) : ((o = e._prev), this._remove(e)),
                null !== (e = null === this._linkedRecords ? null : this._linkedRecords.get(n, r))
                  ? (Ve(e.item, t) || this._addIdentityChange(e, t), this._moveAfter(e, o, r))
                  : null !== (e = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null))
                  ? (Ve(e.item, t) || this._addIdentityChange(e, t), this._reinsertAfter(e, o, r))
                  : (e = this._addAfter(new os(t, n), o, r)),
                e
              );
            }),
            (e.prototype._verifyReinsertion = function(e, t, n, r) {
              var o = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
              return (
                null !== o
                  ? (e = this._reinsertAfter(o, e._prev, r))
                  : e.currentIndex != r && ((e.currentIndex = r), this._addToMoves(e, r)),
                e
              );
            }),
            (e.prototype._truncate = function(e) {
              for (; null !== e; ) {
                var t = e._next;
                this._addToRemovals(this._unlink(e)), (e = t);
              }
              null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                null !== this._additionsTail && (this._additionsTail._nextAdded = null),
                null !== this._movesTail && (this._movesTail._nextMoved = null),
                null !== this._itTail && (this._itTail._next = null),
                null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
                null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
            }),
            (e.prototype._reinsertAfter = function(e, t, n) {
              null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
              var r = e._prevRemoved,
                o = e._nextRemoved;
              return (
                null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
                null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
                this._insertAfter(e, t, n),
                this._addToMoves(e, n),
                e
              );
            }),
            (e.prototype._moveAfter = function(e, t, n) {
              return this._unlink(e), this._insertAfter(e, t, n), this._addToMoves(e, n), e;
            }),
            (e.prototype._addAfter = function(e, t, n) {
              return (
                this._insertAfter(e, t, n),
                (this._additionsTail = null === this._additionsTail ? (this._additionsHead = e) : (this._additionsTail._nextAdded = e)),
                e
              );
            }),
            (e.prototype._insertAfter = function(e, t, n) {
              var r = null === t ? this._itHead : t._next;
              return (
                (e._next = r),
                (e._prev = t),
                null === r ? (this._itTail = e) : (r._prev = e),
                null === t ? (this._itHead = e) : (t._next = e),
                null === this._linkedRecords && (this._linkedRecords = new ss()),
                this._linkedRecords.put(e),
                (e.currentIndex = n),
                e
              );
            }),
            (e.prototype._remove = function(e) {
              return this._addToRemovals(this._unlink(e));
            }),
            (e.prototype._unlink = function(e) {
              null !== this._linkedRecords && this._linkedRecords.remove(e);
              var t = e._prev,
                n = e._next;
              return null === t ? (this._itHead = n) : (t._next = n), null === n ? (this._itTail = t) : (n._prev = t), e;
            }),
            (e.prototype._addToMoves = function(e, t) {
              return e.previousIndex === t
                ? e
                : ((this._movesTail = null === this._movesTail ? (this._movesHead = e) : (this._movesTail._nextMoved = e)), e);
            }),
            (e.prototype._addToRemovals = function(e) {
              return (
                null === this._unlinkedRecords && (this._unlinkedRecords = new ss()),
                this._unlinkedRecords.put(e),
                (e.currentIndex = null),
                (e._nextRemoved = null),
                null === this._removalsTail
                  ? ((this._removalsTail = this._removalsHead = e), (e._prevRemoved = null))
                  : ((e._prevRemoved = this._removalsTail), (this._removalsTail = this._removalsTail._nextRemoved = e)),
                e
              );
            }),
            (e.prototype._addIdentityChange = function(e, t) {
              return (
                (e.item = t),
                (this._identityChangesTail =
                  null === this._identityChangesTail
                    ? (this._identityChangesHead = e)
                    : (this._identityChangesTail._nextIdentityChange = e)),
                e
              );
            }),
            e
          );
        })(),
        os = (function() {
          return function(e, t) {
            (this.item = e),
              (this.trackById = t),
              (this.currentIndex = null),
              (this.previousIndex = null),
              (this._nextPrevious = null),
              (this._prev = null),
              (this._next = null),
              (this._prevDup = null),
              (this._nextDup = null),
              (this._prevRemoved = null),
              (this._nextRemoved = null),
              (this._nextAdded = null),
              (this._nextMoved = null),
              (this._nextIdentityChange = null);
          };
        })(),
        is = (function() {
          function e() {
            (this._head = null), (this._tail = null);
          }
          return (
            (e.prototype.add = function(e) {
              null === this._head
                ? ((this._head = this._tail = e), (e._nextDup = null), (e._prevDup = null))
                : ((this._tail._nextDup = e), (e._prevDup = this._tail), (e._nextDup = null), (this._tail = e));
            }),
            (e.prototype.get = function(e, t) {
              var n;
              for (n = this._head; null !== n; n = n._nextDup) if ((null === t || t <= n.currentIndex) && Ve(n.trackById, e)) return n;
              return null;
            }),
            (e.prototype.remove = function(e) {
              var t = e._prevDup,
                n = e._nextDup;
              return (
                null === t ? (this._head = n) : (t._nextDup = n), null === n ? (this._tail = t) : (n._prevDup = t), null === this._head
              );
            }),
            e
          );
        })(),
        ss = (function() {
          function e() {
            this.map = new Map();
          }
          return (
            (e.prototype.put = function(e) {
              var t = e.trackById,
                n = this.map.get(t);
              n || ((n = new is()), this.map.set(t, n)), n.add(e);
            }),
            (e.prototype.get = function(e, t) {
              var n = this.map.get(e);
              return n ? n.get(e, t) : null;
            }),
            (e.prototype.remove = function(e) {
              var t = e.trackById;
              return this.map.get(t).remove(e) && this.map.delete(t), e;
            }),
            Object.defineProperty(e.prototype, 'isEmpty', {
              get: function() {
                return 0 === this.map.size;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.clear = function() {
              this.map.clear();
            }),
            e
          );
        })();
      function as(e, t, n) {
        var r = e.previousIndex;
        if (null === r) return r;
        var o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      var us = (function() {
          function e() {}
          return (
            (e.prototype.supports = function(e) {
              return e instanceof Map || It(e);
            }),
            (e.prototype.create = function() {
              return new cs();
            }),
            e
          );
        })(),
        cs = (function() {
          function e() {
            (this._records = new Map()),
              (this._mapHead = null),
              (this._appendAfter = null),
              (this._previousMapHead = null),
              (this._changesHead = null),
              (this._changesTail = null),
              (this._additionsHead = null),
              (this._additionsTail = null),
              (this._removalsHead = null),
              (this._removalsTail = null);
          }
          return (
            Object.defineProperty(e.prototype, 'isDirty', {
              get: function() {
                return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.forEachItem = function(e) {
              var t;
              for (t = this._mapHead; null !== t; t = t._next) e(t);
            }),
            (e.prototype.forEachPreviousItem = function(e) {
              var t;
              for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
            }),
            (e.prototype.forEachChangedItem = function(e) {
              var t;
              for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
            }),
            (e.prototype.forEachAddedItem = function(e) {
              var t;
              for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
            }),
            (e.prototype.forEachRemovedItem = function(e) {
              var t;
              for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
            }),
            (e.prototype.diff = function(e) {
              if (e) {
                if (!(e instanceof Map || It(e)))
                  throw new Error("Error trying to diff '" + Be(e) + "'. Only maps and objects are allowed");
              } else e = new Map();
              return this.check(e) ? this : null;
            }),
            (e.prototype.onDestroy = function() {}),
            (e.prototype.check = function(e) {
              var t = this;
              this._reset();
              var n = this._mapHead;
              if (
                ((this._appendAfter = null),
                this._forEach(e, function(e, r) {
                  if (n && n.key === r) t._maybeAddToChanges(n, e), (t._appendAfter = n), (n = n._next);
                  else {
                    var o = t._getOrCreateRecordForKey(r, e);
                    n = t._insertBeforeOrAppend(n, o);
                  }
                }),
                n)
              ) {
                n._prev && (n._prev._next = null), (this._removalsHead = n);
                for (var r = n; null !== r; r = r._nextRemoved)
                  r === this._mapHead && (this._mapHead = null),
                    this._records.delete(r.key),
                    (r._nextRemoved = r._next),
                    (r.previousValue = r.currentValue),
                    (r.currentValue = null),
                    (r._prev = null),
                    (r._next = null);
              }
              return (
                this._changesTail && (this._changesTail._nextChanged = null),
                this._additionsTail && (this._additionsTail._nextAdded = null),
                this.isDirty
              );
            }),
            (e.prototype._insertBeforeOrAppend = function(e, t) {
              if (e) {
                var n = e._prev;
                return (
                  (t._next = e),
                  (t._prev = n),
                  (e._prev = t),
                  n && (n._next = t),
                  e === this._mapHead && (this._mapHead = t),
                  (this._appendAfter = e),
                  e
                );
              }
              return (
                this._appendAfter ? ((this._appendAfter._next = t), (t._prev = this._appendAfter)) : (this._mapHead = t),
                (this._appendAfter = t),
                null
              );
            }),
            (e.prototype._getOrCreateRecordForKey = function(e, t) {
              if (this._records.has(e)) {
                var n = this._records.get(e);
                this._maybeAddToChanges(n, t);
                var r = n._prev,
                  o = n._next;
                return r && (r._next = o), o && (o._prev = r), (n._next = null), (n._prev = null), n;
              }
              var i = new ls(e);
              return this._records.set(e, i), (i.currentValue = t), this._addToAdditions(i), i;
            }),
            (e.prototype._reset = function() {
              if (this.isDirty) {
                var e = void 0;
                for (this._previousMapHead = this._mapHead, e = this._previousMapHead; null !== e; e = e._next) e._nextPrevious = e._next;
                for (e = this._changesHead; null !== e; e = e._nextChanged) e.previousValue = e.currentValue;
                for (e = this._additionsHead; null != e; e = e._nextAdded) e.previousValue = e.currentValue;
                (this._changesHead = this._changesTail = null),
                  (this._additionsHead = this._additionsTail = null),
                  (this._removalsHead = null);
              }
            }),
            (e.prototype._maybeAddToChanges = function(e, t) {
              Ve(t, e.currentValue) || ((e.previousValue = e.currentValue), (e.currentValue = t), this._addToChanges(e));
            }),
            (e.prototype._addToAdditions = function(e) {
              null === this._additionsHead
                ? (this._additionsHead = this._additionsTail = e)
                : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
            }),
            (e.prototype._addToChanges = function(e) {
              null === this._changesHead
                ? (this._changesHead = this._changesTail = e)
                : ((this._changesTail._nextChanged = e), (this._changesTail = e));
            }),
            (e.prototype._forEach = function(e, t) {
              e instanceof Map
                ? e.forEach(t)
                : Object.keys(e).forEach(function(n) {
                    return t(e[n], n);
                  });
            }),
            e
          );
        })(),
        ls = (function() {
          return function(e) {
            (this.key = e),
              (this.previousValue = null),
              (this.currentValue = null),
              (this._nextPrevious = null),
              (this._next = null),
              (this._prev = null),
              (this._nextAdded = null),
              (this._nextRemoved = null),
              (this._nextChanged = null);
          };
        })(),
        ps = (function() {
          function e(e) {
            this.factories = e;
          }
          return (
            (e.create = function(t, n) {
              if (null != n) {
                var r = n.factories.slice();
                t = t.concat(r);
              }
              return new e(t);
            }),
            (e.extend = function(t) {
              return {
                provide: e,
                useFactory: function(n) {
                  if (!n) throw new Error('Cannot extend IterableDiffers without a parent injector');
                  return e.create(t, n);
                },
                deps: [[e, new qe(), new Ue()]]
              };
            }),
            (e.prototype.find = function(e) {
              var t,
                n = this.factories.find(function(t) {
                  return t.supports(e);
                });
              if (null != n) return n;
              throw new Error("Cannot find a differ supporting object '" + e + "' of type '" + ((t = e).name || typeof t) + "'");
            }),
            (e.ngInjectableDef = ke({
              providedIn: 'root',
              factory: function() {
                return new e([new ts()]);
              }
            })),
            e
          );
        })(),
        fs = (function() {
          function e(e) {
            this.factories = e;
          }
          return (
            (e.create = function(t, n) {
              if (n) {
                var r = n.factories.slice();
                t = t.concat(r);
              }
              return new e(t);
            }),
            (e.extend = function(t) {
              return {
                provide: e,
                useFactory: function(n) {
                  if (!n) throw new Error('Cannot extend KeyValueDiffers without a parent injector');
                  return e.create(t, n);
                },
                deps: [[e, new qe(), new Ue()]]
              };
            }),
            (e.prototype.find = function(e) {
              var t = this.factories.find(function(t) {
                return t.supports(e);
              });
              if (t) return t;
              throw new Error("Cannot find a differ supporting object '" + e + "'");
            }),
            (e.ngInjectableDef = ke({
              providedIn: 'root',
              factory: function() {
                return new e([new us()]);
              }
            })),
            e
          );
        })(),
        ds = [new us()],
        hs = new ps([new ts()]),
        ys = new fs(ds),
        vs = ji(null, 'core', [
          { provide: pi, useValue: 'unknown' },
          { provide: Bi, deps: [Bn] },
          { provide: Di, deps: [] },
          { provide: di, deps: [] }
        ]),
        gs = new Se('LocaleId');
      function ms() {
        return hs;
      }
      function bs() {
        return ys;
      }
      function ws(e) {
        return e || 'en-US';
      }
      var _s = (function() {
        return function(e) {};
      })();
      function Cs(e, t, n) {
        var r = e.state,
          o = 1792 & r;
        return o === t ? ((e.state = (-1793 & r) | n), (e.initIndex = -1), !0) : o === n;
      }
      function xs(e, t, n) {
        return (1792 & e.state) === t && e.initIndex <= n && ((e.initIndex = n + 1), !0);
      }
      function ks(e, t) {
        return e.nodes[t];
      }
      function Es(e, t) {
        return e.nodes[t];
      }
      function Ts(e, t) {
        return e.nodes[t];
      }
      function Ss(e, t) {
        return e.nodes[t];
      }
      function As(e, t) {
        return e.nodes[t];
      }
      var Is = {
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
      function Ns(e, t, n, r) {
        var o =
          "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '" +
          t +
          "'. Current value: '" +
          n +
          "'.";
        return (
          r &&
            (o +=
              ' It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?'),
          (function(e, t) {
            var n = new Error(e);
            return Os(n, t), n;
          })(o, e)
        );
      }
      function Os(e, t) {
        (e[Jo] = t), (e[$o] = t.logError.bind(t));
      }
      function Ps(e) {
        return new Error('ViewDestroyedError: Attempt to use a destroyed view: ' + e);
      }
      var Ds = function() {},
        Rs = new Map();
      function Fs(e) {
        var t = Rs.get(e);
        return t || ((t = Be(e) + '_' + Rs.size), Rs.set(e, t)), t;
      }
      var Ms = '$$undefined',
        js = '$$empty';
      function Vs(e) {
        return { id: Ms, styles: e.styles, encapsulation: e.encapsulation, data: e.data };
      }
      var Bs = 0;
      function Hs(e, t, n, r) {
        return !(!(2 & e.state) && Ve(e.oldValues[t.bindingIndex + n], r));
      }
      function Ls(e, t, n, r) {
        return !!Hs(e, t, n, r) && ((e.oldValues[t.bindingIndex + n] = r), !0);
      }
      function Us(e, t, n, r) {
        var o = e.oldValues[t.bindingIndex + n];
        if (1 & e.state || !Et(o, r)) {
          var i = t.bindings[n].name;
          throw Ns(Is.createDebugContext(e, t.nodeIndex), i + ': ' + o, i + ': ' + r, 0 != (1 & e.state));
        }
      }
      function zs(e) {
        for (var t = e; t; ) 2 & t.def.flags && (t.state |= 8), (t = t.viewContainerParent || t.parent);
      }
      function qs(e, t) {
        for (var n = e; n && n !== t; ) (n.state |= 64), (n = n.viewContainerParent || n.parent);
      }
      function Ws(e, t, n, r) {
        try {
          return zs(33554432 & e.def.nodes[t].flags ? Es(e, t).componentView : e), Is.handleEvent(e, t, n, r);
        } catch (o) {
          e.root.errorHandler.handleError(o);
        }
      }
      function Zs(e) {
        return e.parent ? Es(e.parent, e.parentNodeDef.nodeIndex) : null;
      }
      function Ks(e) {
        return e.parent ? e.parentNodeDef.parent : null;
      }
      function Qs(e, t) {
        switch (201347067 & t.flags) {
          case 1:
            return Es(e, t.nodeIndex).renderElement;
          case 2:
            return ks(e, t.nodeIndex).renderText;
        }
      }
      function Gs(e) {
        return !!e.parent && !!(32768 & e.parentNodeDef.flags);
      }
      function Js(e) {
        return !(!e.parent || 32768 & e.parentNodeDef.flags);
      }
      function Ys(e) {
        var t = {},
          n = 0,
          r = {};
        return (
          e &&
            e.forEach(function(e) {
              var o = c(e, 2),
                i = o[0],
                s = o[1];
              'number' == typeof i
                ? ((t[i] = s),
                  (n |= (function(e) {
                    return 1 << e % 32;
                  })(i)))
                : (r[i] = s);
            }),
          { matchedQueries: t, references: r, matchedQueryIds: n }
        );
      }
      function $s(e, t) {
        return e.map(function(e) {
          var n, r, o;
          return (
            Array.isArray(e) ? ((o = (n = c(e, 2))[0]), (r = n[1])) : ((o = 0), (r = e)),
            r && ('function' == typeof r || 'object' == typeof r) && t && Object.defineProperty(r, Rn, { value: t, configurable: !0 }),
            { flags: o, token: r, tokenKey: Fs(r) }
          );
        });
      }
      function Xs(e, t, n) {
        var r = n.renderParent;
        return r
          ? 0 == (1 & r.flags) ||
            0 == (33554432 & r.flags) ||
            (r.element.componentRendererType && r.element.componentRendererType.encapsulation === Ne.Native)
            ? Es(e, n.renderParent.nodeIndex).renderElement
            : void 0
          : t;
      }
      var ea = new WeakMap();
      function ta(e) {
        var t = ea.get(e);
        return (
          t ||
            (((t = e(function() {
              return Ds;
            })).factory = e),
            ea.set(e, t)),
          t
        );
      }
      function na(e, t, n, r, o) {
        3 === t && (n = e.renderer.parentNode(Qs(e, e.def.lastRenderRootNode))), ra(e, t, 0, e.def.nodes.length - 1, n, r, o);
      }
      function ra(e, t, n, r, o, i, s) {
        for (var a = n; a <= r; a++) {
          var u = e.def.nodes[a];
          11 & u.flags && ia(e, u, t, o, i, s), (a += u.childCount);
        }
      }
      function oa(e, t, n, r, o, i) {
        for (var s = e; s && !Gs(s); ) s = s.parent;
        for (var a = s.parent, u = Ks(s), c = u.nodeIndex + u.childCount, l = u.nodeIndex + 1; l <= c; l++) {
          var p = a.def.nodes[l];
          p.ngContentIndex === t && ia(a, p, n, r, o, i), (l += p.childCount);
        }
        if (!a.parent) {
          var f = e.root.projectableNodes[t];
          if (f) for (l = 0; l < f.length; l++) sa(e, f[l], n, r, o, i);
        }
      }
      function ia(e, t, n, r, o, i) {
        if (8 & t.flags) oa(e, t.ngContent.index, n, r, o, i);
        else {
          var s = Qs(e, t);
          if (
            (3 === n && 33554432 & t.flags && 48 & t.bindingFlags
              ? (16 & t.bindingFlags && sa(e, s, n, r, o, i), 32 & t.bindingFlags && sa(Es(e, t.nodeIndex).componentView, s, n, r, o, i))
              : sa(e, s, n, r, o, i),
            16777216 & t.flags)
          )
            for (var a = Es(e, t.nodeIndex).viewContainer._embeddedViews, u = 0; u < a.length; u++) na(a[u], n, r, o, i);
          1 & t.flags && !t.element.name && ra(e, n, t.nodeIndex + 1, t.nodeIndex + t.childCount, r, o, i);
        }
      }
      function sa(e, t, n, r, o, i) {
        var s = e.renderer;
        switch (n) {
          case 1:
            s.appendChild(r, t);
            break;
          case 2:
            s.insertBefore(r, t, o);
            break;
          case 3:
            s.removeChild(r, t);
            break;
          case 0:
            i.push(t);
        }
      }
      var aa = /^:([^:]+):(.+)$/;
      function ua(e) {
        if (':' === e[0]) {
          var t = e.match(aa);
          return [t[1], t[2]];
        }
        return ['', e];
      }
      function ca(e) {
        for (var t = 0, n = 0; n < e.length; n++) t |= e[n].flags;
        return t;
      }
      function la(e, t, n, r, o, i) {
        e |= 1;
        var s = Ys(t);
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
          matchedQueries: s.matchedQueries,
          matchedQueryIds: s.matchedQueryIds,
          references: s.references,
          ngContentIndex: n,
          childCount: r,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: {
            ns: null,
            name: null,
            attrs: null,
            template: i ? ta(i) : null,
            componentProvider: null,
            componentView: null,
            componentRendererType: null,
            publicProviders: null,
            allProviders: null,
            handleEvent: o || Ds
          },
          provider: null,
          text: null,
          query: null,
          ngContent: null
        };
      }
      function pa(e, t, n, r, o, i, s, a, u, l, p, f) {
        var d;
        void 0 === s && (s = []), l || (l = Ds);
        var h = Ys(n),
          y = h.matchedQueries,
          v = h.references,
          g = h.matchedQueryIds,
          m = null,
          b = null;
        i && ((m = (d = c(ua(i), 2))[0]), (b = d[1])), (a = a || []);
        for (var w = new Array(a.length), _ = 0; _ < a.length; _++) {
          var C = c(a[_], 3),
            x = C[0],
            k = C[2],
            E = c(ua(C[1]), 2),
            T = E[0],
            S = E[1],
            A = void 0,
            I = void 0;
          switch (15 & x) {
            case 4:
              I = k;
              break;
            case 1:
            case 8:
              A = k;
          }
          w[_] = { flags: x, ns: T, name: S, nonMinifiedName: S, securityContext: A, suffix: I };
        }
        u = u || [];
        var N = new Array(u.length);
        for (_ = 0; _ < u.length; _++) {
          var O = c(u[_], 2);
          N[_] = { type: 0, target: O[0], eventName: O[1], propName: null };
        }
        var P = (s = s || []).map(function(e) {
          var t = c(e, 2),
            n = t[1],
            r = c(ua(t[0]), 2);
          return [r[0], r[1], n];
        });
        return (
          (f = (function(e) {
            if (e && e.id === Ms) {
              var t = (null != e.encapsulation && e.encapsulation !== Ne.None) || e.styles.length || Object.keys(e.data).length;
              e.id = t ? 'c' + Bs++ : js;
            }
            return e && e.id === js && (e = null), e || null;
          })(f)),
          p && (t |= 33554432),
          {
            nodeIndex: -1,
            parent: null,
            renderParent: null,
            bindingIndex: -1,
            outputIndex: -1,
            checkIndex: e,
            flags: (t |= 1),
            childFlags: 0,
            directChildFlags: 0,
            childMatchedQueries: 0,
            matchedQueries: y,
            matchedQueryIds: g,
            references: v,
            ngContentIndex: r,
            childCount: o,
            bindings: w,
            bindingFlags: ca(w),
            outputs: N,
            element: {
              ns: m,
              name: b,
              attrs: P,
              template: null,
              componentProvider: null,
              componentView: p || null,
              componentRendererType: f,
              publicProviders: null,
              allProviders: null,
              handleEvent: l || Ds
            },
            provider: null,
            text: null,
            query: null,
            ngContent: null
          }
        );
      }
      function fa(e, t, n) {
        var r,
          o = n.element,
          i = e.root.selectorOrNode,
          s = e.renderer;
        if (e.parent || !i) {
          r = o.name ? s.createElement(o.name, o.ns) : s.createComment('');
          var a = Xs(e, t, n);
          a && s.appendChild(a, r);
        } else r = s.selectRootElement(i, !!o.componentRendererType && o.componentRendererType.encapsulation === Ne.ShadowDom);
        if (o.attrs)
          for (var u = 0; u < o.attrs.length; u++) {
            var l = c(o.attrs[u], 3);
            s.setAttribute(r, l[1], l[2], l[0]);
          }
        return r;
      }
      function da(e, t, n, r) {
        for (var o = 0; o < n.outputs.length; o++) {
          var i = n.outputs[o],
            s = ha(e, n.nodeIndex, ((p = i.eventName), (l = i.target) ? l + ':' + p : p)),
            a = i.target,
            u = e;
          'component' === i.target && ((a = null), (u = t));
          var c = u.renderer.listen(a || r, i.eventName, s);
          e.disposables[n.outputIndex + o] = c;
        }
        var l, p;
      }
      function ha(e, t, n) {
        return function(r) {
          return Ws(e, t, n, r);
        };
      }
      function ya(e, t, n, r) {
        if (!Ls(e, t, n, r)) return !1;
        var o = t.bindings[n],
          i = Es(e, t.nodeIndex),
          s = i.renderElement,
          a = o.name;
        switch (15 & o.flags) {
          case 1:
            !(function(e, t, n, r, o, i) {
              var s = t.securityContext,
                a = s ? e.root.sanitizer.sanitize(s, i) : i;
              a = null != a ? a.toString() : null;
              var u = e.renderer;
              null != i ? u.setAttribute(n, o, a, r) : u.removeAttribute(n, o, r);
            })(e, o, s, o.ns, a, r);
            break;
          case 2:
            !(function(e, t, n, r) {
              var o = e.renderer;
              r ? o.addClass(t, n) : o.removeClass(t, n);
            })(e, s, a, r);
            break;
          case 4:
            !(function(e, t, n, r, o) {
              var i = e.root.sanitizer.sanitize(Zo.STYLE, o);
              if (null != i) {
                i = i.toString();
                var s = t.suffix;
                null != s && (i += s);
              } else i = null;
              var a = e.renderer;
              null != i ? a.setStyle(n, r, i) : a.removeStyle(n, r);
            })(e, o, s, a, r);
            break;
          case 8:
            !(function(e, t, n, r, o) {
              var i = t.securityContext,
                s = i ? e.root.sanitizer.sanitize(i, o) : o;
              e.renderer.setProperty(n, r, s);
            })(33554432 & t.flags && 32 & o.flags ? i.componentView : e, o, s, a, r);
        }
        return !0;
      }
      var va = new Object(),
        ga = Fs(Bn),
        ma = Fs(jn),
        ba = Fs(Xn);
      function wa(e, t, n, r) {
        return (n = Dn(n)), { index: -1, deps: $s(r, Be(t)), flags: e, token: t, value: n };
      }
      function _a(e, t, n) {
        void 0 === n && (n = Bn.THROW_IF_NOT_FOUND);
        var r,
          o,
          i = Ke(e);
        try {
          if (8 & t.flags) return t.token;
          if ((2 & t.flags && (n = null), 1 & t.flags)) return e._parent.get(t.token, n);
          var s = t.tokenKey;
          switch (s) {
            case ga:
            case ma:
            case ba:
              return e;
          }
          var a,
            u = e._def.providersByKey[s];
          if (u) {
            var c = e._providers[u.index];
            return void 0 === c && (c = e._providers[u.index] = Ca(e, u)), c === va ? void 0 : c;
          }
          if (
            (a = Ee(t.token)) &&
            ((r = e),
            null != (o = a).providedIn &&
              ((function(e, t) {
                return e._def.modules.indexOf(o.providedIn) > -1;
              })(r) ||
                ('root' === o.providedIn && r._def.isRoot)))
          ) {
            var l = e._providers.length;
            return (
              (e._def.providersByKey[t.tokenKey] = { flags: 5120, value: a.factory, deps: [], index: l, token: t.token }),
              (e._providers[l] = va),
              (e._providers[l] = Ca(e, e._def.providersByKey[t.tokenKey]))
            );
          }
          return 4 & t.flags ? n : e._parent.get(t.token, n);
        } finally {
          Ke(i);
        }
      }
      function Ca(e, t) {
        var n;
        switch (201347067 & t.flags) {
          case 512:
            n = (function(e, t, n) {
              var r = n.length;
              switch (r) {
                case 0:
                  return new t();
                case 1:
                  return new t(_a(e, n[0]));
                case 2:
                  return new t(_a(e, n[0]), _a(e, n[1]));
                case 3:
                  return new t(_a(e, n[0]), _a(e, n[1]), _a(e, n[2]));
                default:
                  for (var o = new Array(r), i = 0; i < r; i++) o[i] = _a(e, n[i]);
                  return new (t.bind.apply(t, l([void 0], o)))();
              }
            })(e, t.value, t.deps);
            break;
          case 1024:
            n = (function(e, t, n) {
              var r = n.length;
              switch (r) {
                case 0:
                  return t();
                case 1:
                  return t(_a(e, n[0]));
                case 2:
                  return t(_a(e, n[0]), _a(e, n[1]));
                case 3:
                  return t(_a(e, n[0]), _a(e, n[1]), _a(e, n[2]));
                default:
                  for (var o = Array(r), i = 0; i < r; i++) o[i] = _a(e, n[i]);
                  return t.apply(void 0, l(o));
              }
            })(e, t.value, t.deps);
            break;
          case 2048:
            n = _a(e, t.deps[0]);
            break;
          case 256:
            n = t.value;
        }
        return (
          n === va || null == n || 'object' != typeof n || 131072 & t.flags || 'function' != typeof n.ngOnDestroy || (t.flags |= 131072),
          void 0 === n ? va : n
        );
      }
      function xa(e, t) {
        var n = e.viewContainer._embeddedViews;
        if (((null == t || t >= n.length) && (t = n.length - 1), t < 0)) return null;
        var r = n[t];
        return (r.viewContainerParent = null), Sa(n, t), Is.dirtyParentQueries(r), Ea(r), r;
      }
      function ka(e, t, n) {
        var r = t ? Qs(t, t.def.lastRenderRootNode) : e.renderElement,
          o = n.renderer.parentNode(r),
          i = n.renderer.nextSibling(r);
        na(n, 2, o, i, void 0);
      }
      function Ea(e) {
        na(e, 3, null, null, void 0);
      }
      function Ta(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Sa(e, t) {
        t >= e.length - 1 ? e.pop() : e.splice(t, 1);
      }
      var Aa = new Object();
      function Ia(e, t, n, r, o, i) {
        return new Na(e, t, n, r, o, i);
      }
      var Na = (function(e) {
          function t(t, n, r, o, i, s) {
            var a = e.call(this) || this;
            return (
              (a.selector = t),
              (a.componentType = n),
              (a._inputs = o),
              (a._outputs = i),
              (a.ngContentSelectors = s),
              (a.viewDefFactory = r),
              a
            );
          }
          return (
            o(t, e),
            Object.defineProperty(t.prototype, 'inputs', {
              get: function() {
                var e = [],
                  t = this._inputs;
                for (var n in t) e.push({ propName: n, templateName: t[n] });
                return e;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'outputs', {
              get: function() {
                var e = [];
                for (var t in this._outputs) e.push({ propName: t, templateName: this._outputs[t] });
                return e;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.create = function(e, t, n, r) {
              if (!r) throw new Error('ngModule should be provided');
              var o = ta(this.viewDefFactory),
                i = o.nodes[0].element.componentProvider.nodeIndex,
                s = Is.createRootView(e, t || [], n, o, r, Aa),
                a = Ts(s, i).instance;
              return n && s.renderer.setAttribute(Es(s, 0).renderElement, 'ng-version', uo.full), new Oa(s, new Fa(s), a);
            }),
            t
          );
        })(Qr),
        Oa = (function(e) {
          function t(t, n, r) {
            var o = e.call(this) || this;
            return (
              (o._view = t),
              (o._viewRef = n),
              (o._component = r),
              (o._elDef = o._view.def.nodes[0]),
              (o.hostView = n),
              (o.changeDetectorRef = n),
              (o.instance = r),
              o
            );
          }
          return (
            o(t, e),
            Object.defineProperty(t.prototype, 'location', {
              get: function() {
                return new to(Es(this._view, this._elDef.nodeIndex).renderElement);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'injector', {
              get: function() {
                return new Ba(this._view, this._elDef);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'componentType', {
              get: function() {
                return this._component.constructor;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.destroy = function() {
              this._viewRef.destroy();
            }),
            (t.prototype.onDestroy = function(e) {
              this._viewRef.onDestroy(e);
            }),
            t
          );
        })(Kr);
      function Pa(e, t, n) {
        return new Da(e, t, n);
      }
      var Da = (function() {
        function e(e, t, n) {
          (this._view = e), (this._elDef = t), (this._data = n), (this._embeddedViews = []);
        }
        return (
          Object.defineProperty(e.prototype, 'element', {
            get: function() {
              return new to(this._data.renderElement);
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, 'injector', {
            get: function() {
              return new Ba(this._view, this._elDef);
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, 'parentInjector', {
            get: function() {
              for (var e = this._view, t = this._elDef.parent; !t && e; ) (t = Ks(e)), (e = e.parent);
              return e ? new Ba(e, t) : new Ba(this._view, null);
            },
            enumerable: !0,
            configurable: !0
          }),
          (e.prototype.clear = function() {
            for (var e = this._embeddedViews.length - 1; e >= 0; e--) {
              var t = xa(this._data, e);
              Is.destroyView(t);
            }
          }),
          (e.prototype.get = function(e) {
            var t = this._embeddedViews[e];
            if (t) {
              var n = new Fa(t);
              return n.attachToViewContainerRef(this), n;
            }
            return null;
          }),
          Object.defineProperty(e.prototype, 'length', {
            get: function() {
              return this._embeddedViews.length;
            },
            enumerable: !0,
            configurable: !0
          }),
          (e.prototype.createEmbeddedView = function(e, t, n) {
            var r = e.createEmbeddedView(t || {});
            return this.insert(r, n), r;
          }),
          (e.prototype.createComponent = function(e, t, n, r, o) {
            var i = n || this.parentInjector;
            o || e instanceof eo || (o = i.get(Xn));
            var s = e.create(i, r, void 0, o);
            return this.insert(s.hostView, t), s;
          }),
          (e.prototype.insert = function(e, t) {
            if (e.destroyed) throw new Error('Cannot insert a destroyed View in a ViewContainer!');
            var n,
              r,
              o,
              i,
              s = e;
            return (
              (i = (n = this._data).viewContainer._embeddedViews),
              null == (r = t) && (r = i.length),
              ((o = s._view).viewContainerParent = this._view),
              Ta(i, r, o),
              (function(e, t) {
                var n = Zs(t);
                if (n && n !== e && !(16 & t.state)) {
                  t.state |= 16;
                  var r = n.template._projectedViews;
                  r || (r = n.template._projectedViews = []),
                    r.push(t),
                    (function(e, n) {
                      if (!(4 & n.flags)) {
                        (t.parent.def.nodeFlags |= 4), (n.flags |= 4);
                        for (var r = n.parent; r; ) (r.childFlags |= 4), (r = r.parent);
                      }
                    })(0, t.parentNodeDef);
                }
              })(n, o),
              Is.dirtyParentQueries(o),
              ka(n, r > 0 ? i[r - 1] : null, o),
              s.attachToViewContainerRef(this),
              e
            );
          }),
          (e.prototype.move = function(e, t) {
            if (e.destroyed) throw new Error('Cannot move a destroyed View in a ViewContainer!');
            var n,
              r,
              o,
              i,
              s,
              a = this._embeddedViews.indexOf(e._view);
            return (
              (o = t),
              (s = (i = (n = this._data).viewContainer._embeddedViews)[(r = a)]),
              Sa(i, r),
              null == o && (o = i.length),
              Ta(i, o, s),
              Is.dirtyParentQueries(s),
              Ea(s),
              ka(n, o > 0 ? i[o - 1] : null, s),
              e
            );
          }),
          (e.prototype.indexOf = function(e) {
            return this._embeddedViews.indexOf(e._view);
          }),
          (e.prototype.remove = function(e) {
            var t = xa(this._data, e);
            t && Is.destroyView(t);
          }),
          (e.prototype.detach = function(e) {
            var t = xa(this._data, e);
            return t ? new Fa(t) : null;
          }),
          e
        );
      })();
      function Ra(e) {
        return new Fa(e);
      }
      var Fa = (function() {
        function e(e) {
          (this._view = e), (this._viewContainerRef = null), (this._appRef = null);
        }
        return (
          Object.defineProperty(e.prototype, 'rootNodes', {
            get: function() {
              return na(this._view, 0, void 0, void 0, (e = [])), e;
              var e;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, 'context', {
            get: function() {
              return this._view.context;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, 'destroyed', {
            get: function() {
              return 0 != (128 & this._view.state);
            },
            enumerable: !0,
            configurable: !0
          }),
          (e.prototype.markForCheck = function() {
            zs(this._view);
          }),
          (e.prototype.detach = function() {
            this._view.state &= -5;
          }),
          (e.prototype.detectChanges = function() {
            var e = this._view.root.rendererFactory;
            e.begin && e.begin();
            try {
              Is.checkAndUpdateView(this._view);
            } finally {
              e.end && e.end();
            }
          }),
          (e.prototype.checkNoChanges = function() {
            Is.checkNoChangesView(this._view);
          }),
          (e.prototype.reattach = function() {
            this._view.state |= 4;
          }),
          (e.prototype.onDestroy = function(e) {
            this._view.disposables || (this._view.disposables = []), this._view.disposables.push(e);
          }),
          (e.prototype.destroy = function() {
            this._appRef
              ? this._appRef.detachView(this)
              : this._viewContainerRef && this._viewContainerRef.detach(this._viewContainerRef.indexOf(this)),
              Is.destroyView(this._view);
          }),
          (e.prototype.detachFromAppRef = function() {
            (this._appRef = null), Ea(this._view), Is.dirtyParentQueries(this._view);
          }),
          (e.prototype.attachToAppRef = function(e) {
            if (this._viewContainerRef) throw new Error('This view is already attached to a ViewContainer!');
            this._appRef = e;
          }),
          (e.prototype.attachToViewContainerRef = function(e) {
            if (this._appRef) throw new Error('This view is already attached directly to the ApplicationRef!');
            this._viewContainerRef = e;
          }),
          e
        );
      })();
      function Ma(e, t) {
        return new ja(e, t);
      }
      var ja = (function(e) {
        function t(t, n) {
          var r = e.call(this) || this;
          return (r._parentView = t), (r._def = n), r;
        }
        return (
          o(t, e),
          (t.prototype.createEmbeddedView = function(e) {
            return new Fa(Is.createEmbeddedView(this._parentView, this._def, this._def.element.template, e));
          }),
          Object.defineProperty(t.prototype, 'elementRef', {
            get: function() {
              return new to(Es(this._parentView, this._def.nodeIndex).renderElement);
            },
            enumerable: !0,
            configurable: !0
          }),
          t
        );
      })(qo);
      function Va(e, t) {
        return new Ba(e, t);
      }
      var Ba = (function() {
        function e(e, t) {
          (this.view = e), (this.elDef = t);
        }
        return (
          (e.prototype.get = function(e, t) {
            return (
              void 0 === t && (t = Bn.THROW_IF_NOT_FOUND),
              Is.resolveDep(
                this.view,
                this.elDef,
                !!this.elDef && 0 != (33554432 & this.elDef.flags),
                { flags: 0, token: e, tokenKey: Fs(e) },
                t
              )
            );
          }),
          e
        );
      })();
      function Ha(e, t) {
        var n = e.def.nodes[t];
        if (1 & n.flags) {
          var r = Es(e, n.nodeIndex);
          return n.element.template ? r.template : r.renderElement;
        }
        if (2 & n.flags) return ks(e, n.nodeIndex).renderText;
        if (20240 & n.flags) return Ts(e, n.nodeIndex).instance;
        throw new Error('Illegal state: read nodeValue for node index ' + t);
      }
      function La(e) {
        return new Ua(e.renderer);
      }
      var Ua = (function() {
        function e(e) {
          this.delegate = e;
        }
        return (
          (e.prototype.selectRootElement = function(e) {
            return this.delegate.selectRootElement(e);
          }),
          (e.prototype.createElement = function(e, t) {
            var n = c(ua(t), 2),
              r = this.delegate.createElement(n[1], n[0]);
            return e && this.delegate.appendChild(e, r), r;
          }),
          (e.prototype.createViewRoot = function(e) {
            return e;
          }),
          (e.prototype.createTemplateAnchor = function(e) {
            var t = this.delegate.createComment('');
            return e && this.delegate.appendChild(e, t), t;
          }),
          (e.prototype.createText = function(e, t) {
            var n = this.delegate.createText(t);
            return e && this.delegate.appendChild(e, n), n;
          }),
          (e.prototype.projectNodes = function(e, t) {
            for (var n = 0; n < t.length; n++) this.delegate.appendChild(e, t[n]);
          }),
          (e.prototype.attachViewAfter = function(e, t) {
            for (var n = this.delegate.parentNode(e), r = this.delegate.nextSibling(e), o = 0; o < t.length; o++)
              this.delegate.insertBefore(n, t[o], r);
          }),
          (e.prototype.detachView = function(e) {
            for (var t = 0; t < e.length; t++) {
              var n = e[t],
                r = this.delegate.parentNode(n);
              this.delegate.removeChild(r, n);
            }
          }),
          (e.prototype.destroyView = function(e, t) {
            for (var n = 0; n < t.length; n++) this.delegate.destroyNode(t[n]);
          }),
          (e.prototype.listen = function(e, t, n) {
            return this.delegate.listen(e, t, n);
          }),
          (e.prototype.listenGlobal = function(e, t, n) {
            return this.delegate.listen(e, t, n);
          }),
          (e.prototype.setElementProperty = function(e, t, n) {
            this.delegate.setProperty(e, t, n);
          }),
          (e.prototype.setElementAttribute = function(e, t, n) {
            var r = c(ua(t), 2),
              o = r[0],
              i = r[1];
            null != n ? this.delegate.setAttribute(e, i, n, o) : this.delegate.removeAttribute(e, i, o);
          }),
          (e.prototype.setBindingDebugInfo = function(e, t, n) {}),
          (e.prototype.setElementClass = function(e, t, n) {
            n ? this.delegate.addClass(e, t) : this.delegate.removeClass(e, t);
          }),
          (e.prototype.setElementStyle = function(e, t, n) {
            null != n ? this.delegate.setStyle(e, t, n) : this.delegate.removeStyle(e, t);
          }),
          (e.prototype.invokeElementMethod = function(e, t, n) {
            e[t].apply(e, n);
          }),
          (e.prototype.setText = function(e, t) {
            this.delegate.setValue(e, t);
          }),
          (e.prototype.animate = function() {
            throw new Error('Renderer.animate is no longer supported!');
          }),
          e
        );
      })();
      function za(e, t, n, r) {
        return new qa(e, t, n, r);
      }
      var qa = (function() {
          function e(e, t, n, r) {
            (this._moduleType = e),
              (this._parent = t),
              (this._bootstrapComponents = n),
              (this._def = r),
              (this._destroyListeners = []),
              (this._destroyed = !1),
              (this.injector = this),
              (function(e) {
                for (var t = e._def, n = (e._providers = new Array(t.providers.length)), r = 0; r < t.providers.length; r++) {
                  var o = t.providers[r];
                  4096 & o.flags || (void 0 === n[r] && (n[r] = Ca(e, o)));
                }
              })(this);
          }
          return (
            (e.prototype.get = function(e, t, n) {
              void 0 === t && (t = Bn.THROW_IF_NOT_FOUND), void 0 === n && (n = We.Default);
              var r = 0;
              return n & We.SkipSelf ? (r |= 1) : n & We.Self && (r |= 4), _a(this, { token: e, tokenKey: Fs(e), flags: r }, t);
            }),
            Object.defineProperty(e.prototype, 'instance', {
              get: function() {
                return this.get(this._moduleType);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'componentFactoryResolver', {
              get: function() {
                return this.get($r);
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.destroy = function() {
              if (this._destroyed) throw new Error('The ng module ' + Be(this.instance.constructor) + ' has already been destroyed.');
              (this._destroyed = !0),
                (function(e, t) {
                  for (var n = e._def, r = new Set(), o = 0; o < n.providers.length; o++)
                    if (131072 & n.providers[o].flags) {
                      var i = e._providers[o];
                      if (i && i !== va) {
                        var s = i.ngOnDestroy;
                        'function' != typeof s || r.has(i) || (s.apply(i), r.add(i));
                      }
                    }
                })(this),
                this._destroyListeners.forEach(function(e) {
                  return e();
                });
            }),
            (e.prototype.onDestroy = function(e) {
              this._destroyListeners.push(e);
            }),
            e
          );
        })(),
        Wa = Fs(ro),
        Za = Fs(so),
        Ka = Fs(to),
        Qa = Fs(Wi),
        Ga = Fs(qo),
        Ja = Fs(Ki),
        Ya = Fs(Bn),
        $a = Fs(jn);
      function Xa(e, t, n, r, o, i, s, a) {
        var u = [];
        if (s)
          for (var l in s) {
            var p = c(s[l], 2);
            u[p[0]] = { flags: 8, name: l, nonMinifiedName: p[1], ns: null, securityContext: null, suffix: null };
          }
        var f = [];
        if (a) for (var d in a) f.push({ type: 1, propName: d, target: null, eventName: a[d] });
        return eu(e, (t |= 16384), n, r, o, o, i, u, f);
      }
      function eu(e, t, n, r, o, i, s, a, u) {
        var c = Ys(n),
          l = c.matchedQueries,
          p = c.references,
          f = c.matchedQueryIds;
        u || (u = []), a || (a = []), (i = Dn(i));
        var d = $s(s, Be(o));
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
          matchedQueries: l,
          matchedQueryIds: f,
          references: p,
          ngContentIndex: -1,
          childCount: r,
          bindings: a,
          bindingFlags: ca(a),
          outputs: u,
          element: null,
          provider: { token: o, value: i, deps: d },
          text: null,
          query: null,
          ngContent: null
        };
      }
      function tu(e, t) {
        return iu(e, t);
      }
      function nu(e, t) {
        for (var n = e; n.parent && !Gs(n); ) n = n.parent;
        return su(n.parent, Ks(n), !0, t.provider.value, t.provider.deps);
      }
      function ru(e, t) {
        var n = su(e, t.parent, (32768 & t.flags) > 0, t.provider.value, t.provider.deps);
        if (t.outputs.length)
          for (var r = 0; r < t.outputs.length; r++) {
            var o = t.outputs[r],
              i = n[o.propName];
            if (!oi(i)) throw new Error('@Output ' + o.propName + " not initialized in '" + n.constructor.name + "'.");
            var s = i.subscribe(ou(e, t.parent.nodeIndex, o.eventName));
            e.disposables[t.outputIndex + r] = s.unsubscribe.bind(s);
          }
        return n;
      }
      function ou(e, t, n) {
        return function(r) {
          return Ws(e, t, n, r);
        };
      }
      function iu(e, t) {
        var n = (8192 & t.flags) > 0,
          r = t.provider;
        switch (201347067 & t.flags) {
          case 512:
            return su(e, t.parent, n, r.value, r.deps);
          case 1024:
            return (function(e, t, n, r, o) {
              var i = o.length;
              switch (i) {
                case 0:
                  return r();
                case 1:
                  return r(uu(e, t, n, o[0]));
                case 2:
                  return r(uu(e, t, n, o[0]), uu(e, t, n, o[1]));
                case 3:
                  return r(uu(e, t, n, o[0]), uu(e, t, n, o[1]), uu(e, t, n, o[2]));
                default:
                  for (var s = Array(i), a = 0; a < i; a++) s[a] = uu(e, t, n, o[a]);
                  return r.apply(void 0, l(s));
              }
            })(e, t.parent, n, r.value, r.deps);
          case 2048:
            return uu(e, t.parent, n, r.deps[0]);
          case 256:
            return r.value;
        }
      }
      function su(e, t, n, r, o) {
        var i = o.length;
        switch (i) {
          case 0:
            return new r();
          case 1:
            return new r(uu(e, t, n, o[0]));
          case 2:
            return new r(uu(e, t, n, o[0]), uu(e, t, n, o[1]));
          case 3:
            return new r(uu(e, t, n, o[0]), uu(e, t, n, o[1]), uu(e, t, n, o[2]));
          default:
            for (var s = new Array(i), a = 0; a < i; a++) s[a] = uu(e, t, n, o[a]);
            return new (r.bind.apply(r, l([void 0], s)))();
        }
      }
      var au = {};
      function uu(e, t, n, r, o) {
        if ((void 0 === o && (o = Bn.THROW_IF_NOT_FOUND), 8 & r.flags)) return r.token;
        var i = e;
        2 & r.flags && (o = null);
        var s = r.tokenKey;
        s === Ja && (n = !(!t || !t.element.componentView)), t && 1 & r.flags && ((n = !1), (t = t.parent));
        for (var a = e; a; ) {
          if (t)
            switch (s) {
              case Wa:
                return La(cu(a, t, n));
              case Za:
                return cu(a, t, n).renderer;
              case Ka:
                return new to(Es(a, t.nodeIndex).renderElement);
              case Qa:
                return Es(a, t.nodeIndex).viewContainer;
              case Ga:
                if (t.element.template) return Es(a, t.nodeIndex).template;
                break;
              case Ja:
                return Ra(cu(a, t, n));
              case Ya:
              case $a:
                return Va(a, t);
              default:
                var u = (n ? t.element.allProviders : t.element.publicProviders)[s];
                if (u) {
                  var c = Ts(a, u.nodeIndex);
                  return c || ((c = { instance: iu(a, u) }), (a.nodes[u.nodeIndex] = c)), c.instance;
                }
            }
          (n = Gs(a)), (t = Ks(a)), (a = a.parent), 4 & r.flags && (a = null);
        }
        var l = i.root.injector.get(r.token, au);
        return l !== au || o === au ? l : i.root.ngModule.injector.get(r.token, o);
      }
      function cu(e, t, n) {
        var r;
        if (n) r = Es(e, t.nodeIndex).componentView;
        else for (r = e; r.parent && !Gs(r); ) r = r.parent;
        return r;
      }
      function lu(e, t, n, r, o, i) {
        if (32768 & n.flags) {
          var s = Es(e, n.parent.nodeIndex).componentView;
          2 & s.def.flags && (s.state |= 8);
        }
        if (((t.instance[n.bindings[r].name] = o), 524288 & n.flags)) {
          i = i || {};
          var a = Tt.unwrap(e.oldValues[n.bindingIndex + r]);
          i[n.bindings[r].nonMinifiedName] = new St(a, o, 0 != (2 & e.state));
        }
        return (e.oldValues[n.bindingIndex + r] = o), i;
      }
      function pu(e, t) {
        if (e.def.nodeFlags & t)
          for (var n = e.def.nodes, r = 0, o = 0; o < n.length; o++) {
            var i = n[o],
              s = i.parent;
            for (
              !s && i.flags & t && du(e, o, i.flags & t, r++), 0 == (i.childFlags & t) && (o += i.childCount);
              s && 1 & s.flags && o === s.nodeIndex + s.childCount;

            )
              s.directChildFlags & t && (r = fu(e, s, t, r)), (s = s.parent);
          }
      }
      function fu(e, t, n, r) {
        for (var o = t.nodeIndex + 1; o <= t.nodeIndex + t.childCount; o++) {
          var i = e.def.nodes[o];
          i.flags & n && du(e, o, i.flags & n, r++), (o += i.childCount);
        }
        return r;
      }
      function du(e, t, n, r) {
        var o = Ts(e, t);
        if (o) {
          var i = o.instance;
          i &&
            (Is.setCurrentNode(e, t),
            1048576 & n && xs(e, 512, r) && i.ngAfterContentInit(),
            2097152 & n && i.ngAfterContentChecked(),
            4194304 & n && xs(e, 768, r) && i.ngAfterViewInit(),
            8388608 & n && i.ngAfterViewChecked(),
            131072 & n && i.ngOnDestroy());
        }
      }
      function hu(e) {
        for (var t = e.def.nodeMatchedQueries; e.parent && Js(e); ) {
          var n = e.parentNodeDef;
          e = e.parent;
          for (var r = n.nodeIndex + n.childCount, o = 0; o <= r; o++)
            67108864 & (i = e.def.nodes[o]).flags &&
              536870912 & i.flags &&
              (i.query.filterId & t) === i.query.filterId &&
              As(e, o).setDirty(),
              (!(1 & i.flags && o + i.childCount < n.nodeIndex) && 67108864 & i.childFlags && 536870912 & i.childFlags) ||
                (o += i.childCount);
        }
        if (134217728 & e.def.nodeFlags)
          for (o = 0; o < e.def.nodes.length; o++) {
            var i;
            134217728 & (i = e.def.nodes[o]).flags && 536870912 & i.flags && As(e, o).setDirty(), (o += i.childCount);
          }
      }
      function yu(e, t) {
        var n = As(e, t.nodeIndex);
        if (n.dirty) {
          var r,
            o = void 0;
          if (67108864 & t.flags) {
            var i = t.parent.parent;
            (o = vu(e, i.nodeIndex, i.nodeIndex + i.childCount, t.query, [])), (r = Ts(e, t.parent.nodeIndex).instance);
          } else 134217728 & t.flags && ((o = vu(e, 0, e.def.nodes.length - 1, t.query, [])), (r = e.component));
          n.reset(o);
          for (var s = t.query.bindings, a = !1, u = 0; u < s.length; u++) {
            var c = s[u],
              l = void 0;
            switch (c.bindingType) {
              case 0:
                l = n.first;
                break;
              case 1:
                (l = n), (a = !0);
            }
            r[c.propName] = l;
          }
          a && n.notifyOnChanges();
        }
      }
      function vu(e, t, n, r, o) {
        for (var i = t; i <= n; i++) {
          var s = e.def.nodes[i],
            a = s.matchedQueries[r.id];
          if (
            (null != a && o.push(gu(e, s, a)),
            1 & s.flags && s.element.template && (s.element.template.nodeMatchedQueries & r.filterId) === r.filterId)
          ) {
            var u = Es(e, i);
            if (
              ((s.childMatchedQueries & r.filterId) === r.filterId && (vu(e, i + 1, i + s.childCount, r, o), (i += s.childCount)),
              16777216 & s.flags)
            )
              for (var c = u.viewContainer._embeddedViews, l = 0; l < c.length; l++) {
                var p = c[l],
                  f = Zs(p);
                f && f === u && vu(p, 0, p.def.nodes.length - 1, r, o);
              }
            var d = u.template._projectedViews;
            if (d)
              for (l = 0; l < d.length; l++) {
                var h = d[l];
                vu(h, 0, h.def.nodes.length - 1, r, o);
              }
          }
          (s.childMatchedQueries & r.filterId) !== r.filterId && (i += s.childCount);
        }
        return o;
      }
      function gu(e, t, n) {
        if (null != n)
          switch (n) {
            case 1:
              return Es(e, t.nodeIndex).renderElement;
            case 0:
              return new to(Es(e, t.nodeIndex).renderElement);
            case 2:
              return Es(e, t.nodeIndex).template;
            case 3:
              return Es(e, t.nodeIndex).viewContainer;
            case 4:
              return Ts(e, t.nodeIndex).instance;
          }
      }
      function mu(e, t, n) {
        var r = Xs(e, t, n);
        r && oa(e, n.ngContent.index, 1, r, null, void 0);
      }
      function bu(e, t, n) {
        for (var r = new Array(n.length - 1), o = 1; o < n.length; o++)
          r[o - 1] = { flags: 8, name: null, ns: null, nonMinifiedName: null, securityContext: null, suffix: n[o] };
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
          text: { prefix: n[0] },
          query: null,
          ngContent: null
        };
      }
      function wu(e, t, n) {
        var r,
          o = e.renderer;
        r = o.createText(n.text.prefix);
        var i = Xs(e, t, n);
        return i && o.appendChild(i, r), { renderText: r };
      }
      function _u(e, t) {
        return (null != e ? e.toString() : '') + t.suffix;
      }
      function Cu(e, t, n, r) {
        for (var o = 0, i = 0, s = 0, a = 0, u = 0, c = null, l = null, p = !1, f = !1, d = null, h = 0; h < t.length; h++) {
          var y = t[h];
          if (
            ((y.nodeIndex = h),
            (y.parent = c),
            (y.bindingIndex = o),
            (y.outputIndex = i),
            (y.renderParent = l),
            (s |= y.flags),
            (u |= y.matchedQueryIds),
            y.element)
          ) {
            var v = y.element;
            (v.publicProviders = c ? c.element.publicProviders : Object.create(null)),
              (v.allProviders = v.publicProviders),
              (p = !1),
              (f = !1),
              y.element.template && (u |= y.element.template.nodeMatchedQueries);
          }
          if ((ku(c, y, t.length), (o += y.bindings.length), (i += y.outputs.length), !l && 3 & y.flags && (d = y), 20224 & y.flags)) {
            p ||
              ((p = !0),
              (c.element.publicProviders = Object.create(c.element.publicProviders)),
              (c.element.allProviders = c.element.publicProviders));
            var g = 0 != (32768 & y.flags);
            0 == (8192 & y.flags) || g
              ? (c.element.publicProviders[Fs(y.provider.token)] = y)
              : (f || ((f = !0), (c.element.allProviders = Object.create(c.element.publicProviders))),
                (c.element.allProviders[Fs(y.provider.token)] = y)),
              g && (c.element.componentProvider = y);
          }
          if (
            (c
              ? ((c.childFlags |= y.flags),
                (c.directChildFlags |= y.flags),
                (c.childMatchedQueries |= y.matchedQueryIds),
                y.element && y.element.template && (c.childMatchedQueries |= y.element.template.nodeMatchedQueries))
              : (a |= y.flags),
            y.childCount > 0)
          )
            (c = y), xu(y) || (l = y);
          else
            for (; c && h === c.nodeIndex + c.childCount; ) {
              var m = c.parent;
              m && ((m.childFlags |= c.childFlags), (m.childMatchedQueries |= c.childMatchedQueries)),
                (l = (c = m) && xu(c) ? c.renderParent : c);
            }
        }
        return {
          factory: null,
          nodeFlags: s,
          rootNodeFlags: a,
          nodeMatchedQueries: u,
          flags: e,
          nodes: t,
          updateDirectives: n || Ds,
          updateRenderer: r || Ds,
          handleEvent: function(e, n, r, o) {
            return t[n].element.handleEvent(e, r, o);
          },
          bindingCount: o,
          outputCount: i,
          lastRenderRootNode: d
        };
      }
      function xu(e) {
        return 0 != (1 & e.flags) && null === e.element.name;
      }
      function ku(e, t, n) {
        var r = t.element && t.element.template;
        if (r) {
          if (!r.lastRenderRootNode) throw new Error('Illegal State: Embedded templates without nodes are not allowed!');
          if (r.lastRenderRootNode && 16777216 & r.lastRenderRootNode.flags)
            throw new Error("Illegal State: Last root node of a template can't have embedded views, at index " + t.nodeIndex + '!');
        }
        if (20224 & t.flags && 0 == (1 & (e ? e.flags : 0)))
          throw new Error(
            'Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index ' + t.nodeIndex + '!'
          );
        if (t.query) {
          if (67108864 & t.flags && (!e || 0 == (16384 & e.flags)))
            throw new Error('Illegal State: Content Query nodes need to be children of directives, at index ' + t.nodeIndex + '!');
          if (134217728 & t.flags && e)
            throw new Error('Illegal State: View Query nodes have to be top level nodes, at index ' + t.nodeIndex + '!');
        }
        if (t.childCount) {
          var o = e ? e.nodeIndex + e.childCount : n - 1;
          if (t.nodeIndex <= o && t.nodeIndex + t.childCount > o)
            throw new Error('Illegal State: childCount of node leads outside of parent, at index ' + t.nodeIndex + '!');
        }
      }
      function Eu(e, t, n, r) {
        var o = Au(e.root, e.renderer, e, t, n);
        return Iu(o, e.component, r), Nu(o), o;
      }
      function Tu(e, t, n) {
        var r = Au(e, e.renderer, null, null, t);
        return Iu(r, n, n), Nu(r), r;
      }
      function Su(e, t, n, r) {
        var o,
          i = t.element.componentRendererType;
        return (o = i ? e.root.rendererFactory.createRenderer(r, i) : e.root.renderer), Au(e.root, o, e, t.element.componentProvider, n);
      }
      function Au(e, t, n, r, o) {
        var i = new Array(o.nodes.length),
          s = o.outputCount ? new Array(o.outputCount) : null;
        return {
          def: o,
          parent: n,
          viewContainerParent: null,
          parentNodeDef: r,
          context: null,
          component: null,
          nodes: i,
          state: 13,
          root: e,
          renderer: t,
          oldValues: new Array(o.bindingCount),
          disposables: s,
          initIndex: -1
        };
      }
      function Iu(e, t, n) {
        (e.component = t), (e.context = n);
      }
      function Nu(e) {
        var t;
        Gs(e) && (t = Es(e.parent, e.parentNodeDef.parent.nodeIndex).renderElement);
        for (var n = e.def, r = e.nodes, o = 0; o < n.nodes.length; o++) {
          var i = n.nodes[o];
          Is.setCurrentNode(e, o);
          var s = void 0;
          switch (201347067 & i.flags) {
            case 1:
              var a = fa(e, t, i),
                u = void 0;
              if (33554432 & i.flags) {
                var c = ta(i.element.componentView);
                u = Is.createComponentView(e, i, c, a);
              }
              da(e, u, i, a),
                (s = { renderElement: a, componentView: u, viewContainer: null, template: i.element.template ? Ma(e, i) : void 0 }),
                16777216 & i.flags && (s.viewContainer = Pa(e, i, s));
              break;
            case 2:
              s = wu(e, t, i);
              break;
            case 512:
            case 1024:
            case 2048:
            case 256:
              (s = r[o]) || 4096 & i.flags || (s = { instance: tu(e, i) });
              break;
            case 16:
              s = { instance: nu(e, i) };
              break;
            case 16384:
              (s = r[o]) || (s = { instance: ru(e, i) }),
                32768 & i.flags && Iu(Es(e, i.parent.nodeIndex).componentView, s.instance, s.instance);
              break;
            case 32:
            case 64:
            case 128:
              s = { value: void 0 };
              break;
            case 67108864:
            case 134217728:
              s = new qi();
              break;
            case 8:
              mu(e, t, i), (s = void 0);
          }
          r[o] = s;
        }
        Bu(e, Vu.CreateViewNodes), zu(e, 201326592, 268435456, 0);
      }
      function Ou(e) {
        Ru(e), Is.updateDirectives(e, 1), Hu(e, Vu.CheckNoChanges), Is.updateRenderer(e, 1), Bu(e, Vu.CheckNoChanges), (e.state &= -97);
      }
      function Pu(e) {
        1 & e.state ? ((e.state &= -2), (e.state |= 2)) : (e.state &= -3),
          Cs(e, 0, 256),
          Ru(e),
          Is.updateDirectives(e, 0),
          Hu(e, Vu.CheckAndUpdate),
          zu(e, 67108864, 536870912, 0);
        var t = Cs(e, 256, 512);
        pu(e, 2097152 | (t ? 1048576 : 0)),
          Is.updateRenderer(e, 0),
          Bu(e, Vu.CheckAndUpdate),
          zu(e, 134217728, 536870912, 0),
          pu(e, 8388608 | ((t = Cs(e, 512, 768)) ? 4194304 : 0)),
          2 & e.def.flags && (e.state &= -9),
          (e.state &= -97),
          Cs(e, 768, 1024);
      }
      function Du(e, t, n, r, o, i, s, a, u, c, p, f, d) {
        return 0 === n
          ? (function(e, t, n, r, o, i, s, a, u, c, l, p) {
              switch (201347067 & t.flags) {
                case 1:
                  return (function(e, t, n, r, o, i, s, a, u, c, l, p) {
                    var f = t.bindings.length,
                      d = !1;
                    return (
                      f > 0 && ya(e, t, 0, n) && (d = !0),
                      f > 1 && ya(e, t, 1, r) && (d = !0),
                      f > 2 && ya(e, t, 2, o) && (d = !0),
                      f > 3 && ya(e, t, 3, i) && (d = !0),
                      f > 4 && ya(e, t, 4, s) && (d = !0),
                      f > 5 && ya(e, t, 5, a) && (d = !0),
                      f > 6 && ya(e, t, 6, u) && (d = !0),
                      f > 7 && ya(e, t, 7, c) && (d = !0),
                      f > 8 && ya(e, t, 8, l) && (d = !0),
                      f > 9 && ya(e, t, 9, p) && (d = !0),
                      d
                    );
                  })(e, t, n, r, o, i, s, a, u, c, l, p);
                case 2:
                  return (function(e, t, n, r, o, i, s, a, u, c, l, p) {
                    var f = !1,
                      d = t.bindings,
                      h = d.length;
                    if (
                      (h > 0 && Ls(e, t, 0, n) && (f = !0),
                      h > 1 && Ls(e, t, 1, r) && (f = !0),
                      h > 2 && Ls(e, t, 2, o) && (f = !0),
                      h > 3 && Ls(e, t, 3, i) && (f = !0),
                      h > 4 && Ls(e, t, 4, s) && (f = !0),
                      h > 5 && Ls(e, t, 5, a) && (f = !0),
                      h > 6 && Ls(e, t, 6, u) && (f = !0),
                      h > 7 && Ls(e, t, 7, c) && (f = !0),
                      h > 8 && Ls(e, t, 8, l) && (f = !0),
                      h > 9 && Ls(e, t, 9, p) && (f = !0),
                      f)
                    ) {
                      var y = t.text.prefix;
                      h > 0 && (y += _u(n, d[0])),
                        h > 1 && (y += _u(r, d[1])),
                        h > 2 && (y += _u(o, d[2])),
                        h > 3 && (y += _u(i, d[3])),
                        h > 4 && (y += _u(s, d[4])),
                        h > 5 && (y += _u(a, d[5])),
                        h > 6 && (y += _u(u, d[6])),
                        h > 7 && (y += _u(c, d[7])),
                        h > 8 && (y += _u(l, d[8])),
                        h > 9 && (y += _u(p, d[9]));
                      var v = ks(e, t.nodeIndex).renderText;
                      e.renderer.setValue(v, y);
                    }
                    return f;
                  })(e, t, n, r, o, i, s, a, u, c, l, p);
                case 16384:
                  return (function(e, t, n, r, o, i, s, a, u, c, l, p) {
                    var f = Ts(e, t.nodeIndex),
                      d = f.instance,
                      h = !1,
                      y = void 0,
                      v = t.bindings.length;
                    return (
                      v > 0 && Hs(e, t, 0, n) && ((h = !0), (y = lu(e, f, t, 0, n, y))),
                      v > 1 && Hs(e, t, 1, r) && ((h = !0), (y = lu(e, f, t, 1, r, y))),
                      v > 2 && Hs(e, t, 2, o) && ((h = !0), (y = lu(e, f, t, 2, o, y))),
                      v > 3 && Hs(e, t, 3, i) && ((h = !0), (y = lu(e, f, t, 3, i, y))),
                      v > 4 && Hs(e, t, 4, s) && ((h = !0), (y = lu(e, f, t, 4, s, y))),
                      v > 5 && Hs(e, t, 5, a) && ((h = !0), (y = lu(e, f, t, 5, a, y))),
                      v > 6 && Hs(e, t, 6, u) && ((h = !0), (y = lu(e, f, t, 6, u, y))),
                      v > 7 && Hs(e, t, 7, c) && ((h = !0), (y = lu(e, f, t, 7, c, y))),
                      v > 8 && Hs(e, t, 8, l) && ((h = !0), (y = lu(e, f, t, 8, l, y))),
                      v > 9 && Hs(e, t, 9, p) && ((h = !0), (y = lu(e, f, t, 9, p, y))),
                      y && d.ngOnChanges(y),
                      65536 & t.flags && xs(e, 256, t.nodeIndex) && d.ngOnInit(),
                      262144 & t.flags && d.ngDoCheck(),
                      h
                    );
                  })(e, t, n, r, o, i, s, a, u, c, l, p);
                case 32:
                case 64:
                case 128:
                  return (function(e, t, n, r, o, i, s, a, u, c, l, p) {
                    var f = t.bindings,
                      d = !1,
                      h = f.length;
                    if (
                      (h > 0 && Ls(e, t, 0, n) && (d = !0),
                      h > 1 && Ls(e, t, 1, r) && (d = !0),
                      h > 2 && Ls(e, t, 2, o) && (d = !0),
                      h > 3 && Ls(e, t, 3, i) && (d = !0),
                      h > 4 && Ls(e, t, 4, s) && (d = !0),
                      h > 5 && Ls(e, t, 5, a) && (d = !0),
                      h > 6 && Ls(e, t, 6, u) && (d = !0),
                      h > 7 && Ls(e, t, 7, c) && (d = !0),
                      h > 8 && Ls(e, t, 8, l) && (d = !0),
                      h > 9 && Ls(e, t, 9, p) && (d = !0),
                      d)
                    ) {
                      var y = Ss(e, t.nodeIndex),
                        v = void 0;
                      switch (201347067 & t.flags) {
                        case 32:
                          (v = new Array(f.length)),
                            h > 0 && (v[0] = n),
                            h > 1 && (v[1] = r),
                            h > 2 && (v[2] = o),
                            h > 3 && (v[3] = i),
                            h > 4 && (v[4] = s),
                            h > 5 && (v[5] = a),
                            h > 6 && (v[6] = u),
                            h > 7 && (v[7] = c),
                            h > 8 && (v[8] = l),
                            h > 9 && (v[9] = p);
                          break;
                        case 64:
                          (v = {}),
                            h > 0 && (v[f[0].name] = n),
                            h > 1 && (v[f[1].name] = r),
                            h > 2 && (v[f[2].name] = o),
                            h > 3 && (v[f[3].name] = i),
                            h > 4 && (v[f[4].name] = s),
                            h > 5 && (v[f[5].name] = a),
                            h > 6 && (v[f[6].name] = u),
                            h > 7 && (v[f[7].name] = c),
                            h > 8 && (v[f[8].name] = l),
                            h > 9 && (v[f[9].name] = p);
                          break;
                        case 128:
                          var g = n;
                          switch (h) {
                            case 1:
                              v = g.transform(n);
                              break;
                            case 2:
                              v = g.transform(r);
                              break;
                            case 3:
                              v = g.transform(r, o);
                              break;
                            case 4:
                              v = g.transform(r, o, i);
                              break;
                            case 5:
                              v = g.transform(r, o, i, s);
                              break;
                            case 6:
                              v = g.transform(r, o, i, s, a);
                              break;
                            case 7:
                              v = g.transform(r, o, i, s, a, u);
                              break;
                            case 8:
                              v = g.transform(r, o, i, s, a, u, c);
                              break;
                            case 9:
                              v = g.transform(r, o, i, s, a, u, c, l);
                              break;
                            case 10:
                              v = g.transform(r, o, i, s, a, u, c, l, p);
                          }
                      }
                      y.value = v;
                    }
                    return d;
                  })(e, t, n, r, o, i, s, a, u, c, l, p);
                default:
                  throw 'unreachable';
              }
            })(e, t, r, o, i, s, a, u, c, p, f, d)
          : (function(e, t, n) {
              switch (201347067 & t.flags) {
                case 1:
                  return (function(e, t, n) {
                    for (var r = !1, o = 0; o < n.length; o++) ya(e, t, o, n[o]) && (r = !0);
                    return r;
                  })(e, t, n);
                case 2:
                  return (function(e, t, n) {
                    for (var r = t.bindings, o = !1, i = 0; i < n.length; i++) Ls(e, t, i, n[i]) && (o = !0);
                    if (o) {
                      var s = '';
                      for (i = 0; i < n.length; i++) s += _u(n[i], r[i]);
                      s = t.text.prefix + s;
                      var a = ks(e, t.nodeIndex).renderText;
                      e.renderer.setValue(a, s);
                    }
                    return o;
                  })(e, t, n);
                case 16384:
                  return (function(e, t, n) {
                    for (var r = Ts(e, t.nodeIndex), o = r.instance, i = !1, s = void 0, a = 0; a < n.length; a++)
                      Hs(e, t, a, n[a]) && ((i = !0), (s = lu(e, r, t, a, n[a], s)));
                    return (
                      s && o.ngOnChanges(s),
                      65536 & t.flags && xs(e, 256, t.nodeIndex) && o.ngOnInit(),
                      262144 & t.flags && o.ngDoCheck(),
                      i
                    );
                  })(e, t, n);
                case 32:
                case 64:
                case 128:
                  return (function(e, t, n) {
                    for (var r = t.bindings, o = !1, i = 0; i < n.length; i++) Ls(e, t, i, n[i]) && (o = !0);
                    if (o) {
                      var s = Ss(e, t.nodeIndex),
                        a = void 0;
                      switch (201347067 & t.flags) {
                        case 32:
                          a = n;
                          break;
                        case 64:
                          for (a = {}, i = 0; i < n.length; i++) a[r[i].name] = n[i];
                          break;
                        case 128:
                          var u = n[0],
                            c = n.slice(1);
                          a = u.transform.apply(u, l(c));
                      }
                      s.value = a;
                    }
                    return o;
                  })(e, t, n);
                default:
                  throw 'unreachable';
              }
            })(e, t, r);
      }
      function Ru(e) {
        var t = e.def;
        if (4 & t.nodeFlags)
          for (var n = 0; n < t.nodes.length; n++) {
            var r = t.nodes[n];
            if (4 & r.flags) {
              var o = Es(e, n).template._projectedViews;
              if (o)
                for (var i = 0; i < o.length; i++) {
                  var s = o[i];
                  (s.state |= 32), qs(s, e);
                }
            } else 0 == (4 & r.childFlags) && (n += r.childCount);
          }
      }
      function Fu(e, t, n, r, o, i, s, a, u, c, l, p, f) {
        return (
          0 === n
            ? (function(e, t, n, r, o, i, s, a, u, c, l, p) {
                var f = t.bindings.length;
                f > 0 && Us(e, t, 0, n),
                  f > 1 && Us(e, t, 1, r),
                  f > 2 && Us(e, t, 2, o),
                  f > 3 && Us(e, t, 3, i),
                  f > 4 && Us(e, t, 4, s),
                  f > 5 && Us(e, t, 5, a),
                  f > 6 && Us(e, t, 6, u),
                  f > 7 && Us(e, t, 7, c),
                  f > 8 && Us(e, t, 8, l),
                  f > 9 && Us(e, t, 9, p);
              })(e, t, r, o, i, s, a, u, c, l, p, f)
            : (function(e, t, n) {
                for (var r = 0; r < n.length; r++) Us(e, t, r, n[r]);
              })(e, t, r),
          !1
        );
      }
      function Mu(e, t) {
        if (As(e, t.nodeIndex).dirty)
          throw Ns(
            Is.createDebugContext(e, t.nodeIndex),
            'Query ' + t.query.id + ' not dirty',
            'Query ' + t.query.id + ' dirty',
            0 != (1 & e.state)
          );
      }
      function ju(e) {
        if (!(128 & e.state)) {
          if ((Hu(e, Vu.Destroy), Bu(e, Vu.Destroy), pu(e, 131072), e.disposables))
            for (var t = 0; t < e.disposables.length; t++) e.disposables[t]();
          !(function(e) {
            if (16 & e.state) {
              var t = Zs(e);
              if (t) {
                var n = t.template._projectedViews;
                n && (Sa(n, n.indexOf(e)), Is.dirtyParentQueries(e));
              }
            }
          })(e),
            e.renderer.destroyNode &&
              (function(e) {
                for (var t = e.def.nodes.length, n = 0; n < t; n++) {
                  var r = e.def.nodes[n];
                  1 & r.flags
                    ? e.renderer.destroyNode(Es(e, n).renderElement)
                    : 2 & r.flags
                    ? e.renderer.destroyNode(ks(e, n).renderText)
                    : (67108864 & r.flags || 134217728 & r.flags) && As(e, n).destroy();
                }
              })(e),
            Gs(e) && e.renderer.destroy(),
            (e.state |= 128);
        }
      }
      var Vu = (function(e) {
        return (
          (e[(e.CreateViewNodes = 0)] = 'CreateViewNodes'),
          (e[(e.CheckNoChanges = 1)] = 'CheckNoChanges'),
          (e[(e.CheckNoChangesProjectedViews = 2)] = 'CheckNoChangesProjectedViews'),
          (e[(e.CheckAndUpdate = 3)] = 'CheckAndUpdate'),
          (e[(e.CheckAndUpdateProjectedViews = 4)] = 'CheckAndUpdateProjectedViews'),
          (e[(e.Destroy = 5)] = 'Destroy'),
          e
        );
      })({});
      function Bu(e, t) {
        var n = e.def;
        if (33554432 & n.nodeFlags)
          for (var r = 0; r < n.nodes.length; r++) {
            var o = n.nodes[r];
            33554432 & o.flags ? Lu(Es(e, r).componentView, t) : 0 == (33554432 & o.childFlags) && (r += o.childCount);
          }
      }
      function Hu(e, t) {
        var n = e.def;
        if (16777216 & n.nodeFlags)
          for (var r = 0; r < n.nodes.length; r++) {
            var o = n.nodes[r];
            if (16777216 & o.flags) for (var i = Es(e, r).viewContainer._embeddedViews, s = 0; s < i.length; s++) Lu(i[s], t);
            else 0 == (16777216 & o.childFlags) && (r += o.childCount);
          }
      }
      function Lu(e, t) {
        var n = e.state;
        switch (t) {
          case Vu.CheckNoChanges:
            0 == (128 & n) && (12 == (12 & n) ? Ou(e) : 64 & n && Uu(e, Vu.CheckNoChangesProjectedViews));
            break;
          case Vu.CheckNoChangesProjectedViews:
            0 == (128 & n) && (32 & n ? Ou(e) : 64 & n && Uu(e, t));
            break;
          case Vu.CheckAndUpdate:
            0 == (128 & n) && (12 == (12 & n) ? Pu(e) : 64 & n && Uu(e, Vu.CheckAndUpdateProjectedViews));
            break;
          case Vu.CheckAndUpdateProjectedViews:
            0 == (128 & n) && (32 & n ? Pu(e) : 64 & n && Uu(e, t));
            break;
          case Vu.Destroy:
            ju(e);
            break;
          case Vu.CreateViewNodes:
            Nu(e);
        }
      }
      function Uu(e, t) {
        Hu(e, t), Bu(e, t);
      }
      function zu(e, t, n, r) {
        if (e.def.nodeFlags & t && e.def.nodeFlags & n)
          for (var o = e.def.nodes.length, i = 0; i < o; i++) {
            var s = e.def.nodes[i];
            if (s.flags & t && s.flags & n)
              switch ((Is.setCurrentNode(e, s.nodeIndex), r)) {
                case 0:
                  yu(e, s);
                  break;
                case 1:
                  Mu(e, s);
              }
            (s.childFlags & t && s.childFlags & n) || (i += s.childCount);
          }
      }
      var qu = !1;
      function Wu(e, t, n, r, o, i) {
        var s = o.injector.get(oo);
        return Tu(Ku(e, o, s, t, n), r, i);
      }
      function Zu(e, t, n, r, o, i) {
        var s = o.injector.get(oo),
          a = Ku(e, o, new Sc(s), t, n),
          u = rc(r);
        return Ec(fc.create, Tu, null, [a, u, i]);
      }
      function Ku(e, t, n, r, o) {
        var i = t.injector.get(Ko),
          s = t.injector.get(ni),
          a = n.createRenderer(null, null);
        return {
          ngModule: t,
          injector: e,
          projectableNodes: r,
          selectorOrNode: o,
          sanitizer: i,
          rendererFactory: n,
          renderer: a,
          errorHandler: s
        };
      }
      function Qu(e, t, n, r) {
        var o = rc(n);
        return Ec(fc.create, Eu, null, [e, t, o, r]);
      }
      function Gu(e, t, n, r) {
        return (n = Xu.get(t.element.componentProvider.provider.token) || rc(n)), Ec(fc.create, Su, null, [e, t, n, r]);
      }
      function Ju(e, t, n, r) {
        return za(
          e,
          t,
          n,
          (function(e) {
            var t = (function(e) {
                var t = !1,
                  n = !1;
                return 0 === Yu.size
                  ? { hasOverrides: t, hasDeprecatedOverrides: n }
                  : (e.providers.forEach(function(e) {
                      var r = Yu.get(e.token);
                      3840 & e.flags && r && ((t = !0), (n = n || r.deprecatedBehavior));
                    }),
                    e.modules.forEach(function(e) {
                      $u.forEach(function(r, o) {
                        Ee(o).providedIn === e && ((t = !0), (n = n || r.deprecatedBehavior));
                      });
                    }),
                    { hasOverrides: t, hasDeprecatedOverrides: n });
              })(e),
              n = t.hasDeprecatedOverrides;
            return t.hasOverrides
              ? ((function(e) {
                  for (var t = 0; t < e.providers.length; t++) {
                    var r = e.providers[t];
                    n && (r.flags |= 4096);
                    var o = Yu.get(r.token);
                    o && ((r.flags = (-3841 & r.flags) | o.flags), (r.deps = $s(o.deps)), (r.value = o.value));
                  }
                  if ($u.size > 0) {
                    var i = new Set(e.modules);
                    $u.forEach(function(t, r) {
                      if (i.has(Ee(r).providedIn)) {
                        var o = { token: r, flags: t.flags | (n ? 4096 : 0), deps: $s(t.deps), value: t.value, index: e.providers.length };
                        e.providers.push(o), (e.providersByKey[Fs(r)] = o);
                      }
                    });
                  }
                })(
                  (e = e.factory(function() {
                    return Ds;
                  }))
                ),
                e)
              : e;
          })(r)
        );
      }
      var Yu = new Map(),
        $u = new Map(),
        Xu = new Map();
      function ec(e) {
        var t;
        Yu.set(e.token, e), 'function' == typeof e.token && (t = Ee(e.token)) && 'function' == typeof t.providedIn && $u.set(e.token, e);
      }
      function tc(e, t) {
        var n = ta(t.viewDefFactory),
          r = ta(n.nodes[0].element.componentView);
        Xu.set(e, r);
      }
      function nc() {
        Yu.clear(), $u.clear(), Xu.clear();
      }
      function rc(e) {
        if (0 === Yu.size) return e;
        var t = (function(e) {
          for (var t = [], n = null, r = 0; r < e.nodes.length; r++) {
            var o = e.nodes[r];
            1 & o.flags && (n = o), n && 3840 & o.flags && Yu.has(o.provider.token) && (t.push(n.nodeIndex), (n = null));
          }
          return t;
        })(e);
        if (0 === t.length) return e;
        e = e.factory(function() {
          return Ds;
        });
        for (var n = 0; n < t.length; n++) r(e, t[n]);
        return e;
        function r(e, t) {
          for (var n = t + 1; n < e.nodes.length; n++) {
            var r = e.nodes[n];
            if (1 & r.flags) return;
            if (3840 & r.flags) {
              var o = r.provider,
                i = Yu.get(o.token);
              i && ((r.flags = (-3841 & r.flags) | i.flags), (o.deps = $s(i.deps)), (o.value = i.value));
            }
          }
        }
      }
      function oc(e, t, n, r, o, i, s, a, u, c, l, p, f) {
        var d = e.def.nodes[t];
        return Du(e, d, n, r, o, i, s, a, u, c, l, p, f), 224 & d.flags ? Ss(e, t).value : void 0;
      }
      function ic(e, t, n, r, o, i, s, a, u, c, l, p, f) {
        var d = e.def.nodes[t];
        return Fu(e, d, n, r, o, i, s, a, u, c, l, p, f), 224 & d.flags ? Ss(e, t).value : void 0;
      }
      function sc(e) {
        return Ec(fc.detectChanges, Pu, null, [e]);
      }
      function ac(e) {
        return Ec(fc.checkNoChanges, Ou, null, [e]);
      }
      function uc(e) {
        return Ec(fc.destroy, ju, null, [e]);
      }
      var cc,
        lc,
        pc,
        fc = (function(e) {
          return (
            (e[(e.create = 0)] = 'create'),
            (e[(e.detectChanges = 1)] = 'detectChanges'),
            (e[(e.checkNoChanges = 2)] = 'checkNoChanges'),
            (e[(e.destroy = 3)] = 'destroy'),
            (e[(e.handleEvent = 4)] = 'handleEvent'),
            e
          );
        })({});
      function dc(e, t) {
        (lc = e), (pc = t);
      }
      function hc(e, t, n, r) {
        return dc(e, t), Ec(fc.handleEvent, e.def.handleEvent, null, [e, t, n, r]);
      }
      function yc(e, t) {
        if (128 & e.state) throw Ps(fc[cc]);
        return (
          dc(e, _c(e, 0)),
          e.def.updateDirectives(function(e, n, r) {
            for (var o = [], i = 3; i < arguments.length; i++) o[i - 3] = arguments[i];
            var s = e.def.nodes[n];
            return (
              0 === t ? gc(e, s, r, o) : mc(e, s, r, o),
              16384 & s.flags && dc(e, _c(e, n)),
              224 & s.flags ? Ss(e, s.nodeIndex).value : void 0
            );
          }, e)
        );
      }
      function vc(e, t) {
        if (128 & e.state) throw Ps(fc[cc]);
        return (
          dc(e, Cc(e, 0)),
          e.def.updateRenderer(function(e, n, r) {
            for (var o = [], i = 3; i < arguments.length; i++) o[i - 3] = arguments[i];
            var s = e.def.nodes[n];
            return (
              0 === t ? gc(e, s, r, o) : mc(e, s, r, o), 3 & s.flags && dc(e, Cc(e, n)), 224 & s.flags ? Ss(e, s.nodeIndex).value : void 0
            );
          }, e)
        );
      }
      function gc(e, t, n, r) {
        if (Du.apply(void 0, l([e, t, n], r))) {
          var o = 1 === n ? r[0] : r;
          if (16384 & t.flags) {
            for (var i = {}, s = 0; s < t.bindings.length; s++) {
              var a = t.bindings[s],
                u = o[s];
              8 & a.flags &&
                (i[
                  ((d = a.nonMinifiedName),
                  (h = void 0),
                  (h = d.replace(/[$@]/g, '_')),
                  'ng-reflect-' +
                    (d = h.replace(bc, function() {
                      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                      return '-' + e[1].toLowerCase();
                    })))
                ] = wc(u));
            }
            var c = t.parent,
              p = Es(e, c.nodeIndex).renderElement;
            if (c.element.name) for (var f in i) null != (u = i[f]) ? e.renderer.setAttribute(p, f, u) : e.renderer.removeAttribute(p, f);
            else e.renderer.setValue(p, 'bindings=' + JSON.stringify(i, null, 2));
          }
        }
        var d, h;
      }
      function mc(e, t, n, r) {
        Fu.apply(void 0, l([e, t, n], r));
      }
      var bc = /([A-Z])/g;
      function wc(e) {
        try {
          return null != e ? e.toString().slice(0, 30) : e;
        } catch (t) {
          return '[ERROR] Exception while trying to serialize the value';
        }
      }
      function _c(e, t) {
        for (var n = t; n < e.def.nodes.length; n++) {
          var r = e.def.nodes[n];
          if (16384 & r.flags && r.bindings && r.bindings.length) return n;
        }
        return null;
      }
      function Cc(e, t) {
        for (var n = t; n < e.def.nodes.length; n++) {
          var r = e.def.nodes[n];
          if (3 & r.flags && r.bindings && r.bindings.length) return n;
        }
        return null;
      }
      var xc = (function() {
        function e(e, t) {
          (this.view = e), (this.nodeIndex = t), null == t && (this.nodeIndex = t = 0), (this.nodeDef = e.def.nodes[t]);
          for (var n = this.nodeDef, r = e; n && 0 == (1 & n.flags); ) n = n.parent;
          if (!n) for (; !n && r; ) (n = Ks(r)), (r = r.parent);
          (this.elDef = n), (this.elView = r);
        }
        return (
          Object.defineProperty(e.prototype, 'elOrCompView', {
            get: function() {
              return Es(this.elView, this.elDef.nodeIndex).componentView || this.view;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, 'injector', {
            get: function() {
              return Va(this.elView, this.elDef);
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, 'component', {
            get: function() {
              return this.elOrCompView.component;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, 'context', {
            get: function() {
              return this.elOrCompView.context;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, 'providerTokens', {
            get: function() {
              var e = [];
              if (this.elDef)
                for (var t = this.elDef.nodeIndex + 1; t <= this.elDef.nodeIndex + this.elDef.childCount; t++) {
                  var n = this.elView.def.nodes[t];
                  20224 & n.flags && e.push(n.provider.token), (t += n.childCount);
                }
              return e;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, 'references', {
            get: function() {
              var e = {};
              if (this.elDef) {
                kc(this.elView, this.elDef, e);
                for (var t = this.elDef.nodeIndex + 1; t <= this.elDef.nodeIndex + this.elDef.childCount; t++) {
                  var n = this.elView.def.nodes[t];
                  20224 & n.flags && kc(this.elView, n, e), (t += n.childCount);
                }
              }
              return e;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, 'componentRenderElement', {
            get: function() {
              var e = (function(e) {
                for (; e && !Gs(e); ) e = e.parent;
                return e.parent ? Es(e.parent, Ks(e).nodeIndex) : null;
              })(this.elOrCompView);
              return e ? e.renderElement : void 0;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, 'renderNode', {
            get: function() {
              return 2 & this.nodeDef.flags ? Qs(this.view, this.nodeDef) : Qs(this.elView, this.elDef);
            },
            enumerable: !0,
            configurable: !0
          }),
          (e.prototype.logError = function(e) {
            for (var t, n, r = [], o = 1; o < arguments.length; o++) r[o - 1] = arguments[o];
            2 & this.nodeDef.flags
              ? ((t = this.view.def), (n = this.nodeDef.nodeIndex))
              : ((t = this.elView.def), (n = this.elDef.nodeIndex));
            var i = (function(e, t) {
                for (var n = -1, r = 0; r <= t; r++) 3 & e.nodes[r].flags && n++;
                return n;
              })(t, n),
              s = -1;
            t.factory(function() {
              var t;
              return ++s === i ? (t = e.error).bind.apply(t, l([e], r)) : Ds;
            }),
              s < i && (e.error('Illegal state: the ViewDefinitionFactory did not call the logger!'), e.error.apply(e, l(r)));
          }),
          e
        );
      })();
      function kc(e, t, n) {
        for (var r in t.references) n[r] = gu(e, t, t.references[r]);
      }
      function Ec(e, t, n, r) {
        var o = cc,
          i = lc,
          s = pc;
        try {
          cc = e;
          var a = t.apply(n, r);
          return (lc = i), (pc = s), (cc = o), a;
        } catch (u) {
          if (Xo(u) || !lc) throw u;
          throw (function(e, t) {
            return e instanceof Error || (e = new Error(e.toString())), Os(e, t), e;
          })(u, Tc());
        }
      }
      function Tc() {
        return lc ? new xc(lc, pc) : null;
      }
      var Sc = (function() {
          function e(e) {
            this.delegate = e;
          }
          return (
            (e.prototype.createRenderer = function(e, t) {
              return new Ac(this.delegate.createRenderer(e, t));
            }),
            (e.prototype.begin = function() {
              this.delegate.begin && this.delegate.begin();
            }),
            (e.prototype.end = function() {
              this.delegate.end && this.delegate.end();
            }),
            (e.prototype.whenRenderingDone = function() {
              return this.delegate.whenRenderingDone ? this.delegate.whenRenderingDone() : Promise.resolve(null);
            }),
            e
          );
        })(),
        Ac = (function() {
          function e(e) {
            (this.delegate = e), (this.debugContextFactory = Tc), (this.data = this.delegate.data);
          }
          return (
            (e.prototype.createDebugContext = function(e) {
              return this.debugContextFactory(e);
            }),
            (e.prototype.destroyNode = function(e) {
              !(function(e) {
                $i.delete(e.nativeNode);
              })(Xi(e)),
                this.delegate.destroyNode && this.delegate.destroyNode(e);
            }),
            (e.prototype.destroy = function() {
              this.delegate.destroy();
            }),
            (e.prototype.createElement = function(e, t) {
              var n = this.delegate.createElement(e, t),
                r = this.createDebugContext(n);
              if (r) {
                var o = new Yi(n, null, r);
                (o.name = e), es(o);
              }
              return n;
            }),
            (e.prototype.createComment = function(e) {
              var t = this.delegate.createComment(e),
                n = this.createDebugContext(t);
              return n && es(new Ji(t, null, n)), t;
            }),
            (e.prototype.createText = function(e) {
              var t = this.delegate.createText(e),
                n = this.createDebugContext(t);
              return n && es(new Ji(t, null, n)), t;
            }),
            (e.prototype.appendChild = function(e, t) {
              var n = Xi(e),
                r = Xi(t);
              n && r && n instanceof Yi && n.addChild(r), this.delegate.appendChild(e, t);
            }),
            (e.prototype.insertBefore = function(e, t, n) {
              var r = Xi(e),
                o = Xi(t),
                i = Xi(n);
              r && o && r instanceof Yi && r.insertBefore(i, o), this.delegate.insertBefore(e, t, n);
            }),
            (e.prototype.removeChild = function(e, t) {
              var n = Xi(e),
                r = Xi(t);
              n && r && n instanceof Yi && n.removeChild(r), this.delegate.removeChild(e, t);
            }),
            (e.prototype.selectRootElement = function(e, t) {
              var n = this.delegate.selectRootElement(e, t),
                r = Tc() || null;
              return r && es(new Yi(n, null, r)), n;
            }),
            (e.prototype.setAttribute = function(e, t, n, r) {
              var o = Xi(e);
              o && o instanceof Yi && (o.attributes[r ? r + ':' + t : t] = n), this.delegate.setAttribute(e, t, n, r);
            }),
            (e.prototype.removeAttribute = function(e, t, n) {
              var r = Xi(e);
              r && r instanceof Yi && (r.attributes[n ? n + ':' + t : t] = null), this.delegate.removeAttribute(e, t, n);
            }),
            (e.prototype.addClass = function(e, t) {
              var n = Xi(e);
              n && n instanceof Yi && (n.classes[t] = !0), this.delegate.addClass(e, t);
            }),
            (e.prototype.removeClass = function(e, t) {
              var n = Xi(e);
              n && n instanceof Yi && (n.classes[t] = !1), this.delegate.removeClass(e, t);
            }),
            (e.prototype.setStyle = function(e, t, n, r) {
              var o = Xi(e);
              o && o instanceof Yi && (o.styles[t] = n), this.delegate.setStyle(e, t, n, r);
            }),
            (e.prototype.removeStyle = function(e, t, n) {
              var r = Xi(e);
              r && r instanceof Yi && (r.styles[t] = null), this.delegate.removeStyle(e, t, n);
            }),
            (e.prototype.setProperty = function(e, t, n) {
              var r = Xi(e);
              r && r instanceof Yi && (r.properties[t] = n), this.delegate.setProperty(e, t, n);
            }),
            (e.prototype.listen = function(e, t, n) {
              if ('string' != typeof e) {
                var r = Xi(e);
                r && r.listeners.push(new Gi(t, n));
              }
              return this.delegate.listen(e, t, n);
            }),
            (e.prototype.parentNode = function(e) {
              return this.delegate.parentNode(e);
            }),
            (e.prototype.nextSibling = function(e) {
              return this.delegate.nextSibling(e);
            }),
            (e.prototype.setValue = function(e, t) {
              return this.delegate.setValue(e, t);
            }),
            e
          );
        })();
      function Ic(e, t, n) {
        return new Nc(e, t, n);
      }
      var Nc = (function(e) {
          function t(t, n, r) {
            var o = e.call(this) || this;
            return (o.moduleType = t), (o._bootstrapComponents = n), (o._ngModuleDefFactory = r), o;
          }
          return (
            o(t, e),
            (t.prototype.create = function(e) {
              !(function() {
                if (!qu) {
                  qu = !0;
                  var e = wo()
                    ? {
                        setCurrentNode: dc,
                        createRootView: Zu,
                        createEmbeddedView: Qu,
                        createComponentView: Gu,
                        createNgModuleRef: Ju,
                        overrideProvider: ec,
                        overrideComponentView: tc,
                        clearOverrides: nc,
                        checkAndUpdateView: sc,
                        checkNoChangesView: ac,
                        destroyView: uc,
                        createDebugContext: function(e, t) {
                          return new xc(e, t);
                        },
                        handleEvent: hc,
                        updateDirectives: yc,
                        updateRenderer: vc
                      }
                    : {
                        setCurrentNode: function() {},
                        createRootView: Wu,
                        createEmbeddedView: Eu,
                        createComponentView: Su,
                        createNgModuleRef: za,
                        overrideProvider: Ds,
                        overrideComponentView: Ds,
                        clearOverrides: Ds,
                        checkAndUpdateView: Pu,
                        checkNoChangesView: Ou,
                        destroyView: ju,
                        createDebugContext: function(e, t) {
                          return new xc(e, t);
                        },
                        handleEvent: function(e, t, n, r) {
                          return e.def.handleEvent(e, t, n, r);
                        },
                        updateDirectives: function(e, t) {
                          return e.def.updateDirectives(0 === t ? oc : ic, e);
                        },
                        updateRenderer: function(e, t) {
                          return e.def.updateRenderer(0 === t ? oc : ic, e);
                        }
                      };
                  (Is.setCurrentNode = e.setCurrentNode),
                    (Is.createRootView = e.createRootView),
                    (Is.createEmbeddedView = e.createEmbeddedView),
                    (Is.createComponentView = e.createComponentView),
                    (Is.createNgModuleRef = e.createNgModuleRef),
                    (Is.overrideProvider = e.overrideProvider),
                    (Is.overrideComponentView = e.overrideComponentView),
                    (Is.clearOverrides = e.clearOverrides),
                    (Is.checkAndUpdateView = e.checkAndUpdateView),
                    (Is.checkNoChangesView = e.checkNoChangesView),
                    (Is.destroyView = e.destroyView),
                    (Is.resolveDep = uu),
                    (Is.createDebugContext = e.createDebugContext),
                    (Is.handleEvent = e.handleEvent),
                    (Is.updateDirectives = e.updateDirectives),
                    (Is.updateRenderer = e.updateRenderer),
                    (Is.dirtyParentQueries = hu);
                }
              })();
              var t = (function(e) {
                var t = Array.from(e.providers),
                  n = Array.from(e.modules),
                  r = {};
                for (var o in e.providersByKey) r[o] = e.providersByKey[o];
                return { factory: e.factory, isRoot: e.isRoot, providers: t, modules: n, providersByKey: r };
              })(ta(this._ngModuleDefFactory));
              return Is.createNgModuleRef(this.moduleType, e || Bn.NULL, this._bootstrapComponents, t);
            }),
            t
          );
        })(er),
        Oc = n('gFX4'),
        Pc = n.n(Oc),
        Dc = (function() {
          function e(e) {
            (this.subscribersCounter = 0),
              (this.emptyConfig = { url: '', options: {} }),
              void 0 === e && (e = this.emptyConfig),
              (this.ioSocket = (Pc.a ? Pc.a : Oc)(e.url, e.options));
          }
          return (
            (e.prototype.of = function(e) {
              this.ioSocket.of(e);
            }),
            (e.prototype.on = function(e, t) {
              this.ioSocket.on(e, t);
            }),
            (e.prototype.once = function(e, t) {
              this.ioSocket.once(e, t);
            }),
            (e.prototype.connect = function() {
              return this.ioSocket.connect();
            }),
            (e.prototype.disconnect = function(e) {
              return this.ioSocket.disconnect.apply(this.ioSocket, arguments);
            }),
            (e.prototype.emit = function(e, t, n) {
              return this.ioSocket.emit.apply(this.ioSocket, arguments);
            }),
            (e.prototype.removeListener = function(e, t) {
              return this.ioSocket.removeListener.apply(this.ioSocket, arguments);
            }),
            (e.prototype.removeAllListeners = function(e) {
              return this.ioSocket.removeAllListeners.apply(this.ioSocket, arguments);
            }),
            (e.prototype.fromEvent = function(e) {
              var t = this;
              return (
                this.subscribersCounter++,
                O.create(function(n) {
                  return (
                    t.ioSocket.on(e, function(e) {
                      n.next(e);
                    }),
                    function() {
                      1 === t.subscribersCounter && t.ioSocket.removeListener(e);
                    }
                  );
                }).pipe(ge())
              );
            }),
            (e.prototype.fromOneTimeEvent = function(e) {
              var t = this;
              return new Promise(function(n) {
                return t.once(e, n);
              });
            }),
            e
          );
        })();
      function Rc(e) {
        return new Dc(e);
      }
      var Fc = new Se('__SOCKET_IO_CONFIG__'),
        Mc = (function() {
          function e() {}
          return (
            (e.forRoot = function(t) {
              return { ngModule: e, providers: [{ provide: Fc, useValue: t }, { provide: Dc, useFactory: Rc, deps: [Fc] }] };
            }),
            e
          );
        })(),
        jc = (function() {
          return function() {};
        })(),
        Vc = (function() {
          return function() {
            this.title = 'ChatAppClient';
          };
        })(),
        Bc = (function() {
          return function() {};
        })(),
        Hc = void 0,
        Lc = [
          'en',
          [['a', 'p'], ['AM', 'PM'], Hc],
          [['AM', 'PM'], Hc, Hc],
          [
            ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
          ],
          Hc,
          [
            ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          ],
          Hc,
          [['B', 'A'], ['BC', 'AD'], ['Before Christ', 'Anno Domini']],
          0,
          [6, 0],
          ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
          ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
          ['{1}, {0}', Hc, "{1} 'at' {0}", Hc],
          ['.', ',', ';', '%', '+', '-', 'E', '\xd7', '\u2030', '\u221e', 'NaN', ':'],
          ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
          '$',
          'US Dollar',
          {},
          function(e) {
            var t = Math.floor(Math.abs(e)),
              n = e.toString().replace(/^[^.]*\.?/, '').length;
            return 1 === t && 0 === n ? 1 : 5;
          }
        ],
        Uc = {},
        zc = (function(e) {
          return (
            (e[(e.Zero = 0)] = 'Zero'),
            (e[(e.One = 1)] = 'One'),
            (e[(e.Two = 2)] = 'Two'),
            (e[(e.Few = 3)] = 'Few'),
            (e[(e.Many = 4)] = 'Many'),
            (e[(e.Other = 5)] = 'Other'),
            e
          );
        })({}),
        qc = new Se('UseV4Plurals'),
        Wc = (function() {
          return function() {};
        })(),
        Zc = (function(e) {
          function t(t, n) {
            var r = e.call(this) || this;
            return (r.locale = t), (r.deprecatedPluralFn = n), r;
          }
          return (
            o(t, e),
            (t.prototype.getPluralCategory = function(e, t) {
              switch (
                this.deprecatedPluralFn
                  ? this.deprecatedPluralFn(t || this.locale, e)
                  : (function(e) {
                      return (function(e) {
                        var t = e.toLowerCase().replace(/_/g, '-'),
                          n = Uc[t];
                        if (n) return n;
                        var r = t.split('-')[0];
                        if ((n = Uc[r])) return n;
                        if ('en' === r) return Lc;
                        throw new Error('Missing locale data for the locale "' + e + '".');
                      })(e)[18];
                    })(t || this.locale)(e)
              ) {
                case zc.Zero:
                  return 'zero';
                case zc.One:
                  return 'one';
                case zc.Two:
                  return 'two';
                case zc.Few:
                  return 'few';
                case zc.Many:
                  return 'many';
                default:
                  return 'other';
              }
            }),
            t
          );
        })(Wc),
        Kc = (function() {
          function e(e, t, n, r) {
            (this.$implicit = e), (this.ngForOf = t), (this.index = n), (this.count = r);
          }
          return (
            Object.defineProperty(e.prototype, 'first', {
              get: function() {
                return 0 === this.index;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'last', {
              get: function() {
                return this.index === this.count - 1;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'even', {
              get: function() {
                return this.index % 2 == 0;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'odd', {
              get: function() {
                return !this.even;
              },
              enumerable: !0,
              configurable: !0
            }),
            e
          );
        })(),
        Qc = (function() {
          function e(e, t, n) {
            (this._viewContainer = e), (this._template = t), (this._differs = n), (this._ngForOfDirty = !0), (this._differ = null);
          }
          return (
            Object.defineProperty(e.prototype, 'ngForOf', {
              set: function(e) {
                (this._ngForOf = e), (this._ngForOfDirty = !0);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'ngForTrackBy', {
              get: function() {
                return this._trackByFn;
              },
              set: function(e) {
                wo() &&
                  null != e &&
                  'function' != typeof e &&
                  console &&
                  console.warn &&
                  console.warn(
                    'trackBy must be a function, but received ' +
                      JSON.stringify(e) +
                      '. See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information.'
                  ),
                  (this._trackByFn = e);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'ngForTemplate', {
              set: function(e) {
                e && (this._template = e);
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.ngDoCheck = function() {
              if (this._ngForOfDirty) {
                this._ngForOfDirty = !1;
                var e = this._ngForOf;
                if (!this._differ && e)
                  try {
                    this._differ = this._differs.find(e).create(this.ngForTrackBy);
                  } catch (r) {
                    throw new Error(
                      "Cannot find a differ supporting object '" +
                        e +
                        "' of type '" +
                        ((t = e).name || typeof t) +
                        "'. NgFor only supports binding to Iterables such as Arrays."
                    );
                  }
              }
              var t;
              if (this._differ) {
                var n = this._differ.diff(this._ngForOf);
                n && this._applyChanges(n);
              }
            }),
            (e.prototype._applyChanges = function(e) {
              var t = this,
                n = [];
              e.forEachOperation(function(e, r, o) {
                if (null == e.previousIndex) {
                  var i = t._viewContainer.createEmbeddedView(t._template, new Kc(null, t._ngForOf, -1, -1), o),
                    s = new Gc(e, i);
                  n.push(s);
                } else null == o ? t._viewContainer.remove(r) : ((i = t._viewContainer.get(r)), t._viewContainer.move(i, o), (s = new Gc(e, i)), n.push(s));
              });
              for (var r = 0; r < n.length; r++) this._perViewChange(n[r].view, n[r].record);
              r = 0;
              for (var o = this._viewContainer.length; r < o; r++) {
                var i = this._viewContainer.get(r);
                (i.context.index = r), (i.context.count = o), (i.context.ngForOf = this._ngForOf);
              }
              e.forEachIdentityChange(function(e) {
                t._viewContainer.get(e.currentIndex).context.$implicit = e.item;
              });
            }),
            (e.prototype._perViewChange = function(e, t) {
              e.context.$implicit = t.item;
            }),
            (e.ngTemplateContextGuard = function(e, t) {
              return !0;
            }),
            e
          );
        })(),
        Gc = (function() {
          return function(e, t) {
            (this.record = e), (this.view = t);
          };
        })(),
        Jc = (function() {
          function e(e, t) {
            (this._viewContainer = e),
              (this._context = new Yc()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = t);
          }
          return (
            Object.defineProperty(e.prototype, 'ngIf', {
              set: function(e) {
                (this._context.$implicit = this._context.ngIf = e), this._updateView();
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'ngIfThen', {
              set: function(e) {
                $c('ngIfThen', e), (this._thenTemplateRef = e), (this._thenViewRef = null), this._updateView();
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'ngIfElse', {
              set: function(e) {
                $c('ngIfElse', e), (this._elseTemplateRef = e), (this._elseViewRef = null), this._updateView();
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype._updateView = function() {
              this._context.$implicit
                ? this._thenViewRef ||
                  (this._viewContainer.clear(),
                  (this._elseViewRef = null),
                  this._thenTemplateRef &&
                    (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context)))
                : this._elseViewRef ||
                  (this._viewContainer.clear(),
                  (this._thenViewRef = null),
                  this._elseTemplateRef &&
                    (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)));
            }),
            (e.ngTemplateGuard_ngIf = function(e, t) {
              return !0;
            }),
            e
          );
        })(),
        Yc = (function() {
          return function() {
            (this.$implicit = null), (this.ngIf = null);
          };
        })();
      function $c(e, t) {
        if (t && !t.createEmbeddedView) throw new Error(e + " must be a TemplateRef, but received '" + Be(t) + "'.");
      }
      var Xc = (function() {
          function e() {}
          return (
            (e.prototype.createSubscription = function(e, t) {
              return e.subscribe({
                next: t,
                error: function(e) {
                  throw e;
                }
              });
            }),
            (e.prototype.dispose = function(e) {
              e.unsubscribe();
            }),
            (e.prototype.onDestroy = function(e) {
              e.unsubscribe();
            }),
            e
          );
        })(),
        el = new ((function() {
          function e() {}
          return (
            (e.prototype.createSubscription = function(e, t) {
              return e.then(t, function(e) {
                throw e;
              });
            }),
            (e.prototype.dispose = function(e) {}),
            (e.prototype.onDestroy = function(e) {}),
            e
          );
        })())(),
        tl = new Xc(),
        nl = (function() {
          function e(e) {
            (this._ref = e),
              (this._latestValue = null),
              (this._latestReturnedValue = null),
              (this._subscription = null),
              (this._obj = null),
              (this._strategy = null);
          }
          var t;
          return (
            (t = e),
            (e.prototype.ngOnDestroy = function() {
              this._subscription && this._dispose();
            }),
            (e.prototype.transform = function(e) {
              return this._obj
                ? e !== this._obj
                  ? (this._dispose(), this.transform(e))
                  : this._latestValue === this._latestReturnedValue
                  ? this._latestReturnedValue
                  : ((this._latestReturnedValue = this._latestValue), Tt.wrap(this._latestValue))
                : (e && this._subscribe(e), (this._latestReturnedValue = this._latestValue), this._latestValue);
            }),
            (e.prototype._subscribe = function(e) {
              var t = this;
              (this._obj = e),
                (this._strategy = this._selectStrategy(e)),
                (this._subscription = this._strategy.createSubscription(e, function(n) {
                  return t._updateLatestValue(e, n);
                }));
            }),
            (e.prototype._selectStrategy = function(e) {
              if (ri(e)) return el;
              if (oi(e)) return tl;
              throw Error("InvalidPipeArgument: '" + e + "' for pipe '" + Be(t) + "'");
            }),
            (e.prototype._dispose = function() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._latestReturnedValue = null),
                (this._subscription = null),
                (this._obj = null);
            }),
            (e.prototype._updateLatestValue = function(e, t) {
              e === this._obj && ((this._latestValue = t), this._ref.markForCheck());
            }),
            e
          );
        })(),
        rl = (function() {
          return function() {};
        })(),
        ol = new Se('DocumentToken'),
        il = 'browser',
        sl = 'server';
      function al(e) {
        return e === il;
      }
      var ul = (function() {
          return function() {
            this.userName = 'test';
          };
        })(),
        cl = (function() {
          function e(e, t) {
            (this.socket = e),
              (this.globals = t),
              (this.uniqueOT = this.docId()),
              (this.username = window.localStorage.getItem('UserName')),
              (this.documents = this.socket.fromEvent('documents' + this.username + 'END')),
              (this.currDocument = this.socket.fromEvent('doc-Arr')),
              (this.currDocMsg = this.socket.fromEvent('doc-Msg')),
              (this.userConfirm = this.socket.fromEvent('userAuth' + this.uniqueOT));
          }
          return (
            (e.prototype.getContacts = function() {
              var e = window.localStorage.getItem('UserName');
              this.socket.emit('arrDocuments', e);
            }),
            (e.prototype.loadDoc = function(e) {
              this.socket.emit('getDocArr', e);
            }),
            (e.prototype.newDocument = function(e, t) {
              this.socket.emit('addDoc', { id: this.docId(), users: [t, e], doc: [{ sender: '', content: '', time: '', date: '' }] });
            }),
            (e.prototype.addUser = function(e, t) {
              this.socket.emit('userAuth', [e, t, this.uniqueOT]);
            }),
            (e.prototype.sendMsg = function(e) {
              this.socket.emit('sendMsg', e);
            }),
            (e.prototype.docId = function() {
              for (var e = '', t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', n = 0; n < 10; n++)
                e += t.charAt(Math.floor(Math.random() * t.length));
              return e;
            }),
            (e.ngInjectableDef = ke({
              factory: function() {
                return new e(Ge(Dc), Ge(ul));
              },
              token: e,
              providedIn: 'root'
            })),
            e
          );
        })(),
        ll = (function() {
          function e(e, t) {
            (this.documentService = e), (this.globals = t), (this.loggedIn = !1), (this.userame = window.localStorage.getItem('UserName'));
          }
          return (
            (e.prototype.ngOnInit = function() {
              var e = this;
              this.loggedInCheck(),
                this.getContacts(),
                (this.logResponse = this.documentService.userConfirm),
                (this._docSub = this.documentService.userConfirm.subscribe(function(t) {
                  e.logginReply(t);
                }));
            }),
            (e.prototype.ngOnDestroy = function() {
              this._docSub.unsubscribe();
            }),
            (e.prototype.loadDoc = function(e, t) {
              this.documentService.loadDoc(e[0]);
            }),
            (e.prototype.newDoc = function(e, t) {
              this.documentService.newDocument(e, t), this.getContacts();
            }),
            (e.prototype.hideNav = function() {
              document.getElementById('nav').style.display = 'none';
            }),
            (e.prototype.getContacts = function() {
              this.documentService.getContacts(), (this.documents = this.documentService.documents);
            }),
            (e.prototype.saveName = function() {
              window.localStorage.setItem('UserName', this.globals.userName);
            }),
            (e.prototype.login = function(e, t) {
              (this.globals.userName = e),
                this.getContacts(),
                this.documentService.addUser(e, t),
                setTimeout(function() {
                  window.location.reload();
                }, 500);
            }),
            (e.prototype.loggedInCheck = function() {
              var e = window.localStorage.getItem('UserName');
              null !== e && -1 == e.indexOf('test') ? (this.loggedIn = !0) : (this.userame = '');
            }),
            (e.prototype.logginReply = function(e) {
              e.indexOf('confirm') > -1 ? ((this.loggedIn = !0), this.saveName()) : alert(e);
            }),
            e
          );
        })(),
        pl = Vs({
          encapsulation: 0,
          styles: [
            [
              ".header[_ngcontent-%COMP%]{left:0;top:0;background-color:navy;width:100%;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;padding-top:10px;z-index:9999999;display:block}.header[_ngcontent-%COMP%]   #loggedInParagraph[_ngcontent-%COMP%]{color:#fff;font-family:'Times New Roman',Times,serif;font-size:25px;margin-top:10px;margin-bottom:10px}.header[_ngcontent-%COMP%]   #loggedOut[_ngcontent-%COMP%]{height:100%;top:100px;background-color:navy}div[_ngcontent-%COMP%]{position:fixed;height:100%;width:100%;top:0;bottom:0;left:0;background-color:#d7dff5;overflow-x:hidden;text-align:center;margin:0;z-index:1500}div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{text-decoration:none;z-index:999999;font-size:30px;color:navy;background-color:#f6f6f6;width:80%;margin-left:10%;margin-top:5px;display:block;border-radius:2px}div[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]{color:#e1e1e1}div[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover{cursor:pointer}div[_ngcontent-%COMP%]   .loginInput[_ngcontent-%COMP%]{color:#000;font-family:'Times New Roman',Times,serif;font-size:25px;margin-bottom:10px;text-align:center}div[_ngcontent-%COMP%]   #contactNameInput[_ngcontent-%COMP%]{font-family:'Times New Roman',Times,serif;color:#000;font-size:20px;text-align:center;margin-top:10px;margin-bottom:10px}h3[_ngcontent-%COMP%]{margin-bottom:0;padding-top:4px;font-size:30px;margin-top:10px}button[_ngcontent-%COMP%]{font-family:'Times New Roman',Times,serif;width:80px;height:30px;border-radius:20px;font-size:20px;border:none}#addContButton[_ngcontent-%COMP%]{background-color:navy;color:#fff}#loginButton[_ngcontent-%COMP%]{background-color:#fff}#addContact[_ngcontent-%COMP%]{position:relative;z-index:999999;font-size:20px;color:navy;background-color:#f6f6f6;width:90%;height:auto;margin-top:65px;margin-left:5%;margin-bottom:3%;padding-bottom:10px;border-radius:2px}"
            ]
          ],
          data: {}
        });
      function fl(e) {
        return Cu(
          0,
          [
            (e()(), pa(0, 0, null, null, 1, 'p', [['id', 'loggedInParagraph']], null, null, null, null, null)),
            (e()(), bu(-1, null, ['Login or Sign up']))
          ],
          null,
          null
        );
      }
      function dl(e) {
        return Cu(
          0,
          [
            (e()(), pa(0, 0, null, null, 4, 'div', [['id', 'loggedOut']], null, null, null, null, null)),
            (e()(),
            pa(
              1,
              0,
              [['userPass', 1]],
              null,
              0,
              'input',
              [['class', 'loginInput'], ['placeholder', 'Password...'], ['type', 'password']],
              null,
              [[null, 'keydown.enter']],
              function(e, t, n) {
                var r = !0;
                return 'keydown.enter' === t && (r = !1 !== e.component.login(Ha(e.parent, 4).value, Ha(e, 1).value) && r), r;
              },
              null,
              null
            )),
            (e()(), pa(2, 0, null, null, 0, 'br', [], null, null, null, null, null)),
            (e()(),
            pa(
              3,
              0,
              null,
              null,
              1,
              'button',
              [['id', 'loginButton']],
              null,
              [[null, 'click']],
              function(e, t, n) {
                var r = !0;
                return 'click' === t && (r = !1 !== e.component.login(Ha(e.parent, 4).value, Ha(e, 1).value) && r), r;
              },
              null,
              null
            )),
            (e()(), bu(-1, null, ['Login']))
          ],
          null,
          null
        );
      }
      function hl(e) {
        return Cu(
          0,
          [
            (e()(),
            pa(
              0,
              0,
              null,
              null,
              1,
              'span',
              [],
              [[2, 'selected', null]],
              [[null, 'click']],
              function(e, t, n) {
                var r = !0,
                  o = e.component;
                return (
                  'click' === t &&
                    (o.loadDoc(e.context.$implicit, Ha(e.parent, 4).value),
                    o.hideNav(),
                    (r = !1 !== (o.globals.userName = Ha(e.parent, 4).value) && r)),
                  r
                );
              },
              null,
              null
            )),
            (e()(), bu(1, null, ['', ' ']))
          ],
          null,
          function(e, t) {
            e(t, 0, 0, t.context.$implicit === t.component.currArr2), e(t, 1, 0, t.context.$implicit[1]);
          }
        );
      }
      function yl(e) {
        return Cu(
          0,
          [
            (e()(), pa(0, 0, null, null, 18, 'div', [['class', 'container'], ['id', 'nav']], null, null, null, null, null)),
            (e()(), pa(1, 0, null, null, 6, 'div', [['class', 'header']], null, null, null, null, null)),
            (e()(), la(16777216, null, null, 1, null, fl)),
            Xa(3, 16384, null, 0, Jc, [Wi, qo], { ngIf: [0, 'ngIf'] }, null),
            (e()(),
            pa(
              4,
              0,
              [['userName', 1]],
              null,
              0,
              'input',
              [['class', 'loginInput'], ['placeholder', 'Username...'], ['type', 'text']],
              [[8, 'value', 0]],
              [[null, 'keyup']],
              function(e, t, n) {
                var r = !0;
                return 'keyup' === t && (r = !1 !== e.component.saveName() && r), r;
              },
              null,
              null
            )),
            (e()(), pa(5, 0, null, null, 0, 'br', [], null, null, null, null, null)),
            (e()(), la(16777216, null, null, 1, null, dl)),
            Xa(7, 16384, null, 0, Jc, [Wi, qo], { ngIf: [0, 'ngIf'] }, null),
            (e()(), pa(8, 0, null, null, 6, 'div', [['id', 'addContact']], null, null, null, null, null)),
            (e()(), pa(9, 0, null, null, 1, 'h3', [], null, null, null, null, null)),
            (e()(), bu(-1, null, ['Add New Contact'])),
            (e()(),
            pa(
              11,
              0,
              [['contactNameInput', 1]],
              null,
              0,
              'input',
              [['id', 'contactNameInput'], ['placeholder', 'Enter Name...'], ['type', 'text']],
              null,
              [[null, 'keydown.enter']],
              function(e, t, n) {
                var r = !0;
                return (
                  'keydown.enter' === t && (e.component.newDoc(Ha(e, 11).value, Ha(e, 4).value), (r = !1 !== (Ha(e, 11).value = '') && r)),
                  r
                );
              },
              null,
              null
            )),
            (e()(), pa(12, 0, null, null, 0, 'br', [], null, null, null, null, null)),
            (e()(),
            pa(
              13,
              0,
              null,
              null,
              1,
              'button',
              [['id', 'addContButton']],
              null,
              [[null, 'click']],
              function(e, t, n) {
                var r = !0;
                return 'click' === t && (e.component.newDoc(Ha(e, 11).value, Ha(e, 4).value), (r = !1 !== (Ha(e, 11).value = '') && r)), r;
              },
              null,
              null
            )),
            (e()(), bu(-1, null, ['Add'])),
            (e()(), la(16777216, null, null, 2, null, hl)),
            Xa(16, 278528, null, 0, Qc, [Wi, qo, ps], { ngForOf: [0, 'ngForOf'] }, null),
            ((t = 131072), (n = nl), (r = [Ki]), eu(-1, (t |= 16), null, 0, n, n, r)),
            (e()(), pa(18, 0, null, null, 0, 'br', [], null, null, null, null, null))
          ],
          function(e, t) {
            var n = t.component;
            e(t, 3, 0, !n.loggedIn),
              e(t, 7, 0, !n.loggedIn),
              e(
                t,
                16,
                0,
                (function(e, t, n, r) {
                  if (Tt.isWrapped(r)) {
                    r = Tt.unwrap(r);
                    var o = e.def.nodes[16].bindingIndex + 0,
                      i = Tt.unwrap(e.oldValues[o]);
                    e.oldValues[o] = new Tt(i);
                  }
                  return r;
                })(t, 0, 0, Ha(t, 17).transform(n.documents))
              );
          },
          function(e, t) {
            var n;
            e(t, 4, 0, '' + (null != (n = t.component.userame) ? n.toString() : ''));
          }
        );
        var t, n, r;
      }
      function vl(e) {
        var t = new O(function(t) {
          t.next(e), t.complete();
        });
        return (t._isScalar = !0), (t.value = e), t;
      }
      var gl = new O(function(e) {
        return e.complete();
      });
      function ml(e) {
        return e
          ? (function(e) {
              return new O(function(t) {
                return e.schedule(function() {
                  return t.complete();
                });
              });
            })(e)
          : gl;
      }
      function bl() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var n = e[e.length - 1];
        switch ((B(n) ? e.pop() : (n = void 0), e.length)) {
          case 0:
            return ml(n);
          case 1:
            return n ? te(e, n) : vl(e[0]);
          default:
            return te(e, n);
        }
      }
      function wl() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return 1 === e.length || (2 === e.length && B(e[1])) ? ne(e[0]) : se(1)(bl.apply(void 0, e));
      }
      var _l = (function() {
          function e(e, t) {
            (this.documentService = e), (this.globals = t);
          }
          return (
            (e.prototype.ngOnInit = function() {
              var e = this;
              (this._docSub = this.documentService.currDocument
                .pipe(
                  (function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return function(t) {
                      var n = e[e.length - 1];
                      B(n) ? e.pop() : (n = null);
                      var r = e.length;
                      return wl(1 !== r || n ? (r > 0 ? te(e, n) : ml(n)) : vl(e[0]), t);
                    };
                  })({ id: '', users: [''], doc: [{ sender: '', content: '', time: '', date: '' }] })
                )
                .subscribe(function(t) {
                  e.docArr = t;
                })),
                (this._docSub = this.documentService.currDocMsg.subscribe(function(t) {
                  e.docArr.doc.push(t.doc[0]);
                }));
            }),
            (e.prototype.ngOnDestroy = function() {
              this._docSub.unsubscribe();
            }),
            (e.prototype.sendMsg = function(e) {
              var t = new Date(),
                n = t.getHours() + ':' + t.getMinutes(),
                r = t.getUTCDate() + '',
                o = { sender: this.globals.userName, content: e, time: n, date: r },
                i = { id: this.docArr.id, doc: [o] };
              this.docArr.doc.push(o), this.documentService.sendMsg(i);
            }),
            (e.prototype.showNav = function() {
              document.getElementById('nav').style.display = 'block';
            }),
            (e.prototype.isUser = function(e) {
              var t = !1;
              return this.globals.userName == e && (t = !0), t;
            }),
            (e.prototype.contactName = function() {
              return this.docArr.users[0] == this.globals.userName ? this.docArr.users[1] : this.docArr.users[0];
            }),
            (e.prototype.notEmpty = function(e) {
              return e.length > 0;
            }),
            e
          );
        })(),
        Cl = Vs({
          encapsulation: 0,
          styles: [
            [
              "#doc-body[_ngcontent-%COMP%]{position:fixed;background-color:#d7dff5;width:100%;left:0;padding-left:3%}#header[_ngcontent-%COMP%]{clear:right;position:fixed;display:inline;text-align:center;top:0;left:0;height:55px;width:100%;background-color:navy;z-index:600;border:1px solid #000}#receiver[_ngcontent-%COMP%]{color:#fff;margin-top:13px!important;font-size:30px;display:block}#messArea[_ngcontent-%COMP%]{position:fixed;overflow:scroll;width:100%;padding-top:50px;height:79%;background-color:#d7dff5;bottom:30px;left:0;padding-bottom:20px;padding-left:20px}#container[_ngcontent-%COMP%]{margin-top:5px;padding-right:5px}#usrMsg[_ngcontent-%COMP%]{font-size:18px;border:1px solid #000;border-radius:2px;clear:both;float:right;margin-right:40px;margin-top:5px;color:#fff;background-color:navy;padding:0}#ntUsr[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], #usrMsg[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:3px}#ntUsr[_ngcontent-%COMP%]{margin-top:5px;font-size:18px;border:1px solid #000;border-radius:2px;clear:both;float:left;background-color:#fff}.timeStamp[_ngcontent-%COMP%]{font-size:10px}#msgType[_ngcontent-%COMP%]{position:relative;width:75%;left:calc(15% - 2px);height:80%;margin-top:5px;font-size:20px;border:0 solid #fff;bottom:1px;z-index:499;border-radius:2px;font-family:'Times New Roman',Times,serif;text-align:center}input[type=text][_ngcontent-%COMP%]:focus{outline:0}#bottom[_ngcontent-%COMP%]{position:fixed;bottom:0;left:0;width:100%;background-color:#d7dff5}#typeArea[_ngcontent-%COMP%]{-webkit-backface-visibility:none;backface-visibility:none;float:left;height:35px;bottom:0;margin-top:6px;margin-left:2%;width:calc(94% - 42px);z-index:600;background-color:#fff;border-radius:20px}#sendButton[_ngcontent-%COMP%]{margin-left:2%;padding-left:5px;border-radius:50%;width:45px;height:45px;z-index:499;font-size:10px;background-color:navy;color:#fff;border:none;font-family:'Times New Roman',Times,serif}#backButton[_ngcontent-%COMP%]{position:fixed;font-family:'Times New Roman',Times,serif;display:inline;margin-top:3px;left:0;margin-left:1%;border-radius:50%;width:45px;height:45px;z-index:499;background-color:#fff;border:none}[_ngcontent-%COMP%]::-webkit-scrollbar{width:0;background:0 0}"
            ]
          ],
          data: {}
        });
      function xl(e) {
        return Cu(
          0,
          [
            (e()(), pa(0, 0, null, null, 4, 'div', [['id', 'usrMsg']], null, null, null, null, null)),
            (e()(), pa(1, 0, null, null, 1, 'p', [], null, null, null, null, null)),
            (e()(), bu(2, null, ['', ' '])),
            (e()(), pa(3, 0, null, null, 1, 'p', [['class', 'timeStamp']], null, null, null, null, null)),
            (e()(), bu(4, null, ['', '']))
          ],
          null,
          function(e, t) {
            e(t, 2, 0, t.parent.parent.context.$implicit.content), e(t, 4, 0, t.parent.parent.context.$implicit.time);
          }
        );
      }
      function kl(e) {
        return Cu(
          0,
          [
            (e()(), pa(0, 0, null, null, 4, 'div', [['id', 'ntUsr']], null, null, null, null, null)),
            (e()(), pa(1, 0, null, null, 1, 'p', [], null, null, null, null, null)),
            (e()(), bu(2, null, ['', ' '])),
            (e()(), pa(3, 0, null, null, 1, 'p', [['class', 'timeStamp']], null, null, null, null, null)),
            (e()(), bu(4, null, ['', '']))
          ],
          null,
          function(e, t) {
            e(t, 2, 0, t.parent.parent.context.$implicit.content), e(t, 4, 0, t.parent.parent.context.$implicit.time);
          }
        );
      }
      function El(e) {
        return Cu(
          0,
          [
            (e()(), pa(0, 0, null, null, 4, 'div', [], null, null, null, null, null)),
            (e()(), la(16777216, null, null, 1, null, xl)),
            Xa(2, 16384, null, 0, Jc, [Wi, qo], { ngIf: [0, 'ngIf'] }, null),
            (e()(), la(16777216, null, null, 1, null, kl)),
            Xa(4, 16384, null, 0, Jc, [Wi, qo], { ngIf: [0, 'ngIf'] }, null)
          ],
          function(e, t) {
            var n = t.component;
            e(t, 2, 0, n.isUser(t.parent.context.$implicit.sender)), e(t, 4, 0, !n.isUser(t.parent.context.$implicit.sender));
          },
          null
        );
      }
      function Tl(e) {
        return Cu(
          0,
          [
            (e()(), pa(0, 0, null, null, 2, 'div', [], null, null, null, null, null)),
            (e()(), la(16777216, null, null, 1, null, El)),
            Xa(2, 16384, null, 0, Jc, [Wi, qo], { ngIf: [0, 'ngIf'] }, null)
          ],
          function(e, t) {
            e(t, 2, 0, t.component.notEmpty(t.context.$implicit.content));
          },
          null
        );
      }
      function Sl(e) {
        return Cu(
          0,
          [
            (e()(), pa(0, 0, null, null, 15, 'div', [['id', 'doc-body']], null, null, null, null, null)),
            (e()(), pa(1, 0, null, null, 5, 'div', [['id', 'header']], null, null, null, null, null)),
            (e()(),
            pa(
              2,
              0,
              null,
              null,
              1,
              'button',
              [['id', 'backButton']],
              null,
              [[null, 'click']],
              function(e, t, n) {
                var r = !0;
                return 'click' === t && (r = !1 !== e.component.showNav() && r), r;
              },
              null,
              null
            )),
            (e()(), bu(-1, null, ['Back'])),
            (e()(), pa(4, 0, null, null, 2, 'strong', [], null, null, null, null, null)),
            (e()(), pa(5, 0, null, null, 1, 'p', [['id', 'receiver']], null, null, null, null, null)),
            (e()(), bu(6, null, ['', ''])),
            (e()(), pa(7, 0, null, null, 3, 'div', [['id', 'messArea']], null, null, null, null, null)),
            (e()(), pa(8, 0, null, null, 2, 'div', [], null, null, null, null, null)),
            (e()(), la(16777216, null, null, 1, null, Tl)),
            Xa(10, 278528, null, 0, Qc, [Wi, qo, ps], { ngForOf: [0, 'ngForOf'] }, null),
            (e()(), pa(11, 0, null, null, 4, 'div', [['id', 'bottom']], null, null, null, null, null)),
            (e()(), pa(12, 0, null, null, 1, 'div', [['id', 'typeArea']], null, null, null, null, null)),
            (e()(),
            pa(
              13,
              0,
              [['text', 1]],
              null,
              0,
              'input',
              [['id', 'msgType'], ['placeholder', 'Start typing...'], ['type', 'text']],
              null,
              [[null, 'keydown.enter']],
              function(e, t, n) {
                var r = !0;
                return 'keydown.enter' === t && (e.component.sendMsg(Ha(e, 13).value), (r = !1 !== (Ha(e, 13).value = '') && r)), r;
              },
              null,
              null
            )),
            (e()(),
            pa(
              14,
              0,
              null,
              null,
              1,
              'button',
              [['id', 'sendButton']],
              null,
              [[null, 'click']],
              function(e, t, n) {
                var r = !0;
                return 'click' === t && (e.component.sendMsg(Ha(e, 13).value), (r = !1 !== (Ha(e, 13).value = '') && r)), r;
              },
              null,
              null
            )),
            (e()(), bu(-1, null, ['Send']))
          ],
          function(e, t) {
            e(t, 10, 0, t.component.docArr.doc);
          },
          function(e, t) {
            e(t, 6, 0, t.component.contactName());
          }
        );
      }
      var Al = Vs({ encapsulation: 0, styles: [['']], data: {} });
      function Il(e) {
        return Cu(
          0,
          [
            (e()(), pa(0, 0, null, null, 1, 'app-document-list', [], null, null, null, yl, pl)),
            Xa(1, 245760, null, 0, ll, [cl, ul], null, null),
            (e()(), pa(2, 0, null, null, 1, 'app-document', [], null, null, null, Sl, Cl)),
            Xa(3, 245760, null, 0, _l, [cl, ul], null, null)
          ],
          function(e, t) {
            e(t, 1, 0), e(t, 3, 0);
          },
          null
        );
      }
      function Nl(e) {
        return Cu(
          0,
          [(e()(), pa(0, 0, null, null, 1, 'app-root', [], null, null, null, Il, Al)), Xa(1, 49152, null, 0, Vc, [], null, null)],
          null,
          null
        );
      }
      var Ol = Ia('app-root', Vc, Nl, {}, {}, []),
        Pl = null;
      function Dl() {
        return Pl;
      }
      var Rl,
        Fl = { class: 'className', innerHtml: 'innerHTML', readonly: 'readOnly', tabindex: 'tabIndex' },
        Ml = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS'
        },
        jl = {
          A: '1',
          B: '2',
          C: '3',
          D: '4',
          E: '5',
          F: '6',
          G: '7',
          H: '8',
          I: '9',
          J: '*',
          K: '+',
          M: '-',
          N: '.',
          O: '/',
          '`': '0',
          '\x90': 'NumLock'
        };
      De.Node &&
        (Rl =
          De.Node.prototype.contains ||
          function(e) {
            return !!(16 & this.compareDocumentPosition(e));
          });
      var Vl,
        Bl = (function(e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            o(t, e),
            (t.prototype.parse = function(e) {
              throw new Error('parse not implemented');
            }),
            (t.makeCurrent = function() {
              var e;
              (e = new t()), Pl || (Pl = e);
            }),
            (t.prototype.hasProperty = function(e, t) {
              return t in e;
            }),
            (t.prototype.setProperty = function(e, t, n) {
              e[t] = n;
            }),
            (t.prototype.getProperty = function(e, t) {
              return e[t];
            }),
            (t.prototype.invoke = function(e, t, n) {
              var r;
              (r = e)[t].apply(r, l(n));
            }),
            (t.prototype.logError = function(e) {
              window.console && (console.error ? console.error(e) : console.log(e));
            }),
            (t.prototype.log = function(e) {
              window.console && window.console.log && window.console.log(e);
            }),
            (t.prototype.logGroup = function(e) {
              window.console && window.console.group && window.console.group(e);
            }),
            (t.prototype.logGroupEnd = function() {
              window.console && window.console.groupEnd && window.console.groupEnd();
            }),
            Object.defineProperty(t.prototype, 'attrToPropMap', {
              get: function() {
                return Fl;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.contains = function(e, t) {
              return Rl.call(e, t);
            }),
            (t.prototype.querySelector = function(e, t) {
              return e.querySelector(t);
            }),
            (t.prototype.querySelectorAll = function(e, t) {
              return e.querySelectorAll(t);
            }),
            (t.prototype.on = function(e, t, n) {
              e.addEventListener(t, n, !1);
            }),
            (t.prototype.onAndCancel = function(e, t, n) {
              return (
                e.addEventListener(t, n, !1),
                function() {
                  e.removeEventListener(t, n, !1);
                }
              );
            }),
            (t.prototype.dispatchEvent = function(e, t) {
              e.dispatchEvent(t);
            }),
            (t.prototype.createMouseEvent = function(e) {
              var t = this.getDefaultDocument().createEvent('MouseEvent');
              return t.initEvent(e, !0, !0), t;
            }),
            (t.prototype.createEvent = function(e) {
              var t = this.getDefaultDocument().createEvent('Event');
              return t.initEvent(e, !0, !0), t;
            }),
            (t.prototype.preventDefault = function(e) {
              e.preventDefault(), (e.returnValue = !1);
            }),
            (t.prototype.isPrevented = function(e) {
              return e.defaultPrevented || (null != e.returnValue && !e.returnValue);
            }),
            (t.prototype.getInnerHTML = function(e) {
              return e.innerHTML;
            }),
            (t.prototype.getTemplateContent = function(e) {
              return 'content' in e && this.isTemplateElement(e) ? e.content : null;
            }),
            (t.prototype.getOuterHTML = function(e) {
              return e.outerHTML;
            }),
            (t.prototype.nodeName = function(e) {
              return e.nodeName;
            }),
            (t.prototype.nodeValue = function(e) {
              return e.nodeValue;
            }),
            (t.prototype.type = function(e) {
              return e.type;
            }),
            (t.prototype.content = function(e) {
              return this.hasProperty(e, 'content') ? e.content : e;
            }),
            (t.prototype.firstChild = function(e) {
              return e.firstChild;
            }),
            (t.prototype.nextSibling = function(e) {
              return e.nextSibling;
            }),
            (t.prototype.parentElement = function(e) {
              return e.parentNode;
            }),
            (t.prototype.childNodes = function(e) {
              return e.childNodes;
            }),
            (t.prototype.childNodesAsList = function(e) {
              for (var t = e.childNodes, n = new Array(t.length), r = 0; r < t.length; r++) n[r] = t[r];
              return n;
            }),
            (t.prototype.clearNodes = function(e) {
              for (; e.firstChild; ) e.removeChild(e.firstChild);
            }),
            (t.prototype.appendChild = function(e, t) {
              e.appendChild(t);
            }),
            (t.prototype.removeChild = function(e, t) {
              e.removeChild(t);
            }),
            (t.prototype.replaceChild = function(e, t, n) {
              e.replaceChild(t, n);
            }),
            (t.prototype.remove = function(e) {
              return e.parentNode && e.parentNode.removeChild(e), e;
            }),
            (t.prototype.insertBefore = function(e, t, n) {
              e.insertBefore(n, t);
            }),
            (t.prototype.insertAllBefore = function(e, t, n) {
              n.forEach(function(n) {
                return e.insertBefore(n, t);
              });
            }),
            (t.prototype.insertAfter = function(e, t, n) {
              e.insertBefore(n, t.nextSibling);
            }),
            (t.prototype.setInnerHTML = function(e, t) {
              e.innerHTML = t;
            }),
            (t.prototype.getText = function(e) {
              return e.textContent;
            }),
            (t.prototype.setText = function(e, t) {
              e.textContent = t;
            }),
            (t.prototype.getValue = function(e) {
              return e.value;
            }),
            (t.prototype.setValue = function(e, t) {
              e.value = t;
            }),
            (t.prototype.getChecked = function(e) {
              return e.checked;
            }),
            (t.prototype.setChecked = function(e, t) {
              e.checked = t;
            }),
            (t.prototype.createComment = function(e) {
              return this.getDefaultDocument().createComment(e);
            }),
            (t.prototype.createTemplate = function(e) {
              var t = this.getDefaultDocument().createElement('template');
              return (t.innerHTML = e), t;
            }),
            (t.prototype.createElement = function(e, t) {
              return (t = t || this.getDefaultDocument()).createElement(e);
            }),
            (t.prototype.createElementNS = function(e, t, n) {
              return (n = n || this.getDefaultDocument()).createElementNS(e, t);
            }),
            (t.prototype.createTextNode = function(e, t) {
              return (t = t || this.getDefaultDocument()).createTextNode(e);
            }),
            (t.prototype.createScriptTag = function(e, t, n) {
              var r = (n = n || this.getDefaultDocument()).createElement('SCRIPT');
              return r.setAttribute(e, t), r;
            }),
            (t.prototype.createStyleElement = function(e, t) {
              var n = (t = t || this.getDefaultDocument()).createElement('style');
              return this.appendChild(n, this.createTextNode(e, t)), n;
            }),
            (t.prototype.createShadowRoot = function(e) {
              return e.createShadowRoot();
            }),
            (t.prototype.getShadowRoot = function(e) {
              return e.shadowRoot;
            }),
            (t.prototype.getHost = function(e) {
              return e.host;
            }),
            (t.prototype.clone = function(e) {
              return e.cloneNode(!0);
            }),
            (t.prototype.getElementsByClassName = function(e, t) {
              return e.getElementsByClassName(t);
            }),
            (t.prototype.getElementsByTagName = function(e, t) {
              return e.getElementsByTagName(t);
            }),
            (t.prototype.classList = function(e) {
              return Array.prototype.slice.call(e.classList, 0);
            }),
            (t.prototype.addClass = function(e, t) {
              e.classList.add(t);
            }),
            (t.prototype.removeClass = function(e, t) {
              e.classList.remove(t);
            }),
            (t.prototype.hasClass = function(e, t) {
              return e.classList.contains(t);
            }),
            (t.prototype.setStyle = function(e, t, n) {
              e.style[t] = n;
            }),
            (t.prototype.removeStyle = function(e, t) {
              e.style[t] = '';
            }),
            (t.prototype.getStyle = function(e, t) {
              return e.style[t];
            }),
            (t.prototype.hasStyle = function(e, t, n) {
              var r = this.getStyle(e, t) || '';
              return n ? r == n : r.length > 0;
            }),
            (t.prototype.tagName = function(e) {
              return e.tagName;
            }),
            (t.prototype.attributeMap = function(e) {
              for (var t = new Map(), n = e.attributes, r = 0; r < n.length; r++) {
                var o = n.item(r);
                t.set(o.name, o.value);
              }
              return t;
            }),
            (t.prototype.hasAttribute = function(e, t) {
              return e.hasAttribute(t);
            }),
            (t.prototype.hasAttributeNS = function(e, t, n) {
              return e.hasAttributeNS(t, n);
            }),
            (t.prototype.getAttribute = function(e, t) {
              return e.getAttribute(t);
            }),
            (t.prototype.getAttributeNS = function(e, t, n) {
              return e.getAttributeNS(t, n);
            }),
            (t.prototype.setAttribute = function(e, t, n) {
              e.setAttribute(t, n);
            }),
            (t.prototype.setAttributeNS = function(e, t, n, r) {
              e.setAttributeNS(t, n, r);
            }),
            (t.prototype.removeAttribute = function(e, t) {
              e.removeAttribute(t);
            }),
            (t.prototype.removeAttributeNS = function(e, t, n) {
              e.removeAttributeNS(t, n);
            }),
            (t.prototype.templateAwareRoot = function(e) {
              return this.isTemplateElement(e) ? this.content(e) : e;
            }),
            (t.prototype.createHtmlDocument = function() {
              return document.implementation.createHTMLDocument('fakeTitle');
            }),
            (t.prototype.getDefaultDocument = function() {
              return document;
            }),
            (t.prototype.getBoundingClientRect = function(e) {
              try {
                return e.getBoundingClientRect();
              } catch (t) {
                return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
              }
            }),
            (t.prototype.getTitle = function(e) {
              return e.title;
            }),
            (t.prototype.setTitle = function(e, t) {
              e.title = t || '';
            }),
            (t.prototype.elementMatches = function(e, t) {
              return (
                !!this.isElementNode(e) &&
                ((e.matches && e.matches(t)) ||
                  (e.msMatchesSelector && e.msMatchesSelector(t)) ||
                  (e.webkitMatchesSelector && e.webkitMatchesSelector(t)))
              );
            }),
            (t.prototype.isTemplateElement = function(e) {
              return this.isElementNode(e) && 'TEMPLATE' === e.nodeName;
            }),
            (t.prototype.isTextNode = function(e) {
              return e.nodeType === Node.TEXT_NODE;
            }),
            (t.prototype.isCommentNode = function(e) {
              return e.nodeType === Node.COMMENT_NODE;
            }),
            (t.prototype.isElementNode = function(e) {
              return e.nodeType === Node.ELEMENT_NODE;
            }),
            (t.prototype.hasShadowRoot = function(e) {
              return null != e.shadowRoot && e instanceof HTMLElement;
            }),
            (t.prototype.isShadowRoot = function(e) {
              return e instanceof DocumentFragment;
            }),
            (t.prototype.importIntoDoc = function(e) {
              return document.importNode(this.templateAwareRoot(e), !0);
            }),
            (t.prototype.adoptNode = function(e) {
              return document.adoptNode(e);
            }),
            (t.prototype.getHref = function(e) {
              return e.getAttribute('href');
            }),
            (t.prototype.getEventKey = function(e) {
              var t = e.key;
              if (null == t) {
                if (null == (t = e.keyIdentifier)) return 'Unidentified';
                t.startsWith('U+') &&
                  ((t = String.fromCharCode(parseInt(t.substring(2), 16))), 3 === e.location && jl.hasOwnProperty(t) && (t = jl[t]));
              }
              return Ml[t] || t;
            }),
            (t.prototype.getGlobalEventTarget = function(e, t) {
              return 'window' === t ? window : 'document' === t ? e : 'body' === t ? e.body : null;
            }),
            (t.prototype.getHistory = function() {
              return window.history;
            }),
            (t.prototype.getLocation = function() {
              return window.location;
            }),
            (t.prototype.getBaseHref = function(e) {
              var t,
                n = Hl || (Hl = document.querySelector('base')) ? Hl.getAttribute('href') : null;
              return null == n
                ? null
                : ((t = n),
                  Vl || (Vl = document.createElement('a')),
                  Vl.setAttribute('href', t),
                  '/' === Vl.pathname.charAt(0) ? Vl.pathname : '/' + Vl.pathname);
            }),
            (t.prototype.resetBaseElement = function() {
              Hl = null;
            }),
            (t.prototype.getUserAgent = function() {
              return window.navigator.userAgent;
            }),
            (t.prototype.setData = function(e, t, n) {
              this.setAttribute(e, 'data-' + t, n);
            }),
            (t.prototype.getData = function(e, t) {
              return this.getAttribute(e, 'data-' + t);
            }),
            (t.prototype.getComputedStyle = function(e) {
              return getComputedStyle(e);
            }),
            (t.prototype.supportsWebAnimation = function() {
              return 'function' == typeof Element.prototype.animate;
            }),
            (t.prototype.performanceNow = function() {
              return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
            }),
            (t.prototype.supportsCookies = function() {
              return !0;
            }),
            (t.prototype.getCookie = function(e) {
              return (function(e, t) {
                var n, r;
                t = encodeURIComponent(t);
                try {
                  for (var o = u(e.split(';')), i = o.next(); !i.done; i = o.next()) {
                    var s = i.value,
                      a = s.indexOf('='),
                      l = c(-1 == a ? [s, ''] : [s.slice(0, a), s.slice(a + 1)], 2),
                      p = l[1];
                    if (l[0].trim() === t) return decodeURIComponent(p);
                  }
                } catch (f) {
                  n = { error: f };
                } finally {
                  try {
                    i && !i.done && (r = o.return) && r.call(o);
                  } finally {
                    if (n) throw n.error;
                  }
                }
                return null;
              })(document.cookie, e);
            }),
            (t.prototype.setCookie = function(e, t) {
              document.cookie = encodeURIComponent(e) + '=' + encodeURIComponent(t);
            }),
            t
          );
        })(
          (function(e) {
            function t() {
              var t = e.call(this) || this;
              (t._animationPrefix = null), (t._transitionEnd = null);
              try {
                var n = t.createElement('div', document);
                if (null != t.getStyle(n, 'animationName')) t._animationPrefix = '';
                else
                  for (var r = ['Webkit', 'Moz', 'O', 'ms'], o = 0; o < r.length; o++)
                    if (null != t.getStyle(n, r[o] + 'AnimationName')) {
                      t._animationPrefix = '-' + r[o].toLowerCase() + '-';
                      break;
                    }
                var i = {
                  WebkitTransition: 'webkitTransitionEnd',
                  MozTransition: 'transitionend',
                  OTransition: 'oTransitionEnd otransitionend',
                  transition: 'transitionend'
                };
                Object.keys(i).forEach(function(e) {
                  null != t.getStyle(n, e) && (t._transitionEnd = i[e]);
                });
              } catch (s) {
                (t._animationPrefix = null), (t._transitionEnd = null);
              }
              return t;
            }
            return (
              o(t, e),
              (t.prototype.getDistributedNodes = function(e) {
                return e.getDistributedNodes();
              }),
              (t.prototype.resolveAndSetHref = function(e, t, n) {
                e.href = null == n ? t : t + '/../' + n;
              }),
              (t.prototype.supportsDOMEvents = function() {
                return !0;
              }),
              (t.prototype.supportsNativeShadowDOM = function() {
                return 'function' == typeof document.body.createShadowRoot;
              }),
              (t.prototype.getAnimationPrefix = function() {
                return this._animationPrefix ? this._animationPrefix : '';
              }),
              (t.prototype.getTransitionEnd = function() {
                return this._transitionEnd ? this._transitionEnd : '';
              }),
              (t.prototype.supportsAnimation = function() {
                return null != this._animationPrefix && null != this._transitionEnd;
              }),
              t
            );
          })(
            (function() {
              function e() {
                this.resourceLoaderType = null;
              }
              return (
                Object.defineProperty(e.prototype, 'attrToPropMap', {
                  get: function() {
                    return this._attrToPropMap;
                  },
                  set: function(e) {
                    this._attrToPropMap = e;
                  },
                  enumerable: !0,
                  configurable: !0
                }),
                e
              );
            })()
          )
        ),
        Hl = null,
        Ll = ol;
      function Ul() {
        return !!window.history.pushState;
      }
      var zl = (function(e) {
          function t(t) {
            var n = e.call(this) || this;
            return (n._doc = t), n._init(), n;
          }
          var n;
          return (
            o(t, e),
            (t.prototype._init = function() {
              (this.location = Dl().getLocation()), (this._history = Dl().getHistory());
            }),
            (t.prototype.getBaseHrefFromDOM = function() {
              return Dl().getBaseHref(this._doc);
            }),
            (t.prototype.onPopState = function(e) {
              Dl()
                .getGlobalEventTarget(this._doc, 'window')
                .addEventListener('popstate', e, !1);
            }),
            (t.prototype.onHashChange = function(e) {
              Dl()
                .getGlobalEventTarget(this._doc, 'window')
                .addEventListener('hashchange', e, !1);
            }),
            Object.defineProperty(t.prototype, 'pathname', {
              get: function() {
                return this.location.pathname;
              },
              set: function(e) {
                this.location.pathname = e;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'search', {
              get: function() {
                return this.location.search;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'hash', {
              get: function() {
                return this.location.hash;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.pushState = function(e, t, n) {
              Ul() ? this._history.pushState(e, t, n) : (this.location.hash = n);
            }),
            (t.prototype.replaceState = function(e, t, n) {
              Ul() ? this._history.replaceState(e, t, n) : (this.location.hash = n);
            }),
            (t.prototype.forward = function() {
              this._history.forward();
            }),
            (t.prototype.back = function() {
              this._history.back();
            }),
            s(
              [
                ((n = Le(Ll)),
                function(e, t) {
                  n(e, t, 0);
                }),
                a('design:paramtypes', [Object])
              ],
              t
            )
          );
        })(Bc),
        ql = new Se('TRANSITION_ID'),
        Wl = [
          {
            provide: ii,
            useFactory: function(e, t, n) {
              return function() {
                n.get(si).donePromise.then(function() {
                  var n = Dl();
                  Array.prototype.slice
                    .apply(n.querySelectorAll(t, 'style[ng-transition]'))
                    .filter(function(t) {
                      return n.getAttribute(t, 'ng-transition') === e;
                    })
                    .forEach(function(e) {
                      return n.remove(e);
                    });
                });
              };
            },
            deps: [ql, Ll, Bn],
            multi: !0
          }
        ],
        Zl = (function() {
          function e() {}
          return (
            (e.init = function() {
              var t;
              (t = new e()), (Ri = t);
            }),
            (e.prototype.addToWindow = function(e) {
              (De.getAngularTestability = function(t, n) {
                void 0 === n && (n = !0);
                var r = e.findTestabilityInTree(t, n);
                if (null == r) throw new Error('Could not find testability for element.');
                return r;
              }),
                (De.getAllAngularTestabilities = function() {
                  return e.getAllTestabilities();
                }),
                (De.getAllAngularRootElements = function() {
                  return e.getAllRootElements();
                }),
                De.frameworkStabilizers || (De.frameworkStabilizers = []),
                De.frameworkStabilizers.push(function(e) {
                  var t = De.getAllAngularTestabilities(),
                    n = t.length,
                    r = !1,
                    o = function(t) {
                      (r = r || t), 0 == --n && e(r);
                    };
                  t.forEach(function(e) {
                    e.whenStable(o);
                  });
                });
            }),
            (e.prototype.findTestabilityInTree = function(e, t, n) {
              if (null == t) return null;
              var r = e.getTestability(t);
              return null != r
                ? r
                : n
                ? Dl().isShadowRoot(t)
                  ? this.findTestabilityInTree(e, Dl().getHost(t), !0)
                  : this.findTestabilityInTree(e, Dl().parentElement(t), !0)
                : null;
            }),
            e
          );
        })();
      function Kl(e, t) {
        ('undefined' != typeof COMPILED && COMPILED) || ((De.ng = De.ng || {})[e] = t);
      }
      var Ql = { ApplicationRef: Li, NgZone: ki };
      function Gl(e) {
        return Xi(e);
      }
      var Jl = new Se('EventManagerPlugins'),
        Yl = (function() {
          function e(e, t) {
            var n = this;
            (this._zone = t),
              (this._eventNameToPlugin = new Map()),
              e.forEach(function(e) {
                return (e.manager = n);
              }),
              (this._plugins = e.slice().reverse());
          }
          return (
            (e.prototype.addEventListener = function(e, t, n) {
              return this._findPluginFor(t).addEventListener(e, t, n);
            }),
            (e.prototype.addGlobalEventListener = function(e, t, n) {
              return this._findPluginFor(t).addGlobalEventListener(e, t, n);
            }),
            (e.prototype.getZone = function() {
              return this._zone;
            }),
            (e.prototype._findPluginFor = function(e) {
              var t = this._eventNameToPlugin.get(e);
              if (t) return t;
              for (var n = this._plugins, r = 0; r < n.length; r++) {
                var o = n[r];
                if (o.supports(e)) return this._eventNameToPlugin.set(e, o), o;
              }
              throw new Error('No event manager plugin found for event ' + e);
            }),
            e
          );
        })(),
        $l = (function() {
          function e(e) {
            this._doc = e;
          }
          return (
            (e.prototype.addGlobalEventListener = function(e, t, n) {
              var r = Dl().getGlobalEventTarget(this._doc, e);
              if (!r) throw new Error('Unsupported event target ' + r + ' for event ' + t);
              return this.addEventListener(r, t, n);
            }),
            e
          );
        })(),
        Xl = (function() {
          function e() {
            this._stylesSet = new Set();
          }
          return (
            (e.prototype.addStyles = function(e) {
              var t = this,
                n = new Set();
              e.forEach(function(e) {
                t._stylesSet.has(e) || (t._stylesSet.add(e), n.add(e));
              }),
                this.onStylesAdded(n);
            }),
            (e.prototype.onStylesAdded = function(e) {}),
            (e.prototype.getAllStyles = function() {
              return Array.from(this._stylesSet);
            }),
            e
          );
        })(),
        ep = (function(e) {
          function t(t) {
            var n = e.call(this) || this;
            return (n._doc = t), (n._hostNodes = new Set()), (n._styleNodes = new Set()), n._hostNodes.add(t.head), n;
          }
          return (
            o(t, e),
            (t.prototype._addStylesToHost = function(e, t) {
              var n = this;
              e.forEach(function(e) {
                var r = n._doc.createElement('style');
                (r.textContent = e), n._styleNodes.add(t.appendChild(r));
              });
            }),
            (t.prototype.addHost = function(e) {
              this._addStylesToHost(this._stylesSet, e), this._hostNodes.add(e);
            }),
            (t.prototype.removeHost = function(e) {
              this._hostNodes.delete(e);
            }),
            (t.prototype.onStylesAdded = function(e) {
              var t = this;
              this._hostNodes.forEach(function(n) {
                return t._addStylesToHost(e, n);
              });
            }),
            (t.prototype.ngOnDestroy = function() {
              this._styleNodes.forEach(function(e) {
                return Dl().remove(e);
              });
            }),
            t
          );
        })(Xl),
        tp = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/'
        },
        np = /%COMP%/g,
        rp = '_nghost-%COMP%',
        op = '_ngcontent-%COMP%';
      function ip(e, t, n) {
        for (var r = 0; r < t.length; r++) {
          var o = t[r];
          Array.isArray(o) ? ip(e, o, n) : ((o = o.replace(np, e)), n.push(o));
        }
        return n;
      }
      function sp(e) {
        return function(t) {
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      var ap = (function() {
          function e(e, t) {
            (this.eventManager = e), (this.sharedStylesHost = t), (this.rendererByCompId = new Map()), (this.defaultRenderer = new up(e));
          }
          return (
            (e.prototype.createRenderer = function(e, t) {
              if (!e || !t) return this.defaultRenderer;
              switch (t.encapsulation) {
                case Ne.Emulated:
                  var n = this.rendererByCompId.get(t.id);
                  return (
                    n || ((n = new fp(this.eventManager, this.sharedStylesHost, t)), this.rendererByCompId.set(t.id, n)),
                    n.applyToHost(e),
                    n
                  );
                case Ne.Native:
                case Ne.ShadowDom:
                  return new dp(this.eventManager, this.sharedStylesHost, e, t);
                default:
                  if (!this.rendererByCompId.has(t.id)) {
                    var r = ip(t.id, t.styles, []);
                    this.sharedStylesHost.addStyles(r), this.rendererByCompId.set(t.id, this.defaultRenderer);
                  }
                  return this.defaultRenderer;
              }
            }),
            (e.prototype.begin = function() {}),
            (e.prototype.end = function() {}),
            e
          );
        })(),
        up = (function() {
          function e(e) {
            (this.eventManager = e), (this.data = Object.create(null));
          }
          return (
            (e.prototype.destroy = function() {}),
            (e.prototype.createElement = function(e, t) {
              return t ? document.createElementNS(tp[t], e) : document.createElement(e);
            }),
            (e.prototype.createComment = function(e) {
              return document.createComment(e);
            }),
            (e.prototype.createText = function(e) {
              return document.createTextNode(e);
            }),
            (e.prototype.appendChild = function(e, t) {
              e.appendChild(t);
            }),
            (e.prototype.insertBefore = function(e, t, n) {
              e && e.insertBefore(t, n);
            }),
            (e.prototype.removeChild = function(e, t) {
              e && e.removeChild(t);
            }),
            (e.prototype.selectRootElement = function(e, t) {
              var n = 'string' == typeof e ? document.querySelector(e) : e;
              if (!n) throw new Error('The selector "' + e + '" did not match any elements');
              return t || (n.textContent = ''), n;
            }),
            (e.prototype.parentNode = function(e) {
              return e.parentNode;
            }),
            (e.prototype.nextSibling = function(e) {
              return e.nextSibling;
            }),
            (e.prototype.setAttribute = function(e, t, n, r) {
              if (r) {
                t = r + ':' + t;
                var o = tp[r];
                o ? e.setAttributeNS(o, t, n) : e.setAttribute(t, n);
              } else e.setAttribute(t, n);
            }),
            (e.prototype.removeAttribute = function(e, t, n) {
              if (n) {
                var r = tp[n];
                r ? e.removeAttributeNS(r, t) : e.removeAttribute(n + ':' + t);
              } else e.removeAttribute(t);
            }),
            (e.prototype.addClass = function(e, t) {
              e.classList.add(t);
            }),
            (e.prototype.removeClass = function(e, t) {
              e.classList.remove(t);
            }),
            (e.prototype.setStyle = function(e, t, n, r) {
              r & io.DashCase ? e.style.setProperty(t, n, r & io.Important ? 'important' : '') : (e.style[t] = n);
            }),
            (e.prototype.removeStyle = function(e, t, n) {
              n & io.DashCase ? e.style.removeProperty(t) : (e.style[t] = '');
            }),
            (e.prototype.setProperty = function(e, t, n) {
              lp(t, 'property'), (e[t] = n);
            }),
            (e.prototype.setValue = function(e, t) {
              e.nodeValue = t;
            }),
            (e.prototype.listen = function(e, t, n) {
              return (
                lp(t, 'listener'),
                'string' == typeof e
                  ? this.eventManager.addGlobalEventListener(e, t, sp(n))
                  : this.eventManager.addEventListener(e, t, sp(n))
              );
            }),
            e
          );
        })(),
        cp = '@'.charCodeAt(0);
      function lp(e, t) {
        if (e.charCodeAt(0) === cp)
          throw new Error(
            'Found the synthetic ' +
              t +
              ' ' +
              e +
              '. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.'
          );
      }
      var pp,
        fp = (function(e) {
          function t(t, n, r) {
            var o = e.call(this, t) || this;
            o.component = r;
            var i = ip(r.id, r.styles, []);
            return n.addStyles(i), (o.contentAttr = op.replace(np, r.id)), (o.hostAttr = rp.replace(np, r.id)), o;
          }
          return (
            o(t, e),
            (t.prototype.applyToHost = function(t) {
              e.prototype.setAttribute.call(this, t, this.hostAttr, '');
            }),
            (t.prototype.createElement = function(t, n) {
              var r = e.prototype.createElement.call(this, t, n);
              return e.prototype.setAttribute.call(this, r, this.contentAttr, ''), r;
            }),
            t
          );
        })(up),
        dp = (function(e) {
          function t(t, n, r, o) {
            var i = e.call(this, t) || this;
            (i.sharedStylesHost = n),
              (i.hostEl = r),
              (i.component = o),
              (i.shadowRoot = o.encapsulation === Ne.ShadowDom ? r.attachShadow({ mode: 'open' }) : r.createShadowRoot()),
              i.sharedStylesHost.addHost(i.shadowRoot);
            for (var s = ip(o.id, o.styles, []), a = 0; a < s.length; a++) {
              var u = document.createElement('style');
              (u.textContent = s[a]), i.shadowRoot.appendChild(u);
            }
            return i;
          }
          return (
            o(t, e),
            (t.prototype.nodeOrShadowRoot = function(e) {
              return e === this.hostEl ? this.shadowRoot : e;
            }),
            (t.prototype.destroy = function() {
              this.sharedStylesHost.removeHost(this.shadowRoot);
            }),
            (t.prototype.appendChild = function(t, n) {
              return e.prototype.appendChild.call(this, this.nodeOrShadowRoot(t), n);
            }),
            (t.prototype.insertBefore = function(t, n, r) {
              return e.prototype.insertBefore.call(this, this.nodeOrShadowRoot(t), n, r);
            }),
            (t.prototype.removeChild = function(t, n) {
              return e.prototype.removeChild.call(this, this.nodeOrShadowRoot(t), n);
            }),
            (t.prototype.parentNode = function(t) {
              return this.nodeOrShadowRoot(e.prototype.parentNode.call(this, this.nodeOrShadowRoot(t)));
            }),
            t
          );
        })(up),
        hp =
          ('undefined' != typeof Zone && Zone.__symbol__) ||
          function(e) {
            return '__zone_symbol__' + e;
          },
        yp = hp('addEventListener'),
        vp = hp('removeEventListener'),
        gp = {},
        mp = '__zone_symbol__propagationStopped';
      'undefined' != typeof Zone && Zone[hp('BLACK_LISTED_EVENTS')] && (pp = {});
      var bp = function(e) {
          return !!pp && pp.hasOwnProperty(e);
        },
        wp = function(e) {
          var t = gp[e.type];
          if (t) {
            var n = this[t];
            if (n) {
              var r = [e];
              if (1 === n.length) return (s = n[0]).zone !== Zone.current ? s.zone.run(s.handler, this, r) : s.handler.apply(this, r);
              for (var o = n.slice(), i = 0; i < o.length && !0 !== e[mp]; i++) {
                var s;
                (s = o[i]).zone !== Zone.current ? s.zone.run(s.handler, this, r) : s.handler.apply(this, r);
              }
            }
          }
        },
        _p = (function(e) {
          function t(t, n, r) {
            var o = e.call(this, t) || this;
            return (
              (o.ngZone = n),
              (r &&
                (function(e) {
                  return e === sl;
                })(r)) ||
                o.patchEvent(),
              o
            );
          }
          return (
            o(t, e),
            (t.prototype.patchEvent = function() {
              if ('undefined' != typeof Event && Event && Event.prototype && !Event.prototype.__zone_symbol__stopImmediatePropagation) {
                var e = (Event.prototype.__zone_symbol__stopImmediatePropagation = Event.prototype.stopImmediatePropagation);
                Event.prototype.stopImmediatePropagation = function() {
                  this && (this[mp] = !0), e && e.apply(this, arguments);
                };
              }
            }),
            (t.prototype.supports = function(e) {
              return !0;
            }),
            (t.prototype.addEventListener = function(e, t, n) {
              var r = this,
                o = n;
              if (!e[yp] || (ki.isInAngularZone() && !bp(t))) e.addEventListener(t, o, !1);
              else {
                var i = gp[t];
                i || (i = gp[t] = hp('ANGULAR' + t + 'FALSE'));
                var s = e[i],
                  a = s && s.length > 0;
                s || (s = e[i] = []);
                var u = bp(t) ? Zone.root : Zone.current;
                if (0 === s.length) s.push({ zone: u, handler: o });
                else {
                  for (var c = !1, l = 0; l < s.length; l++)
                    if (s[l].handler === o) {
                      c = !0;
                      break;
                    }
                  c || s.push({ zone: u, handler: o });
                }
                a || e[yp](t, wp, !1);
              }
              return function() {
                return r.removeEventListener(e, t, o);
              };
            }),
            (t.prototype.removeEventListener = function(e, t, n) {
              var r = e[vp];
              if (!r) return e.removeEventListener.apply(e, [t, n, !1]);
              var o = gp[t],
                i = o && e[o];
              if (!i) return e.removeEventListener.apply(e, [t, n, !1]);
              for (var s = !1, a = 0; a < i.length; a++)
                if (i[a].handler === n) {
                  (s = !0), i.splice(a, 1);
                  break;
                }
              s ? 0 === i.length && r.apply(e, [t, wp, !1]) : e.removeEventListener.apply(e, [t, n, !1]);
            }),
            t
          );
        })($l),
        Cp = {
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
        },
        xp = new Se('HammerGestureConfig'),
        kp = new Se('HammerLoader'),
        Ep = (function() {
          function e() {
            (this.events = []), (this.overrides = {});
          }
          return (
            (e.prototype.buildHammer = function(e) {
              var t = new Hammer(e, this.options);
              for (var n in (t.get('pinch').set({ enable: !0 }), t.get('rotate').set({ enable: !0 }), this.overrides))
                t.get(n).set(this.overrides[n]);
              return t;
            }),
            e
          );
        })(),
        Tp = (function(e) {
          function t(t, n, r, o) {
            var i = e.call(this, t) || this;
            return (i._config = n), (i.console = r), (i.loader = o), i;
          }
          return (
            o(t, e),
            (t.prototype.supports = function(e) {
              return !(
                (!Cp.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e)) ||
                (!window.Hammer &&
                  !this.loader &&
                  (this.console.warn(
                    'The "' + e + '" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.'
                  ),
                  1))
              );
            }),
            (t.prototype.addEventListener = function(e, t, n) {
              var r = this,
                o = this.manager.getZone();
              if (((t = t.toLowerCase()), !window.Hammer && this.loader)) {
                var i = !1,
                  s = function() {
                    i = !0;
                  };
                return (
                  this.loader()
                    .then(function() {
                      if (!window.Hammer)
                        return (
                          r.console.warn('The custom HAMMER_LOADER completed, but Hammer.JS is not present.'), void (s = function() {})
                        );
                      i || (s = r.addEventListener(e, t, n));
                    })
                    .catch(function() {
                      r.console.warn('The "' + t + '" event cannot be bound because the custom Hammer.JS loader failed.'),
                        (s = function() {});
                    }),
                  function() {
                    s();
                  }
                );
              }
              return o.runOutsideAngular(function() {
                var i = r._config.buildHammer(e),
                  s = function(e) {
                    o.runGuarded(function() {
                      n(e);
                    });
                  };
                return (
                  i.on(t, s),
                  function() {
                    i.off(t, s), 'function' == typeof i.destroy && i.destroy();
                  }
                );
              });
            }),
            (t.prototype.isCustomEvent = function(e) {
              return this._config.events.indexOf(e) > -1;
            }),
            t
          );
        })($l),
        Sp = ['alt', 'control', 'meta', 'shift'],
        Ap = {
          alt: function(e) {
            return e.altKey;
          },
          control: function(e) {
            return e.ctrlKey;
          },
          meta: function(e) {
            return e.metaKey;
          },
          shift: function(e) {
            return e.shiftKey;
          }
        },
        Ip = (function(e) {
          function t(t) {
            return e.call(this, t) || this;
          }
          var n;
          return (
            o(t, e),
            (n = t),
            (t.prototype.supports = function(e) {
              return null != n.parseEventName(e);
            }),
            (t.prototype.addEventListener = function(e, t, r) {
              var o = n.parseEventName(t),
                i = n.eventCallback(o.fullKey, r, this.manager.getZone());
              return this.manager.getZone().runOutsideAngular(function() {
                return Dl().onAndCancel(e, o.domEventName, i);
              });
            }),
            (t.parseEventName = function(e) {
              var t = e.toLowerCase().split('.'),
                r = t.shift();
              if (0 === t.length || ('keydown' !== r && 'keyup' !== r)) return null;
              var o = n._normalizeKey(t.pop()),
                i = '';
              if (
                (Sp.forEach(function(e) {
                  var n = t.indexOf(e);
                  n > -1 && (t.splice(n, 1), (i += e + '.'));
                }),
                (i += o),
                0 != t.length || 0 === o.length)
              )
                return null;
              var s = {};
              return (s.domEventName = r), (s.fullKey = i), s;
            }),
            (t.getEventFullKey = function(e) {
              var t = '',
                n = Dl().getEventKey(e);
              return (
                ' ' === (n = n.toLowerCase()) ? (n = 'space') : '.' === n && (n = 'dot'),
                Sp.forEach(function(r) {
                  r != n && (0, Ap[r])(e) && (t += r + '.');
                }),
                (t += n)
              );
            }),
            (t.eventCallback = function(e, t, r) {
              return function(o) {
                n.getEventFullKey(o) === e &&
                  r.runGuarded(function() {
                    return t(o);
                  });
              };
            }),
            (t._normalizeKey = function(e) {
              switch (e) {
                case 'esc':
                  return 'escape';
                default:
                  return e;
              }
            }),
            t
          );
        })($l),
        Np = (function() {
          return function() {};
        })(),
        Op = (function(e) {
          function t(t) {
            var n = e.call(this) || this;
            return (n._doc = t), n;
          }
          return (
            o(t, e),
            (t.prototype.sanitize = function(e, t) {
              if (null == t) return null;
              switch (e) {
                case Zo.NONE:
                  return t;
                case Zo.HTML:
                  return t instanceof Dp
                    ? t.changingThisBreaksApplicationSecurity
                    : (this.checkNotSafeValue(t, 'HTML'),
                      (function(e, t) {
                        var n = null;
                        try {
                          So = So || new _o(e);
                          var r = t ? String(t) : '';
                          n = So.getInertBodyElement(r);
                          var o = 5,
                            i = r;
                          do {
                            if (0 === o) throw new Error('Failed to sanitize html because the input is unstable');
                            o--, (r = i), (i = n.innerHTML), (n = So.getInertBodyElement(r));
                          } while (r !== i);
                          var s = new Mo(),
                            a = s.sanitizeChildren(Ho(n) || n);
                          return (
                            wo() &&
                              s.sanitizedSomething &&
                              console.warn('WARNING: sanitizing HTML stripped some content (see http://g.co/ng/security#xss).'),
                            a
                          );
                        } finally {
                          if (n) for (var u = Ho(n) || n; u.firstChild; ) u.removeChild(u.firstChild);
                        }
                      })(this._doc, String(t)));
                case Zo.STYLE:
                  return t instanceof Rp
                    ? t.changingThisBreaksApplicationSecurity
                    : (this.checkNotSafeValue(t, 'Style'),
                      (function(e) {
                        if (!(e = String(e).trim())) return '';
                        var t = e.match(Go);
                        return (t && ko(t[1]) === t[1]) ||
                          (e.match(Qo) &&
                            (function(e) {
                              for (var t = !0, n = !0, r = 0; r < e.length; r++) {
                                var o = e.charAt(r);
                                "'" === o && n ? (t = !t) : '"' === o && t && (n = !n);
                              }
                              return t && n;
                            })(e))
                          ? e
                          : (wo() && console.warn('WARNING: sanitizing unsafe style value ' + e + ' (see http://g.co/ng/security#xss).'),
                            'unsafe');
                      })(t));
                case Zo.SCRIPT:
                  if (t instanceof Fp) return t.changingThisBreaksApplicationSecurity;
                  throw (this.checkNotSafeValue(t, 'Script'), new Error('unsafe value used in a script context'));
                case Zo.URL:
                  return t instanceof jp || t instanceof Mp
                    ? t.changingThisBreaksApplicationSecurity
                    : (this.checkNotSafeValue(t, 'URL'), ko(String(t)));
                case Zo.RESOURCE_URL:
                  if (t instanceof jp) return t.changingThisBreaksApplicationSecurity;
                  throw (this.checkNotSafeValue(t, 'ResourceURL'),
                  new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)'));
                default:
                  throw new Error('Unexpected SecurityContext ' + e + ' (see http://g.co/ng/security#xss)');
              }
            }),
            (t.prototype.checkNotSafeValue = function(e, t) {
              if (e instanceof Pp)
                throw new Error('Required a safe ' + t + ', got a ' + e.getTypeName() + ' (see http://g.co/ng/security#xss)');
            }),
            (t.prototype.bypassSecurityTrustHtml = function(e) {
              return new Dp(e);
            }),
            (t.prototype.bypassSecurityTrustStyle = function(e) {
              return new Rp(e);
            }),
            (t.prototype.bypassSecurityTrustScript = function(e) {
              return new Fp(e);
            }),
            (t.prototype.bypassSecurityTrustUrl = function(e) {
              return new Mp(e);
            }),
            (t.prototype.bypassSecurityTrustResourceUrl = function(e) {
              return new jp(e);
            }),
            t
          );
        })(Np),
        Pp = (function() {
          function e(e) {
            this.changingThisBreaksApplicationSecurity = e;
          }
          return (
            (e.prototype.toString = function() {
              return (
                'SafeValue must use [property]=binding: ' +
                this.changingThisBreaksApplicationSecurity +
                ' (see http://g.co/ng/security#xss)'
              );
            }),
            e
          );
        })(),
        Dp = (function(e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            o(t, e),
            (t.prototype.getTypeName = function() {
              return 'HTML';
            }),
            t
          );
        })(Pp),
        Rp = (function(e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            o(t, e),
            (t.prototype.getTypeName = function() {
              return 'Style';
            }),
            t
          );
        })(Pp),
        Fp = (function(e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            o(t, e),
            (t.prototype.getTypeName = function() {
              return 'Script';
            }),
            t
          );
        })(Pp),
        Mp = (function(e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            o(t, e),
            (t.prototype.getTypeName = function() {
              return 'URL';
            }),
            t
          );
        })(Pp),
        jp = (function(e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            o(t, e),
            (t.prototype.getTypeName = function() {
              return 'ResourceURL';
            }),
            t
          );
        })(Pp),
        Vp = ji(vs, 'browser', [
          { provide: pi, useValue: il },
          {
            provide: li,
            useValue: function() {
              Bl.makeCurrent(), Zl.init();
            },
            multi: !0
          },
          { provide: Bc, useClass: zl, deps: [Ll] },
          {
            provide: Ll,
            useFactory: function() {
              return document;
            },
            deps: []
          }
        ]);
      function Bp() {
        return new ni();
      }
      var Hp = (function() {
        function e(e) {
          if (e)
            throw new Error(
              'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.'
            );
        }
        var t;
        return (
          (t = e),
          (e.withServerTransition = function(e) {
            return { ngModule: t, providers: [{ provide: ai, useValue: e.appId }, { provide: ql, useExisting: ai }, Wl] };
          }),
          e
        );
      })();
      'undefined' != typeof window && window;
      var Lp = (function() {
          function e() {
            this._accessors = [];
          }
          return (
            (e.prototype.add = function(e, t) {
              this._accessors.push([e, t]);
            }),
            (e.prototype.remove = function(e) {
              for (var t = this._accessors.length - 1; t >= 0; --t)
                if (this._accessors[t][1] === e) return void this._accessors.splice(t, 1);
            }),
            (e.prototype.select = function(e) {
              var t = this;
              this._accessors.forEach(function(n) {
                t._isSameGroup(n, e) && n[1] !== e && n[1].fireUncheck(e.value);
              });
            }),
            (e.prototype._isSameGroup = function(e, t) {
              return !!e[0].control && e[0]._parent === t._control._parent && e[1].name === t.name;
            }),
            e
          );
        })(),
        Up = new Se('NgFormSelectorWarning'),
        zp = (function() {
          return function() {};
        })(),
        qp = (function() {
          function e() {}
          var t;
          return (
            (t = e),
            (e.withConfig = function(e) {
              return { ngModule: t, providers: [{ provide: Up, useValue: e.warnOnDeprecatedNgFormSelector }] };
            }),
            e
          );
        })();
      function Wp(e) {
        return new O(function(t) {
          var n;
          try {
            n = e();
          } catch (r) {
            return void t.error(r);
          }
          return (n ? ne(n) : ml()).subscribe(t);
        });
      }
      function Zp(e, t, n, r) {
        return (
          d(n) && ((r = n), (n = void 0)),
          r
            ? Zp(e, t, n).pipe(
                $(function(e) {
                  return p(e) ? r.apply(void 0, e) : r(e);
                })
              )
            : new O(function(r) {
                !(function e(t, n, r, o, i) {
                  var s;
                  if (
                    (function(e) {
                      return e && 'function' == typeof e.addEventListener && 'function' == typeof e.removeEventListener;
                    })(t)
                  ) {
                    var a = t;
                    t.addEventListener(n, r, i),
                      (s = function() {
                        return a.removeEventListener(n, r, i);
                      });
                  } else if (
                    (function(e) {
                      return e && 'function' == typeof e.on && 'function' == typeof e.off;
                    })(t)
                  ) {
                    var u = t;
                    t.on(n, r),
                      (s = function() {
                        return u.off(n, r);
                      });
                  } else if (
                    (function(e) {
                      return e && 'function' == typeof e.addListener && 'function' == typeof e.removeListener;
                    })(t)
                  ) {
                    var c = t;
                    t.addListener(n, r),
                      (s = function() {
                        return c.removeListener(n, r);
                      });
                  } else {
                    if (!t || !t.length) throw new TypeError('Invalid event target');
                    for (var l = 0, p = t.length; l < p; l++) e(t[l], n, r, o, i);
                  }
                  o.add(s);
                })(
                  e,
                  t,
                  function(e) {
                    r.next(arguments.length > 1 ? Array.prototype.slice.call(arguments) : e);
                  },
                  r,
                  n
                );
              })
        );
      }
      var Kp = new O(N);
      function Qp(e, t) {
        return function(n) {
          return n.lift(new Gp(e, t));
        };
      }
      var Gp = (function() {
          function e(e, t) {
            (this.predicate = e), (this.thisArg = t);
          }
          return (
            (e.prototype.call = function(e, t) {
              return t.subscribe(new Jp(e, this.predicate, this.thisArg));
            }),
            e
          );
        })(),
        Jp = (function(e) {
          function t(t, n, r) {
            var o = e.call(this, t) || this;
            return (o.predicate = n), (o.thisArg = r), (o.count = 0), o;
          }
          return (
            o(t, e),
            (t.prototype._next = function(e) {
              var t;
              try {
                t = this.predicate.call(this.thisArg, e, this.count++);
              } catch (n) {
                return void this.destination.error(n);
              }
              t && this.destination.next(e);
            }),
            t
          );
        })(S);
      function Yp(e, t) {
        return 'function' == typeof t
          ? function(n) {
              return n.pipe(
                Yp(function(n, r) {
                  return ne(e(n, r)).pipe(
                    $(function(e, o) {
                      return t(n, e, r, o);
                    })
                  );
                })
              );
            }
          : function(t) {
              return t.lift(new $p(e));
            };
      }
      var $p = (function() {
          function e(e) {
            this.project = e;
          }
          return (
            (e.prototype.call = function(e, t) {
              return t.subscribe(new Xp(e, this.project));
            }),
            e
          );
        })(),
        Xp = (function(e) {
          function t(t, n) {
            var r = e.call(this, t) || this;
            return (r.project = n), (r.index = 0), r;
          }
          return (
            o(t, e),
            (t.prototype._next = function(e) {
              var t,
                n = this.index++;
              try {
                t = this.project(e, n);
              } catch (r) {
                return void this.destination.error(r);
              }
              this._innerSub(t, e, n);
            }),
            (t.prototype._innerSub = function(e, t, n) {
              var r = this.innerSubscription;
              r && r.unsubscribe();
              var o = new H(this, void 0, void 0);
              this.destination.add(o), (this.innerSubscription = J(this, e, t, n, o));
            }),
            (t.prototype._complete = function() {
              var t = this.innerSubscription;
              (t && !t.closed) || e.prototype._complete.call(this), this.unsubscribe();
            }),
            (t.prototype._unsubscribe = function() {
              this.innerSubscription = null;
            }),
            (t.prototype.notifyComplete = function(t) {
              this.destination.remove(t), (this.innerSubscription = null), this.isStopped && e.prototype._complete.call(this);
            }),
            (t.prototype.notifyNext = function(e, t, n, r, o) {
              this.destination.next(t);
            }),
            t
          );
        })(Y);
      function ef() {
        return Error.call(this), (this.message = 'argument out of range'), (this.name = 'ArgumentOutOfRangeError'), this;
      }
      ef.prototype = Object.create(Error.prototype);
      var tf = ef;
      function nf(e) {
        return function(t) {
          return 0 === e ? ml() : t.lift(new rf(e));
        };
      }
      var rf = (function() {
          function e(e) {
            if (((this.total = e), this.total < 0)) throw new tf();
          }
          return (
            (e.prototype.call = function(e, t) {
              return t.subscribe(new of(e, this.total));
            }),
            e
          );
        })(),
        of = (function(e) {
          function t(t, n) {
            var r = e.call(this, t) || this;
            return (r.total = n), (r.count = 0), r;
          }
          return (
            o(t, e),
            (t.prototype._next = function(e) {
              var t = this.total,
                n = ++this.count;
              n <= t && (this.destination.next(e), n === t && (this.destination.complete(), this.unsubscribe()));
            }),
            t
          );
        })(S),
        sf = (function() {
          function e(e, t, n) {
            (this.nextOrObserver = e), (this.error = t), (this.complete = n);
          }
          return (
            (e.prototype.call = function(e, t) {
              return t.subscribe(new af(e, this.nextOrObserver, this.error, this.complete));
            }),
            e
          );
        })(),
        af = (function(e) {
          function t(t, n, r, o) {
            var i = e.call(this, t) || this;
            return (
              (i._tapNext = N),
              (i._tapError = N),
              (i._tapComplete = N),
              (i._tapError = r || N),
              (i._tapComplete = o || N),
              d(n)
                ? ((i._context = i), (i._tapNext = n))
                : n && ((i._context = n), (i._tapNext = n.next || N), (i._tapError = n.error || N), (i._tapComplete = n.complete || N)),
              i
            );
          }
          return (
            o(t, e),
            (t.prototype._next = function(e) {
              try {
                this._tapNext.call(this._context, e);
              } catch (t) {
                return void this.destination.error(t);
              }
              this.destination.next(e);
            }),
            (t.prototype._error = function(e) {
              try {
                this._tapError.call(this._context, e);
              } catch (e) {
                return void this.destination.error(e);
              }
              this.destination.error(e);
            }),
            (t.prototype._complete = function() {
              try {
                this._tapComplete.call(this._context);
              } catch (e) {
                return void this.destination.error(e);
              }
              return this.destination.complete();
            }),
            t
          );
        })(S),
        uf = 'Service workers are disabled or not supported by this browser',
        cf = (function() {
          function e(e) {
            if (((this.serviceWorker = e), e)) {
              var t = Zp(e, 'controllerchange').pipe(
                  $(function() {
                    return e.controller;
                  })
                ),
                n = wl(
                  Wp(function() {
                    return bl(e.controller);
                  }),
                  t
                );
              (this.worker = n.pipe(
                Qp(function(e) {
                  return !!e;
                })
              )),
                (this.registration = this.worker.pipe(
                  Yp(function() {
                    return e.getRegistration();
                  })
                ));
              var r = Zp(e, 'message')
                .pipe(
                  $(function(e) {
                    return e.data;
                  })
                )
                .pipe(
                  Qp(function(e) {
                    return e && e.type;
                  })
                )
                .pipe(he(new j()));
              r.connect(), (this.events = r);
            } else
              this.worker = this.events = this.registration =
                ((o = uf),
                Wp(function() {
                  return (
                    (e = new Error(o)),
                    new O(function(t) {
                      return t.error(e);
                    })
                  );
                  var e;
                }));
            var o;
          }
          return (
            (e.prototype.postMessage = function(e, t) {
              return this.worker
                .pipe(
                  nf(1),
                  ((n = function(n) {
                    n.postMessage(i({ action: e }, t));
                  }),
                  function(e) {
                    return e.lift(new sf(n, void 0, void 0));
                  })
                )
                .toPromise()
                .then(function() {});
              var n;
            }),
            (e.prototype.postMessageWithStatus = function(e, t, n) {
              var r = this.waitForStatus(n),
                o = this.postMessage(e, t);
              return Promise.all([r, o]).then(function() {});
            }),
            (e.prototype.generateNonce = function() {
              return Math.round(1e7 * Math.random());
            }),
            (e.prototype.eventsOfType = function(e) {
              return this.events.pipe(
                Qp(function(t) {
                  return t.type === e;
                })
              );
            }),
            (e.prototype.nextEventOfType = function(e) {
              return this.eventsOfType(e).pipe(nf(1));
            }),
            (e.prototype.waitForStatus = function(e) {
              return this.eventsOfType('STATUS')
                .pipe(
                  Qp(function(t) {
                    return t.nonce === e;
                  }),
                  nf(1),
                  $(function(e) {
                    if (!e.status) throw new Error(e.error);
                  })
                )
                .toPromise();
            }),
            Object.defineProperty(e.prototype, 'isEnabled', {
              get: function() {
                return !!this.serviceWorker;
              },
              enumerable: !0,
              configurable: !0
            }),
            e
          );
        })(),
        lf = (function() {
          function e(e) {
            if (((this.sw = e), (this.subscriptionChanges = new j()), !e.isEnabled))
              return (this.messages = Kp), (this.notificationClicks = Kp), void (this.subscription = Kp);
            (this.messages = this.sw.eventsOfType('PUSH').pipe(
              $(function(e) {
                return e.data;
              })
            )),
              (this.notificationClicks = this.sw.eventsOfType('NOTIFICATION_CLICK').pipe(
                $(function(e) {
                  return e.data;
                })
              )),
              (this.pushManager = this.sw.registration.pipe(
                $(function(e) {
                  return e.pushManager;
                })
              ));
            var t = this.pushManager.pipe(
              Yp(function(e) {
                return e.getSubscription();
              })
            );
            this.subscription = ae(t, this.subscriptionChanges);
          }
          return (
            Object.defineProperty(e.prototype, 'isEnabled', {
              get: function() {
                return this.sw.isEnabled;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.requestSubscription = function(e) {
              var t = this;
              if (!this.sw.isEnabled) return Promise.reject(new Error(uf));
              for (
                var n = { userVisibleOnly: !0 },
                  r = this.decodeBase64(e.serverPublicKey.replace(/_/g, '/').replace(/-/g, '+')),
                  o = new Uint8Array(new ArrayBuffer(r.length)),
                  i = 0;
                i < r.length;
                i++
              )
                o[i] = r.charCodeAt(i);
              return (
                (n.applicationServerKey = o),
                this.pushManager
                  .pipe(
                    Yp(function(e) {
                      return e.subscribe(n);
                    }),
                    nf(1)
                  )
                  .toPromise()
                  .then(function(e) {
                    return t.subscriptionChanges.next(e), e;
                  })
              );
            }),
            (e.prototype.unsubscribe = function() {
              var e = this;
              return this.sw.isEnabled
                ? this.subscription
                    .pipe(
                      nf(1),
                      Yp(function(t) {
                        if (null === t) throw new Error('Not subscribed to push notifications.');
                        return t.unsubscribe().then(function(t) {
                          if (!t) throw new Error('Unsubscribe failed!');
                          e.subscriptionChanges.next(null);
                        });
                      })
                    )
                    .toPromise()
                : Promise.reject(new Error(uf));
            }),
            (e.prototype.decodeBase64 = function(e) {
              return atob(e);
            }),
            e
          );
        })(),
        pf = (function() {
          function e(e) {
            if (((this.sw = e), !e.isEnabled)) return (this.available = Kp), void (this.activated = Kp);
            (this.available = this.sw.eventsOfType('UPDATE_AVAILABLE')), (this.activated = this.sw.eventsOfType('UPDATE_ACTIVATED'));
          }
          return (
            Object.defineProperty(e.prototype, 'isEnabled', {
              get: function() {
                return this.sw.isEnabled;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.checkForUpdate = function() {
              if (!this.sw.isEnabled) return Promise.reject(new Error(uf));
              var e = this.sw.generateNonce();
              return this.sw.postMessageWithStatus('CHECK_FOR_UPDATES', { statusNonce: e }, e);
            }),
            (e.prototype.activateUpdate = function() {
              if (!this.sw.isEnabled) return Promise.reject(new Error(uf));
              var e = this.sw.generateNonce();
              return this.sw.postMessageWithStatus('ACTIVATE_UPDATE', { statusNonce: e }, e);
            }),
            e
          );
        })(),
        ff = (function() {
          return function() {};
        })(),
        df = new Se('NGSW_REGISTER_SCRIPT');
      function hf(e, t, n, r) {
        return function() {
          var o = e.get(Li);
          if (al(r) && 'serviceWorker' in navigator && !1 !== n.enabled) {
            var i = o.isStable
              .pipe(
                Qp(function(e) {
                  return !!e;
                }),
                nf(1)
              )
              .toPromise();
            navigator.serviceWorker.addEventListener('controllerchange', function() {
              null !== navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage({ action: 'INITIALIZE' });
            }),
              i.then(function() {
                return navigator.serviceWorker.register(t, { scope: n.scope });
              });
          }
        };
      }
      function yf(e, t) {
        return new cf(al(t) && !1 !== e.enabled ? navigator.serviceWorker : void 0);
      }
      var vf = (function() {
          function e() {}
          var t;
          return (
            (t = e),
            (e.register = function(e, n) {
              return (
                void 0 === n && (n = {}),
                {
                  ngModule: t,
                  providers: [
                    { provide: df, useValue: e },
                    { provide: ff, useValue: n },
                    { provide: cf, useFactory: yf, deps: [ff, pi] },
                    { provide: ii, useFactory: hf, deps: [Bn, df, ff, pi], multi: !0 }
                  ]
                }
              );
            }),
            e
          );
        })(),
        gf = Ic(jc, [Vc], function(e) {
          return (function(e) {
            for (var t = {}, n = [], r = !1, o = 0; o < e.length; o++) {
              var i = e[o];
              i.token === Fr && !0 === i.value && (r = !0), 1073741824 & i.flags && n.push(i.token), (i.index = o), (t[Fs(i.token)] = i);
            }
            return { factory: null, providersByKey: t, providers: e, modules: n, isRoot: r };
          })([
            wa(512, $r, Xr, [[8, [Ol]], [3, $r], Xn]),
            wa(5120, gs, ws, [[3, gs]]),
            wa(4608, Wc, Zc, [gs, [2, qc]]),
            wa(4608, gi, gi, []),
            wa(5120, ai, ui, []),
            wa(5120, ps, ms, []),
            wa(5120, fs, bs, []),
            wa(4608, Np, Op, [ol]),
            wa(6144, Ko, null, [Np]),
            wa(4608, xp, Ep, []),
            wa(
              5120,
              Jl,
              function(e, t, n, r, o, i, s, a) {
                return [new _p(e, t, n), new Ip(r), new Tp(o, i, s, a)];
              },
              [ol, ki, pi, ol, ol, xp, di, [2, kp]]
            ),
            wa(4608, Yl, Yl, [Jl, ki]),
            wa(135680, ep, ep, [ol]),
            wa(4608, ap, ap, [Yl, ep]),
            wa(6144, oo, null, [ap]),
            wa(6144, Xl, null, [ep]),
            wa(4608, Pi, Pi, [ki]),
            wa(4608, Lp, Lp, []),
            wa(5120, cf, yf, [ff, pi]),
            wa(4608, lf, lf, [cf]),
            wa(4608, pf, pf, [cf]),
            wa(5120, Dc, Rc, [Fc]),
            wa(4608, ul, ul, []),
            wa(1073742336, rl, rl, []),
            wa(1024, ni, Bp, []),
            wa(256, df, 'ngsw-worker.js', []),
            wa(256, ff, { enabled: !0 }, []),
            wa(
              1024,
              ii,
              function(e, t, n, r, o) {
                return [
                  ((s = e),
                  Kl('probe', Gl),
                  Kl(
                    'coreTokens',
                    i(
                      {},
                      Ql,
                      (s || []).reduce(function(e, t) {
                        return (e[t.name] = t.token), e;
                      }, {})
                    )
                  ),
                  function() {
                    return Gl;
                  }),
                  hf(t, n, r, o)
                ];
                var s;
              },
              [[2, Mi], Bn, df, ff, pi]
            ),
            wa(512, si, si, [[2, ii]]),
            wa(131584, Li, Li, [ki, di, Bn, ni, $r, si]),
            wa(1073742336, _s, _s, [Li]),
            wa(1073742336, Hp, Hp, [[3, Hp]]),
            wa(1073742336, zp, zp, []),
            wa(1073742336, qp, qp, []),
            wa(1073742336, Mc, Mc, []),
            wa(1073742336, vf, vf, []),
            wa(1073742336, jc, jc, []),
            wa(256, Fr, !0, []),
            wa(256, Fc, { url: 'https://henryk91-chatapp-server.glitch.me', options: {} }, [])
          ]);
        });
      (function() {
        if (bo) throw new Error('Cannot enable prod mode after platform setup.');
        mo = !1;
      })(),
        Vp()
          .bootstrapModuleFactory(gf)
          .then(function() {
            'serviceWorker' in navigator && navigator.serviceWorker.register('/ChatAppClient/ngsw-worker.js');
          })
          .catch(function(e) {
            return console.log(e);
          });
    }
  },
  [[0, 0]]
]);
