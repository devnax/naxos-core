import Stack from "naxui/Stack";
import ViewBox from "naxui/ViewBox";
import React from "react";
import DockIcon from "./DockIcon";
import { OSLayoutProps } from "..";
import App from "../../App";


const Dock = ({ dockPosition, appType, centerMode, dockBgcolor }: OSLayoutProps) => {
    let isHorizental = dockPosition === "top" || dockPosition === "bottom"
    let apps = App.getAllByType(appType)
    let endApps = App.getAllByType(appType, true)


    return (
        <ViewBox
            height={isHorizental ? 55 : "100%"}
            width={isHorizental ? "100%" : 55}
            bgcolor={dockBgcolor ?? "color.paper"}
            alignItems="center"
            justifyContent="center"
            py={isHorizental ? 0 : 1}
            px={isHorizental ? 1 : 0}
            footer={
                <Stack gap={8} height="100%" alignItems="center" flexDirection={isHorizental ? "row-reverse" : "column-reverse"}>
                    {
                        endApps.map(app => <DockIcon key={app._id} appId={app.id} />)
                    }
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
            <Stack height="100%" gap={8} alignItems="center" direction={isHorizental ? "row" : "column"}>
                {
                    apps.map(app => <DockIcon key={app._id} appId={app.id} />)
                }
            </Stack>
        </ViewBox>
    )
}

export default Dock