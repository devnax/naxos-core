import React from 'react'
import Stack from 'naxui/Stack'
import ViewBox from 'naxui/ViewBox'
import Text from 'naxui/Text'
import List from 'naxui/List'
import ListItem from 'naxui/ListItem'
import Button from 'naxui/Button'
import Avatar from 'naxui/Avatar'
import IconButton from 'naxui/IconButton'
import Menu from 'naxui/Menu'
import ActionIcon from 'naxui-icons/round/MoreVert'
import RemoveIcon from 'naxui-icons/round/Delete'
import MarkAsReadIcon from 'naxui-icons/round/Check'
import Notification from '.'
import { withStore } from 'state-range'
import Toast from 'naxui/Toast'

const _NotificationItem = ({ id }) => {
    const notification = Notification.findFirst({ id })
    if (!notification) return <></>
    const register = Notification.getRegister(notification.type)
    if (!register) return <></>
    const registerProps = register(notification.data)

    return (
        <ListItem
            alignItems="flex-start"
            startIcon={<Avatar
                src={notification.image}
                size={50}
            />}

            sx={{
                '& .action-button': {
                    display: "none",
                },
                '&:hover .action-button': {
                    display: "block"
                }
            }}
            position="relative"
            onClick={() => {
                registerProps.onClick && registerProps.onClick(notification.data)
                Notification.update({ read: true }, { id: notification.id })
            }}
        >
            {
                !notification.read && <Stack
                    width={10}
                    height={10}
                    radius={10}
                    bgcolor="color.primary"
                    position="absolute"
                    top={0}
                    left={0}
                ></Stack>
            }
            <div dangerouslySetInnerHTML={{ __html: notification.content }} />
            <Text fontSize="fontsize.button" variant='subtext'>{notification.time}</Text>
            <Stack flexRow justifyContent="space-between" alignItems="center" mt={1}>
                <Stack flexRow gap={12} flex={1}>
                    {
                        registerProps.buttons?.map((b, idx) => {
                            return (
                                <Button
                                    size="small"
                                    key={idx}
                                    color={b.filled === false ? "paper" : "primary"}
                                    onClick={() => {
                                        b.onClick(notification.data)
                                    }}
                                >
                                    {b.text}
                                </Button>
                            )
                        })
                    }
                </Stack>
                <Stack>
                    <IconButton
                        position="absolute"
                        bottom={5}
                        right={5}
                        size={20}
                        className='action-button'
                        onClick={(e: any) => {
                            Menu.open(e.target, <List width={180}>
                                <ListItem
                                    startIcon={<MarkAsReadIcon />}
                                    onClick={() => {
                                        Notification.update({ read: true }, { id: notification.id })
                                        Menu.close()
                                        Toast.close(notification.id.toString())
                                    }}
                                >Mark as Read</ListItem>
                                <ListItem
                                    startIcon={<RemoveIcon />}
                                    onClick={() => {
                                        Notification.delete({ id: notification.id })
                                        Menu.close()
                                        Toast.close(notification.id.toString())
                                    }}
                                >Remove</ListItem>
                            </List>)
                        }}
                    >
                        <ActionIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </ListItem>
    )
}

export const NotificationItem = withStore(_NotificationItem)

const NotificatioView = () => {
    const notifications = Notification.getAll()
    return (
        <ViewBox
            height="100%"
            header={
                <Text p={1} px={2} variant='h6'>Notifications</Text>
            }
        >
            {!!notifications.length ? <List mt={2} px={1}>
                {
                    notifications.map(n => <NotificationItem key={n.id} id={n.id} />)
                }
            </List> : <Text variant='subtext' opacity={.5} textAlign="center" p={5} userSelect="none">No Notifications</Text>}
        </ViewBox>
    )
}


export default withStore(NotificatioView)