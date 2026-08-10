// Layout.js
//
// Converts BrowserNode DOM tree into render objects

class LayoutEngine {

    constructor(options = {}) {

        this.width =
            options.width ?? 800;

        this.padding =
            options.padding ?? 20;

        this.lineHeight =
            options.lineHeight ?? 22;


        this.items = [];

        this.cursor = {
            x: this.padding,
            y: this.padding
        };


        this.currentForm = null;

    }


    layout(root) {

        this.items = [];

        this.cursor.x =
            this.padding;

        this.cursor.y =
            this.padding;


        this.currentForm = null;


        this.layoutNode(root);


        return this.items;

    }


    layoutNode(node) {

        if (!node)
            return;


        if (node.type === "text") {

            this.layoutText(node);

            return;

        }


        this.layoutElement(node);

    }



    layoutElement(node) {

        const tag =
            node.tag;



        switch(tag) {


            case "img":

                this.layoutImage(node);
                return;



            case "input":

                this.layoutInput(node);
                return;



            case "button":

                this.layoutButton(node);
                return;



            case "form":

                this.layoutForm(node);
                return;



            case "a":

                this.layoutLink(node);
                return;

        }



        if (this.isBlock(tag)) {

            this.newLine();


            for (const child of node.children) {

                this.layoutNode(child);

            }


            this.cursor.y +=
                this.lineHeight;


            return;

        }



        for (const child of node.children) {

            this.layoutNode(child);

        }

    }



    layoutText(node) {

        const text =
            node.text
            .replace(/\s+/g, " ");


        if (!text.trim())
            return;



        const width =
            this.measureText(text);



        if (
            this.cursor.x + width >
            this.width - this.padding
        ) {

            this.newLine();

        }



        const item = {

            type: "text",

            text,

            x:
                this.cursor.x,

            y:
                this.cursor.y,

            width,

            height:
                this.lineHeight

        };


        this.items.push(item);



        this.cursor.x += width;

    }



    layoutLink(node) {


        const startX =
            this.cursor.x;


        const startY =
            this.cursor.y;


        let text = "";



        for (const child of node.children) {


            if (child.type === "text") {

                text += child.text;

            }

            this.layoutNode(child);

        }



        const width =
            this.cursor.x - startX;



        this.items.push({

            type: "link",

            text,

            href:
                node.attributes.href,

            x:
                startX,

            y:
                startY,

            width,

            height:
                this.lineHeight

        });

    }



    layoutImage(node) {


        const width =
            Number(
                node.attributes.width
            ) || 128;


        const height =
            Number(
                node.attributes.height
            ) || 128;



        this.items.push({

            type: "image",

            src:
                node.attributes.src,

            x:
                this.cursor.x,

            y:
                this.cursor.y,

            width,

            height

        });



        this.cursor.y +=
            height + 10;

    }



    layoutInput(node) {


        const item = {

            type: "input",

            inputType:
                node.attributes.type
                || "text",


            name:
                node.attributes.name
                || "",


            value:
                node.attributes.value
                || "",


            x:
                this.cursor.x,


            y:
                this.cursor.y,


            width: 220,

            height: 30,


            form:
                this.currentForm

        };



        this.items.push(item);



        if (this.currentForm) {

            this.currentForm.controls
                .push(item);

        }



        this.cursor.y +=
            40;

    }



    layoutButton(node) {


        let text = "";


        for (const child of node.children) {

            if (child.type === "text") {

                text += child.text;

            }

        }



        const item = {

            type: "button",

            text,

            x:
                this.cursor.x,


            y:
                this.cursor.y,


            width: 100,

            height: 32,


            form:
                this.currentForm

        };



        this.items.push(item);



        if (this.currentForm) {

            this.currentForm.controls
                .push(item);

        }



        this.cursor.y +=
            45;

    }



    layoutForm(node) {


        const form = {

            type: "form",

            action:
                node.attributes.action
                || this.currentURL
                || "",


            method:
                node.attributes.method
                || "get",


            controls: []

        };



        this.items.push(form);



        const previous =
            this.currentForm;


        this.currentForm =
            form;



        for (const child of node.children) {

            this.layoutNode(child);

        }



        this.currentForm =
            previous;

    }



    newLine() {

        this.cursor.x =
            this.padding;


        this.cursor.y +=
            this.lineHeight;

    }



    isBlock(tag) {

        return [

            "body",
            "div",
            "p",
            "section",
            "article",
            "header",
            "footer",
            "form",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "ul",
            "ol",
            "li"

        ].includes(tag);

    }



    measureText(text) {

        return text.length * 8;

    }

}

window.LayoutEngine = LayoutEngine;