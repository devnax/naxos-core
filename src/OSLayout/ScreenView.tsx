import React from "react";
import App from "../Handlers/App";
import Screen, { ScreenTypes } from "../Handlers/Screen";
import { withStore } from "state-range";
import Stack from "naxui/Stack";
import Divider from "naxui/Divider";
import ResizableDivs from "./Resizable";

type Props = {
    appType: string;
    screenId: string;
}

const ScreenView = ({ screenId, appType }: Props) => {
    const screen = Screen.get(screenId) as ScreenTypes
    let app = App.get(screen.appId)
    let Render: any = () => <></>
    if (app?.render) Render = app.render

    return (
        <>
            <Stack
                width="100%"
                height="100%"
                overflow="hidden"
                onClick={() => {
                    Screen.setActive(screenId)
                }}
            >
                <ResizableDivs />
                {/* <Render /> */}
            </Stack>
            <Divider direction={"verticle" as any} />
        </>
    )
}

export default withStore(ScreenView)