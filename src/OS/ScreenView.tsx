import React from "react";
import App, { AppProps } from "../Handlers/App";
import { withStore } from "state-range";
import Stack from "naxui/Stack";
import Window from "../Handlers/Window";
import ContextMenu from "../Handlers/ContextMenu";
import isElementWritable from "../utils/isElementWritable";
import Transition from "naxui/Transition";

type Props = {
    appId: string;
    borderable?: boolean
}

const ScreenView = ({ appId, borderable }: Props) => {
    const app = App.get(appId) as AppProps
    let Render: any = () => <></>
    if (app?.render) Render = app.render

    return (
        <Transition duration={200}>
            <Stack
                width="100%"
                height="100%"
                overflow="hidden"
                onClick={() => {
                    Window.setActiveApp(app.id)
                }}
                borderRight={borderable ? 1 : 0}
                onContextMenu={(e) => {
                    const items: any = [
                        {
                            label: "Split Window",
                            onClick: () => {

                            },
                        },
                        ...(app?.iconContextMenu || []),
                        {
                            divider: true,
                            label: "Exit App",
                            onClick: () => Window.closeApp(appId),
                        },
                    ]
                    const win = Window.getActiveWindow()
                    if (win && win.apps.length > 1) {
                        items.push({
                            label: "Exit Window",
                            onClick: () => {
                                win && Window.close(win._id)
                            },
                        })
                    }

                    if (!isElementWritable(e.target)) {
                        ContextMenu(e, items)
                    }
                }}
            >
                <Render />
            </Stack>
        </Transition>
    )
}

export default withStore(ScreenView)