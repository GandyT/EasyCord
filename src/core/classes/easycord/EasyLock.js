/* PREVENT RACE CONDITIONS */

class EasyLock {
    constructor() {
        this.locked = true;
        this.resolve;
    }

    waitForUnlock() {
        return new Promise((res, rej) => {
            if (!this.locked) res();

            this.resolve = res;
        })
    }

    unlock() {
        this.locked = false;

        if (this.resolve) this.resolve();
    }
}

module.exports = EasyLock;