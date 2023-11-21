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
import Divider from "naxui/Divider";

export type DockIconProps = {
    appId: string;
    isHorizental: boolean;
}

const DockIcon = ({ appId, isHorizental }: DockIconProps) => {
    const app = App.get(appId) as AppProps
    const activeWindow: WindowStoreType = Window.getActiveWindow() as any
    let active = activeWindow && activeWindow.activeIndex === activeWindow.apps.indexOf(appId)
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
                Menu.openContextMenu(e as any, <List p={.6}>
                    <ListItem
                        p={.4}
                        px={1}

                        onClick={() => {
                            Menu.close()
                            Window.open(appId)
                        }}
                    >New Window</ListItem>
                    <ListItem
                        p={.4}
                        px={1}

                        onClick={() => {
                            Menu.close()
                            Window.split(appId)
                        }}
                    >Split Window</ListItem>
                    <Divider />
                    <ListItem
                        p={.4}
                        px={1}
                        onClick={() => {

                        }}
                    >Exit App</ListItem>
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