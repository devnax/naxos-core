import Button from 'naxui/Button'
import Stack from 'naxui/Stack'
import Text from 'naxui/Text'
import React from 'react'
import Notification from '../../Notification'
import ListView from '../../ListView'

Notification.register("as", () => {
    return {

    }
})

const Desktop = () => {
    return (
        <Stack height="100%">
            {/* <Text variant='h1'>Desktop</Text>
            <Button
                onClick={() => {
                    Notification.push("as", {
                        content: "<b>Naxrul Ahmed</b> send you a friend request",
                        image: "https://mui.com/static/images/avatar/2.jpg",
                        id: 1,
                        time: "2min ago",
                        data: {},
                    })

                }}>Notify</Button> */}

            <ListView
                title="Users"
                height="100%"
                centerMode
                list={[
                    { label: "General", value: "General", render: () => <Text>General</Text> },
                    { label: "Account", value: "Account", render: () => <Text>Account</Text> },
                    { label: "Billing", value: "Billing", render: () => <Text>Billing</Text> },
                    { label: "Appearance", value: "Appearance", render: () => <Text>Appearance</Text> },
                ]}
            />
        </Stack>
    )
}

export default Desktop