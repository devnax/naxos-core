import React from "react";
import App from '../Handlers/App';
import HomeIcon from 'naxui-icons/round/Home'
import Text from 'naxui/Text'
import Input from 'naxui/Input'
import Stack from "naxui/Stack";
import ShortcutApp from "../Handlers/ShortcutApp";
import IconSettings from "naxui-icons/round/Settings";
import IconPeople from "naxui-icons/round/People";
import Setting from "../Settings";
import Users from "../Users";

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
    icon: <HomeIcon />,
})

App.create({
    id: "settings",
    name: "Settings",
    render: () => {
        return <Stack p={3}>
            <Text variant="h3">Settings</Text>
        </Stack>
    },
    onClick: () => { },
    icon: <IconSettings />
})


ShortcutApp.create({
    id: "settings",
    name: "Settings",
    icon: <IconSettings />,
    render: () => <Setting />
})


ShortcutApp.create({
    id: "users",
    name: "Users",
    icon: <IconPeople />,
    render: () => <Users />
})

ShortcutApp.run("users")