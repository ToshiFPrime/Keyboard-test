document.addEventListener('DOMContentLoaded', (event) => {
    const output = document.getElementById('output');
    const keys = document.querySelectorAll('.key');

    // Cargar el sonido
    const audio = new Audio('key-sound.mp3');

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        const keyCode = event.code;

        output.textContent = `Tecla presionada: ${keyName} (Código: ${keyCode})`;

        keys.forEach(key => {
            if (key.dataset.key === keyCode) {
                key.classList.add('pressed');
                key.classList.add('active');
                audio.currentTime = 0; // Rewind to the start
                audio.play(); // Play the sound
            }
        });
    });

    document.addEventListener('keyup', (event) => {
        const keyCode = event.code;

        keys.forEach(key => {
            if (key.dataset.key === keyCode) {
                key.classList.remove('pressed');
                key.classList.remove('active');
            }
        });
    });
});
