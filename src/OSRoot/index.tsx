import React, { useEffect } from "react";
import OSLayout from "../OSLayout";
import App from '../App';
import { ThemeProvider } from 'naxui-manager';
import Command from "../Command";
import isHotkey from 'is-hotkey'
import { OSConfig } from "./types";
import './defaultApps'

const OSRoot = ({ shortcutKeys }: OSConfig) => {

    let hotkeyHandler = (e: any) => {
        let runningApp = App.getRunningApp(App.defaultAppType)
        let keys = [
            ...(runningApp?.shortcutKeys || []),
            ...(shortcutKeys || [])
        ]
        for (let sk of keys) {
            if (isHotkey(sk.key, e)) {
                e.preventDefault()
                Command.excute(sk.command, sk.data)
                return false
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", hotkeyHandler)
        return () => {
            document.removeEventListener("keydown", hotkeyHandler)
        }
    }, [])

    return (
        <ThemeProvider>
            <OSLayout
                appType={App.defaultAppType}
            />
        </ThemeProvider>
    )
}

export default OSRoot