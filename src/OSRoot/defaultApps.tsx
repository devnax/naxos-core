import React from "react";
import OSLayout from "../OSLayout";
import App from '../App';
import HomeIcon from 'naxui-icons/round/Home'
import DashboardIcon from 'naxui-icons/round/Dashboard'
import NotificationsIcon from 'naxui-icons/round/Notifications'
import Text from 'naxui/Text'
import Input from 'naxui/Input'
import Stack from "naxui/Stack";
import Modal from "naxui/Modal";
import Command from "../Command";
import Layer from "naxui/Layer";
import Transition from "naxui/Transition";
import Filter from "../Filter";

Filter.add("settings", "any", () => {
    return <Text variant="h6">I am from Filter</Text>
})


Command.create("modal", () => {
    if (Modal.isOpen("asasdasd")) {
        Modal.close("asasdasd")
        return
    }
    Modal.open("asasdasd", <Stack p={4} bgcolor="color.error.soft">
        <Text variant="h4">Hello World!</Text>
    </Stack>)
})

App.create({
    id: "dashboard",
    name: "Dashboard",
    appFooter() {
        return <Stack height={55} bgcolor="color.error.soft">
            {Filter.renderObject("settings")}
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
