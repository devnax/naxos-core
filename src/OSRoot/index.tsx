import React, { useEffect, useMemo } from "react";
import OSLayout from "../OSLayout";
import App from '../Handlers/App';
import { ThemeProvider } from 'naxui-manager';
import isHotkey from 'is-hotkey'
import { OSConfig } from "./types";
import Listener from "../Handlers/Listener";
import { noDispatch } from "state-range";
import CONSTANCE from "./CONSTANCE";
import './OSApps'


const OSRoot = ({ shortcutKeys }: OSConfig) => {

    let hotkeyHandler = (e: any) => {
        let runningApp = App.getActiveApp(App.defaultAppType)
        let keys = [
            ...(runningApp?.shortcutKeys || []),
            ...(shortcutKeys || [])
        ]
        for (let sk of keys) {
            if (isHotkey(sk.key, e)) {
                e.preventDefault()
                Listener.listen(sk.listener, sk.props)
                return false
            }
        }
    }

    useMemo(() => {
        noDispatch(() => {
            Listener.listen(CONSTANCE.OS_ONLOAD)
        })
    }, [])


    useEffect(() => {
        document.addEventListener("keydown", hotkeyHandler)
        Listener.listen(CONSTANCE.OS_ONREADY)
        return () => {
            Listener.listen(CONSTANCE.OS_SHUTDOWN)
            document.removeEventListener("keydown", hotkeyHandler)
        }
    }, [])

    return (
        <ThemeProvider >
            <OSLayout
                appType={App.defaultAppType}
            />
        </ThemeProvider>
    )
}

export default OSRoot