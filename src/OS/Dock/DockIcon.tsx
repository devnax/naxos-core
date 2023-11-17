import React from "react";
import IconButton from "naxui/IconButton";
import App, { AppProps } from "../../Handlers/App";
import { withStore } from "state-range";
import Window, { WindowStoreType } from "../../Handlers/Window";
import Menu from 'naxui/Menu'
import List from 'naxui/List'
import ListItem from 'naxui/ListItem'
import WindowIcon from 'naxui-icons/round/Tab'
import Stack from "naxui/Stack";

export type DockIconProps = {
    appId: string;
    isHorizental: boolean;
}

const DockIcon = ({ appId, isHorizental }: DockIconProps) => {
    const app = App.get(appId) as AppProps
    const activeWindow: WindowStoreType = Window.getActiveWindow() as any
    const active = activeWindow?.activeApp === appId
    const Icon = app.icon

    return (
        <Stack
            width={isHorizental ? "auto" : 55}
            height={isHorizental ? 55 : "auto"}
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onContextMenu={(e) => {
                e.preventDefault()
                Menu.close()
                Menu.open(e.currentTarget as any, <List>
                    <ListItem
                        startIcon={<WindowIcon />}
                        onClick={() => {
                            Menu.close()
                            Window.open(appId)
                        }}
                    >Open in new Window</ListItem>
                    <ListItem
                        startIcon={<></>}
                    >Exit</ListItem>
                </List>, {
                    placement: "right-top",
                    transitionProps: {
                        duration: 100
                    }
                })
            }}
        >
            <IconButton
                // variant={app.running ? "filled" : "text"}
                bgcolor={active ? "color.primary.soft" : "transparent"}
                color={active ? "primary" : "paper"}
                corner="rounded"
                onClick={(e) => {
                    app.onClick && app.onClick(e)
                    Window.setActiveApp(appId)
                }}
            >
                <Icon />
            </IconButton>
        </Stack>

    )
}

export default withStore(DockIcon)