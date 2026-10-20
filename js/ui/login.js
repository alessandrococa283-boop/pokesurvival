/* ============ login.js — inicio: entrar, crear cuenta o invitado ============ */
G.LoginUI = (() => {
  const $ = G.UI.$;
  let mode = 'login';

  function init() {
    document.querySelectorAll('#scr-login .tab').forEach(t => {
      t.onclick = () => setMode(t.dataset.tab);
    });
    setMode(mode);
    $('login-form').onsubmit = async e => {
      e.preventDefault();
      $('login-err').textContent = '';
      $('btn-auth').disabled = true;
      let r;
      try {
        r = mode === 'login'
          ? await G.DB.login($('f-email').value, $('f-pass').value)
          : await G.DB.register($('f-email').value, $('f-pass').value, $('f-name').value);
      } catch (error) {
        $('login-err').textContent = 'No se pudo completar el acceso: ' + (error.message || error);
        return;
      } finally { $('btn-auth').disabled = false; }
      if (!r.ok) { $('login-err').textContent = r.error; return; }
      $('forgot-note').classList.add('hidden');
      $('f-pass').value = '';
      G.Flow.afterLogin();
    };
    $('btn-guest').onclick = () => { G.DB.playAsGuest(); G.Flow.afterLogin(); };
    $('f-forgot').onclick = async e => {
      e.preventDefault();
      if (mode !== 'login') setMode('login');
      $('login-err').textContent = '';
      $('forgot-note').classList.remove('hidden');
      $('forgot-note').textContent = 'Enviando enlace de recuperación…';
      const r = await G.DB.resetPassword($('f-email').value);
      $('forgot-note').textContent = r.ok ? r.message : r.error;
    };
    // Vincular Gmail para poder recuperar la cuenta (ver offerRecovery).
    $('rec-link').onclick = async () => {
      $('rec-err').textContent = '';
      $('rec-link').disabled = true;
      const r = await G.DB.linkGoogle();
      $('rec-link').disabled = false;
      if (!r.ok) { $('rec-err').textContent = r.error; return; }
      $('scr-recover').classList.add('hidden');
      G.UI.toast('¡Gmail vinculado! Si olvidas la contraseña, entra con Google.', 4500);
    };
    $('rec-later').onclick = () => $('scr-recover').classList.add('hidden');
    $('rec-never').onclick = () => {
      try { localStorage.setItem('ps.recover.no.' + G.DB.fb.uid, '1'); } catch (e) { /* nada */ }
      $('scr-recover').classList.add('hidden');
    };
    $('btn-google').onclick = async () => {
      $('login-err').textContent = '';
      $('btn-google').disabled = true;
      let r;
      try { r = await G.DB.loginWithGoogle(); }
      catch (error) {
        $('login-err').textContent = 'No se pudo iniciar sesión con Google: ' + (error.message || error);
        return;
      } finally { $('btn-google').disabled = false; }
      if (!r.ok) { $('login-err').textContent = r.error; return; }
      G.Flow.afterLogin();
    };
  }

  /**
   * Al entrar en una cuenta antigua de nombre y contraseña, si aún no
   * hay Gmail vinculado: "¿te da miedo perder tu cuenta?". Una vez por sesión,
   * hasta que lo vincule o diga que no le vuelvan a preguntar.
   */
  let offered = false;
  function offerRecovery() {
    if (offered || G.DB.mode !== 'cloud' || !G.DB.fb || !G.DB.nameAccount || G.DB.hasGoogle) return;
    try { if (localStorage.getItem('ps.recover.no.' + G.DB.fb.uid)) return; } catch (e) { /* nada */ }
    offered = true;
    $('rec-err').textContent = '';
    $('scr-recover').classList.remove('hidden');
  }

  /** Explica dónde se guarda la partida según el modo de la base de datos. */
  function modeNote() {
    if (G.DB.mode === 'cloud') return 'Tu partida se guarda en la nube: entra desde cualquier ordenador. Como invitado no se guarda.';
    const why = G.DB.localReason === 'file'
      ? 'Abierto desde un archivo: la partida sólo se guarda en este navegador. Para guardar en la nube, juega en la versión publicada.'
      : G.DB.localReason === 'host'
        ? 'Abierto fuera del sitio de PokéSurvival: la partida sólo se guarda en este navegador. Usa proyecto-pokemon2.web.app para sincronizar.'
      : G.DB.localReason === 'config'
        ? 'Nube sin configurar: la partida sólo se guarda en este navegador.'
        : 'No se pudo conectar con la nube: la partida sólo se guarda en este navegador.';
    return why;
  }

  function setMode(m) {
    mode = m;
    document.querySelectorAll('#scr-login .tab').forEach(t => t.classList.toggle('on', t.dataset.tab === m));
    $('btn-auth').textContent = m === 'login' ? 'Entrar' : 'Crear cuenta';
    $('f-name-wrap').classList.toggle('hidden', m !== 'register');
    $('legacy-login-note').classList.toggle('hidden', m !== 'login');
    $('f-name').required = m === 'register';
    $('f-pass').autocomplete = m === 'login' ? 'current-password' : 'new-password';
    $('forgot-note').classList.add('hidden');
    $('login-err').textContent = '';
  }

  function open() {
    G.UI.chrome(false);
    G.UI.show('scr-login');
    if (!G.DB.storageOk) $('login-err').textContent = 'Este navegador no deja guardar datos: juega como invitado.';
    $('btn-google').classList.toggle('hidden', G.DB.mode !== 'cloud');
    $('login-mode').textContent = modeNote();
    setTimeout(() => $('f-email').focus(), 50);
  }

  return { init, open, offerRecovery };
})();
