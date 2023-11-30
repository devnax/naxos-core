import React from "react";
import ScreenView from "./ScreenView";
import Window from "../Handlers/Window";
import { withStore } from "state-range";
import Stack from "naxui/Stack";
import { WindowStoreType } from "../Handlers/Window";
import Transition from "naxui/Transition";

type Props = {
    windowId: string;
}

const WindowView = ({ windowId }: Props) => {
    const win: WindowStoreType = Window.get(windowId) as any
    const activeWindow: any = Window.getActiveWindow()
    let isActive = windowId === activeWindow?._id

    return (
        <Transition in={isActive} duration={200}>
            <Stack
                id={win._id}
                width="100%"
                height="100%"
                overflow="hidden"
                flexRow
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                right={0}
                bgcolor='color.paper.light'
                onClick={() => Window.setActive(windowId)}
                zIndex={1}
                visibility={isActive ? "visible" : "hidden"}
            >
                {
                    win.apps.map((appId, idx) => {
                        const hasNext = !!win.apps[idx + 1]
                        return <ScreenView
                            key={windowId + appId}
                            appId={appId}
                            borderable={hasNext}
                        />
                    })
                }
            </Stack>
        </Transition>
    )
}

export default withStore(WindowView)