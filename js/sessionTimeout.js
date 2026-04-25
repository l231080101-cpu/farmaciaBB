// js/sessionTimeout.js - Cierre de sesión automático por inactividad
(function() {
    // ⏱️ Tiempo de inactividad en milisegundos (3 minutos = 180000 ms)
    const TIEMPO_INACTIVIDAD = 3 * 60 * 1000;
    let temporizador;

    // Función que fuerza el cierre de sesión y redirige al login
    async function cerrarSesion() {
        // Si el cliente de Supabase (dbClient) existe, cerramos sesión limpiamente
        if (typeof dbClient !== 'undefined' && dbClient.auth) {
            try {
                await dbClient.auth.signOut();
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            }
        }
        // Limpiamos cualquier dato local (carrito, preferencias, etc.)
        localStorage.clear();
        // Redirigimos al login
        window.location.href = 'login.html';
    }

    // Reinicia el temporizador con cada actividad del usuario
    function reiniciarTemporizador() {
        clearTimeout(temporizador);
        temporizador = setTimeout(cerrarSesion, TIEMPO_INACTIVIDAD);
    }

    // Eventos que indican que el usuario está activo
    const eventosActividad = [
        'mousemove',
        'keydown',
        'click',
        'scroll',
        'touchstart',
        'touchmove',
    ];

    // Registramos listeners para cada evento
    eventosActividad.forEach(evento => {
        window.addEventListener(evento, reiniciarTemporizador, { passive: true });
    });

    // Iniciamos el temporizador por primera vez al cargar la página
    reiniciarTemporizador();

    console.log('⏳ Protección por inactividad activada (' + (TIEMPO_INACTIVIDAD/1000) + 's)');
})();
