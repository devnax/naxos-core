import React from "react";
import IconButton from "naxui/IconButton";
import App, { AppProps } from "../../Handlers/App";
import { withStore } from "state-range";
import Window, { WindowTypes } from "../../Handlers/Window";
import Screen, { ScreenTypes } from "../../Handlers/Screen";

export type DockIconProps = {
    appId: string;
}

const DockIcon = ({ appId }: DockIconProps) => {
    const app = App.get(appId) as AppProps
    const activeWindow = Window.getActive() as WindowTypes
    const activeScreen = Screen.getActive((activeWindow as any)._id as any) as ScreenTypes
    const active = activeScreen.active && activeScreen.appId === appId
    const Icon = app.icon

    return (
        <IconButton
            // variant={app.running ? "filled" : "text"}
            bgcolor={active ? "color.primary.soft" : "transparent"}
            color={active ? "primary" : "paper"}
            corner="rounded"
            onClick={(e) => {
                app.onClick && app.onClick(e)
                Screen.setActiveApp(appId)
            }}
        >
            <Icon />
        </IconButton>
    )
}

export default withStore(DockIcon)