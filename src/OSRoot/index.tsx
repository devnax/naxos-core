import React, { useEffect, useMemo, useState } from "react";
import OSLayout from "../OSLayout";
import App from '../Handlers/App';
import { ThemeProvider } from 'naxui-manager';
import isHotkey from 'is-hotkey'
import { OSConfig } from "./types";
import Listener from "../Handlers/Listener";
import { noDispatch, withStore } from "state-range";
import CONSTANCE from "./CONSTANCE";
import DashboardIcon from 'naxui-icons/round/Dashboard'
import WindowStackIcon from 'naxui-icons/round/Layers'
import AddWindowIcon from 'naxui-icons/round/FilterNone'
import WindowListPanel from './WindowListPanel'
import Toast from 'naxui/Toast'
import './OSApps'
import Window from "../Handlers/Window";


const OSRoot = ({ shortcutKeys }: OSConfig) => {
    const [winListOpen, setWinListOpen] = useState(false)
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

    let endIcons: any = [
        {
            icon: AddWindowIcon as any,
            onClick: () => {
                Window.open(App.defaultAppType, "home")
            }
        },
        {
            icon: DashboardIcon as any,
            onClick: () => {

            }
        }
    ]

    if (Window.getAll(App.defaultAppType).length > 1) {
        endIcons = [
            {
                icon: WindowStackIcon as any,
                onClick: () => {
                    setWinListOpen(true)
                }
            },
            ...endIcons
        ]
    }

    return (
        <ThemeProvider>
            <OSLayout
                appType={App.defaultAppType}
                endIcons={endIcons}
            />
            {
                winListOpen && <WindowListPanel
                    onClose={() => {
                        setWinListOpen(false)
                    }}
                />
            }
        </ThemeProvider>
    )
}

export default withStore(OSRoot)