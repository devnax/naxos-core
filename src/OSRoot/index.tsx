import React, { useEffect, useRef } from "react";
import OSLayout from "../OSLayout";
import App from '../App';
import HomeIcon from 'naxui-icons/round/Home'
import DashboardIcon from 'naxui-icons/round/Dashboard'
import NotificationsIcon from 'naxui-icons/round/Notifications'
import Text from 'naxui/Text'
import Input from 'naxui/Input'
import { ThemeProvider } from 'naxui-manager';
import Stack from "naxui/Stack";
import Modal from "naxui/Modal";
import Command from "../Command";
import isHotkey from 'is-hotkey'
import Layer from "naxui/Layer";
import Transition from "naxui/Transition";
import { OSConfig } from "./types";


Command.create("modal", () => {
    Modal.open("asasdasd", <Stack p={4} bgcolor="color.error.soft">
        <Text variant="h4">Hello World!</Text>
    </Stack>)
})

App.create({
    id: "dashboard",
    name: "Dashboard",
    appFooter() {
        return <Stack height={55} bgcolor="color.error.soft">

        </Stack>
    },
    render: () => {
        return <>
            <Text variant="h1">Dashboard</Text>
        </>
    },
    onClick: () => { },
    icon: DashboardIcon as any,
    shortcutKeys: [
        {
            key: "mod+s",
            command: "modal"
        }
    ]
})

App.create({
    type: "ss",
    id: "dashboards",
    name: "Dashboard",

    render: () => {
        return <>
            <Text variant="h1">Dashboard</Text>
            <button onClick={() => Command.excute("modal")}>Click</button>
        </>
    },
    onClick: () => { },
    icon: DashboardIcon as any,
    shortcutKeys: [
        {
            key: "mod+s",
            command: "modal"
        }
    ]
})

App.create({
    type: 'ss',
    id: "home",
    name: "Home",
    render: () => {
        return <Stack p={3}>
            <Text variant="h3">Home</Text>
            <Input />
        </Stack>
    },
    onClick: () => { },
    icon: HomeIcon as any
})

App.create({
    id: "System",
    name: "System",
    onClick: () => {
        Layer.open('asd', ({ open }) => {
            return (
                <Transition in={open} type="zoomOver" easing="easeInOut">
                    <Stack>
                        <OSLayout
                            appType="ss"
                            bgcolor="transparent"
                            dockBgcolor="transparent"
                            centerMode
                            dockPosition="bottom"
                        />
                    </Stack>
                </Transition>
            )
        }, { blur: 20 })
    },
    icon: DashboardIcon as any,
    placeButtom: true,
})


App.create({
    id: "Notification",
    name: "Notification",
    onClick: () => { },
    icon: NotificationsIcon as any,
    placeButtom: true,
})



const OSRoot = ({ shortcutKeys }: OSConfig) => {

    let hotkeyHandler = (e: any) => {
        let runningApp = App.getRunningApp(App.defaultAppType)
        let excuted = false
        let keys = [
            ...(runningApp?.shortcutKeys || []),
            ...(shortcutKeys || [])
        ]
        for (let sk of keys) {
            if (isHotkey(sk.key, e)) {
                e.preventDefault()
                Command.excute(sk.command)
                excuted = true
                return false
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", hotkeyHandler)
        return () => {
            document.removeEventListener("keydown", hotkeyHandler)
        }
    }, [])

    return (
        <ThemeProvider>
            <OSLayout
                appType={App.defaultAppType}
            />
        </ThemeProvider>
    )
}

export default OSRoot