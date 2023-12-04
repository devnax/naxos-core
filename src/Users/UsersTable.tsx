import React from 'react'
import Stack from 'naxui/Stack'
import ViewBox from 'naxui/ViewBox'
import Avatar from 'naxui/Avatar'
import Chip from 'naxui/Chip'
import Button from 'naxui/Button'
import DataTable from 'naxui/Datatable'
import IconEdit from 'naxui-icons/round/Edit'
import IconDelete from 'naxui-icons/round/Delete'
import IconAdd from 'naxui-icons/round/Add'
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
            header={(
                <Stack
                    p={1}
                    height={60}
                    justifyContent="space-between"
                    alignItems="center"
                    flexRow
                >
                    <Text variant='h4'>Users</Text>
                    <Button startIcon={<IconAdd />}>Add User</Button>
                </Stack>
            )}
        >
            <DataTable
                fixedHeader
                columns={columns}
                rows={Users as any}
                disableRow={(row) => {
                    if (row.role.toLowerCase() === 'admin') {
                        return true
                    }
                }}
                rowAction={(row) => {
                    return [
                        {
                            label: "Edit",
                            icon: <IconEdit />
                        },
                        {
                            label: "Delete",
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
                    row.role = <Chip label={row.role} color={"paper"} variant="filled" />
                    return row
                }}

                filters={{
                    role: [
                        { label: "Admin", value: "admin" },
                        { label: "Editor", value: "editor" },
                        { label: "Customer", value: "customer" },
                    ],
                    status: [
                        { label: "Active", value: "active" },
                        { label: "Deactive", value: "Deactive" },
                        { label: "Pending", value: "Pending" },
                    ]
                }}

            />
        </ViewBox>
    )
}


export default UsersTable