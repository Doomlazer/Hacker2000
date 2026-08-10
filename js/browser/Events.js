// Events.js
//
// Handles mouse interaction for CanvasBrowser

class BrowserEvents {


    constructor(browser) {

        this.browser = browser;

        this.hovered = null;

        this.bind();

    }



    bind() {


        this.browser.canvas.addEventListener(
            "mousemove",
            e => {

                const pos =
                    this.getMousePosition(e);


                this.updateHover(
                    pos.x,
                    pos.y
                );

            }
        );



        this.browser.canvas.addEventListener(
            "mousedown",
            e => {

                const pos =
                    this.getMousePosition(e);


                this.handleClick(
                    pos.x,
                    pos.y
                );

            }
        );



    }



    getMousePosition(e) {

        const rect =
            this.browser.canvas
            .getBoundingClientRect();


        return {

            x:
                e.clientX -
                rect.left,

            y:
                e.clientY -
                rect.top +
                this.browser.scroll.y

        };

    }



    updateHover(x, y) {


        this.hovered = null;


        let cursor = "default";


        for (
            const item
            of this.browser.layout
        ) {


            item.hover = false;


            if (
                this.hit(
                    item,
                    x,
                    y
                )
            ) {


                this.hovered =
                    item;


                item.hover = true;


                if (
                    item.type === "link" ||
                    item.type === "button"
                ) {

                    cursor = "pointer";

                }


                if (
                    item.type === "input"
                ) {

                    cursor = "text";

                }


                break;

            }

        }


        this.setCursor(cursor);

    }



    handleClick(x, y) {


        let clicked = null;



        for (
            const item
            of this.browser.layout
        ) {


            if (
                this.hit(
                    item,
                    x,
                    y
                )
            ) {

                clicked = item;

                break;

            }

        }



        /*
            Clicking empty space
        */

        if (!clicked) {


            if (
                this.browser.focus
            ) {

                this.browser.focus.focus =
                    false;

            }


            this.browser.focus =
                null;


            this.browser.controls.blur();


            return;

        }



        switch(clicked.type) {


            case "link":

                this.clickLink(
                    clicked
                );

                break;



            case "input":

                this.focusInput(
                    clicked
                );

                break;



            case "button":

                this.clickButton(
                    clicked
                );

                break;


        }


    }



clickLink(item) {

    this.browser.open(
        this.browser.resolveURL(item.href)
    );

}



    focusInput(item) {

        // Remove focus from previous input
        if (
            this.browser.focus &&
            this.browser.focus !== item
        ) {

            this.browser.focus.focus = false;

        }


        // Set new focus
        item.focus = true;

        this.browser.focus = item;


        // Tell Controls.js about the active field
        if (
            this.browser.controls
        ) {

            this.browser.controls.focus(item);

        }

    }

    setCursor(type) {

        //console.log("cursor:", type);

        this.browser.canvas.style.setProperty(
            "cursor",
            type,
            "important"
        );

    }



    clickButton(item) {


        if (
            item.form
        ) {


            this.browser.forms.submit(
                item.form
            );


            return;

        }



        if (
            item.action
        ) {

            item.action();

        }

    }



    hit(item, x, y) {


        return (

            x >= item.x &&

            y >= item.y &&

            x <=
                item.x +
                item.width &&

            y <=
                item.y +
                item.height

        );

    }

}

window.BrowserEvents = BrowserEvents;