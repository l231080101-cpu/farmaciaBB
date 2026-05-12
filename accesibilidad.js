function toggleAccPanel() {
    const panel = document.getElementById('accessibility-panel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

function changeTextSize(val) {
    document.documentElement.style.fontSize = val + "%";
    document.getElementById('text-size-val').innerText = val + "%";
}

function toggleReadingGuide(active) {
    const line = document.getElementById('reading-line');
    if (active) {
        line.style.display = 'block';
        window.onmousemove = (e) => line.style.top = e.clientY + 'px';
    } else {
        line.style.display = 'none';
        window.onmousemove = null;
    }
}

// Narrador de Voz
let narratorActive = false;
function toggleNarrator(active) {
    narratorActive = active;
    if (active) {
        document.addEventListener('click', speakText);
        alert("Narrador activado. Haz clic en cualquier texto.");
    } else {
        document.removeEventListener('click', speakText);
        window.speechSynthesis.cancel();
    }
}

function speakText(e) {
    if (!narratorActive) return;
    const text = e.target.innerText || e.target.placeholder;
    if (text) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'es-ES';
        window.speechSynthesis.speak(msg);
    }
}
