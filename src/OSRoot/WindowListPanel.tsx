import Stack from "naxui/Stack";
import Transition from "naxui/Transition";
import Portal from "naxui/Portal";
import React, { useEffect, useRef, useState } from "react";
import Window from "../Handlers/Window";
import App, { AppProps } from "../Handlers/App";
import Screen from "../Handlers/Screen";
import CloseIcon from 'naxui-icons/round/Close'
import IconButton from "naxui/IconButton";
import { withStore } from "state-range";

type Props = {
    onClose?: () => void
}

const WindowListPanel = ({ onClose }: Props) => {
    const windows = Window.getAll(App.defaultAppType)
    const activeWindow = Window.getActive(App.defaultAppType)
    const [o, setO] = useState(true)
    const [opened, setOpened] = useState(false)
    const ref: any = useRef()

    const handler = (e) => {
        if (opened && ref?.current && !ref.current.contains(e.target)) {
            setO(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handler)
        return () => {
            document.removeEventListener("click", handler)
        }
    }, [opened])

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
                            onClose && onClose()
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
                                const screen = Screen.getActive(win._id)
                                const { icon } = App.get(screen.appId) as AppProps
                                let isActive = activeWindow._id === win._id
                                const Icon: any = icon
                                return (
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
                                    >
                                        <IconButton
                                            position="absolute"
                                            top={-5}
                                            right={-5}
                                            color="error"
                                            size={20}
                                            variant="soft"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                Window.exit(win._id)
                                                return false
                                            }}
                                        >
                                            <CloseIcon fontSize={15} />
                                        </IconButton>
                                        <Icon onClick={() => {
                                            Window.setActive(win._id)
                                        }} className="window-list-panel-app-icon" color={isActive ? "color.primary" : "inherit"} />
                                    </Stack>
                                )
                            })
                        }
                    </Stack>
                </Transition>
            </Stack>
        </Portal>

    )
}


export default withStore(WindowListPanel)