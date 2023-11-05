import React, { ReactElement, useEffect, useState } from "react"
import ViewBox from "naxui/ViewBox"
import Menu from "naxui/Menu"
import { useMediaScreen, useWindowResize } from "naxui-manager";
import Dock from "./Dock";
import App from "../App";
import { withStore } from "state-range";
import Screen from "./Screen";


export type OSLayoutProps = {
    viewMode?: "mobile" | "pc";
    appType: string;
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
    const mediaScreen = useMediaScreen()
    const isMobile = mediaScreen.isDown("md")

    let { dockPosition, appType, bgcolor, bgImage } = props

    dockPosition ||= isMobile ? "bottom" : "left"

    let isHorizental = dockPosition === "top" || dockPosition === "bottom"
    let flexDirection = isHorizental ? "column" : "row"
    if (dockPosition === 'bottom' || dockPosition === 'right') {
        flexDirection = isHorizental ? "column-reverse" : "row-reverse"
    }

    useEffect(() => {
        let runningApp = App.getRunningApp(appType)
        if (!runningApp) {
            const apps = App.getAllByType(appType)
            if (apps.length) {
                App.run(apps[0].id)
            }
        }
        return () => {
            App.closeAll(appType)
        }
    }, [])

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
                    let runningApp = App.getRunningApp(appType)
                    if (runningApp && runningApp.onContextMenu) {
                        // open the menu
                        const view = runningApp.onContextMenu()
                    }
                }
            }}
        >
            <Screen {...props} />
        </ViewBox>
    )
}


export default withStore(OSLayout)