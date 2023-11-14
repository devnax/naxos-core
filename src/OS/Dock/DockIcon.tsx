import React from "react";
import IconButton from "naxui/IconButton";
import App, { AppProps } from "../../Handlers/App";
import { withStore } from "state-range";
import Window, { WindowTypes } from "../../Handlers/Window";
import Screen, { ScreenTypes } from "../../Handlers/Screen";
import Menu from 'naxui/Menu'
import List from 'naxui/List'
import ListItem from 'naxui/ListItem'
import WindowIcon from 'naxui-icons/round/Tab'
import ScreenSplitIcon from 'naxui-icons/round/ViewColumn';

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
            onContextMenu={(e) => {
                e.preventDefault()
                Menu.close()
                Menu.open(e.currentTarget as any, <List>
                    <ListItem
                        startIcon={<ScreenSplitIcon />}
                        onClick={() => {
                            Menu.close()
                            Screen.open((activeWindow as any)._id, appId)
                        }}
                    >Open in new Screen</ListItem>
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
            <Icon />
        </IconButton>
    )
}

export default withStore(DockIcon)