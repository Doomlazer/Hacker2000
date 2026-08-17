function logSSH(win) {
    let stack = player.nodeStack;
    let destNode = nodes[stack[stack.length-1]];
    let prevNode = nodes[stack[stack.length-2]];
    console.log(destNode)
    console.log(prevNode)
    let destIP = destNode.ip_address;
    let prevIP = prevNode.ip_address;

    // log inbound connection
    let str = `${destNode.id} ${destIP} ${gameTimer.formatted()} - ssh inbound from ${prevIP}\n`
    destNode.fileSystem.appendFile(
        destNode.logFile, str
    );

    // log outbound connection
    str = `${prevNode.id} ${prevIP} ${gameTimer.formatted()} - ssh oubound to ${destIP}\n`
    prevNode.fileSystem.appendFile(
        prevNode.logFile, str
    );
    destNode.fileSystem.save();
}

function logSSHDisconnect(win) {
    let stack = player.nodeStack;
    let prevNode = nodes[stack[stack.length-1]];
    let destNode = nodes[stack[stack.length-2]];
    let prevIP = prevNode.ip_address;
    let destIP = destNode.ip_address;

    // remote computer
    let str = `${gameTimer.formatted()} - ${destIP} dropped connection\n`
    prevNode.fileSystem.appendFile(
        prevNode.logFile, str
    );
    
    // previous computer on stack
    str = `${gameTimer.formatted()} - disconnected from ${prevIP}\n`
    destNode.fileSystem.appendFile(
        destNode.logFile, str
    );
    destNode.fileSystem.save();
}