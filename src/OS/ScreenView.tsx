import React from "react";
import App, { AppProps } from "../Handlers/App";
import { withStore } from "state-range";
import Stack from "naxui/Stack";
import Window from "../Handlers/Window";

type Props = {
    appId: string;
}

const ScreenView = ({ appId }: Props) => {
    const app = App.get(appId) as AppProps
    let Render: any = () => <></>
    if (app?.render) Render = app.render

    return (
        <Stack
            id={"screen" + (screen as any)._id}
            width="100%"
            height="100%"
            overflow="hidden"
            onClick={() => {
                Window.setActiveApp(app.id)
            }}
        >
            <Render />
        </Stack>
    )
}

export default withStore(ScreenView)