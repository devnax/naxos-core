import React from 'react'
import Stack from 'naxui/Stack'
import ViewBox from 'naxui/ViewBox'
import Avatar from 'naxui/Avatar'
import Chip from 'naxui/Chip'
import DataTable from './Datatable'
import IconDelete from 'naxui-icons/round/Delete'

import { faker } from '@faker-js/faker'
import Text from 'naxui/Text'

enum Status { active = 'active', deactive = 'deactive', pending = 'pending' }
enum Roles { Admin = 'Admin', User = 'User', Editor = 'Editor' }
export function createRandomUser(id: number) {
    return {
        id,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        role: faker.helpers.enumValue(Roles),

        status: faker.helpers.enumValue(Status),
        joined: faker.date.past().toLocaleDateString("en-us", { month: "long", day: "numeric", year: "numeric" }),
    };
}

const Users = Array(30).fill(1).map((v, i) => createRandomUser(i))

const columns = [
    {
        label: "Name",
        field: "name"
    },
    {
        label: "Role",
        field: "role"
    },
    {
        label: "Status",
        field: "status"
    },
    {
        label: "Joined",
        field: "joined"
    },
]

const UsersTable = () => {
    return (
        <ViewBox
            height="100%"
            header={<Stack p={2} height={60} bgcolor="color.paper">

            </Stack>}
            footer={<Stack p={2} height={40} bgcolor="color.paper">

            </Stack>}
        >
            <DataTable
                columns={columns}
                rows={Users}

                rowAction={(row) => {
                    return [
                        {
                            label: "Edit",
                            icon: <IconDelete />
                        }
                    ]
                }}

                renderRow={(row) => {
                    row.name = <Stack flexRow alignItems="center" gap={16}>
                        <Avatar src={row.avatar} />
                        <Stack>
                            <Text lineHeight={1.3}>{row.name}</Text>
                            <Text variant='subtext' fontSize="fontsize.button">{row.email}</Text>
                        </Stack>
                    </Stack>

                    let color: any = "primary"
                    switch (row.status) {
                        case "active":
                            color = "success"
                            break;
                        case "deactive":
                            color = "error"
                            break;
                        case "pending":
                            color = "warning"
                            break;
                    }
                    row.status = <Chip label={row.status} color={color} variant="soft" />

                    let rolecolor: any = "primary"
                    switch (row.role) {
                        case "admin":
                            rolecolor = "success"
                            break;
                        case "deactive":
                            rolecolor = "error"
                            break;
                    }
                    row.role = <Chip label={row.role} color={"paper"} variant="filled" />
                    return row
                }}
            />
        </ViewBox>
    )
}


export default UsersTable