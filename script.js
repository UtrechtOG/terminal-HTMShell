const loader = document.getElementById('loader');
const output = document.getElementById('output');
const cmdText = document.getElementById('cmd-text');
const cursor = document.getElementById('cursor');

let terminalHistory = [];
let currentCommand = '';

// ASCII-Ladebalken
function showLoader(duration = 6000){
    const totalSteps = 50;
    let step = 0;
    const interval = duration / totalSteps;

    const loaderInterval = setInterval(()=>{
        let filled = '#'.repeat(step);
        let empty = '-'.repeat(totalSteps - step);
        loader.textContent = `[${filled}${empty}] ${Math.round((step/totalSteps)*100)}%`;
        step++;
        if(step > totalSteps){
            clearInterval(loaderInterval);
            loader.style.display = 'none';
            printLine("HTMShell bereit! Tippe $ help");
        }
    }, interval);
}

// Terminal-Ausgabe zeilenweise
function printLine(text){
    output.textContent += text + '\n';
    output.scrollTop = output.scrollHeight;
}

// Cursor blinkt
setInterval(()=>{
    cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
}, 500);

// Keypress Listener für "Terminal-Input"
document.addEventListener('keydown', (e)=>{
    if(e.key === "Backspace"){
        currentCommand = currentCommand.slice(0, -1);
    } else if(e.key === "Enter"){
        runCommand(currentCommand);
        currentCommand = '';
    } else if(e.key.length === 1){
        currentCommand += e.key;
    }
    cmdText.textContent = currentCommand;
});

function runCommand(cmd){
    terminalHistory.push(cmd);
    printLine(`$ ${cmd}`);
    switch(cmd){
        case 'help':
            printLine("Verfügbare Befehle: getnum, clear, stats, tiday, phosee, upd, upg, upd-&upg, revT");
            break;
        case 'clear':
            output.textContent = '';
            break;
        case 'tiday':
            printLine(new Date().toLocaleString());
            break;
        default:
            printLine("Befehl nicht erkannt. Tippe $ help");
    }
}

// Loader starten
showLoader();
