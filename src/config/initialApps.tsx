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
    onRun: () => console.log("onRun home"),
    onClose: () => console.log("onClose home"),
    onActive: () => console.log("onActive home"),
    onDeactive: () => console.log("onDeactive home"),
    onVisible: (v) => console.log("onVisible home", v),
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
    onRun: () => console.log("onRun setting"),
    onClose: () => console.log("onClose setting"),
    onActive: () => console.log("onActive setting"),
    onDeactive: () => console.log("onDeactive setting"),
    onVisible: (v) => console.log("onVisible setting", v),
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