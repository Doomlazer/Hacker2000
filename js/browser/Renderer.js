// Renderer.js
//
// Draws CanvasBrowser render objects

class Renderer {

    constructor(canvas, options = {}) {

        this.canvas = canvas;

        this.ctx =
            canvas.getContext("2d");


        this.imageCache =
            options.imageCache;


        this.font =
            options.font ||
            "16px Arial";


        this.textColor =
            "#111";


        this.linkColor =
            "#0645ad";


        this.hoverColor =
            "#cc0000";


        this.buttonColor =
            "#eeeeee";


        this.buttonBorder =
            "#777";


        this.inputBorder =
            "#888";


        this.focusBorder =
            "#2563eb";


        this.cursorTimer =
            0;


        this.cursorVisible =
            true;

    }



    render(items, offset = {}) {

        if (!Array.isArray(items))
            return;


        const ox =
            offset.x || 0;

        const oy =
            offset.y || 0;


        for (const item of items) {

            if (!item || !item.type)
                continue;


            switch(item.type) {

                case "text":
                    this.drawText(item, ox, oy);
                    break;

                case "link":
                    this.drawLink(item, ox, oy);
                    break;

                case "image":
                    this.drawImage(item, ox, oy);
                    break;

                case "input":
                    this.drawInput(item, ox, oy);
                    break;

                case "button":
                    this.drawButton(item, ox, oy);
                    break;

            }

        }

    }



    drawText(item, ox, oy) {


        const ctx =
            this.ctx;


        ctx.font =
            this.font;


        ctx.fillStyle =
            this.textColor;


        ctx.fillText(

            item.text,

            item.x + ox,

            item.y + oy

        );

    }



    drawLink(item, ox, oy) {


        const ctx =
            this.ctx;



        ctx.font =
            this.font;



        ctx.fillStyle =
            item.hover
            ? this.hoverColor
            : this.linkColor;



        ctx.fillText(

            item.text,

            item.x + ox,

            item.y + oy

        );



        ctx.strokeStyle =
            ctx.fillStyle;



        ctx.beginPath();


        ctx.moveTo(

            item.x + ox,

            item.y + oy + 3

        );


        ctx.lineTo(

            item.x +
            ox +
            item.width,

            item.y + oy + 3

        );


        ctx.stroke();

    }



    drawImage(item, ox, oy) {


        const entry =
            this.imageCache
            ?.load(item.src);



        if (
            entry &&
            entry.loaded
        ) {


            this.ctx.drawImage(

                entry.image,

                item.x + ox,

                item.y + oy,

                item.width,

                item.height

            );


            return;

        }



        // Loading placeholder

        this.ctx.fillStyle =
            "#ddd";


        this.ctx.fillRect(

            item.x + ox,

            item.y + oy,

            item.width,

            item.height

        );

    }



    drawInput(item, ox, oy) {


        const ctx =
            this.ctx;



        ctx.fillStyle =
            "#fff";


        ctx.fillRect(

            item.x + ox,

            item.y + oy,

            item.width,

            item.height

        );



        ctx.strokeStyle =
            item.focus
            ? this.focusBorder
            : this.inputBorder;



        ctx.strokeRect(

            item.x + ox,

            item.y + oy,

            item.width,

            item.height

        );



        let display =
            item.value || "";



        if (
            item.inputType === "password"
        ) {

            display =
                "•".repeat(
                    display.length
                );

        }



        ctx.font =
            this.font;


        ctx.fillStyle =
            "#000";


        ctx.fillText(

            display,

            item.x + ox + 6,

            item.y + oy + 20

        );



        if (
            item.focus
        ) {

            this.drawCaret(
                item,
                display,
                ox,
                oy
            );

        }

    }



    drawCaret(item, text, ox, oy) {


        const now =
            performance.now();


        if (
            now - this.cursorTimer >
            500
        ) {

            this.cursorVisible =
                !this.cursorVisible;


            this.cursorTimer =
                now;

        }



        if (
            !this.cursorVisible
        ) {

            return;

        }



        const width =
            this.ctx
            .measureText(text)
            .width;



        this.ctx.fillStyle =
            "#000";


        this.ctx.fillRect(

            item.x + ox + 6 + width,

            item.y + oy + 5,

            1,

            item.height - 10

        );

    }



    drawButton(item, ox, oy) {


        const ctx =
            this.ctx;


        ctx.fillStyle =
            item.hover
            ? "#ddd"
            : this.buttonColor;



        ctx.fillRect(

            item.x + ox,

            item.y + oy,

            item.width,

            item.height

        );



        ctx.strokeStyle =
            this.buttonBorder;


        ctx.strokeRect(

            item.x + ox,

            item.y + oy,

            item.width,

            item.height

        );



        ctx.fillStyle =
            "#000";


        ctx.font =
            this.font;


        ctx.fillText(

            item.text,

            item.x + ox + 10,

            item.y + oy + 21

        );

    }

}

window.Renderer = Renderer;