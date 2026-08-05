function logSSH(win) {
    let destIP = nodes[player.nodeStack.length-1].ip_address;
    let prevIP = nodes[player.nodeStack.length-2].ip_address;
    let stack = player.nodeStack;

    // log inbound connection
    let str = `${gameTimer.formatted()} - ssh inbound from ${prevIP}\n`
    nodes[stack.length-1].fileSystem.appendFile(
        nodes[stack.length-1].logFile, str
    );

    // log outbound connection
    str = `${gameTimer.formatted()} - ssh oubound to ${destIP}\n`
    nodes[stack.length-2].fileSystem.appendFile(
        nodes[stack.length-2].logFile, str
    );
}

function logSSHDisconnect(win) {
    let prevIP = nodes[player.nodeStack.length-1].ip_address;
    let destIP = nodes[player.nodeStack.length-2].ip_address;
    let stack = player.nodeStack;

    // remote computer
    let str = `${gameTimer.formatted()} - ${destIP} dropped connection\n`
    nodes[stack.length-1].fileSystem.appendFile(
        nodes[stack.length-1].logFile, str
    );
    
    // previous computer on stack
    str = `${gameTimer.formatted()} - disconnected from ${prevIP}\n`
    nodes[stack.length-2].fileSystem.appendFile(
        nodes[stack.length-2].logFile, str
    );
}