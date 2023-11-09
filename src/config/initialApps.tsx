import React from "react";
import App from '../Handlers/App';
import HomeIcon from 'naxui-icons/round/Home'
import DashboardIcon from 'naxui-icons/round/Dashboard'
import Text from 'naxui/Text'
import Input from 'naxui/Input'
import Stack from "naxui/Stack";

App.create({
    id: "dashboard",
    name: "Dashboard",
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
            listener: "modal"
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
