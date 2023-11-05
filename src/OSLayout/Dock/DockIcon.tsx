import IconButton from "naxui/IconButton";
import React from "react";
import App, { AppPropsPrivate } from "../../App";

export type DockIconProps = {
    appId: string;
}

const DockIcon = ({ appId }: DockIconProps) => {
    const app = App.get(appId) as AppPropsPrivate
    const Icon = app.icon
    return (
        <IconButton
            // variant={app.running ? "filled" : "text"}
            bgcolor={app.running ? "color.primary.soft" : "transparent"}
            color={app.running ? "primary" : "paper"}
            corner="rounded"
            onClick={(e) => {
                app.onClick && app.onClick(e)
                App.run(appId)
            }}
        >
            <Icon />
        </IconButton>
    )
}

export default DockIcon