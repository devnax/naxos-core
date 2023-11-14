var isMac = typeof window !== 'undefined' && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

let excludeKeys = ["Meta", "Shift", "Alt", "Ctrl", "Control"]
const _k = (k, name) => k ? `${name}+` : ""

export const generateHotkey = (e: KeyboardEvent) => {
    let keys = ''
    keys += isMac ? _k(e.ctrlKey, 'ctrl') : ""
    keys += _k(e.shiftKey, 'shift')
    keys += _k(e.altKey, 'alt')
    keys += isMac ? _k(e.metaKey, 'mod') : _k(e.ctrlKey, 'mod')
    keys += !isMac ? _k(e.metaKey, 'meta') : ""
    keys = keys.slice(0, -1)

    let key = e.key.toLowerCase().replace("arrow", "")
    key = key === " " ? "space" : key
    key = key === "+" ? "add" : key
    return keys + (excludeKeys.includes(e.key) ? "" : `${keys ? "+" : ""}${key}`)
}

export const hasActionKey = (e: KeyboardEvent) => {
    return e.ctrlKey || e.metaKey || e.shiftKey || e.altKey
}

export const isHotkey = (key: string, e: KeyboardEvent) => {
    key = key.replace("++", "+add")
    let keys = key.split("+")
    let hotkeys = generateHotkey(e).split("+")
    let match = keys.length === hotkeys.length;
    for (let k of hotkeys) {
        if (!keys.includes(k)) {
            match = false
        }
    }

    return match
}

