import React from "react";
import IconButton from "naxui/IconButton";
import App, { AppProps } from "../../Handlers/App";
import { withStore } from "state-range";
import Window, { WindowStoreType } from "../../Handlers/Window";
import Stack from "naxui/Stack";
import ContextMenu from "../../Handlers/ContextMenu";

export type DockIconProps = {
    appId: string;
    isHorizental: boolean;
}

const DockIcon = ({ appId, isHorizental }: DockIconProps) => {
    const app = App.get(appId) as AppProps
    const activeWindow: WindowStoreType = Window.getActiveWindow() as any
    let active = activeWindow && activeWindow.activeIndex === activeWindow.apps.indexOf(appId)


    return (
        <Stack
            width={isHorizental ? "auto" : 55}
            height={isHorizental ? 55 : "auto"}
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onContextMenu={(e) => {
                ContextMenu(e, [
                    {
                        label: "New Window",
                        onClick: () => Window.open(appId)
                    },
                    {
                        label: "Split Window",
                        onClick: () => Window.setActiveApp(appId, true),
                    },
                    ...(app?.iconContextMenu || []),
                    {
                        divider: true,
                        label: "Exit App",
                        onClick: () => Window.closeApp(appId),
                    }
                ])
            }}
        >
            <IconButton
                // variant={app.running ? "filled" : "text"}
                bgcolor={active ? "color.primary.soft" : "transparent"}
                color={active ? "primary" : "paper"}
                corner="rounded"
                onClick={(e) => {
                    Window.setActiveApp(appId)
                }}
            >
                {app.icon}
            </IconButton>
        </Stack>

    )
}

export default withStore(DockIcon)