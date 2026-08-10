class CanvasBrowser extends aniRect {

    constructor(x, y, w, h) {

    super(x, y, w, h);
    
    this.type = "browser";


    /*
        Internal browser surface
    */

    this.surface =
        document.createElement("canvas");


    this.surface.width =
        w;


    this.surface.height =
        h;


    this.ctx =
        this.surface.getContext("2d");


    this.browserWidth = w;
    this.browserHeight = h;



    /*
        Browser state
    */

    this.url = "";

    this.dom = null;

    this.layout = [];



    /*
        Systems
    */

    this.imageCache = {

        load(src) {

            return null;

        }

    };


    this.layoutEngine =
        new LayoutEngine({
            width: this.browserWidth
        });



    this.renderer =
        new Renderer(
            this.surface,
            {
                imageCache:
                    this.imageCache
            }
        );



    /*
        Input
    */

    this.focus = null;


    /*
        Animation
    */

    this.running = false;


}




async open(url) {

    this.url = url;


    const html =
        await this.load(url);


    const parser =
        new DOMParser();


    const pageDocument =
        parser.parseFromString(
            html,
            "text/html"
        );


    this.dom =
        new DOMTree(
            pageDocument
        );


    this.layout =
        this.layoutEngine.layout(
            this.dom.root
        );


    this.start();

}



async load(url) {

    const resolved =
        this.resolveURL(url);


    return new Promise(
        (resolve, reject)=> {

            const xhr =
                new XMLHttpRequest();


            xhr.open(
                "GET",
                resolved,
                true
            );


            xhr.onload = ()=> {

                if (
                    xhr.status === 200 ||
                    xhr.status === 0
                ) {

                    resolve(
                        xhr.responseText
                    );

                } else {

                    reject(
                        new Error(
                            "HTTP " + xhr.status
                        )
                    );

                }

            };


            xhr.onerror = ()=> {

                reject(
                    new Error(
                        "Could not load " + resolved
                    )
                );

            };


            xhr.send();

        }
    );

}



start() {

    if (this.running)
        return;


    this.running = true;


}



loop() {

    if (!this.running)
        return;


    this.render();


    requestAnimationFrame(
        () => this.loop()
    );

}



openedState() {

    this.render();

}



render() {

    this.ctx.save();

    /*
        Clear browser surface
    */

    this.ctx.clearRect(
        0,
        0,
        this.width,
        this.height
    );


    this.ctx.fillStyle =
        "#111";


    this.ctx.fillRect(
        0,
        0,
        this.width,
        this.height
    );



    /*
        Draw HTML layout
    */

    if (
        Array.isArray(this.layout)
    ) {

        this.renderer.render(
            this.layout
        );

    }

    this.ctx.restore();

}



resolveURL(url) {

    if (
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("file://")
    ) {
        return url;
    }


    if (
        this.url &&
        (
            this.url.startsWith("http://") ||
            this.url.startsWith("https://") ||
            this.url.startsWith("file://")
        )
    ) {

        return new URL(
            url,
            this.url
        ).href;

    }


    return url;

}

}


window.CanvasBrowser =
CanvasBrowser;