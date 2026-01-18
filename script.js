const loader = document.getElementById('loader');
const output = document.getElementById('output');
const cmdInput = document.getElementById('cmd-input');

let terminalHistory = [];

// ASCII-Ladebalken Animation (6 Sekunden)
function showLoader(duration = 6000) {
    const totalSteps = 50;
    let step = 0;
    const interval = duration / totalSteps;

    const loaderInterval = setInterval(() => {
        let filled = '#'.repeat(step);
        let empty = '-'.repeat(totalSteps - step);
        loader.textContent = `[${filled}${empty}] ${Math.round((step/totalSteps)*100)}%`;
        step++;
        if(step > totalSteps) {
            clearInterval(loaderInterval);
            loader.style.display = 'none'; // Loader weg
            output.textContent += "HTMShell bereit! Tippe $ help\n";
            cmdInput.focus();
        }
    }, interval);
}

// Terminal Input Event
cmdInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        const cmd = cmdInput.value.trim();
        handleCommand(cmd);
        cmdInput.value = '';
    }
});

// Command Handler
function handleCommand(cmd) {
    terminalHistory.push(cmd);
    output.textContent += `$ ${cmd}\n`;

    switch(cmd) {
        case 'help':
            output.textContent += "Verfügbare Befehle: getnum, clear, stats, tiday, phosee, upd, upg, upd-&upg, revT\n";
            break;
        case 'clear':
            output.textContent = '';
            break;
        case 'tiday':
            output.textContent += new Date().toLocaleString() + '\n';
            break;
        default:
            output.textContent += "Befehl nicht erkannt. Tippe $ help\n";
    }

    // Scroll automatisch nach unten
    output.scrollTop = output.scrollHeight;
}

// Starte Loader
showLoader();
