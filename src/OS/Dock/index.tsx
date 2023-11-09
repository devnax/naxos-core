import Stack from "naxui/Stack";
import ViewBox from "naxui/ViewBox";
import React from "react";
import DockIcon from "./DockIcon";
import { OSLayoutProps } from "..";
import App from "../../Handlers/App";
import IconButton from "naxui/IconButton";
import WindowStackIcon from 'naxui-icons/round/Layers'
import Window from "../../Handlers/Window";
import DashboardIcon from 'naxui-icons/round/Dashboard'


const Dock = ({ dockPosition, centerMode, dockBgcolor, logo }: OSLayoutProps) => {
    let isHorizental = dockPosition === "top" || dockPosition === "bottom"
    let apps = App.getApps()


    return (
        <ViewBox
            height={isHorizental ? 55 : "100%"}
            width={isHorizental ? "100%" : 55}
            bgcolor={dockBgcolor ?? "color.paper"}
            alignItems="center"
            justifyContent="center"
            py={isHorizental ? 0 : 1}
            px={isHorizental ? 1 : 0}
            header={
                <>
                    {!!logo && <Stack
                        mb={1}
                        height={isHorizental ? "100%" : "initial"}
                        width={isHorizental ? "initial" : "100%"}
                        alignItems="center"
                        flexDirection={isHorizental ? "row" : "column"}
                    >
                        {logo}
                    </Stack>}
                </>
            }
            footer={
                <Stack
                    gap={8}
                    height={isHorizental ? "100%" : "initial"}
                    width={isHorizental ? "initial" : "100%"}
                    alignItems="center"
                    flexDirection={isHorizental ? "row" : "column"}
                >
                    {
                        Window.getAll().length > 1 && <IconButton
                            corner="rounded"
                            onClick={() => {

                            }}
                            color="paper"
                        >
                            <WindowStackIcon />
                        </IconButton>
                    }

                    <IconButton
                        corner="rounded"
                        onClick={() => {

                        }}
                        color="paper"
                    >
                        <DashboardIcon />
                    </IconButton>
                </Stack>
            }
            direction={isHorizental ? "row" : "column"}
            flex="initial"
            scrollbarProps={{
                style: {
                    height: centerMode ? "auto" : "100%",
                    width: centerMode ? "auto" : "100%",
                    flex: centerMode ? "initial" : 1
                }
            }}
        >
            <Stack
                gap={8}
                height={isHorizental ? "100%" : "initial"}
                width={isHorizental ? "initial" : "100%"}
                alignItems="center"
                direction={isHorizental ? "row" : "column"}
            >
                {
                    apps.map(app => <DockIcon key={app._id} appId={app.id} />)
                }
            </Stack>
        </ViewBox>
    )
}

export default Dock