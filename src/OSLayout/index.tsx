import React, { ReactElement, useEffect, useMemo, useState } from "react"
import ViewBox from "naxui/ViewBox"
import { useMediaScreen, useWindowResize } from "naxui-manager";
import Dock from "./Dock";
import App from "../Handlers/App";
import { noDispatch, withStore } from "state-range";
import WindowView from "./WindowView";
import Window from "../Handlers/Window";
import { IconButtonProps } from "naxui/IconButton";
import Stack from "naxui/Stack";

export type EndIconType = {
    icon: () => ReactElement;
    onClick?: IconButtonProps['onClick'];
}

export type OSLayoutProps = {
    viewMode?: "mobile" | "pc";
    appType: string;
    endIcons?: EndIconType[];
    dockPosition?: "top" | "left" | "right" | "bottom";
    centerMode?: boolean;
    dockBgcolor?: string;
    bgImage?: string;
    bgcolor?: string;
    logo?: ReactElement
}

const OSLayout = (props: OSLayoutProps) => {
    const [height, setHeight] = useState<any>("100vh")
    useWindowResize(() => {
        if (window.innerHeight !== height) {
            setHeight(window.innerHeight)
        }
    })
    let { dockPosition, appType, bgcolor, bgImage } = props

    useMemo(() => {
        noDispatch(() => {

            let runningApp: any = App.getActiveApp(appType)
            if (!runningApp) {
                const apps = App.getAllByType(appType)
                if (apps.length) {
                    runningApp = apps[0]
                }
            }

            const windows = Window.getAll(appType)
            if (!windows.length) {
                Window.open(appType, runningApp.id)
            }

        })
    }, [])

    const windows = Window.getAll(appType)
    const mediaScreen = useMediaScreen()
    const isMobile = mediaScreen.isDown("md")

    dockPosition ||= isMobile ? "bottom" : "left"

    let isHorizental = dockPosition === "top" || dockPosition === "bottom"
    let flexDirection = isHorizental ? "column" : "row"
    if (dockPosition === 'bottom' || dockPosition === 'right') {
        flexDirection = isHorizental ? "column-reverse" : "row-reverse"
    }


    return (
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
                    let runningApp = App.getActiveApp(appType)
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
        </ViewBox>
    )
}


export default withStore(OSLayout)