const Command = {
    help: function(ctx){
        ctx.printLine("Available commands: getnum, clear, stats, tiday, phosee, upd, upg, upd-&upg, revT");
    },
    clear: function(ctx){
        ctx.clearOutput();
    },
    tiday: function(ctx){
        ctx.printLine(new Date().toLocaleString());
    },
    getnum: function(ctx){
        ctx.printLine("Generating 100,000 numbers...");
        
        for(let i=0;i<5;i++){
            const rand = Math.floor(Math.random()*10000000).toString().padStart(8,'0');
            ctx.printLine(`https://wa.me/+49151${rand}`);
        }
    },
    stats: function(ctx){
        ctx.printLine("Statistics of last command:");
        ctx.printLine("Time: "+new Date().toLocaleString());
        ctx.printLine("Duration: 2s (simulated)");
        ctx.printLine("Generated links: 100,000 (simulated)");
    },
    phosee: function(ctx){
        ctx.printLine("Device info:");
        ctx.printLine(`UserAgent: ${navigator.userAgent}`);
        ctx.printLine(`Screen: ${screen.width}x${screen.height}`);
        ctx.printLine(`Language: ${navigator.language}`);
    },
    upd: function(ctx){
        ctx.printLine("Updating HTMShell... (simulated)");
    },
    upg: function(ctx){
        ctx.printLine("Upgrading HTMShell... (simulated)");
    },
    "upd-&upg": function(ctx){
        ctx.printLine("Updating & Upgrading HTMShell... (simulated)");
    },
    revT: function(ctx){
        ctx.printLine("Restoring last cleared output... (simulated)");
    }
};
