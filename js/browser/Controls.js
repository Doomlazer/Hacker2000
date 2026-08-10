// Controls.js
//
// Handles interactive form controls
// for CanvasBrowser

class Controls {

    constructor(browser) {

        this.browser = browser;

        this.focused = null;

        this.cursorPosition = 0;

        this.bindKeyboard();

    }

    bindKeyboard() {

        window.addEventListener(
            "keydown",
            e => {

                this.handleKey(e);

            }
        );

    }



    focus(control) {

        this.focused = control;

        this.browser.focus =
            control;


        this.cursorPosition =
            control.value
            ? control.value.length
            : 0;

    }



    blur() {

        this.focused = null;

        this.browser.focus = null;

    }


    handleKey(e) {


        if (
            !this.focused
        ) {
            return;
        }


        const input =
            this.focused;



        switch(e.key) {


            case "Backspace":

                this.backspace();

                e.preventDefault();

                break;



            case "Delete":

                this.delete();

                e.preventDefault();

                break;



            case "ArrowLeft":

                this.moveCursor(-1);

                break;



            case "ArrowRight":

                this.moveCursor(1);

                break;



            case "Enter":

                this.submit();

                break;



            default:


                if (
                    e.key.length === 1
                ) {

                    this.insert(
                        e.key
                    );

                }

        }


    }



    insert(char) {


        const value =
            this.focused.value
            || "";


        const before =
            value.slice(
                0,
                this.cursorPosition
            );


        const after =
            value.slice(
                this.cursorPosition
            );



        this.focused.value =
            before +
            char +
            after;



        this.cursorPosition++;

    }



    backspace() {


        if (
            this.cursorPosition <= 0
        ) {
            return;
        }


        const value =
            this.focused.value
            || "";


        this.focused.value =

            value.slice(
                0,
                this.cursorPosition - 1
            )

            +

            value.slice(
                this.cursorPosition
            );


        this.cursorPosition--;

    }



    delete() {


        const value =
            this.focused.value
            || "";


        this.focused.value =

            value.slice(
                0,
                this.cursorPosition
            )

            +

            value.slice(
                this.cursorPosition + 1
            );


    }



    moveCursor(amount) {


        this.cursorPosition +=
            amount;



        if (
            this.cursorPosition < 0
        ) {

            this.cursorPosition = 0;

        }



        if (
            this.cursorPosition >
            this.focused.value.length
        ) {

            this.cursorPosition =
                this.focused.value.length;

        }

    }



    submit() {

        const form =
            this.focused.form;


        if (!form)
            return;


        this.browser.forms.submit(
            form
        );

    }


}
window.Controls = Controls;