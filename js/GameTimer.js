class GameTimer {
constructor(startDate) {
    this.startDate = new Date(startDate);
    this.realStartTime = Date.now();
}

    elapsed() {
        const ms = Date.now() - this.startTime;

        return {
            milliseconds: ms,
            seconds: Math.floor(ms / 1000),
            minutes: Math.floor(ms / 60000),
            hours: Math.floor(ms / 3600000),
            days: Math.floor(ms / 86400000)
        };
    }
    
    formatted() {
        const elapsed = Date.now() - this.realStartTime;
        const gameDate = new Date(this.startDate.getTime() + elapsed);

        const pad = n => String(n).padStart(2, "0");

        return `${gameDate.getFullYear()}-${pad(gameDate.getMonth() + 1)}-${pad(gameDate.getDate())} `
            + `${pad(gameDate.getHours())}:${pad(gameDate.getMinutes())}:${pad(gameDate.getSeconds())}`;
    }
}