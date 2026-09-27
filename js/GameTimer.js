class GameTimer {
    constructor(startDate) {
        const now = new Date();

        this.startDate = new Date(startDate);
        this.startDate.setHours(
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
            now.getMilliseconds()
        );

        this.realStartTime = Date.now();
    }

    elapsed() {
       //const ms = Date.now() - this.realStartTime;
       return Date.now() - this.realStartTime;
    }

    timerStart() {
        return Date.now();
    }
    
    timer(start) {
        const ms = Date.now() - start;

        return {
            milliseconds: ms,
            seconds: Math.floor(ms / 1000),
            minutes: Math.floor(ms / 60000),
            hours: Math.floor(ms / 3600000),
            days: Math.floor(ms / 86400000)
        };
    }

    realTime() {
        const ms = Date.now();

        return {
            milliseconds: ms,
            seconds: Math.floor(ms / 1000),
            minutes: Math.floor(ms / 60000),
            hours: Math.floor(ms / 3600000)
        };
    }
    
    setTime(value) {
        if (value instanceof Date) {
            this.startDate = new Date(value);
            this.realStartTime = Date.now();
        } else if (typeof value === "number") {
            this.realStartTime = this.realStartTime + value //new Date(this.realStartTime + value);
            console.log("time ",this.startDate);
        } else {
            throw new TypeError("setTime expects a Date or milliseconds");
        }
    }

    formatted(offset = 0) {
        const elapsed = Date.now() - this.realStartTime + offset;
        const gameDate = new Date(this.startDate.getTime() + elapsed);

        const pad = n => String(n).padStart(2, "0");

        return `${gameDate.getFullYear()}-${pad(gameDate.getMonth() + 1)}-${pad(gameDate.getDate())} `
            + `${pad(gameDate.getHours())}:${pad(gameDate.getMinutes())}:${pad(gameDate.getSeconds())}`;
    }
    
}