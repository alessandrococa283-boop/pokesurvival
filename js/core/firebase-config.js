/* ============ firebase-config.js — conexión con tu proyecto de Firebase ============
 * Pega aquí la configuración de tu app web de Firebase (Consola de Firebase >
 * Configuración del proyecto > Tus apps > SDK setup and configuration > Config).
 * Los pasos completos están en docs/FIREBASE.md.
 *
 * Estos datos NO son secretos: Firebase los diseña para ir en la web. Lo que
 * protege las partidas son las reglas de Firestore (firestore.rules).
 *
 * Si se pone a null, el juego funciona en modo local (sólo en el navegador).
 */
// Proyecto independiente PokéSurvival. Mantén el plan gratuito y no actives
// Identity Platform ni servicios de pago.
G.FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBfDZHuwZaDA7QLaQxHnJZiDurWLdzRAEs',
  authDomain: 'proyecto-pokemon2.firebaseapp.com',
  projectId: 'proyecto-pokemon2',
  storageBucket: 'proyecto-pokemon2.firebasestorage.app',
  messagingSenderId: '1031182025569',
  appId: '1:1031182025569:web:cefa83e5556b4c1a22fb20',
  measurementId: 'G-MC1DC39TY2',
  databaseURL: 'https://proyecto-pokemon2-default-rtdb.firebaseio.com'
};

/* Ejemplo de cómo debe quedar:
G.FIREBASE_CONFIG = {
  apiKey: 'AIza...',
  authDomain: 'tu-proyecto.firebaseapp.com',
  projectId: 'tu-proyecto',
  storageBucket: 'tu-proyecto.firebasestorage.app',
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:abc123'
};
*/
