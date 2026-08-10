// ImageCache.js
//
// Handles image loading and caching for CanvasBrowser

export class ImageCache {

    constructor() {

        this.images = new Map();

    }



    load(src) {

        if (!src) {
            return null;
        }


        // Already requested
        if (this.images.has(src)) {

            return this.images.get(src);

        }



        const entry = {

            src,

            image: null,

            loaded: false,

            failed: false,

            width: 0,

            height: 0

        };



        const image = new Image();


        image.onload = () => {

            entry.loaded = true;

            entry.width =
                image.naturalWidth;

            entry.height =
                image.naturalHeight;

        };


        image.onerror = () => {

            entry.failed = true;

        };


        image.src = src;


        entry.image = image;


        this.images.set(
            src,
            entry
        );


        return entry;

    }



    get(src) {

        return this.images.get(src);

    }



    clear() {

        this.images.clear();

    }



    remove(src) {

        this.images.delete(src);

    }



    preload(list) {

        for (const src of list) {

            this.load(src);

        }

    }

}