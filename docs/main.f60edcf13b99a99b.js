(self.webpackChunkenglish_learning_fe =
  self.webpackChunkenglish_learning_fe || []).push([
  [792],
  {
    524: (Lt, ir, Xe) => {
      'use strict';
      function Vt(e, t) {
        return Object.is(e, t);
      }
      let he = null,
        dt = !1,
        ft = 1;
      const Oe = Symbol('SIGNAL');
      function F(e) {
        const t = he;
        return (he = e), t;
      }
      const W = {
        version: 0,
        lastCleanEpoch: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
        consumerOnSignalRead: () => {},
      };
      function Je(e) {
        if (dt) throw new Error('');
        if (null === he) return;
        he.consumerOnSignalRead(e);
        const t = he.nextProducerIndex++;
        Wa(he),
          t < he.producerNode.length &&
            he.producerNode[t] !== e &&
            Gi(he) &&
            qa(he.producerNode[t], he.producerIndexOfThis[t]),
          he.producerNode[t] !== e &&
            ((he.producerNode[t] = e),
            (he.producerIndexOfThis[t] = Gi(he) ? rv(e, he, t) : 0)),
          (he.producerLastReadVersion[t] = e.version);
      }
      function Jm(e) {
        if (
          (!Gi(e) || e.dirty) &&
          (e.dirty || e.lastCleanEpoch !== ft)
        ) {
          if (!e.producerMustRecompute(e) && !cd(e))
            return (e.dirty = !1), void (e.lastCleanEpoch = ft);
          e.producerRecomputeValue(e),
            (e.dirty = !1),
            (e.lastCleanEpoch = ft);
        }
      }
      function ev(e) {
        if (void 0 === e.liveConsumerNode) return;
        const t = dt;
        dt = !0;
        try {
          for (const n of e.liveConsumerNode) n.dirty || nv(n);
        } finally {
          dt = t;
        }
      }
      function tv() {
        return !1 !== he?.consumerAllowSignalWrites;
      }
      function nv(e) {
        (e.dirty = !0), ev(e), e.consumerMarkedDirty?.(e);
      }
      function Ga(e) {
        return e && (e.nextProducerIndex = 0), F(e);
      }
      function ud(e, t) {
        if (
          (F(t),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (Gi(e))
            for (
              let n = e.nextProducerIndex;
              n < e.producerNode.length;
              n++
            )
              qa(e.producerNode[n], e.producerIndexOfThis[n]);
          for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(),
              e.producerLastReadVersion.pop(),
              e.producerIndexOfThis.pop();
        }
      }
      function cd(e) {
        Wa(e);
        for (let t = 0; t < e.producerNode.length; t++) {
          const n = e.producerNode[t],
            r = e.producerLastReadVersion[t];
          if (r !== n.version || (Jm(n), r !== n.version)) return !0;
        }
        return !1;
      }
      function ld(e) {
        if ((Wa(e), Gi(e)))
          for (let t = 0; t < e.producerNode.length; t++)
            qa(e.producerNode[t], e.producerIndexOfThis[t]);
        (e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode &&
            (e.liveConsumerNode.length =
              e.liveConsumerIndexOfThis.length =
                0);
      }
      function rv(e, t, n) {
        if ((ov(e), 0 === e.liveConsumerNode.length && iv(e)))
          for (let r = 0; r < e.producerNode.length; r++)
            e.producerIndexOfThis[r] = rv(e.producerNode[r], e, r);
        return (
          e.liveConsumerIndexOfThis.push(n),
          e.liveConsumerNode.push(t) - 1
        );
      }
      function qa(e, t) {
        if ((ov(e), 1 === e.liveConsumerNode.length && iv(e)))
          for (let r = 0; r < e.producerNode.length; r++)
            qa(e.producerNode[r], e.producerIndexOfThis[r]);
        const n = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
          (e.liveConsumerIndexOfThis[t] =
            e.liveConsumerIndexOfThis[n]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          t < e.liveConsumerNode.length)
        ) {
          const r = e.liveConsumerIndexOfThis[t],
            o = e.liveConsumerNode[t];
          Wa(o), (o.producerIndexOfThis[r] = t);
        }
      }
      function Gi(e) {
        return (
          e.consumerIsAlwaysLive ||
          (e?.liveConsumerNode?.length ?? 0) > 0
        );
      }
      function Wa(e) {
        (e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= []);
      }
      function ov(e) {
        (e.liveConsumerNode ??= []),
          (e.liveConsumerIndexOfThis ??= []);
      }
      function iv(e) {
        return void 0 !== e.producerNode;
      }
      const dd = Symbol('UNSET'),
        fd = Symbol('COMPUTING'),
        Za = Symbol('ERRORED'),
        tA = {
          ...W,
          value: dd,
          dirty: !0,
          error: null,
          equal: Vt,
          producerMustRecompute: e =>
            e.value === dd || e.value === fd,
          producerRecomputeValue(e) {
            if (e.value === fd)
              throw new Error('Detected cycle in computations.');
            const t = e.value;
            e.value = fd;
            const n = Ga(e);
            let r;
            try {
              r = e.computation();
            } catch (o) {
              (r = Za), (e.error = o);
            } finally {
              ud(e, n);
            }
            t !== dd && t !== Za && r !== Za && e.equal(t, r)
              ? (e.value = t)
              : ((e.value = r), e.version++);
          },
        };
      let sv = function nA() {
        throw new Error();
      };
      function av() {
        sv();
      }
      let Qa = null;
      function uv(e, t) {
        tv() || av(),
          e.equal(e.value, t) ||
            ((e.value = t),
            (function aA(e) {
              e.version++,
                (function J0() {
                  ft++;
                })(),
                ev(e),
                Qa?.();
            })(e));
      }
      const sA = { ...W, equal: Vt, value: void 0 };
      function we(e) {
        return 'function' == typeof e;
      }
      function hd(e) {
        const n = e(r => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const pd = hd(
        e =>
          function (n) {
            e(this),
              (this.message = n
                ? `${
                    n.length
                  } errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = n);
          },
      );
      function Ya(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class ot {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (we(r))
              try {
                r();
              } catch (i) {
                t = i instanceof pd ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  fv(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof pd
                      ? (t = [...t, ...s.errors])
                      : t.push(s);
                }
            }
            if (t) throw new pd(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) fv(t);
            else {
              if (t instanceof ot) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n
                  ? n
                  : []).push(t);
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n)
            ? (n.push(t), n)
            : n
            ? [n, t]
            : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t
            ? (this._parentage = null)
            : Array.isArray(n) && Ya(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Ya(n, t), t instanceof ot && t._removeParent(this);
        }
      }
      ot.EMPTY = (() => {
        const e = new ot();
        return (e.closed = !0), e;
      })();
      const lv = ot.EMPTY;
      function dv(e) {
        return (
          e instanceof ot ||
          (e &&
            'closed' in e &&
            we(e.remove) &&
            we(e.add) &&
            we(e.unsubscribe))
        );
      }
      function fv(e) {
        we(e) ? e() : e.unsubscribe();
      }
      const Or = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Ka = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Ka;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Ka;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function hv(e) {
        Ka.setTimeout(() => {
          const { onUnhandledError: t } = Or;
          if (!t) throw e;
          t(e);
        });
      }
      function Xa() {}
      const cA = gd('C', void 0, void 0);
      function gd(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Fr = null;
      function Ja(e) {
        if (Or.useDeprecatedSynchronousErrorHandling) {
          const t = !Fr;
          if (
            (t && (Fr = { errorThrown: !1, error: null }), e(), t)
          ) {
            const { errorThrown: n, error: r } = Fr;
            if (((Fr = null), n)) throw r;
          }
        } else e();
      }
      class md extends ot {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), dv(t) && t.add(this))
              : (this.destination = mA);
        }
        static create(t, n, r) {
          return new yd(t, n, r);
        }
        next(t) {
          this.isStopped
            ? _d(
                (function dA(e) {
                  return gd('N', e, void 0);
                })(t),
                this,
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? _d(
                (function lA(e) {
                  return gd('E', void 0, e);
                })(t),
                this,
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? _d(cA, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const hA = Function.prototype.bind;
      function vd(e, t) {
        return hA.call(e, t);
      }
      class pA {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              eu(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              eu(r);
            }
          else eu(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              eu(n);
            }
        }
      }
      class yd extends md {
        constructor(t, n, r) {
          let o;
          if ((super(), we(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Or.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && vd(t.next, i),
                  error: t.error && vd(t.error, i),
                  complete: t.complete && vd(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new pA(o);
        }
      }
      function eu(e) {
        Or.useDeprecatedSynchronousErrorHandling
          ? (function fA(e) {
              Or.useDeprecatedSynchronousErrorHandling &&
                Fr &&
                ((Fr.errorThrown = !0), (Fr.error = e));
            })(e)
          : hv(e);
      }
      function _d(e, t) {
        const { onStoppedNotification: n } = Or;
        n && Ka.setTimeout(() => n(e, t));
      }
      const mA = {
          closed: !0,
          next: Xa,
          error: function gA(e) {
            throw e;
          },
          complete: Xa,
        },
        Cd =
          ('function' == typeof Symbol && Symbol.observable) ||
          '@@observable';
      function Ln(e) {
        return e;
      }
      function pv(e) {
        return 0 === e.length
          ? Ln
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let xe = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function _A(e) {
              return (
                (e && e instanceof md) ||
                ((function yA(e) {
                  return (
                    e && we(e.next) && we(e.error) && we(e.complete)
                  );
                })(e) &&
                  dv(e))
              );
            })(n)
              ? n
              : new yd(n, r, o);
            return (
              Ja(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i),
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = gv(r))((o, i) => {
              const s = new yd({
                next: a => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Cd]() {
            return this;
          }
          pipe(...n) {
            return pv(n)(this);
          }
          toPromise(n) {
            return new (n = gv(n))((r, o) => {
              let i;
              this.subscribe(
                s => (i = s),
                s => o(s),
                () => r(i),
              );
            });
          }
        }
        return (e.create = t => new e(t)), e;
      })();
      function gv(e) {
        var t;
        return null !== (t = e ?? Or.Promise) && void 0 !== t
          ? t
          : Promise;
      }
      const CA = hd(
        e =>
          function () {
            e(this),
              (this.name = 'ObjectUnsubscribedError'),
              (this.message = 'object unsubscribed');
          },
      );
      let pt = (() => {
        class e extends xe {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new mv(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new CA();
          }
          next(n) {
            Ja(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(
                    this.observers,
                  ));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Ja(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0),
                  (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Ja(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? lv
              : ((this.currentObservers = null),
                i.push(n),
                new ot(() => {
                  (this.currentObservers = null), Ya(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const {
              hasError: r,
              thrownError: o,
              isStopped: i,
            } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new xe();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new mv(t, n)), e;
      })();
      class mv extends pt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : lv;
        }
      }
      class gt extends pt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function vv(e) {
        return we(e?.lift);
      }
      function Ve(e) {
        return t => {
          if (vv(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError(
            'Unable to lift unknown Observable type',
          );
        };
      }
      function Ae(e, t, n, r, o) {
        return new DA(e, t, n, r, o);
      }
      class DA extends md {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function J(e, t) {
        return Ve((n, r) => {
          let o = 0;
          n.subscribe(
            Ae(r, i => {
              r.next(e.call(t, i, o++));
            }),
          );
        });
      }
      typeof navigator < 'u' && navigator,
        typeof navigator < 'u' &&
          !/Opera/.test(navigator.userAgent) &&
          navigator,
        typeof navigator < 'u' &&
          (/MSIE/.test(navigator.userAgent) || navigator),
        typeof navigator < 'u' &&
          !/Opera|WebKit/.test(navigator.userAgent) &&
          navigator,
        typeof navigator < 'u' && navigator;
      const Pv = 'https://g.co/ng/security#xss';
      class D extends Error {
        constructor(t, n) {
          super(
            (function bo(e, t) {
              return `NG0${Math.abs(e)}${t ? ': ' + t : ''}`;
            })(t, n),
          ),
            (this.code = t);
        }
      }
      function Vn(e) {
        return { toString: e }.toString();
      }
      const So = '__parameters__';
      function To(e, t, n) {
        return Vn(() => {
          const r = (function Td(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, c, l) {
              const d = u.hasOwnProperty(So)
                ? u[So]
                : Object.defineProperty(u, So, { value: [] })[So];
              for (; d.length <= l; ) d.push(null);
              return (d[l] = d[l] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      const be = globalThis;
      function de(e) {
        for (let t in e) if (e[t] === de) return t;
        throw Error(
          'Could not find renamed property on target object.',
        );
      }
      function EN(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) &&
            !e.hasOwnProperty(n) &&
            (e[n] = t[n]);
      }
      function qe(e) {
        if ('string' == typeof e) return e;
        if (Array.isArray(e)) return '[' + e.map(qe).join(', ') + ']';
        if (null == e) return '' + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return '' + t;
        const n = t.indexOf('\n');
        return -1 === n ? t : t.substring(0, n);
      }
      function Ad(e, t) {
        return null == e || '' === e
          ? null === t
            ? ''
            : t
          : null == t || '' === t
          ? e
          : e + ' ' + t;
      }
      const wN = de({ __forward_ref__: de });
      function ge(e) {
        return (
          (e.__forward_ref__ = ge),
          (e.toString = function () {
            return qe(this());
          }),
          e
        );
      }
      function k(e) {
        return iu(e) ? e() : e;
      }
      function iu(e) {
        return (
          'function' == typeof e &&
          e.hasOwnProperty(wN) &&
          e.__forward_ref__ === ge
        );
      }
      function S(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function Ao(e) {
        return {
          providers: e.providers || [],
          imports: e.imports || [],
        };
      }
      function su(e) {
        return Uv(e, uu) || Uv(e, Bv);
      }
      function Uv(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function au(e) {
        return e && (e.hasOwnProperty(Nd) || e.hasOwnProperty(AN))
          ? e[Nd]
          : null;
      }
      const uu = de({ ɵprov: de }),
        Nd = de({ ɵinj: de }),
        Bv = de({ ngInjectableDef: de }),
        AN = de({ ngInjectorDef: de });
      class w {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = S({
                  token: this,
                  providedIn: n.providedIn || 'root',
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function kd(e) {
        return e && !!e.ɵproviders;
      }
      const Wi = de({ ɵcmp: de }),
        Pd = de({ ɵdir: de }),
        Ld = de({ ɵpipe: de }),
        Hv = de({ ɵmod: de }),
        jn = de({ ɵfac: de }),
        Zi = de({ __NG_ELEMENT_ID__: de }),
        zv = de({ __NG_ENV_ID__: de });
      function B(e) {
        return 'string' == typeof e ? e : null == e ? '' : String(e);
      }
      function Vd(e, t) {
        throw new D(-201, !1);
      }
      var Q = (function (e) {
        return (
          (e[(e.Default = 0)] = 'Default'),
          (e[(e.Host = 1)] = 'Host'),
          (e[(e.Self = 2)] = 'Self'),
          (e[(e.SkipSelf = 4)] = 'SkipSelf'),
          (e[(e.Optional = 8)] = 'Optional'),
          e
        );
      })(Q || {});
      let jd;
      function Gv() {
        return jd;
      }
      function Tt(e) {
        const t = jd;
        return (jd = e), t;
      }
      function qv(e, t, n) {
        const r = su(e);
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & Q.Optional
          ? null
          : void 0 !== t
          ? t
          : void Vd();
      }
      const Qi = {},
        Ud = '__NG_DI_FLAG__',
        cu = 'ngTempTokenPath',
        kN = /\n/gm,
        Wv = '__source';
      let No;
      function ur(e) {
        const t = No;
        return (No = e), t;
      }
      function VN(e, t = Q.Default) {
        if (void 0 === No) throw new D(-203, !1);
        return null === No
          ? qv(e, void 0, t)
          : No.get(e, t & Q.Optional ? null : void 0, t);
      }
      function T(e, t = Q.Default) {
        return (Gv() || VN)(k(e), t);
      }
      function _(e, t = Q.Default) {
        return T(e, lu(t));
      }
      function lu(e) {
        return typeof e > 'u' || 'number' == typeof e
          ? e
          : (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Bd(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = k(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new D(900, !1);
            let o,
              i = Q.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = jN(a);
              'number' == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(T(o, i));
          } else t.push(T(r));
        }
        return t;
      }
      function Yi(e, t) {
        return (e[Ud] = t), (e.prototype[Ud] = t), e;
      }
      function jN(e) {
        return e[Ud];
      }
      const Qv = Yi(
          To('Inject', e => ({ token: e })),
          -1,
        ),
        $d = Yi(To('Optional'), 8),
        Hd = Yi(To('SkipSelf'), 4);
      function Pr(e, t) {
        return e.hasOwnProperty(jn) ? e[jn] : null;
      }
      function Ro(e, t) {
        e.forEach(n => (Array.isArray(n) ? Ro(n, t) : t(n)));
      }
      function Yv(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function du(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function Bt(e, t, n) {
        let r = xo(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function Kv(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Gd(e, t) {
        const n = xo(e, t);
        if (n >= 0) return e[1 | n];
      }
      function xo(e, t) {
        return (function Xv(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const Dn = {},
        ne = [],
        $t = new w(''),
        Jv = new w('', -1),
        qd = new w('');
      class hu {
        get(t, n = Qi) {
          if (n === Qi) {
            const r = new Error(
              `NullInjectorError: No provider for ${qe(t)}!`,
            );
            throw ((r.name = 'NullInjectorError'), r);
          }
          return n;
        }
      }
      var pu = (function (e) {
          return (
            (e[(e.OnPush = 0)] = 'OnPush'),
            (e[(e.Default = 1)] = 'Default'),
            e
          );
        })(pu || {}),
        rn = (function (e) {
          return (
            (e[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            e
          );
        })(rn || {}),
        cr = (function (e) {
          return (
            (e[(e.None = 0)] = 'None'),
            (e[(e.SignalBased = 1)] = 'SignalBased'),
            (e[(e.HasDecoratorInputTransform = 2)] =
              'HasDecoratorInputTransform'),
            e
          );
        })(cr || {});
      function GN(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      function Wd(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ('number' == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            ty(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s),
              r++;
          }
        }
        return r;
      }
      function ey(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function ty(e) {
        return 64 === e.charCodeAt(0);
      }
      function Ki(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              'number' == typeof o
                ? (n = o)
                : 0 === n ||
                  ny(
                    e,
                    n,
                    o,
                    null,
                    -1 === n || 2 === n ? t[++r] : null,
                  );
            }
          }
        return e;
      }
      function ny(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ('number' == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ('number' == typeof a) break;
          if (a === n) {
            if (null === r)
              return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      const ry = 'ng-template';
      function qN(e, t, n, r) {
        let o = 0;
        if (r) {
          for (; o < t.length && 'string' == typeof t[o]; o += 2)
            if (
              'class' === t[o] &&
              -1 !== GN(t[o + 1].toLowerCase(), n, 0)
            )
              return !0;
        } else if (Zd(e)) return !1;
        if (((o = t.indexOf(1, o)), o > -1)) {
          let i;
          for (; ++o < t.length && 'string' == typeof (i = t[o]); )
            if (i.toLowerCase() === n) return !0;
        }
        return !1;
      }
      function Zd(e) {
        return 4 === e.type && e.value !== ry;
      }
      function WN(e, t, n) {
        return t === (4 !== e.type || n ? e.value : ry);
      }
      function ZN(e, t, n) {
        let r = 4;
        const o = e.attrs,
          i =
            null !== o
              ? (function KN(e) {
                  for (let t = 0; t < e.length; t++)
                    if (ey(e[t])) return t;
                  return e.length;
                })(o)
              : 0;
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ('number' != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ('' !== u && !WN(e, u, n)) ||
                    ('' === u && 1 === t.length))
                ) {
                  if (on(r)) return !1;
                  s = !0;
                }
              } else if (8 & r) {
                if (null === o || !qN(e, o, u, n)) {
                  if (on(r)) return !1;
                  s = !0;
                }
              } else {
                const c = t[++a],
                  l = QN(u, o, Zd(e), n);
                if (-1 === l) {
                  if (on(r)) return !1;
                  s = !0;
                  continue;
                }
                if ('' !== c) {
                  let d;
                  if (
                    ((d = l > i ? '' : o[l + 1].toLowerCase()),
                    2 & r && c !== d)
                  ) {
                    if (on(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !on(r) && !on(u)) return !1;
            if (s && on(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return on(r) || s;
      }
      function on(e) {
        return !(1 & e);
      }
      function QN(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; 'string' == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function XN(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ('number' == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function oy(e, t, n = !1) {
        for (let r = 0; r < t.length; r++)
          if (ZN(e, t[r], n)) return !0;
        return !1;
      }
      function JN(e, t) {
        e: for (let n = 0; n < t.length; n++) {
          const r = t[n];
          if (e.length === r.length) {
            for (let o = 0; o < e.length; o++)
              if (e[o] !== r[o]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function iy(e, t) {
        return e ? ':not(' + t.trim() + ')' : t;
      }
      function eR(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = '',
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ('string' == typeof s)
            if (2 & r) {
              const a = e[++n];
              o +=
                '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
            } else 8 & r ? (o += '.' + s) : 4 & r && (o += ' ' + s);
          else
            '' !== o && !on(s) && ((t += iy(i, o)), (o = '')),
              (r = s),
              (i = i || !on(r));
          n++;
        }
        return '' !== o && (t += iy(i, o)), t;
      }
      function ee(e) {
        return Vn(() => {
          const t = ay(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === pu.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || rn.Emulated,
              styles: e.styles || ne,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: '',
            };
          uy(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = gu(r, !1)),
            (n.pipeDefs = gu(r, !0)),
            (n.id = (function sR(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join('|');
              for (const o of n)
                t = (Math.imul(31, t) + o.charCodeAt(0)) | 0;
              return (t += 2147483648), 'c' + t;
            })(n)),
            n
          );
        });
      }
      function rR(e) {
        return Z(e) || We(e);
      }
      function oR(e) {
        return null !== e;
      }
      function Xi(e) {
        return Vn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || ne,
          declarations: e.declarations || ne,
          imports: e.imports || ne,
          exports: e.exports || ne,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function sy(e, t) {
        if (null == e) return Dn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r];
            let i,
              s,
              a = cr.None;
            Array.isArray(o)
              ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i))
              : ((i = o), (s = o)),
              t
                ? ((n[i] = a !== cr.None ? [r, a] : r), (t[i] = s))
                : (n[i] = r);
          }
        return n;
      }
      function U(e) {
        return Vn(() => {
          const t = ay(e);
          return uy(t), t;
        });
      }
      function Z(e) {
        return e[Wi] || null;
      }
      function We(e) {
        return e[Pd] || null;
      }
      function tt(e) {
        return e[Ld] || null;
      }
      function it(e, t) {
        const n = e[Hv] || null;
        if (!n && !0 === t)
          throw new Error(
            `Type ${qe(e)} does not have '\u0275mod' property.`,
          );
        return n;
      }
      function ay(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || Dn,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || ne,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: sy(e.inputs, t),
          outputs: sy(e.outputs),
          debugInfo: null,
        };
      }
      function uy(e) {
        e.features?.forEach(t => t(e));
      }
      function gu(e, t) {
        if (!e) return null;
        const n = t ? tt : rR;
        return () =>
          ('function' == typeof e ? e() : e)
            .map(r => n(r))
            .filter(oR);
      }
      function Oo(e) {
        return { ɵproviders: e };
      }
      function aR(...e) {
        return { ɵproviders: Qd(0, e), ɵfromNgModule: !0 };
      }
      function Qd(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        const i = s => {
          n.push(s);
        };
        return (
          Ro(t, s => {
            const a = s;
            mu(a, i, [], r) && ((o ||= []), o.push(a));
          }),
          void 0 !== o && cy(o, i),
          n
        );
      }
      function cy(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { ngModule: r, providers: o } = e[n];
          Yd(o, i => {
            t(i, r);
          });
        }
      }
      function mu(e, t, n, r) {
        if (!(e = k(e))) return !1;
        let o = null,
          i = au(e);
        const s = !i && Z(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = au(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              'function' == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of u) mu(c, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let c;
              r.add(o);
              try {
                Ro(i.imports, l => {
                  mu(l, t, n, r) && ((c ||= []), c.push(l));
                });
              } finally {
              }
              void 0 !== c && cy(c, t);
            }
            if (!a) {
              const c = Pr(o) || (() => new o());
              t({ provide: o, useFactory: c, deps: ne }, o),
                t({ provide: qd, useValue: o, multi: !0 }, o),
                t(
                  { provide: $t, useValue: () => T(o), multi: !0 },
                  o,
                );
            }
            const u = i.providers;
            if (null != u && !a) {
              const c = e;
              Yd(u, l => {
                t(l, c);
              });
            }
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function Yd(e, t) {
        for (let n of e)
          kd(n) && (n = n.ɵproviders),
            Array.isArray(n) ? Yd(n, t) : t(n);
      }
      const uR = de({ provide: String, useValue: de });
      function Kd(e) {
        return null !== e && 'object' == typeof e && uR in e;
      }
      function Lr(e) {
        return 'function' == typeof e;
      }
      const Xd = new w(''),
        vu = {},
        lR = {};
      let Jd;
      function yu() {
        return void 0 === Jd && (Jd = new hu()), Jd;
      }
      class Ht {}
      class Fo extends Ht {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            tf(t, s => this.processProvider(s)),
            this.records.set(Jv, ko(void 0, this)),
            o.has('environment') &&
              this.records.set(Ht, ko(void 0, this));
          const i = this.records.get(Xd);
          null != i &&
            'string' == typeof i.value &&
            this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(
              this.get(qd, ne, Q.Self),
            ));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          const t = F(null);
          try {
            for (const r of this._ngOnDestroyHooks) r.ngOnDestroy();
            const n = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const r of n) r();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              F(t);
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = ur(this),
            r = Tt(void 0);
          try {
            return t();
          } finally {
            ur(n), Tt(r);
          }
        }
        get(t, n = Qi, r = Q.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(zv)))
            return t[zv](this);
          r = lu(r);
          const i = ur(this),
            s = Tt(void 0);
          try {
            if (!(r & Q.SkipSelf)) {
              let u = this.records.get(t);
              if (void 0 === u) {
                const c =
                  (function gR(e) {
                    return (
                      'function' == typeof e ||
                      ('object' == typeof e && e instanceof w)
                    );
                  })(t) && su(t);
                (u =
                  c && this.injectableDefInScope(c)
                    ? ko(ef(t), vu)
                    : null),
                  this.records.set(t, u);
              }
              if (null != u) return this.hydrate(t, u);
            }
            return (r & Q.Self ? yu() : this.parent).get(
              t,
              (n = r & Q.Optional && n === Qi ? null : n),
            );
          } catch (a) {
            if ('NullInjectorError' === a.name) {
              if (((a[cu] = a[cu] || []).unshift(qe(t)), i)) throw a;
              return (function UN(e, t, n, r) {
                const o = e[cu];
                throw (
                  (t[Wv] && o.unshift(t[Wv]),
                  (e.message = (function BN(e, t, n, r = null) {
                    e =
                      e &&
                      '\n' === e.charAt(0) &&
                      '\u0275' == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = qe(t);
                    if (Array.isArray(t)) o = t.map(qe).join(' -> ');
                    else if ('object' == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ':' +
                              ('string' == typeof a
                                ? JSON.stringify(a)
                                : qe(a)),
                          );
                        }
                      o = `{${i.join(', ')}}`;
                    }
                    return `${n}${
                      r ? '(' + r + ')' : ''
                    }[${o}]: ${e.replace(kN, '\n  ')}`;
                  })('\n' + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[cu] = null),
                  e)
                );
              })(a, t, 'R3InjectorError', this.source);
            }
            throw a;
          } finally {
            Tt(s), ur(i);
          }
        }
        resolveInjectorInitializers() {
          const t = F(null),
            n = ur(this),
            r = Tt(void 0);
          try {
            const i = this.get($t, ne, Q.Self);
            for (const s of i) s();
          } finally {
            ur(n), Tt(r), F(t);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(qe(r));
          return `R3Injector[${t.join(', ')}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new D(205, !1);
        }
        processProvider(t) {
          let n = Lr((t = k(t))) ? t : k(t && t.provide);
          const r = (function fR(e) {
            return Kd(e) ? ko(void 0, e.useValue) : ko(fy(e), vu);
          })(t);
          if (!Lr(t) && !0 === t.multi) {
            let o = this.records.get(n);
            o ||
              ((o = ko(void 0, vu, !0)),
              (o.factory = () => Bd(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          const r = F(null);
          try {
            return (
              n.value === vu &&
                ((n.value = lR), (n.value = n.factory())),
              'object' == typeof n.value &&
                n.value &&
                (function pR(e) {
                  return (
                    null !== e &&
                    'object' == typeof e &&
                    'function' == typeof e.ngOnDestroy
                  );
                })(n.value) &&
                this._ngOnDestroyHooks.add(n.value),
              n.value
            );
          } finally {
            F(r);
          }
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = k(t.providedIn);
          return 'string' == typeof n
            ? 'any' === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function ef(e) {
        const t = su(e),
          n = null !== t ? t.factory : Pr(e);
        if (null !== n) return n;
        if (e instanceof w) throw new D(204, !1);
        if (e instanceof Function)
          return (function dR(e) {
            if (e.length > 0) throw new D(204, !1);
            const n = (function TN(e) {
              return (e && (e[uu] || e[Bv])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new D(204, !1);
      }
      function fy(e, t, n) {
        let r;
        if (Lr(e)) {
          const o = k(e);
          return Pr(o) || ef(o);
        }
        if (Kd(e)) r = () => k(e.useValue);
        else if (
          (function dy(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...Bd(e.deps || []));
        else if (
          (function ly(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => T(k(e.useExisting));
        else {
          const o = k(e && (e.useClass || e.provide));
          if (
            !(function hR(e) {
              return !!e.deps;
            })(e)
          )
            return Pr(o) || ef(o);
          r = () => new o(...Bd(e.deps));
        }
        return r;
      }
      function ko(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function tf(e, t) {
        for (const n of e)
          Array.isArray(n)
            ? tf(n, t)
            : n && kd(n)
            ? tf(n.ɵproviders, t)
            : t(n);
      }
      function Un(e, t) {
        e instanceof Fo && e.assertNotDestroyed();
        const r = ur(e),
          o = Tt(void 0);
        try {
          return t();
        } finally {
          ur(r), Tt(o);
        }
      }
      function hy() {
        return (
          void 0 !== Gv() ||
          null !=
            (function LN() {
              return No;
            })()
        );
      }
      const Me = 0,
        b = 1,
        N = 2,
        Ue = 3,
        sn = 4,
        nt = 5,
        mt = 6,
        Lo = 7,
        _e = 8,
        Be = 9,
        En = 10,
        V = 11,
        ts = 12,
        gy = 13,
        Vo = 14,
        Te = 15,
        Vr = 16,
        jo = 17,
        Bn = 18,
        Uo = 19,
        my = 20,
        dr = 21,
        Cu = 22,
        Yt = 23,
        A = 25,
        rf = 1,
        wn = 7,
        Bo = 9,
        Fe = 10;
      var Eu = (function (e) {
        return (
          (e[(e.None = 0)] = 'None'),
          (e[(e.HasTransplantedViews = 2)] = 'HasTransplantedViews'),
          e
        );
      })(Eu || {});
      function et(e) {
        return Array.isArray(e) && 'object' == typeof e[rf];
      }
      function st(e) {
        return Array.isArray(e) && !0 === e[rf];
      }
      function sf(e) {
        return !!(4 & e.flags);
      }
      function jr(e) {
        return e.componentOffset > -1;
      }
      function wu(e) {
        return !(1 & ~e.flags);
      }
      function an(e) {
        return !!e.template;
      }
      function rs(e) {
        return !!(512 & e[N]);
      }
      class TR {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Cy(e, t, n, r) {
        null !== t ? t.applyValueToInputSignal(t, r) : (e[n] = r);
      }
      function Kt() {
        return Dy;
      }
      function Dy(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = NR), AR;
      }
      function AR() {
        const e = wy(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Dn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function NR(e, t, n, r, o) {
        const i = this.declaredInputs[r],
          s =
            wy(e) ||
            (function RR(e, t) {
              return (e[Ey] = t);
            })(e, { previous: Dn, current: null }),
          a = s.current || (s.current = {}),
          u = s.previous,
          c = u[i];
        (a[i] = new TR(c && c.currentValue, n, u === Dn)),
          Cy(e, t, o, n);
      }
      Kt.ngInherit = !0;
      const Ey = '__ngSimpleChanges__';
      function wy(e) {
        return e[Ey] || null;
      }
      const bn = function (e, t, n) {};
      function re(e) {
        for (; Array.isArray(e); ) e = e[Me];
        return e;
      }
      function os(e, t) {
        return re(t[e]);
      }
      function vt(e, t) {
        return re(t[e.index]);
      }
      function is(e, t) {
        return e.data[t];
      }
      function zt(e, t) {
        const n = t[e];
        return et(n) ? n : n[Me];
      }
      function df(e) {
        return !(128 & ~e[N]);
      }
      function Xt(e, t) {
        return null == t ? null : e[t];
      }
      function Sy(e) {
        e[jo] = 0;
      }
      function My(e) {
        1024 & e[N] || ((e[N] |= 1024), df(e) && bu(e));
      }
      function ss(e) {
        return !!(9216 & e[N] || e[Yt]?.dirty);
      }
      function ff(e) {
        e[En].changeDetectionScheduler?.notify(7),
          64 & e[N] && (e[N] |= 1024),
          ss(e) && bu(e);
      }
      function bu(e) {
        e[En].changeDetectionScheduler?.notify(0);
        let t = $n(e);
        for (
          ;
          null !== t && !(8192 & t[N]) && ((t[N] |= 8192), df(t));

        )
          t = $n(t);
      }
      function Iu(e, t) {
        if (!(256 & ~e[N])) throw new D(911, !1);
        null === e[dr] && (e[dr] = []), e[dr].push(t);
      }
      function $n(e) {
        const t = e[Ue];
        return st(t) ? t[Ue] : t;
      }
      const j = {
        lFrame: Uy(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      let Ay = !1;
      function Ny() {
        return j.bindingsEnabled;
      }
      function Br() {
        return null !== j.skipHydrationRootTNode;
      }
      function v() {
        return j.lFrame.lView;
      }
      function q() {
        return j.lFrame.tView;
      }
      function $r(e) {
        return (j.lFrame.contextLView = e), e[_e];
      }
      function Hr(e) {
        return (j.lFrame.contextLView = null), e;
      }
      function fe() {
        let e = Ry();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Ry() {
        return j.lFrame.currentTNode;
      }
      function un(e, t) {
        const n = j.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function gf() {
        return j.lFrame.isParent;
      }
      function mf() {
        j.lFrame.isParent = !1;
      }
      function Fy() {
        return Ay;
      }
      function ky(e) {
        Ay = e;
      }
      function cn() {
        return j.lFrame.bindingIndex++;
      }
      function GR(e, t) {
        const n = j.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), vf(t);
      }
      function vf(e) {
        j.lFrame.currentDirectiveIndex = e;
      }
      function _f() {
        return j.lFrame.currentQueryIndex;
      }
      function Mu(e) {
        j.lFrame.currentQueryIndex = e;
      }
      function WR(e) {
        const t = e[b];
        return 2 === t.type
          ? t.declTNode
          : 1 === t.type
          ? e[nt]
          : null;
      }
      function Vy(e, t, n) {
        if (n & Q.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & Q.Host ||
              ((o = WR(i)),
              null === o || ((i = i[Vo]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (j.lFrame = jy());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Cf(e) {
        const t = jy(),
          n = e[b];
        (j.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function jy() {
        const e = j.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Uy(e) : t;
      }
      function Uy(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function By() {
        const e = j.lFrame;
        return (
          (j.lFrame = e.parent),
          (e.currentTNode = null),
          (e.lView = null),
          e
        );
      }
      const $y = By;
      function Df() {
        const e = By();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function rt() {
        return j.lFrame.selectedIndex;
      }
      function zr(e) {
        j.lFrame.selectedIndex = e;
      }
      function Ce() {
        const e = j.lFrame;
        return is(e.tView, e.selectedIndex);
      }
      let zy = !0;
      function us() {
        return zy;
      }
      function In(e) {
        zy = e;
      }
      function Tu(e, t) {
        for (
          let n = t.directiveStart, r = t.directiveEnd;
          n < r;
          n++
        ) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: c,
              ngOnDestroy: l,
            } = i;
          s && (e.contentHooks ??= []).push(-n, s),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            u && (e.viewHooks ??= []).push(-n, u),
            c &&
              ((e.viewHooks ??= []).push(n, c),
              (e.viewCheckHooks ??= []).push(n, c)),
            null != l && (e.destroyHooks ??= []).push(n, l);
        }
      }
      function Au(e, t, n) {
        Gy(e, t, 3, n);
      }
      function Nu(e, t, n, r) {
        (3 & e[N]) === n && Gy(e, t, n, r);
      }
      function Ef(e, t) {
        let n = e[N];
        (3 & n) === t && ((n &= 16383), (n += 1), (e[N] = n));
      }
      function Gy(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[jo] : 0; u < s; u++)
          if ('number' == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[jo] += 65536),
              (a < i || -1 == i) &&
                (ex(e, n, t, u),
                (e[jo] = (4294901760 & e[jo]) + u + 2)),
              u++;
      }
      function qy(e, t) {
        bn(4, e, t);
        const n = F(null);
        try {
          t.call(e);
        } finally {
          F(n), bn(5, e, t);
        }
      }
      function ex(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        o
          ? e[N] >> 14 < e[jo] >> 16 &&
            (3 & e[N]) === t &&
            ((e[N] += 16384), qy(a, i))
          : qy(a, i);
      }
      const $o = -1;
      class cs {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      const bf = {};
      class Gr {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = lu(r);
          const o = this.injector.get(t, bf, r);
          return o !== bf || n === bf
            ? o
            : this.parentInjector.get(t, n, r);
        }
      }
      function If(e) {
        return e !== $o;
      }
      function ls(e) {
        return 32767 & e;
      }
      function ds(e, t) {
        let n = (function ox(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[Vo]), n--;
        return r;
      }
      let Sf = !0;
      function Ru(e) {
        const t = Sf;
        return (Sf = e), t;
      }
      const Zy = 255,
        Qy = 5;
      let sx = 0;
      const Sn = {};
      function xu(e, t) {
        const n = Yy(e, t);
        if (-1 !== n) return n;
        const r = t[b];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Mf(r.data, e),
          Mf(t, null),
          Mf(r.blueprint, null));
        const o = Ou(e, t),
          i = e.injectorIndex;
        if (If(o)) {
          const s = ls(o),
            a = ds(o, t),
            u = a[b].data;
          for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c];
        }
        return (t[i + 8] = o), i;
      }
      function Mf(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Yy(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ou(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = r_(o)), null === r)) return $o;
          if ((n++, (o = o[Vo]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return $o;
      }
      function Tf(e, t, n) {
        !(function ax(e, t, n) {
          let r;
          'string' == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Zi) && (r = n[Zi]),
            null == r && (r = n[Zi] = sx++);
          const o = r & Zy;
          t.data[e + (o >> Qy)] |= 1 << o;
        })(e, t, n);
      }
      function Ky(e, t, n) {
        if (n & Q.Optional || void 0 !== e) return e;
        Vd();
      }
      function Xy(e, t, n, r) {
        if (
          (n & Q.Optional && void 0 === r && (r = null),
          !(n & (Q.Self | Q.Host)))
        ) {
          const o = e[Be],
            i = Tt(void 0);
          try {
            return o
              ? o.get(t, r, n & Q.Optional)
              : qv(t, r, n & Q.Optional);
          } finally {
            Tt(i);
          }
        }
        return Ky(r, 0, n);
      }
      function Jy(e, t, n, r = Q.Default, o) {
        if (null !== e) {
          if (2048 & t[N] && !(r & Q.Self)) {
            const s = (function fx(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i &&
                null !== s &&
                2048 & s[N] &&
                !(512 & s[N]);

              ) {
                const a = e_(i, s, n, r | Q.Self, Sn);
                if (a !== Sn) return a;
                let u = i.parent;
                if (!u) {
                  const c = s[my];
                  if (c) {
                    const l = c.get(n, Sn, r);
                    if (l !== Sn) return l;
                  }
                  (u = r_(s)), (s = s[Vo]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Sn);
            if (s !== Sn) return s;
          }
          const i = e_(e, t, n, r, Sn);
          if (i !== Sn) return i;
        }
        return Xy(t, n, r, o);
      }
      function e_(e, t, n, r, o) {
        const i = (function lx(e) {
          if ('string' == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Zi) ? e[Zi] : void 0;
          return 'number' == typeof t ? (t >= 0 ? t & Zy : dx) : t;
        })(n);
        if ('function' == typeof i) {
          if (!Vy(t, e, r))
            return r & Q.Host ? Ky(o, 0, r) : Xy(t, n, r, o);
          try {
            let s;
            if (((s = i(r)), null != s || r & Q.Optional)) return s;
            Vd();
          } finally {
            $y();
          }
        } else if ('number' == typeof i) {
          let s = null,
            a = Yy(e, t),
            u = $o,
            c = r & Q.Host ? t[Te][nt] : null;
          for (
            (-1 === a || r & Q.SkipSelf) &&
            ((u = -1 === a ? Ou(e, t) : t[a + 8]),
            u !== $o && n_(r, !1)
              ? ((s = t[b]), (a = ls(u)), (t = ds(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const l = t[b];
            if (t_(i, a, l.data)) {
              const d = cx(a, t, n, s, r, c);
              if (d !== Sn) return d;
            }
            (u = t[a + 8]),
              u !== $o && n_(r, t[b].data[a + 8] === c) && t_(i, a, t)
                ? ((s = l), (a = ls(u)), (t = ds(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function cx(e, t, n, r, o, i) {
        const s = t[b],
          a = s.data[e + 8],
          l = Fu(
            a,
            s,
            n,
            null == r ? jr(a) && Sf : r != s && !!(3 & a.type),
            o & Q.Host && i === a,
          );
        return null !== l ? qr(t, s, l, a) : Sn;
      }
      function Fu(e, t, n, r, o) {
        const i = e.providerIndexes,
          s = t.data,
          a = 1048575 & i,
          u = e.directiveStart,
          l = i >> 20,
          f = o ? a + l : e.directiveEnd;
        for (let h = r ? a : a + l; h < f; h++) {
          const p = s[h];
          if ((h < u && n === p) || (h >= u && p.type === n))
            return h;
        }
        if (o) {
          const h = s[u];
          if (h && an(h) && h.type === n) return u;
        }
        return null;
      }
      function qr(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function tx(e) {
            return e instanceof cs;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function xN(e, t) {
              throw (t && t.join(' > '), new D(-200, e));
            })(
              (function ae(e) {
                return 'function' == typeof e
                  ? e.name || e.toString()
                  : 'object' == typeof e &&
                    null != e &&
                    'function' == typeof e.type
                  ? e.type.name || e.type.toString()
                  : B(e);
              })(i[n]),
            );
          const a = Ru(s.canSeeViewProviders);
          s.resolving = !0;
          const c = s.injectImpl ? Tt(s.injectImpl) : null;
          Vy(e, r, Q.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function JR(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Dy(t);
                    (n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s);
                  }
                  o && (n.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ??= []).push(e, i),
                      (n.preOrderCheckHooks ??= []).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== c && Tt(c), Ru(a), (s.resolving = !1), $y();
          }
        }
        return o;
      }
      function t_(e, t, n) {
        return !!(n[t + (e >> Qy)] & (1 << e));
      }
      function n_(e, t) {
        return !(e & Q.Self || (e & Q.Host && t));
      }
      class Qe {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Jy(this._tNode, this._lView, t, lu(r), n);
        }
      }
      function dx() {
        return new Qe(fe(), v());
      }
      function $e(e) {
        return Vn(() => {
          const t = e.prototype.constructor,
            n = t[jn] || Af(t),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[jn] || Af(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
          }
          return i => new i();
        });
      }
      function Af(e) {
        return iu(e)
          ? () => {
              const t = Af(k(e));
              return t && t();
            }
          : Pr(e);
      }
      function r_(e) {
        const t = e[b],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[nt] : null;
      }
      function u_(e, t = null, n = null, r) {
        const o = c_(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function c_(e, t = null, n = null, r, o = new Set()) {
        const i = [n || ne, aR(e)];
        return (
          (r = r || ('object' == typeof e ? void 0 : qe(e))),
          new Fo(i, t || yu(), r || null, o)
        );
      }
      class He {
        static #e = (this.THROW_IF_NOT_FOUND = Qi);
        static #t = (this.NULL = new hu());
        static create(t, n) {
          if (Array.isArray(t)) return u_({ name: '' }, n, t, '');
          {
            const r = t.name ?? '';
            return u_({ name: r }, t.parent, t.providers, r);
          }
        }
        static #n = (this.ɵprov = S({
          token: He,
          providedIn: 'any',
          factory: () => T(Jv),
        }));
        static #r = (this.__NG_ELEMENT_ID__ = -1);
      }
      new w('').__NG_ELEMENT_ID__ = e => {
        const t = fe();
        if (null === t) throw new D(204, !1);
        if (2 & t.type) return t.value;
        if (e & Q.Optional) return null;
        throw new D(204, !1);
      };
      function Rf(e) {
        return e.ngOriginalError;
      }
      let Wr = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = Ex);
          static #t = (this.__NG_ENV_ID__ = n => n);
        }
        return e;
      })();
      class Dx extends Wr {
        constructor(t) {
          super(), (this._lView = t);
        }
        onDestroy(t) {
          return (
            Iu(this._lView, t),
            () =>
              (function hf(e, t) {
                if (null === e[dr]) return;
                const n = e[dr].indexOf(t);
                -1 !== n && e[dr].splice(n, 1);
              })(this._lView, t)
          );
        }
      }
      function Ex() {
        return new Dx(v());
      }
      let Zr = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new gt(!1));
          }
          get _hasPendingTasks() {
            return this.hasPendingTasks.value;
          }
          add() {
            this._hasPendingTasks || this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size &&
                this._hasPendingTasks &&
                this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(),
              this._hasPendingTasks && this.hasPendingTasks.next(!1);
          }
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: 'root',
            factory: () => new e(),
          }));
        }
        return e;
      })();
      const oe = class wx extends pt {
        constructor(t = !1) {
          super(),
            (this.destroyRef = void 0),
            (this.pendingTasks = void 0),
            (this.__isAsync = t),
            hy() &&
              ((this.destroyRef = _(Wr, { optional: !0 }) ?? void 0),
              (this.pendingTasks =
                _(Zr, { optional: !0 }) ?? void 0));
        }
        emit(t) {
          const n = F(null);
          try {
            super.next(t);
          } finally {
            F(n);
          }
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && 'object' == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync &&
            ((i = this.wrapInTimeout(i)),
            o && (o = this.wrapInTimeout(o)),
            s && (s = this.wrapInTimeout(s)));
          const a = super.subscribe({
            next: o,
            error: i,
            complete: s,
          });
          return t instanceof ot && t.add(a), a;
        }
        wrapInTimeout(t) {
          return n => {
            const r = this.pendingTasks?.add();
            setTimeout(() => {
              t(n), void 0 !== r && this.pendingTasks?.remove(r);
            });
          };
        }
      };
      function Pu(...e) {}
      function d_(e) {
        let t, n;
        function r() {
          e = Pu;
          try {
            void 0 !== n &&
              'function' == typeof cancelAnimationFrame &&
              cancelAnimationFrame(n),
              void 0 !== t && clearTimeout(t);
          } catch {}
        }
        return (
          (t = setTimeout(() => {
            e(), r();
          })),
          'function' == typeof requestAnimationFrame &&
            (n = requestAnimationFrame(() => {
              e(), r();
            })),
          () => r()
        );
      }
      function f_(e) {
        return (
          queueMicrotask(() => e()),
          () => {
            e = Pu;
          }
        );
      }
      class ie {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new oe(!1)),
            (this.onMicrotaskEmpty = new oe(!1)),
            (this.onStable = new oe(!1)),
            (this.onError = new oe(!1)),
            typeof Zone > 'u')
          )
            throw new D(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(
                new Zone.TaskTrackingZoneSpec(),
              )),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.callbackScheduled = !1),
            (function Sx(e) {
              const t = () => {
                !(function Ix(e) {
                  e.isCheckStableRunning ||
                    e.callbackScheduled ||
                    ((e.callbackScheduled = !0),
                    Zone.root.run(() => {
                      d_(() => {
                        (e.callbackScheduled = !1),
                          Of(e),
                          (e.isCheckStableRunning = !0),
                          xf(e),
                          (e.isCheckStableRunning = !1);
                      });
                    }),
                    Of(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  if (
                    (function Mx(e) {
                      return g_(e, '__ignore_ng_zone__');
                    })(a)
                  )
                    return n.invokeTask(o, i, s, a);
                  try {
                    return h_(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      'eventTask' === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      p_(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return h_(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection &&
                      !e.callbackScheduled &&
                      !(function Tx(e) {
                        return g_(e, '__scheduler_tick__');
                      })(a) &&
                      t(),
                      p_(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ('microTask' == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Of(e),
                          xf(e))
                        : 'macroTask' == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return (
            typeof Zone < 'u' &&
            !0 === Zone.current.get('isAngularZone')
          );
        }
        static assertInAngularZone() {
          if (!ie.isInAngularZone()) throw new D(909, !1);
        }
        static assertNotInAngularZone() {
          if (ie.isInAngularZone()) throw new D(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask(
              'NgZoneEvent: ' + o,
              t,
              bx,
              Pu,
              Pu,
            );
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const bx = {};
      function xf(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Of(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            !0 === e.callbackScheduled)
        );
      }
      function h_(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function p_(e) {
        e._nesting--, xf(e);
      }
      class Ff {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new oe()),
            (this.onMicrotaskEmpty = new oe()),
            (this.onStable = new oe()),
            (this.onError = new oe());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      function g_(e, t) {
        return (
          !(!Array.isArray(e) || 1 !== e.length) &&
          !0 === e[0]?.data?.[t]
        );
      }
      class ln {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error('ERROR', t),
            n && this._console.error('ORIGINAL ERROR', n);
        }
        _findOriginalError(t) {
          let n = t && Rf(t);
          for (; n && Rf(n); ) n = Rf(n);
          return n || null;
        }
      }
      const Nx = new w('', {
        providedIn: 'root',
        factory: () => {
          const e = _(ie),
            t = _(ln);
          return n => e.runOutsideAngular(() => t.handleError(n));
        },
      });
      function Rx() {
        return Go(fe(), v());
      }
      function Go(e, t) {
        return new Gt(vt(e, t));
      }
      let Gt = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
          static #e = (this.__NG_ELEMENT_ID__ = Rx);
        }
        return e;
      })();
      function v_(e) {
        return e instanceof Gt ? e.nativeElement : e;
      }
      function xx() {
        return this._results[Symbol.iterator]();
      }
      class kf {
        static #e = Symbol.iterator;
        get changes() {
          return (this._changes ??= new oe());
        }
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._onDirty = void 0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = void 0),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = kf.prototype;
          n[Symbol.iterator] || (n[Symbol.iterator] = xx);
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          this.dirty = !1;
          const r = (function At(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(t);
          (this._changesDetected = !(function zN(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let o = e[r],
                i = t[r];
              if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
            }
            return !0;
          })(this._results, r, n)) &&
            ((this._results = r),
            (this.length = r.length),
            (this.last = r[this.length - 1]),
            (this.first = r[0]));
        }
        notifyOnChanges() {
          void 0 !== this._changes &&
            (this._changesDetected ||
              !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        onDirty(t) {
          this._onDirty = t;
        }
        setDirty() {
          (this.dirty = !0), this._onDirty?.();
        }
        destroy() {
          void 0 !== this._changes &&
            (this._changes.complete(), this._changes.unsubscribe());
        }
      }
      function Lu(e) {
        return !(128 & ~e.flags);
      }
      const Pf = new Map();
      let Fx = 0;
      const ju = '__ngContext__';
      function at(e, t) {
        et(t)
          ? ((e[ju] = t[Uo]),
            (function Px(e) {
              Pf.set(e[Uo], e);
            })(t))
          : (e[ju] = t);
      }
      function M_(e) {
        return A_(e[ts]);
      }
      function T_(e) {
        return A_(e[sn]);
      }
      function A_(e) {
        for (; null !== e && !st(e); ) e = e[sn];
        return e;
      }
      let Vf;
      const ps = new w('', { providedIn: 'root', factory: () => eO }),
        eO = 'ng',
        L_ = new w(''),
        hr = new w('', {
          providedIn: 'platform',
          factory: () => 'unknown',
        }),
        jf = new w('', {
          providedIn: 'root',
          factory: () =>
            (function fr() {
              if (void 0 !== Vf) return Vf;
              if (typeof document < 'u') return document;
              throw new D(210, !1);
            })()
              .body?.querySelector('[ngCspNonce]')
              ?.getAttribute('ngCspNonce') || null,
        });
      let V_ = () => null;
      function qf(e, t, n = !1) {
        return V_(e, t, n);
      }
      const q_ = new w('', { providedIn: 'root', factory: () => !1 });
      let Qu;
      function K_(e) {
        return (
          (function Xf() {
            if (void 0 === Qu && ((Qu = null), be.trustedTypes))
              try {
                Qu = be.trustedTypes.createPolicy(
                  'angular#unsafe-bypass',
                  {
                    createHTML: e => e,
                    createScript: e => e,
                    createScriptURL: e => e,
                  },
                );
              } catch {}
            return Qu;
          })()?.createScriptURL(e) || e
        );
      }
      class X_ {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Pv})`;
        }
      }
      function pr(e) {
        return e instanceof X_
          ? e.changingThisBreaksApplicationSecurity
          : e;
      }
      function Ds(e, t) {
        const n = (function _O(e) {
          return (e instanceof X_ && e.getTypeName()) || null;
        })(e);
        if (null != n && n !== t) {
          if ('ResourceURL' === n && 'URL' === t) return !0;
          throw new Error(
            `Required a safe ${t}, got a ${n} (see ${Pv})`,
          );
        }
        return n === t;
      }
      const wO =
        /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var Yo = (function (e) {
        return (
          (e[(e.NONE = 0)] = 'NONE'),
          (e[(e.HTML = 1)] = 'HTML'),
          (e[(e.STYLE = 2)] = 'STYLE'),
          (e[(e.SCRIPT = 3)] = 'SCRIPT'),
          (e[(e.URL = 4)] = 'URL'),
          (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
          e
        );
      })(Yo || {});
      function rh(e) {
        const t = ws();
        return t
          ? t.sanitize(Yo.URL, e) || ''
          : Ds(e, 'URL')
          ? pr(e)
          : (function Jf(e) {
              return (e = String(e)).match(wO) ? e : 'unsafe:' + e;
            })(B(e));
      }
      function aC(e) {
        const t = ws();
        if (t) return K_(t.sanitize(Yo.RESOURCE_URL, e) || '');
        if (Ds(e, 'ResourceURL')) return K_(pr(e));
        throw new D(904, !1);
      }
      function ws() {
        const e = v();
        return e && e[En].sanitizer;
      }
      function qt(e) {
        return e instanceof Function ? e() : e;
      }
      var gr = (function (e) {
        return (
          (e[(e.Important = 1)] = 'Important'),
          (e[(e.DashCase = 2)] = 'DashCase'),
          e
        );
      })(gr || {});
      let sh;
      function ah(e, t) {
        return sh(e, t);
      }
      function Xo(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          st(r) ? (i = r) : et(r) && ((s = !0), (r = r[Me]));
          const a = re(r);
          0 === e && null !== n
            ? null == o
              ? DC(t, n, a)
              : Qr(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Qr(t, n, a, o || null, !0)
            : 2 === e
            ? (function Is(e, t, n) {
                e.removeChild(null, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function aF(e, t, n, r, o) {
                const i = n[wn];
                i !== re(n) && Xo(t, e, r, i, o);
                for (let a = Fe; a < n.length; a++) {
                  const u = n[a];
                  nc(u[b], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Ju(e, t, n) {
        return e.createElement(t, n);
      }
      function yC(e, t) {
        t[En].changeDetectionScheduler?.notify(8),
          nc(e, t, t[V], 2, null, null);
      }
      function _C(e, t) {
        const n = e[Bo],
          r = t[Ue];
        (et(r) || t[Te] !== r[Ue][Te]) &&
          (e[N] |= Eu.HasTransplantedViews),
          null === n ? (e[Bo] = [t]) : n.push(t);
      }
      function lh(e, t) {
        const n = e[Bo],
          r = n.indexOf(t);
        n.splice(r, 1);
      }
      function bs(e, t) {
        if (e.length <= Fe) return;
        const n = Fe + t,
          r = e[n];
        if (r) {
          const o = r[Vr];
          null !== o && o !== e && lh(o, r),
            t > 0 && (e[n - 1][sn] = r[sn]);
          const i = du(e, Fe + t);
          !(function JO(e, t) {
            yC(e, t), (t[Me] = null), (t[nt] = null);
          })(r[b], r);
          const s = i[Bn];
          null !== s && s.detachView(i[b]),
            (r[Ue] = null),
            (r[sn] = null),
            (r[N] &= -129);
        }
        return r;
      }
      function ec(e, t) {
        if (!(256 & t[N])) {
          const n = t[V];
          n.destroyNode && nc(e, t, n, 3, null, null),
            (function tF(e) {
              let t = e[ts];
              if (!t) return dh(e[b], e);
              for (; t; ) {
                let n = null;
                if (et(t)) n = t[ts];
                else {
                  const r = t[Fe];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[sn] && t !== e; )
                    et(t) && dh(t[b], t), (t = t[Ue]);
                  null === t && (t = e),
                    et(t) && dh(t[b], t),
                    (n = t && t[sn]);
                }
                t = n;
              }
            })(t);
        }
      }
      function dh(e, t) {
        if (256 & t[N]) return;
        const n = F(null);
        try {
          (t[N] &= -129),
            (t[N] |= 256),
            t[Yt] && ld(t[Yt]),
            (function oF(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof cs)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        bn(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          bn(5, a, u);
                        }
                      }
                    else {
                      bn(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        bn(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function rF(e, t) {
              const n = e.cleanup,
                r = t[Lo];
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ('string' == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
                  } else n[i].call(r[n[i + 1]]);
              null !== r && (t[Lo] = null);
              const o = t[dr];
              if (null !== o) {
                t[dr] = null;
                for (let i = 0; i < o.length; i++) (0, o[i])();
              }
            })(e, t),
            1 === t[b].type && t[V].destroy();
          const r = t[Vr];
          if (null !== r && st(t[Ue])) {
            r !== t[Ue] && lh(r, t);
            const o = t[Bn];
            null !== o && o.detachView(e);
          }
          !(function Lx(e) {
            Pf.delete(e[Uo]);
          })(t);
        } finally {
          F(n);
        }
      }
      function fh(e, t, n) {
        return (function CC(e, t, n) {
          let r = t;
          for (; null !== r && 168 & r.type; ) r = (t = r).parent;
          if (null === r) return n[Me];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } =
                e.data[r.directiveStart + o];
              if (i === rn.None || i === rn.Emulated) return null;
            }
            return vt(r, n);
          }
        })(e, t.parent, n);
      }
      function Qr(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function DC(e, t, n) {
        e.appendChild(t, n);
      }
      function EC(e, t, n, r, o) {
        null !== r ? Qr(e, t, n, r, o) : DC(e, t, n);
      }
      function hh(e, t) {
        return e.parentNode(t);
      }
      function wC(e, t, n) {
        return IC(e, t, n);
      }
      let ph,
        IC = function bC(e, t, n) {
          return 40 & e.type ? vt(e, n) : null;
        };
      function tc(e, t, n, r) {
        const o = fh(e, r, t),
          i = t[V],
          a = wC(r.parent || t[nt], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) EC(i, o, n[u], a, !1);
          else EC(i, o, n, a, !1);
        void 0 !== ph && ph(i, r, t, n, o);
      }
      function Yr(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return vt(t, e);
          if (4 & n) return gh(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Yr(e, r);
            {
              const o = e[t.index];
              return st(o) ? gh(-1, o) : re(o);
            }
          }
          if (128 & n) return Yr(e, t.next);
          if (32 & n) return ah(t, e)() || re(e[t.index]);
          {
            const r = MC(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Yr($n(e[Te]), r)
              : Yr(e, t.next);
          }
        }
        return null;
      }
      function MC(e, t) {
        return null !== t ? e[Te][nt].projection[t.projection] : null;
      }
      function gh(e, t) {
        const n = Fe + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[b].firstChild;
          if (null !== o) return Yr(r, o);
        }
        return t[wn];
      }
      function mh(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          if (128 === n.type) {
            n = n.next;
            continue;
          }
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && at(re(a), r), (n.flags |= 2)),
            32 & ~n.flags)
          )
            if (8 & u)
              mh(e, t, n.child, r, o, i, !1), Xo(t, e, o, a, i);
            else if (32 & u) {
              const c = ah(n, r);
              let l;
              for (; (l = c()); ) Xo(t, e, o, l, i);
              Xo(t, e, o, a, i);
            } else 16 & u ? AC(e, t, r, n, o, i) : Xo(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function nc(e, t, n, r, o, i) {
        mh(n, r, e.firstChild, t, o, i, !1);
      }
      function AC(e, t, n, r, o, i) {
        const s = n[Te],
          u = s[nt].projection[r.projection];
        if (Array.isArray(u))
          for (let c = 0; c < u.length; c++) Xo(t, e, o, u[c], i);
        else {
          let c = u;
          const l = s[Ue];
          Lu(r) && (c.flags |= 128), mh(e, t, c, l, o, i, !0);
        }
      }
      function NC(e, t, n) {
        '' === n
          ? e.removeAttribute(t, 'class')
          : e.setAttribute(t, 'class', n);
      }
      function RC(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && Wd(e, t, r),
          null !== o && NC(e, t, o),
          null !== i &&
            (function cF(e, t, n) {
              e.setAttribute(t, 'style', n);
            })(e, t, i);
      }
      const $ = {};
      function se(e = 1) {
        xC(q(), v(), rt() + e, !1);
      }
      function xC(e, t, n, r) {
        if (!r)
          if (3 & ~t[N]) {
            const i = e.preOrderHooks;
            null !== i && Nu(t, i, 0, n);
          } else {
            const i = e.preOrderCheckHooks;
            null !== i && Au(t, i, n);
          }
        zr(n);
      }
      function E(e, t = Q.Default) {
        const n = v();
        return null === n ? T(e, t) : Jy(fe(), n, k(e), t);
      }
      function FC(e, t, n, r, o, i) {
        const s = F(null);
        try {
          let a = null;
          o & cr.SignalBased && (a = t[r][Oe]),
            null !== a &&
              void 0 !== a.transformFn &&
              (i = a.transformFn(i)),
            o & cr.HasDecoratorInputTransform &&
              (i = e.inputTransforms[r].call(t, i)),
            null !== e.setInput
              ? e.setInput(t, a, i, n, r)
              : Cy(t, a, r, i);
        } finally {
          F(s);
        }
      }
      function rc(e, t, n, r, o, i, s, a, u, c, l) {
        const d = t.blueprint.slice();
        return (
          (d[Me] = o),
          (d[N] = 204 | r),
          (null !== c || (e && 2048 & e[N])) && (d[N] |= 2048),
          Sy(d),
          (d[Ue] = d[Vo] = e),
          (d[_e] = n),
          (d[En] = s || (e && e[En])),
          (d[V] = a || (e && e[V])),
          (d[Be] = u || (e && e[Be]) || null),
          (d[nt] = i),
          (d[Uo] = (function kx() {
            return Fx++;
          })()),
          (d[mt] = l),
          (d[my] = c),
          (d[Te] = 2 == t.type ? e[Te] : d),
          d
        );
      }
      function Kr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function vh(e, t, n, r, o) {
            const i = Ry(),
              s = gf(),
              u = (e.data[t] = (function vF(e, t, n, r, o, i) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  Br() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child &&
                    null !== u.parent &&
                    (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function zR() {
              return j.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function as() {
            const e = j.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return un(i, !0), i;
      }
      function Ss(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function kC(e, t, n, r, o) {
        const i = rt(),
          s = 2 & r;
        try {
          zr(-1),
            s && t.length > A && xC(e, t, A, !1),
            bn(s ? 2 : 0, o),
            n(r, o);
        } finally {
          zr(i), bn(s ? 3 : 1, o);
        }
      }
      function yh(e, t, n) {
        if (sf(t)) {
          const r = F(null);
          try {
            const i = t.directiveEnd;
            for (let s = t.directiveStart; s < i; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, n[s], s);
            }
          } finally {
            F(r);
          }
        }
      }
      function _h(e, t, n) {
        Ny() &&
          ((function bF(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            jr(n) &&
              (function RF(e, t, n) {
                const r = vt(t, e),
                  o = PC(n);
                let s = 16;
                n.signals ? (s = 4096) : n.onPush && (s = 64);
                const a = oc(
                  e,
                  rc(
                    e,
                    o,
                    null,
                    s,
                    r,
                    t,
                    null,
                    e[En].rendererFactory.createRenderer(r, n),
                    null,
                    null,
                    null,
                  ),
                );
                e[t.index] = a;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || xu(n, t),
              at(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                c = qr(t, e, a, n);
              at(c, t),
                null !== s && xF(0, a - o, c, u, 0, s),
                an(u) && (zt(n.index, t)[_e] = qr(t, e, a, n));
            }
          })(e, t, n, vt(n, t)),
          !(64 & ~n.flags) && BC(e, t, n));
      }
      function Ch(e, t, n = vt) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function PC(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Dh(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id,
            ))
          : t;
      }
      function Dh(e, t, n, r, o, i, s, a, u, c, l) {
        const d = A + r,
          f = d + o,
          h = (function dF(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : $);
            return n;
          })(d, f),
          p = 'function' == typeof c ? c() : c;
        return (h[b] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof i ? i() : i,
          pipeRegistry: 'function' == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: l,
        });
      }
      let LC = () => null;
      function VC(e, t, n, r, o) {
        for (let i in t) {
          if (!t.hasOwnProperty(i)) continue;
          const s = t[i];
          if (void 0 === s) continue;
          r ??= {};
          let a,
            u = cr.None;
          Array.isArray(s) ? ((a = s[0]), (u = s[1])) : (a = s);
          let c = i;
          if (null !== o) {
            if (!o.hasOwnProperty(i)) continue;
            c = o[i];
          }
          0 === e ? jC(r, n, c, a, u) : jC(r, n, c, a);
        }
        return r;
      }
      function jC(e, t, n, r, o) {
        let i;
        e.hasOwnProperty(n)
          ? (i = e[n]).push(t, r)
          : (i = e[n] = [t, r]),
          void 0 !== o && i.push(o);
      }
      function Eh(e, t, n, r) {
        if (Ny()) {
          const o = null === r ? null : { '': -1 },
            i = (function SF(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (oy(t, s.selectors, !1))
                    if ((r || (r = []), an(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          wh(e, t, a.length);
                      } else r.unshift(s), wh(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && UC(e, t, n, s, o, a),
            o &&
              (function MF(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new D(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = Ki(n.mergedAttrs, n.attrs);
      }
      function UC(e, t, n, r, o, i) {
        for (let c = 0; c < r.length; c++) Tf(xu(n, t), e, r[c].type);
        !(function AF(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let c = 0; c < r.length; c++) {
          const l = r[c];
          l.providersResolver && l.providersResolver(l);
        }
        let s = !1,
          a = !1,
          u = Ss(e, t, r.length, null);
        for (let c = 0; c < r.length; c++) {
          const l = r[c];
          (n.mergedAttrs = Ki(n.mergedAttrs, l.hostAttrs)),
            NF(e, n, t, u, l),
            TF(u, l, o),
            null !== l.contentQueries && (n.flags |= 4),
            (null !== l.hostBindings ||
              null !== l.hostAttrs ||
              0 !== l.hostVars) &&
              (n.flags |= 64);
          const d = l.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            u++;
        }
        !(function yF(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            c = null;
          for (let l = t.directiveStart; l < o; l++) {
            const d = i[l],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = VC(0, d.inputs, l, u, f ? f.inputs : null)),
              (c = VC(1, d.outputs, l, c, p));
            const g =
              null === u || null === s || Zd(t) ? null : OF(u, l, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty('class') && (t.flags |= 8),
            u.hasOwnProperty('style') && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = c);
        })(e, n, i);
      }
      function BC(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function qR() {
            return j.lFrame.currentDirectiveIndex;
          })();
        try {
          zr(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              c = t[a];
            vf(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                IF(u, c);
          }
        } finally {
          zr(-1), vf(s);
        }
      }
      function IF(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function wh(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function TF(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++)
              n[t.exportAs[r]] = e;
          an(t) && (n[''] = e);
        }
      }
      function NF(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Pr(o.type)),
          s = new cs(i, an(o), E);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function EF(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function wF(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ('number' == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, Ss(e, n, o.hostVars, $), o);
      }
      function Mn(e, t, n, r, o, i) {
        const s = vt(e, t);
        !(function bh(e, t, n, r, o, i, s) {
          if (null == i) e.removeAttribute(t, o, n);
          else {
            const a = null == s ? B(i) : s(i, r || '', o);
            e.setAttribute(t, o, a, n);
          }
        })(t[V], s, i, e.value, n, r, o);
      }
      function xF(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s)
          for (let a = 0; a < s.length; )
            FC(r, n, s[a++], s[a++], s[a++], s[a++]);
      }
      function OF(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ('number' == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 3)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], s[a + 2], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function $C(e, t, n, r) {
        return [e, !0, 0, t, null, r, null, n, null, null];
      }
      function HC(e, t) {
        const n = e.contentQueries;
        if (null !== n) {
          const r = F(null);
          try {
            for (let o = 0; o < n.length; o += 2) {
              const s = n[o + 1];
              if (-1 !== s) {
                const a = e.data[s];
                Mu(n[o]), a.contentQueries(2, t[s], s);
              }
            }
          } finally {
            F(r);
          }
        }
      }
      function oc(e, t) {
        return e[ts] ? (e[gy][sn] = t) : (e[ts] = t), (e[gy] = t), t;
      }
      function Ih(e, t, n) {
        Mu(0);
        const r = F(null);
        try {
          t(e, n);
        } finally {
          F(r);
        }
      }
      function zC(e) {
        return (e[Lo] ??= []);
      }
      function GC(e) {
        return (e.cleanup ??= []);
      }
      function ic(e, t) {
        const n = e[Be],
          r = n ? n.get(ln, null) : null;
        r && r.handleError(t);
      }
      function Sh(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = n[i++];
          FC(e.data[s], t[s], r, a, u, o);
        }
      }
      function FF(e, t) {
        const n = zt(t, e),
          r = n[b];
        !(function kF(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const o = n[Me];
        null !== o && null === n[mt] && (n[mt] = qf(o, n[Be])),
          Mh(r, n, n[_e]);
      }
      function Mh(e, t, n) {
        Cf(t);
        try {
          const r = e.viewQuery;
          null !== r && Ih(1, r, n);
          const o = e.template;
          null !== o && kC(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            t[Bn]?.finishViewCreation(e),
            e.staticContentQueries && HC(e, t),
            e.staticViewQueries && Ih(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function PF(e, t) {
              for (let n = 0; n < t.length; n++) FF(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0),
              (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[N] &= -5), Df();
        }
      }
      function Jo(e, t, n, r) {
        const o = F(null);
        try {
          const i = t.tView,
            u = rc(
              e,
              i,
              n,
              4096 & e[N] ? 4096 : 16,
              null,
              t,
              null,
              null,
              r?.injector ?? null,
              r?.embeddedViewInjector ?? null,
              r?.dehydratedView ?? null,
            );
          u[Vr] = e[t.index];
          const l = e[Bn];
          return (
            null !== l && (u[Bn] = l.createEmbeddedView(i)),
            Mh(i, u, n),
            u
          );
        } finally {
          F(o);
        }
      }
      function WC(e, t) {
        const n = Fe + t;
        if (n < e.length) return e[n];
      }
      function Xr(e, t) {
        return !t || null === t.firstChild || Lu(e);
      }
      function ei(e, t, n, r = !0) {
        const o = t[b];
        if (
          ((function nF(e, t, n, r) {
            const o = Fe + r,
              i = n.length;
            r > 0 && (n[o - 1][sn] = t),
              r < i - Fe
                ? ((t[sn] = n[o]), Yv(n, Fe + r, t))
                : (n.push(t), (t[sn] = null)),
              (t[Ue] = n);
            const s = t[Vr];
            null !== s && n !== s && _C(s, t);
            const a = t[Bn];
            null !== a && a.insertView(e), ff(t), (t[N] |= 128);
          })(o, t, e, n),
          r)
        ) {
          const s = gh(n, e),
            a = t[V],
            u = hh(a, e[wn]);
          null !== u &&
            (function eF(e, t, n, r, o, i) {
              (r[Me] = o), (r[nt] = t), nc(e, r, n, 1, o, i);
            })(o, e[nt], a, t, u, s);
        }
        const i = t[mt];
        null !== i && null !== i.firstChild && (i.firstChild = null);
      }
      function Th(e, t) {
        const n = bs(e, t);
        return void 0 !== n && ec(n[b], n), n;
      }
      function Ms(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          if (128 === n.type) {
            n = o ? n.projectionNext : n.next;
            continue;
          }
          const i = t[n.index];
          null !== i && r.push(re(i)), st(i) && ZC(i, r);
          const s = n.type;
          if (8 & s) Ms(e, t, n.child, r);
          else if (32 & s) {
            const a = ah(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = MC(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = $n(t[Te]);
              Ms(u[b], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      function ZC(e, t) {
        for (let n = Fe; n < e.length; n++) {
          const r = e[n],
            o = r[b].firstChild;
          null !== o && Ms(r[b], r, o, t);
        }
        e[wn] !== e[Me] && t.push(e[wn]);
      }
      let QC = [];
      const UF = {
          ...W,
          consumerIsAlwaysLive: !0,
          consumerMarkedDirty: e => {
            bu(e.lView);
          },
          consumerOnSignalRead() {
            this.lView[Yt] = this;
          },
        },
        $F = {
          ...W,
          consumerIsAlwaysLive: !0,
          consumerMarkedDirty: e => {
            let t = $n(e.lView);
            for (; t && !YC(t[b]); ) t = $n(t);
            t && My(t);
          },
          consumerOnSignalRead() {
            this.lView[Yt] = this;
          },
        };
      function YC(e) {
        return 2 !== e.type;
      }
      const HF = 100;
      function sc(e, t = !0, n = 0) {
        const r = e[En],
          o = r.rendererFactory;
        o.begin?.();
        try {
          !(function zF(e, t) {
            const n = Fy();
            try {
              ky(!0), Ah(e, t);
              let r = 0;
              for (; ss(e); ) {
                if (r === HF) throw new D(103, !1);
                r++, Ah(e, 1);
              }
            } finally {
              ky(n);
            }
          })(e, n);
        } catch (s) {
          throw (t && ic(e, s), s);
        } finally {
          o.end?.(), r.inlineEffectRunner?.flush();
        }
      }
      function GF(e, t, n, r) {
        const o = t[N];
        if (!(256 & ~o)) return;
        t[En].inlineEffectRunner?.flush(), Cf(t);
        let a = !0,
          u = null,
          c = null;
        YC(e)
          ? ((c = (function LF(e) {
              return (
                e[Yt] ??
                (function VF(e) {
                  const t = QC.pop() ?? Object.create(UF);
                  return (t.lView = e), t;
                })(e)
              );
            })(t)),
            (u = Ga(c)))
          : null ===
            (function Se() {
              return he;
            })()
          ? ((a = !1),
            (c = (function BF(e) {
              const t = e[Yt] ?? Object.create($F);
              return (t.lView = e), t;
            })(t)),
            (u = Ga(c)))
          : t[Yt] && (ld(t[Yt]), (t[Yt] = null));
        try {
          Sy(t),
            (function Py(e) {
              return (j.lFrame.bindingIndex = e);
            })(e.bindingStartIndex),
            null !== n && kC(e, t, n, 2, r);
          const l = !(3 & ~o);
          if (l) {
            const h = e.preOrderCheckHooks;
            null !== h && Au(t, h, null);
          } else {
            const h = e.preOrderHooks;
            null !== h && Nu(t, h, 0, null), Ef(t, 0);
          }
          if (
            ((function qF(e) {
              for (let t = M_(e); null !== t; t = T_(t)) {
                if (!(t[N] & Eu.HasTransplantedViews)) continue;
                const n = t[Bo];
                for (let r = 0; r < n.length; r++) My(n[r]);
              }
            })(t),
            XC(t, 0),
            null !== e.contentQueries && HC(e, t),
            l)
          ) {
            const h = e.contentCheckHooks;
            null !== h && Au(t, h);
          } else {
            const h = e.contentHooks;
            null !== h && Nu(t, h, 1), Ef(t, 1);
          }
          !(function lF(e, t) {
            const n = e.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let r = 0; r < n.length; r++) {
                  const o = n[r];
                  if (o < 0) zr(~o);
                  else {
                    const i = o,
                      s = n[++r],
                      a = n[++r];
                    GR(s, i), a(2, t[i]);
                  }
                }
              } finally {
                zr(-1);
              }
          })(e, t);
          const d = e.components;
          null !== d && eD(t, d, 0);
          const f = e.viewQuery;
          if ((null !== f && Ih(2, f, r), l)) {
            const h = e.viewCheckHooks;
            null !== h && Au(t, h);
          } else {
            const h = e.viewHooks;
            null !== h && Nu(t, h, 2), Ef(t, 2);
          }
          if (
            (!0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
            t[Cu])
          ) {
            for (const h of t[Cu]) h();
            t[Cu] = null;
          }
          t[N] &= -73;
        } catch (l) {
          throw (bu(t), l);
        } finally {
          null !== c &&
            (ud(c, u),
            a &&
              (function jF(e) {
                e.lView[Yt] !== e && ((e.lView = null), QC.push(e));
              })(c)),
            Df();
        }
      }
      function XC(e, t) {
        for (let n = M_(e); null !== n; n = T_(n))
          for (let r = Fe; r < n.length; r++) JC(n[r], t);
      }
      function WF(e, t, n) {
        JC(zt(t, e), n);
      }
      function JC(e, t) {
        df(e) && Ah(e, t);
      }
      function Ah(e, t) {
        const r = e[b],
          o = e[N],
          i = e[Yt];
        let s = !!(0 === t && 16 & o);
        if (
          ((s ||= !!(64 & o && 0 === t)),
          (s ||= !!(1024 & o)),
          (s ||= !(!i?.dirty || !cd(i))),
          (s ||= !1),
          i && (i.dirty = !1),
          (e[N] &= -9217),
          s)
        )
          GF(r, e, r.template, e[_e]);
        else if (8192 & o) {
          XC(e, 1);
          const a = r.components;
          null !== a && eD(e, a, 1);
        }
      }
      function eD(e, t, n) {
        for (let r = 0; r < t.length; r++) WF(e, t[r], n);
      }
      function Ts(e, t) {
        const n = Fy() ? 64 : 1088;
        for (e[En].changeDetectionScheduler?.notify(t); e; ) {
          e[N] |= n;
          const r = $n(e);
          if (rs(e) && !r) return e;
          e = r;
        }
        return null;
      }
      class As {
        get rootNodes() {
          const t = this._lView,
            n = t[b];
          return Ms(n, t, n.firstChild, []);
        }
        constructor(t, n, r = !0) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this.notifyErrorHandler = r),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[_e];
        }
        set context(t) {
          this._lView[_e] = t;
        }
        get destroyed() {
          return !(256 & ~this._lView[N]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[Ue];
            if (st(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (bs(t, r), du(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          ec(this._lView[b], this._lView);
        }
        onDestroy(t) {
          Iu(this._lView, t);
        }
        markForCheck() {
          Ts(this._cdRefInjectingView || this._lView, 4);
        }
        detach() {
          this._lView[N] &= -129;
        }
        reattach() {
          ff(this._lView), (this._lView[N] |= 128);
        }
        detectChanges() {
          (this._lView[N] |= 1024),
            sc(this._lView, this.notifyErrorHandler);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new D(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          this._appRef = null;
          const t = rs(this._lView),
            n = this._lView[Vr];
          null !== n && !t && lh(n, this._lView),
            yC(this._lView[b], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new D(902, !1);
          this._appRef = t;
          const n = rs(this._lView),
            r = this._lView[Vr];
          null !== r && !n && _C(r, this._lView), ff(this._lView);
        }
      }
      let Wn = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = YF);
        }
        return e;
      })();
      const ZF = Wn,
        QF = class extends ZF {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n);
          }
          createEmbeddedViewImpl(t, n, r) {
            const o = Jo(
              this._declarationLView,
              this._declarationTContainer,
              t,
              {
                embeddedViewInjector: n,
                dehydratedView: r,
              },
            );
            return new As(o);
          }
        };
      function YF() {
        return ac(fe(), v());
      }
      function ac(e, t) {
        return 4 & e.type ? new QF(t, e, Go(e, t)) : null;
      }
      let DD = () => null;
      function eo(e, t) {
        return DD(e, t);
      }
      class ni {}
      const Ls = new w('', { providedIn: 'root', factory: () => !1 }),
        ED = new w('');
      class $k {}
      class wD {}
      class zk {
        resolveComponentFactory(t) {
          throw (function Hk(e) {
            const t = Error(
              `No component factory found for ${qe(e)}.`,
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      class hc {
        static #e = (this.NULL = new zk());
      }
      class Uh {}
      let Zn = (() => {
          class e {
            constructor() {
              this.destroyNode = null;
            }
            static #e = (this.__NG_ELEMENT_ID__ = () =>
              (function Gk() {
                const e = v(),
                  n = zt(fe().index, e);
                return (et(n) ? n : e)[V];
              })());
          }
          return e;
        })(),
        qk = (() => {
          class e {
            static #e = (this.ɵprov = S({
              token: e,
              providedIn: 'root',
              factory: () => null,
            }));
          }
          return e;
        })();
      const ID = new Set();
      function _t(e) {
        ID.has(e) ||
          (ID.add(e),
          performance?.mark?.('mark_feature_usage', {
            detail: { feature: e },
          }));
      }
      let pc = (() => {
        class e {
          constructor() {
            (this.handler = null), (this.internalCallbacks = []);
          }
          execute() {
            this.executeInternalCallbacks(), this.handler?.execute();
          }
          executeInternalCallbacks() {
            const n = [...this.internalCallbacks];
            this.internalCallbacks.length = 0;
            for (const r of n) r();
          }
          ngOnDestroy() {
            this.handler?.destroy(),
              (this.handler = null),
              (this.internalCallbacks.length = 0);
          }
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: 'root',
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function mc(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            'number' == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Ad(o, a))
              : 2 == i && (r = Ad(r, a + ': ' + t[++s] + ';'));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      class ND extends hc {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = Z(t);
          return new Us(n, this.ngModule);
        }
      }
      function RD(e, t) {
        const n = [];
        for (const r in e) {
          if (!e.hasOwnProperty(r)) continue;
          const o = e[r];
          if (void 0 === o) continue;
          const i = Array.isArray(o),
            s = i ? o[0] : o;
          n.push(
            t
              ? {
                  propName: s,
                  templateName: r,
                  isSignal: !!((i ? o[1] : cr.None) & cr.SignalBased),
                }
              : { propName: s, templateName: r },
          );
        }
        return n;
      }
      class Us extends wD {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = RD(t.inputs, !0);
          if (null !== n)
            for (const o of r)
              n.hasOwnProperty(o.propName) &&
                (o.transform = n[o.propName]);
          return r;
        }
        get outputs() {
          return RD(this.componentDef.outputs, !1);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function tR(e) {
              return e.map(eR).join(',');
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          const i = F(null);
          try {
            let s =
              (o = o || this.ngModule) instanceof Ht
                ? o
                : o?.injector;
            s &&
              null !== this.componentDef.getStandaloneInjector &&
              (s = this.componentDef.getStandaloneInjector(s) || s);
            const a = s ? new Gr(t, s) : t,
              u = a.get(Uh, null);
            if (null === u) throw new D(407, !1);
            const c = a.get(qk, null),
              f = {
                rendererFactory: u,
                sanitizer: c,
                inlineEffectRunner: null,
                afterRenderEventManager: a.get(pc, null),
                changeDetectionScheduler: a.get(ni, null),
              },
              h = u.createRenderer(null, this.componentDef),
              p = this.componentDef.selectors[0][0] || 'div',
              g = r
                ? (function fF(e, t, n, r) {
                    const i = r.get(q_, !1) || n === rn.ShadowDom,
                      s = e.selectRootElement(t, i);
                    return (
                      (function hF(e) {
                        LC(e);
                      })(s),
                      s
                    );
                  })(h, r, this.componentDef.encapsulation, a)
                : Ju(
                    h,
                    p,
                    (function eP(e) {
                      const t = e.toLowerCase();
                      return 'svg' === t
                        ? 'svg'
                        : 'math' === t
                        ? 'math'
                        : null;
                    })(p),
                  );
            let m = 512;
            this.componentDef.signals
              ? (m |= 4096)
              : this.componentDef.onPush || (m |= 16);
            let C = null;
            null !== g && (C = qf(g, a, !0));
            const y = Dh(
                0,
                null,
                null,
                1,
                0,
                null,
                null,
                null,
                null,
                null,
                null,
              ),
              M = rc(null, y, null, m, null, null, f, h, a, null, C);
            let H, X;
            Cf(M);
            try {
              const Re = this.componentDef;
              let Pt,
                zi = null;
              Re.findHostDirectiveDefs
                ? ((Pt = []),
                  (zi = new Map()),
                  Re.findHostDirectiveDefs(Re, Pt, zi),
                  Pt.push(Re))
                : (Pt = [Re]);
              const X0 = (function nP(e, t) {
                  const n = e[b],
                    r = A;
                  return (e[r] = t), Kr(n, r, 2, '#host', null);
                })(M, g),
                xq = (function rP(e, t, n, r, o, i, s) {
                  const a = o[b];
                  !(function oP(e, t, n, r) {
                    for (const o of e)
                      t.mergedAttrs = Ki(t.mergedAttrs, o.hostAttrs);
                    null !== t.mergedAttrs &&
                      (mc(t, t.mergedAttrs, !0),
                      null !== n && RC(r, n, t));
                  })(r, e, t, s);
                  let u = null;
                  null !== t && (u = qf(t, o[Be]));
                  const c = i.rendererFactory.createRenderer(t, n);
                  let l = 16;
                  n.signals ? (l = 4096) : n.onPush && (l = 64);
                  const d = rc(
                    o,
                    PC(n),
                    null,
                    l,
                    o[e.index],
                    e,
                    i,
                    c,
                    null,
                    null,
                    u,
                  );
                  return (
                    a.firstCreatePass && wh(a, e, r.length - 1),
                    oc(o, d),
                    (o[e.index] = d)
                  );
                })(X0, g, Re, Pt, M, f, h);
              (X = is(y, A)),
                g &&
                  (function sP(e, t, n, r) {
                    if (r) Wd(e, n, ['ng-version', '18.1.4']);
                    else {
                      const { attrs: o, classes: i } = (function nR(
                        e,
                      ) {
                        const t = [],
                          n = [];
                        let r = 1,
                          o = 2;
                        for (; r < e.length; ) {
                          let i = e[r];
                          if ('string' == typeof i)
                            2 === o
                              ? '' !== i && t.push(i, e[++r])
                              : 8 === o && n.push(i);
                          else {
                            if (!on(o)) break;
                            o = i;
                          }
                          r++;
                        }
                        return { attrs: t, classes: n };
                      })(t.selectors[0]);
                      o && Wd(e, n, o),
                        i && i.length > 0 && NC(e, n, i.join(' '));
                    }
                  })(h, Re, g, r),
                void 0 !== n &&
                  (function aP(e, t, n) {
                    const r = (e.projection = []);
                    for (let o = 0; o < t.length; o++) {
                      const i = n[o];
                      r.push(null != i ? Array.from(i) : null);
                    }
                  })(X, this.ngContentSelectors, n),
                (H = (function iP(e, t, n, r, o, i) {
                  const s = fe(),
                    a = o[b],
                    u = vt(s, o);
                  UC(a, o, s, n, null, r);
                  for (let l = 0; l < n.length; l++)
                    at(qr(o, a, s.directiveStart + l, s), o);
                  BC(a, o, s), u && at(u, o);
                  const c = qr(
                    o,
                    a,
                    s.directiveStart + s.componentOffset,
                    s,
                  );
                  if (((e[_e] = o[_e] = c), null !== i))
                    for (const l of i) l(c, t);
                  return yh(a, s, o), c;
                })(xq, Re, Pt, zi, M, [uP])),
                Mh(y, M, null);
            } finally {
              Df();
            }
            return new tP(this.componentType, H, Go(X, M), M, X);
          } finally {
            F(i);
          }
        }
      }
      class tP extends $k {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef =
              new As(o, void 0, !1)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const i = this._rootLView;
            Sh(i[b], i, o, t, n),
              this.previousInputValues.set(t, n),
              Ts(zt(this._tNode.index, i), 1);
          }
        }
        get injector() {
          return new Qe(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function uP() {
        const e = fe();
        Tu(v()[b], e);
      }
      let dn = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = cP);
        }
        return e;
      })();
      function cP() {
        return FD(fe(), v());
      }
      const lP = dn,
        xD = class extends lP {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Go(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Qe(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ou(this._hostTNode, this._hostLView);
            if (If(t)) {
              const n = ds(t, this._hostLView),
                r = ls(t);
              return new Qe(n[b].data[r + 8], n);
            }
            return new Qe(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = OD(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Fe;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            'number' == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = eo(this._lContainer, t.ssrId),
              a = t.createEmbeddedViewImpl(n || {}, i, s);
            return this.insertImpl(a, o, Xr(this._hostTNode, s)), a;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function es(e) {
                return 'function' == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const p = n || {};
              (a = p.index),
                (r = p.injector),
                (o = p.projectableNodes),
                (i = p.environmentInjector || p.ngModuleRef);
            }
            const u = s ? t : new Us(Z(t)),
              c = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const g = (s ? c : this.parentInjector).get(Ht, null);
              g && (i = g);
            }
            const l = Z(u.componentType ?? {}),
              d = eo(this._lContainer, l?.id ?? null),
              h = u.create(c, o, d?.firstChild ?? null, i);
            return (
              this.insertImpl(h.hostView, a, Xr(this._hostTNode, d)),
              h
            );
          }
          insert(t, n) {
            return this.insertImpl(t, n, !0);
          }
          insertImpl(t, n, r) {
            const o = t._lView;
            if (
              (function kR(e) {
                return st(e[Ue]);
              })(o)
            ) {
              const a = this.indexOf(t);
              if (-1 !== a) this.detach(a);
              else {
                const u = o[Ue],
                  c = new xD(u, u[nt], u[Ue]);
                c.detach(c.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            return (
              ei(s, o, i, r),
              t.attachToViewContainerRef(),
              Yv(zh(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = OD(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = bs(this._lContainer, n);
            r && (du(zh(this._lContainer), n), ec(r[b], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = bs(this._lContainer, n);
            return r && null != du(zh(this._lContainer), n)
              ? new As(r)
              : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function OD(e) {
        return e[8];
      }
      function zh(e) {
        return e[8] || (e[8] = []);
      }
      function FD(e, t) {
        let n;
        const r = t[e.index];
        return (
          st(r)
            ? (n = r)
            : ((n = $C(r, t, null, e)), (t[e.index] = n), oc(t, n)),
          kD(n, t, e, r),
          new xD(n, e, t)
        );
      }
      let kD = function LD(e, t, n, r) {
          if (e[wn]) return;
          let o;
          (o =
            8 & n.type
              ? re(r)
              : (function dP(e, t) {
                  const n = e[V],
                    r = n.createComment(''),
                    o = vt(t, e);
                  return (
                    Qr(
                      n,
                      hh(n, o),
                      r,
                      (function iF(e, t) {
                        return e.nextSibling(t);
                      })(n, o),
                      !1,
                    ),
                    r
                  );
                })(t, n)),
            (e[wn] = o);
        },
        Gh = () => !1;
      class qh {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new qh(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Wh {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries
                  ? t.contentQueries[0]
                  : n.length,
              o = [];
            for (let i = 0; i < r; i++) {
              const s = n.getByIndex(i);
              o.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Wh(o);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        finishViewCreation(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== Xh(t, n).matches && this.queries[n].setDirty();
        }
      }
      class VD {
        constructor(t, n, r = null) {
          (this.flags = n),
            (this.read = r),
            (this.predicate =
              'string' == typeof t
                ? (function _P(e) {
                    return e.split(',').map(t => t.trim());
                  })(t)
                : t);
        }
      }
      class Zh {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const o = null !== n ? n.length : 0,
              i = this.getByIndex(r).embeddedTView(t, o);
            i &&
              ((i.indexInDeclarationView = r),
              null !== n ? n.push(i) : (n = [i]));
          }
          return null !== n ? new Zh(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Qh {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new Qh(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 & ~this.metadata.flags) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; )
              r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let o = 0; o < r.length; o++) {
              const i = r[o];
              this.matchTNodeWithReadOption(t, n, gP(n, i)),
                this.matchTNodeWithReadOption(
                  t,
                  n,
                  Fu(n, t, i, !1, !1),
                );
            }
          else
            r === Wn
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(
                  t,
                  n,
                  Fu(n, t, r, !1, !1),
                );
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === Gt || o === dn || (o === Wn && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const i = Fu(n, t, o, !1, !1);
                null !== i && this.addMatch(n.index, i);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n);
        }
      }
      function gP(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2)
            if (n[r] === t) return n[r + 1];
        return null;
      }
      function vP(e, t, n, r) {
        return -1 === n
          ? (function mP(e, t) {
              return 11 & e.type
                ? Go(e, t)
                : 4 & e.type
                ? ac(e, t)
                : null;
            })(t, e)
          : -2 === n
          ? (function yP(e, t, n) {
              return n === Gt
                ? Go(t, e)
                : n === Wn
                ? ac(t, e)
                : n === dn
                ? FD(t, e)
                : void 0;
            })(e, t, r)
          : qr(e, e[b], n, t);
      }
      function jD(e, t, n, r) {
        const o = t[Bn].queries[r];
        if (null === o.matches) {
          const i = e.data,
            s = n.matches,
            a = [];
          for (let u = 0; null !== s && u < s.length; u += 2) {
            const c = s[u];
            a.push(
              c < 0 ? null : vP(t, i[c], s[u + 1], n.metadata.read),
            );
          }
          o.matches = a;
        }
        return o.matches;
      }
      function Yh(e, t, n, r) {
        const o = e.queries.getByIndex(n),
          i = o.matches;
        if (null !== i) {
          const s = jD(e, t, o, n);
          for (let a = 0; a < i.length; a += 2) {
            const u = i[a];
            if (u > 0) r.push(s[a / 2]);
            else {
              const c = i[a + 1],
                l = t[-u];
              for (let d = Fe; d < l.length; d++) {
                const f = l[d];
                f[Vr] === f[Ue] && Yh(f[b], f, c, r);
              }
              if (null !== l[Bo]) {
                const d = l[Bo];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  Yh(h[b], h, c, r);
                }
              }
            }
          }
        }
        return r;
      }
      function BD(e, t, n) {
        const r = q();
        return (
          r.firstCreatePass &&
            ((function HD(e, t, n) {
              null === e.queries && (e.queries = new Zh()),
                e.queries.track(new Qh(t, n));
            })(r, new VD(e, t, n), -1),
            !(2 & ~t) && (r.staticViewQueries = !0)),
          (function UD(e, t, n) {
            const r = new kf(!(4 & ~n));
            return (
              (function mF(e, t, n, r) {
                const o = zC(t);
                o.push(n),
                  e.firstCreatePass && GC(e).push(r, o.length - 1);
              })(e, t, r, r.destroy),
              (t[Bn] ??= new Wh()).queries.push(new qh(r)) - 1
            );
          })(r, v(), t)
        );
      }
      function Xh(e, t) {
        return e.queries.getByIndex(t);
      }
      function zD(e, t) {
        const n = e[b],
          r = Xh(n, t);
        return r.crossesNgTemplate ? Yh(n, e, t, []) : jD(n, e, r, t);
      }
      function yr(e, t) {
        _t('NgSignals');
        const n = (function oA(e) {
            const t = Object.create(sA);
            t.value = e;
            const n = () => (Je(t), t.value);
            return (n[Oe] = t), n;
          })(e),
          r = n[Oe];
        return (
          t?.equal && (r.equal = t.equal),
          (n.set = o => uv(r, o)),
          (n.update = o =>
            (function iA(e, t) {
              tv() || av(), uv(e, t(e.value));
            })(r, o)),
          (n.asReadonly = qD.bind(n)),
          n
        );
      }
      function qD() {
        const e = this[Oe];
        if (void 0 === e.readonlyFn) {
          const t = () => this();
          (t[Oe] = e), (e.readonlyFn = t);
        }
        return e.readonlyFn;
      }
      function le(e) {
        let t = (function oE(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (an(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new D(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = yc(e.inputs)),
                (s.inputTransforms = yc(e.inputTransforms)),
                (s.declaredInputs = yc(e.declaredInputs)),
                (s.outputs = yc(e.outputs));
              const a = o.hostBindings;
              a && FP(e, a);
              const u = o.viewQuery,
                c = o.contentQueries;
              if (
                (u && xP(e, u),
                c && OP(e, c),
                NP(e, o),
                EN(e.outputs, o.outputs),
                an(o) && o.data.animation)
              ) {
                const l = e.data;
                l.animation = (l.animation || []).concat(
                  o.data.animation,
                );
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === le && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function RP(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = Ki(
                o.hostAttrs,
                (n = Ki(n, o.hostAttrs)),
              ));
          }
        })(r);
      }
      function NP(e, t) {
        for (const n in t.inputs) {
          if (
            !t.inputs.hasOwnProperty(n) ||
            e.inputs.hasOwnProperty(n)
          )
            continue;
          const r = t.inputs[n];
          if (
            void 0 !== r &&
            ((e.inputs[n] = r),
            (e.declaredInputs[n] = t.declaredInputs[n]),
            null !== t.inputTransforms)
          ) {
            const o = Array.isArray(r) ? r[0] : r;
            if (!t.inputTransforms.hasOwnProperty(o)) continue;
            (e.inputTransforms ??= {}),
              (e.inputTransforms[o] = t.inputTransforms[o]);
          }
        }
      }
      function yc(e) {
        return e === Dn ? {} : e === ne ? [] : e;
      }
      function xP(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function OP(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function FP(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function uE(e) {
        const t = e.inputConfig,
          n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            const o = t[r];
            Array.isArray(o) && o[3] && (n[r] = o[3]);
          }
        e.inputTransforms = n;
      }
      class to {}
      class cE {}
      class ep extends to {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new ND(this));
          const o = it(t);
          (this._bootstrapComponents = qt(o.bootstrap)),
            (this._r3Injector = c_(
              t,
              n,
              [
                { provide: to, useValue: this },
                {
                  provide: hc,
                  useValue: this.componentFactoryResolver,
                },
                ...r,
              ],
              qe(t),
              new Set(['environment']),
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach(n => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class tp extends cE {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new ep(this.moduleType, t, []);
        }
      }
      class lE extends to {
        constructor(t) {
          super(),
            (this.componentFactoryResolver = new ND(this)),
            (this.instance = null);
          const n = new Fo(
            [
              ...t.providers,
              { provide: to, useValue: this },
              {
                provide: hc,
                useValue: this.componentFactoryResolver,
              },
            ],
            t.parent || yu(),
            t.debugName,
            new Set(['environment']),
          );
          (this.injector = n),
            t.runEnvironmentInitializers &&
              n.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function np(e, t, n = null) {
        return new lE({
          providers: e,
          parent: t,
          debugName: n,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      function rp(e) {
        return (
          null !== e &&
          ('function' == typeof e || 'object' == typeof e)
        );
      }
      function ke(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Hs(e, t, n, r, o, i, s, a, u, c) {
        const l = n + A,
          d = t.firstCreatePass
            ? (function qP(e, t, n, r, o, i, s, a, u) {
                const c = t.consts,
                  l = Kr(t, e, 4, s || null, a || null);
                Eh(t, n, l, Xt(c, u)), Tu(t, l);
                const d = (l.tView = Dh(
                  2,
                  l,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  c,
                  null,
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, l),
                    (d.queries = t.queries.embeddedTView(l))),
                  l
                );
              })(l, t, e, r, o, i, s, a, u)
            : t.data[l];
        un(d, !1);
        const f = dE(t, e, d, n);
        us() && tc(t, e, f, d), at(f, e);
        const h = $C(f, e, f, d);
        return (
          (e[l] = h),
          oc(e, h),
          (function PD(e, t, n) {
            return Gh(e, t, n);
          })(h, d, e),
          wu(d) && _h(t, e, d),
          null != u && Ch(e, d, c),
          d
        );
      }
      function _r(e, t, n, r, o, i, s, a) {
        const u = v(),
          c = q();
        return Hs(u, c, e, t, n, r, o, Xt(c.consts, i), s, a), _r;
      }
      let dE = function fE(e, t, n, r) {
        return In(!0), t[V].createComment('');
      };
      function An(e, t, n, r) {
        const o = v();
        return ke(o, cn(), t) && (q(), Mn(Ce(), o, e, t, n, r)), An;
      }
      function Sc(e, t) {
        return (e << 17) | (t << 2);
      }
      function Dr(e) {
        return (e >> 17) & 32767;
      }
      function pp(e) {
        return 2 | e;
      }
      function oo(e) {
        return (131068 & e) >> 2;
      }
      function gp(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function mp(e) {
        return 1 | e;
      }
      function HE(e, t, n, r) {
        const o = e[n + 1],
          i = null === t;
        let s = r ? Dr(o) : oo(o),
          a = !1;
        for (; 0 !== s && (!1 === a || i); ) {
          const c = e[s + 1];
          x1(e[s], t) && ((a = !0), (e[s + 1] = r ? mp(c) : pp(c))),
            (s = r ? Dr(c) : oo(c));
        }
        a && (e[n + 1] = r ? pp(o) : mp(o));
      }
      function x1(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || 'string' != typeof t) &&
            xo(e, t) >= 0)
        );
      }
      function P(e, t, n) {
        const r = v();
        return (
          ke(r, cn(), t) &&
            (function Ot(e, t, n, r, o, i, s, a) {
              const u = vt(t, n);
              let l,
                c = t.inputs;
              !a && null != c && (l = c[r])
                ? (Sh(e, n, l, r, o),
                  jr(t) &&
                    (function CF(e, t) {
                      const n = zt(t, e);
                      16 & n[N] || (n[N] |= 64);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function _F(e) {
                    return 'class' === e
                      ? 'className'
                      : 'for' === e
                      ? 'htmlFor'
                      : 'formaction' === e
                      ? 'formAction'
                      : 'innerHtml' === e
                      ? 'innerHTML'
                      : 'readonly' === e
                      ? 'readOnly'
                      : 'tabindex' === e
                      ? 'tabIndex'
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || '', r) : o),
                  i.setProperty(u, r, o));
            })(q(), Ce(), r, e, t, r[V], n, !1),
          P
        );
      }
      function vp(e, t, n, r, o) {
        const s = o ? 'class' : 'style';
        Sh(e, n, t.inputs[s], s, r);
      }
      function yp(e, t, n) {
        return fn(e, t, n, !1), yp;
      }
      function Mc(e, t) {
        return fn(e, t, null, !0), Mc;
      }
      function fn(e, t, n, r) {
        const o = v(),
          i = q(),
          s = (function zn(e) {
            const t = j.lFrame,
              n = t.bindingIndex;
            return (t.bindingIndex = t.bindingIndex + e), n;
          })(2);
        i.firstUpdatePass &&
          (function KE(e, t, n, r) {
            const o = e.data;
            if (null === o[n + 1]) {
              const i = o[rt()],
                s = (function YE(e, t) {
                  return t >= e.expandoStartIndex;
                })(e, n);
              (function tw(e, t) {
                return !!(e.flags & (t ? 8 : 16));
              })(i, r) &&
                null === t &&
                !s &&
                (t = !1),
                (t = (function B1(e, t, n, r) {
                  const o = (function yf(e) {
                    const t = j.lFrame.currentDirectiveIndex;
                    return -1 === t ? null : e[t];
                  })(e);
                  let i = r ? t.residualClasses : t.residualStyles;
                  if (null === o)
                    0 === (r ? t.classBindings : t.styleBindings) &&
                      ((n = Ws(
                        (n = _p(null, e, t, n, r)),
                        t.attrs,
                        r,
                      )),
                      (i = null));
                  else {
                    const s = t.directiveStylingLast;
                    if (-1 === s || e[s] !== o)
                      if (((n = _p(o, e, t, n, r)), null === i)) {
                        let u = (function $1(e, t, n) {
                          const r = n
                            ? t.classBindings
                            : t.styleBindings;
                          if (0 !== oo(r)) return e[Dr(r)];
                        })(e, t, r);
                        void 0 !== u &&
                          Array.isArray(u) &&
                          ((u = _p(null, e, t, u[1], r)),
                          (u = Ws(u, t.attrs, r)),
                          (function H1(e, t, n, r) {
                            e[
                              Dr(
                                n ? t.classBindings : t.styleBindings,
                              )
                            ] = r;
                          })(e, t, r, u));
                      } else
                        i = (function z1(e, t, n) {
                          let r;
                          const o = t.directiveEnd;
                          for (
                            let i = 1 + t.directiveStylingLast;
                            i < o;
                            i++
                          )
                            r = Ws(r, e[i].hostAttrs, n);
                          return Ws(r, t.attrs, n);
                        })(e, t, r);
                  }
                  return (
                    void 0 !== i &&
                      (r
                        ? (t.residualClasses = i)
                        : (t.residualStyles = i)),
                    n
                  );
                })(o, i, t, r)),
                (function N1(e, t, n, r, o, i) {
                  let s = i ? t.classBindings : t.styleBindings,
                    a = Dr(s),
                    u = oo(s);
                  e[r] = n;
                  let l,
                    c = !1;
                  if (
                    (Array.isArray(n)
                      ? ((l = n[1]),
                        (null === l || xo(n, l) > 0) && (c = !0))
                      : (l = n),
                    o)
                  )
                    if (0 !== u) {
                      const f = Dr(e[a + 1]);
                      (e[r + 1] = Sc(f, a)),
                        0 !== f && (e[f + 1] = gp(e[f + 1], r)),
                        (e[a + 1] = (function T1(e, t) {
                          return (131071 & e) | (t << 17);
                        })(e[a + 1], r));
                    } else
                      (e[r + 1] = Sc(a, 0)),
                        0 !== a && (e[a + 1] = gp(e[a + 1], r)),
                        (a = r);
                  else
                    (e[r + 1] = Sc(u, 0)),
                      0 === a
                        ? (a = r)
                        : (e[u + 1] = gp(e[u + 1], r)),
                      (u = r);
                  c && (e[r + 1] = pp(e[r + 1])),
                    HE(e, l, r, !0),
                    HE(e, l, r, !1),
                    (function R1(e, t, n, r, o) {
                      const i = o
                        ? e.residualClasses
                        : e.residualStyles;
                      null != i &&
                        'string' == typeof t &&
                        xo(i, t) >= 0 &&
                        (n[r + 1] = mp(n[r + 1]));
                    })(t, l, e, r, i),
                    (s = Sc(a, u)),
                    i ? (t.classBindings = s) : (t.styleBindings = s);
                })(o, i, t, n, s, r);
            }
          })(i, e, s, r),
          t !== $ &&
            ke(o, s, t) &&
            (function JE(e, t, n, r, o, i, s, a) {
              if (!(3 & t.type)) return;
              const u = e.data,
                c = u[a + 1],
                l = (function A1(e) {
                  return !(1 & ~e);
                })(c)
                  ? ew(u, t, n, o, oo(c), s)
                  : void 0;
              Tc(l) ||
                (Tc(i) ||
                  ((function M1(e) {
                    return !(2 & ~e);
                  })(c) &&
                    (i = ew(u, null, n, o, a, s))),
                (function uF(e, t, n, r, o) {
                  if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                  else {
                    let i =
                      -1 === r.indexOf('-') ? void 0 : gr.DashCase;
                    null == o
                      ? e.removeStyle(n, r, i)
                      : ('string' == typeof o &&
                          o.endsWith('!important') &&
                          ((o = o.slice(0, -10)),
                          (i |= gr.Important)),
                        e.setStyle(n, r, o, i));
                  }
                })(r, s, os(rt(), n), o, i));
            })(
              i,
              i.data[rt()],
              o,
              o[V],
              e,
              (o[s + 1] = (function Z1(e, t) {
                return (
                  null == e ||
                    '' === e ||
                    ('string' == typeof t
                      ? (e += t)
                      : 'object' == typeof e && (e = qe(pr(e)))),
                  e
                );
              })(t, n)),
              r,
              s,
            );
      }
      function _p(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Ws(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Ws(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            'number' == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) ||
                  (e = void 0 === e ? [] : ['', e]),
                Bt(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function ew(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            c = Array.isArray(u),
            l = c ? u[1] : u,
            d = null === l;
          let f = n[o + 1];
          f === $ && (f = d ? ne : void 0);
          let h = d ? Gd(f, r) : l === r ? f : void 0;
          if ((c && !Tc(h) && (h = Gd(u, r)), Tc(h) && ((a = h), s)))
            return a;
          const p = e[o + 1];
          o = s ? Dr(p) : oo(p);
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles;
          null != u && (a = Gd(u, r));
        }
        return a;
      }
      function Tc(e) {
        return void 0 !== e;
      }
      class iL {
        destroy(t) {}
        updateValue(t, n) {}
        swap(t, n) {
          const r = Math.min(t, n),
            o = Math.max(t, n),
            i = this.detach(o);
          if (o - r > 1) {
            const s = this.detach(r);
            this.attach(r, i), this.attach(o, s);
          } else this.attach(r, i);
        }
        move(t, n) {
          this.attach(n, this.detach(t));
        }
      }
      function Cp(e, t, n, r, o) {
        return e === n && Object.is(t, r)
          ? 1
          : Object.is(o(e, t), o(n, r))
          ? -1
          : 0;
      }
      function Dp(e, t, n, r) {
        return !(
          void 0 === t ||
          !t.has(r) ||
          (e.attach(n, t.get(r)), t.delete(r), 0)
        );
      }
      function nw(e, t, n, r, o) {
        if (Dp(e, t, r, n(r, o))) e.updateValue(r, o);
        else {
          const i = e.create(r, o);
          e.attach(r, i);
        }
      }
      function rw(e, t, n, r) {
        const o = new Set();
        for (let i = t; i <= n; i++) o.add(r(i, e.at(i)));
        return o;
      }
      class ow {
        constructor() {
          (this.kvMap = new Map()), (this._vMap = void 0);
        }
        has(t) {
          return this.kvMap.has(t);
        }
        delete(t) {
          if (!this.has(t)) return !1;
          const n = this.kvMap.get(t);
          return (
            void 0 !== this._vMap && this._vMap.has(n)
              ? (this.kvMap.set(t, this._vMap.get(n)),
                this._vMap.delete(n))
              : this.kvMap.delete(t),
            !0
          );
        }
        get(t) {
          return this.kvMap.get(t);
        }
        set(t, n) {
          if (this.kvMap.has(t)) {
            let r = this.kvMap.get(t);
            void 0 === this._vMap && (this._vMap = new Map());
            const o = this._vMap;
            for (; o.has(r); ) r = o.get(r);
            o.set(r, n);
          } else this.kvMap.set(t, n);
        }
        forEach(t) {
          for (let [n, r] of this.kvMap)
            if ((t(r, n), void 0 !== this._vMap)) {
              const o = this._vMap;
              for (; o.has(r); ) (r = o.get(r)), t(r, n);
            }
        }
      }
      function io(e, t) {
        _t('NgControlFlow');
        const n = v(),
          r = cn(),
          o = n[r] !== $ ? n[r] : -1,
          i = -1 !== o ? Rc(n, A + o) : void 0;
        if (ke(n, r, e)) {
          const a = F(null);
          try {
            if ((void 0 !== i && Th(i, 0), -1 !== e)) {
              const u = A + e,
                c = Rc(n, u),
                l = wp(n[b], u),
                d = eo(c, l.tView.ssrId);
              ei(c, Jo(n, l, t, { dehydratedView: d }), 0, Xr(l, d));
            }
          } finally {
            F(a);
          }
        } else if (void 0 !== i) {
          const a = WC(i, 0);
          void 0 !== a && (a[_e] = t);
        }
      }
      class aL {
        constructor(t, n, r) {
          (this.lContainer = t),
            (this.$implicit = n),
            (this.$index = r);
        }
        get $count() {
          return this.lContainer.length - Fe;
        }
      }
      function Ep(e, t) {
        return t;
      }
      class cL {
        constructor(t, n, r) {
          (this.hasEmptyBlock = t),
            (this.trackByFn = n),
            (this.liveCollection = r);
        }
      }
      function Ac(e, t, n, r, o, i, s, a, u, c, l, d, f) {
        _t('NgControlFlow');
        const h = v(),
          p = q(),
          g = void 0 !== u,
          m = v(),
          C = a ? s.bind(m[Te][_e]) : s,
          y = new cL(g, C);
        (m[A + e] = y),
          Hs(h, p, e + 1, t, n, r, o, Xt(p.consts, i)),
          g && Hs(h, p, e + 2, u, c, l, d, Xt(p.consts, f));
      }
      class lL extends iL {
        constructor(t, n, r) {
          super(),
            (this.lContainer = t),
            (this.hostLView = n),
            (this.templateTNode = r),
            (this.operationsCounter = void 0),
            (this.needsIndexUpdate = !1);
        }
        get length() {
          return this.lContainer.length - Fe;
        }
        at(t) {
          return this.getLView(t)[_e].$implicit;
        }
        attach(t, n) {
          const r = n[mt];
          (this.needsIndexUpdate ||= t !== this.length),
            ei(this.lContainer, n, t, Xr(this.templateTNode, r));
        }
        detach(t) {
          return (
            (this.needsIndexUpdate ||= t !== this.length - 1),
            (function dL(e, t) {
              return bs(e, t);
            })(this.lContainer, t)
          );
        }
        create(t, n) {
          const r = eo(
              this.lContainer,
              this.templateTNode.tView.ssrId,
            ),
            o = Jo(
              this.hostLView,
              this.templateTNode,
              new aL(this.lContainer, n, t),
              {
                dehydratedView: r,
              },
            );
          return this.operationsCounter?.recordCreate(), o;
        }
        destroy(t) {
          ec(t[b], t), this.operationsCounter?.recordDestroy();
        }
        updateValue(t, n) {
          this.getLView(t)[_e].$implicit = n;
        }
        reset() {
          (this.needsIndexUpdate = !1),
            this.operationsCounter?.reset();
        }
        updateIndexes() {
          if (this.needsIndexUpdate)
            for (let t = 0; t < this.length; t++)
              this.getLView(t)[_e].$index = t;
        }
        getLView(t) {
          return (function fL(e, t) {
            return WC(e, t);
          })(this.lContainer, t);
        }
      }
      function Nc(e) {
        const t = F(null),
          n = rt();
        try {
          const r = v(),
            o = r[b],
            i = r[n],
            s = n + 1,
            a = Rc(r, s);
          if (void 0 === i.liveCollection) {
            const c = wp(o, s);
            i.liveCollection = new lL(a, r, c);
          } else i.liveCollection.reset();
          const u = i.liveCollection;
          if (
            ((function sL(e, t, n) {
              let r,
                o,
                i = 0,
                s = e.length - 1;
              if (Array.isArray(t)) {
                let u = t.length - 1;
                for (; i <= s && i <= u; ) {
                  const c = e.at(i),
                    l = t[i],
                    d = Cp(i, c, i, l, n);
                  if (0 !== d) {
                    d < 0 && e.updateValue(i, l), i++;
                    continue;
                  }
                  const f = e.at(s),
                    h = t[u],
                    p = Cp(s, f, u, h, n);
                  if (0 !== p) {
                    p < 0 && e.updateValue(s, h), s--, u--;
                    continue;
                  }
                  const g = n(i, c),
                    m = n(s, f),
                    C = n(i, l);
                  if (Object.is(C, m)) {
                    const y = n(u, h);
                    Object.is(y, g)
                      ? (e.swap(i, s), e.updateValue(s, h), u--, s--)
                      : e.move(s, i),
                      e.updateValue(i, l),
                      i++;
                  } else if (
                    ((r ??= new ow()),
                    (o ??= rw(e, i, s, n)),
                    Dp(e, r, i, C))
                  )
                    e.updateValue(i, l), i++, s++;
                  else if (o.has(C)) r.set(g, e.detach(i)), s--;
                  else {
                    const y = e.create(i, t[i]);
                    e.attach(i, y), i++, s++;
                  }
                }
                for (; i <= u; ) nw(e, r, n, i, t[i]), i++;
              } else if (null != t) {
                const u = t[Symbol.iterator]();
                let c = u.next();
                for (; !c.done && i <= s; ) {
                  const l = e.at(i),
                    d = c.value,
                    f = Cp(i, l, i, d, n);
                  if (0 !== f)
                    f < 0 && e.updateValue(i, d), i++, (c = u.next());
                  else {
                    (r ??= new ow()), (o ??= rw(e, i, s, n));
                    const h = n(i, d);
                    if (Dp(e, r, i, h))
                      e.updateValue(i, d), i++, s++, (c = u.next());
                    else if (o.has(h)) {
                      const p = n(i, l);
                      r.set(p, e.detach(i)), s--;
                    } else
                      e.attach(i, e.create(i, d)),
                        i++,
                        s++,
                        (c = u.next());
                  }
                }
                for (; !c.done; )
                  nw(e, r, n, e.length, c.value), (c = u.next());
              }
              for (; i <= s; ) e.destroy(e.detach(s--));
              r?.forEach(u => {
                e.destroy(u);
              });
            })(u, e, i.trackByFn),
            u.updateIndexes(),
            i.hasEmptyBlock)
          ) {
            const c = cn(),
              l = 0 === u.length;
            if (ke(r, c, l)) {
              const d = n + 2,
                f = Rc(r, d);
              if (l) {
                const h = wp(o, d),
                  p = eo(f, h.tView.ssrId);
                ei(
                  f,
                  Jo(r, h, void 0, { dehydratedView: p }),
                  0,
                  Xr(h, p),
                );
              } else Th(f, 0);
            }
          }
        } finally {
          F(t);
        }
      }
      function Rc(e, t) {
        return e[t];
      }
      function wp(e, t) {
        return is(e, t);
      }
      function x(e, t, n, r) {
        const o = v(),
          i = q(),
          s = A + e,
          a = o[V],
          u = i.firstCreatePass
            ? (function hL(e, t, n, r, o, i) {
                const s = t.consts,
                  u = Kr(t, e, 2, r, Xt(s, o));
                return (
                  Eh(t, n, u, Xt(s, i)),
                  null !== u.attrs && mc(u, u.attrs, !1),
                  null !== u.mergedAttrs && mc(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          c = iw(i, o, u, a, t, e);
        o[s] = c;
        const l = wu(u);
        return (
          un(u, !0),
          RC(a, c, u),
          !(function oi(e) {
            return !(32 & ~e.flags);
          })(u) &&
            us() &&
            tc(i, o, c, u),
          0 ===
            (function PR() {
              return j.lFrame.elementDepthCount;
            })() && at(c, o),
          (function LR() {
            j.lFrame.elementDepthCount++;
          })(),
          l && (_h(i, o, u), yh(i, u, o)),
          null !== r && Ch(o, u),
          x
        );
      }
      function L() {
        let e = fe();
        gf() ? mf() : ((e = e.parent), un(e, !1));
        const t = e;
        (function jR(e) {
          return j.skipHydrationRootTNode === e;
        })(t) &&
          (function HR() {
            j.skipHydrationRootTNode = null;
          })(),
          (function VR() {
            j.lFrame.elementDepthCount--;
          })();
        const n = q();
        return (
          n.firstCreatePass &&
            (Tu(n, e), sf(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function nx(e) {
              return !!(8 & e.flags);
            })(t) &&
            vp(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function rx(e) {
              return !!(16 & e.flags);
            })(t) &&
            vp(n, t, v(), t.stylesWithoutHost, !1),
          L
        );
      }
      function Y(e, t, n, r) {
        return x(e, t, n, r), L(), Y;
      }
      let iw = (e, t, n, r, o, i) => (
        In(!0),
        Ju(
          r,
          o,
          (function Hy() {
            return j.lFrame.currentNamespace;
          })(),
        )
      );
      function so() {
        return v();
      }
      const Ei = 'en-US';
      let fw = Ei;
      let Rw = (e, t, n) => {};
      function me(e, t, n, r) {
        const o = v(),
          i = q(),
          s = fe();
        return (
          (function Tp(e, t, n, r, o, i, s) {
            const a = wu(r),
              c = e.firstCreatePass && GC(e),
              l = t[_e],
              d = zC(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = vt(r, t),
                m = s ? s(g) : g,
                C = d.length,
                y = s ? H => s(re(H[r.index])) : r.index;
              let M = null;
              if (
                (!s &&
                  a &&
                  (M = (function uV(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[Lo],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        'string' == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== M)
              )
                ((M.__ngLastListenerFn__ || M).__ngNextListenerFn__ =
                  i),
                  (M.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                (i = kw(r, t, l, i)), Rw(g, o, i);
                const H = n.listen(m, o, i);
                d.push(i, H), c && c.push(o, y, C, C + 1);
              }
            } else i = kw(r, t, l, i);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let m = 0; m < g; m += 2) {
                  const X = t[p[m]][p[m + 1]].subscribe(i),
                    Re = d.length;
                  d.push(i, X),
                    c && c.push(o, r.index, Re, -(Re + 1));
                }
            }
          })(i, o, o[V], s, e, t, r),
          me
        );
      }
      function Fw(e, t, n, r) {
        const o = F(null);
        try {
          return bn(6, t, n), !1 !== n(r);
        } catch (i) {
          return ic(e, i), !1;
        } finally {
          bn(7, t, n), F(o);
        }
      }
      function kw(e, t, n, r) {
        return function o(i) {
          if (i === Function) return r;
          Ts(e.componentOffset > -1 ? zt(e.index, t) : t, 5);
          let a = Fw(t, n, r, i),
            u = o.__ngNextListenerFn__;
          for (; u; )
            (a = Fw(t, n, u, i) && a), (u = u.__ngNextListenerFn__);
          return a;
        };
      }
      function Ne(e = 1) {
        return (function ZR(e) {
          return (j.lFrame.contextLView = (function Ty(e, t) {
            for (; e > 0; ) (t = t[Vo]), e--;
            return t;
          })(e, j.lFrame.contextLView))[_e];
        })(e);
      }
      function cV(e, t) {
        let n = null;
        const r = (function YN(e) {
          const t = e.attrs;
          if (null != t) {
            const n = t.indexOf(5);
            if (!(1 & n)) return t[n + 1];
          }
          return null;
        })(e);
        for (let o = 0; o < t.length; o++) {
          const i = t[o];
          if ('*' !== i) {
            if (null === r ? oy(e, i, !0) : JN(r, i)) return o;
          } else n = o;
        }
        return n;
      }
      function Er(e) {
        const t = v()[Te][nt];
        if (!t.projection) {
          const r = (t.projection = (function fu(e, t) {
              const n = [];
              for (let r = 0; r < e; r++) n.push(t);
              return n;
            })(e ? e.length : 1, null)),
            o = r.slice();
          let i = t.child;
          for (; null !== i; ) {
            if (128 !== i.type) {
              const s = e ? cV(i, e) : 0;
              null !== s &&
                (o[s] ? (o[s].projectionNext = i) : (r[s] = i),
                (o[s] = i));
            }
            i = i.next;
          }
        }
      }
      function Qn(e, t = 0, n, r, o, i) {
        const s = v(),
          a = q(),
          u = r ? e + 1 : null;
        null !== u && Hs(s, a, u, r, o, i, null, n);
        const c = Kr(a, A + e, 16, null, n || null);
        null === c.projection && (c.projection = t), mf();
        const d = !s[mt] || Br();
        null === s[Te][nt].projection[c.projection] && null !== u
          ? (function lV(e, t, n) {
              const r = A + n,
                o = t.data[r],
                i = e[r],
                s = eo(i, o.tView.ssrId);
              ei(
                i,
                Jo(e, o, void 0, { dehydratedView: s }),
                0,
                Xr(o, s),
              );
            })(s, a, u)
          : d &&
            32 & ~c.flags &&
            (function sF(e, t, n) {
              AC(
                t[V],
                0,
                t,
                n,
                fh(e, n, t),
                wC(n.parent || t[nt], n, t),
              );
            })(a, s, c);
      }
      function kc(e, t, n) {
        BD(e, t, n);
      }
      function Js(e) {
        const t = v(),
          n = q(),
          r = _f();
        Mu(r + 1);
        const o = Xh(n, r);
        if (
          e.dirty &&
          (function FR(e) {
            return !(4 & ~e[N]);
          })(t) === !(2 & ~o.metadata.flags)
        ) {
          if (null === o.matches) e.reset([]);
          else {
            const i = zD(t, r);
            e.reset(i, v_), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function ea() {
        return (function Kh(e, t) {
          return e[Bn].queries[t].queryList;
        })(v(), _f());
      }
      function ta(e, t = '') {
        const n = v(),
          r = q(),
          o = e + A,
          i = r.firstCreatePass ? Kr(r, o, 1, t, null) : r.data[o],
          s = tb(r, n, i, t, e);
        (n[o] = s), us() && tc(r, n, s, i), un(i, !1);
      }
      let tb = (e, t, n, r, o) => (
        In(!0),
        (function uh(e, t) {
          return e.createText(t);
        })(t[V], r)
      );
      function wi(e) {
        return Rp('', e, ''), wi;
      }
      function Rp(e, t, n) {
        const r = v(),
          o = (function fi(e, t, n, r) {
            return ke(e, cn(), n) ? t + B(n) + r : $;
          })(r, e, t, n);
        return (
          o !== $ &&
            (function qn(e, t, n) {
              const r = os(t, e);
              !(function vC(e, t, n) {
                e.setValue(t, n);
              })(e[V], r, n);
            })(r, rt(), o),
          Rp
        );
      }
      function xp(e, t, n, r, o) {
        if (((e = k(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) xp(e[i], t, n, r, o);
        else {
          const i = q(),
            s = v(),
            a = fe();
          let u = Lr(e) ? e : k(e.provide);
          const c = fy(e),
            l = 1048575 & a.providerIndexes,
            d = a.directiveStart,
            f = a.providerIndexes >> 20;
          if (Lr(e) || !e.multi) {
            const h = new cs(c, o, E),
              p = Fp(u, t, o ? l : l + f, d);
            -1 === p
              ? (Tf(xu(a, s), i, u),
                Op(i, e, t.length),
                t.push(u),
                a.directiveStart++,
                a.directiveEnd++,
                o && (a.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = Fp(u, t, l + f, d),
              p = Fp(u, t, l, l + f),
              m = p >= 0 && n[p];
            if ((o && !m) || (!o && !(h >= 0 && n[h]))) {
              Tf(xu(a, s), i, u);
              const C = (function xV(e, t, n, r, o) {
                const i = new cs(e, n, E);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  pb(i, o, r && !n),
                  i
                );
              })(o ? RV : NV, n.length, o, r, c);
              !o && m && (n[p].providerFactory = C),
                Op(i, e, t.length, 0),
                t.push(u),
                a.directiveStart++,
                a.directiveEnd++,
                o && (a.providerIndexes += 1048576),
                n.push(C),
                s.push(C);
            } else
              Op(i, e, h > -1 ? h : p, pb(n[o ? p : h], c, !o && r));
            !o && r && m && n[p].componentProviders++;
          }
        }
      }
      function Op(e, t, n, r) {
        const o = Lr(t),
          i = (function cR(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const u = (i ? k(t.useClass) : t).prototype.ngOnDestroy;
          if (u) {
            const c = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const l = c.indexOf(n);
              -1 === l ? c.push(n, [r, u]) : c[l + 1].push(r, u);
            } else c.push(n, u);
          }
        }
      }
      function pb(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function Fp(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function NV(e, t, n, r) {
        return kp(this.multi, []);
      }
      function RV(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = qr(n, n[b], this.providerFactory.index, r);
          (i = a.slice(0, s)), kp(o, i);
          for (let u = s; u < a.length; u++) i.push(a[u]);
        } else (i = []), kp(o, i);
        return i;
      }
      function kp(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function Ie(e, t = []) {
        return n => {
          n.providersResolver = (r, o) =>
            (function AV(e, t, n) {
              const r = q();
              if (r.firstCreatePass) {
                const o = an(e);
                xp(n, r.data, r.blueprint, o, !0),
                  xp(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      let OV = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
              const r = Qd(0, n.type),
                o =
                  r.length > 0
                    ? np(
                        [r],
                        this._injector,
                        `Standalone[${n.type.name}]`,
                      )
                    : null;
              this.cachedInjectors.set(n, o);
            }
            return this.cachedInjectors.get(n);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: 'environment',
            factory: () => new e(T(Ht)),
          }));
        }
        return e;
      })();
      function te(e) {
        _t('NgStandalone'),
          (e.getStandaloneInjector = t =>
            t.get(OV).getOrCreateStandaloneInjector(e));
      }
      function Pp(e, t, n, r) {
        return (function vb(e, t, n, r, o, i) {
          const s = t + n;
          return ke(e, s, o)
            ? (function Tn(e, t, n) {
                return (e[t] = n);
              })(e, s + 1, i ? r.call(i, o) : r(o))
            : (function na(e, t) {
                const n = e[t];
                return n === $ ? void 0 : n;
              })(e, s + 1);
        })(
          v(),
          (function yt() {
            const e = j.lFrame;
            let t = e.bindingRootIndex;
            return (
              -1 === t &&
                (t = e.bindingRootIndex = e.tView.bindingStartIndex),
              t
            );
          })(),
          e,
          t,
          n,
          r,
        );
      }
      let Lb = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: 'platform',
          }));
        }
        return e;
      })();
      const $b = new w('');
      function aa(e) {
        return !!e && 'function' == typeof e.then;
      }
      function Hb(e) {
        return !!e && 'function' == typeof e.subscribe;
      }
      const Wj = new w('');
      let Gp = (() => {
        class e {
          constructor() {
            (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((n, r) => {
                (this.resolve = n), (this.reject = r);
              })),
              (this.appInits = _(Wj, { optional: !0 }) ?? []);
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [];
            for (const o of this.appInits) {
              const i = o();
              if (aa(i)) n.push(i);
              else if (Hb(i)) {
                const s = new Promise((a, u) => {
                  i.subscribe({ complete: a, error: u });
                });
                n.push(s);
              }
            }
            const r = () => {
              (this.done = !0), this.resolve();
            };
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch(o => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      const Bc = new w('');
      let pn = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = _(Nx)),
              (this.afterRenderEffectManager = _(pc)),
              (this.zonelessEnabled = _(Ls)),
              (this.externalTestViews = new Set()),
              (this.beforeRender = new pt()),
              (this.afterTick = new pt()),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = _(Zr).hasPendingTasks.pipe(
                J(n => !n),
              )),
              (this._injector = _(Ht));
          }
          get allViews() {
            return [...this.externalTestViews.keys(), ...this._views];
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof wD;
            if (!this._injector.get(Gp).done)
              throw (
                (!o &&
                  (function lr(e) {
                    const t = Z(e) || We(e) || tt(e);
                    return null !== t && t.standalone;
                  })(n),
                new D(405, !1))
              );
            let s;
            (s = o
              ? n
              : this._injector.get(hc).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function Zj(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(to),
              c = s.create(He.NULL, [], r || s.selector, a),
              l = c.location.nativeElement,
              d = c.injector.get($b, null);
            return (
              d?.registerApplication(l),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  $c(this.components, c),
                  d?.unregisterApplication(l);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            this._tick(!0);
          }
          _tick(n) {
            if (this._runningTick) throw new D(101, !1);
            const r = F(null);
            try {
              (this._runningTick = !0),
                this.detectChangesInAttachedViews(n);
            } catch (o) {
              this.internalErrorHandler(o);
            } finally {
              (this._runningTick = !1), F(r), this.afterTick.next();
            }
          }
          detectChangesInAttachedViews(n) {
            let r = null;
            this._injector.destroyed ||
              (r = this._injector.get(Uh, null, { optional: !0 }));
            let o = 0;
            const i = this.afterRenderEffectManager;
            for (; o < 10; ) {
              const s = 0 === o;
              if (n || !s) {
                this.beforeRender.next(s);
                for (let { _lView: a, notifyErrorHandler: u } of this
                  ._views)
                  Yj(a, u, s, this.zonelessEnabled);
              } else r?.begin?.(), r?.end?.();
              if (
                (o++,
                i.executeInternalCallbacks(),
                !this.allViews.some(({ _lView: a }) => ss(a)) &&
                  (i.execute(),
                  !this.allViews.some(({ _lView: a }) => ss(a))))
              )
                break;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            $c(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n);
            const r = this._injector.get(Bc, []);
            [...this._bootstrapListeners, ...r].forEach(o => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach(n => n()),
                  this._views.slice().forEach(n => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => $c(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new D(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      function $c(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function Yj(e, t, n, r) {
        (n || ss(e)) && sc(e, t, n && !r ? 0 : 1);
      }
      class Kj {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Xj = (() => {
          class e {
            compileModuleSync(n) {
              return new tp(n);
            }
            compileModuleAsync(n) {
              return Promise.resolve(this.compileModuleSync(n));
            }
            compileModuleAndAllComponentsSync(n) {
              const r = this.compileModuleSync(n),
                i = qt(it(n).declarations).reduce((s, a) => {
                  const u = Z(a);
                  return u && s.push(new Us(u)), s;
                }, []);
              return new Kj(r, i);
            }
            compileModuleAndAllComponentsAsync(n) {
              return Promise.resolve(
                this.compileModuleAndAllComponentsSync(n),
              );
            }
            clearCache() {}
            clearCacheFor(n) {}
            getModuleId(n) {}
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        t2 = (() => {
          class e {
            constructor() {
              (this.zone = _(ie)),
                (this.changeDetectionScheduler = _(ni)),
                (this.applicationRef = _(pn));
            }
            initialize() {
              this._onMicrotaskEmptySubscription ||
                (this._onMicrotaskEmptySubscription =
                  this.zone.onMicrotaskEmpty.subscribe({
                    next: () => {
                      this.changeDetectionScheduler.runningTick ||
                        this.zone.run(() => {
                          this.applicationRef.tick();
                        });
                    },
                  }));
            }
            ngOnDestroy() {
              this._onMicrotaskEmptySubscription?.unsubscribe();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })();
      const n2 = new w('', { factory: () => !1 });
      function qp({ ngZoneFactory: e, ignoreChangesOutsideZone: t }) {
        return (
          (e ??= () => new ie(Wp())),
          [
            { provide: ie, useFactory: e },
            {
              provide: $t,
              multi: !0,
              useFactory: () => {
                const n = _(t2, { optional: !0 });
                return () => n.initialize();
              },
            },
            {
              provide: $t,
              multi: !0,
              useFactory: () => {
                const n = _(o2);
                return () => {
                  n.initialize();
                };
              },
            },
            !0 === t ? { provide: ED, useValue: !0 } : [],
          ]
        );
      }
      function Wp(e) {
        return {
          enableLongStackTrace: !1,
          shouldCoalesceEventChangeDetection:
            e?.eventCoalescing ?? !1,
          shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
        };
      }
      let o2 = (() => {
          class e {
            constructor() {
              (this.subscription = new ot()),
                (this.initialized = !1),
                (this.zone = _(ie)),
                (this.pendingTasks = _(Zr));
            }
            initialize() {
              if (this.initialized) return;
              this.initialized = !0;
              let n = null;
              !this.zone.isStable &&
                !this.zone.hasPendingMacrotasks &&
                !this.zone.hasPendingMicrotasks &&
                (n = this.pendingTasks.add()),
                this.zone.runOutsideAngular(() => {
                  this.subscription.add(
                    this.zone.onStable.subscribe(() => {
                      ie.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          null !== n &&
                            !this.zone.hasPendingMacrotasks &&
                            !this.zone.hasPendingMicrotasks &&
                            (this.pendingTasks.remove(n), (n = null));
                        });
                    }),
                  );
                }),
                this.subscription.add(
                  this.zone.onUnstable.subscribe(() => {
                    ie.assertInAngularZone(),
                      (n ??= this.pendingTasks.add());
                  }),
                );
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        ua = (() => {
          class e {
            constructor() {
              (this.appRef = _(pn)),
                (this.taskService = _(Zr)),
                (this.ngZone = _(ie)),
                (this.zonelessEnabled = _(Ls)),
                (this.disableScheduling =
                  _(ED, { optional: !0 }) ?? !1),
                (this.zoneIsDefined =
                  typeof Zone < 'u' && !!Zone.root.run),
                (this.schedulerTickApplyArgs = [
                  { data: { __scheduler_tick__: !0 } },
                ]),
                (this.subscriptions = new ot()),
                (this.cancelScheduledCallback = null),
                (this.shouldRefreshViews = !1),
                (this.useMicrotaskScheduler = !1),
                (this.runningTick = !1),
                (this.pendingRenderTaskId = null),
                this.subscriptions.add(
                  this.appRef.afterTick.subscribe(() => {
                    this.runningTick || this.cleanup();
                  }),
                ),
                this.subscriptions.add(
                  this.ngZone.onUnstable.subscribe(() => {
                    this.runningTick || this.cleanup();
                  }),
                ),
                (this.disableScheduling ||=
                  !this.zonelessEnabled &&
                  (this.ngZone instanceof Ff || !this.zoneIsDefined));
            }
            notify(n) {
              if (!this.zonelessEnabled && 5 === n) return;
              switch (n) {
                case 3:
                case 2:
                case 0:
                case 4:
                case 5:
                case 1:
                  this.shouldRefreshViews = !0;
              }
              if (!this.shouldScheduleTick()) return;
              const r = this.useMicrotaskScheduler ? f_ : d_;
              (this.pendingRenderTaskId = this.taskService.add()),
                this.zoneIsDefined
                  ? Zone.root.run(() => {
                      this.cancelScheduledCallback = r(() => {
                        this.tick(this.shouldRefreshViews);
                      });
                    })
                  : (this.cancelScheduledCallback = r(() => {
                      this.tick(this.shouldRefreshViews);
                    }));
            }
            shouldScheduleTick() {
              return !(
                this.disableScheduling ||
                null !== this.pendingRenderTaskId ||
                this.runningTick ||
                this.appRef._runningTick ||
                (!this.zonelessEnabled &&
                  this.zoneIsDefined &&
                  ie.isInAngularZone())
              );
            }
            tick(n) {
              if (this.runningTick || this.appRef.destroyed) return;
              const r = this.taskService.add();
              try {
                this.ngZone.run(
                  () => {
                    (this.runningTick = !0), this.appRef._tick(n);
                  },
                  void 0,
                  this.schedulerTickApplyArgs,
                );
              } catch (o) {
                throw (this.taskService.remove(r), o);
              } finally {
                this.cleanup();
              }
              (this.useMicrotaskScheduler = !0),
                f_(() => {
                  (this.useMicrotaskScheduler = !1),
                    this.taskService.remove(r);
                });
            }
            ngOnDestroy() {
              this.subscriptions.unsubscribe(), this.cleanup();
            }
            cleanup() {
              if (
                ((this.shouldRefreshViews = !1),
                (this.runningTick = !1),
                this.cancelScheduledCallback?.(),
                (this.cancelScheduledCallback = null),
                null !== this.pendingRenderTaskId)
              ) {
                const n = this.pendingRenderTaskId;
                (this.pendingRenderTaskId = null),
                  this.taskService.remove(n);
              }
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })();
      const Yn = new w('', {
          providedIn: 'root',
          factory: () =>
            _(Yn, Q.Optional | Q.SkipSelf) ||
            (function i2() {
              return (
                (typeof $localize < 'u' && $localize.locale) || Ei
              );
            })(),
        }),
        Qp = new w('');
      let wr = null;
      let ca = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = f2);
        }
        return e;
      })();
      function f2(e) {
        return (function h2(e, t, n) {
          if (jr(e) && !n) {
            const r = zt(e.index, t);
            return new As(r, r);
          }
          return 175 & e.type ? new As(t[Te], t) : null;
        })(fe(), v(), !(16 & ~e));
      }
      class uI {
        constructor() {}
        supports(t) {
          return t instanceof Map || rp(t);
        }
        create() {
          return new D2();
        }
      }
      class D2 {
        constructor() {
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
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (
            n = this._previousMapHead;
            null !== n;
            n = n._nextPrevious
          )
            t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged)
            t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded)
            t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved)
            t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || rp(t))) throw new D(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null),
              (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail &&
              (this._changesTail._nextChanged = null),
            this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n),
                (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new E2(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead,
                t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (
              t = this._changesHead;
              null !== t;
              t = t._nextChanged
            )
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t),
              (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t),
              (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach(r => n(t[r], r));
        }
      }
      class E2 {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function lI() {
        return new qc([new uI()]);
      }
      let qc = (() => {
        class e {
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: 'root',
            factory: lI,
          }));
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: r => e.create(n, r || lI()),
              deps: [[e, new Hd(), new $d()]],
            };
          }
          find(n) {
            const r = this.factories.find(o => o.supports(n));
            if (r) return r;
            throw new D(901, !1);
          }
        }
        return e;
      })();
      function j2(e) {
        try {
          const {
              rootComponent: t,
              appProviders: n,
              platformProviders: r,
            } = e,
            o = (function l2(e = []) {
              if (wr) return wr;
              const t = (function Jb(e = [], t) {
                return He.create({
                  name: t,
                  providers: [
                    { provide: Xd, useValue: 'platform' },
                    {
                      provide: Qp,
                      useValue: new Set([() => (wr = null)]),
                    },
                    ...e,
                  ],
                });
              })(e);
              return (
                (wr = t),
                (function zb() {
                  !(function rA(e) {
                    sv = e;
                  })(() => {
                    throw new D(600, !1);
                  });
                })(),
                (function eI(e) {
                  e.get(L_, null)?.forEach(n => n());
                })(t),
                t
              );
            })(r),
            i = [
              qp({}),
              { provide: ni, useExisting: ua },
              ...(n || []),
            ],
            a = new lE({
              providers: i,
              parent: o,
              debugName: '',
              runEnvironmentInitializers: !1,
            }).injector,
            u = a.get(ie);
          return u.run(() => {
            a.resolveInjectorInitializers();
            const c = a.get(ln, null);
            let l;
            u.runOutsideAngular(() => {
              l = u.onError.subscribe({
                next: h => {
                  c.handleError(h);
                },
              });
            });
            const d = () => a.destroy(),
              f = o.get(Qp);
            return (
              f.add(d),
              a.onDestroy(() => {
                l.unsubscribe(), f.delete(d);
              }),
              (function Gb(e, t, n) {
                try {
                  const r = n();
                  return aa(r)
                    ? r.catch(o => {
                        throw (
                          (t.runOutsideAngular(() =>
                            e.handleError(o),
                          ),
                          o)
                        );
                      })
                    : r;
                } catch (r) {
                  throw (
                    (t.runOutsideAngular(() => e.handleError(r)), r)
                  );
                }
              })(c, u, () => {
                const h = a.get(Gp);
                return (
                  h.runInitializers(),
                  h.donePromise.then(() => {
                    !(function hw(e) {
                      'string' == typeof e &&
                        (fw = e.toLowerCase().replace(/_/g, '-'));
                    })(a.get(Yn, Ei) || Ei);
                    const g = a.get(pn);
                    return void 0 !== t && g.bootstrap(t), g;
                  })
                );
              })
            );
          });
        } catch (t) {
          return Promise.reject(t);
        }
      }
      const MI = new w('');
      function Si(e) {
        return 'boolean' == typeof e ? e : null != e && 'false' !== e;
      }
      function co(e, t) {
        _t('NgSignals');
        const n = (function eA(e) {
          const t = Object.create(tA);
          t.computation = e;
          const n = () => {
            if ((Jm(t), Je(t), t.value === Za)) throw t.error;
            return t.value;
          };
          return (n[Oe] = t), n;
        })(e);
        return t?.equal && (n[Oe].equal = t.equal), n;
      }
      function xn(e) {
        const t = F(null);
        try {
          return e();
        } finally {
          F(t);
        }
      }
      let LI = null;
      function br() {
        return LI;
      }
      class hU {}
      const en = new w('');
      let ig = (() => {
          class e {
            historyGo(n) {
              throw new Error('');
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: () => _(pU),
              providedIn: 'platform',
            }));
          }
          return e;
        })(),
        pU = (() => {
          class e extends ig {
            constructor() {
              super(),
                (this._doc = _(en)),
                (this._location = window.location),
                (this._history = window.history);
            }
            getBaseHrefFromDOM() {
              return br().getBaseHref(this._doc);
            }
            onPopState(n) {
              const r = br().getGlobalEventTarget(
                this._doc,
                'window',
              );
              return (
                r.addEventListener('popstate', n, !1),
                () => r.removeEventListener('popstate', n)
              );
            }
            onHashChange(n) {
              const r = br().getGlobalEventTarget(
                this._doc,
                'window',
              );
              return (
                r.addEventListener('hashchange', n, !1),
                () => r.removeEventListener('hashchange', n)
              );
            }
            get href() {
              return this._location.href;
            }
            get protocol() {
              return this._location.protocol;
            }
            get hostname() {
              return this._location.hostname;
            }
            get port() {
              return this._location.port;
            }
            get pathname() {
              return this._location.pathname;
            }
            get search() {
              return this._location.search;
            }
            get hash() {
              return this._location.hash;
            }
            set pathname(n) {
              this._location.pathname = n;
            }
            pushState(n, r, o) {
              this._history.pushState(n, r, o);
            }
            replaceState(n, r, o) {
              this._history.replaceState(n, r, o);
            }
            forward() {
              this._history.forward();
            }
            back() {
              this._history.back();
            }
            historyGo(n = 0) {
              this._history.go(n);
            }
            getState() {
              return this._history.state;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: () => new e(),
              providedIn: 'platform',
            }));
          }
          return e;
        })();
      function sg(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith('/') && n++,
          t.startsWith('/') && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + '/' + t
        );
      }
      function VI(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return (
          e.slice(0, n - ('/' === e[n - 1] ? 1 : 0)) + e.slice(n)
        );
      }
      function Kn(e) {
        return e && '?' !== e[0] ? '?' + e : e;
      }
      let Mi = (() => {
        class e {
          historyGo(n) {
            throw new Error('');
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: () => _(gU),
            providedIn: 'root',
          }));
        }
        return e;
      })();
      const jI = new w('');
      let gU = (() => {
          class e extends Mi {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  _(en).location?.origin ??
                  '');
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n),
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return sg(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  Kn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + Kn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + Kn(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(T(ig), T(jI, 8));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        mU = (() => {
          class e extends Mi {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n),
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              const r = this._platformLocation.hash ?? '#';
              return r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = sg(this._baseHref, n);
              return r.length > 0 ? '#' + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + Kn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + Kn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(T(ig), T(jI, 8));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
            }));
          }
          return e;
        })(),
        ha = (() => {
          class e {
            constructor(n) {
              (this._subject = new oe()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function _U(e) {
                if (new RegExp('^(https?:)?//').test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(VI(UI(r)))),
                this._locationStrategy.onPopState(o => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = '') {
              return this.path() == this.normalize(n + Kn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function yU(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return '' === n ||
                    ['/', ';', '?', '#'].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, UI(n)),
              );
            }
            prepareExternalUrl(n) {
              return (
                n && '/' !== n[0] && (n = '/' + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = '', o = null) {
              this._locationStrategy.pushState(o, '', n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Kn(r)),
                  o,
                );
            }
            replaceState(n, r = '', o = null) {
              this._locationStrategy.replaceState(o, '', n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Kn(r)),
                  o,
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                (this._urlChangeSubscription ??= this.subscribe(r => {
                  this._notifyUrlChangeListeners(r.url, r.state);
                })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = '', r) {
              this._urlChangeListeners.forEach(o => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
            static #e = (this.normalizeQueryParams = Kn);
            static #t = (this.joinWithSlash = sg);
            static #n = (this.stripTrailingSlash = VI);
            static #r = (this.ɵfac = function (r) {
              return new (r || e)(T(Mi));
            });
            static #o = (this.ɵprov = S({
              token: e,
              factory: () =>
                (function vU() {
                  return new ha(T(Mi));
                })(),
              providedIn: 'root',
            }));
          }
          return e;
        })();
      function UI(e) {
        return e.replace(/\/index.html$/, '');
      }
      const mg = /\s+/,
        QI = [];
      let ga = (() => {
          class e {
            constructor(n, r) {
              (this._ngEl = n),
                (this._renderer = r),
                (this.initialClasses = QI),
                (this.stateMap = new Map());
            }
            set klass(n) {
              this.initialClasses =
                null != n ? n.trim().split(mg) : QI;
            }
            set ngClass(n) {
              this.rawClass =
                'string' == typeof n ? n.trim().split(mg) : n;
            }
            ngDoCheck() {
              for (const r of this.initialClasses)
                this._updateState(r, !0);
              const n = this.rawClass;
              if (Array.isArray(n) || n instanceof Set)
                for (const r of n) this._updateState(r, !0);
              else if (null != n)
                for (const r of Object.keys(n))
                  this._updateState(r, !!n[r]);
              this._applyStateDiff();
            }
            _updateState(n, r) {
              const o = this.stateMap.get(n);
              void 0 !== o
                ? (o.enabled !== r &&
                    ((o.changed = !0), (o.enabled = r)),
                  (o.touched = !0))
                : this.stateMap.set(n, {
                    enabled: r,
                    changed: !0,
                    touched: !0,
                  });
            }
            _applyStateDiff() {
              for (const n of this.stateMap) {
                const r = n[0],
                  o = n[1];
                o.changed
                  ? (this._toggleClass(r, o.enabled),
                    (o.changed = !1))
                  : o.touched ||
                    (o.enabled && this._toggleClass(r, !1),
                    this.stateMap.delete(r)),
                  (o.touched = !1);
              }
            }
            _toggleClass(n, r) {
              (n = n.trim()).length > 0 &&
                n.split(mg).forEach(o => {
                  r
                    ? this._renderer.addClass(
                        this._ngEl.nativeElement,
                        o,
                      )
                    : this._renderer.removeClass(
                        this._ngEl.nativeElement,
                        o,
                      );
                });
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(E(Gt), E(Zn));
            });
            static #t = (this.ɵdir = U({
              type: e,
              selectors: [['', 'ngClass', '']],
              inputs: {
                klass: [0, 'class', 'klass'],
                ngClass: 'ngClass',
              },
              standalone: !0,
            }));
          }
          return e;
        })(),
        _g = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngEl = n),
                (this._differs = r),
                (this._renderer = o),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(n) {
              (this._ngStyle = n),
                !this._differ &&
                  n &&
                  (this._differ = this._differs.find(n).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const n = this._differ.diff(this._ngStyle);
                n && this._applyChanges(n);
              }
            }
            _setStyle(n, r) {
              const [o, i] = n.split('.'),
                s = -1 === o.indexOf('-') ? void 0 : gr.DashCase;
              null != r
                ? this._renderer.setStyle(
                    this._ngEl.nativeElement,
                    o,
                    i ? `${r}${i}` : r,
                    s,
                  )
                : this._renderer.removeStyle(
                    this._ngEl.nativeElement,
                    o,
                    s,
                  );
            }
            _applyChanges(n) {
              n.forEachRemovedItem(r => this._setStyle(r.key, null)),
                n.forEachAddedItem(r =>
                  this._setStyle(r.key, r.currentValue),
                ),
                n.forEachChangedItem(r =>
                  this._setStyle(r.key, r.currentValue),
                );
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(E(Gt), E(qc), E(Zn));
            });
            static #t = (this.ɵdir = U({
              type: e,
              selectors: [['', 'ngStyle', '']],
              inputs: { ngStyle: 'ngStyle' },
              standalone: !0,
            }));
          }
          return e;
        })(),
        lo = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Xi({ type: e }));
            static #n = (this.ɵinj = Ao({}));
          }
          return e;
        })();
      const tS = 'browser';
      function nS(e) {
        return e === tS;
      }
      function rS(e) {
        return 'server' === e;
      }
      let kB = (() => {
        class e {
          static #e = (this.ɵprov = S({
            token: e,
            providedIn: 'root',
            factory: () =>
              nS(_(hr)) ? new PB(_(en), window) : new VB(),
          }));
        }
        return e;
      })();
      class PB {
        constructor(t, n) {
          (this.document = t),
            (this.window = n),
            (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return [this.window.scrollX, this.window.scrollY];
        }
        scrollToPosition(t) {
          this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          const n = (function LB(e, t) {
            const n =
              e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              'function' == typeof e.createTreeWalker &&
              e.body &&
              'function' == typeof e.body.attachShadow
            ) {
              const r = e.createTreeWalker(
                e.body,
                NodeFilter.SHOW_ELEMENT,
              );
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) ||
                    i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          this.window.history.scrollRestoration = t;
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
      }
      class VB {
        setOffset(t) {}
        getScrollPosition() {
          return [0, 0];
        }
        scrollToPosition(t) {}
        scrollToAnchor(t) {}
        setHistoryScrollRestoration(t) {}
      }
      class h$ extends hU {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Ig extends h$ {
        static makeCurrent() {
          !(function fU(e) {
            LI ??= e;
          })(new Ig());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.remove();
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(
            t,
          );
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument(
            'fakeTitle',
          );
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return 'window' === n
            ? window
            : 'document' === n
            ? t
            : 'body' === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function p$() {
            return (
              (ya = ya || document.querySelector('base')),
              ya ? ya.getAttribute('href') : null
            );
          })();
          return null == n
            ? null
            : (function g$(e) {
                return new URL(e, document.baseURI).pathname;
              })(n);
        }
        resetBaseElement() {
          ya = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function rB(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(';')) {
              const r = n.indexOf('='),
                [o, i] =
                  -1 == r ? [n, ''] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let ya = null,
        v$ = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
            }));
          }
          return e;
        })();
      const hl = new w('');
      let hS = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach(o => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let r = this._eventNameToPlugin.get(n);
            if (r) return r;
            if (((r = this._plugins.find(i => i.supports(n))), !r))
              throw new D(5101, !1);
            return this._eventNameToPlugin.set(n, r), r;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(T(hl), T(ie));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class Sg {
        constructor(t) {
          this._doc = t;
        }
      }
      const Mg = 'ng-app-id';
      let pS = (() => {
        class e {
          constructor(n, r, o, i = {}) {
            (this.doc = n),
              (this.appId = r),
              (this.nonce = o),
              (this.platformId = i),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM =
                this.collectServerRenderedStyles()),
              (this.platformIsServer = rS(i)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const r of n)
              1 === this.changeUsageCount(r, 1) &&
                this.onStyleAdded(r);
          }
          removeStyles(n) {
            for (const r of n)
              this.changeUsageCount(r, -1) <= 0 &&
                this.onStyleRemoved(r);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach(r => r.remove()), n.clear());
            for (const r of this.getAllStyles())
              this.onStyleRemoved(r);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const r of this.getAllStyles())
              this.addStyleToHost(n, r);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n);
          }
          onStyleRemoved(n) {
            const r = this.styleRef;
            r.get(n)?.elements?.forEach(o => o.remove()), r.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${Mg}="${this.appId}"]`,
            );
            if (n?.length) {
              const r = new Map();
              return (
                n.forEach(o => {
                  null != o.textContent && r.set(o.textContent, o);
                }),
                r
              );
            }
            return null;
          }
          changeUsageCount(n, r) {
            const o = this.styleRef;
            if (o.has(n)) {
              const i = o.get(n);
              return (i.usage += r), i.usage;
            }
            return o.set(n, { usage: r, elements: [] }), r;
          }
          getStyleElement(n, r) {
            const o = this.styleNodesInDOM,
              i = o?.get(r);
            if (i?.parentNode === n)
              return o.delete(r), i.removeAttribute(Mg), i;
            {
              const s = this.doc.createElement('style');
              return (
                this.nonce && s.setAttribute('nonce', this.nonce),
                (s.textContent = r),
                this.platformIsServer &&
                  s.setAttribute(Mg, this.appId),
                n.appendChild(s),
                s
              );
            }
          }
          addStyleToHost(n, r) {
            const o = this.getStyleElement(n, r),
              i = this.styleRef,
              s = i.get(r)?.elements;
            s ? s.push(o) : i.set(r, { elements: [o], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(T(en), T(ps), T(jf, 8), T(hr));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const Tg = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/Math/MathML',
        },
        Ag = /%COMP%/g,
        D$ = new w('', { providedIn: 'root', factory: () => !0 });
      function mS(e, t) {
        return t.map(n => n.replace(Ag, e));
      }
      let vS = (() => {
        class e {
          constructor(n, r, o, i, s, a, u, c = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestroy = i),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = u),
              (this.nonce = c),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = rS(a)),
              (this.defaultRenderer = new Ng(
                n,
                s,
                u,
                this.platformIsServer,
              ));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            this.platformIsServer &&
              r.encapsulation === rn.ShadowDom &&
              (r = { ...r, encapsulation: rn.Emulated });
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof _S
                ? o.applyToHost(n)
                : o instanceof Rg && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.doc,
                a = this.ngZone,
                u = this.eventManager,
                c = this.sharedStylesHost,
                l = this.removeStylesOnCompDestroy,
                d = this.platformIsServer;
              switch (r.encapsulation) {
                case rn.Emulated:
                  i = new _S(u, c, r, this.appId, l, s, a, d);
                  break;
                case rn.ShadowDom:
                  return new I$(u, c, n, r, s, a, this.nonce, d);
                default:
                  i = new Rg(u, c, r, l, s, a, d);
              }
              o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(
              T(hS),
              T(pS),
              T(ps),
              T(D$),
              T(en),
              T(hr),
              T(ie),
              T(jf),
            );
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class Ng {
        constructor(t, n, r, o) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.throwOnSyntheticProps = !0),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(Tg[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (yS(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (yS(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          n.remove();
        }
        selectRootElement(t, n) {
          let r =
            'string' == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new D(-5104, !1);
          return n || (r.textContent = ''), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ':' + n;
            const i = Tg[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Tg[r];
            o
              ? t.removeAttributeNS(o, n)
              : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (gr.DashCase | gr.Important)
            ? t.style.setProperty(
                n,
                r,
                o & gr.Important ? 'important' : '',
              )
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & gr.DashCase
            ? t.style.removeProperty(n)
            : (t.style[n] = '');
        }
        setProperty(t, n, r) {
          null != t && (t[n] = r);
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            'string' == typeof t &&
            !(t = br().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(
              `Unsupported event target ${t} for event ${n}`,
            );
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r),
          );
        }
        decoratePreventDefault(t) {
          return n => {
            if ('__ngUnwrap__' === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function yS(e) {
        return 'TEMPLATE' === e.tagName && void 0 !== e.content;
      }
      class I$ extends Ng {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, u),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const c = mS(o.id, o.styles);
          for (const l of c) {
            const d = document.createElement('style');
            a && d.setAttribute('nonce', a),
              (d.textContent = l),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(null, n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t)),
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class Rg extends Ng {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = u ? mS(u, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class _S extends Rg {
        constructor(t, n, r, o, i, s, a, u) {
          const c = o + '-' + r.id;
          super(t, n, r, i, s, a, u, c),
            (this.contentAttr = (function E$(e) {
              return '_ngcontent-%COMP%'.replace(Ag, e);
            })(c)),
            (this.hostAttr = (function w$(e) {
              return '_nghost-%COMP%'.replace(Ag, e);
            })(c));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, '');
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ''), r;
        }
      }
      let S$ = (() => {
          class e extends Sg {
            constructor(n) {
              super(n);
            }
            supports(n) {
              return !0;
            }
            addEventListener(n, r, o) {
              return (
                n.addEventListener(r, o, !1),
                () => this.removeEventListener(n, r, o)
              );
            }
            removeEventListener(n, r, o) {
              return n.removeEventListener(r, o);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(T(en));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
            }));
          }
          return e;
        })(),
        M$ = (() => {
          class e extends Sg {
            constructor(n) {
              super(n), (this.delegate = _(MI, { optional: !0 }));
            }
            supports(n) {
              return !!this.delegate && this.delegate.supports(n);
            }
            addEventListener(n, r, o) {
              return this.delegate.addEventListener(n, r, o);
            }
            removeEventListener(n, r, o) {
              return this.delegate.removeEventListener(n, r, o);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(T(en));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
            }));
          }
          return e;
        })();
      const CS = ['alt', 'control', 'meta', 'shift'],
        T$ = {
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
          Win: 'OS',
        },
        A$ = {
          alt: e => e.altKey,
          control: e => e.ctrlKey,
          meta: e => e.metaKey,
          shift: e => e.shiftKey,
        };
      function DS(e) {
        return {
          appProviders: [...L$, ...(e?.providers ?? [])],
          platformProviders: k$,
        };
      }
      const k$ = [
          { provide: hr, useValue: tS },
          {
            provide: L_,
            useValue: function x$() {
              Ig.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: en,
            useFactory: function F$() {
              return (
                (function Jx(e) {
                  Vf = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ],
        L$ = [
          { provide: Xd, useValue: 'root' },
          {
            provide: ln,
            useFactory: function O$() {
              return new ln();
            },
            deps: [],
          },
          {
            provide: hl,
            useClass: S$,
            multi: !0,
            deps: [en, ie, hr],
          },
          {
            provide: hl,
            useClass: (() => {
              class e extends Sg {
                constructor(n) {
                  super(n);
                }
                supports(n) {
                  return null != e.parseEventName(n);
                }
                addEventListener(n, r, o) {
                  const i = e.parseEventName(r),
                    s = e.eventCallback(
                      i.fullKey,
                      o,
                      this.manager.getZone(),
                    );
                  return this.manager
                    .getZone()
                    .runOutsideAngular(() =>
                      br().onAndCancel(n, i.domEventName, s),
                    );
                }
                static parseEventName(n) {
                  const r = n.toLowerCase().split('.'),
                    o = r.shift();
                  if (
                    0 === r.length ||
                    ('keydown' !== o && 'keyup' !== o)
                  )
                    return null;
                  const i = e._normalizeKey(r.pop());
                  let s = '',
                    a = r.indexOf('code');
                  if (
                    (a > -1 && (r.splice(a, 1), (s = 'code.')),
                    CS.forEach(c => {
                      const l = r.indexOf(c);
                      l > -1 && (r.splice(l, 1), (s += c + '.'));
                    }),
                    (s += i),
                    0 != r.length || 0 === i.length)
                  )
                    return null;
                  const u = {};
                  return (u.domEventName = o), (u.fullKey = s), u;
                }
                static matchEventFullKeyCode(n, r) {
                  let o = T$[n.key] || n.key,
                    i = '';
                  return (
                    r.indexOf('code.') > -1 &&
                      ((o = n.code), (i = 'code.')),
                    !(null == o || !o) &&
                      ((o = o.toLowerCase()),
                      ' ' === o
                        ? (o = 'space')
                        : '.' === o && (o = 'dot'),
                      CS.forEach(s => {
                        s !== o && (0, A$[s])(n) && (i += s + '.');
                      }),
                      (i += o),
                      i === r)
                  );
                }
                static eventCallback(n, r, o) {
                  return i => {
                    e.matchEventFullKeyCode(i, n) &&
                      o.runGuarded(() => r(i));
                  };
                }
                static _normalizeKey(n) {
                  return 'esc' === n ? 'escape' : n;
                }
                static #e = (this.ɵfac = function (r) {
                  return new (r || e)(T(en));
                });
                static #t = (this.ɵprov = S({
                  token: e,
                  factory: e.ɵfac,
                }));
              }
              return e;
            })(),
            multi: !0,
            deps: [en],
          },
          { provide: hl, useClass: M$, multi: !0 },
          vS,
          pS,
          hS,
          { provide: Uh, useExisting: vS },
          { provide: class jB {}, useClass: v$, deps: [] },
          [],
        ];
      let V$ = (() => {
        class e {
          constructor(n) {
            this._doc = n;
          }
          getTitle() {
            return this._doc.title;
          }
          setTitle(n) {
            this._doc.title = n || '';
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(T(en));
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      function Ir(e) {
        return this instanceof Ir ? ((this.v = e), this) : new Ir(e);
      }
      function MS(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.');
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function kg(e) {
              var t = 'function' == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && 'number' == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? 'Object is not iterable.'
                  : 'Symbol.iterator is not defined.',
              );
            })(e)),
            (n = {}),
            r('next'),
            r('throw'),
            r('return'),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (c) {
                    i({ value: c, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      'function' == typeof SuppressedError && SuppressedError;
      const TS = e =>
        e && 'number' == typeof e.length && 'function' != typeof e;
      function AS(e) {
        return we(e?.then);
      }
      function NS(e) {
        return we(e[Cd]);
      }
      function RS(e) {
        return Symbol.asyncIterator && we(e?.[Symbol.asyncIterator]);
      }
      function xS(e) {
        return new TypeError(
          `You provided ${
            null !== e && 'object' == typeof e
              ? 'an invalid object'
              : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`,
        );
      }
      const OS = (function lH() {
        return 'function' == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : '@@iterator';
      })();
      function FS(e) {
        return we(e?.[OS]);
      }
      function kS(e) {
        return (function SS(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError(
              'Symbol.asyncIterator is not defined.',
            );
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            a('next'),
            a('throw'),
            a('return', function s(h) {
              return function (p) {
                return Promise.resolve(p).then(h, d);
              };
            }),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function a(h, p) {
            r[h] &&
              ((o[h] = function (g) {
                return new Promise(function (m, C) {
                  i.push([h, g, m, C]) > 1 || u(h, g);
                });
              }),
              p && (o[h] = p(o[h])));
          }
          function u(h, p) {
            try {
              !(function c(h) {
                h.value instanceof Ir
                  ? Promise.resolve(h.value.v).then(l, d)
                  : f(i[0][2], h);
              })(r[h](p));
            } catch (g) {
              f(i[0][3], g);
            }
          }
          function l(h) {
            u('next', h);
          }
          function d(h) {
            u('throw', h);
          }
          function f(h, p) {
            h(p), i.shift(), i.length && u(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield Ir(n.read());
              if (o) return yield Ir(void 0);
              yield yield Ir(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function PS(e) {
        return we(e?.getReader);
      }
      function vn(e) {
        if (e instanceof xe) return e;
        if (null != e) {
          if (NS(e))
            return (function dH(e) {
              return new xe(t => {
                const n = e[Cd]();
                if (we(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable',
                );
              });
            })(e);
          if (TS(e))
            return (function fH(e) {
              return new xe(t => {
                for (let n = 0; n < e.length && !t.closed; n++)
                  t.next(e[n]);
                t.complete();
              });
            })(e);
          if (AS(e))
            return (function hH(e) {
              return new xe(t => {
                e.then(
                  n => {
                    t.closed || (t.next(n), t.complete());
                  },
                  n => t.error(n),
                ).then(null, hv);
              });
            })(e);
          if (RS(e)) return LS(e);
          if (FS(e))
            return (function pH(e) {
              return new xe(t => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (PS(e))
            return (function gH(e) {
              return LS(kS(e));
            })(e);
        }
        throw xS(e);
      }
      function LS(e) {
        return new xe(t => {
          (function mH(e, t) {
            var n, r, o, i;
            return (function bS(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(l) {
                  try {
                    c(r.next(l));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(l) {
                  try {
                    c(r.throw(l));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(l) {
                  l.done
                    ? i(l.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(l.value).then(a, u);
                }
                c((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = MS(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch(n => t.error(n));
        });
      }
      function er(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Pg(e, t = 0) {
        return Ve((n, r) => {
          n.subscribe(
            Ae(
              r,
              o => er(r, e, () => r.next(o), t),
              () => er(r, e, () => r.complete(), t),
              o => er(r, e, () => r.error(o), t),
            ),
          );
        });
      }
      function VS(e, t = 0) {
        return Ve((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function jS(e, t) {
        if (!e) throw new Error('Iterable cannot be null');
        return new xe(n => {
          er(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            er(
              n,
              t,
              () => {
                r.next().then(o => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0,
            );
          });
        });
      }
      function ut(e, t) {
        return t
          ? (function EH(e, t) {
              if (null != e) {
                if (NS(e))
                  return (function vH(e, t) {
                    return vn(e).pipe(VS(t), Pg(t));
                  })(e, t);
                if (TS(e))
                  return (function _H(e, t) {
                    return new xe(n => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]),
                            n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (AS(e))
                  return (function yH(e, t) {
                    return vn(e).pipe(VS(t), Pg(t));
                  })(e, t);
                if (RS(e)) return jS(e, t);
                if (FS(e))
                  return (function CH(e, t) {
                    return new xe(n => {
                      let r;
                      return (
                        er(n, t, () => {
                          (r = e[OS]()),
                            er(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0,
                            );
                        }),
                        () => we(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (PS(e))
                  return (function DH(e, t) {
                    return jS(kS(e), t);
                  })(e, t);
              }
              throw xS(e);
            })(e, t)
          : vn(e);
      }
      function Lg(e) {
        return e[e.length - 1];
      }
      function Vg(e) {
        return we(Lg(e)) ? e.pop() : void 0;
      }
      function gl(e) {
        return (function wH(e) {
          return e && we(e.schedule);
        })(Lg(e))
          ? e.pop()
          : void 0;
      }
      function z(...e) {
        return ut(e, gl(e));
      }
      const ml = hd(
          e =>
            function () {
              e(this),
                (this.name = 'EmptyError'),
                (this.message = 'no elements in sequence');
            },
        ),
        { isArray: bH } = Array,
        { getPrototypeOf: IH, prototype: SH, keys: MH } = Object;
      function US(e) {
        if (1 === e.length) {
          const t = e[0];
          if (bH(t)) return { args: t, keys: null };
          if (
            (function TH(e) {
              return e && 'object' == typeof e && IH(e) === SH;
            })(t)
          ) {
            const n = MH(t);
            return { args: n.map(r => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: AH } = Array;
      function BS(e) {
        return J(t =>
          (function NH(e, t) {
            return AH(t) ? e(...t) : e(t);
          })(e, t),
        );
      }
      function $S(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function jg(...e) {
        const t = gl(e),
          n = Vg(e),
          { args: r, keys: o } = US(e);
        if (0 === r.length) return ut([], t);
        const i = new xe(
          (function RH(e, t, n = Ln) {
            return r => {
              HS(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    HS(
                      t,
                      () => {
                        const c = ut(e[u], t);
                        let l = !1;
                        c.subscribe(
                          Ae(
                            r,
                            d => {
                              (i[u] = d),
                                l || ((l = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            },
                          ),
                        );
                      },
                      r,
                    );
                },
                r,
              );
            };
          })(r, t, o ? s => $S(o, s) : Ln),
        );
        return n ? i.pipe(BS(n)) : i;
      }
      function HS(e, t, n) {
        e ? er(n, e, t) : t();
      }
      function bt(e, t, n = 1 / 0) {
        return we(t)
          ? bt((r, o) => J((i, s) => t(r, i, o, s))(vn(e(r, o))), n)
          : ('number' == typeof t && (n = t),
            Ve((r, o) =>
              (function xH(e, t, n, r, o, i, s, a) {
                const u = [];
                let c = 0,
                  l = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !c && t.complete();
                  },
                  h = g => (c < r ? p(g) : u.push(g)),
                  p = g => {
                    i && t.next(g), c++;
                    let m = !1;
                    vn(n(g, l++)).subscribe(
                      Ae(
                        t,
                        C => {
                          o?.(C), i ? h(C) : t.next(C);
                        },
                        () => {
                          m = !0;
                        },
                        void 0,
                        () => {
                          if (m)
                            try {
                              for (c--; u.length && c < r; ) {
                                const C = u.shift();
                                s ? er(t, s, () => p(C)) : p(C);
                              }
                              f();
                            } catch (C) {
                              t.error(C);
                            }
                        },
                      ),
                    );
                  };
                return (
                  e.subscribe(
                    Ae(t, h, () => {
                      (d = !0), f();
                    }),
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n),
            ));
      }
      function vl(...e) {
        return (function OH() {
          return (function Ug(e = 1 / 0) {
            return bt(Ln, e);
          })(1);
        })()(ut(e, gl(e)));
      }
      function zS(e) {
        return new xe(t => {
          vn(e()).subscribe(t);
        });
      }
      function yl(e, t) {
        const n = we(e) ? e : () => e,
          r = o => o.error(n());
        return new xe(t ? o => t.schedule(r, 0, o) : r);
      }
      const On = new xe(e => e.complete());
      function Bg() {
        return Ve((e, t) => {
          let n = null;
          e._refCount++;
          const r = Ae(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class GS extends xe {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            vv(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) &&
              (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new ot();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Ae(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  r => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown(),
                ),
              ),
            ),
              t.closed && ((this._connection = null), (t = ot.EMPTY));
          }
          return t;
        }
        refCount() {
          return Bg()(this);
        }
      }
      function tr(e, t) {
        return Ve((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Ae(
              r,
              u => {
                o?.unsubscribe();
                let c = 0;
                const l = i++;
                vn(e(u, l)).subscribe(
                  (o = Ae(
                    r,
                    d => r.next(t ? t(u, d, l, c++) : d),
                    () => {
                      (o = null), a();
                    },
                  )),
                );
              },
              () => {
                (s = !0), a();
              },
            ),
          );
        });
      }
      function ho(e) {
        return e <= 0
          ? () => On
          : Ve((t, n) => {
              let r = 0;
              t.subscribe(
                Ae(n, o => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                }),
              );
            });
      }
      function qS(...e) {
        const t = gl(e);
        return Ve((n, r) => {
          (t ? vl(e, n, t) : vl(e, n)).subscribe(r);
        });
      }
      function Sr(e, t) {
        return Ve((n, r) => {
          let o = 0;
          n.subscribe(Ae(r, i => e.call(t, i, o++) && r.next(i)));
        });
      }
      function _l(e) {
        return Ve((t, n) => {
          let r = !1;
          t.subscribe(
            Ae(
              n,
              o => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              },
            ),
          );
        });
      }
      function WS(e = kH) {
        return Ve((t, n) => {
          let r = !1;
          t.subscribe(
            Ae(
              n,
              o => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e())),
            ),
          );
        });
      }
      function kH() {
        return new ml();
      }
      function po(e, t) {
        const n = arguments.length >= 2;
        return r =>
          r.pipe(
            e ? Sr((o, i) => e(o, i, r)) : Ln,
            ho(1),
            n ? _l(t) : WS(() => new ml()),
          );
      }
      function Cl(e, t) {
        return we(t) ? bt(e, t, 1) : bt(e, 1);
      }
      function It(e, t, n) {
        const r =
          we(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Ve((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Ae(
                  i,
                  u => {
                    var c;
                    null === (c = r.next) ||
                      void 0 === c ||
                      c.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) ||
                        void 0 === u ||
                        u.call(r),
                      i.complete();
                  },
                  u => {
                    var c;
                    (a = !1),
                      null === (c = r.error) ||
                        void 0 === c ||
                        c.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, c;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (c = r.finalize) ||
                        void 0 === c ||
                        c.call(r);
                  },
                ),
              );
            })
          : Ln;
      }
      function Ni(e) {
        return Ve((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Ae(n, void 0, void 0, s => {
              (i = vn(e(s, Ni(e)(t)))),
                r
                  ? (r.unsubscribe(), (r = null), i.subscribe(n))
                  : (o = !0);
            }),
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function ZS(e, t) {
        return Ve(
          (function PH(e, t, n, r, o) {
            return (i, s) => {
              let a = n,
                u = t,
                c = 0;
              i.subscribe(
                Ae(
                  s,
                  l => {
                    const d = c++;
                    (u = a ? e(u, l, d) : ((a = !0), l)),
                      r && s.next(u);
                  },
                  o &&
                    (() => {
                      a && s.next(u), s.complete();
                    }),
                ),
              );
            };
          })(e, t, arguments.length >= 2, !0),
        );
      }
      function $g(e) {
        return e <= 0
          ? () => On
          : Ve((t, n) => {
              let r = [];
              t.subscribe(
                Ae(
                  n,
                  o => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  },
                ),
              );
            });
      }
      function Hg(e) {
        return Ve((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      function QS(e) {
        return Ve((t, n) => {
          vn(e).subscribe(Ae(n, () => n.complete(), Xa)),
            !n.closed && t.subscribe(n);
        });
      }
      const G = 'primary',
        _a = Symbol('RouteTitle');
      class jH {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Ri(e) {
        return new jH(e);
      }
      function UH(e, t, n) {
        const r = n.path.split('/');
        if (
          r.length > e.length ||
          ('full' === n.pathMatch &&
            (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (':' === s[0]) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Fn(e, t) {
        const n = e ? zg(e) : void 0,
          r = t ? zg(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !YS(e[o], t[o]))) return !1;
        return !0;
      }
      function zg(e) {
        return [
          ...Object.keys(e),
          ...Object.getOwnPropertySymbols(e),
        ];
      }
      function YS(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function KS(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Mr(e) {
        return (function $$(e) {
          return (
            !!e &&
            (e instanceof xe || (we(e.lift) && we(e.subscribe)))
          );
        })(e)
          ? e
          : aa(e)
          ? ut(Promise.resolve(e))
          : z(e);
      }
      const $H = {
          exact: function eM(e, t, n) {
            if (
              !mo(e.segments, t.segments) ||
              !Dl(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (
                !e.children[r] ||
                !eM(e.children[r], t.children[r], n)
              )
                return !1;
            return !0;
          },
          subset: tM,
        },
        XS = {
          exact: function HH(e, t) {
            return Fn(e, t);
          },
          subset: function zH(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every(n => YS(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function JS(e, t, n) {
        return (
          $H[n.paths](e.root, t.root, n.matrixParams) &&
          XS[n.queryParams](e.queryParams, t.queryParams) &&
          !('exact' === n.fragment && e.fragment !== t.fragment)
        );
      }
      function tM(e, t, n) {
        return nM(e, t, t.segments, n);
      }
      function nM(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!mo(o, n) || t.hasChildren() || !Dl(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!mo(e.segments, n) || !Dl(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (
              !e.children[o] ||
              !tM(e.children[o], t.children[o], r)
            )
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(
              mo(e.segments, o) &&
              Dl(e.segments, o, r) &&
              e.children[G]
            ) && nM(e.children[G], t, i, r)
          );
        }
      }
      function Dl(e, t, n) {
        return t.every((r, o) =>
          XS[n](e[o].parameters, r.parameters),
        );
      }
      class go {
        constructor(t = new pe([], {}), n = {}, r = null) {
          (this.root = t),
            (this.queryParams = n),
            (this.fragment = r);
        }
        get queryParamMap() {
          return (
            (this._queryParamMap ??= Ri(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return WH.serialize(this);
        }
      }
      class pe {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Object.values(n).forEach(r => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return wl(this);
        }
      }
      class Ca {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            (this._parameterMap ??= Ri(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return iM(this);
        }
      }
      function mo(e, t) {
        return (
          e.length === t.length &&
          e.every((n, r) => n.path === t[r].path)
        );
      }
      let xi = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: () => new El(),
            providedIn: 'root',
          }));
        }
        return e;
      })();
      class El {
        parse(t) {
          const n = new o3(t);
          return new go(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment(),
          );
        }
        serialize(t) {
          const n = `/${Da(t.root, !0)}`,
            r = (function YH(e) {
              const t = Object.entries(e)
                .map(([n, r]) =>
                  Array.isArray(r)
                    ? r.map(o => `${bl(n)}=${bl(o)}`).join('&')
                    : `${bl(n)}=${bl(r)}`,
                )
                .filter(n => n);
              return t.length ? `?${t.join('&')}` : '';
            })(t.queryParams);
          return `${n}${r}${
            'string' == typeof t.fragment
              ? `#${(function ZH(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ''
          }`;
        }
      }
      const WH = new El();
      function wl(e) {
        return e.segments.map(t => iM(t)).join('/');
      }
      function Da(e, t) {
        if (!e.hasChildren()) return wl(e);
        if (t) {
          const n = e.children[G] ? Da(e.children[G], !1) : '',
            r = [];
          return (
            Object.entries(e.children).forEach(([o, i]) => {
              o !== G && r.push(`${o}:${Da(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join('//')})` : n
          );
        }
        {
          const n = (function qH(e, t) {
            let n = [];
            return (
              Object.entries(e.children).forEach(([r, o]) => {
                r === G && (n = n.concat(t(o, r)));
              }),
              Object.entries(e.children).forEach(([r, o]) => {
                r !== G && (n = n.concat(t(o, r)));
              }),
              n
            );
          })(e, (r, o) =>
            o === G ? [Da(e.children[G], !1)] : [`${o}:${Da(r, !1)}`],
          );
          return 1 === Object.keys(e.children).length &&
            null != e.children[G]
            ? `${wl(e)}/${n[0]}`
            : `${wl(e)}/(${n.join('//')})`;
        }
      }
      function rM(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',');
      }
      function bl(e) {
        return rM(e).replace(/%3B/gi, ';');
      }
      function Gg(e) {
        return rM(e)
          .replace(/\(/g, '%28')
          .replace(/\)/g, '%29')
          .replace(/%26/gi, '&');
      }
      function Il(e) {
        return decodeURIComponent(e);
      }
      function oM(e) {
        return Il(e.replace(/\+/g, '%20'));
      }
      function iM(e) {
        return `${Gg(e.path)}${(function QH(e) {
          return Object.entries(e)
            .map(([t, n]) => `;${Gg(t)}=${Gg(n)}`)
            .join('');
        })(e.parameters)}`;
      }
      const KH = /^[^\/()?;#]+/;
      function qg(e) {
        const t = e.match(KH);
        return t ? t[0] : '';
      }
      const XH = /^[^\/()?;=#]+/,
        e3 = /^[^=?&#]+/,
        n3 = /^[^&#]+/;
      class o3 {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional('/'),
            '' === this.remaining ||
            this.peekStartsWith('?') ||
            this.peekStartsWith('#')
              ? new pe([], {})
              : new pe([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional('?'))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional('&'));
          return t;
        }
        parseFragment() {
          return this.consumeOptional('#')
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ('' === this.remaining) return {};
          this.consumeOptional('/');
          const t = [];
          for (
            this.peekStartsWith('(') || t.push(this.parseSegment());
            this.peekStartsWith('/') &&
            !this.peekStartsWith('//') &&
            !this.peekStartsWith('/(');

          )
            this.capture('/'), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith('/(') &&
            (this.capture('/'), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith('(') && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) &&
              (r[G] = new pe(t, n)),
            r
          );
        }
        parseSegment() {
          const t = qg(this.remaining);
          if ('' === t && this.peekStartsWith(';'))
            throw new D(4009, !1);
          return (
            this.capture(t), new Ca(Il(t), this.parseMatrixParams())
          );
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(';'); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = (function JH(e) {
            const t = e.match(XH);
            return t ? t[0] : '';
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = '';
          if (this.consumeOptional('=')) {
            const o = qg(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Il(n)] = Il(r);
        }
        parseQueryParam(t) {
          const n = (function t3(e) {
            const t = e.match(e3);
            return t ? t[0] : '';
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = '';
          if (this.consumeOptional('=')) {
            const s = (function r3(e) {
              const t = e.match(n3);
              return t ? t[0] : '';
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = oM(n),
            i = oM(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture('(');
            !this.consumeOptional(')') && this.remaining.length > 0;

          ) {
            const r = qg(this.remaining),
              o = this.remaining[r.length];
            if ('/' !== o && ')' !== o && ';' !== o)
              throw new D(4010, !1);
            let i;
            r.indexOf(':') > -1
              ? ((i = r.slice(0, r.indexOf(':'))),
                this.capture(i),
                this.capture(':'))
              : t && (i = G);
            const s = this.parseChildren();
            (n[i] =
              1 === Object.keys(s).length ? s[G] : new pe([], s)),
              this.consumeOptional('//');
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)),
            !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new D(4011, !1);
        }
      }
      function sM(e) {
        return e.segments.length > 0 ? new pe([], { [G]: e }) : e;
      }
      function aM(e) {
        const t = {};
        for (const [r, o] of Object.entries(e.children)) {
          const i = aM(o);
          if (r === G && 0 === i.segments.length && i.hasChildren())
            for (const [s, a] of Object.entries(i.children)) t[s] = a;
          else
            (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function i3(e) {
          if (1 === e.numberOfChildren && e.children[G]) {
            const t = e.children[G];
            return new pe(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new pe(e.segments, t));
      }
      function vo(e) {
        return e instanceof go;
      }
      function uM(e) {
        let t;
        const o = sM(
          (function n(i) {
            const s = {};
            for (const u of i.children) {
              const c = n(u);
              s[u.outlet] = c;
            }
            const a = new pe(i.url, s);
            return i === e && (t = a), a;
          })(e.root),
        );
        return t ?? o;
      }
      function cM(e, t, n, r) {
        let o = e;
        for (; o.parent; ) o = o.parent;
        if (0 === t.length) return Wg(o, o, o, n, r);
        const i = (function a3(e) {
          if (
            'string' == typeof e[0] &&
            1 === e.length &&
            '/' === e[0]
          )
            return new dM(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ('object' == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Object.entries(i.outlets).forEach(([u, c]) => {
                    a[u] = 'string' == typeof c ? c.split('/') : c;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return 'string' != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split('/').forEach((a, u) => {
                  (0 == u && '.' === a) ||
                    (0 == u && '' === a
                      ? (n = !0)
                      : '..' === a
                      ? t++
                      : '' != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new dM(n, t, r);
        })(t);
        if (i.toRoot()) return Wg(o, o, new pe([], {}), n, r);
        const s = (function u3(e, t, n) {
            if (e.isAbsolute) return new Ml(t, !0, 0);
            if (!n) return new Ml(t, !1, NaN);
            if (null === n.parent) return new Ml(n, !0, 0);
            const r = Sl(e.commands[0]) ? 0 : 1;
            return (function c3(e, t, n) {
              let r = e,
                o = t,
                i = n;
              for (; i > o; ) {
                if (((i -= o), (r = r.parent), !r))
                  throw new D(4005, !1);
                o = r.segments.length;
              }
              return new Ml(r, !1, o - i);
            })(n, n.segments.length - 1 + r, e.numberOfDoubleDots);
          })(i, o, e),
          a = s.processChildren
            ? wa(s.segmentGroup, s.index, i.commands)
            : fM(s.segmentGroup, s.index, i.commands);
        return Wg(o, s.segmentGroup, a, n, r);
      }
      function Sl(e) {
        return (
          'object' == typeof e &&
          null != e &&
          !e.outlets &&
          !e.segmentPath
        );
      }
      function Ea(e) {
        return 'object' == typeof e && null != e && e.outlets;
      }
      function Wg(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Object.entries(r).forEach(([u, c]) => {
            i[u] = Array.isArray(c) ? c.map(l => `${l}`) : `${c}`;
          }),
          (s = e === t ? n : lM(e, t, n));
        const a = sM(aM(s));
        return new go(a, i, o);
      }
      function lM(e, t, n) {
        const r = {};
        return (
          Object.entries(e.children).forEach(([o, i]) => {
            r[o] = i === t ? n : lM(i, t, n);
          }),
          new pe(e.segments, r)
        );
      }
      class dM {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Sl(r[0]))
          )
            throw new D(4003, !1);
          const o = r.find(Ea);
          if (o && o !== KS(r)) throw new D(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            '/' == this.commands[0]
          );
        }
      }
      class Ml {
        constructor(t, n, r) {
          (this.segmentGroup = t),
            (this.processChildren = n),
            (this.index = r);
        }
      }
      function fM(e, t, n) {
        if (
          ((e ??= new pe([], {})),
          0 === e.segments.length && e.hasChildren())
        )
          return wa(e, t, n);
        const r = (function d3(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Ea(a)) break;
              const u = `${a}`,
                c = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (
                u &&
                c &&
                'object' == typeof c &&
                void 0 === c.outlets
              ) {
                if (!pM(u, c, s)) return i;
                r += 2;
              } else {
                if (!pM(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new pe(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[G] = new pe(
              e.segments.slice(r.pathIndex),
              e.children,
            )),
            wa(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new pe(e.segments, {})
          : r.match && !e.hasChildren()
          ? Zg(e, t, n)
          : r.match
          ? wa(e, 0, o)
          : Zg(e, t, n);
      }
      function wa(e, t, n) {
        if (0 === n.length) return new pe(e.segments, {});
        {
          const r = (function l3(e) {
              return Ea(e[0]) ? e[0].outlets : { [G]: e };
            })(n),
            o = {};
          if (
            Object.keys(r).some(i => i !== G) &&
            e.children[G] &&
            1 === e.numberOfChildren &&
            0 === e.children[G].segments.length
          ) {
            const i = wa(e.children[G], t, n);
            return new pe(e.segments, i.children);
          }
          return (
            Object.entries(r).forEach(([i, s]) => {
              'string' == typeof s && (s = [s]),
                null !== s && (o[i] = fM(e.children[i], t, s));
            }),
            Object.entries(e.children).forEach(([i, s]) => {
              void 0 === r[i] && (o[i] = s);
            }),
            new pe(e.segments, o)
          );
        }
      }
      function Zg(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Ea(i)) {
            const u = f3(i.outlets);
            return new pe(r, u);
          }
          if (0 === o && Sl(n[0])) {
            r.push(new Ca(e.segments[t].path, hM(n[0]))), o++;
            continue;
          }
          const s = Ea(i) ? i.outlets[G] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && Sl(a)
            ? (r.push(new Ca(s, hM(a))), (o += 2))
            : (r.push(new Ca(s, {})), o++);
        }
        return new pe(r, {});
      }
      function f3(e) {
        const t = {};
        return (
          Object.entries(e).forEach(([n, r]) => {
            'string' == typeof r && (r = [r]),
              null !== r && (t[n] = Zg(new pe([], {}), 0, r));
          }),
          t
        );
      }
      function hM(e) {
        const t = {};
        return (
          Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t
        );
      }
      function pM(e, t, n) {
        return e == n.path && Fn(t, n.parameters);
      }
      const ba = 'imperative';
      var K = (function (e) {
        return (
          (e[(e.NavigationStart = 0)] = 'NavigationStart'),
          (e[(e.NavigationEnd = 1)] = 'NavigationEnd'),
          (e[(e.NavigationCancel = 2)] = 'NavigationCancel'),
          (e[(e.NavigationError = 3)] = 'NavigationError'),
          (e[(e.RoutesRecognized = 4)] = 'RoutesRecognized'),
          (e[(e.ResolveStart = 5)] = 'ResolveStart'),
          (e[(e.ResolveEnd = 6)] = 'ResolveEnd'),
          (e[(e.GuardsCheckStart = 7)] = 'GuardsCheckStart'),
          (e[(e.GuardsCheckEnd = 8)] = 'GuardsCheckEnd'),
          (e[(e.RouteConfigLoadStart = 9)] = 'RouteConfigLoadStart'),
          (e[(e.RouteConfigLoadEnd = 10)] = 'RouteConfigLoadEnd'),
          (e[(e.ChildActivationStart = 11)] = 'ChildActivationStart'),
          (e[(e.ChildActivationEnd = 12)] = 'ChildActivationEnd'),
          (e[(e.ActivationStart = 13)] = 'ActivationStart'),
          (e[(e.ActivationEnd = 14)] = 'ActivationEnd'),
          (e[(e.Scroll = 15)] = 'Scroll'),
          (e[(e.NavigationSkipped = 16)] = 'NavigationSkipped'),
          e
        );
      })(K || {});
      class kn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Tl extends kn {
        constructor(t, n, r = 'imperative', o = null) {
          super(t, n),
            (this.type = K.NavigationStart),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Tr extends kn {
        constructor(t, n, r) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.type = K.NavigationEnd);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      var Qt = (function (e) {
          return (
            (e[(e.Redirect = 0)] = 'Redirect'),
            (e[(e.SupersededByNewNavigation = 1)] =
              'SupersededByNewNavigation'),
            (e[(e.NoDataFromResolver = 2)] = 'NoDataFromResolver'),
            (e[(e.GuardRejected = 3)] = 'GuardRejected'),
            e
          );
        })(Qt || {}),
        Al = (function (e) {
          return (
            (e[(e.IgnoredSameUrlNavigation = 0)] =
              'IgnoredSameUrlNavigation'),
            (e[(e.IgnoredByUrlHandlingStrategy = 1)] =
              'IgnoredByUrlHandlingStrategy'),
            e
          );
        })(Al || {});
      class yo extends kn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.reason = r),
            (this.code = o),
            (this.type = K.NavigationCancel);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Oi extends kn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.reason = r),
            (this.code = o),
            (this.type = K.NavigationSkipped);
        }
      }
      class Qg extends kn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.error = r),
            (this.target = o),
            (this.type = K.NavigationError);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class gM extends kn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = K.RoutesRecognized);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class h3 extends kn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = K.GuardsCheckStart);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class p3 extends kn {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = K.GuardsCheckEnd);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class g3 extends kn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = K.ResolveStart);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class m3 extends kn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = K.ResolveEnd);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class v3 {
        constructor(t) {
          (this.route = t), (this.type = K.RouteConfigLoadStart);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class y3 {
        constructor(t) {
          (this.route = t), (this.type = K.RouteConfigLoadEnd);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class _3 {
        constructor(t) {
          (this.snapshot = t), (this.type = K.ChildActivationStart);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig &&
              this.snapshot.routeConfig.path) ||
            ''
          }')`;
        }
      }
      class C3 {
        constructor(t) {
          (this.snapshot = t), (this.type = K.ChildActivationEnd);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig &&
              this.snapshot.routeConfig.path) ||
            ''
          }')`;
        }
      }
      class D3 {
        constructor(t) {
          (this.snapshot = t), (this.type = K.ActivationStart);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig &&
              this.snapshot.routeConfig.path) ||
            ''
          }')`;
        }
      }
      class E3 {
        constructor(t) {
          (this.snapshot = t), (this.type = K.ActivationEnd);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig &&
              this.snapshot.routeConfig.path) ||
            ''
          }')`;
        }
      }
      class mM {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = K.Scroll);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position
              ? `${this.position[0]}, ${this.position[1]}`
              : null
          }')`;
        }
      }
      class Yg {}
      class Nl {
        constructor(t, n) {
          (this.url = t), (this.navigationBehaviorOptions = n);
        }
      }
      function yn(e) {
        return e.outlet || G;
      }
      function Ia(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class T3 {
        get injector() {
          return Ia(this.route?.snapshot) ?? this.rootInjector;
        }
        set injector(t) {}
        constructor(t) {
          (this.rootInjector = t),
            (this.outlet = null),
            (this.route = null),
            (this.children = new Sa(this.rootInjector)),
            (this.attachRef = null);
        }
      }
      let Sa = (() => {
        class e {
          constructor(n) {
            (this.rootInjector = n), (this.contexts = new Map());
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return (
              r ||
                ((r = new T3(this.rootInjector)),
                this.contexts.set(n, r)),
              r
            );
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(T(Ht));
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      class vM {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Kg(t, this._root);
          return n ? n.children.map(r => r.value) : [];
        }
        firstChild(t) {
          const n = Kg(t, this._root);
          return n && n.children.length > 0
            ? n.children[0].value
            : null;
        }
        siblings(t) {
          const n = Xg(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map(o => o.value)
                .filter(o => o !== t);
        }
        pathFromRoot(t) {
          return Xg(t, this._root).map(n => n.value);
        }
      }
      function Kg(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Kg(e, n);
          if (r) return r;
        }
        return null;
      }
      function Xg(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Xg(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class _n {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Fi(e) {
        const t = {};
        return (
          e && e.children.forEach(n => (t[n.value.outlet] = n)), t
        );
      }
      class yM extends vM {
        constructor(t, n) {
          super(t), (this.snapshot = n), Jg(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function _M(e) {
        const t = (function A3(e) {
            const i = new xl([], {}, {}, '', {}, G, e, null, {});
            return new CM('', new _n(i, []));
          })(e),
          n = new gt([new Ca('', {})]),
          r = new gt({}),
          o = new gt({}),
          i = new gt({}),
          s = new gt(''),
          a = new Ar(n, r, i, s, o, G, e, t.root);
        return (a.snapshot = t.root), new yM(new _n(a, []), t);
      }
      class Ar {
        constructor(t, n, r, o, i, s, a, u) {
          (this.urlSubject = t),
            (this.paramsSubject = n),
            (this.queryParamsSubject = r),
            (this.fragmentSubject = o),
            (this.dataSubject = i),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = u),
            (this.title =
              this.dataSubject?.pipe(J(c => c[_a])) ?? z(void 0)),
            (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            (this._paramMap ??= this.params.pipe(J(t => Ri(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            (this._queryParamMap ??= this.queryParams.pipe(
              J(t => Ri(t)),
            )),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Rl(e, t, n = 'emptyOnly') {
        let r;
        const { routeConfig: o } = e;
        return (
          (r =
            null === t ||
            ('always' !== n &&
              '' !== o?.path &&
              (t.component || t.routeConfig?.loadComponent))
              ? {
                  params: { ...e.params },
                  data: { ...e.data },
                  resolve: { ...e.data, ...(e._resolvedData ?? {}) },
                }
              : {
                  params: { ...t.params, ...e.params },
                  data: { ...t.data, ...e.data },
                  resolve: {
                    ...e.data,
                    ...t.data,
                    ...o?.data,
                    ...e._resolvedData,
                  },
                }),
          o && EM(o) && (r.resolve[_a] = o.title),
          r
        );
      }
      class xl {
        get title() {
          return this.data?.[_a];
        }
        constructor(t, n, r, o, i, s, a, u, c) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._resolve = c);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (this._paramMap ??= Ri(this.params)), this._paramMap;
        }
        get queryParamMap() {
          return (
            (this._queryParamMap ??= Ri(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map(r => r.toString())
            .join('/')}', path:'${
            this.routeConfig ? this.routeConfig.path : ''
          }')`;
        }
      }
      class CM extends vM {
        constructor(t, n) {
          super(n), (this.url = t), Jg(this, n);
        }
        toString() {
          return DM(this._root);
        }
      }
      function Jg(e, t) {
        (t.value._routerState = e), t.children.forEach(n => Jg(e, n));
      }
      function DM(e) {
        const t =
          e.children.length > 0
            ? ` { ${e.children.map(DM).join(', ')} } `
            : '';
        return `${e.value}${t}`;
      }
      function em(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Fn(t.queryParams, n.queryParams) ||
              e.queryParamsSubject.next(n.queryParams),
            t.fragment !== n.fragment &&
              e.fragmentSubject.next(n.fragment),
            Fn(t.params, n.params) || e.paramsSubject.next(n.params),
            (function BH(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n)
                if (!Fn(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.urlSubject.next(n.url),
            Fn(t.data, n.data) || e.dataSubject.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function tm(e, t) {
        const n =
          Fn(e.params, t.params) &&
          (function GH(e, t) {
            return (
              mo(e, t) &&
              e.every((n, r) => Fn(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || tm(e.parent, t.parent))
        );
      }
      function EM(e) {
        return 'string' == typeof e.title || null === e.title;
      }
      let Ol = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = G),
              (this.activateEvents = new oe()),
              (this.deactivateEvents = new oe()),
              (this.attachEvents = new oe()),
              (this.detachEvents = new oe()),
              (this.parentContexts = _(Sa)),
              (this.location = _(dn)),
              (this.changeDetector = _(ca)),
              (this.inputBinder = _(Fl, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(
                this.name,
                this,
              ),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new D(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new D(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new D(4012, !1);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(
                this,
              ),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new D(4013, !1);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(
                this.name,
              ).children,
              u = new nm(n, a, o.injector);
            (this.activated = o.createComponent(s, {
              index: o.length,
              injector: u,
              environmentInjector: r,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(
                this,
              ),
              this.activateEvents.emit(this.activated.instance);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵdir = U({
            type: e,
            selectors: [['router-outlet']],
            inputs: { name: 'name' },
            outputs: {
              activateEvents: 'activate',
              deactivateEvents: 'deactivate',
              attachEvents: 'attach',
              detachEvents: 'detach',
            },
            exportAs: ['outlet'],
            standalone: !0,
            features: [Kt],
          }));
        }
        return e;
      })();
      class nm {
        __ngOutletInjector(t) {
          return new nm(this.route, this.childContexts, t);
        }
        constructor(t, n, r) {
          (this.route = t),
            (this.childContexts = n),
            (this.parent = r);
        }
        get(t, n) {
          return t === Ar
            ? this.route
            : t === Sa
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      const Fl = new w('');
      function Ma(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function R3(e, t, n) {
            return t.children.map(r => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Ma(e, r, o);
              return Ma(e, r);
            });
          })(e, t, n);
          return new _n(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map(a => Ma(e, a))),
                s
              );
            }
          }
          const r = (function x3(e) {
              return new Ar(
                new gt(e.url),
                new gt(e.params),
                new gt(e.queryParams),
                new gt(e.fragment),
                new gt(e.data),
                e.outlet,
                e.component,
                e,
              );
            })(t.value),
            o = t.children.map(i => Ma(e, i));
          return new _n(r, o);
        }
      }
      class rm {
        constructor(t, n) {
          (this.redirectTo = t), (this.navigationBehaviorOptions = n);
        }
      }
      const bM = 'ngNavigationCancelingError';
      function kl(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = vo(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = IM(!1, Qt.Redirect);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function IM(e, t) {
        const n = new Error(`NavigationCancelingError: ${e || ''}`);
        return (n[bM] = !0), (n.cancellationCode = t), n;
      }
      function SM(e) {
        return !!e && e[bM];
      }
      class k3 {
        constructor(t, n, r, o, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o),
            (this.inputBindingEnabled = i);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            em(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = Fi(n);
          t.children.forEach(i => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Object.values(o).forEach(i => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Fi(t);
          for (const s of Object.values(i))
            this.deactivateRouteAndItsChildren(s, o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Fi(t);
          for (const s of Object.values(i))
            this.deactivateRouteAndItsChildren(s, o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(),
              r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = Fi(n);
          t.children.forEach(i => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new E3(i.value.snapshot));
          }),
            t.children.length &&
              this.forwardEvent(new C3(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((em(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet &&
                  s.outlet.attach(a.componentRef, a.route.value),
                em(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else
              (s.attachRef = null),
                (s.route = o),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class MM {
        constructor(t) {
          (this.path = t),
            (this.route = this.path[this.path.length - 1]);
        }
      }
      class Pl {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function P3(e, t, n) {
        const r = e._root;
        return Ta(r, t ? t._root : null, n, [r.value]);
      }
      function ki(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? 'function' != typeof e ||
            (function MN(e) {
              return null !== su(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Ta(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] },
      ) {
        const i = Fi(t);
        return (
          e.children.forEach(s => {
            (function V3(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] },
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function j3(e, t, n) {
                  if ('function' == typeof n) return n(e, t);
                  switch (n) {
                    case 'pathParamsChange':
                      return !mo(e.url, t.url);
                    case 'pathParamsOrQueryParamsChange':
                      return (
                        !mo(e.url, t.url) ||
                        !Fn(e.queryParams, t.queryParams)
                      );
                    case 'always':
                      return !0;
                    case 'paramsOrQueryParamsChange':
                      return (
                        !tm(e, t) || !Fn(e.queryParams, t.queryParams)
                      );
                    default:
                      return !tm(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new MM(r))
                  : ((i.data = s.data),
                    (i._resolvedData = s._resolvedData)),
                  Ta(
                    e,
                    t,
                    i.component ? (a ? a.children : null) : n,
                    r,
                    o,
                  ),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(
                      new Pl(a.outlet.component, s),
                    );
              } else
                s && Aa(t, a, o),
                  o.canActivateChecks.push(new MM(r)),
                  Ta(
                    e,
                    null,
                    i.component ? (a ? a.children : null) : n,
                    r,
                    o,
                  );
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Object.entries(i).forEach(([s, a]) =>
            Aa(a, n.getContext(s), o),
          ),
          o
        );
      }
      function Aa(e, t, n) {
        const r = Fi(e),
          o = e.value;
        Object.entries(r).forEach(([i, s]) => {
          Aa(
            s,
            o.component ? (t ? t.children.getContext(i) : null) : t,
            n,
          );
        }),
          n.canDeactivateChecks.push(
            new Pl(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o,
            ),
          );
      }
      function Na(e) {
        return 'function' == typeof e;
      }
      function TM(e) {
        return e instanceof ml || 'EmptyError' === e?.name;
      }
      const Ll = Symbol('INITIAL_VALUE');
      function Pi() {
        return tr(e =>
          jg(e.map(t => t.pipe(ho(1), qS(Ll)))).pipe(
            J(t => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Ll) return Ll;
                  if (!1 === n || q3(n)) return n;
                }
              return !0;
            }),
            Sr(t => t !== Ll),
            ho(1),
          ),
        );
      }
      function q3(e) {
        return vo(e) || e instanceof rm;
      }
      function AM(e) {
        return (function vA(...e) {
          return pv(e);
        })(
          It(t => {
            if ('boolean' != typeof t) throw kl(0, t);
          }),
          J(t => !0 === t),
        );
      }
      class om {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Vl extends Error {
        constructor(t) {
          super(), (this.urlTree = t);
        }
      }
      function Li(e) {
        return yl(new om(e));
      }
      class iz {
        constructor(t, n) {
          (this.urlSerializer = t), (this.urlTree = n);
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (
              ((r = r.concat(o.segments)), 0 === o.numberOfChildren)
            )
              return z(r);
            if (o.numberOfChildren > 1 || !o.children[G])
              return yl(new D(4e3, !1));
            o = o.children[G];
          }
        }
        applyRedirectCommands(t, n, r, o, i) {
          if ('string' != typeof n) {
            const a = n,
              {
                queryParams: u,
                fragment: c,
                routeConfig: l,
                url: d,
                outlet: f,
                params: h,
                data: p,
                title: g,
              } = o,
              m = Un(i, () =>
                a({
                  params: h,
                  data: p,
                  queryParams: u,
                  fragment: c,
                  routeConfig: l,
                  url: d,
                  outlet: f,
                  title: g,
                }),
              );
            if (m instanceof go) throw new Vl(m);
            n = m;
          }
          const s = this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r,
          );
          if ('/' === n[0]) throw new Vl(s);
          return s;
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new go(
            i,
            this.createQueryParams(
              n.queryParams,
              this.urlTree.queryParams,
            ),
            n.fragment,
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Object.entries(t).forEach(([o, i]) => {
              if ('string' == typeof i && ':' === i[0]) {
                const a = i.substring(1);
                r[o] = n[a];
              } else r[o] = i;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Object.entries(n.children).forEach(([a, u]) => {
              s[a] = this.createSegmentGroup(t, u, r, o);
            }),
            new pe(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map(i =>
            ':' === i.path[0]
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r),
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new D(4001, !1);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      const im = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function sz(e, t, n, r, o) {
        const i = sm(e, t, n);
        return i.matched
          ? ((r = (function w3(e, t) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = np(
                    e.providers,
                    t,
                    `Route: ${e.path}`,
                  )),
                e._injector ?? t
              );
            })(t, r)),
            (function nz(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? z(
                    o.map(s => {
                      const a = ki(s, e);
                      return Mr(
                        (function G3(e) {
                          return e && Na(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : Un(e, () => a(t, n)),
                      );
                    }),
                  ).pipe(Pi(), AM())
                : z(!0);
            })(r, t, n).pipe(J(s => (!0 === s ? i : { ...im }))))
          : z(i);
      }
      function sm(e, t, n) {
        if ('**' === t.path)
          return (function az(e) {
            return {
              matched: !0,
              parameters: e.length > 0 ? KS(e).parameters : {},
              consumedSegments: e,
              remainingSegments: [],
              positionalParamSegments: {},
            };
          })(n);
        if ('' === t.path)
          return 'full' === t.pathMatch &&
            (e.hasChildren() || n.length > 0)
            ? { ...im }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || UH)(n, e, t);
        if (!o) return { ...im };
        const i = {};
        Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
          i[a] = u.path;
        });
        const s =
          o.consumed.length > 0
            ? {
                ...i,
                ...o.consumed[o.consumed.length - 1].parameters,
              }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function NM(e, t, n, r) {
        return n.length > 0 &&
          (function lz(e, t, n) {
            return n.some(r => jl(e, t, r) && yn(r) !== G);
          })(e, n, r)
          ? {
              segmentGroup: new pe(t, cz(r, new pe(n, e.children))),
              slicedSegments: [],
            }
          : 0 === n.length &&
            (function dz(e, t, n) {
              return n.some(r => jl(e, t, r));
            })(e, n, r)
          ? {
              segmentGroup: new pe(
                e.segments,
                uz(e, n, r, e.children),
              ),
              slicedSegments: n,
            }
          : {
              segmentGroup: new pe(e.segments, e.children),
              slicedSegments: n,
            };
      }
      function uz(e, t, n, r) {
        const o = {};
        for (const i of n)
          if (jl(e, t, i) && !r[yn(i)]) {
            const s = new pe([], {});
            o[yn(i)] = s;
          }
        return { ...r, ...o };
      }
      function cz(e, t) {
        const n = {};
        n[G] = t;
        for (const r of e)
          if ('' === r.path && yn(r) !== G) {
            const o = new pe([], {});
            n[yn(r)] = o;
          }
        return n;
      }
      function jl(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) ||
            'full' !== n.pathMatch) &&
          '' === n.path
        );
      }
      class pz {}
      class vz {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.configLoader = n),
            (this.rootComponentType = r),
            (this.config = o),
            (this.urlTree = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a),
            (this.applyRedirects = new iz(
              this.urlSerializer,
              this.urlTree,
            )),
            (this.absoluteRedirectCount = 0),
            (this.allowRedirects = !0);
        }
        noMatchError(t) {
          return new D(4002, `'${t.segmentGroup}'`);
        }
        recognize() {
          const t = NM(
            this.urlTree.root,
            [],
            [],
            this.config,
          ).segmentGroup;
          return this.match(t).pipe(
            J(({ children: n, rootSnapshot: r }) => {
              const o = new _n(r, n),
                i = new CM('', o),
                s = (function s3(e, t, n = null, r = null) {
                  return cM(uM(e), t, n, r);
                })(
                  r,
                  [],
                  this.urlTree.queryParams,
                  this.urlTree.fragment,
                );
              return (
                (s.queryParams = this.urlTree.queryParams),
                (i.url = this.urlSerializer.serialize(s)),
                { state: i, tree: s }
              );
            }),
          );
        }
        match(t) {
          const n = new xl(
            [],
            Object.freeze({}),
            Object.freeze({ ...this.urlTree.queryParams }),
            this.urlTree.fragment,
            Object.freeze({}),
            G,
            this.rootComponentType,
            null,
            {},
          );
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            G,
            n,
          ).pipe(
            J(r => ({ children: r, rootSnapshot: n })),
            Ni(r => {
              if (r instanceof Vl)
                return (
                  (this.urlTree = r.urlTree),
                  this.match(r.urlTree.root)
                );
              throw r instanceof om ? this.noMatchError(r) : r;
            }),
          );
        }
        processSegmentGroup(t, n, r, o, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r, i)
            : this.processSegment(t, n, r, r.segments, o, !0, i).pipe(
                J(s => (s instanceof _n ? [s] : [])),
              );
        }
        processChildren(t, n, r, o) {
          const i = [];
          for (const s of Object.keys(r.children))
            'primary' === s ? i.unshift(s) : i.push(s);
          return ut(i).pipe(
            Cl(s => {
              const a = r.children[s],
                u = (function M3(e, t) {
                  const n = e.filter(r => yn(r) === t);
                  return n.push(...e.filter(r => yn(r) !== t)), n;
                })(n, s);
              return this.processSegmentGroup(t, u, a, s, o);
            }),
            ZS((s, a) => (s.push(...a), s)),
            _l(null),
            (function LH(e, t) {
              const n = arguments.length >= 2;
              return r =>
                r.pipe(
                  e ? Sr((o, i) => e(o, i, r)) : Ln,
                  $g(1),
                  n ? _l(t) : WS(() => new ml()),
                );
            })(),
            bt(s => {
              if (null === s) return Li(r);
              const a = RM(s);
              return (
                (function yz(e) {
                  e.sort((t, n) =>
                    t.value.outlet === G
                      ? -1
                      : n.value.outlet === G
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet),
                  );
                })(a),
                z(a)
              );
            }),
          );
        }
        processSegment(t, n, r, o, i, s, a) {
          return ut(n).pipe(
            Cl(u =>
              this.processSegmentAgainstRoute(
                u._injector ?? t,
                n,
                u,
                r,
                o,
                i,
                s,
                a,
              ).pipe(
                Ni(c => {
                  if (c instanceof om) return z(null);
                  throw c;
                }),
              ),
            ),
            po(u => !!u),
            Ni(u => {
              if (TM(u))
                return (function hz(e, t, n) {
                  return 0 === t.length && !e.children[n];
                })(r, o, i)
                  ? z(new pz())
                  : Li(r);
              throw u;
            }),
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i, s, a, u) {
          return (function fz(e, t, n, r) {
            return (
              !!(yn(e) === r || (r !== G && jl(t, n, e))) &&
              sm(t, e, n).matched
            );
          })(r, o, i, s)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, o, r, i, s, u)
              : this.allowRedirects && a
              ? this.expandSegmentAgainstRouteUsingRedirect(
                  t,
                  o,
                  n,
                  r,
                  i,
                  s,
                  u,
                )
              : Li(o)
            : Li(o);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s, a) {
          const {
            matched: u,
            parameters: c,
            consumedSegments: l,
            positionalParamSegments: d,
            remainingSegments: f,
          } = sm(n, o, i);
          if (!u) return Li(n);
          'string' == typeof o.redirectTo &&
            '/' === o.redirectTo[0] &&
            (this.absoluteRedirectCount++,
            this.absoluteRedirectCount > 31 &&
              (this.allowRedirects = !1));
          const h = new xl(
              i,
              c,
              Object.freeze({ ...this.urlTree.queryParams }),
              this.urlTree.fragment,
              xM(o),
              yn(o),
              o.component ?? o._loadedComponent ?? null,
              o,
              OM(o),
            ),
            p = Rl(h, a, this.paramsInheritanceStrategy);
          (h.params = Object.freeze(p.params)),
            (h.data = Object.freeze(p.data));
          const g = this.applyRedirects.applyRedirectCommands(
            l,
            o.redirectTo,
            d,
            h,
            t,
          );
          return this.applyRedirects
            .lineralizeSegments(o, g)
            .pipe(
              bt(m =>
                this.processSegment(t, r, n, m.concat(f), s, !1, a),
              ),
            );
        }
        matchSegmentAgainstRoute(t, n, r, o, i, s) {
          const a = sz(n, r, o, t);
          return (
            '**' === r.path && (n.children = {}),
            a.pipe(
              tr(u =>
                u.matched
                  ? this.getChildConfig(
                      (t = r._injector ?? t),
                      r,
                      o,
                    ).pipe(
                      tr(({ routes: c }) => {
                        const l = r._loadedInjector ?? t,
                          {
                            parameters: d,
                            consumedSegments: f,
                            remainingSegments: h,
                          } = u,
                          p = new xl(
                            f,
                            d,
                            Object.freeze({
                              ...this.urlTree.queryParams,
                            }),
                            this.urlTree.fragment,
                            xM(r),
                            yn(r),
                            r.component ?? r._loadedComponent ?? null,
                            r,
                            OM(r),
                          ),
                          g = Rl(
                            p,
                            s,
                            this.paramsInheritanceStrategy,
                          );
                        (p.params = Object.freeze(g.params)),
                          (p.data = Object.freeze(g.data));
                        const { segmentGroup: m, slicedSegments: C } =
                          NM(n, f, h, c);
                        if (0 === C.length && m.hasChildren())
                          return this.processChildren(
                            l,
                            c,
                            m,
                            p,
                          ).pipe(J(M => new _n(p, M)));
                        if (0 === c.length && 0 === C.length)
                          return z(new _n(p, []));
                        const y = yn(r) === i;
                        return this.processSegment(
                          l,
                          c,
                          m,
                          C,
                          y ? G : i,
                          !0,
                          p,
                        ).pipe(
                          J(
                            M =>
                              new _n(p, M instanceof _n ? [M] : []),
                          ),
                        );
                      }),
                    )
                  : Li(n),
              ),
            )
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? z({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? z({
                  routes: n._loadedRoutes,
                  injector: n._loadedInjector,
                })
              : (function tz(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? z(!0)
                    : z(
                        o.map(s => {
                          const a = ki(s, e);
                          return Mr(
                            (function B3(e) {
                              return e && Na(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : Un(e, () => a(t, n)),
                          );
                        }),
                      ).pipe(Pi(), AM());
                })(t, n, r).pipe(
                  bt(o =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          It(i => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          }),
                        )
                      : (function oz(e) {
                          return yl(IM(!1, Qt.GuardRejected));
                        })(),
                  ),
                )
            : z({ routes: [], injector: t });
        }
      }
      function _z(e) {
        const t = e.value.routeConfig;
        return t && '' === t.path;
      }
      function RM(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!_z(r)) {
            t.push(r);
            continue;
          }
          const o = t.find(
            i => r.value.routeConfig === i.value.routeConfig,
          );
          void 0 !== o
            ? (o.children.push(...r.children), n.add(o))
            : t.push(r);
        }
        for (const r of n) {
          const o = RM(r.children);
          t.push(new _n(r.value, o));
        }
        return t.filter(r => !n.has(r));
      }
      function xM(e) {
        return e.data || {};
      }
      function OM(e) {
        return e.resolve || {};
      }
      function FM(e) {
        const t = e.children.map(n => FM(n)).flat();
        return [e, ...t];
      }
      function am(e) {
        return tr(t => {
          const n = e(t);
          return n ? ut(n).pipe(J(() => t)) : z(t);
        });
      }
      let kM = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find(i => i.outlet === G));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[_a];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: () => _(Iz),
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        Iz = (() => {
          class e extends kM {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(T(V$));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })();
      const Ra = new w('', {
        providedIn: 'root',
        factory: () => ({}),
      });
      let PM = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = ee({
            type: e,
            selectors: [['ng-component']],
            standalone: !0,
            features: [te],
            decls: 1,
            vars: 0,
            template: function (r, o) {
              1 & r && Y(0, 'router-outlet');
            },
            dependencies: [Ol],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      function um(e) {
        const t = e.children && e.children.map(um),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== G &&
            (n.component = PM),
          n
        );
      }
      const Ul = new w('');
      let LM = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = _(Xj));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return z(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Mr(n.loadComponent()).pipe(
                J(VM),
                It(i => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                Hg(() => {
                  this.componentLoaders.delete(n);
                }),
              ),
              o = new GS(r, () => new pt()).pipe(Bg());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r))
              return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return z({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = (function Sz(e, t, n, r) {
                return Mr(e.loadChildren()).pipe(
                  J(VM),
                  bt(o =>
                    o instanceof cE || Array.isArray(o)
                      ? z(o)
                      : ut(t.compileModuleAsync(o)),
                  ),
                  J(o => {
                    r && r(e);
                    let i,
                      s,
                      a = !1;
                    return (
                      Array.isArray(o)
                        ? ((s = o), !0)
                        : ((i = o.create(n).injector),
                          (s = i
                            .get(Ul, [], { optional: !0, self: !0 })
                            .flat())),
                      { routes: s.map(um), injector: i }
                    );
                  }),
                );
              })(r, this.compiler, n, this.onLoadEndListener).pipe(
                Hg(() => {
                  this.childrenLoaders.delete(r);
                }),
              ),
              s = new GS(i, () => new pt()).pipe(Bg());
            return this.childrenLoaders.set(r, s), s;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      function VM(e) {
        return (function Mz(e) {
          return e && 'object' == typeof e && 'default' in e;
        })(e)
          ? e.default
          : e;
      }
      let cm = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: () => _(Tz),
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        Tz = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })();
      const jM = new w(''),
        BM = new w('');
      let Bl = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.currentTransition = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new pt()),
              (this.transitionAbortSubject = new pt()),
              (this.configLoader = _(LM)),
              (this.environmentInjector = _(Ht)),
              (this.urlSerializer = _(xi)),
              (this.rootContexts = _(Sa)),
              (this.location = _(ha)),
              (this.inputBindingEnabled =
                null !== _(Fl, { optional: !0 })),
              (this.titleStrategy = _(kM)),
              (this.options = _(Ra, { optional: !0 }) || {}),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy ||
                'emptyOnly'),
              (this.urlHandlingStrategy = _(cm)),
              (this.createViewTransition = _(jM, { optional: !0 })),
              (this.navigationErrorHandler = _(BM, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => z(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = o =>
                this.events.next(new y3(o))),
              (this.configLoader.onLoadStartListener = o =>
                this.events.next(new v3(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({
              ...this.transitions.value,
              ...n,
              id: r,
            });
          }
          setupNavigations(n, r, o) {
            return (
              (this.transitions = new gt({
                id: 0,
                currentUrlTree: r,
                currentRawUrl: r,
                extractedUrl: this.urlHandlingStrategy.extract(r),
                urlAfterRedirects:
                  this.urlHandlingStrategy.extract(r),
                rawUrl: r,
                extras: {},
                resolve: () => {},
                reject: () => {},
                promise: Promise.resolve(!0),
                source: ba,
                restoredState: null,
                currentSnapshot: o.snapshot,
                targetSnapshot: null,
                currentRouterState: o,
                targetRouterState: null,
                guards: {
                  canActivateChecks: [],
                  canDeactivateChecks: [],
                },
                guardsResult: null,
              })),
              this.transitions.pipe(
                Sr(i => 0 !== i.id),
                J(i => ({
                  ...i,
                  extractedUrl: this.urlHandlingStrategy.extract(
                    i.rawUrl,
                  ),
                })),
                tr(i => {
                  let s = !1,
                    a = !1;
                  return z(i).pipe(
                    tr(u => {
                      if (this.navigationId > i.id)
                        return (
                          this.cancelNavigationTransition(
                            i,
                            '',
                            Qt.SupersededByNewNavigation,
                          ),
                          On
                        );
                      (this.currentTransition = i),
                        (this.currentNavigation = {
                          id: u.id,
                          initialUrl: u.rawUrl,
                          extractedUrl: u.extractedUrl,
                          targetBrowserUrl:
                            'string' == typeof u.extras.browserUrl
                              ? this.urlSerializer.parse(
                                  u.extras.browserUrl,
                                )
                              : u.extras.browserUrl,
                          trigger: u.source,
                          extras: u.extras,
                          previousNavigation: this
                            .lastSuccessfulNavigation
                            ? {
                                ...this.lastSuccessfulNavigation,
                                previousNavigation: null,
                              }
                            : null,
                        });
                      const c =
                        !n.navigated ||
                        this.isUpdatingInternalState() ||
                        this.isUpdatedBrowserUrl();
                      if (
                        !c &&
                        'reload' !==
                          (u.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const d = '';
                        return (
                          this.events.next(
                            new Oi(
                              u.id,
                              this.urlSerializer.serialize(u.rawUrl),
                              d,
                              Al.IgnoredSameUrlNavigation,
                            ),
                          ),
                          u.resolve(!1),
                          On
                        );
                      }
                      if (
                        this.urlHandlingStrategy.shouldProcessUrl(
                          u.rawUrl,
                        )
                      )
                        return z(u).pipe(
                          tr(d => {
                            const f = this.transitions?.getValue();
                            return (
                              this.events.next(
                                new Tl(
                                  d.id,
                                  this.urlSerializer.serialize(
                                    d.extractedUrl,
                                  ),
                                  d.source,
                                  d.restoredState,
                                ),
                              ),
                              f !== this.transitions?.getValue()
                                ? On
                                : Promise.resolve(d)
                            );
                          }),
                          (function Cz(e, t, n, r, o, i) {
                            return bt(s =>
                              (function gz(
                                e,
                                t,
                                n,
                                r,
                                o,
                                i,
                                s = 'emptyOnly',
                              ) {
                                return new vz(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  s,
                                  i,
                                ).recognize();
                              })(
                                e,
                                t,
                                n,
                                r,
                                s.extractedUrl,
                                o,
                                i,
                              ).pipe(
                                J(({ state: a, tree: u }) => ({
                                  ...s,
                                  targetSnapshot: a,
                                  urlAfterRedirects: u,
                                })),
                              ),
                            );
                          })(
                            this.environmentInjector,
                            this.configLoader,
                            this.rootComponentType,
                            n.config,
                            this.urlSerializer,
                            this.paramsInheritanceStrategy,
                          ),
                          It(d => {
                            (i.targetSnapshot = d.targetSnapshot),
                              (i.urlAfterRedirects =
                                d.urlAfterRedirects),
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: d.urlAfterRedirects,
                              });
                            const f = new gM(
                              d.id,
                              this.urlSerializer.serialize(
                                d.extractedUrl,
                              ),
                              this.urlSerializer.serialize(
                                d.urlAfterRedirects,
                              ),
                              d.targetSnapshot,
                            );
                            this.events.next(f);
                          }),
                        );
                      if (
                        c &&
                        this.urlHandlingStrategy.shouldProcessUrl(
                          u.currentRawUrl,
                        )
                      ) {
                        const {
                            id: d,
                            extractedUrl: f,
                            source: h,
                            restoredState: p,
                            extras: g,
                          } = u,
                          m = new Tl(
                            d,
                            this.urlSerializer.serialize(f),
                            h,
                            p,
                          );
                        this.events.next(m);
                        const C = _M(this.rootComponentType).snapshot;
                        return (
                          (this.currentTransition = i =
                            {
                              ...u,
                              targetSnapshot: C,
                              urlAfterRedirects: f,
                              extras: {
                                ...g,
                                skipLocationChange: !1,
                                replaceUrl: !1,
                              },
                            }),
                          (this.currentNavigation.finalUrl = f),
                          z(i)
                        );
                      }
                      {
                        const d = '';
                        return (
                          this.events.next(
                            new Oi(
                              u.id,
                              this.urlSerializer.serialize(
                                u.extractedUrl,
                              ),
                              d,
                              Al.IgnoredByUrlHandlingStrategy,
                            ),
                          ),
                          u.resolve(!1),
                          On
                        );
                      }
                    }),
                    It(u => {
                      const c = new h3(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(
                          u.urlAfterRedirects,
                        ),
                        u.targetSnapshot,
                      );
                      this.events.next(c);
                    }),
                    J(
                      u => (
                        (this.currentTransition = i =
                          {
                            ...u,
                            guards: P3(
                              u.targetSnapshot,
                              u.currentSnapshot,
                              this.rootContexts,
                            ),
                          }),
                        i
                      ),
                    ),
                    (function W3(e, t) {
                      return bt(n => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? z({ ...n, guardsResult: !0 })
                          : (function Z3(e, t, n, r) {
                              return ut(e).pipe(
                                bt(o =>
                                  (function ez(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? z(
                                          i.map(a => {
                                            const u = Ia(t) ?? o,
                                              c = ki(a, u);
                                            return Mr(
                                              (function z3(e) {
                                                return (
                                                  e &&
                                                  Na(e.canDeactivate)
                                                );
                                              })(c)
                                                ? c.canDeactivate(
                                                    e,
                                                    t,
                                                    n,
                                                    r,
                                                  )
                                                : Un(u, () =>
                                                    c(e, t, n, r),
                                                  ),
                                            ).pipe(po());
                                          }),
                                        ).pipe(Pi())
                                      : z(!0);
                                  })(o.component, o.route, n, t, r),
                                ),
                                po(o => !0 !== o, !0),
                              );
                            })(s, r, o, e).pipe(
                              bt(a =>
                                a &&
                                (function U3(e) {
                                  return 'boolean' == typeof e;
                                })(a)
                                  ? (function Q3(e, t, n, r) {
                                      return ut(t).pipe(
                                        Cl(o =>
                                          vl(
                                            (function K3(e, t) {
                                              return (
                                                null !== e &&
                                                  t &&
                                                  t(new _3(e)),
                                                z(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function Y3(e, t) {
                                              return (
                                                null !== e &&
                                                  t &&
                                                  t(new D3(e)),
                                                z(!0)
                                              );
                                            })(o.route, r),
                                            (function J3(e, t, n) {
                                              const r =
                                                  t[t.length - 1],
                                                i = t
                                                  .slice(
                                                    0,
                                                    t.length - 1,
                                                  )
                                                  .reverse()
                                                  .map(s =>
                                                    (function L3(e) {
                                                      const t =
                                                        e.routeConfig
                                                          ? e
                                                              .routeConfig
                                                              .canActivateChild
                                                          : null;
                                                      return t &&
                                                        0 !== t.length
                                                        ? {
                                                            node: e,
                                                            guards: t,
                                                          }
                                                        : null;
                                                    })(s),
                                                  )
                                                  .filter(
                                                    s => null !== s,
                                                  )
                                                  .map(s =>
                                                    zS(() =>
                                                      z(
                                                        s.guards.map(
                                                          u => {
                                                            const c =
                                                                Ia(
                                                                  s.node,
                                                                ) ??
                                                                n,
                                                              l = ki(
                                                                u,
                                                                c,
                                                              );
                                                            return Mr(
                                                              (function H3(
                                                                e,
                                                              ) {
                                                                return (
                                                                  e &&
                                                                  Na(
                                                                    e.canActivateChild,
                                                                  )
                                                                );
                                                              })(l)
                                                                ? l.canActivateChild(
                                                                    r,
                                                                    e,
                                                                  )
                                                                : Un(
                                                                    c,
                                                                    () =>
                                                                      l(
                                                                        r,
                                                                        e,
                                                                      ),
                                                                  ),
                                                            ).pipe(
                                                              po(),
                                                            );
                                                          },
                                                        ),
                                                      ).pipe(Pi()),
                                                    ),
                                                  );
                                              return z(i).pipe(Pi());
                                            })(e, o.path, n),
                                            (function X3(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig
                                                    .canActivate
                                                : null;
                                              if (
                                                !r ||
                                                0 === r.length
                                              )
                                                return z(!0);
                                              const o = r.map(i =>
                                                zS(() => {
                                                  const s =
                                                      Ia(t) ?? n,
                                                    a = ki(i, s);
                                                  return Mr(
                                                    (function $3(e) {
                                                      return (
                                                        e &&
                                                        Na(
                                                          e.canActivate,
                                                        )
                                                      );
                                                    })(a)
                                                      ? a.canActivate(
                                                          t,
                                                          e,
                                                        )
                                                      : Un(s, () =>
                                                          a(t, e),
                                                        ),
                                                  ).pipe(po());
                                                }),
                                              );
                                              return z(o).pipe(Pi());
                                            })(e, o.route, n),
                                          ),
                                        ),
                                        po(o => !0 !== o, !0),
                                      );
                                    })(r, i, e, t)
                                  : z(a),
                              ),
                              J(a => ({ ...n, guardsResult: a })),
                            );
                      });
                    })(this.environmentInjector, u =>
                      this.events.next(u),
                    ),
                    It(u => {
                      if (
                        ((i.guardsResult = u.guardsResult),
                        u.guardsResult &&
                          'boolean' != typeof u.guardsResult)
                      )
                        throw kl(0, u.guardsResult);
                      const c = new p3(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(
                          u.urlAfterRedirects,
                        ),
                        u.targetSnapshot,
                        !!u.guardsResult,
                      );
                      this.events.next(c);
                    }),
                    Sr(
                      u =>
                        !!u.guardsResult ||
                        (this.cancelNavigationTransition(
                          u,
                          '',
                          Qt.GuardRejected,
                        ),
                        !1),
                    ),
                    am(u => {
                      if (u.guards.canActivateChecks.length)
                        return z(u).pipe(
                          It(c => {
                            const l = new g3(
                              c.id,
                              this.urlSerializer.serialize(
                                c.extractedUrl,
                              ),
                              this.urlSerializer.serialize(
                                c.urlAfterRedirects,
                              ),
                              c.targetSnapshot,
                            );
                            this.events.next(l);
                          }),
                          tr(c => {
                            let l = !1;
                            return z(c).pipe(
                              (function Dz(e, t) {
                                return bt(n => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return z(n);
                                  const i = new Set(
                                      o.map(u => u.route),
                                    ),
                                    s = new Set();
                                  for (const u of i)
                                    if (!s.has(u))
                                      for (const c of FM(u)) s.add(c);
                                  let a = 0;
                                  return ut(s).pipe(
                                    Cl(u =>
                                      i.has(u)
                                        ? (function Ez(e, t, n, r) {
                                            const o = e.routeConfig,
                                              i = e._resolve;
                                            return (
                                              void 0 !== o?.title &&
                                                !EM(o) &&
                                                (i[_a] = o.title),
                                              (function wz(
                                                e,
                                                t,
                                                n,
                                                r,
                                              ) {
                                                const o = zg(e);
                                                if (0 === o.length)
                                                  return z({});
                                                const i = {};
                                                return ut(o).pipe(
                                                  bt(s =>
                                                    (function bz(
                                                      e,
                                                      t,
                                                      n,
                                                      r,
                                                    ) {
                                                      const o =
                                                          Ia(t) ?? r,
                                                        i = ki(e, o);
                                                      return Mr(
                                                        i.resolve
                                                          ? i.resolve(
                                                              t,
                                                              n,
                                                            )
                                                          : Un(
                                                              o,
                                                              () =>
                                                                i(
                                                                  t,
                                                                  n,
                                                                ),
                                                            ),
                                                      );
                                                    })(
                                                      e[s],
                                                      t,
                                                      n,
                                                      r,
                                                    ).pipe(
                                                      po(),
                                                      It(a => {
                                                        if (
                                                          a instanceof
                                                          rm
                                                        )
                                                          throw kl(
                                                            new El(),
                                                            a,
                                                          );
                                                        i[s] = a;
                                                      }),
                                                    ),
                                                  ),
                                                  $g(1),
                                                  (function VH(e) {
                                                    return J(() => e);
                                                  })(i),
                                                  Ni(s =>
                                                    TM(s)
                                                      ? On
                                                      : yl(s),
                                                  ),
                                                );
                                              })(i, e, t, r).pipe(
                                                J(
                                                  s => (
                                                    (e._resolvedData =
                                                      s),
                                                    (e.data = Rl(
                                                      e,
                                                      e.parent,
                                                      n,
                                                    ).resolve),
                                                    null
                                                  ),
                                                ),
                                              )
                                            );
                                          })(u, r, e, t)
                                        : ((u.data = Rl(
                                            u,
                                            u.parent,
                                            e,
                                          ).resolve),
                                          z(void 0)),
                                    ),
                                    It(() => a++),
                                    $g(1),
                                    bt(u =>
                                      a === s.size ? z(n) : On,
                                    ),
                                  );
                                });
                              })(
                                this.paramsInheritanceStrategy,
                                this.environmentInjector,
                              ),
                              It({
                                next: () => (l = !0),
                                complete: () => {
                                  l ||
                                    this.cancelNavigationTransition(
                                      c,
                                      '',
                                      Qt.NoDataFromResolver,
                                    );
                                },
                              }),
                            );
                          }),
                          It(c => {
                            const l = new m3(
                              c.id,
                              this.urlSerializer.serialize(
                                c.extractedUrl,
                              ),
                              this.urlSerializer.serialize(
                                c.urlAfterRedirects,
                              ),
                              c.targetSnapshot,
                            );
                            this.events.next(l);
                          }),
                        );
                    }),
                    am(u => {
                      const c = l => {
                        const d = [];
                        l.routeConfig?.loadComponent &&
                          !l.routeConfig._loadedComponent &&
                          d.push(
                            this.configLoader
                              .loadComponent(l.routeConfig)
                              .pipe(
                                It(f => {
                                  l.component = f;
                                }),
                                J(() => {}),
                              ),
                          );
                        for (const f of l.children) d.push(...c(f));
                        return d;
                      };
                      return jg(c(u.targetSnapshot.root)).pipe(
                        _l(null),
                        ho(1),
                      );
                    }),
                    am(() => this.afterPreactivation()),
                    tr(() => {
                      const {
                          currentSnapshot: u,
                          targetSnapshot: c,
                        } = i,
                        l = this.createViewTransition?.(
                          this.environmentInjector,
                          u.root,
                          c.root,
                        );
                      return l ? ut(l).pipe(J(() => i)) : z(i);
                    }),
                    J(u => {
                      const c = (function N3(e, t, n) {
                        const r = Ma(
                          e,
                          t._root,
                          n ? n._root : void 0,
                        );
                        return new yM(r, t);
                      })(
                        n.routeReuseStrategy,
                        u.targetSnapshot,
                        u.currentRouterState,
                      );
                      return (
                        (this.currentTransition = i =
                          { ...u, targetRouterState: c }),
                        (this.currentNavigation.targetRouterState =
                          c),
                        i
                      );
                    }),
                    It(() => {
                      this.events.next(new Yg());
                    }),
                    ((e, t, n, r) =>
                      J(
                        o => (
                          new k3(
                            t,
                            o.targetRouterState,
                            o.currentRouterState,
                            n,
                            r,
                          ).activate(e),
                          o
                        ),
                      ))(
                      this.rootContexts,
                      n.routeReuseStrategy,
                      u => this.events.next(u),
                      this.inputBindingEnabled,
                    ),
                    ho(1),
                    It({
                      next: u => {
                        (s = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          this.events.next(
                            new Tr(
                              u.id,
                              this.urlSerializer.serialize(
                                u.extractedUrl,
                              ),
                              this.urlSerializer.serialize(
                                u.urlAfterRedirects,
                              ),
                            ),
                          ),
                          this.titleStrategy?.updateTitle(
                            u.targetRouterState.snapshot,
                          ),
                          u.resolve(!0);
                      },
                      complete: () => {
                        s = !0;
                      },
                    }),
                    QS(
                      this.transitionAbortSubject.pipe(
                        It(u => {
                          throw u;
                        }),
                      ),
                    ),
                    Hg(() => {
                      !s &&
                        !a &&
                        this.cancelNavigationTransition(
                          i,
                          '',
                          Qt.SupersededByNewNavigation,
                        ),
                        this.currentTransition?.id === i.id &&
                          ((this.currentNavigation = null),
                          (this.currentTransition = null));
                    }),
                    Ni(u => {
                      if (((a = !0), SM(u)))
                        this.events.next(
                          new yo(
                            i.id,
                            this.urlSerializer.serialize(
                              i.extractedUrl,
                            ),
                            u.message,
                            u.cancellationCode,
                          ),
                        ),
                          (function O3(e) {
                            return SM(e) && vo(e.url);
                          })(u)
                            ? this.events.next(
                                new Nl(
                                  u.url,
                                  u.navigationBehaviorOptions,
                                ),
                              )
                            : i.resolve(!1);
                      else {
                        const c = new Qg(
                          i.id,
                          this.urlSerializer.serialize(
                            i.extractedUrl,
                          ),
                          u,
                          i.targetSnapshot ?? void 0,
                        );
                        try {
                          const l = Un(this.environmentInjector, () =>
                            this.navigationErrorHandler?.(c),
                          );
                          if (l instanceof rm) {
                            const {
                              message: d,
                              cancellationCode: f,
                            } = kl(0, l);
                            this.events.next(
                              new yo(
                                i.id,
                                this.urlSerializer.serialize(
                                  i.extractedUrl,
                                ),
                                d,
                                f,
                              ),
                            ),
                              this.events.next(
                                new Nl(
                                  l.redirectTo,
                                  l.navigationBehaviorOptions,
                                ),
                              );
                          } else {
                            this.events.next(c);
                            const d = n.errorHandler(u);
                            i.resolve(!!d);
                          }
                        } catch (l) {
                          this.options.resolveNavigationPromiseOnError
                            ? i.resolve(!1)
                            : i.reject(l);
                        }
                      }
                      return On;
                    }),
                  );
                }),
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new yo(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o,
            );
            this.events.next(i), n.resolve(!1);
          }
          isUpdatingInternalState() {
            return (
              this.currentTransition?.extractedUrl.toString() !==
              this.currentTransition?.currentUrlTree.toString()
            );
          }
          isUpdatedBrowserUrl() {
            const n = this.urlHandlingStrategy.extract(
                this.urlSerializer.parse(this.location.path(!0)),
              ),
              r =
                this.currentNavigation?.targetBrowserUrl ??
                this.currentNavigation?.extractedUrl;
            return (
              n.toString() !== r?.toString() &&
              !this.currentNavigation?.extras.skipLocationChange
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      function Rz(e) {
        return e !== ba;
      }
      let xz = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: () => _(Fz),
            providedIn: 'root',
          }));
        }
        return e;
      })();
      class Oz {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let Fz = (() => {
          class e extends Oz {
            static #e = (this.ɵfac = (() => {
              let n;
              return function (o) {
                return (n || (n = $e(e)))(o || e);
              };
            })());
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        $M = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: () => _(kz),
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        kz = (() => {
          class e extends $M {
            constructor() {
              super(...arguments),
                (this.location = _(ha)),
                (this.urlSerializer = _(xi)),
                (this.options = _(Ra, { optional: !0 }) || {}),
                (this.canceledNavigationResolution =
                  this.options.canceledNavigationResolution ||
                  'replace'),
                (this.urlHandlingStrategy = _(cm)),
                (this.urlUpdateStrategy =
                  this.options.urlUpdateStrategy || 'deferred'),
                (this.currentUrlTree = new go()),
                (this.rawUrlTree = this.currentUrlTree),
                (this.currentPageId = 0),
                (this.lastSuccessfulId = -1),
                (this.routerState = _M(null)),
                (this.stateMemento = this.createStateMemento());
            }
            getCurrentUrlTree() {
              return this.currentUrlTree;
            }
            getRawUrlTree() {
              return this.rawUrlTree;
            }
            restoredState() {
              return this.location.getState();
            }
            get browserPageId() {
              return 'computed' !== this.canceledNavigationResolution
                ? this.currentPageId
                : this.restoredState()?.ɵrouterPageId ??
                    this.currentPageId;
            }
            getRouterState() {
              return this.routerState;
            }
            createStateMemento() {
              return {
                rawUrlTree: this.rawUrlTree,
                currentUrlTree: this.currentUrlTree,
                routerState: this.routerState,
              };
            }
            registerNonRouterCurrentEntryChangeListener(n) {
              return this.location.subscribe(r => {
                'popstate' === r.type && n(r.url, r.state);
              });
            }
            handleRouterEvent(n, r) {
              if (n instanceof Tl)
                this.stateMemento = this.createStateMemento();
              else if (n instanceof Oi)
                this.rawUrlTree = r.initialUrl;
              else if (n instanceof gM) {
                if (
                  'eager' === this.urlUpdateStrategy &&
                  !r.extras.skipLocationChange
                ) {
                  const o = this.urlHandlingStrategy.merge(
                    r.finalUrl,
                    r.initialUrl,
                  );
                  this.setBrowserUrl(r.targetBrowserUrl ?? o, r);
                }
              } else
                n instanceof Yg
                  ? ((this.currentUrlTree = r.finalUrl),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      r.finalUrl,
                      r.initialUrl,
                    )),
                    (this.routerState = r.targetRouterState),
                    'deferred' === this.urlUpdateStrategy &&
                      !r.extras.skipLocationChange &&
                      this.setBrowserUrl(
                        r.targetBrowserUrl ?? this.rawUrlTree,
                        r,
                      ))
                  : n instanceof yo &&
                    (n.code === Qt.GuardRejected ||
                      n.code === Qt.NoDataFromResolver)
                  ? this.restoreHistory(r)
                  : n instanceof Qg
                  ? this.restoreHistory(r, !0)
                  : n instanceof Tr &&
                    ((this.lastSuccessfulId = n.id),
                    (this.currentPageId = this.browserPageId));
            }
            setBrowserUrl(n, r) {
              const o =
                n instanceof go ? this.urlSerializer.serialize(n) : n;
              if (
                this.location.isCurrentPathEqualTo(o) ||
                r.extras.replaceUrl
              ) {
                const s = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(
                    r.id,
                    this.browserPageId,
                  ),
                };
                this.location.replaceState(o, '', s);
              } else {
                const i = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(
                    r.id,
                    this.browserPageId + 1,
                  ),
                };
                this.location.go(o, '', i);
              }
            }
            restoreHistory(n, r = !1) {
              if ('computed' === this.canceledNavigationResolution) {
                const i = this.currentPageId - this.browserPageId;
                0 !== i
                  ? this.location.historyGo(i)
                  : this.currentUrlTree === n.finalUrl &&
                    0 === i &&
                    (this.resetState(n),
                    this.resetUrlToCurrentUrlTree());
              } else
                'replace' === this.canceledNavigationResolution &&
                  (r && this.resetState(n),
                  this.resetUrlToCurrentUrlTree());
            }
            resetState(n) {
              (this.routerState = this.stateMemento.routerState),
                (this.currentUrlTree =
                  this.stateMemento.currentUrlTree),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n.finalUrl ?? this.rawUrlTree,
                ));
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                '',
                this.generateNgRouterState(
                  this.lastSuccessfulId,
                  this.currentPageId,
                ),
              );
            }
            generateNgRouterState(n, r) {
              return 'computed' === this.canceledNavigationResolution
                ? { navigationId: n, ɵrouterPageId: r }
                : { navigationId: n };
            }
            static #e = (this.ɵfac = (() => {
              let n;
              return function (o) {
                return (n || (n = $e(e)))(o || e);
              };
            })());
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })();
      var xa = (function (e) {
        return (
          (e[(e.COMPLETE = 0)] = 'COMPLETE'),
          (e[(e.FAILED = 1)] = 'FAILED'),
          (e[(e.REDIRECTING = 2)] = 'REDIRECTING'),
          e
        );
      })(xa || {});
      function Pz(e) {
        throw e;
      }
      const Lz = {
          paths: 'exact',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'exact',
        },
        Vz = {
          paths: 'subset',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'subset',
        };
      let nr = (() => {
          class e {
            get currentUrlTree() {
              return this.stateManager.getCurrentUrlTree();
            }
            get rawUrlTree() {
              return this.stateManager.getRawUrlTree();
            }
            get events() {
              return this._events;
            }
            get routerState() {
              return this.stateManager.getRouterState();
            }
            constructor() {
              (this.disposed = !1),
                (this.console = _(Lb)),
                (this.stateManager = _($M)),
                (this.options = _(Ra, { optional: !0 }) || {}),
                (this.pendingTasks = _(Zr)),
                (this.urlUpdateStrategy =
                  this.options.urlUpdateStrategy || 'deferred'),
                (this.navigationTransitions = _(Bl)),
                (this.urlSerializer = _(xi)),
                (this.location = _(ha)),
                (this.urlHandlingStrategy = _(cm)),
                (this._events = new pt()),
                (this.errorHandler = this.options.errorHandler || Pz),
                (this.navigated = !1),
                (this.routeReuseStrategy = _(xz)),
                (this.onSameUrlNavigation =
                  this.options.onSameUrlNavigation || 'ignore'),
                (this.config = _(Ul, { optional: !0 })?.flat() ?? []),
                (this.componentInputBindingEnabled = !!_(Fl, {
                  optional: !0,
                })),
                (this.eventsSubscription = new ot()),
                this.resetConfig(this.config),
                this.navigationTransitions
                  .setupNavigations(
                    this,
                    this.currentUrlTree,
                    this.routerState,
                  )
                  .subscribe({
                    error: n => {
                      this.console.warn(n);
                    },
                  }),
                this.subscribeToNavigationEvents();
            }
            subscribeToNavigationEvents() {
              const n = this.navigationTransitions.events.subscribe(
                r => {
                  try {
                    const o =
                        this.navigationTransitions.currentTransition,
                      i =
                        this.navigationTransitions.currentNavigation;
                    if (null !== o && null !== i)
                      if (
                        (this.stateManager.handleRouterEvent(r, i),
                        r instanceof yo &&
                          r.code !== Qt.Redirect &&
                          r.code !== Qt.SupersededByNewNavigation)
                      )
                        this.navigated = !0;
                      else if (r instanceof Tr) this.navigated = !0;
                      else if (r instanceof Nl) {
                        const s = r.navigationBehaviorOptions,
                          a = this.urlHandlingStrategy.merge(
                            r.url,
                            o.currentRawUrl,
                          ),
                          u = {
                            browserUrl: o.extras.browserUrl,
                            info: o.extras.info,
                            skipLocationChange:
                              o.extras.skipLocationChange,
                            replaceUrl:
                              o.extras.replaceUrl ||
                              'eager' === this.urlUpdateStrategy ||
                              Rz(o.source),
                            ...s,
                          };
                        this.scheduleNavigation(a, ba, null, u, {
                          resolve: o.resolve,
                          reject: o.reject,
                          promise: o.promise,
                        });
                      }
                    (function Uz(e) {
                      return !(e instanceof Yg || e instanceof Nl);
                    })(r) && this._events.next(r);
                  } catch (o) {
                    this.navigationTransitions.transitionAbortSubject.next(
                      o,
                    );
                  }
                },
              );
              this.eventsSubscription.add(n);
            }
            resetRootComponentType(n) {
              (this.routerState.root.component = n),
                (this.navigationTransitions.rootComponentType = n);
            }
            initialNavigation() {
              this.setUpLocationChangeListener(),
                this.navigationTransitions.hasRequestedNavigation ||
                  this.navigateToSyncWithBrowser(
                    this.location.path(!0),
                    ba,
                    this.stateManager.restoredState(),
                  );
            }
            setUpLocationChangeListener() {
              this.nonRouterCurrentEntryChangeSubscription ??=
                this.stateManager.registerNonRouterCurrentEntryChangeListener(
                  (n, r) => {
                    setTimeout(() => {
                      this.navigateToSyncWithBrowser(
                        n,
                        'popstate',
                        r,
                      );
                    }, 0);
                  },
                );
            }
            navigateToSyncWithBrowser(n, r, o) {
              const i = { replaceUrl: !0 },
                s = o?.navigationId ? o : null;
              if (o) {
                const u = { ...o };
                delete u.navigationId,
                  delete u.ɵrouterPageId,
                  0 !== Object.keys(u).length && (i.state = u);
              }
              const a = this.parseUrl(n);
              this.scheduleNavigation(a, r, s, i);
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.navigationTransitions.currentNavigation;
            }
            get lastSuccessfulNavigation() {
              return this.navigationTransitions
                .lastSuccessfulNavigation;
            }
            resetConfig(n) {
              (this.config = n.map(um)), (this.navigated = !1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.navigationTransitions.complete(),
                this.nonRouterCurrentEntryChangeSubscription &&
                  (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
                  (this.nonRouterCurrentEntryChangeSubscription =
                    void 0)),
                (this.disposed = !0),
                this.eventsSubscription.unsubscribe();
            }
            createUrlTree(n, r = {}) {
              const {
                  relativeTo: o,
                  queryParams: i,
                  fragment: s,
                  queryParamsHandling: a,
                  preserveFragment: u,
                } = r,
                c = u ? this.currentUrlTree.fragment : s;
              let d,
                l = null;
              switch (a) {
                case 'merge':
                  l = { ...this.currentUrlTree.queryParams, ...i };
                  break;
                case 'preserve':
                  l = this.currentUrlTree.queryParams;
                  break;
                default:
                  l = i || null;
              }
              null !== l && (l = this.removeEmptyProps(l));
              try {
                d = uM(
                  o ? o.snapshot : this.routerState.snapshot.root,
                );
              } catch {
                ('string' != typeof n[0] || '/' !== n[0][0]) &&
                  (n = []),
                  (d = this.currentUrlTree.root);
              }
              return cM(d, n, l, c ?? null);
            }
            navigateByUrl(n, r = { skipLocationChange: !1 }) {
              const o = vo(n) ? n : this.parseUrl(n),
                i = this.urlHandlingStrategy.merge(
                  o,
                  this.rawUrlTree,
                );
              return this.scheduleNavigation(i, ba, null, r);
            }
            navigate(n, r = { skipLocationChange: !1 }) {
              return (
                (function jz(e) {
                  for (let t = 0; t < e.length; t++)
                    if (null == e[t]) throw new D(4008, !1);
                })(n),
                this.navigateByUrl(this.createUrlTree(n, r), r)
              );
            }
            serializeUrl(n) {
              return this.urlSerializer.serialize(n);
            }
            parseUrl(n) {
              try {
                return this.urlSerializer.parse(n);
              } catch {
                return this.urlSerializer.parse('/');
              }
            }
            isActive(n, r) {
              let o;
              if (
                ((o =
                  !0 === r ? { ...Lz } : !1 === r ? { ...Vz } : r),
                vo(n))
              )
                return JS(this.currentUrlTree, n, o);
              const i = this.parseUrl(n);
              return JS(this.currentUrlTree, i, o);
            }
            removeEmptyProps(n) {
              return Object.entries(n).reduce(
                (r, [o, i]) => (null != i && (r[o] = i), r),
                {},
              );
            }
            scheduleNavigation(n, r, o, i, s) {
              if (this.disposed) return Promise.resolve(!1);
              let a, u, c;
              s
                ? ((a = s.resolve), (u = s.reject), (c = s.promise))
                : (c = new Promise((d, f) => {
                    (a = d), (u = f);
                  }));
              const l = this.pendingTasks.add();
              return (
                (function HM(e, t) {
                  e.events
                    .pipe(
                      Sr(
                        n =>
                          n instanceof Tr ||
                          n instanceof yo ||
                          n instanceof Qg ||
                          n instanceof Oi,
                      ),
                      J(n =>
                        n instanceof Tr || n instanceof Oi
                          ? xa.COMPLETE
                          : n instanceof yo &&
                            (n.code === Qt.Redirect ||
                              n.code === Qt.SupersededByNewNavigation)
                          ? xa.REDIRECTING
                          : xa.FAILED,
                      ),
                      Sr(n => n !== xa.REDIRECTING),
                      ho(1),
                    )
                    .subscribe(() => {
                      t();
                    });
                })(this, () => {
                  queueMicrotask(() => this.pendingTasks.remove(l));
                }),
                this.navigationTransitions.handleNavigationRequest({
                  source: r,
                  restoredState: o,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  rawUrl: n,
                  extras: i,
                  resolve: a,
                  reject: u,
                  promise: c,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                c.catch(d => Promise.reject(d))
              );
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        $l = (() => {
          class e {
            constructor(n, r, o, i, s, a) {
              (this.router = n),
                (this.route = r),
                (this.tabIndexAttribute = o),
                (this.renderer = i),
                (this.el = s),
                (this.locationStrategy = a),
                (this.href = null),
                (this.onChanges = new pt()),
                (this.preserveFragment = !1),
                (this.skipLocationChange = !1),
                (this.replaceUrl = !1),
                (this.routerLinkInput = null);
              const u = s.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = 'a' === u || 'area' === u),
                this.isAnchorElement
                  ? (this.subscription = n.events.subscribe(c => {
                      c instanceof Tr && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl('0');
            }
            setTabIndexIfNotOnNativeEl(n) {
              null != this.tabIndexAttribute ||
                this.isAnchorElement ||
                this.applyAttributeValue('tabindex', n);
            }
            ngOnChanges(n) {
              this.isAnchorElement && this.updateHref(),
                this.onChanges.next(this);
            }
            set routerLink(n) {
              null == n
                ? ((this.routerLinkInput = null),
                  this.setTabIndexIfNotOnNativeEl(null))
                : ((this.routerLinkInput =
                    vo(n) || Array.isArray(n) ? n : [n]),
                  this.setTabIndexIfNotOnNativeEl('0'));
            }
            onClick(n, r, o, i, s) {
              const a = this.urlTree;
              return (
                !!(
                  null === a ||
                  (this.isAnchorElement &&
                    (0 !== n ||
                      r ||
                      o ||
                      i ||
                      s ||
                      ('string' == typeof this.target &&
                        '_self' != this.target)))
                ) ||
                (this.router.navigateByUrl(a, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                  info: this.info,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              const n = this.urlTree;
              this.href =
                null !== n && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(
                      this.router.serializeUrl(n),
                    )
                  : null;
              const r =
                null === this.href
                  ? null
                  : (function uC(e, t, n) {
                      return (function VO(e, t) {
                        return ('src' === t &&
                          ('embed' === e ||
                            'frame' === e ||
                            'iframe' === e ||
                            'media' === e ||
                            'script' === e)) ||
                          ('href' === t &&
                            ('base' === e || 'link' === e))
                          ? aC
                          : rh;
                      })(
                        t,
                        n,
                      )(e);
                    })(
                      this.href,
                      this.el.nativeElement.tagName.toLowerCase(),
                      'href',
                    );
              this.applyAttributeValue('href', r);
            }
            applyAttributeValue(n, r) {
              const o = this.renderer,
                i = this.el.nativeElement;
              null !== r
                ? o.setAttribute(i, n, r)
                : o.removeAttribute(i, n);
            }
            get urlTree() {
              return null === this.routerLinkInput
                ? null
                : vo(this.routerLinkInput)
                ? this.routerLinkInput
                : this.router.createUrlTree(this.routerLinkInput, {
                    relativeTo:
                      void 0 !== this.relativeTo
                        ? this.relativeTo
                        : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(
                E(nr),
                E(Ar),
                (function fs(e) {
                  return (function ux(e, t) {
                    if ('class' === t) return e.classes;
                    if ('style' === t) return e.styles;
                    const n = e.attrs;
                    if (n) {
                      const r = n.length;
                      let o = 0;
                      for (; o < r; ) {
                        const i = n[o];
                        if (ey(i)) break;
                        if (0 === i) o += 2;
                        else if ('number' == typeof i)
                          for (
                            o++;
                            o < r && 'string' == typeof n[o];

                          )
                            o++;
                        else {
                          if (i === t) return n[o + 1];
                          o += 2;
                        }
                      }
                    }
                    return null;
                  })(fe(), e);
                })('tabindex'),
                E(Zn),
                E(Gt),
                E(Mi),
              );
            });
            static #t = (this.ɵdir = U({
              type: e,
              selectors: [['', 'routerLink', '']],
              hostVars: 1,
              hostBindings: function (r, o) {
                1 & r &&
                  me('click', function (s) {
                    return o.onClick(
                      s.button,
                      s.ctrlKey,
                      s.shiftKey,
                      s.altKey,
                      s.metaKey,
                    );
                  }),
                  2 & r && An('target', o.target);
              },
              inputs: {
                target: 'target',
                queryParams: 'queryParams',
                fragment: 'fragment',
                queryParamsHandling: 'queryParamsHandling',
                state: 'state',
                info: 'info',
                relativeTo: 'relativeTo',
                preserveFragment: [
                  2,
                  'preserveFragment',
                  'preserveFragment',
                  Si,
                ],
                skipLocationChange: [
                  2,
                  'skipLocationChange',
                  'skipLocationChange',
                  Si,
                ],
                replaceUrl: [2, 'replaceUrl', 'replaceUrl', Si],
                routerLink: 'routerLink',
              },
              standalone: !0,
              features: [uE, Kt],
            }));
          }
          return e;
        })();
      const lm = new w('');
      let zM = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = 'imperative'),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration ||= 'disabled'),
              (s.anchorScrolling ||= 'disabled');
          }
          init() {
            'disabled' !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration(
                'manual',
              ),
              (this.routerEventsSubscription =
                this.createScrollEvents()),
              (this.scrollEventsSubscription =
                this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe(n => {
              n instanceof Tl
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Tr
                ? ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects)
                      .fragment,
                  ))
                : n instanceof Oi &&
                  n.code === Al.IgnoredSameUrlNavigation &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.url).fragment,
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe(n => {
              n instanceof mM &&
                (n.position
                  ? 'top' === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : 'enabled' ===
                        this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(
                        n.position,
                      )
                  : n.anchor &&
                    'enabled' === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : 'disabled' !==
                      this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new mM(
                      n,
                      'popstate' === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r,
                    ),
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (r) {
            !(function OC() {
              throw new Error('invalid');
            })();
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function GM(e) {
        return e.routerState.root;
      }
      function Pn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function qM() {
        const e = _(He);
        return t => {
          const n = e.get(pn);
          if (t !== n.components[0]) return;
          const r = e.get(nr),
            o = e.get(WM);
          1 === e.get(dm) && r.initialNavigation(),
            e.get(ZM, null, Q.Optional)?.setUpPreloading(),
            e.get(lm, null, Q.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const WM = new w('', { factory: () => new pt() }),
        dm = new w('', { providedIn: 'root', factory: () => 1 }),
        ZM = new w('');
      function YM(e) {
        return Array.isArray(e) ? e : [e];
      }
      class Jz extends ot {
        constructor(t, n) {
          super();
        }
        schedule(t, n = 0) {
          return this;
        }
      }
      const Hl = {
        setInterval(e, t, ...n) {
          const { delegate: r } = Hl;
          return r?.setInterval
            ? r.setInterval(e, t, ...n)
            : setInterval(e, t, ...n);
        },
        clearInterval(e) {
          const { delegate: t } = Hl;
          return (t?.clearInterval || clearInterval)(e);
        },
        delegate: void 0,
      };
      class KM extends Jz {
        constructor(t, n) {
          super(t, n),
            (this.scheduler = t),
            (this.work = n),
            (this.pending = !1);
        }
        schedule(t, n = 0) {
          var r;
          if (this.closed) return this;
          this.state = t;
          const o = this.id,
            i = this.scheduler;
          return (
            null != o && (this.id = this.recycleAsyncId(i, o, n)),
            (this.pending = !0),
            (this.delay = n),
            (this.id =
              null !== (r = this.id) && void 0 !== r
                ? r
                : this.requestAsyncId(i, this.id, n)),
            this
          );
        }
        requestAsyncId(t, n, r = 0) {
          return Hl.setInterval(t.flush.bind(t, this), r);
        }
        recycleAsyncId(t, n, r = 0) {
          if (null != r && this.delay === r && !1 === this.pending)
            return n;
          null != n && Hl.clearInterval(n);
        }
        execute(t, n) {
          if (this.closed)
            return new Error('executing a cancelled action');
          this.pending = !1;
          const r = this._execute(t, n);
          if (r) return r;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(
              this.scheduler,
              this.id,
              null,
            ));
        }
        _execute(t, n) {
          let o,
            r = !1;
          try {
            this.work(t);
          } catch (i) {
            (r = !0),
              (o =
                i || new Error('Scheduled action threw falsy error'));
          }
          if (r) return this.unsubscribe(), o;
        }
        unsubscribe() {
          if (!this.closed) {
            const { id: t, scheduler: n } = this,
              { actions: r } = n;
            (this.work = this.state = this.scheduler = null),
              (this.pending = !1),
              Ya(r, this),
              null != t &&
                (this.id = this.recycleAsyncId(n, t, null)),
              (this.delay = null),
              super.unsubscribe();
          }
        }
      }
      const XM = {
        now: () => (XM.delegate || Date).now(),
        delegate: void 0,
      };
      class Oa {
        constructor(t, n = Oa.now) {
          (this.schedulerActionCtor = t), (this.now = n);
        }
        schedule(t, n = 0, r) {
          return new this.schedulerActionCtor(this, t).schedule(r, n);
        }
      }
      Oa.now = XM.now;
      class JM extends Oa {
        constructor(t, n = Oa.now) {
          super(t, n), (this.actions = []), (this._active = !1);
        }
        flush(t) {
          const { actions: n } = this;
          if (this._active) return void n.push(t);
          let r;
          this._active = !0;
          do {
            if ((r = t.execute(t.state, t.delay))) break;
          } while ((t = n.shift()));
          if (((this._active = !1), r)) {
            for (; (t = n.shift()); ) t.unsubscribe();
            throw r;
          }
        }
      }
      const eG = new JM(KM);
      let fm;
      try {
        fm = typeof Intl < 'u' && Intl.v8BreakIterator;
      } catch {
        fm = !1;
      }
      let nG = (() => {
        class e {
          constructor(n) {
            (this._platformId = n),
              (this.isBrowser = this._platformId
                ? nS(this._platformId)
                : 'object' == typeof document && !!document),
              (this.EDGE =
                this.isBrowser &&
                /(edge)/i.test(navigator.userAgent)),
              (this.TRIDENT =
                this.isBrowser &&
                /(msie|trident)/i.test(navigator.userAgent)),
              (this.BLINK =
                this.isBrowser &&
                !(!window.chrome && !fm) &&
                typeof CSS < 'u' &&
                !this.EDGE &&
                !this.TRIDENT),
              (this.WEBKIT =
                this.isBrowser &&
                /AppleWebKit/i.test(navigator.userAgent) &&
                !this.BLINK &&
                !this.EDGE &&
                !this.TRIDENT),
              (this.IOS =
                this.isBrowser &&
                /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !('MSStream' in window)),
              (this.FIREFOX =
                this.isBrowser &&
                /(firefox|minefield)/i.test(navigator.userAgent)),
              (this.ANDROID =
                this.isBrowser &&
                /android/i.test(navigator.userAgent) &&
                !this.TRIDENT),
              (this.SAFARI =
                this.isBrowser &&
                /safari/i.test(navigator.userAgent) &&
                this.WEBKIT);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(T(hr));
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      const tT = new Set();
      let Co,
        iG = (() => {
          class e {
            constructor(n, r) {
              (this._platform = n),
                (this._nonce = r),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia
                    ? window.matchMedia.bind(window)
                    : aG);
            }
            matchMedia(n) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function sG(e, t) {
                    if (!tT.has(e))
                      try {
                        Co ||
                          ((Co = document.createElement('style')),
                          t && Co.setAttribute('nonce', t),
                          Co.setAttribute('type', 'text/css'),
                          document.head.appendChild(Co)),
                          Co.sheet &&
                            (Co.sheet.insertRule(
                              `@media ${e} {body{ }}`,
                              0,
                            ),
                            tT.add(e));
                      } catch (n) {
                        console.error(n);
                      }
                  })(n, this._nonce),
                this._matchMedia(n)
              );
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(T(nG), T(jf, 8));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })();
      function aG(e) {
        return {
          matches: 'all' === e || '' === e,
          media: e,
          addListener: () => {},
          removeListener: () => {},
        };
      }
      let uG = (() => {
        class e {
          constructor(n, r) {
            (this._mediaMatcher = n),
              (this._zone = r),
              (this._queries = new Map()),
              (this._destroySubject = new pt());
          }
          ngOnDestroy() {
            this._destroySubject.next(),
              this._destroySubject.complete();
          }
          isMatched(n) {
            return nT(YM(n)).some(
              o => this._registerQuery(o).mql.matches,
            );
          }
          observe(n) {
            let i = jg(
              nT(YM(n)).map(s => this._registerQuery(s).observable),
            );
            return (
              (i = vl(
                i.pipe(ho(1)),
                i.pipe(
                  (function Xz(e) {
                    return Sr((t, n) => e <= n);
                  })(1),
                  (function tG(e, t = eG) {
                    return Ve((n, r) => {
                      let o = null,
                        i = null,
                        s = null;
                      const a = () => {
                        if (o) {
                          o.unsubscribe(), (o = null);
                          const c = i;
                          (i = null), r.next(c);
                        }
                      };
                      function u() {
                        const c = s + e,
                          l = t.now();
                        if (l < c)
                          return (
                            (o = this.schedule(void 0, c - l)),
                            void r.add(o)
                          );
                        a();
                      }
                      n.subscribe(
                        Ae(
                          r,
                          c => {
                            (i = c),
                              (s = t.now()),
                              o || ((o = t.schedule(u, e)), r.add(o));
                          },
                          () => {
                            a(), r.complete();
                          },
                          void 0,
                          () => {
                            i = o = null;
                          },
                        ),
                      );
                    });
                  })(0),
                ),
              )),
              i.pipe(
                J(s => {
                  const a = { matches: !1, breakpoints: {} };
                  return (
                    s.forEach(({ matches: u, query: c }) => {
                      (a.matches = a.matches || u),
                        (a.breakpoints[c] = u);
                    }),
                    a
                  );
                }),
              )
            );
          }
          _registerQuery(n) {
            if (this._queries.has(n)) return this._queries.get(n);
            const r = this._mediaMatcher.matchMedia(n),
              i = {
                observable: new xe(s => {
                  const a = u => this._zone.run(() => s.next(u));
                  return (
                    r.addListener(a),
                    () => {
                      r.removeListener(a);
                    }
                  );
                }).pipe(
                  qS(r),
                  J(({ matches: s }) => ({ query: n, matches: s })),
                  QS(this._destroySubject),
                ),
                mql: r,
              };
            return this._queries.set(n, i), i;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(T(iG), T(ie));
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      function nT(e) {
        return e
          .map(t => t.split(','))
          .reduce((t, n) => t.concat(n))
          .map(t => t.trim());
      }
      const St_XSmall = '(max-width: 599.98px)',
        St_Small = '(min-width: 600px) and (max-width: 959.98px)',
        St_Medium = '(min-width: 960px) and (max-width: 1279.98px)',
        St_Large = '(min-width: 1280px) and (max-width: 1919.98px)',
        St_XLarge = '(min-width: 1920px)';
      var ct = (function (e) {
        return (
          (e.XSmall = 'XSmall'),
          (e.Small = 'Small'),
          (e.Medium = 'Medium'),
          (e.Large = 'Large'),
          (e.XLarge = 'XLarge'),
          e
        );
      })(ct || {});
      let pm = (() => {
        class e {
          constructor(n) {
            (this.observer = n),
              (this.observers = new Map()),
              this.getBreakpointsObserve().subscribe(r => {
                r.breakpoints[St_XSmall]
                  ? this.notifyObservers({ breakpoint: ct.XSmall })
                  : r.breakpoints[St_Small]
                  ? this.notifyObservers({ breakpoint: ct.Small })
                  : r.breakpoints[St_Medium]
                  ? this.notifyObservers({ breakpoint: ct.Medium })
                  : r.breakpoints[St_Large]
                  ? this.notifyObservers({ breakpoint: ct.Large })
                  : r.breakpoints[St_XLarge] &&
                    this.notifyObservers({ breakpoint: ct.XLarge });
              });
          }
          addObserver(n) {
            if (this.observers.has(n))
              throw new Error('Object is already registered!');
            this.observers.set(n, n),
              this.getBreakpointsObserve()
                .subscribe(r => {
                  r.breakpoints[St_XSmall]
                    ? n.update({ breakpoint: ct.XSmall })
                    : r.breakpoints[St_Small]
                    ? n.update({ breakpoint: ct.Small })
                    : r.breakpoints[St_Medium]
                    ? n.update({ breakpoint: ct.Medium })
                    : r.breakpoints[St_Large]
                    ? n.update({ breakpoint: ct.Large })
                    : r.breakpoints[St_XLarge] &&
                      n.update({ breakpoint: ct.XLarge });
                })
                .unsubscribe();
          }
          removeObserver(n) {
            if (!this.observers.has(n))
              throw new Error('Object is not registered!');
            this.observers.delete(n);
          }
          notifyObservers(n) {
            this.observers.forEach(r => {
              r.update(n);
            });
          }
          getBreakpointsObserve() {
            return this.observer.observe([
              St_XSmall,
              St_Small,
              St_Medium,
              St_Large,
              St_XLarge,
            ]);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(T(uG));
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      const cG = ['self'],
        lG = ['*'];
      let dG = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = ee({
            type: e,
            selectors: [['lib-wrapper']],
            viewQuery: function (r, o) {
              if ((1 & r && kc(cG, 5), 2 & r)) {
                let i;
                Js((i = ea())) && (o.self = i.first);
              }
            },
            standalone: !0,
            features: [te],
            ngContentSelectors: lG,
            decls: 3,
            vars: 0,
            consts: [['self', '']],
            template: function (r, o) {
              1 & r && (Er(), x(0, 'div', null, 0), Qn(2), L());
            },
            encapsulation: 2,
          }));
        }
        return e;
      })();
      const fG = ['*'];
      let ji = (() => {
        class e {
          constructor() {
            (this.flexDirection = 'row'),
              (this.alignItems = 'stretch'),
              (this.justifyContent = 'stretch'),
              (this.gap = '0'),
              (this.flexWrap = 'wrap');
          }
          buildFlexStyles() {
            return {
              flexDirection: this.flexDirection,
              alignItems: this.alignItems,
              justifyContent: this.justifyContent,
              gap: this.gap,
              flexWrap: this.flexWrap,
            };
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = ee({
            type: e,
            selectors: [['lib-flex']],
            inputs: {
              flexDirection: 'flexDirection',
              alignItems: 'alignItems',
              justifyContent: 'justifyContent',
              gap: 'gap',
              flexWrap: 'flexWrap',
            },
            standalone: !0,
            features: [te],
            ngContentSelectors: fG,
            decls: 2,
            vars: 1,
            consts: [[1, 'flex', 3, 'ngStyle']],
            template: function (r, o) {
              1 & r && (Er(), x(0, 'div', 0), Qn(1), L()),
                2 & r && P('ngStyle', o.buildFlexStyles());
            },
            dependencies: [lo, _g],
            styles: [
              '.flex[_ngcontent-%COMP%]{display:flex;height:100%}',
            ],
          }));
        }
        return e;
      })();
      const hG = ['*'];
      let Do = (() => {
          class e {
            constructor() {
              this.cardType = 'card__default';
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-card']],
              inputs: { cardType: 'cardType' },
              standalone: !0,
              features: [te],
              ngContentSelectors: hG,
              decls: 2,
              vars: 1,
              consts: [[1, 'card', 3, 'ngClass']],
              template: function (r, o) {
                1 & r && (Er(), x(0, 'div', 0), Qn(1), L()),
                  2 & r && P('ngClass', o.cardType);
              },
              dependencies: [lo, ga],
              styles: [
                '.card[_ngcontent-%COMP%]{background-color:#494ca2;padding:1rem}.card__default[_ngcontent-%COMP%]{border-radius:.25rem}.card__main-nav-menu-options[_ngcontent-%COMP%]{border-top:1px solid #393c7f;padding:2rem 1rem}.card__secondary[_ngcontent-%COMP%]{border-radius:.25rem;background-color:#e1e1e1;border:1px solid #c8c8c8}',
              ],
            }));
          }
          return e;
        })(),
        rT = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-icon']],
              inputs: { src: 'src', alt: 'alt' },
              standalone: !0,
              features: [te],
              decls: 1,
              vars: 2,
              consts: [[1, 'icon', 3, 'src', 'alt']],
              template: function (r, o) {
                1 & r && Y(0, 'img', 0),
                  2 & r && P('src', o.src, rh)('alt', o.alt);
              },
              styles: [
                '[_nghost-%COMP%]{display:contents}.icon[_ngcontent-%COMP%]{display:block;height:100%}',
              ],
            }));
          }
          return e;
        })(),
        oT = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = o => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                n,
                r,
              );
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty('disabled', n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(E(Zn), E(Gt));
            });
            static #t = (this.ɵdir = U({ type: e }));
          }
          return e;
        })(),
        Eo = (() => {
          class e extends oT {
            static #e = (this.ɵfac = (() => {
              let n;
              return function (o) {
                return (n || (n = $e(e)))(o || e);
              };
            })());
            static #t = (this.ɵdir = U({ type: e, features: [le] }));
          }
          return e;
        })();
      const Cn = new w(''),
        mG = { provide: Cn, useExisting: ge(() => Gl), multi: !0 },
        yG = new w('');
      let Gl = (() => {
        class e extends oT {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function vG() {
                  const e = br() ? br().getUserAgent() : '';
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty('value', n ?? '');
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1),
              this._compositionMode && this.onChange(n);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(E(Zn), E(Gt), E(yG, 8));
          });
          static #t = (this.ɵdir = U({
            type: e,
            selectors: [
              ['input', 'formControlName', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControlName', ''],
              ['input', 'formControl', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControl', ''],
              ['input', 'ngModel', '', 3, 'type', 'checkbox'],
              ['textarea', 'ngModel', ''],
              ['', 'ngDefaultControl', ''],
            ],
            hostBindings: function (r, o) {
              1 & r &&
                me('input', function (s) {
                  return o._handleInput(s.target.value);
                })('blur', function () {
                  return o.onTouched();
                })('compositionstart', function () {
                  return o._compositionStart();
                })('compositionend', function (s) {
                  return o._compositionEnd(s.target.value);
                });
            },
            features: [Ie([mG]), le],
          }));
        }
        return e;
      })();
      const lt = new w(''),
        Rr = new w('');
      function gT(e) {
        return null != e;
      }
      function mT(e) {
        return aa(e) ? ut(e) : e;
      }
      function vT(e) {
        let t = {};
        return (
          e.forEach(n => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function yT(e, t) {
        return t.map(n => n(e));
      }
      function _T(e) {
        return e.map(t =>
          (function CG(e) {
            return !e.validate;
          })(t)
            ? t
            : n => t.validate(n),
        );
      }
      function gm(e) {
        return null != e
          ? (function CT(e) {
              if (!e) return null;
              const t = e.filter(gT);
              return 0 == t.length
                ? null
                : function (n) {
                    return vT(yT(n, t));
                  };
            })(_T(e))
          : null;
      }
      function mm(e) {
        return null != e
          ? (function DT(e) {
              if (!e) return null;
              const t = e.filter(gT);
              return 0 == t.length
                ? null
                : function (n) {
                    return (function pG(...e) {
                      const t = Vg(e),
                        { args: n, keys: r } = US(e),
                        o = new xe(i => {
                          const { length: s } = n;
                          if (!s) return void i.complete();
                          const a = new Array(s);
                          let u = s,
                            c = s;
                          for (let l = 0; l < s; l++) {
                            let d = !1;
                            vn(n[l]).subscribe(
                              Ae(
                                i,
                                f => {
                                  d || ((d = !0), c--), (a[l] = f);
                                },
                                () => u--,
                                void 0,
                                () => {
                                  (!u || !d) &&
                                    (c || i.next(r ? $S(r, a) : a),
                                    i.complete());
                                },
                              ),
                            );
                          }
                        });
                      return t ? o.pipe(BS(t)) : o;
                    })(yT(n, t).map(mT)).pipe(J(vT));
                  };
            })(_T(e))
          : null;
      }
      function ET(e, t) {
        return null === e
          ? [t]
          : Array.isArray(e)
          ? [...e, t]
          : [e, t];
      }
      function wT(e) {
        return e._rawValidators;
      }
      function bT(e) {
        return e._rawAsyncValidators;
      }
      function vm(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function Wl(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function IT(e, t) {
        const n = vm(t);
        return (
          vm(e).forEach(o => {
            Wl(n, o) || n.push(o);
          }),
          n
        );
      }
      function ST(e, t) {
        return vm(t).filter(n => !Wl(e, n));
      }
      class MT {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = gm(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = mm(
              this._rawAsyncValidators,
            ));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach(t => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t = void 0) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class Mt extends MT {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class xr extends MT {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class TT {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return (
            this._cd?.control?._touched?.(),
            !!this._cd?.control?.touched
          );
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return (
            this._cd?.control?._pristine?.(),
            !!this._cd?.control?.pristine
          );
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return (
            this._cd?.control?._status?.(), !!this._cd?.control?.valid
          );
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return this._cd?._submitted?.(), !!this._cd?.submitted;
        }
      }
      let ym = (() => {
          class e extends TT {
            constructor(n) {
              super(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(E(xr, 2));
            });
            static #t = (this.ɵdir = U({
              type: e,
              selectors: [
                ['', 'formControlName', ''],
                ['', 'ngModel', ''],
                ['', 'formControl', ''],
              ],
              hostVars: 14,
              hostBindings: function (r, o) {
                2 & r &&
                  Mc('ng-untouched', o.isUntouched)(
                    'ng-touched',
                    o.isTouched,
                  )('ng-pristine', o.isPristine)(
                    'ng-dirty',
                    o.isDirty,
                  )('ng-valid', o.isValid)('ng-invalid', o.isInvalid)(
                    'ng-pending',
                    o.isPending,
                  );
              },
              features: [le],
            }));
          }
          return e;
        })(),
        AT = (() => {
          class e extends TT {
            constructor(n) {
              super(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(E(Mt, 10));
            });
            static #t = (this.ɵdir = U({
              type: e,
              selectors: [
                ['', 'formGroupName', ''],
                ['', 'formArrayName', ''],
                ['', 'ngModelGroup', ''],
                ['', 'formGroup', ''],
                ['form', 3, 'ngNoForm', ''],
                ['', 'ngForm', ''],
              ],
              hostVars: 16,
              hostBindings: function (r, o) {
                2 & r &&
                  Mc('ng-untouched', o.isUntouched)(
                    'ng-touched',
                    o.isTouched,
                  )('ng-pristine', o.isPristine)(
                    'ng-dirty',
                    o.isDirty,
                  )('ng-valid', o.isValid)('ng-invalid', o.isInvalid)(
                    'ng-pending',
                    o.isPending,
                  )('ng-submitted', o.isSubmitted);
              },
              features: [le],
            }));
          }
          return e;
        })();
      const Pa = 'VALID',
        Ql = 'INVALID',
        Ui = 'PENDING',
        La = 'DISABLED';
      class Bi {}
      class RT extends Bi {
        constructor(t, n) {
          super(), (this.value = t), (this.source = n);
        }
      }
      class Dm extends Bi {
        constructor(t, n) {
          super(), (this.pristine = t), (this.source = n);
        }
      }
      class Em extends Bi {
        constructor(t, n) {
          super(), (this.touched = t), (this.source = n);
        }
      }
      class Yl extends Bi {
        constructor(t, n) {
          super(), (this.status = t), (this.source = n);
        }
      }
      class IG extends Bi {
        constructor(t) {
          super(), (this.source = t);
        }
      }
      class SG extends Bi {
        constructor(t) {
          super(), (this.source = t);
        }
      }
      function wm(e) {
        return (Kl(e) ? e.validators : e) || null;
      }
      function bm(e, t) {
        return (Kl(t) ? t.asyncValidators : e) || null;
      }
      function Kl(e) {
        return null != e && !Array.isArray(e) && 'object' == typeof e;
      }
      function xT(e, t, n) {
        const r = e.controls;
        if (!(t ? Object.keys(r) : r).length) throw new D(1e3, '');
        if (!r[n]) throw new D(1001, '');
      }
      function OT(e, t, n) {
        e._forEachChild((r, o) => {
          if (void 0 === n[o]) throw new D(1002, '');
        });
      }
      class Xl {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = null),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this._status = co(() => this.statusReactive())),
            (this.statusReactive = yr(void 0)),
            (this._pristine = co(() => this.pristineReactive())),
            (this.pristineReactive = yr(!0)),
            (this._touched = co(() => this.touchedReactive())),
            (this.touchedReactive = yr(!1)),
            (this._events = new pt()),
            (this.events = this._events.asObservable()),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(n);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn =
            t;
        }
        get parent() {
          return this._parent;
        }
        get status() {
          return xn(this.statusReactive);
        }
        set status(t) {
          xn(() => this.statusReactive.set(t));
        }
        get valid() {
          return this.status === Pa;
        }
        get invalid() {
          return this.status === Ql;
        }
        get pending() {
          return this.status == Ui;
        }
        get disabled() {
          return this.status === La;
        }
        get enabled() {
          return this.status !== La;
        }
        get pristine() {
          return xn(this.pristineReactive);
        }
        set pristine(t) {
          xn(() => this.pristineReactive.set(t));
        }
        get dirty() {
          return !this.pristine;
        }
        get touched() {
          return xn(this.touchedReactive);
        }
        set touched(t) {
          xn(() => this.touchedReactive.set(t));
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : 'change';
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(IT(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(IT(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(ST(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(ST(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return Wl(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return Wl(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          const n = !1 === this.touched;
          this.touched = !0;
          const r = t.sourceControl ?? this;
          this._parent &&
            !t.onlySelf &&
            this._parent.markAsTouched({ ...t, sourceControl: r }),
            n &&
              !1 !== t.emitEvent &&
              this._events.next(new Em(!0, r));
        }
        markAllAsTouched(t = {}) {
          this.markAsTouched({
            onlySelf: !0,
            emitEvent: t.emitEvent,
            sourceControl: this,
          }),
            this._forEachChild(n => n.markAllAsTouched(t));
        }
        markAsUntouched(t = {}) {
          const n = !0 === this.touched;
          (this.touched = !1), (this._pendingTouched = !1);
          const r = t.sourceControl ?? this;
          this._forEachChild(o => {
            o.markAsUntouched({
              onlySelf: !0,
              emitEvent: t.emitEvent,
              sourceControl: r,
            });
          }),
            this._parent &&
              !t.onlySelf &&
              this._parent._updateTouched(t, r),
            n &&
              !1 !== t.emitEvent &&
              this._events.next(new Em(!1, r));
        }
        markAsDirty(t = {}) {
          const n = !0 === this.pristine;
          this.pristine = !1;
          const r = t.sourceControl ?? this;
          this._parent &&
            !t.onlySelf &&
            this._parent.markAsDirty({ ...t, sourceControl: r }),
            n &&
              !1 !== t.emitEvent &&
              this._events.next(new Dm(!1, r));
        }
        markAsPristine(t = {}) {
          const n = !1 === this.pristine;
          (this.pristine = !0), (this._pendingDirty = !1);
          const r = t.sourceControl ?? this;
          this._forEachChild(o => {
            o.markAsPristine({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
          }),
            this._parent &&
              !t.onlySelf &&
              this._parent._updatePristine(t, r),
            n &&
              !1 !== t.emitEvent &&
              this._events.next(new Dm(!0, r));
        }
        markAsPending(t = {}) {
          this.status = Ui;
          const n = t.sourceControl ?? this;
          !1 !== t.emitEvent &&
            (this._events.next(new Yl(this.status, n)),
            this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.markAsPending({ ...t, sourceControl: n });
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = La),
            (this.errors = null),
            this._forEachChild(o => {
              o.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue();
          const r = t.sourceControl ?? this;
          !1 !== t.emitEvent &&
            (this._events.next(new RT(this.value, r)),
            this._events.next(new Yl(this.status, r)),
            this.valueChanges.emit(this.value),
            this.statusChanges.emit(this.status)),
            this._updateAncestors(
              { ...t, skipPristineCheck: n },
              this,
            ),
            this._onDisabledChange.forEach(o => o(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = Pa),
            this._forEachChild(r => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors(
              { ...t, skipPristineCheck: n },
              this,
            ),
            this._onDisabledChange.forEach(r => r(!1));
        }
        _updateAncestors(t, n) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck ||
              this._parent._updatePristine({}, n),
            this._parent._updateTouched({}, n));
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          if (
            (this._setInitialStatus(),
            this._updateValue(),
            this.enabled)
          ) {
            const r = this._cancelExistingSubscription();
            (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === Pa || this.status === Ui) &&
                this._runAsyncValidator(r, t.emitEvent);
          }
          const n = t.sourceControl ?? this;
          !1 !== t.emitEvent &&
            (this._events.next(new RT(this.value, n)),
            this._events.next(new Yl(this.status, n)),
            this.valueChanges.emit(this.value),
            this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity({
                ...t,
                sourceControl: n,
              });
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild(n => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? La : Pa;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t, n) {
          if (this.asyncValidator) {
            (this.status = Ui),
              (this._hasOwnPendingAsyncValidator = {
                emitEvent: !1 !== n,
              });
            const r = mT(this.asyncValidator(this));
            this._asyncValidationSubscription = r.subscribe(o => {
              (this._hasOwnPendingAsyncValidator = null),
                this.setErrors(o, {
                  emitEvent: n,
                  shouldHaveEmitted: t,
                });
            });
          }
        }
        _cancelExistingSubscription() {
          if (this._asyncValidationSubscription) {
            this._asyncValidationSubscription.unsubscribe();
            const t =
              this._hasOwnPendingAsyncValidator?.emitEvent ?? !1;
            return (this._hasOwnPendingAsyncValidator = null), t;
          }
          return !1;
        }
        setErrors(t, n = {}) {
          (this.errors = t),
            this._updateControlsErrors(
              !1 !== n.emitEvent,
              this,
              n.shouldHaveEmitted,
            );
        }
        get(t) {
          let n = t;
          return null == n ||
            (Array.isArray(n) || (n = n.split('.')), 0 === n.length)
            ? null
            : n.reduce((r, o) => r && r._find(o), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t, n, r) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            (t || r) && this._events.next(new Yl(this.status, n)),
            this._parent &&
              this._parent._updateControlsErrors(t, n, r);
        }
        _initObservables() {
          (this.valueChanges = new oe()),
            (this.statusChanges = new oe());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? La
            : this.errors
            ? Ql
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Ui)
            ? Ui
            : this._anyControlsHaveStatus(Ql)
            ? Ql
            : Pa;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls(n => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls(t => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls(t => t.touched);
        }
        _updatePristine(t, n) {
          const r = !this._anyControlsDirty(),
            o = this.pristine !== r;
          (this.pristine = r),
            this._parent &&
              !t.onlySelf &&
              this._parent._updatePristine(t, n),
            o && this._events.next(new Dm(this.pristine, n));
        }
        _updateTouched(t = {}, n) {
          (this.touched = this._anyControlsTouched()),
            this._events.next(new Em(this.touched, n)),
            this._parent &&
              !t.onlySelf &&
              this._parent._updateTouched(t, n);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          Kl(t) &&
            null != t.updateOn &&
            (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function MG(e) {
              return Array.isArray(e) ? gm(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t)
            ? t.slice()
            : t),
            (this._composedAsyncValidatorFn = (function TG(e) {
              return Array.isArray(e) ? mm(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class Va extends Xl {
        constructor(t, n, r) {
          super(wm(n), bm(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, n) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = n),
              n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange),
              n);
        }
        addControl(t, n, r = {}) {
          this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            n && this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return (
            this.controls.hasOwnProperty(t) &&
            this.controls[t].enabled
          );
        }
        setValue(t, n = {}) {
          OT(this, 0, t),
            Object.keys(t).forEach(r => {
              xT(this, !0, r),
                this.controls[r].setValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (Object.keys(t).forEach(r => {
              const o = this.controls[r];
              o &&
                o.patchValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = {}, n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t ? t[o] : null, {
              onlySelf: !0,
              emitEvent: n.emitEvent,
            });
          }),
            this._updatePristine(n, this),
            this._updateTouched(n, this),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, n, r) => ((t[r] = n.getRawValue()), t),
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (n, r) => !!r._syncPendingControls() || n,
          );
          return (
            t && this.updateValueAndValidity({ onlySelf: !0 }), t
          );
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach(n => {
            const r = this.controls[n];
            r && t(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild(t => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [n, r] of Object.entries(this.controls))
            if (this.contains(n) && t(r)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (n, r, o) => (
              (r.enabled || this.disabled) && (n[o] = r.value), n
            ),
          );
        }
        _reduceChildren(t, n) {
          let r = t;
          return (
            this._forEachChild((o, i) => {
              r = n(r, o, i);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return (
            Object.keys(this.controls).length > 0 || this.disabled
          );
        }
        _find(t) {
          return this.controls.hasOwnProperty(t)
            ? this.controls[t]
            : null;
        }
      }
      class FT extends Va {}
      const $i = new w('CallSetDisabledState', {
          providedIn: 'root',
          factory: () => Jl,
        }),
        Jl = 'always';
      function ja(e, t, n = Jl) {
        Im(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || 'always' === n) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function NG(e, t) {
            t.valueAccessor.registerOnChange(n => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                'change' === e.updateOn && kT(e, t);
            });
          })(e, t),
          (function xG(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r),
                o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function RG(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                'blur' === e.updateOn && e._pendingChange && kT(e, t),
                'submit' !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function AG(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = r => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function td(e, t, n = !0) {
        const r = () => {};
        t.valueAccessor &&
          (t.valueAccessor.registerOnChange(r),
          t.valueAccessor.registerOnTouched(r)),
          rd(e, t),
          e &&
            (t._invokeOnDestroyCallbacks(),
            e._registerOnCollectionChange(() => {}));
      }
      function nd(e, t) {
        e.forEach(n => {
          n.registerOnValidatorChange &&
            n.registerOnValidatorChange(t);
        });
      }
      function Im(e, t) {
        const n = wT(e);
        null !== t.validator
          ? e.setValidators(ET(n, t.validator))
          : 'function' == typeof n && e.setValidators([n]);
        const r = bT(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators(ET(r, t.asyncValidator))
          : 'function' == typeof r && e.setAsyncValidators([r]);
        const o = () => e.updateValueAndValidity();
        nd(t._rawValidators, o), nd(t._rawAsyncValidators, o);
      }
      function rd(e, t) {
        let n = !1;
        if (null !== e) {
          if (null !== t.validator) {
            const o = wT(e);
            if (Array.isArray(o) && o.length > 0) {
              const i = o.filter(s => s !== t.validator);
              i.length !== o.length && ((n = !0), e.setValidators(i));
            }
          }
          if (null !== t.asyncValidator) {
            const o = bT(e);
            if (Array.isArray(o) && o.length > 0) {
              const i = o.filter(s => s !== t.asyncValidator);
              i.length !== o.length &&
                ((n = !0), e.setAsyncValidators(i));
            }
          }
        }
        const r = () => {};
        return (
          nd(t._rawValidators, r), nd(t._rawAsyncValidators, r), n
        );
      }
      function kT(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function VT(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function jT(e) {
        return (
          'object' == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          'value' in e &&
          'disabled' in e
        );
      }
      Promise.resolve();
      const rr = class extends Xl {
        constructor(t = null, n, r) {
          super(wm(n), bm(r, n)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(t),
            this._setUpdateStrategy(n),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            }),
            Kl(n) &&
              (n.nonNullable || n.initialValueIsDefault) &&
              (this.defaultValue = jT(t) ? t.value : t);
        }
        setValue(t, n = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== n.emitModelToViewChange &&
              this._onChange.forEach(r =>
                r(this.value, !1 !== n.emitViewToModelChange),
              ),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          this.setValue(t, n);
        }
        reset(t = this.defaultValue, n = {}) {
          this._applyFormState(t),
            this.markAsPristine(n),
            this.markAsUntouched(n),
            this.setValue(this.value, n),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _unregisterOnChange(t) {
          VT(this._onChange, t);
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _unregisterOnDisabledChange(t) {
          VT(this._onDisabledChange, t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            'submit' !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(t) {
          jT(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      };
      Promise.resolve();
      let zT = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵdir = U({
            type: e,
            selectors: [
              ['form', 3, 'ngNoForm', '', 3, 'ngNativeValidate', ''],
            ],
            hostAttrs: ['novalidate', ''],
          }));
        }
        return e;
      })();
      const Nm = new w(''),
        GG = { provide: xr, useExisting: ge(() => od) };
      let od = (() => {
        class e extends xr {
          set isDisabled(n) {}
          static #e = (this._ngModelWarningSentOnce = !1);
          constructor(n, r, o, i, s) {
            super(),
              (this._ngModelWarningConfig = i),
              (this.callSetDisabledState = s),
              (this.update = new oe()),
              (this._ngModelWarningSent = !1),
              this._setValidators(n),
              this._setAsyncValidators(r),
              (this.valueAccessor = (function Tm(e, t) {
                if (!t) return null;
                let n, r, o;
                return (
                  Array.isArray(t),
                  t.forEach(i => {
                    i.constructor === Gl
                      ? (n = i)
                      : (function kG(e) {
                          return (
                            Object.getPrototypeOf(e.constructor) ===
                            Eo
                          );
                        })(i)
                      ? (r = i)
                      : (o = i);
                  }),
                  o || r || n || null
                );
              })(0, o));
          }
          ngOnChanges(n) {
            if (this._isControlChanged(n)) {
              const r = n.form.previousValue;
              r && td(r, this, !1),
                ja(this.form, this, this.callSetDisabledState),
                this.form.updateValueAndValidity({ emitEvent: !1 });
            }
            (function Mm(e, t) {
              if (!e.hasOwnProperty('model')) return !1;
              const n = e.model;
              return (
                !!n.isFirstChange() || !Object.is(t, n.currentValue)
              );
            })(n, this.viewModel) &&
              (this.form.setValue(this.model),
              (this.viewModel = this.model));
          }
          ngOnDestroy() {
            this.form && td(this.form, this, !1);
          }
          get path() {
            return [];
          }
          get control() {
            return this.form;
          }
          viewToModelUpdate(n) {
            (this.viewModel = n), this.update.emit(n);
          }
          _isControlChanged(n) {
            return n.hasOwnProperty('form');
          }
          static #t = (this.ɵfac = function (r) {
            return new (r || e)(
              E(lt, 10),
              E(Rr, 10),
              E(Cn, 10),
              E(Nm, 8),
              E($i, 8),
            );
          });
          static #n = (this.ɵdir = U({
            type: e,
            selectors: [['', 'formControl', '']],
            inputs: {
              form: [0, 'formControl', 'form'],
              isDisabled: [0, 'disabled', 'isDisabled'],
              model: [0, 'ngModel', 'model'],
            },
            outputs: { update: 'ngModelChange' },
            exportAs: ['ngForm'],
            features: [Ie([GG]), le, Kt],
          }));
        }
        return e;
      })();
      const qG = { provide: Mt, useExisting: ge(() => id) };
      let id = (() => {
          class e extends Mt {
            get submitted() {
              return xn(this._submittedReactive);
            }
            set submitted(n) {
              this._submittedReactive.set(n);
            }
            constructor(n, r, o) {
              super(),
                (this.callSetDisabledState = o),
                (this._submitted = co(() =>
                  this._submittedReactive(),
                )),
                (this._submittedReactive = yr(!1)),
                (this._onCollectionChange = () =>
                  this._updateDomValue()),
                (this.directives = []),
                (this.form = null),
                (this.ngSubmit = new oe()),
                this._setValidators(n),
                this._setAsyncValidators(r);
            }
            ngOnChanges(n) {
              this._checkFormPresent(),
                n.hasOwnProperty('form') &&
                  (this._updateValidators(),
                  this._updateDomValue(),
                  this._updateRegistrations(),
                  (this._oldForm = this.form));
            }
            ngOnDestroy() {
              this.form &&
                (rd(this.form, this),
                this.form._onCollectionChange ===
                  this._onCollectionChange &&
                  this.form._registerOnCollectionChange(() => {}));
            }
            get formDirective() {
              return this;
            }
            get control() {
              return this.form;
            }
            get path() {
              return [];
            }
            addControl(n) {
              const r = this.form.get(n.path);
              return (
                ja(r, n, this.callSetDisabledState),
                r.updateValueAndValidity({ emitEvent: !1 }),
                this.directives.push(n),
                r
              );
            }
            getControl(n) {
              return this.form.get(n.path);
            }
            removeControl(n) {
              td(n.control || null, n, !1),
                (function PG(e, t) {
                  const n = e.indexOf(t);
                  n > -1 && e.splice(n, 1);
                })(this.directives, n);
            }
            addFormGroup(n) {
              this._setUpFormContainer(n);
            }
            removeFormGroup(n) {
              this._cleanUpFormContainer(n);
            }
            getFormGroup(n) {
              return this.form.get(n.path);
            }
            addFormArray(n) {
              this._setUpFormContainer(n);
            }
            removeFormArray(n) {
              this._cleanUpFormContainer(n);
            }
            getFormArray(n) {
              return this.form.get(n.path);
            }
            updateModel(n, r) {
              this.form.get(n.path).setValue(r);
            }
            onSubmit(n) {
              return (
                this._submittedReactive.set(!0),
                (function LT(e, t) {
                  e._syncPendingControls(),
                    t.forEach(n => {
                      const r = n.control;
                      'submit' === r.updateOn &&
                        r._pendingChange &&
                        (n.viewToModelUpdate(r._pendingValue),
                        (r._pendingChange = !1));
                    });
                })(this.form, this.directives),
                this.ngSubmit.emit(n),
                this.form._events.next(new IG(this.control)),
                'dialog' === n?.target?.method
              );
            }
            onReset() {
              this.resetForm();
            }
            resetForm(n = void 0) {
              this.form.reset(n),
                this._submittedReactive.set(!1),
                this.form._events.next(new SG(this.form));
            }
            _updateDomValue() {
              this.directives.forEach(n => {
                const r = n.control,
                  o = this.form.get(n.path);
                r !== o &&
                  (td(r || null, n),
                  (e => e instanceof rr)(o) &&
                    (ja(o, n, this.callSetDisabledState),
                    (n.control = o)));
              }),
                this.form._updateTreeValidity({ emitEvent: !1 });
            }
            _setUpFormContainer(n) {
              const r = this.form.get(n.path);
              (function PT(e, t) {
                Im(e, t);
              })(r, n),
                r.updateValueAndValidity({ emitEvent: !1 });
            }
            _cleanUpFormContainer(n) {
              if (this.form) {
                const r = this.form.get(n.path);
                r &&
                  (function OG(e, t) {
                    return rd(e, t);
                  })(r, n) &&
                  r.updateValueAndValidity({ emitEvent: !1 });
              }
            }
            _updateRegistrations() {
              this.form._registerOnCollectionChange(
                this._onCollectionChange,
              ),
                this._oldForm &&
                  this._oldForm._registerOnCollectionChange(() => {});
            }
            _updateValidators() {
              Im(this.form, this),
                this._oldForm && rd(this._oldForm, this);
            }
            _checkFormPresent() {}
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(E(lt, 10), E(Rr, 10), E($i, 8));
            });
            static #t = (this.ɵdir = U({
              type: e,
              selectors: [['', 'formGroup', '']],
              hostBindings: function (r, o) {
                1 & r &&
                  me('submit', function (s) {
                    return o.onSubmit(s);
                  })('reset', function () {
                    return o.onReset();
                  });
              },
              inputs: { form: [0, 'formGroup', 'form'] },
              outputs: { ngSubmit: 'ngSubmit' },
              exportAs: ['ngForm'],
              features: [Ie([qG]), le, Kt],
            }));
          }
          return e;
        })(),
        l8 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Xi({ type: e }));
            static #n = (this.ɵinj = Ao({}));
          }
          return e;
        })();
      class u0 extends Xl {
        constructor(t, n, r) {
          super(wm(n), bm(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        at(t) {
          return this.controls[this._adjustIndex(t)];
        }
        push(t, n = {}) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        insert(t, n, r = {}) {
          this.controls.splice(t, 0, n),
            this._registerControl(n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent });
        }
        removeAt(t, n = {}) {
          let r = this._adjustIndex(t);
          r < 0 && (r = 0),
            this.controls[r] &&
              this.controls[r]._registerOnCollectionChange(() => {}),
            this.controls.splice(r, 1),
            this.updateValueAndValidity({ emitEvent: n.emitEvent });
        }
        setControl(t, n, r = {}) {
          let o = this._adjustIndex(t);
          o < 0 && (o = 0),
            this.controls[o] &&
              this.controls[o]._registerOnCollectionChange(() => {}),
            this.controls.splice(o, 1),
            n &&
              (this.controls.splice(o, 0, n),
              this._registerControl(n)),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, n = {}) {
          OT(this, 0, t),
            t.forEach((r, o) => {
              xT(this, !1, o),
                this.at(o).setValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (t.forEach((r, o) => {
              this.at(o) &&
                this.at(o).patchValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = [], n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t[o], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n, this),
            this._updateTouched(n, this),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this.controls.map(t => t.getRawValue());
        }
        clear(t = {}) {
          this.controls.length < 1 ||
            (this._forEachChild(n =>
              n._registerOnCollectionChange(() => {}),
            ),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }));
        }
        _adjustIndex(t) {
          return t < 0 ? t + this.length : t;
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (n, r) => !!r._syncPendingControls() || n,
            !1,
          );
          return (
            t && this.updateValueAndValidity({ onlySelf: !0 }), t
          );
        }
        _forEachChild(t) {
          this.controls.forEach((n, r) => {
            t(n, r);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter(t => t.enabled || this.disabled)
            .map(t => t.value);
        }
        _anyControls(t) {
          return this.controls.some(n => n.enabled && t(n));
        }
        _setUpControls() {
          this._forEachChild(t => this._registerControl(t));
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
        _find(t) {
          return this.at(t) ?? null;
        }
      }
      function c0(e) {
        return (
          !!e &&
          (void 0 !== e.asyncValidators ||
            void 0 !== e.validators ||
            void 0 !== e.updateOn)
        );
      }
      let d8 = (() => {
          class e {
            constructor() {
              this.useNonNullable = !1;
            }
            get nonNullable() {
              const n = new e();
              return (n.useNonNullable = !0), n;
            }
            group(n, r = null) {
              const o = this._reduceControls(n);
              let i = {};
              return (
                c0(r)
                  ? (i = r)
                  : null !== r &&
                    ((i.validators = r.validator),
                    (i.asyncValidators = r.asyncValidator)),
                new Va(o, i)
              );
            }
            record(n, r = null) {
              const o = this._reduceControls(n);
              return new FT(o, r);
            }
            control(n, r, o) {
              let i = {};
              return this.useNonNullable
                ? (c0(r)
                    ? (i = r)
                    : ((i.validators = r), (i.asyncValidators = o)),
                  new rr(n, { ...i, nonNullable: !0 }))
                : new rr(n, r, o);
            }
            array(n, r, o) {
              const i = n.map(s => this._createControl(s));
              return new u0(i, r, o);
            }
            _reduceControls(n) {
              const r = {};
              return (
                Object.keys(n).forEach(o => {
                  r[o] = this._createControl(n[o]);
                }),
                r
              );
            }
            _createControl(n) {
              return n instanceof rr || n instanceof Xl
                ? n
                : Array.isArray(n)
                ? this.control(
                    n[0],
                    n.length > 1 ? n[1] : null,
                    n.length > 2 ? n[2] : null,
                  )
                : this.control(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        l0 = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  {
                    provide: Nm,
                    useValue:
                      n.warnOnNgModelWithFormControl ?? 'always',
                  },
                  {
                    provide: $i,
                    useValue: n.callSetDisabledState ?? Jl,
                  },
                ],
              };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Xi({ type: e }));
            static #n = (this.ɵinj = Ao({ imports: [l8] }));
          }
          return e;
        })();
      var kt = (function (e) {
        return (
          (e.input = 'input'),
          (e.buttonText = 'buttonText'),
          (e.buttonIcon = 'buttonIcon'),
          (e.link = 'link'),
          e
        );
      })(kt || {});
      let d0 = (() => {
        class e {
          constructor() {
            (this.onChange = () => {}), (this.onTouched = () => {});
          }
          static getProvider(n) {
            return {
              provide: Cn,
              useExisting: ge(() => n),
              multi: !0,
            };
          }
          writeValue(n) {
            this.value = n;
          }
          registerOnChange(n) {
            this.onChange = n;
          }
          registerOnTouched(n) {
            this.onTouched = n;
          }
          onInput(n) {
            (this.value = n.target.value),
              this.onChange(this.value),
              this.onTouched();
          }
          onButton() {
            (this.value = !0),
              this.onChange(this.value),
              this.onTouched();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }));
        }
        return e;
      })();
      function f8(e, t) {
        if ((1 & e && (x(0, 'p', 0), ta(1), L()), 2 & e)) {
          const n = Ne();
          P('ngClass', n.textColor), se(), wi(n.value);
        }
      }
      function h8(e, t) {
        if ((1 & e && (x(0, 'h1', 1), ta(1), L()), 2 & e)) {
          const n = Ne();
          P('ngClass', n.textColor), se(), wi(n.value);
        }
      }
      function p8(e, t) {
        if ((1 & e && (x(0, 'h2', 2), ta(1), L()), 2 & e)) {
          const n = Ne();
          P('ngClass', n.textColor), se(), wi(n.value);
        }
      }
      function g8(e, t) {
        if ((1 & e && (x(0, 'h3', 3), ta(1), L()), 2 & e)) {
          const n = Ne();
          P('ngClass', n.textColor), se(), wi(n.value);
        }
      }
      let or = (() => {
        class e {
          constructor() {
            (this.type = 'paragraph'),
              (this.textColor = 'text__leave');
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = ee({
            type: e,
            selectors: [['lib-text']],
            inputs: {
              value: 'value',
              type: 'type',
              textColor: 'textColor',
            },
            standalone: !0,
            features: [te],
            decls: 4,
            vars: 1,
            consts: [
              [1, 'text', 'text__paragraph', 3, 'ngClass'],
              [1, 'text', 'text__header1', 3, 'ngClass'],
              [1, 'text', 'text__header2', 3, 'ngClass'],
              [1, 'text', 'text__header3', 3, 'ngClass'],
            ],
            template: function (r, o) {
              if (
                (1 & r &&
                  _r(0, f8, 2, 2, 'p', 0)(1, h8, 2, 2, 'h1', 1)(
                    2,
                    p8,
                    2,
                    2,
                    'h2',
                    2,
                  )(3, g8, 2, 2, 'h3', 3),
                2 & r)
              ) {
                let i;
                io(
                  'paragraph' === (i = o.type)
                    ? 0
                    : 'header1' === i
                    ? 1
                    : 'header2' === i
                    ? 2
                    : 'header3' === i
                    ? 3
                    : -1,
                );
              }
            },
            dependencies: [lo, ga],
            styles: [
              '.text[_ngcontent-%COMP%]{font-family:Lato,sans-serif;font-style:normal;margin:0}.text__enter[_ngcontent-%COMP%]{color:#494ca2}.text__leave[_ngcontent-%COMP%]{color:#eee}.text__secondary[_ngcontent-%COMP%]{color:#666}.text__paragraph[_ngcontent-%COMP%]{font-weight:400;font-size:1em}.text__header[_ngcontent-%COMP%]{font-weight:600}.text__header1[_ngcontent-%COMP%]{font-size:2em}.text__header2[_ngcontent-%COMP%]{font-size:1.5em}.text__header3[_ngcontent-%COMP%]{font-size:1em}',
            ],
          }));
        }
        return e;
      })();
      const m8 = e => ({ input__focused: e }),
        v8 = e => ({ 'input__label-back': e });
      let y8 = (() => {
        class e extends d0 {
          constructor() {
            super(...arguments), (this.isFocused = !1);
          }
          onFocus() {
            this.isFocused = !0;
          }
          onBlur() {
            this.isFocused = !1;
          }
          controlIsNotEmpty() {
            return '' !== this.formControl.value;
          }
          static #e = (this.ɵfac = (() => {
            let n;
            return function (o) {
              return (n || (n = $e(e)))(o || e);
            };
          })());
          static #t = (this.ɵcmp = ee({
            type: e,
            selectors: [['lib-input']],
            inputs: { formControl: 'formControl' },
            standalone: !0,
            features: [Ie([d0.getProvider(e)]), le, te],
            decls: 6,
            vars: 7,
            consts: [
              [1, 'input', 3, 'ngClass'],
              [1, 'input__slider'],
              [1, 'input__label', 3, 'ngClass'],
              ['value', 'Login', 'textColor', 'text__enter'],
              [1, 'input__content'],
              [
                'type',
                'text',
                1,
                'input__control',
                3,
                'focus',
                'blur',
                'formControl',
              ],
            ],
            template: function (r, o) {
              1 & r &&
                (x(0, 'div', 0),
                Y(1, 'div', 1),
                x(2, 'div', 2),
                Y(3, 'lib-text', 3),
                L(),
                x(4, 'div', 4)(5, 'input', 5),
                me('focus', function () {
                  return o.onFocus();
                })('blur', function () {
                  return o.onBlur();
                }),
                L()()()),
                2 & r &&
                  (P('ngClass', Pp(3, m8, o.isFocused)),
                  se(2),
                  P('ngClass', Pp(5, v8, o.controlIsNotEmpty())),
                  se(3),
                  P('formControl', o.formControl));
            },
            dependencies: [lo, ga, or, l0, Gl, ym, od],
            styles: [
              '.input[_ngcontent-%COMP%]{position:relative;display:inline-block;background-color:#fff;border:2px solid #5585b5;overflow:hidden}.input__slider[_ngcontent-%COMP%]{position:absolute;inset:0;transition:all .25s ease-in-out;z-index:1;background-color:#5585b5}.input__label[_ngcontent-%COMP%]{position:absolute;z-index:-1;transition:transform .5s ease-in-out;z-index:1;padding:.45rem;opacity:.5}.input__label-back[_ngcontent-%COMP%]{z-index:-1}.input__content[_ngcontent-%COMP%]{z-index:2;position:relative}.input__content[_ngcontent-%COMP%]   .input__control[_ngcontent-%COMP%]{background-color:transparent;border:none;outline:none;color:#5585b5}.input__focused[_ngcontent-%COMP%]{outline:2px solid #5585b5;outline-offset:1px}.input__focused[_ngcontent-%COMP%]   .input__label[_ngcontent-%COMP%]{transform:translateY(-2rem);transition:transform .5s ease-in-out}.input__focused[_ngcontent-%COMP%]   .input__slider[_ngcontent-%COMP%]{right:0}.input__focused[_ngcontent-%COMP%]   .input__control[_ngcontent-%COMP%]{color:#fff}',
            ],
          }));
        }
        return e;
      })();
      const _8 = ['*'];
      let f0 = (() => {
          class e {
            constructor() {
              (this.isPrimary = !1),
                (this.fullWidth = !1),
                (this.clickEvent = new oe()),
                (this.mouseEnterEvent = new oe()),
                (this.mouseLeaveEvent = new oe()),
                (this.isFocused = !1);
            }
            onClick() {
              this.control.setValue(!0),
                !this.isPrimary && this.clickEvent.emit();
            }
            onMouseEnter() {
              this.mouseEnterEvent.emit();
            }
            onMouseLeave() {
              this.mouseLeaveEvent.emit();
            }
            getButtonType() {
              return this.isPrimary ? 'submit' : 'button';
            }
            buildStyles() {
              return { 'button__full-width': this.fullWidth };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-button']],
              inputs: {
                control: 'control',
                isPrimary: 'isPrimary',
                fullWidth: 'fullWidth',
              },
              outputs: {
                clickEvent: 'clickEvent',
                mouseEnterEvent: 'mouseEnterEvent',
                mouseLeaveEvent: 'mouseLeaveEvent',
              },
              standalone: !0,
              features: [te],
              ngContentSelectors: _8,
              decls: 4,
              vars: 2,
              consts: [
                [
                  1,
                  'button',
                  3,
                  'click',
                  'mouseenter',
                  'mouseleave',
                  'type',
                  'ngClass',
                ],
                [1, 'button__slider'],
                [1, 'button__content'],
              ],
              template: function (r, o) {
                1 & r &&
                  (Er(),
                  x(0, 'button', 0),
                  me('click', function () {
                    return o.onClick();
                  })('mouseenter', function () {
                    return o.onMouseEnter();
                  })('mouseleave', function () {
                    return o.onMouseLeave();
                  }),
                  Y(1, 'div', 1),
                  x(2, 'div', 2),
                  Qn(3),
                  L()()),
                  2 & r &&
                    P('type', o.getButtonType())(
                      'ngClass',
                      o.buildStyles(),
                    );
              },
              dependencies: [lo, ga],
              styles: [
                '.button[_ngcontent-%COMP%]{position:relative;padding:1rem;background-color:#494ca2;border:1px solid #eee;border-radius:.25rem;cursor:pointer}.button__slider[_ngcontent-%COMP%]{position:absolute;inset:0 100% 0 0;transition:all .25s ease-in-out;background-color:#eee}.button__full-width[_ngcontent-%COMP%]{width:100%}.button__content[_ngcontent-%COMP%]{position:relative;z-index:2}.button[_ngcontent-%COMP%]:hover   .button__slider[_ngcontent-%COMP%]{right:0}.button[_ngcontent-%COMP%]:active{transform:scale(.9);transition:transform .1s ease-in-out}',
              ],
            }));
          }
          return e;
        })(),
        C8 = (() => {
          class e {
            constructor() {
              (this.isPrimary = !1),
                (this.fullWidth = !1),
                (this.clickEvent = new oe()),
                (this.textColor = 'text__leave');
            }
            onClickEvent() {
              this.clickEvent.emit();
            }
            onMouseEnterEvent() {
              this.textColor = 'text__enter';
            }
            onMouseLeaveEvent() {
              this.textColor = 'text__leave';
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-button-text']],
              inputs: {
                control: 'control',
                label: 'label',
                isPrimary: 'isPrimary',
                fullWidth: 'fullWidth',
              },
              outputs: { clickEvent: 'clickEvent' },
              standalone: !0,
              features: [te],
              decls: 2,
              vars: 5,
              consts: [
                [
                  3,
                  'clickEvent',
                  'mouseEnterEvent',
                  'mouseLeaveEvent',
                  'control',
                  'isPrimary',
                  'fullWidth',
                ],
                [3, 'value', 'textColor'],
              ],
              template: function (r, o) {
                1 & r &&
                  (x(0, 'lib-button', 0),
                  me('clickEvent', function () {
                    return o.onClickEvent();
                  })('mouseEnterEvent', function () {
                    return o.onMouseEnterEvent();
                  })('mouseLeaveEvent', function () {
                    return o.onMouseLeaveEvent();
                  }),
                  Y(1, 'lib-text', 1),
                  L()),
                  2 & r &&
                    (P('control', o.control)(
                      'isPrimary',
                      o.isPrimary,
                    )('fullWidth', o.fullWidth),
                    se(),
                    P('value', o.label)('textColor', o.textColor));
              },
              dependencies: [f0, or],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        D8 = (() => {
          class e {
            constructor() {
              (this.isPrimary = !1), (this.clickEvent = new oe());
            }
            ngOnInit() {
              this.icon = this.iconLeave;
            }
            onClickEvent() {
              this.clickEvent.emit();
            }
            onMouseEnterEvent() {
              this.icon = this.iconEnter;
            }
            onMouseLeaveEvent() {
              this.icon = this.iconLeave;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-button-icon']],
              inputs: {
                control: 'control',
                iconEnter: 'iconEnter',
                iconLeave: 'iconLeave',
                alt: 'alt',
                isPrimary: 'isPrimary',
              },
              outputs: { clickEvent: 'clickEvent' },
              standalone: !0,
              features: [te],
              decls: 2,
              vars: 4,
              consts: [
                [
                  3,
                  'clickEvent',
                  'mouseEnterEvent',
                  'mouseLeaveEvent',
                  'control',
                  'isPrimary',
                ],
                [3, 'src', 'alt'],
              ],
              template: function (r, o) {
                1 & r &&
                  (x(0, 'lib-button', 0),
                  me('clickEvent', function () {
                    return o.onClickEvent();
                  })('mouseEnterEvent', function () {
                    return o.onMouseEnterEvent();
                  })('mouseLeaveEvent', function () {
                    return o.onMouseLeaveEvent();
                  }),
                  Y(1, 'lib-icon', 1),
                  L()),
                  2 & r &&
                    (P('control', o.control)(
                      'isPrimary',
                      o.isPrimary,
                    ),
                    se(),
                    P('src', o.icon)('alt', o.alt));
              },
              dependencies: [f0, rT],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        E8 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-link']],
              inputs: { label: 'label', path: 'path' },
              standalone: !0,
              features: [te],
              decls: 3,
              vars: 2,
              consts: [
                [3, 'routerLink'],
                [1, 'link'],
                ['textColor', 'text__secondary', 3, 'value'],
              ],
              template: function (r, o) {
                1 & r &&
                  (x(0, 'a', 0)(1, 'button', 1),
                  Y(2, 'lib-text', 2),
                  L()()),
                  2 & r &&
                    (P('routerLink', o.path),
                    se(2),
                    P('value', o.label));
              },
              dependencies: [or, $l],
              styles: [
                '.link[_ngcontent-%COMP%]{background-color:transparent;border:none;-webkit-user-select:none;user-select:none;text-decoration:underline;cursor:pointer}.link[_ngcontent-%COMP%]:hover{background-color:transparent}',
              ],
            }));
          }
          return e;
        })();
      const w8 = (e, t) => t.name;
      function b8(e, t) {
        if ((1 & e && Y(0, 'lib-input', 2), 2 & e)) {
          const n = Ne().$implicit;
          P('formControl', Ne().getFormControl(n.name));
        }
      }
      function I8(e, t) {
        if (1 & e) {
          const n = so();
          x(0, 'lib-button-text', 6),
            me('clickEvent', function () {
              return $r(n), Hr(Ne(2).onSubmit());
            }),
            L();
        }
        if (2 & e) {
          const n = Ne().$implicit;
          P('control', Ne().getFormControl(n.name))('label', n.label)(
            'isPrimary',
            n.isPrimary,
          )('fullWidth', n.fullWidth);
        }
      }
      function S8(e, t) {
        if (1 & e) {
          const n = so();
          x(0, 'lib-button-icon', 7),
            me('clickEvent', function () {
              return $r(n), Hr(Ne(2).onSubmit());
            }),
            L();
        }
        if (2 & e) {
          const n = Ne().$implicit;
          P('control', Ne().getFormControl(n.name))(
            'iconEnter',
            n.iconEnter,
          )('iconLeave', n.iconLeave)('alt', n.alt)(
            'isPrimary',
            n.isPrimary,
          );
        }
      }
      function M8(e, t) {
        if ((1 & e && Y(0, 'lib-link', 5), 2 & e)) {
          const n = Ne().$implicit;
          P('label', n.label)('path', n.path);
        }
      }
      function T8(e, t) {
        if (
          (1 & e &&
            _r(0, b8, 1, 1, 'lib-input', 2)(
              1,
              I8,
              1,
              4,
              'lib-button-text',
              3,
            )(2, S8, 1, 5, 'lib-button-icon', 4)(
              3,
              M8,
              1,
              2,
              'lib-link',
              5,
            ),
          2 & e)
        ) {
          let n;
          io(
            'input' === (n = t.$implicit.kind)
              ? 0
              : 'buttonText' === n
              ? 1
              : 'buttonIcon' === n
              ? 2
              : 'link' === n
              ? 3
              : -1,
          );
        }
      }
      let Ba = (() => {
          class e {
            constructor(n) {
              (this.fb = n),
                (this.direction = 'column'),
                (this.baseFormEvent = new oe()),
                (this.formGroup = this.fb.group({}));
            }
            ngOnInit() {
              this.baseForm.controls.forEach(n => {
                const { name: r } = n;
                this.checkFormControlExist(r),
                  this.formGroup.addControl(
                    r,
                    this.buildFormControl(n),
                  );
              });
            }
            onSubmit() {
              this.baseFormEvent.emit(this.formGroup.value),
                this.resetFormControls();
            }
            getFormControl(n) {
              const r = this.formGroup.get(n);
              if (r) return r;
              throw new Error(`Form control ${n} does not exists!`);
            }
            checkFormControlExist(n) {
              if (this.formGroup.get(n))
                throw new Error(`Form control ${n} already exists!`);
            }
            buildFormControl(n) {
              switch (n.kind) {
                case kt.input:
                  return new rr(n.defaultValue);
                case kt.buttonText:
                case kt.buttonIcon:
                case kt.link:
                  return new rr(!1);
                default:
                  throw new Error('Unsupported control type!');
              }
            }
            resetFormControls() {
              this.baseForm.controls.forEach(n => {
                const { name: r } = n;
                this.formGroup.setControl(
                  r,
                  this.buildFormControl(n),
                );
              });
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(E(d8));
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-base-form']],
              inputs: {
                baseForm: 'baseForm',
                direction: 'direction',
              },
              outputs: { baseFormEvent: 'baseFormEvent' },
              standalone: !0,
              features: [te],
              decls: 4,
              vars: 2,
              consts: [
                [3, 'ngSubmit', 'formGroup'],
                ['gap', '0.5em', 3, 'flexDirection'],
                [3, 'formControl'],
                [3, 'control', 'label', 'isPrimary', 'fullWidth'],
                [
                  3,
                  'control',
                  'iconEnter',
                  'iconLeave',
                  'alt',
                  'isPrimary',
                ],
                [3, 'label', 'path'],
                [
                  3,
                  'clickEvent',
                  'control',
                  'label',
                  'isPrimary',
                  'fullWidth',
                ],
                [
                  3,
                  'clickEvent',
                  'control',
                  'iconEnter',
                  'iconLeave',
                  'alt',
                  'isPrimary',
                ],
              ],
              template: function (r, o) {
                1 & r &&
                  (x(0, 'form', 0),
                  me('ngSubmit', function () {
                    return o.onSubmit();
                  }),
                  x(1, 'lib-flex', 1),
                  Ac(2, T8, 4, 1, null, null, w8),
                  L()()),
                  2 & r &&
                    (P('formGroup', o.formGroup),
                    se(),
                    P('flexDirection', o.direction),
                    se(),
                    Nc(o.baseForm.controls));
              },
              dependencies: [
                l0,
                zT,
                ym,
                AT,
                od,
                id,
                ji,
                y8,
                C8,
                D8,
                E8,
              ],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        A8 = (() => {
          class e {
            constructor() {
              (this.hamburgerFormEvent = new oe()),
                (this.hamburgerForm = {
                  controls: [
                    {
                      kind: kt.buttonIcon,
                      name: 'submit',
                      iconEnter: 'icon/hamburger-open.svg',
                      iconLeave: 'icon/hamburger-close.svg',
                      alt: 'hamburger icon',
                      isPrimary: !1,
                    },
                  ],
                });
            }
            onEvent(n) {
              this.hamburgerFormEvent.emit(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-hamburger-form']],
              outputs: { hamburgerFormEvent: 'hamburgerFormEvent' },
              standalone: !0,
              features: [te],
              decls: 1,
              vars: 1,
              consts: [[3, 'baseFormEvent', 'baseForm']],
              template: function (r, o) {
                1 & r &&
                  (x(0, 'lib-base-form', 0),
                  me('baseFormEvent', function (s) {
                    return o.onEvent(s);
                  }),
                  L()),
                  2 & r && P('baseForm', o.hamburgerForm);
              },
              dependencies: [Ba],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        h0 = (() => {
          class e {
            constructor(n) {
              this.router = n;
            }
            navigate(n) {
              this.router.navigate([n]);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(T(nr));
            });
            static #t = (this.ɵprov = S({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }));
          }
          return e;
        })(),
        N8 = (() => {
          class e {
            constructor(n, r) {
              (this.route = n),
                (this.breakpoint = r),
                (this.mainNavFormEvent = new oe()),
                (this.direction = 'row'),
                (this.form = {
                  controls: [
                    {
                      kind: kt.buttonText,
                      name: 'homeButton',
                      label: 'Home',
                      isPrimary: !1,
                      fullWidth: !0,
                    },
                    {
                      kind: kt.buttonText,
                      name: 'vocabularyButton',
                      label: 'Vocabulary',
                      isPrimary: !1,
                      fullWidth: !0,
                    },
                    {
                      kind: kt.buttonText,
                      name: 'grammarButton',
                      label: 'Grammar',
                      isPrimary: !1,
                      fullWidth: !0,
                    },
                  ],
                }),
                this.breakpoint.addObserver(this);
            }
            update(n) {
              this.direction =
                n.breakpoint === ct.XSmall ? 'column' : 'row';
            }
            onEvent(n) {
              if (n.homeButton) this.route.navigate('/home');
              else if (n.vocabularyButton)
                this.route.navigate('/vocabulary');
              else {
                if (!n.grammarButton)
                  throw new Error('No route is set to true!');
                this.route.navigate('/grammar');
              }
              this.mainNavFormEvent.emit();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(E(h0), E(pm));
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-main-nav-form']],
              outputs: { mainNavFormEvent: 'mainNavFormEvent' },
              standalone: !0,
              features: [te],
              decls: 1,
              vars: 2,
              consts: [[3, 'baseFormEvent', 'direction', 'baseForm']],
              template: function (r, o) {
                1 & r &&
                  (x(0, 'lib-base-form', 0),
                  me('baseFormEvent', function (s) {
                    return o.onEvent(s);
                  }),
                  L()),
                  2 & r &&
                    P('direction', o.direction)('baseForm', o.form);
              },
              dependencies: [Ba],
              encapsulation: 2,
            }));
          }
          return e;
        })();
      const R8 = ['hamburgerForm'],
        x8 = ['mainNavForm'];
      function O8(e, t) {
        if (1 & e) {
          const n = so();
          x(0, 'lib-wrapper', null, 0)(2, 'lib-hamburger-form', 6),
            me('hamburgerFormEvent', function () {
              return $r(n), Hr(Ne().onEvent());
            }),
            L()();
        }
      }
      function F8(e, t) {
        1 & e && Y(0, 'lib-main-nav-form');
      }
      function k8(e, t) {
        if (1 & e) {
          const n = so();
          x(0, 'lib-wrapper', null, 1)(2, 'lib-card', 7)(
            3,
            'lib-main-nav-form',
            8,
          ),
            me('mainNavFormEvent', function () {
              return $r(n), Hr(Ne().onEvent());
            }),
            L()()();
        }
      }
      let P8 = (() => {
        class e {
          constructor(n) {
            (this.breakpoint = n),
              (this.isMobile = !0),
              (this.isMenuVisible = !1),
              (this.mainNavJustifyContent = 'space-between'),
              this.breakpoint.addObserver(this);
          }
          update(n) {
            const { breakpoint: r } = n;
            r === ct.XSmall
              ? (this.isMobile = !0)
              : ((this.isMobile = !1), (this.isMenuVisible = !1)),
              (this.mainNavJustifyContent =
                r === ct.Large || r === ct.XLarge
                  ? 'space-around'
                  : 'space-between');
          }
          onEvent() {
            this.isMenuVisible = !this.isMenuVisible;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(E(pm));
          });
          static #t = (this.ɵcmp = ee({
            type: e,
            selectors: [['lib-main-nav']],
            viewQuery: function (r, o) {
              if ((1 & r && (kc(R8, 5), kc(x8, 5)), 2 & r)) {
                let i;
                Js((i = ea())) && (o.hamburgerForm = i.first),
                  Js((i = ea())) && (o.mainNavForm = i.first);
              }
            },
            standalone: !0,
            features: [te],
            decls: 7,
            vars: 3,
            consts: [
              ['hamburgerForm', ''],
              ['mainNavForm', ''],
              ['flexDirection', 'column'],
              ['cardType', 'card__main-nav'],
              ['alignItems', 'center', 3, 'justifyContent'],
              ['src', 'icon/school.svg', 'alt', 'Logo School Icon'],
              [3, 'hamburgerFormEvent'],
              ['cardType', 'card__main-nav-menu-options'],
              [3, 'mainNavFormEvent'],
            ],
            template: function (r, o) {
              1 & r &&
                (x(0, 'lib-flex', 2)(1, 'lib-card', 3)(
                  2,
                  'lib-flex',
                  4,
                ),
                Y(3, 'lib-icon', 5),
                _r(4, O8, 3, 0, 'lib-wrapper')(
                  5,
                  F8,
                  1,
                  0,
                  'lib-main-nav-form',
                ),
                L()(),
                _r(6, k8, 4, 0, 'lib-wrapper'),
                L()),
                2 & r &&
                  (se(2),
                  P('justifyContent', o.mainNavJustifyContent),
                  se(2),
                  io(o.isMobile ? 4 : 5),
                  se(2),
                  io(o.isMobile && o.isMenuVisible ? 6 : -1));
            },
            dependencies: [ji, Do, rT, dG, A8, N8],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      const H8 = ['*'];
      let z8 = (() => {
        class e {
          constructor() {
            this.flex = '0';
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = ee({
            type: e,
            selectors: [['lib-flex-item']],
            inputs: { flex: 'flex' },
            standalone: !0,
            features: [te],
            ngContentSelectors: H8,
            decls: 2,
            vars: 2,
            template: function (r, o) {
              1 & r && (Er(), x(0, 'div'), Qn(1), L()),
                2 & r && yp('flex', o.flex);
            },
            styles: ['[_nghost-%COMP%]{display:contents}'],
          }));
        }
        return e;
      })();
      const G8 = [[['', 'nav', '']], [['', 'content', '']]],
        q8 = ['[nav]', '[content]'];
      let p0 = (() => {
        class e {
          constructor(n) {
            (this.breakpoint = n),
              (this.flexDirection = 'column'),
              this.breakpoint.addObserver(this);
          }
          update(n) {
            this.flexDirection =
              n.breakpoint === ct.XSmall ? 'column' : 'row';
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(E(pm));
          });
          static #t = (this.ɵcmp = ee({
            type: e,
            selectors: [['lib-section']],
            inputs: { header: 'header' },
            standalone: !0,
            features: [te],
            ngContentSelectors: q8,
            decls: 8,
            vars: 2,
            consts: [
              ['gap', '1rem', 3, 'flexDirection'],
              ['flex', '0 1 auto'],
              ['cardType', 'card__secondary'],
              ['flexDirection', 'column', 'gap', '1rem'],
              [
                'textColor',
                'text__secondary',
                'type',
                'header3',
                3,
                'value',
              ],
              ['flex', '1'],
            ],
            template: function (r, o) {
              1 & r &&
                (Er(G8),
                x(0, 'lib-flex', 0)(1, 'lib-flex-item', 1)(
                  2,
                  'lib-card',
                  2,
                )(3, 'lib-flex', 3),
                Y(4, 'lib-text', 4),
                Qn(5),
                L()()(),
                x(6, 'lib-flex-item', 5),
                Qn(7, 1),
                L()()),
                2 & r &&
                  (P('flexDirection', o.flexDirection),
                  se(4),
                  P('value', o.header));
            },
            dependencies: [ji, z8, Do, or],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      function W8(e, t) {}
      let Z8 = (() => {
        class e {
          constructor() {
            this.options = [];
          }
          ngOnInit() {
            this.options = [
              {
                value: 'Bank',
                link: `/vocabulary/${this.route}/bank`,
              },
              {
                value: 'Quiz',
                link: `/vocabulary/${this.route}/quiz`,
              },
            ];
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = ee({
            type: e,
            selectors: [['lib-vocabulary']],
            inputs: { route: 'route' },
            standalone: !0,
            features: [te],
            decls: 5,
            vars: 0,
            consts: [['alignItems', 'center', 'gap', '0.5em']],
            template: function (r, o) {
              1 & r &&
                (x(0, 'lib-card')(1, 'lib-flex', 0),
                Ac(2, W8, 0, 0, null, null, Ep),
                L()(),
                Y(4, 'router-outlet')),
                2 & r && (se(2), Nc(o.options));
            },
            dependencies: [lo, ji, Do, Ol],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      function Q8(e, t) {
        if (
          (1 & e &&
            (x(0, 'lib-card')(1, 'lib-flex', 1),
            Y(2, 'lib-text', 2)(3, 'lib-text', 2)(4, 'lib-text', 2),
            L()()),
          2 & e)
        ) {
          const n = t.$implicit,
            r = t.$index;
          se(2),
            P('value', (r + 1).toString()),
            se(),
            P('value', n.polish),
            se(),
            P('value', n.english);
        }
      }
      let Y8 = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = ee({
            type: e,
            selectors: [['lib-bank']],
            inputs: { words: 'words' },
            standalone: !0,
            features: [te],
            decls: 4,
            vars: 0,
            consts: [
              ['gap', '0.5em', 'flexDirection', 'column'],
              [
                'alignItems',
                'center',
                'justifyContent',
                'space-between',
              ],
              [3, 'value'],
            ],
            template: function (r, o) {
              1 & r &&
                (x(0, 'lib-card')(1, 'lib-flex', 0),
                Ac(2, Q8, 5, 3, 'lib-card', null, Ep),
                L()()),
                2 & r && (se(2), Nc(o.words));
            },
            dependencies: [Do, ji, or],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      var K8 = Xe(206),
        X8 = Xe.n(K8);
      const J8 = ['*'];
      let e4 = (() => {
        class e {
          constructor() {
            (this.position = 'static'),
              (this.top = 'auto'),
              (this.right = 'auto'),
              (this.bottom = 'auto'),
              (this.left = 'auto');
          }
          buildPosition() {
            return {
              position: this.position,
              top: this.top,
              right: this.right,
              bottom: this.bottom,
              left: this.left,
            };
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = ee({
            type: e,
            selectors: [['lib-position']],
            inputs: {
              position: 'position',
              top: 'top',
              right: 'right',
              bottom: 'bottom',
              left: 'left',
            },
            standalone: !0,
            features: [te],
            ngContentSelectors: J8,
            decls: 2,
            vars: 1,
            consts: [[3, 'ngStyle']],
            template: function (r, o) {
              1 & r && (Er(), x(0, 'div', 0), Qn(1), L()),
                2 & r && P('ngStyle', o.buildPosition());
            },
            dependencies: [lo, _g],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      function t4(e, t) {
        if (
          (1 & e && (x(0, 'div', 0), Y(1, 'lib-text', 3), L()), 2 & e)
        ) {
          const n = Ne();
          se(), P('value', n.value.toString());
        }
      }
      function n4(e, t) {
        if (
          (1 & e && (x(0, 'div', 1), Y(1, 'lib-text', 3), L()), 2 & e)
        ) {
          const n = Ne();
          se(), P('value', n.value.toString());
        }
      }
      function r4(e, t) {
        if (
          (1 & e && (x(0, 'div', 2), Y(1, 'lib-text', 3), L()), 2 & e)
        ) {
          const n = Ne();
          se(), P('value', n.value.toString());
        }
      }
      let o4 = (() => {
          class e {
            constructor() {
              this.type = 'info';
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-counter']],
              inputs: { value: 'value', type: 'type' },
              standalone: !0,
              features: [te],
              decls: 3,
              vars: 1,
              consts: [
                [1, 'counter'],
                [1, 'counter', 'counter__error'],
                [1, 'counter', 'counter__success'],
                [3, 'value'],
              ],
              template: function (r, o) {
                1 & r &&
                  _r(0, t4, 2, 1, 'div', 0)(1, n4, 2, 1, 'div', 1)(
                    2,
                    r4,
                    2,
                    1,
                    'div',
                    2,
                  ),
                  2 & r &&
                    io(
                      'info' === o.type
                        ? 0
                        : 'error' === o.type
                        ? 1
                        : 2,
                    );
              },
              dependencies: [or],
              styles: [
                '.counter[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:100%;display:flex;align-items:center;justify-content:center;font-size:.75em;border:2px solid #2C2E43;background-color:#34364f}.counter__success[_ngcontent-%COMP%]{background-color:#006400}.counter__error[_ngcontent-%COMP%]{background-color:#8b0000}',
              ],
            }));
          }
          return e;
        })(),
        i4 = (() => {
          class e {
            constructor() {
              (this.quizFormEvent = new oe()),
                (this.quizForm = {
                  controls: [
                    {
                      kind: kt.input,
                      name: 'answer',
                      defaultValue: '',
                    },
                    {
                      kind: kt.buttonText,
                      name: 'showAnswer',
                      label: 'Show Answer',
                      isPrimary: !1,
                      fullWidth: !1,
                    },
                    {
                      kind: kt.buttonText,
                      name: 'submitAnswer',
                      label: 'Submit',
                      isPrimary: !0,
                      fullWidth: !1,
                    },
                  ],
                });
            }
            onEvent(n) {
              this.quizFormEvent.emit(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-quiz-form']],
              outputs: { quizFormEvent: 'quizFormEvent' },
              standalone: !0,
              features: [te],
              decls: 1,
              vars: 1,
              consts: [[3, 'baseFormEvent', 'baseForm']],
              template: function (r, o) {
                1 & r &&
                  (x(0, 'lib-base-form', 0),
                  me('baseFormEvent', function (s) {
                    return o.onEvent(s);
                  }),
                  L()),
                  2 & r && P('baseForm', o.quizForm);
              },
              dependencies: [Ba],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        s4 = (() => {
          class e {
            constructor() {
              (this.restartFormEvent = new oe()),
                (this.restartForm = {
                  controls: [
                    {
                      kind: kt.buttonText,
                      name: 'restart',
                      label: 'Restart',
                      isPrimary: !1,
                      fullWidth: !0,
                    },
                  ],
                });
            }
            onEvent(n) {
              this.restartFormEvent.emit(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-restart-form']],
              outputs: { restartFormEvent: 'restartFormEvent' },
              standalone: !0,
              features: [te],
              decls: 1,
              vars: 1,
              consts: [[3, 'baseFormEvent', 'baseForm']],
              template: function (r, o) {
                1 & r &&
                  (x(0, 'lib-base-form', 0),
                  me('baseFormEvent', function (s) {
                    return o.onEvent(s);
                  }),
                  L()),
                  2 & r && P('baseForm', o.restartForm);
              },
              dependencies: [Ba],
              encapsulation: 2,
            }));
          }
          return e;
        })();
      function a4(e, t) {
        if (1 & e) {
          const n = so();
          x(0, 'lib-position', 2),
            Y(1, 'lib-counter', 3),
            L(),
            x(2, 'lib-position', 4)(3, 'lib-flex', 5),
            Y(4, 'lib-counter', 6)(5, 'lib-counter', 7),
            L()(),
            x(6, 'lib-flex', 8),
            Y(7, 'lib-text', 9),
            L(),
            x(8, 'lib-quiz-form', 10),
            me('quizFormEvent', function (o) {
              return $r(n), Hr(Ne().onSubmit(o));
            }),
            L();
        }
        if (2 & e) {
          const n = Ne();
          se(),
            P('value', n.currentWords.length),
            se(3),
            P('value', n.successes),
            se(),
            P('value', n.errors),
            se(2),
            P('value', n.currentWord.polish);
        }
      }
      function u4(e, t) {
        if (1 & e) {
          const n = so();
          x(0, 'lib-flex', 11),
            Y(1, 'lib-text', 12),
            L(),
            x(2, 'lib-flex', 13),
            Y(3, 'lib-text', 14)(4, 'lib-counter', 6),
            L(),
            x(5, 'lib-flex', 13),
            Y(6, 'lib-text', 15)(7, 'lib-counter', 7),
            L(),
            x(8, 'lib-restart-form', 16),
            me('restartFormEvent', function () {
              return $r(n), Hr(Ne().onRestart());
            }),
            L();
        }
        if (2 & e) {
          const n = Ne();
          se(4), P('value', n.successes), se(3), P('value', n.errors);
        }
      }
      let c4 = (() => {
        class e {
          constructor() {
            (this.successes = 0), (this.errors = 0);
          }
          ngOnInit() {
            this.initQuiz();
          }
          onSubmit(n) {
            (this.input = n.answer),
              this.checkWord(),
              this.nextWord();
          }
          onRestart() {
            this.initQuiz();
          }
          initQuiz() {
            (this.successes = 0),
              (this.errors = 0),
              (this.currentWords = X8()(this.words)),
              this.nextWord();
          }
          nextWord() {
            const n = this.currentWords.pop();
            n && ((this.currentWord = n), (this.input = ''));
          }
          checkWord() {
            this.input !== this.currentWord.english
              ? (this.errors += 1)
              : (this.successes += 1);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = ee({
            type: e,
            selectors: [['lib-quiz']],
            inputs: { words: 'words' },
            standalone: !0,
            features: [te],
            decls: 6,
            vars: 1,
            consts: [
              ['position', 'relative'],
              ['gap', '1em', 'flexDirection', 'column'],
              ['position', 'absolute', 'top', '0', 'left', '10px'],
              [3, 'value'],
              ['position', 'absolute', 'top', '0', 'right', '10px'],
              ['gap', '0.25em'],
              ['type', 'success', 3, 'value'],
              ['type', 'error', 3, 'value'],
              ['alignItems', 'center', 'justifyContent', 'center'],
              ['textType', 'header3', 3, 'value'],
              [3, 'quizFormEvent'],
              ['alignItems', 'center'],
              ['value', 'Finish!', 'textType', 'header2'],
              [
                'alignItems',
                'center',
                'justifyContent',
                'center',
                'gap',
                '0.5em',
              ],
              ['value', 'Correct answers'],
              ['value', 'Incorrect answers'],
              [3, 'restartFormEvent'],
            ],
            template: function (r, o) {
              1 & r &&
                (x(0, 'lib-position', 0)(1, 'lib-card')(
                  2,
                  'lib-card',
                )(3, 'lib-flex', 1),
                _r(4, a4, 9, 4)(5, u4, 9, 2),
                L()()()()),
                2 & r &&
                  (se(4), io(o.currentWords.length > 0 ? 4 : 5));
            },
            dependencies: [Do, ji, or, e4, o4, i4, s4],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      const f4 = new (class d4 extends JM {})(
        class l4 extends KM {
          constructor(t, n) {
            super(t, n), (this.scheduler = t), (this.work = n);
          }
          schedule(t, n = 0) {
            return n > 0
              ? super.schedule(t, n)
              : ((this.delay = n),
                (this.state = t),
                this.scheduler.flush(this),
                this);
          }
          execute(t, n) {
            return n > 0 || this.closed
              ? super.execute(t, n)
              : this._execute(t, n);
          }
          requestAsyncId(t, n, r = 0) {
            return (null != r && r > 0) ||
              (null == r && this.delay > 0)
              ? super.requestAsyncId(t, n, r)
              : (t.flush(this), 0);
          }
        },
      );
      function m4(e, t) {
        return e === t;
      }
      function m0(e, t) {
        const n = !t?.manualCleanup;
        n &&
          !t?.injector &&
          (function Ji(e) {
            if (!hy()) throw new D(-203, !1);
          })();
        const r = n ? t?.injector?.get(Wr) ?? _(Wr) : null,
          o = (function _4(e = Object.is) {
            return (t, n) =>
              1 === t.kind && 1 === n.kind && e(t.value, n.value);
          })(t?.equal);
        let i;
        i = yr(
          t?.requireSync
            ? { kind: 0 }
            : { kind: 1, value: t?.initialValue },
          { equal: o },
        );
        const s = e.subscribe({
          next: a => i.set({ kind: 1, value: a }),
          error: a => {
            if (t?.rejectErrors) throw a;
            i.set({ kind: 2, error: a });
          },
        });
        if (t?.requireSync && 0 === i().kind) throw new D(601, !1);
        return (
          r?.onDestroy(s.unsubscribe.bind(s)),
          co(
            () => {
              const a = i();
              switch (a.kind) {
                case 1:
                  return a.value;
                case 2:
                  throw a.error;
                case 0:
                  throw new D(601, !1);
              }
            },
            { equal: t?.equal },
          )
        );
      }
      const $a = {};
      function Pm(e, t) {
        return Object.defineProperty(t, 'type', {
          value: e,
          writable: !1,
        });
      }
      const y0 = '@ngrx/store/init';
      let Hi = (() => {
        class e extends gt {
          constructor() {
            super({ type: y0 });
          }
          next(n) {
            if ('function' == typeof n)
              throw new TypeError(
                "\n        Dispatch expected an object, instead it received a function.\n        If you're using the createAction function, make sure to invoke the function\n        before dispatching the action. For example, someAction should be someAction().",
              );
            if (typeof n > 'u')
              throw new TypeError('Actions must be objects');
            if (typeof n.type > 'u')
              throw new TypeError(
                'Actions must have a type property',
              );
            super.next(n);
          }
          complete() {}
          ngOnDestroy() {
            super.complete();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const b4 = [Hi],
        _0 = new w('@ngrx/store Internal Root Guard'),
        C0 = new w('@ngrx/store Internal Initial State'),
        Vm = new w('@ngrx/store Initial State'),
        D0 = new w('@ngrx/store Reducer Factory'),
        E0 = new w('@ngrx/store Internal Reducer Factory Provider'),
        w0 = new w('@ngrx/store Initial Reducers'),
        jm = new w('@ngrx/store Internal Initial Reducers'),
        I0 =
          (new w('@ngrx/store Store Features'),
          new w('@ngrx/store Internal Store Reducers')),
        N0 =
          (new w('@ngrx/store Internal Feature Reducers'),
          new w('@ngrx/store Internal Feature Configs'),
          new w('@ngrx/store Internal Store Features'),
          new w('@ngrx/store Internal Feature Reducers Token'),
          new w('@ngrx/store Feature Reducers'),
          new w('@ngrx/store User Provided Meta Reducers')),
        sd = new w('@ngrx/store Meta Reducers'),
        R0 = new w('@ngrx/store Internal Resolved Meta Reducers'),
        x0 = new w('@ngrx/store User Runtime Checks Config'),
        O0 = new w('@ngrx/store Internal User Runtime Checks Config'),
        Ha = new w('@ngrx/store Internal Runtime Checks'),
        Bm = new w('@ngrx/store Check if Action types are unique'),
        $m = new w('@ngrx/store Root Store Provider');
      function Hm(e, t = {}) {
        const n = Object.keys(e),
          r = {};
        for (let i = 0; i < n.length; i++) {
          const s = n[i];
          'function' == typeof e[s] && (r[s] = e[s]);
        }
        const o = Object.keys(r);
        return function (s, a) {
          s = void 0 === s ? t : s;
          let u = !1;
          const c = {};
          for (let l = 0; l < o.length; l++) {
            const d = o[l],
              h = s[d],
              p = (0, r[d])(h, a);
            (c[d] = p), (u = u || p !== h);
          }
          return u ? c : s;
        };
      }
      function k0(...e) {
        return function (t) {
          if (0 === e.length) return t;
          const n = e[e.length - 1];
          return e.slice(0, -1).reduceRight((o, i) => i(o), n(t));
        };
      }
      function P0(e, t) {
        return (
          Array.isArray(t) &&
            t.length > 0 &&
            (e = k0.apply(null, [...t, e])),
          (n, r) => {
            const o = e(n);
            return (i, s) => o((i = void 0 === i ? r : i), s);
          }
        );
      }
      new w('@ngrx/store Feature State Provider');
      class zm extends xe {}
      class L0 extends Hi {}
      let ad = (() => {
        class e extends gt {
          get currentReducers() {
            return this.reducers;
          }
          constructor(n, r, o, i) {
            super(i(o, r)),
              (this.dispatcher = n),
              (this.initialState = r),
              (this.reducers = o),
              (this.reducerFactory = i);
          }
          addFeature(n) {
            this.addFeatures([n]);
          }
          addFeatures(n) {
            const r = n.reduce(
              (
                o,
                {
                  reducers: i,
                  reducerFactory: s,
                  metaReducers: a,
                  initialState: u,
                  key: c,
                },
              ) => {
                const l =
                  'function' == typeof i
                    ? (function S4(e) {
                        const t =
                          Array.isArray(e) && e.length > 0
                            ? k0(...e)
                            : n => n;
                        return (n, r) => (
                          (n = t(n)),
                          (o, i) => n((o = void 0 === o ? r : o), i)
                        );
                      })(a)(i, u)
                    : P0(s, a)(i, u);
                return (o[c] = l), o;
              },
              {},
            );
            this.addReducers(r);
          }
          removeFeature(n) {
            this.removeFeatures([n]);
          }
          removeFeatures(n) {
            this.removeReducers(n.map(r => r.key));
          }
          addReducer(n, r) {
            this.addReducers({ [n]: r });
          }
          addReducers(n) {
            (this.reducers = { ...this.reducers, ...n }),
              this.updateReducers(Object.keys(n));
          }
          removeReducer(n) {
            this.removeReducers([n]);
          }
          removeReducers(n) {
            n.forEach(r => {
              this.reducers = (function I4(e, t) {
                return Object.keys(e)
                  .filter(n => n !== t)
                  .reduce(
                    (n, r) => Object.assign(n, { [r]: e[r] }),
                    {},
                  );
              })(this.reducers, r);
            }),
              this.updateReducers(n);
          }
          updateReducers(n) {
            this.next(
              this.reducerFactory(this.reducers, this.initialState),
            ),
              this.dispatcher.next({
                type: '@ngrx/store/update-reducers',
                features: n,
              });
          }
          ngOnDestroy() {
            this.complete();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(T(L0), T(Vm), T(w0), T(D0));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const T4 = [
        ad,
        { provide: zm, useExisting: ad },
        { provide: L0, useExisting: Hi },
      ];
      let Gm = (() => {
        class e extends pt {
          ngOnDestroy() {
            this.complete();
          }
          static #e = (this.ɵfac = (() => {
            let n;
            return function (o) {
              return (n || (n = $e(e)))(o || e);
            };
          })());
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const A4 = [Gm];
      class V0 extends xe {}
      let j0 = (() => {
        class e extends gt {
          static #e = (this.INIT = y0);
          constructor(n, r, o, i) {
            super(i);
            const a = n.pipe(Pg(f4)).pipe(
                (function h4(...e) {
                  const t = Vg(e);
                  return Ve((n, r) => {
                    const o = e.length,
                      i = new Array(o);
                    let s = e.map(() => !1),
                      a = !1;
                    for (let u = 0; u < o; u++)
                      vn(e[u]).subscribe(
                        Ae(
                          r,
                          c => {
                            (i[u] = c),
                              !a &&
                                !s[u] &&
                                ((s[u] = !0),
                                (a = s.every(Ln)) && (s = null));
                          },
                          Xa,
                        ),
                      );
                    n.subscribe(
                      Ae(r, u => {
                        if (a) {
                          const c = [u, ...i];
                          r.next(t ? t(...c) : c);
                        }
                      }),
                    );
                  });
                })(r),
              ),
              c = a.pipe(ZS(N4, { state: i }));
            (this.stateSubscription = c.subscribe(
              ({ state: l, action: d }) => {
                this.next(l), o.next(d);
              },
            )),
              (this.state = m0(this, {
                manualCleanup: !0,
                requireSync: !0,
              }));
          }
          ngOnDestroy() {
            this.stateSubscription.unsubscribe(), this.complete();
          }
          static #t = (this.ɵfac = function (r) {
            return new (r || e)(T(Hi), T(zm), T(Gm), T(Vm));
          });
          static #n = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function N4(e = { state: void 0 }, [t, n]) {
        const { state: r } = e;
        return { state: n(r, t), action: t };
      }
      const R4 = [j0, { provide: V0, useExisting: j0 }];
      let za = (() => {
        class e extends xe {
          constructor(n, r, o) {
            super(),
              (this.actionsObserver = r),
              (this.reducerManager = o),
              (this.source = n),
              (this.state = n.state);
          }
          select(n, ...r) {
            return O4.call(null, n, ...r)(this);
          }
          selectSignal(n, r) {
            return co(() => n(this.state()), r);
          }
          lift(n) {
            const r = new e(
              this,
              this.actionsObserver,
              this.reducerManager,
            );
            return (r.operator = n), r;
          }
          dispatch(n) {
            this.actionsObserver.next(n);
          }
          next(n) {
            this.actionsObserver.next(n);
          }
          error(n) {
            this.actionsObserver.error(n);
          }
          complete() {
            this.actionsObserver.complete();
          }
          addReducer(n, r) {
            this.reducerManager.addReducer(n, r);
          }
          removeReducer(n) {
            this.reducerManager.removeReducer(n);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(T(V0), T(Hi), T(ad));
          });
          static #t = (this.ɵprov = S({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const x4 = [za];
      function O4(e, t, ...n) {
        return function (o) {
          let i;
          if ('string' == typeof e) {
            const s = [t, ...n].filter(Boolean);
            i = o.pipe(
              (function p4(...e) {
                const t = e.length;
                if (0 === t)
                  throw new Error(
                    'list of properties cannot be empty.',
                  );
                return J(n => {
                  let r = n;
                  for (let o = 0; o < t; o++) {
                    const i = r?.[e[o]];
                    if (!(typeof i < 'u')) return;
                    r = i;
                  }
                  return r;
                });
              })(e, ...s),
            );
          } else {
            if ('function' != typeof e)
              throw new TypeError(
                `Unexpected type '${typeof e}' in select operator, expected 'string' or 'function'`,
              );
            i = o.pipe(J(s => e(s, t)));
          }
          return i.pipe(
            (function g4(e, t = Ln) {
              return (
                (e = e ?? m4),
                Ve((n, r) => {
                  let o,
                    i = !0;
                  n.subscribe(
                    Ae(r, s => {
                      const a = t(s);
                      (i || !e(o, a)) &&
                        ((i = !1), (o = a), r.next(s));
                    }),
                  );
                })
              );
            })(),
          );
        };
      }
      const qm =
        'https://ngrx.io/guide/store/configuration/runtime-checks';
      function U0(e) {
        return void 0 === e;
      }
      function B0(e) {
        return null === e;
      }
      function $0(e) {
        return Array.isArray(e);
      }
      function H0(e) {
        return 'object' == typeof e && null !== e;
      }
      function Wm(e) {
        return 'function' == typeof e;
      }
      function Q4(e) {
        return e instanceof w ? _(e) : e;
      }
      function W0(e) {
        return 'function' == typeof e ? e() : e;
      }
      function X4(e, t) {
        return e.concat(t);
      }
      function J4() {
        if (_(za, { optional: !0, skipSelf: !0 }))
          throw new TypeError(
            'The root Store has been provided more than once. Feature modules should provide feature states instead.',
          );
        return 'guarded';
      }
      function Ym(e) {
        Object.freeze(e);
        const t = Wm(e);
        return (
          Object.getOwnPropertyNames(e).forEach(n => {
            if (
              !n.startsWith('\u0275') &&
              (function j4(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
              })(e, n) &&
              (!t ||
                ('caller' !== n &&
                  'callee' !== n &&
                  'arguments' !== n))
            ) {
              const r = e[n];
              (H0(r) || Wm(r)) && !Object.isFrozen(r) && Ym(r);
            }
          }),
          e
        );
      }
      function Km(e, t = []) {
        return (U0(e) || B0(e)) && 0 === t.length
          ? { path: ['root'], value: e }
          : Object.keys(e).reduce((r, o) => {
              if (r) return r;
              const i = e[o];
              return (function V4(e) {
                return Wm(e) && e.hasOwnProperty('\u0275cmp');
              })(i)
                ? r
                : !(
                    U0(i) ||
                    B0(i) ||
                    (function P4(e) {
                      return 'number' == typeof e;
                    })(i) ||
                    (function k4(e) {
                      return 'boolean' == typeof e;
                    })(i) ||
                    (function F4(e) {
                      return 'string' == typeof e;
                    })(i) ||
                    $0(i)
                  ) &&
                    ((function z0(e) {
                      if (
                        !(function L4(e) {
                          return H0(e) && !$0(e);
                        })(e)
                      )
                        return !1;
                      const t = Object.getPrototypeOf(e);
                      return t === Object.prototype || null === t;
                    })(i)
                      ? Km(i, [...t, o])
                      : { path: [...t, o], value: i });
            }, !1);
      }
      function Z0(e, t) {
        if (!1 === e) return;
        const n = e.path.join('.'),
          r = new Error(
            `Detected unserializable ${t} at "${n}". ${qm}#strict${t}serializability`,
          );
        throw ((r.value = e.value), (r.unserializablePath = n), r);
      }
      function rq(e) {
        return {
          strictStateSerializability: !1,
          strictActionSerializability: !1,
          strictStateImmutability: !1,
          strictActionImmutability: !1,
          strictActionWithinNgZone: !1,
          strictActionTypeUniqueness: !1,
        };
      }
      function oq({
        strictActionSerializability: e,
        strictStateSerializability: t,
      }) {
        return n =>
          e || t
            ? (function tq(e, t) {
                return function (n, r) {
                  t.action(r) && Z0(Km(r), 'action');
                  const o = e(n, r);
                  return t.state() && Z0(Km(o), 'state'), o;
                };
              })(n, { action: r => e && !Xm(r), state: () => t })
            : n;
      }
      function iq({
        strictActionImmutability: e,
        strictStateImmutability: t,
      }) {
        return n =>
          e || t
            ? (function eq(e, t) {
                return function (n, r) {
                  const o = t.action(r) ? Ym(r) : r,
                    i = e(n, o);
                  return t.state() ? Ym(i) : i;
                };
              })(n, { action: r => e && !Xm(r), state: () => t })
            : n;
      }
      function Xm(e) {
        return e.type.startsWith('@ngrx');
      }
      function sq({ strictActionWithinNgZone: e }) {
        return t =>
          e
            ? (function nq(e, t) {
                return function (n, r) {
                  if (t.action(r) && !ie.isInAngularZone())
                    throw new Error(
                      `Action '${r.type}' running outside NgZone. ${qm}#strictactionwithinngzone`,
                    );
                  return e(n, r);
                };
              })(t, { action: n => e && !Xm(n) })
            : t;
      }
      function aq(e) {
        return [
          { provide: O0, useValue: e },
          { provide: x0, useFactory: uq, deps: [O0] },
          { provide: Ha, deps: [x0], useFactory: rq },
          { provide: sd, multi: !0, deps: [Ha], useFactory: iq },
          { provide: sd, multi: !0, deps: [Ha], useFactory: oq },
          { provide: sd, multi: !0, deps: [Ha], useFactory: sq },
        ];
      }
      function uq(e) {
        return e;
      }
      function cq(e) {
        if (!e.strictActionTypeUniqueness) return;
        const t = Object.entries($a)
          .filter(([, n]) => n > 1)
          .map(([n]) => n);
        if (t.length)
          throw new Error(
            `Action types are registered more than once, ${t
              .map(n => `"${n}"`)
              .join(', ')}. ${qm}#strictactiontypeuniqueness`,
          );
      }
      function lq(e = {}, t = {}) {
        return [
          { provide: _0, useFactory: J4 },
          { provide: C0, useValue: t.initialState },
          { provide: Vm, useFactory: W0, deps: [C0] },
          { provide: jm, useValue: e },
          { provide: I0, useExisting: e instanceof w ? e : jm },
          { provide: w0, deps: [jm, [new Qv(I0)]], useFactory: Q4 },
          {
            provide: N0,
            useValue: t.metaReducers ? t.metaReducers : [],
          },
          { provide: R0, deps: [sd, N0], useFactory: X4 },
          {
            provide: E0,
            useValue: t.reducerFactory ? t.reducerFactory : Hm,
          },
          { provide: D0, deps: [E0, R0], useFactory: P0 },
          b4,
          T4,
          A4,
          R4,
          x4,
          aq(t.runtimeChecks),
          [{ provide: Bm, multi: !0, deps: [Ha], useFactory: cq }],
        ];
      }
      const fq = [
        {
          provide: $m,
          useFactory: function dq() {
            _(Hi),
              _(zm),
              _(Gm),
              _(za),
              _(_0, { optional: !0 }),
              _(Bm, { optional: !0 });
          },
        },
        { provide: $t, multi: !0, useFactory: () => () => _($m) },
      ];
      let _q = (() => {
          class e {
            constructor(n, r, o) {
              (this.activated = n),
                (this.store = r),
                (this.route = o),
                (this.form = { controls: [] });
            }
            ngOnInit() {
              this.sub = this.store
                .select(this.storeName)
                .subscribe(n => {
                  this.form = n.tabs
                    .map(o => ({
                      kind: kt.link,
                      name: o.name,
                      label: o.label,
                      path: o.path,
                    }))
                    .reduce((o, i) => (o.controls.push(i), o), {
                      controls: [],
                    });
                  const r = n.tabs.find(o => o.isDefault);
                  if (!r) throw new Error('Not found default tab!');
                  this.activated.paramMap
                    .subscribe(o => {
                      o.get('name') || this.route.navigate(r.path);
                    })
                    .unsubscribe();
                });
            }
            ngOnDestroy() {
              this.sub.unsubscribe();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(E(Ar), E(za), E(h0));
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-section-nav-form']],
              inputs: { storeName: 'storeName' },
              standalone: !0,
              features: [te],
              decls: 1,
              vars: 1,
              consts: [['direction', 'column', 3, 'baseForm']],
              template: function (r, o) {
                1 & r && Y(0, 'lib-base-form', 0),
                  2 & r && P('baseForm', o.form);
              },
              dependencies: [Ba],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        Cq = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-root']],
              standalone: !0,
              features: [te],
              decls: 3,
              vars: 0,
              consts: [[1, 'main']],
              template: function (r, o) {
                1 & r &&
                  (Y(0, 'lib-main-nav'),
                  x(1, 'main', 0),
                  Y(2, 'router-outlet'),
                  L());
              },
              dependencies: [P8, Ol],
              styles: [
                '.main[_ngcontent-%COMP%]{margin:auto;padding:1rem;max-width:960px}',
              ],
            }));
          }
          return e;
        })(),
        Dq = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-home']],
              standalone: !0,
              features: [te],
              decls: 2,
              vars: 0,
              consts: [
                ['cardType', 'card__secondary'],
                ['value', 'Home', 'textColor', 'text__secondary'],
              ],
              template: function (r, o) {
                1 & r &&
                  (x(0, 'lib-card', 0), Y(1, 'lib-text', 1), L());
              },
              dependencies: [Do, or],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        Y0 = (() => {
          class e {
            constructor(n, r) {
              (this.route = n),
                (this.store = r),
                (this.title = ''),
                (this.sub = this.route.paramMap.subscribe(o => {
                  const i = o.get('name');
                  i &&
                    ((this.title = i),
                    r
                      .select('grammar')
                      .subscribe(s => {
                        this.title =
                          s.tabs.find(a => a.name === i)?.content ??
                          '';
                      })
                      .unsubscribe());
                }));
            }
            ngOnDestroy() {
              this.sub.unsubscribe();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(E(Ar), E(za));
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-grammar']],
              standalone: !0,
              features: [te],
              decls: 4,
              vars: 1,
              consts: [
                ['header', 'Grammar'],
                ['nav', '', 'storeName', 'grammar'],
                ['content', '', 'cardType', 'card__secondary'],
                ['textColor', 'text__secondary', 3, 'value'],
              ],
              template: function (r, o) {
                1 & r &&
                  (x(0, 'lib-section', 0),
                  Y(1, 'lib-section-nav-form', 1),
                  x(2, 'lib-card', 2),
                  Y(3, 'lib-text', 3),
                  L()()),
                  2 & r && (se(3), P('value', o.title));
              },
              dependencies: [p0, _q, Do, or],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        Eq = (() => {
          class e {
            constructor() {
              this.options = [
                { value: 'Test1', link: '/vocabulary/test1' },
              ];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-vocabulary']],
              standalone: !0,
              features: [te],
              decls: 1,
              vars: 0,
              consts: [['header', 'Vocabulary']],
              template: function (r, o) {
                1 & r && Y(0, 'lib-section', 0);
              },
              dependencies: [p0],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        wq = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-test1']],
              standalone: !0,
              features: [te],
              decls: 1,
              vars: 0,
              consts: [['route', 'test1']],
              template: function (r, o) {
                1 & r && Y(0, 'lib-vocabulary', 0);
              },
              dependencies: [Z8],
              encapsulation: 2,
            }));
          }
          return e;
        })();
      const K0 = [
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
        { english: 'lorem ipsum', polish: 'polski lorem ipsum' },
      ];
      let bq = (() => {
          class e {
            constructor() {
              this.words = K0;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-test1-bank']],
              standalone: !0,
              features: [te],
              decls: 1,
              vars: 1,
              consts: [[3, 'words']],
              template: function (r, o) {
                1 & r && Y(0, 'lib-bank', 0),
                  2 & r && P('words', o.words);
              },
              dependencies: [Y8],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        Iq = (() => {
          class e {
            constructor() {
              this.words = K0;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-test1-quiz']],
              standalone: !0,
              features: [te],
              decls: 1,
              vars: 1,
              consts: [[3, 'words']],
              template: function (r, o) {
                1 & r && Y(0, 'lib-quiz', 0),
                  2 & r && P('words', o.words);
              },
              dependencies: [c4],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        Sq = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = ee({
              type: e,
              selectors: [['lib-fe-main']],
              standalone: !0,
              features: [te],
              decls: 1,
              vars: 0,
              template: function (r, o) {
                1 & r && Y(0, 'lib-root');
              },
              dependencies: [Cq],
              encapsulation: 2,
            }));
          }
          return e;
        })();
      const Mq = [
          { path: '', redirectTo: '/home', pathMatch: 'full' },
          { path: 'home', component: Dq },
          { path: 'grammar', component: Y0 },
          { path: 'grammar/:name', component: Y0 },
          {
            path: 'vocabulary',
            component: Eq,
            children: [
              {
                path: '',
                redirectTo: '/vocabulary/test1',
                pathMatch: 'full',
              },
              {
                path: 'test1',
                component: wq,
                children: [
                  {
                    path: '',
                    redirectTo: '/vocabulary/test1/bank',
                    pathMatch: 'full',
                  },
                  { path: 'bank', component: bq },
                  { path: 'quiz', component: Iq },
                ],
              },
            ],
          },
          { path: '**', redirectTo: '/home', pathMatch: 'full' },
        ],
        Nq = {
          providers: [
            (function hq(e, t) {
              return Oo([...lq(e, t), fq]);
            })({
              grammar: (function yq(e, ...t) {
                const n = new Map();
                for (const r of t)
                  for (const o of r.types) {
                    const i = n.get(o);
                    n.set(
                      o,
                      i ? (a, u) => r.reducer(i(a, u), u) : r.reducer,
                    );
                  }
                return function (r = e, o) {
                  const i = n.get(o.type);
                  return i ? i(r, o) : r;
                };
              })(
                {
                  tabs: [
                    {
                      name: 'present-simple',
                      label: 'Present Simple',
                      path: '/grammar/present-simple',
                      isDefault: !0,
                      content: '# Present Simple',
                    },
                    {
                      name: 'present-continuous',
                      label: 'Present Continuous',
                      path: '/grammar/present-continuous',
                      isDefault: !1,
                      content: '# Present Continuous',
                    },
                  ],
                },
                (function vq(...e) {
                  return {
                    reducer: e.pop(),
                    types: e.map(r => r.type),
                  };
                })(
                  (function v0(e, t) {
                    if (
                      (($a[e] = ($a[e] || 0) + 1),
                      'function' == typeof t)
                    )
                      return Pm(e, (...r) => ({
                        ...t(...r),
                        type: e,
                      }));
                    switch (t ? t._as : 'empty') {
                      case 'empty':
                        return Pm(e, () => ({ type: e }));
                      case 'props':
                        return Pm(e, r => ({ ...r, type: e }));
                      default:
                        throw new Error('Unexpected config.');
                    }
                  })('[English/Learning] Get Grammar'),
                  e => e,
                ),
              ),
            }),
          ],
        };
      (function R$(e, t) {
        return j2({ rootComponent: e, ...DS(t) });
      })(Sq, {
        providers: [
          (function r2(e) {
            const t = e?.ignoreChangesOutsideZone,
              n = qp({
                ngZoneFactory: () => {
                  const r = Wp(e);
                  return (
                    r.shouldCoalesceEventChangeDetection &&
                      _t('NgZone_CoalesceEvent'),
                    new ie(r)
                  );
                },
                ignoreChangesOutsideZone: t,
              });
            return Oo([
              { provide: n2, useValue: !0 },
              { provide: Ls, useValue: !1 },
              n,
            ]);
          })({ eventCoalescing: !0 }),
          (function Gz(e, ...t) {
            return Oo([
              { provide: Ul, multi: !0, useValue: e },
              [],
              { provide: Ar, useFactory: GM, deps: [nr] },
              { provide: Bc, multi: !0, useFactory: qM },
              t.map(n => n.ɵproviders),
            ]);
          })(
            Mq,
            (function Yz() {
              return Pn(6, [{ provide: Mi, useClass: mU }]);
            })(),
            (function Wz(e = {}) {
              return Pn(4, [
                {
                  provide: lm,
                  useFactory: () => {
                    const n = _(kB),
                      r = _(ie),
                      o = _(Bl),
                      i = _(xi);
                    return new zM(i, o, n, r, e);
                  },
                },
              ]);
            })({
              anchorScrolling: 'enabled',
              scrollPositionRestoration: 'enabled',
            }),
          ),
          ...Nq.providers,
        ],
      }).catch(e => {
        console.error(e);
      });
    },
    206: (Lt, ir, Xe) => {
      'use strict';
      const Vt = Xe(739),
        he = Xe(200),
        dt = Xe(897);
      Lt.exports = function ft(Se, ht) {
        switch (he(Se)) {
          case 'object':
            return (function Oe(Se, ht) {
              if ('function' == typeof ht) return ht(Se);
              if (ht || dt(Se)) {
                const I = new Se.constructor();
                for (let W in Se) I[W] = ft(Se[W], ht);
                return I;
              }
              return Se;
            })(Se, ht);
          case 'array':
            return (function F(Se, ht) {
              const I = new Se.constructor(Se.length);
              for (let W = 0; W < Se.length; W++)
                I[W] = ft(Se[W], ht);
              return I;
            })(Se, ht);
          default:
            return Vt(Se);
        }
      };
    },
    897: (Lt, ir, Xe) => {
      'use strict';
      var Vt = Xe(907);
      function he(dt) {
        return (
          !0 === Vt(dt) &&
          '[object Object]' === Object.prototype.toString.call(dt)
        );
      }
      Lt.exports = function (ft) {
        var Oe, F;
        return !(
          !1 === he(ft) ||
          ((Oe = ft.constructor), 'function' != typeof Oe) ||
          ((F = Oe.prototype), !1 === he(F)) ||
          !1 === F.hasOwnProperty('isPrototypeOf')
        );
      };
    },
    907: Lt => {
      'use strict';
      Lt.exports = function (Xe) {
        return (
          null != Xe &&
          'object' == typeof Xe &&
          !1 === Array.isArray(Xe)
        );
      };
    },
    200: Lt => {
      var ir = Object.prototype.toString;
      function Xe(I) {
        return 'function' == typeof I.constructor
          ? I.constructor.name
          : null;
      }
      Lt.exports = function (W) {
        if (void 0 === W) return 'undefined';
        if (null === W) return 'null';
        var Je = typeof W;
        if ('boolean' === Je) return 'boolean';
        if ('string' === Je) return 'string';
        if ('number' === Je) return 'number';
        if ('symbol' === Je) return 'symbol';
        if ('function' === Je)
          return (function Oe(I, W) {
            return 'GeneratorFunction' === Xe(I);
          })(W)
            ? 'generatorfunction'
            : 'function';
        if (
          (function Vt(I) {
            return Array.isArray
              ? Array.isArray(I)
              : I instanceof Array;
          })(W)
        )
          return 'array';
        if (
          (function ht(I) {
            return (
              !(
                !I.constructor ||
                'function' != typeof I.constructor.isBuffer
              ) && I.constructor.isBuffer(I)
            );
          })(W)
        )
          return 'buffer';
        if (
          (function Se(I) {
            try {
              if (
                'number' == typeof I.length &&
                'function' == typeof I.callee
              )
                return !0;
            } catch (W) {
              if (-1 !== W.message.indexOf('callee')) return !0;
            }
            return !1;
          })(W)
        )
          return 'arguments';
        if (
          (function dt(I) {
            return (
              I instanceof Date ||
              ('function' == typeof I.toDateString &&
                'function' == typeof I.getDate &&
                'function' == typeof I.setDate)
            );
          })(W)
        )
          return 'date';
        if (
          (function he(I) {
            return (
              I instanceof Error ||
              ('string' == typeof I.message &&
                I.constructor &&
                'number' == typeof I.constructor.stackTraceLimit)
            );
          })(W)
        )
          return 'error';
        if (
          (function ft(I) {
            return (
              I instanceof RegExp ||
              ('string' == typeof I.flags &&
                'boolean' == typeof I.ignoreCase &&
                'boolean' == typeof I.multiline &&
                'boolean' == typeof I.global)
            );
          })(W)
        )
          return 'regexp';
        switch (Xe(W)) {
          case 'Symbol':
            return 'symbol';
          case 'Promise':
            return 'promise';
          case 'WeakMap':
            return 'weakmap';
          case 'WeakSet':
            return 'weakset';
          case 'Map':
            return 'map';
          case 'Set':
            return 'set';
          case 'Int8Array':
            return 'int8array';
          case 'Uint8Array':
            return 'uint8array';
          case 'Uint8ClampedArray':
            return 'uint8clampedarray';
          case 'Int16Array':
            return 'int16array';
          case 'Uint16Array':
            return 'uint16array';
          case 'Int32Array':
            return 'int32array';
          case 'Uint32Array':
            return 'uint32array';
          case 'Float32Array':
            return 'float32array';
          case 'Float64Array':
            return 'float64array';
        }
        if (
          (function F(I) {
            return (
              'function' == typeof I.throw &&
              'function' == typeof I.return &&
              'function' == typeof I.next
            );
          })(W)
        )
          return 'generator';
        switch ((Je = ir.call(W))) {
          case '[object Object]':
            return 'object';
          case '[object Map Iterator]':
            return 'mapiterator';
          case '[object Set Iterator]':
            return 'setiterator';
          case '[object String Iterator]':
            return 'stringiterator';
          case '[object Array Iterator]':
            return 'arrayiterator';
        }
        return Je.slice(8, -1).toLowerCase().replace(/\s/g, '');
      };
    },
    739: (Lt, ir, Xe) => {
      'use strict';
      const Vt = Symbol.prototype.valueOf,
        he = Xe(200);
      Lt.exports = function dt(I, W) {
        switch (he(I)) {
          case 'array':
            return I.slice();
          case 'object':
            return Object.assign({}, I);
          case 'date':
            return new I.constructor(Number(I));
          case 'map':
            return new Map(I);
          case 'set':
            return new Set(I);
          case 'buffer':
            return (function Se(I) {
              const W = I.length,
                Je = Buffer.allocUnsafe
                  ? Buffer.allocUnsafe(W)
                  : Buffer.from(W);
              return I.copy(Je), Je;
            })(I);
          case 'symbol':
            return (function ht(I) {
              return Vt ? Object(Vt.call(I)) : {};
            })(I);
          case 'arraybuffer':
            return (function Oe(I) {
              const W = new I.constructor(I.byteLength);
              return new Uint8Array(W).set(new Uint8Array(I)), W;
            })(I);
          case 'float32array':
          case 'float64array':
          case 'int16array':
          case 'int32array':
          case 'int8array':
          case 'uint16array':
          case 'uint32array':
          case 'uint8clampedarray':
          case 'uint8array':
            return (function F(I, W) {
              return new I.constructor(
                I.buffer,
                I.byteOffset,
                I.length,
              );
            })(I);
          case 'regexp':
            return (function ft(I) {
              const W =
                  void 0 !== I.flags
                    ? I.flags
                    : /\w+$/.exec(I) || void 0,
                Je = new I.constructor(I.source, W);
              return (Je.lastIndex = I.lastIndex), Je;
            })(I);
          case 'error':
            return Object.create(I);
          default:
            return I;
        }
      };
    },
  },
  Lt => {
    Lt((Lt.s = 524));
  },
]);
