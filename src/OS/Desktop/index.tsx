import Button from 'naxui/Button'
import Stack from 'naxui/Stack'
import Text from 'naxui/Text'
import React from 'react'
import Notification from '../../Notification'

Notification.register("as", () => {
    return {

    }
})

const Desktop = () => {
    return (
        <Stack>
            <Text variant='h1'>Desktop</Text>
            <Button onClick={() => {
                Notification.push("as", {
                    content: "<b>Naxrul Ahmed</b> send you a friend request",
                    image: "https://mui.com/static/images/avatar/2.jpg",
                    id: 1,
                    time: "2min ago",
                    data: {},
                })

            }}>Notify</Button>
        </Stack>
    )
}

export default Desktop