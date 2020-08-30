/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-pointerevents-touchevents !*/
!(function(e, n, t) {
    function o(e, n) {
        return typeof e === n;
    }
    function i() {
        var e, n, t, i, s, r, a;
        for (var d in f)
            if (f.hasOwnProperty(d)) {
                if (
                    (
                        (e = []),
                        (n = f[d]),
                        n.name &&
                            (
                                e.push(n.name.toLowerCase()),
                                n.options &&
                                    n.options.aliases &&
                                    n.options.aliases.length
                            )
                    )
                )
                    for (t = 0; t < n.options.aliases.length; t++)
                        e.push(n.options.aliases[t].toLowerCase());
                for (
                    i = o(n.fn, 'function') ? n.fn() : n.fn, s = 0;
                    s < e.length;
                    s++
                )
                    (r = e[s]), (a = r.split('.')), 1 === a.length
                        ? (Modernizr[a[0]] = i)
                        : (
                              !Modernizr[a[0]] ||
                                  Modernizr[a[0]] instanceof Boolean ||
                                  (Modernizr[a[0]] = new Boolean(
                                      Modernizr[a[0]]
                                  )),
                              (Modernizr[a[0]][a[1]] = i)
                          ), l.push((i ? '' : 'no-') + a.join('-'));
            }
    }
    function s() {
        return 'function' != typeof n.createElement
            ? n.createElement(arguments[0])
            : h
              ? n.createElementNS.call(
                    n,
                    'http://www.w3.org/2000/svg',
                    arguments[0]
                )
              : n.createElement.apply(n, arguments);
    }
    function r() {
        var e = n.body;
        return e || ((e = s(h ? 'svg' : 'body')), (e.fake = !0)), e;
    }
    function a(e, t, o, i) {
        var a,
            f,
            d,
            l,
            u = 'modernizr',
            c = s('div'),
            p = r();
        if (parseInt(o, 10))
            for (; o--; )
                (d = s('div')), (d.id = i ? i[o] : u + (o + 1)), c.appendChild(
                    d
                );
        return (a = s('style')), (a.type = 'text/css'), (a.id =
            's' + u), (p.fake ? p : c).appendChild(a), p.appendChild(
            c
        ), a.styleSheet
            ? (a.styleSheet.cssText = e)
            : a.appendChild(n.createTextNode(e)), (c.id = u), p.fake &&
            (
                (p.style.background = ''),
                (p.style.overflow = 'hidden'),
                (l = v.style.overflow),
                (v.style.overflow = 'hidden'),
                v.appendChild(p)
            ), (f = t(c, e)), p.fake
            ? (
                  p.parentNode.removeChild(p),
                  (v.style.overflow = l),
                  v.offsetHeight
              )
            : c.parentNode.removeChild(c), !!f;
    }
    var f = [],
        d = {
            _version: '3.3.1',
            _config: {
                classPrefix: '',
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, n) {
                var t = this;
                setTimeout(function() {
                    n(t[e]);
                }, 0);
            },
            addTest: function(e, n, t) {
                f.push({ name: e, fn: n, options: t });
            },
            addAsyncTest: function(e) {
                f.push({ name: null, fn: e });
            }
        },
        Modernizr = function() {};
    (Modernizr.prototype = d), (Modernizr = new Modernizr());
    var l = [],
        u = d._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : [];
    d._prefixes = u;
    var c = 'Moz O ms Webkit',
        p = d._config.usePrefixes ? c.toLowerCase().split(' ') : [];
    d._domPrefixes = p;
    var v = n.documentElement,
        h = 'svg' === v.nodeName.toLowerCase(),
        m = (function() {
            function e(e, n) {
                var i;
                return e
                    ? (
                          (n && 'string' != typeof n) || (n = s(n || 'div')),
                          (e = 'on' + e),
                          (i = e in n),
                          !i &&
                              o &&
                              (
                                  n.setAttribute || (n = s('div')),
                                  n.setAttribute(e, ''),
                                  (i = 'function' == typeof n[e]),
                                  n[e] !== t && (n[e] = t),
                                  n.removeAttribute(e)
                              ),
                          i
                      )
                    : !1;
            }
            var o = !('onblur' in n.documentElement);
            return e;
        })();
    (d.hasEvent = m), Modernizr.addTest('pointerevents', function() {
        var e = !1,
            n = p.length;
        for (e = Modernizr.hasEvent('pointerdown'); n-- && !e; )
            m(p[n] + 'pointerdown') && (e = !0);
        return e;
    });
    var y = (d.testStyles = a);
    Modernizr.addTest('touchevents', function() {
        var t;
        if (
            'ontouchstart' in e ||
            (e.DocumentTouch && n instanceof DocumentTouch)
        )
            t = !0;
        else {
            var o = [
                '@media (',
                u.join('touch-enabled),('),
                'heartz',
                ')',
                '{#modernizr{top:9px;position:absolute}}'
            ].join('');
            y(o, function(e) {
                t = 9 === e.offsetTop;
            });
        }
        return t;
    }), i(), delete d.addTest, delete d.addAsyncTest;
    for (var w = 0; w < Modernizr._q.length; w++) Modernizr._q[w]();
    e.Modernizr = Modernizr;
})(window, document);
