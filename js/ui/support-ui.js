G.SupportUI = (() => {
  const $ = G.UI.$;

  function init() {
    $('support-close').onclick = close;
    $('support-donate').href = G.Funding.url;
  }

  function open() {
    G.UI.show('scr-support', true);
  }

  function close() {
    G.UI.hide('scr-support');
    G.MenuUI.open();
  }

  return { init, open, close };
})();
