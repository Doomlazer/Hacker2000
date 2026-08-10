// Forms.js
//
// Handles fake webpage forms
// for CanvasBrowser

export class Forms {

    constructor(browser) {

        this.browser = browser;

        this.forms = [];

    }



    build(layout) {

        this.forms = [];


        let currentForm = null;


        for (const item of layout) {


            if (
                item.type === "form"
            ) {

                currentForm =
                    item;

                item.controls = [];

                this.forms.push(
                    item
                );

                continue;

            }



            if (
                currentForm &&
                (
                    item.type === "input" ||
                    item.type === "button"
                )
            ) {


                item.form =
                    currentForm;


                currentForm.controls
                    .push(item);


            }

        }


    }



    submit(form) {


        const data = {};


        for (
            const control
            of form.controls
        ) {


            if (
                control.type !== "input"
            ) {
                continue;
            }



            if (
                !control.name
            ) {
                continue;
            }



            data[
                control.name
            ] =
                control.value || "";

        }



        /*
            Game callback override

            Example:
            fake login validation
        */

        if (
            this.browser.onSubmit
        ) {

            const handled =
                this.browser.onSubmit(
                    form,
                    data
                );


            if (handled)
                return;

        }



        /*
            Default browser behavior

            GET navigation
        */

        const method =
            (
                form.method ||
                "get"
            )
            .toLowerCase();



        if (
            method === "get"
        ) {


            const params =
                new URLSearchParams(
                    data
                );


            this.browser.navigate(

                form.action
                +
                "?"
                +
                params.toString()

            );


        }


        else {


            this.browser.navigate(
                form.action
            );

        }

    }



    findForm(control) {

        return control.form;

    }

}