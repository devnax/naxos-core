import React from 'react'
import IconPeople from "naxui-icons/round/People";
import PaletteIcon from 'naxui-icons/round/Palette';
import IconBilling from 'naxui-icons/round/CreditCard';

import Setting from "../Settings/Setting"
import Stack from 'naxui/Stack';
import Text from 'naxui/Text';
import Input from 'naxui/Input';
import SettingSection from '../Settings/SettingSection';


Setting.create({
    id: "Account",
    label: "Account",
    icon: <IconPeople />,
    render: (state) => {
        return (
            <Stack>
                <SettingSection title="User Info">
                    <Stack>
                        <Text fontSize="fontsize.button">Name</Text>
                        <Input
                            value={state.get("name") || ""}
                            onChange={(e: any) => {
                                state.set("name", e.target.value)
                            }}
                        />
                    </Stack>
                    <Stack>
                        <Text fontSize="fontsize.button">Email</Text>
                        <Input
                            value={state.get("name") || ""}
                            onChange={(e: any) => {
                                state.set("name", e.target.value)
                            }}
                        />
                    </Stack>
                </SettingSection>
                <SettingSection title="Billing">
                    <Stack>
                        <Text fontSize="fontsize.button">Name</Text>
                        <Input
                            value={state.get("name") || ""}
                            onChange={(e: any) => {
                                state.set("name", e.target.value)
                            }}
                        />
                    </Stack>
                    <Stack>
                        <Text fontSize="fontsize.button">Email</Text>
                        <Input
                            value={state.get("name") || ""}
                            onChange={(e: any) => {
                                state.set("name", e.target.value)
                            }}
                        />
                    </Stack>
                </SettingSection>
            </Stack>
        )
    }
})


Setting.create({
    id: "Appearance",
    label: "Appearance",
    icon: <PaletteIcon />,
    render: () => {
        return (
            <Stack>
                Appearance
            </Stack>
        )
    }
})

Setting.create({
    id: "Billing information",
    label: "Billing information",
    icon: <IconBilling />,
    render: () => {
        return (
            <Stack>
                Billing
            </Stack>
        )
    }
})