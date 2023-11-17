import React from 'react'
import Avatar from 'naxui/Avatar'
import Divider from 'naxui/Divider'
import List from 'naxui/List'
import ListItem from 'naxui/ListItem'
import AppsIcon from 'naxui-icons/round/Apps'
import WidgetsIcon from 'naxui-icons/round/SpaceDashboard'
import FinderIcon from 'naxui-icons/round/Search'
import NotificationsIcon from 'naxui-icons/round/Notifications'
import SettingsIcon from 'naxui-icons/round/Settings'
import UsersIcon from 'naxui-icons/round/People'
import AboutIcon from 'naxui-icons/round/Info'
import LogoutIcon from 'naxui-icons/round/Logout'

import AppsDrawer from '../../AppsDrawer'


const OSMenu = () => {
    return (
        <List
            width={250}
            p={1}
            sx={{
                "& .ui-list-item": {
                    py: .7,
                    px: .6
                },
                '& .ui-list-item .ui-text': {
                    // fontSize: "fontsize.button"
                },

            }}
        >
            <ListItem
                startIcon={<Avatar src="https://mui.com/static/images/avatar/2.jpg" />}
                subtitle="Admin"
            >
                Naxrul Ahmed
            </ListItem>
            <Divider />
            <ListItem
                startIcon={<AppsIcon />}
                onClick={() => {
                    AppsDrawer.open()
                }}
            >
                Apps
            </ListItem>
            <ListItem
                startIcon={<WidgetsIcon />}
            >
                Widgets
            </ListItem>
            <ListItem
                startIcon={<FinderIcon />}
            >
                Finder
            </ListItem>
            <ListItem
                startIcon={<NotificationsIcon />}
            >
                Notification
            </ListItem>
            <ListItem
                startIcon={<SettingsIcon />}
            >
                Settings
            </ListItem>
            <ListItem
                startIcon={<UsersIcon />}
            >
                Users
            </ListItem>
            <ListItem
                startIcon={<AboutIcon />}
            >
                About OS
            </ListItem>
            <Divider />
            <ListItem
                startIcon={<LogoutIcon />
                }
                color="error">Logout
            </ListItem>
        </List>
    )
}

export default OSMenu