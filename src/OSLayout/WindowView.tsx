import React from "react";
import Screen from "../Handlers/Screen";
import ScreenView from "./ScreenView";
import Window from "../Handlers/Window";
import { withStore } from "state-range";
import ViewBox from "naxui/ViewBox";

type Props = {
    windowId: string;
}

const WindowView = ({ windowId }: Props) => {
    const win: any = Window.get(windowId)
    const activeWindow: any = Window.getActive(win.appType)
    const screens = Screen.getAll(windowId)
    let isActive = windowId === activeWindow._id

    return (
        <ViewBox
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
            onClick={() => {
                Window.setActive(windowId)
            }}
            zIndex={1}
            visibility={isActive ? "visible" : "hidden"}
        >
            {
                screens.map(screen => {
                    return <ScreenView key={screen._id} screenId={screen._id} />
                })
            }
        </ViewBox>
    )
}

export default withStore(WindowView)