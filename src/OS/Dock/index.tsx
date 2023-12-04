import Stack from "naxui/Stack"
import ViewBox from "naxui/ViewBox"
import Badge from "naxui/Badge"
import React, { useEffect, useState } from "react"
import DockIcon from "./DockIcon"
import { OSProps } from ".."
import App from "../../Handlers/App"
import IconButton from "naxui/IconButton"
import WindowStackIcon from 'naxui-icons/round/Layers'
import Window from "../../Handlers/Window"
import DashboardIcon from 'naxui-icons/round/GridView'
import System, { systemFactory } from "../../Handlers/System"
import { withStore } from "state-range"
import Menu from "naxui/Menu"
import { PlacementTypes } from "naxui/Menu/placedMenu"
import useBlurCss from 'naxui/useBlurCss'
import OSMenu from "./OSMenu"
import ShortcutApp from "../../Handlers/ShortcutApp"
import Transition from "naxui/Transition"
import ContextMenu from "../../Handlers/ContextMenu"
import IconClose from "naxui-icons/round/Close"
import { alpha } from "naxui-manager"

const _RenderShortcutAppIcon = ({ dockPosition }: OSProps) => {
    const shortcutApp: any = ShortcutApp.getActiveApp()
    const isActive = !!shortcutApp
    const [_icon, setIcon] = useState(shortcutApp?.icon)
    const [show, setShow] = useState(false)
    const [hover, setHover] = useState(false)
    const [_in, setIn] = useState(false)
    let isHorizental = dockPosition === "top" || dockPosition === "bottom"

    useEffect(() => {
        isActive && setShow(true)
        isActive && setIcon(shortcutApp.icon)
        setIn(isActive)
    }, [isActive, shortcutApp])

    if (!show) return <></>

    return (
        <Transition
            in={_in}
            duration={_in ? 400 : 300}
            type="zoom"
            onFinish={() => {
                if (!_in) {
                    setShow(false)
                    setHover(false)
                }
            }}
        >
            <Stack
                width={isHorizental ? "auto" : 55}
                height={isHorizental ? 55 : "auto"}
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                position="relative"
                sx={{
                    '& .shortcut-app-close-btn': {
                        transition: "transform .1s",
                        transform: "scale(0)",
                    },
                    '&:hover .shortcut-app-close-btn': {
                        transform: "scale(1)",
                    }
                }}
            >
                {/* <IconButton
                    className="shortcut-app-close-btn"
                    color="error"
                    size={16}
                    position="absolute"
                    top={0}
                    right={4}
                    onClick={() => {
                        ShortcutApp.exit()
                    }}
                >
                    <IconClose fontSize={14} />
                </IconButton> */}
                <IconButton
                    corner="circle"
                    bgcolor={hover ? "color.error.soft" : "color.primary.soft"}
                    color={hover ? "error" : "primary"}
                    transition={"none"}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => {
                        ShortcutApp.exit()
                    }}
                >
                    {hover ? <IconClose /> : _icon}
                </IconButton>
            </Stack>
        </Transition>
    )
}

const RenderShortcutAppIcon = withStore(_RenderShortcutAppIcon)

const Dock = (props: OSProps) => {
    let { dockPosition, centerMode, dockBgcolor, logo } = props
    let isHorizental = dockPosition === "top" || dockPosition === "bottom"
    let apps = App.getApps()
    let activeApp = Window.getActiveApp()
    let menu_placement: PlacementTypes = "right-bottom"
    let blurCss = useBlurCss(20)
    const shortcutApp = ShortcutApp.getActiveApp()

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
                            ShortcutApp.exit()
                        }}
                    >
                        <IconButton
                            corner="rounded"
                            bgcolor={(!activeApp && !shortcutApp) ? "color.primary.soft" : "transparent"}
                            color={(!activeApp && !shortcutApp) ? "primary" : "paper"}
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
                    <RenderShortcutAppIcon {...props} />

                    {
                        Window.getAll().length > 1 && <Badge content={Window.getAll().length} >
                            <IconButton
                                corner="rounded"
                                onClick={() => {
                                    const isWindowPanelOpen = systemFactory.getMeta("TOGGLE_WINDOW_PANEL", false)
                                    if (!isWindowPanelOpen) {
                                        System.toggleOpenWindowPanel()
                                    }
                                }}
                                onContextMenu={(e) => {
                                    ContextMenu(e, [
                                        {
                                            label: "Close All",
                                            onClick: () => Window.closeAll()
                                        }
                                    ])
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
                                bgcolor: t => alpha(t.colors.paper.light, .3),
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