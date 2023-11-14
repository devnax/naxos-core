import React, { ReactElement, useEffect, useMemo, useState } from "react"
import ViewBox from "naxui/ViewBox"
import { ThemeProvider, useMediaScreen, useWindowResize } from "naxui-manager";
import Dock from "./Dock";
import App from "../Handlers/App";
import { noDispatch, withStore } from "state-range";
import WindowView from "./WindowView";
import Window from "../Handlers/Window";
import { IconButtonProps } from "naxui/IconButton";
import Stack from "naxui/Stack";
import WindowListPanel from './WindowListPanel'
import shortcuts from "../config/shortcuts";
// import isHotkey, { toKeyName } from 'is-hotkey'
import Listener from "../Handlers/Listener";
import CONSTANCE from "../config/CONSTANCE";
import { isHotkey, hasActionKey } from "../hotkey";

export type EndIconType = {
    icon: () => ReactElement;
    onClick?: IconButtonProps['onClick'];
}

export type OSProps = {
    viewMode?: "mobile" | "pc";
    dockPosition?: "top" | "left" | "right" | "bottom";
    centerMode?: boolean;
    dockBgcolor?: string;
    bgImage?: string;
    bgcolor?: string;
    logo?: ReactElement
}


const OS = (props: OSProps) => {
    const [height, setHeight] = useState<any>("100vh")

    useWindowResize(() => {
        if (window.innerHeight !== height) {
            setHeight(window.innerHeight)
        }
    })
    let { dockPosition, bgcolor, bgImage } = props

    useMemo(() => {
        noDispatch(() => {
            let runningApp: any = App.getActiveApp()
            if (!runningApp) {
                const apps = App.getApps()
                if (apps.length) {
                    runningApp = apps[0]
                }
            }

            const windows = Window.getAll()
            if (!windows.length && runningApp) {
                Window.open(runningApp.id)
            }
        })
    }, [])

    let hotkeyHandler = (e: any) => {
        if (!hasActionKey(e)) return

        let runningApp = App.getActiveApp()
        let keys = [
            ...(runningApp?.shortcutKeys || []),
            ...(shortcuts || [])
        ]

        for (let sk of keys) {

            if (isHotkey(sk.key, e)) {
                console.log(sk);

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
        document.addEventListener("keydown", hotkeyHandler)
        Listener.listen(CONSTANCE.OS_ONREADY)
        return () => {
            Listener.listen(CONSTANCE.OS_SHUTDOWN)
            document.removeEventListener("keydown", hotkeyHandler)
        }
    }, [])

    const windows = Window.getAll()
    const mediaScreen = useMediaScreen()
    const isMobile = mediaScreen.isDown("md")

    dockPosition ||= isMobile ? "bottom" : "left"

    let isHorizental = dockPosition === "top" || dockPosition === "bottom"
    let flexDirection = isHorizental ? "column" : "row"
    if (dockPosition === 'bottom' || dockPosition === 'right') {
        flexDirection = isHorizental ? "column-reverse" : "row-reverse"
    }


    return (
        <ThemeProvider>
            <ViewBox
                height={height}
                width="100%"
                bgcolor={bgcolor ? bgcolor : "color.paper.light"}
                bgimage={bgImage}
                header={<Dock {...props} dockPosition={dockPosition} />}
                sx={{ flexDirection, overflow: "hidden" }}
                onContextMenu={(e: any) => {
                    if (!["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
                        // e.preventDefault()
                        let runningApp = App.getActiveApp()
                        if (runningApp && runningApp.onContextMenu) {
                            // open the menu
                            const view = runningApp.onContextMenu()
                        }
                    }
                }}
            >
                <Stack position="relative" width="100%" height="100%">
                    {
                        windows.map(win => (<WindowView key={win._id} windowId={win._id} />))
                    }
                </Stack>
                <WindowListPanel />
            </ViewBox>
        </ThemeProvider>
    )
}


export default withStore(OS)