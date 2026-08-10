// Scroll.js
//
// Handles page scrolling inside CanvasBrowser

class Scroll {

    constructor(browser, options = {}) {

        this.browser = browser;


        this.x = 0;
        this.y = 0;


        this.width =
            browser.width;


        this.height =
            browser.height;


        this.contentHeight =
            this.height;


        this.speed =
            options.speed ?? 40;


        this.maxScroll = 0;


        this.dragging = false;

        this.dragStart = {
            y: 0,
            scroll: 0
        };


        this.bindEvents();

    }



    update(layout) {


        let bottom = 0;


        for (
            const item
            of layout
        ) {


            const itemBottom =
                item.y +
                item.height;


            if (
                itemBottom > bottom
            ) {

                bottom =
                    itemBottom;

            }

        }


        this.contentHeight =
            bottom;


        this.maxScroll =
            Math.max(

                0,

                this.contentHeight -
                this.height

            );


        if (
            this.y >
            this.maxScroll
        ) {

            this.y =
                this.maxScroll;

        }

    }



    scroll(amount) {


        this.y +=
            amount;


        this.clamp();

    }



    set(value) {


        this.y =
            value;


        this.clamp();

    }



    clamp() {


        if (
            this.y < 0
        ) {

            this.y = 0;

        }


        if (
            this.y >
            this.maxScroll
        ) {

            this.y =
                this.maxScroll;

        }

    }



    getOffset() {


        return {

            x: 0,

            y:
                -this.y

        };

    }



    bindEvents() {

        this.browser.canvas
        .addEventListener(
            "mousedown",
            e => {


                this.dragging = true;


                this.dragStart.y =
                    e.clientY;


                this.dragStart.scroll =
                    this.y;


            }
        );



        window.addEventListener(
            "mouseup",
            () => {

                this.dragging = false;

            }
        );



        window.addEventListener(
            "mousemove",
            e => {


                if (
                    !this.dragging
                ) {
                    return;
                }



                const delta =
                    this.dragStart.y -
                    e.clientY;



                this.set(
                    this.dragStart.scroll +
                    delta
                );


            }
        );

    }



    drawScrollbar(ctx) {


        if (
            this.maxScroll <= 0
        ) {
            return;
        }



        const barHeight =
            Math.max(

                30,

                this.height *
                (
                    this.height /
                    this.contentHeight
                )

            );



        const position =
            (
                this.y /
                this.maxScroll
            )
            *
            (
                this.height -
                barHeight
            );



        ctx.fillStyle =
            "rgba(0,0,0,0.35)";


        ctx.fillRect(

            this.width - 8,

            position,

            6,

            barHeight

        );

    }

}