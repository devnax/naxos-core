import Stack from "naxui/Stack";
import ViewBox from "naxui/ViewBox";
import Badge from "naxui/Badge";
import React from "react";
import DockIcon from "./DockIcon";
import { OSProps } from "..";
import App from "../../Handlers/App";
import IconButton from "naxui/IconButton";
import WindowStackIcon from 'naxui-icons/round/Layers'
import Window from "../../Handlers/Window";
import DashboardIcon from 'naxui-icons/round/GridView'
import System, { systemFactory } from "../../Handlers/System";
import { withStore } from "state-range";
import Menu from "naxui/Menu";
import List from "naxui/List";
import ListItem from "naxui/ListItem";
import { PlacementTypes } from "naxui/Menu/placedMenu";
import useBlurCss from 'naxui/useBlurCss'
import OSMenu from "./OSMenu";

const Dock = ({ dockPosition, centerMode, dockBgcolor, logo }: OSProps) => {
    let isHorizental = dockPosition === "top" || dockPosition === "bottom"
    let apps = App.getApps()
    let activeApp = Window.getActiveApp()
    let menu_placement: PlacementTypes = "right-bottom"
    let blurCss = useBlurCss(20)

    switch (dockPosition) {
        case "top":
            menu_placement = "bottom-right"
            break;
        case "right":
            menu_placement = "left-bottom"
            break;
        case "bottom":
            menu_placement = "top-left"
            break;
    }


    return (
        <ViewBox
            height={isHorizental ? 55 : "100%"}
            width={isHorizental ? "100%" : 55}
            bgcolor={dockBgcolor ?? "color.paper"}
            alignItems="center"
            justifyContent="center"
            py={isHorizental ? 0 : 1}
            px={isHorizental ? 1 : 0}
            header={
                <>
                    {!!logo && <Stack
                        mb={1}
                        height={isHorizental ? "100%" : "initial"}
                        width={isHorizental ? "initial" : "100%"}
                        alignItems="center"
                        flexDirection={isHorizental ? "row" : "column"}
                    >
                        {logo}
                    </Stack>}
                    <Stack
                        width={isHorizental ? "auto" : 55}
                        height={isHorizental ? 55 : "auto"}
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        onClick={(e: any) => {
                            Window.deactiveAll()
                        }}
                    >
                        <IconButton
                            corner="rounded"
                            bgcolor={!activeApp ? "color.primary.soft" : "transparent"}
                            color={!activeApp ? "primary" : "paper"}
                        >
                            <DashboardIcon />
                        </IconButton>
                    </Stack>
                </>
            }
            footer={
                <Stack
                    gap={8}
                    height={isHorizental ? "100%" : "initial"}
                    width={isHorizental ? "initial" : "100%"}
                    alignItems="center"
                    flexDirection={isHorizental ? "row" : "column"}
                >
                    {
                        Window.getAll().length > 1 && <Badge key={Window.getAll().length} content={Window.getAll().length} >
                            <IconButton
                                corner="rounded"
                                onClick={() => {
                                    const isWindowPanelOpen = systemFactory.getMeta("TOGGLE_WINDOW_PANEL", false)
                                    if (!isWindowPanelOpen) {
                                        System.toggleOpenWindowPanel()
                                    }
                                }}
                                onContextMenu={(e) => {
                                    e.preventDefault()
                                    Menu.close()
                                    Menu.open(e.currentTarget as any, <List minWidth={250}>
                                        <ListItem
                                            onClick={() => {
                                                Menu.close()
                                                Window.clear()
                                            }}
                                        >Close All</ListItem>
                                    </List>, { placement: "right-top" })
                                }}
                                color="paper"
                            >
                                <WindowStackIcon />
                            </IconButton>
                        </Badge>
                    }

                    <Stack
                        width={isHorizental ? "auto" : 55}
                        height={isHorizental ? 55 : "auto"}
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        onClick={(e: any) => {
                            Menu.close()
                            Menu.open(e.currentTarget, <OSMenu />, {
                                placement: menu_placement,
                                bgcolor: "transparent",
                                shadow: 10,
                                transitionProps: {
                                    duration: 250
                                },
                                ...blurCss
                            })
                        }}
                    >
                        <IconButton
                            corner="rounded"

                            color="paper"
                        >
                            <DashboardIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            }
            horizental={isHorizental}
            flex="initial"
            scrollbarProps={{
                style: {
                    height: centerMode ? "auto" : "100%",
                    width: centerMode ? "auto" : "100%",
                    flex: centerMode ? "initial" : 1
                }
            }}
        >
            <Stack
                gap={8}
                height={isHorizental ? "100%" : "initial"}
                width={isHorizental ? "initial" : "100%"}
                alignItems="center"
                direction={isHorizental ? "row" : "column"}
            >
                {
                    apps.map(app => <DockIcon key={app._id} isHorizental={isHorizental} appId={app.id} />)
                }
            </Stack>
        </ViewBox>
    )
}

export default withStore(Dock)