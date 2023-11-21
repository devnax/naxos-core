import React, { ReactElement, useMemo, useState } from "react"
import ViewBox from "naxui/ViewBox"
import { ThemeProvider, useMediaScreen, useWindowResize } from "naxui-manager";
import Dock from "./Dock";
import { noDispatch, withStore } from "state-range";
import WindowView from "./WindowView";
import Window from "../Handlers/Window";
import { IconButtonProps } from "naxui/IconButton";
import Stack from "naxui/Stack";
import WindowListPanel from './WindowListPanel'
import shortcuts from "../config/shortcuts";
import Listener from "../Handlers/Listener";
import CONSTANCE from "../config/CONSTANCE";
import { isHotkey, hasActionKey } from "../hotkey";
import Desktop from "./Desktop";
import ShortcutApp from "../Handlers/ShortcutApp";
import Menu from "naxui/Menu";

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

    let hotkeyHandler = (e: any) => {
        if (!hasActionKey(e)) return
        let runningApp = Window.getActiveApp()
        let keys = [
            ...(runningApp?.shortcutKeys || []),
            ...(shortcuts || [])
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
    const activeWindow: any = Window.getActiveWindow()
    const { render: ShortcutRender } = ShortcutApp.getActiveApp() || {}

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
                    e.preventDefault()
                    Menu.close()

                    if (!["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
                        let runningApp = Window.getActiveApp()
                        if (runningApp && runningApp.onContextMenu) {
                            // open the menu
                            const view = runningApp.onContextMenu()
                        }
                    }
                }}
            >
                <Stack position="relative" width="100%" height="100%">
                    {
                        (!activeWindow && !ShortcutRender) && <Desktop />
                    }
                    {
                        !!ShortcutRender && <ShortcutRender />
                    }
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