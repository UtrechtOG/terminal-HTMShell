const loader = document.getElementById('loader');
const output = document.getElementById('output');
const cmdText = document.getElementById('cmd-text');
const cursor = document.getElementById('cursor');

let terminalHistory = [];
let currentCommand = [];

function showLoader(duration=6000){
    const steps = 50;
    let step=0;
    const interval = duration/steps;
    const loaderInterval = setInterval(()=>{
        let filled="#".repeat(step);
        let empty="-".repeat(steps-step);
        loader.textContent=`[${filled}${empty}] ${Math.round((step/steps)*100)}%`;
        step++;
        if(step>steps){
            clearInterval(loaderInterval);
            loader.style.display='none';
            printLine("HTMShell ready! Type $ help");
        }
    }, interval);
}

function printLine(text){
    output.textContent += text+"\n";
    output.scrollTop = output.scrollHeight;
}

function clearOutput(){
    output.textContent="";
}

const ctx = {
    printLine,
    clearOutput
};

setInterval(()=>{
    cursor.style.visibility = cursor.style.visibility==='hidden'?'visible':'hidden';
},500);

document.addEventListener('keydown',(e)=>{
    if(e.key==='Backspace'){
        currentCommand.pop();
    } else if(e.key==='Enter'){
        const cmd=currentCommand.join('');
        runCommand(cmd);
        currentCommand=[];
    } else if(e.key.length===1){
        currentCommand.push(e.key);
    }
    cmdText.textContent=currentCommand.join('');
});

function runCommand(cmd){
    terminalHistory.push(cmd);
    printLine(`$ ${cmd}`);
    if(cmd in Command){
        Command[cmd](ctx);
    } else {
        printLine("Command not recognized. Type $ help");
    }
}

showLoader();
