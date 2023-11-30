import Stack from "naxui/Stack";
import Transition from "naxui/Transition";
import Portal from "naxui/Portal";
import React, { useEffect, useRef, useState } from "react";
import Window from "../Handlers/Window";
import App, { AppProps } from "../Handlers/App";
import CloseIcon from 'naxui-icons/round/Close'
import IconButton from "naxui/IconButton";
import { withStore } from "state-range";
import System, { systemFactory } from "../Handlers/System";


const Item = ({ win }) => {
    let [open, setOpen] = useState(true)
    const activeWindow = Window.getActiveWindow()
    const { icon } = App.get(win.apps[win.activeIndex]) as AppProps
    let isActive = activeWindow?._id === win._id
    const Icon: any = icon

    return (
        <Transition
            in={open}
            duration={open ? 0 : 400}
            type="zoom"
            onFinish={() => {
                if (!open) {
                    Window.close(win._id)
                }
            }}
        >
            <Stack
                key={win._id}
                bgcolor={isActive ? "color.primary.soft" : "color.paper"}
                radius={2}
                alignItems="center"
                justifyContent="center"
                width={70}
                height={70}
                cursor="pointer"
                position="relative"
                hover={{
                    bgcolor: "color.primary.soft",
                    '& .window-list-panel-app-icon': {
                        color: "color.primary"
                    }
                }}
                onClick={(e: any) => {
                    if (e.target.tagName !== "BUTTON") {
                        Window.setActive(win._id)
                    }
                }}
                sx={{
                    "& button": {
                        transform: "scale(0)",
                        zIndex: 9
                    },
                    "&:hover button": {
                        transform: "scale(1)",
                    }
                }}
            >
                <IconButton
                    position="absolute"
                    top={-5}
                    right={-5}
                    color="error"
                    size={20}
                    variant="soft"
                    transition="transform .3s"
                    onClick={(e) => {
                        setOpen(false)
                    }}
                >
                    <CloseIcon fontSize={15} userSelect="none" pointerEvents="none" />
                </IconButton>
                {/* <Icon className="window-list-panel-app-icon" color={isActive ? "color.primary" : "inherit"} /> */}
                {icon}
            </Stack>
        </Transition>
    )
}

const _WindowListPanelView = () => {
    const windows = Window.getAll()
    const [o, setO] = useState(true)
    const [opened, setOpened] = useState(false)
    const ref: any = useRef()

    const handler = (e) => {
        const target = e.target
        const isDocumentContains = document.contains(target)
        if (!ref?.current || !opened || !isDocumentContains || ref.current.contains(e.target)) return
        setO(false)
    }
    useEffect(() => {
        if (opened) {
            document.addEventListener("click", handler)
        }
        return () => {
            document.removeEventListener("click", handler)
        }
    }, [opened])

    useEffect(() => {
        if (windows.length < 2) {
            setO(false)
        }
    }, [windows.length])

    return (
        <Portal>
            <Stack
                ref={ref}
                position="fixed"
                bottom={0}
                left={"50%"}
                transform="translateX(-50%)"
                zIndex={99999999999999}
                m={2}
            >
                <Transition
                    in={o}
                    type="fadeUp"
                    easing="easeInOut"
                    duration={350}
                    onFinish={() => {
                        if (o) {
                            setOpened(true)
                        } else {
                            setOpened(false)
                            System.toggleOpenWindowPanel()
                        }
                    }}
                >
                    <Stack
                        radius={2}
                        p={2}
                        shadow={40}
                        flexRow
                        display="inline-flex"
                        bgcolor="color.paper.light"
                        gap={16}
                    >
                        {
                            windows.map(win => {
                                return <Item win={win} key={win._id} />
                            })
                        }
                    </Stack>
                </Transition>
            </Stack>
        </Portal>
    )
}


const WindowListPanelView = withStore(_WindowListPanelView)


const WindowListPanel = () => {
    const open = systemFactory.getMeta("TOGGLE_WINDOW_PANEL")
    return (
        <>
            {
                open && <WindowListPanelView />
            }
        </>
    )
}

export default withStore(WindowListPanel)