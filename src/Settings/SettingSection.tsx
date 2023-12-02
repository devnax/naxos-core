import Stack, { StackProps } from "naxui/Stack";
import Text from "naxui/Text";
import React from "react";

export type SettingSectionProps = StackProps & {
    title?: string
}

const SettingSection = ({ children, title, ...props }: SettingSectionProps) => {
    return (
        <Stack gap={12} mb={2}  {...props}>
            {!!title && <Text fontWeight={500}>{title}</Text>}
            <Stack
                radius={1}
                p={2}
                border={1}
                gap={12}
            >
                {children}
            </Stack>
        </Stack>
    )
}

export default SettingSection