var Cart = (function () {
  'use strict';
  var KEY = 'beachside_cart';

  function _load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }

  function _save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    _badges(items);
  }

  function _badges(items) {
    var n = (items || _load()).reduce(function (s, i) { return s + i.qty; }, 0);
    document.querySelectorAll('.nav-cart-badge').forEach(function (el) {
      el.textContent = n;
      el.style.display = n > 0 ? 'flex' : 'none';
    });
  }

  function add(id, name, price) {
    var items = _load();
    var hit = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) { hit = items[i]; break; }
    }
    if (hit) { hit.qty++; } else { items.push({ id: id, name: name, price: price, qty: 1 }); }
    _save(items);
    _toast(name);
  }

  function remove(id) {
    _save(_load().filter(function (i) { return i.id !== id; }));
  }

  function setQty(id, qty) {
    var items = _load();
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        if (qty < 1) { items.splice(i, 1); } else { items[i].qty = qty; }
        break;
      }
    }
    _save(items);
  }

  function getItems() { return _load(); }

  function getTotal() {
    return _load().reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  }

  function clear() {
    localStorage.removeItem(KEY);
    _badges([]);
  }

  function _toast(name) {
    var el = document.getElementById('cart-toast');
    if (el) { clearTimeout(el._t); el.remove(); }
    el = document.createElement('div');
    el.id = 'cart-toast';
    el.innerHTML = '✓ ' + name + ' lagt i kurv &nbsp;<a href="checkout.html">Se handlekurv →</a>';
    document.body.appendChild(el);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.add('show'); });
    });
    el._t = setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () { if (el.parentNode) el.remove(); }, 400);
    }, 3000);
  }

  document.addEventListener('DOMContentLoaded', function () { _badges(); });

  return { add: add, remove: remove, setQty: setQty, getItems: getItems, getTotal: getTotal, clear: clear };
}());
