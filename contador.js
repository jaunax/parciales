// Contador de visitas casero (Abacus, sin cuenta). No guarda nada de la persona:
// solo suma contadores. Los dispositivos que abrieron stats.html no cuentan.
(function () {
  var NS = 'apm-parciales-4q8z';
  var API = 'https://abacus.jasoncameron.dev/hit/' + NS + '/';
  try {
    if (localStorage.getItem('apm_owner') === '1') return;
    var d = new Date();
    var hoy = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    var hit = function (k) { fetch(API + k, { mode: 'cors' }).catch(function () {}); };
    hit('visitas-total');
    hit('visitas-' + hoy);
    if (!localStorage.getItem('apm_vid')) {
      localStorage.setItem('apm_vid', '1');
      hit('unicos-total');
      hit(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'dev-movil' : 'dev-pc');
    }
    if (localStorage.getItem('apm_dia') !== hoy) {
      localStorage.setItem('apm_dia', hoy);
      hit('unicos-' + hoy);
    }
  } catch (e) {}
})();
