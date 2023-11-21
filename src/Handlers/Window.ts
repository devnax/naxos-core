import { Store } from "state-range";
import App from "./App";
import ShortcutApp from "./ShortcutApp";


export type WindowType = {
    active: boolean;
    apps: string[]
    activeIndex: number;
}

export type WindowStoreType = WindowType & {
    _id: string;
    observe: number
}

class Window extends Store<WindowType> {
    open(appId: string) {
        const win = this.insert({
            active: true,
            apps: [appId],
            activeIndex: 0
        })
        this.setActive(win._id)
    }

    close(windowId: string) {
        const win = this.get(windowId)
        const all = this.getAll()
        if (win && all.length > 1) {
            this.delete({ _id: windowId })
            if (win.active) this.activeNext()
        }
    }

    clear() {
        this.getAll().forEach((w, idx) => {
            if (idx) { // skip first window
                this.delete({ _id: w._id })
            }
        })
    }

    split(appId: string) {
        const win = this.getActiveWindow()
        if (win) {
            if (!win.apps.includes(appId)) {
                const apps = [...win.apps, appId]
                this.update({ activeIndex: apps.indexOf(appId), apps }, { _id: win._id })
            }
        } else {
            this.setActiveApp(appId)
        }
    }

    setActive(windowId: string) {
        const win = this.get(windowId)
        if (win) {
            this.update({ active: false }, { active: true })
            this.update({ active: true }, { _id: windowId })
            if (typeof win.activeIndex !== 'number') {
                this.setActiveApp(win.apps[0])
            }
            ShortcutApp.exit()
        }
    }

    setActiveApp(appId: string) {
        const win = this.getActiveWindow()
        ShortcutApp.exit()

        if (win) {
            if (win.apps.includes(appId)) {
                this.update({ activeIndex: win.apps.indexOf(appId) }, { _id: win._id })
            } else {
                this.update({ activeIndex: 0, apps: [appId] }, { _id: win._id })
            }
        } else {
            const all = this.getAll()
            let activated = false;
            for (let i = 0; i < all.length; i++) {
                let win = all[i]
                if (win.activeIndex === win.apps.indexOf(appId)) {
                    this.setActive(win._id)
                    activated = true
                    break;
                }
            }
            if (!activated) {
                if (!all.length) {
                    this.open(appId)
                } else {
                    this.setActive(all[0]._id)
                    this.setActiveApp(appId)
                }
            }
        }
    }

    deactiveAll() {
        this.update({ active: false }, { active: true })
    }

    activeNext() {
        const win = this.getActiveWindow()
        const currentIndex = this.getIndex({ _id: win?._id }) || 0
        const windows = this.getAll()
        const next = windows[currentIndex + 1] || windows[0]
        if (next) {
            this.setActive(next._id)
        } else {
            this.setActiveApp(App.getAll()[0].id)
        }
    }

    activePrev() {
        const win = this.getActiveWindow()
        const currentIndex = this.getIndex({ _id: win?._id }) || 0
        const windows = this.getAll()
        const prev = windows[currentIndex - 1] || windows[windows.length - 1]
        if (prev) {
            this.setActive(prev._id)
        } else {
            this.setActiveApp(App.getAll()[0].id)
        }
    }

    // ========
    get(windowId: string) {
        return this.findFirst({ _id: windowId })
    }

    getActiveWindow() {
        return this.findFirst({ active: true })
    }

    getActiveApp() {
        const activeWin = this.getActiveWindow()
        if (activeWin) {
            return App.findFirst({ id: activeWin.apps[activeWin.activeIndex] })
        }
    }
}


export default new Window