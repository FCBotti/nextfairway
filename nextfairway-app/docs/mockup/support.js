/* Minimaler Laufzeit-Ersatz, damit die Mockup-Dateien lokal im Browser laufen.
   Nur zur Ansicht und als Referenz fuer Claude Code - nicht Teil der echten App. */
(function () {
  var fonts = [
    ['Archivo Black', 'archivo-black-latin-400-normal', 400],
    ['Barlow', 'barlow-latin-400-normal', 400], ['Barlow', 'barlow-latin-500-normal', 500],
    ['Barlow', 'barlow-latin-600-normal', 600], ['Barlow', 'barlow-latin-700-normal', 700],
    ['Barlow Condensed', 'barlow-condensed-latin-300-normal', 300],
    ['Barlow Condensed', 'barlow-condensed-latin-400-normal', 400],
    ['Barlow Condensed', 'barlow-condensed-latin-600-normal', 600]
  ];
  var css = fonts.map(function (f) {
    return "@font-face{font-family:'" + f[0] + "';src:url(fonts/" + f[1] + ".woff2) format('woff2');font-weight:" + f[2] + ";font-display:block}";
  }).join('');
  document.head.insertAdjacentHTML('beforeend', '<style>' + css + '</style>');

  window.DCLogic = function (props) { this.props = props || {}; this.state = {}; };
  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  function get(scope, path) { return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, scope); }
  function val(scope, expr) { expr = expr.trim(); if (expr === 'true') return true; if (expr === 'false') return false; return get(scope, expr); }
  function fill(str, scope) { return str.replace(HOLE, function (_, e) { var v = val(scope, e); return v == null ? '' : v; }); }
  function kids(n) { return Array.prototype.slice.call(n.childNodes); }

  function renderNode(node, scope) {
    if (node.nodeType === 3) { if (node.data.indexOf('{{') >= 0) node.data = fill(node.data, scope); return [node]; }
    if (node.nodeType !== 1) return [node];
    var tag = node.tagName.toLowerCase();
    if (tag === 'sc-for') {
      var list = val(scope, (node.getAttribute('list') || '').replace(/[{}]/g, '')) || [];
      var as = node.getAttribute('as') || 'item', out = [];
      list.forEach(function (item) {
        var s = Object.assign({}, scope); s[as] = item;
        kids(node).forEach(function (c) { out = out.concat(renderNode(c.cloneNode(true), s)); });
      });
      return out;
    }
    if (tag === 'sc-if') {
      if (!val(scope, (node.getAttribute('value') || '').replace(/[{}]/g, ''))) return [];
      var o2 = [];
      kids(node).forEach(function (c) { o2 = o2.concat(renderNode(c.cloneNode(true), scope)); });
      return o2;
    }
    Array.prototype.slice.call(node.attributes).forEach(function (a) {
      if (a.name.indexOf('hint-') === 0) { node.removeAttribute(a.name); return; }
      var m = /^\{\{\s*([^}]+?)\s*\}\}$/.exec(a.value);
      if (m) {
        var v = val(scope, m[1]);
        if (a.name.indexOf('on') === 0) {
          node.removeAttribute(a.name);
          if (typeof v === 'function') {
            if (a.name === 'onchange') { node.addEventListener('input', v); } else { node.addEventListener(a.name.slice(2), v); }
          }
          return;
        }
        if (a.name === 'checked' || a.name === 'disabled') { node.removeAttribute(a.name); node[a.name] = !!v; return; }
        if (a.name === 'value') node.value = v == null ? '' : v;
        node.setAttribute(a.name, v == null ? '' : String(v));
      } else if (a.value.indexOf('{{') >= 0) {
        node.setAttribute(a.name, fill(a.value, scope));
      }
    });
    kids(node).forEach(function (c) {
      var r = renderNode(c, scope);
      if (r.length !== 1 || r[0] !== c) { r.forEach(function (n) { node.insertBefore(n, c); }); node.removeChild(c); }
    });
    return [node];
  }

  document.addEventListener('DOMContentLoaded', function () {
    var host = document.querySelector('x-dc'); if (!host) return;
    var helmet = host.querySelector('helmet');
    if (helmet) { Array.prototype.slice.call(helmet.children).forEach(function (c) { document.head.appendChild(c); }); helmet.remove(); }
    var tpl = host.innerHTML, sc = document.querySelector('script[data-dc-script]'), props = {};
    try {
      var defs = JSON.parse(sc.getAttribute('data-props') || '{}');
      Object.keys(defs).forEach(function (k) { if (defs[k] && typeof defs[k] === 'object' && 'default' in defs[k]) props[k] = defs[k].default; });
    } catch (e) {}
    var Comp = new Function('DCLogic', sc.textContent + '\n;return Component;')(window.DCLogic);
    var comp = new Comp(props); if (!comp.props) comp.props = props; if (!comp.state) comp.state = {};
    var focusId = null;
    function draw() {
      var active = document.activeElement; focusId = active && active.id ? active.id : null;
      var root = document.createElement('div'); root.innerHTML = tpl;
      var vals = comp.renderVals ? comp.renderVals() : {}, nodes = [];
      kids(root).forEach(function (c) { nodes = nodes.concat(renderNode(c, vals)); });
      host.innerHTML = ''; nodes.forEach(function (n) { host.appendChild(n); });
      if (focusId) { var el = document.getElementById(focusId); if (el) { el.focus(); if (el.setSelectionRange && el.value) { try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) {} } } }
    }
    comp.setState = function (p) { Object.assign(comp.state, typeof p === 'function' ? p(comp.state) : p); draw(); };
    draw();
  });
})();
