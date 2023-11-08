import React from "react";
import App from "../Handlers/App";
import Screen, { ScreenTypes } from "../Handlers/Screen";
import { withStore } from "state-range";
import Stack from "naxui/Stack";

type Props = {
    screenId: string;
}

const ScreenView = ({ screenId }: Props) => {
    const screen = Screen.get(screenId) as ScreenTypes
    let app = App.get(screen.appId)
    let Render: any = () => <></>
    if (app?.render) Render = app.render

    return (
        <Stack
            id={"screen" + (screen as any)._id}
            width="100%"
            height="100%"
            overflow="hidden"
            onClick={() => {
                Screen.setActive(screenId)
            }}
        >
            <Render />
        </Stack>
    )
}

export default withStore(ScreenView)