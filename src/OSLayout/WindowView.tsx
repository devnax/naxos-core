import React from "react";
import Screen from "../Handlers/Screen";
import ScreenView from "./ScreenView";
import Window from "../Handlers/Window";
import { withStore } from "state-range";
import Stack from "naxui/Stack";

type Props = {
    windowId: string;
    appType: string;
}

const WindowView = ({ windowId, appType }: Props) => {
    const screens = Screen.getAll(windowId)

    return (
        <Stack
            width="100%"
            height="100%"
            overflow="hidden"
            flexRow
            onClick={() => {
                Window.setActive(windowId)
            }}
        >
            {
                screens.map(screen => {
                    return <ScreenView key={screen._id} appType={appType} screenId={screen._id} />
                })
            }
        </Stack>
    )
}

export default withStore(WindowView)