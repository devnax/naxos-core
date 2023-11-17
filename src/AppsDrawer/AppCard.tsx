import Stack from "naxui/Stack";
import React from "react";
import AppsDrawer from ".";
import Window from "../Handlers/Window";


const AppCard = ({ icon: Icon, name, appId }) => {
    return (
        <Stack
            width={100}
            height={100}
            radius={2}
            bgcolor="color.paper.light"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            hover={{
                shadow: 10
            }}
            onClick={() => {
                AppsDrawer.close()
                Window.setActiveApp(appId)
            }}
        >
            <Icon />
        </Stack>
    )
}

export default AppCard