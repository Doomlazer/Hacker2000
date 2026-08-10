class aniRect {
    constructor(x, y, width, height) {
        this.node = [];
        //this.glowEffect = true;
        //this.glowEffectWidth = 10;
        this.alpha = 0.75;
        this.isRounded = true;
        this.cornerRad = 20;
        this.rectLineWidth = 1;
        this.hasBoarder = true;
        this.boarderWidth = width/40;
        this.boarderHeight = height/40;
        this.boarderLineWidth = 5;
        this.toOpen = true;
        this.delete = false;
        this.aniSpeed = 30.1;
        this.ease = 0.075;
        this.mouseDrag = false;
        this.x1 = x; // start
        this.y1 = y;
        this.xP = 0; // progress
        this.yP = 0;
        this.xW = width; // max
        this.yH = height;
        this.rectColor = '#28d406';
        this.textColor = '#28d406';
        this.fontSize = 18;
        this.textFont = "Courier New"; // "Hyperspace";
        this.opaqueBackground = true;
        this.backgroundColor = '#060606';
        this.textLines = []
        this.textMaxLines = 0;
        this.admins = [];
        this.approvedComands = ["reg"];
        this.displayLines = [];
        this.textDisplayChar = 0;
        this.typingEffect = true;
        this.date = "07/18/2026:19:37"
        this.locNum = cast.length;
        this.inputStr = "";
        this.acceptInput = true;
        this.lastInput = "";
        this.proxyWindow = [];
        this.type = "none";
        this.wheelOff = 0; // scroll wheel offset
        this.text = "";
        this.authTries = 0;
        this.pri = cast.length; // draw priority
        // map defaults
        this.drawMap = true
        this.mapHasBoarder = true;
        this.mapLineWidth = 1;
        this.mapBoarderLineWidth = 2;
        this.mapBoarderColor = '#00ba00';
        this.mapdefaultColor = '#FFFFFF';
        this.mapSelCountryColor = '#FF9900'
        // proxy defaults
        this.proxyFontSize = 12;
        this.proxyText = "Proxy List:\n"
        this.proxyBackgroundColor = '#3d0240'
        this.proxyRectColor = '#ec32f6'
        this.proxyTextColor = '#db96de'
        this.proxyIsRounded = false;
        this.proxyHasBoarder = false;
        this.pX1 = getWidth()/25 * 10.2;
        this.pY1 = getHeight()/8;
        this.pXW = getWidth()/6;
        this.pYH = getHeight()/1.5;
        // reader defaults
        this.readerFontSize = 16;
        this.readerText = "Proxy List:\n"
        this.readerBackgroundColor = '#180377'
        this.readerRectColor = '#152272'
        this.readerTextColor = '#bad606'
        this.readerIsRounded = false;
        this.readerHasBoarder = true;
        this.rX1 = getWidth()/25 * 10.5;
        this.rY1 = getHeight()/8;
        this.rXW = getWidth()/2.5;
        this.rYH = getHeight()/1.5;
        // audio player defaults
        this.audioFontSize = 12;
        this.audioText = ""
        this.audioBackgroundColor = '#390ed2'
        this.audioRectColor = '#3952f7'
        this.audioTextColor = '#f7faf8'
        this.audioIsRounded = false;
        this.audioHasBoarder = false;
        this.aX1 = getWidth()/25 * 11;
        this.aY1 = getHeight()/8;
        this.aXW = getWidth()/5;
        this.aYH = getHeight()/5;
        this.songScrollOffset = 0;
        this.songScrollSpeed = 1;
    }

    setText(theText, prompt = true) {

        if (player.t2s) {
            speak(theText);
        }
        
        // Set font and text color
        ctx.fillStyle = this.textColor;
        ctx.font = this.fontSize + "px " + this.textFont;

        // set max lines
        this.textMaxLines = Math.floor(this.yH / (this.fontSize * 1.25));

        // wrap text
        let wrapped = this.textWrapLines(ctx, theText, this.xW - this.fontSize, 0);
        for (const line of wrapped) {
            this.displayLines.push(line);
        }
        
        // add the input prompt
        if (prompt) {
            this.displayLines.push(this.promptChar);
        }

        // why not scroll instead?
        /*/console.log(this.displayLines.length)
        if (player.sendToReaderThreshold < this.displayLines.length) {
            let rw = new aniRect(this.rX1, this.rY1, this.rXW, this.rYH);
            //console.log("2nf " + cast[cast.length-1]);
            rw.fontSize = this.readerFontSize;
            rw.acceptInput = false;
            rw.backgroundColor = this.readerBackgroundColor;
            rw.rectColor = this.readerRectColor;
            rw.textColor = this.readerTextColor
            rw.isRounded = this.readerIsRounded;
            rw.hasBoarder = this.readerHasBoarder;
            rw.type = "reader";
            cast.push(rw);
            player.readerWindow.push(rw);
            rw.setText((this.displayLines + theText), false);
            //win.setText("Opening...");
        }*/
    }

    clickHandler(e) {
        //console.log(`clicked on ${this} e.details: ${e.detail}`);
        if (e.detail > 1 && mouseUnclaimed) {
            mouseUnclaimed = false;
            this.toOpen = false;
            this.delete = true;
        }
    }

    keyHandler(e) {
        if (e.key == "Enter") {
            // execute entered string
            this.lastInput = this.inputStr;
            console.log("Enter: " + this.inputStr);
            commandHandler(this);

        } else if (e.key == "ArrowUp") {
            // redo last command 
            this.inputStr = this.lastInput;

            ctx.font = this.fontSize + "px " + this.textFont;
            let wrapped = this.textWrapLines(ctx, this.inputStr, this.xW - this.fontSize, 0);
            for (let i = 0; i < wrapped.length; i++) {
                if (i == 0) {
                    // keep promptChar
                    this.displayLines[this.displayLines.length-1] = this.promptChar + wrapped[i];
                } else {
                    this.displayLines.push(wrapped[i]);
                }
            }

        } else if (e.key == "ArrowDown") {
            // immediately finish typing effect
            this.textDisplayChar = 0;

        } else if (e.key == "Backspace") {
            if (this.inputStr.length > 0) {
                // command holder
                this.inputStr = this.inputStr.substring(0, this.inputStr.length - 1);

                // and displayed text
                let l = this.displayLines[this.displayLines.length-1];
                if (l.length > 0) {
                    // erase from last line
                    this.displayLines[this.displayLines.length-1] = l.substring(0, l.length-1);
                } else {
                    // or pop empty line and erase from prev
                    this.displayLines.pop();
                    l = this.displayLines[this.displayLines.length-1]
                    l = l.substring(0, l.length-1);
                }
            }

        } else {
            if (e.key != "Control" &&
                e.key != "Meta" &&
                e.key != "Shift" &&
                e.key != "ArrowLeft" &&
                e.key != "ArrowRight") {
                // add character to input    
                this.inputStr += e.key;
                this.displayLines[this.displayLines.length-1] += e.key;
                // wrap if needed
                let maxWidth = this.xW - this.fontSize;
                ctx.font = this.fontSize + "px " + this.textFont;
                let width = (ctx.measureText(this.displayLines[this.displayLines.length-1]).width);
                if (width > maxWidth) {
                    if (this.displayLines[this.displayLines.length-1].split(" ").length > 1) {
                        // the command has a space
                        const lastIndex = this.displayLines[this.displayLines.length-1].lastIndexOf(" ");
                        const before = this.displayLines[this.displayLines.length-1].slice(0, lastIndex);
                        const after = this.displayLines[this.displayLines.length-1].split(" ");
                        this.displayLines[this.displayLines.length-1] = before;
                        this.displayLines.push(after[after.length-1]);
                    } else {
                        // no space in command break the line
                        let l = this.displayLines[this.displayLines.length-1];
                        this.displayLines[this.displayLines.length-1] = l.substring(0, l.length-1);
                        this.displayLines.push(l.substring(l.length));
                    }
                }
            }
        }
    }

    contains(x, y) {
        //console.log(`x: ${x} y: ${y} this.x: ${this.x1} this.y: ${this.y1}`)
        return this.x1 <= x && x <= this.x1 + this.xW &&
               this.y1 <= y && y <= this.y1 + this.yH;
    }

    setProxyText() {
        let text = this.proxyText;
        for (let i = 0; i < player.nodeStack.length; i++) {
            let str = nodes[player.nodeStack[i]].ip_address + 
            " " +  nodes[player.nodeStack[i]].country + "\n";
            // expand width working?
            if (ctx.measureText(str) > player.proxyWindow[0].xW) {
                player.proxyWindow[0].xW = ctx.measureText(str);
            }
            text += str;
        }

        player.proxyWindow[0].displayLines = [];
        player.proxyWindow[0].text = text;
        player.proxyWindow[0].setText(text, false);
    }
    
    openedState() {
        // initial text if needed
        if (this.displayLines.length == 0) {
            this.inputStr = "";
            this.setText(this.text);
        }

        // Set font and text color
        ctx.fillStyle = this.textColor;
        ctx.font = this.fontSize + "px " + this.textFont;

        // remove overflow lines, but don't crop scrolling windows
        if (this.type != "proxy" && this.type != "reader") {
            while (this.displayLines.length > this.textMaxLines) {
                this.displayLines.shift();
            }
        }
        
        // draw the text
        if (this.type == "audio") {
            // special handling 

        } else {
            // non-audio window text
            if (this.wheelOff > this.displayLines.length - this.textMaxLines) {
                this.wheelOff = this.displayLines.length - this.textMaxLines;
            }
            if (this.wheelOff < 0) {
                this.wheelOff = 0;
            }
            let max;
            if (this.textMaxLines < this.displayLines.length) {
                max = this.textMaxLines
            } else {
                max = this.displayLines.length;
            }
            for (let i = this.wheelOff; i <  this.displayLines.length; i++) {
                if (i - this.wheelOff < this.textMaxLines) {
                ctx.fillText(this.displayLines[i], this.x1 + this.fontSize/2, 
                            this.y1 + (this.fontSize) + (this.fontSize * 1.25 * (i-this.wheelOff)));
                }
            }
        }
    }

    closedState() {
        if (cast.indexOf(this) == 0) {
            // always reopen player's computer win
             this.toOpen = true;
             this.delete = false;
             this.xW = getWidth()/2;
             this.yH = getHeight()/2;
             this.xP = 1;
             this.yP = 1;
        } else if (this.delete) {
            // flush it
            const index = cast.indexOf(this);
            if (index > -1) cast.splice(index, 1);

            if (this.type == "proxy") {
                //console.log(`player.proxyWindow: ${player.proxyWindow}`);
                if (this == player.proxyWindow[0]) {
                    player.proxyWindow.pop();
                }
            } else if (this.type = "audio") {
                player.audioPlayer = 0;
            } else if (this.type = "reader") {
                //console.log(`player.readerWindow: ${player.readerWindow}`);
                if (this == player.readerWindow[0]) {
                    player.readerWindow.pop();
                }
            }
        }
    }

    textWrapLines(ctx, text, maxWidth, tabAsSpace) {
        const newLine = String.raw`\n`;
        const tab = String.raw`\t`;
        var lines = [];
        var paragraphs = text.split(newLine);
        var paragraphs = text.split('\n');

        for (var p = 0; p < paragraphs.length; p++) {
          var currentLine = [];  
          var words = paragraphs[p].split(" ");

          for (var i = 0; i < words.length; i++) {
            var phrase = words[i].split(tab);
            var word = "";

            if (phrase.length > 1) {
              for (var x = 0; x < phrase.length; x++) {
                if (phrase[x].length < 1) {
                  if (tabAsSpace == 1) {
                    word += "  ";
                  } else {
                    word += tab;
                  }
                } else {
                  word += phrase[x];
                }
              }
            } else {
              word += phrase;
            }

            var width = (ctx.measureText(currentLine + " " + word).width);
            if (width < maxWidth) {
              if (currentLine.length > 0) {
                currentLine += " " + word;
              } else {
                currentLine += word;
              }
            } else {
                lines.push(currentLine);

                // breakup urls and other long words
                while (ctx.measureText(word).width > maxWidth) {
                    let c = word.length;

                    while (ctx.measureText(word.slice(0, c)).width > maxWidth) {
                        c--;
                    }

                    lines.push(word.slice(0, c));
                    word = word.slice(c);
                }

                currentLine = word;
            }
          }
          lines.push(currentLine);
        } 
        return lines;
      }
}
