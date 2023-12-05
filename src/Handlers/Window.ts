import { Store } from "state-range";
import App from "./App";
import ShortcutApp from "./ShortcutApp";

export type WindowType = {
    active: boolean;
    apps: string[]
    activeIndex: number | null;
}

export type WindowStoreType = WindowType & {
    _id: string;
    observe: number
}

class Window extends Store<WindowType> {
    open(appId: string) {
        const win = this.insert({
            active: false,
            apps: [],
            activeIndex: null,
        })
        this.setActive(win._id)
        this.setActiveApp(appId)
    }

    close(windowId: string) {
        const win = this.get(windowId)
        if (win) {
            this.delete({ _id: windowId })
            win.apps.map(appId => this.closeApp(appId))
            if (win.active) this.activeNext()
        }
    }

    closeAll() {
        this.getAll().forEach((w) => this.close(w._id))
    }

    setActive(windowId: string) {
        const win = this.get(windowId)
        if (win) {
            const prevWin = this.getActiveWindow()
            const nextWin = this.get(windowId)

            this.update({ active: false }, { active: true })
            this.update({ active: true }, { _id: windowId })

            prevWin?.apps.map(appId => {
                const app = App.get(appId)
                if (!nextWin?.apps.includes(appId)) {
                    app?.onVisible && app.onVisible(false)
                }
            })

            nextWin?.apps.map(appId => {
                const app = App.get(appId)
                if (!prevWin?.apps.includes(appId)) {
                    app?.onVisible && app.onVisible(true)
                }
            })

            if (win.activeIndex === null && win.apps.length) {
                this.setActiveApp(win.apps[0])
            }
            ShortcutApp.exit()
        }
    }

    setActiveApp(appId: string, split?: boolean) {
        const win = this.getActiveWindow()
        ShortcutApp.exit()

        if (win) {
            const currentApp = App.get(appId)
            if (win.activeIndex !== null && appId === win.apps[win.activeIndex]) {
                return
            }
            if (win.apps.includes(appId)) {
                if (win.activeIndex !== null) {
                    const prevApp = App.get(win.apps[win.activeIndex])
                    prevApp?.onDeactive && prevApp.onDeactive()
                }
                this.update({ activeIndex: win.apps.indexOf(appId) }, { _id: win._id })
                currentApp?.onActive && currentApp.onActive()
            } else {
                let apps = split ? [...win.apps, appId] : [appId]
                if (!split) {
                    win.apps.forEach(_appId => this.closeApp(_appId, win._id))
                }
                const has = this.getAll().find(w => w.apps.includes(appId));

                this.update({ activeIndex: apps.indexOf(appId), apps }, { _id: win._id });
                (!has && currentApp?.onRun) && currentApp.onRun()
            }
        } else {
            const all = this.getAll()
            let activated = false;
            for (let i = 0; i < all.length; i++) {
                let win = all[i]
                if (win.activeIndex === win.apps.indexOf(appId)) {
                    if (win.activeIndex !== null && appId !== win.apps[win.activeIndex]) {
                        this.closeApp(win.apps[win.activeIndex], win._id)
                    }
                    this.setActive(win._id)
                    activated = true
                    break;
                }
            }
            if (!activated) {
                if (!all.length) {
                    this.open(appId)
                } else {
                    const win = all[0]
                    if (win.activeIndex !== null && appId !== win.apps[win.activeIndex]) {
                        this.closeApp(win.apps[win.activeIndex], win._id)
                    }
                    this.setActive(win._id)
                    this.setActiveApp(appId)
                }
            }
        }
    }

    closeApp(appId: string, windowId?: string) {
        const win = windowId ? this.get(windowId) : this.getActiveWindow()
        if (win && win.apps.includes(appId)) {
            let apps = [...win.apps]
            let isRunningApp = false;
            if (win.activeIndex) {
                isRunningApp = win.apps[win.activeIndex] === appId
            }
            apps.splice(win.apps.indexOf(appId), 1)

            const app = App.get(appId)
            const has = this.getAll().find(w => w.apps.includes(appId));
            (!has && app?.onClose) && app.onClose()

            this.update({ apps }, { _id: win._id })

            if (apps.length) {
                !isRunningApp && this.setActiveApp(apps[0])
            }
        }
    }

    deactiveAll() {
        const prevWin = this.getActiveWindow()

        prevWin?.apps.map(appId => {
            const app = App.get(appId)
            app?.onVisible && app.onVisible(false)
        })
        this.update({ active: false }, { active: true })
    }

    activeNext() {
        const windows = this.getAll()
        if (windows.length) {
            const win = this.getActiveWindow()
            const currentIndex = this.getIndex({ _id: win?._id }) || 0
            const next = windows[currentIndex + 1] || windows[0]
            if (next) {
                this.setActive(next._id)
            } else {
                this.setActiveApp(App.getAll()[0].id)
            }
        }

    }

    activePrev() {
        const windows = this.getAll()
        if (windows.length) {
            const win = this.getActiveWindow()
            const currentIndex = this.getIndex({ _id: win?._id }) || 0
            const prev = windows[currentIndex - 1] || windows[windows.length - 1]
            if (prev) {
                this.setActive(prev._id)
            } else {
                this.setActiveApp(App.getAll()[0].id)
            }
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
        if (activeWin && activeWin.activeIndex !== null) {
            return App.findFirst({ id: activeWin.apps[activeWin.activeIndex] })
        }
    }
}


export default new Window