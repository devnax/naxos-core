import React from 'react'
import Stack from 'naxui/Stack'
import IconEdit from 'naxui-icons/round/Edit'
import IconDelete from 'naxui-icons/round/Delete'
import IconLink from 'naxui-icons/round/Link'
import Text from 'naxui/Text'
import Label from 'naxui/Label'
import IconButton from 'naxui/IconButton'
import Switch from 'naxui/Switch'
import Modal from 'naxui/Modal'
import RoleForm from './RoleForm'
import Permission from '../../Permission'

const RoleItem = ({ name }) => {
    return (
        <Stack
            p={1.5}
            bgcolor="color.paper.light"
            flexRow
            alignItems="center"
            justifyContent="space-between"
            borderBottom={1}
            hover={{
                bgcolor: "color.primary.soft"
            }}
        >
            <Stack width={200}>
                <Text fontWeight={500} >{name}</Text>
                <Text variant='subtext' fontSize="fontsize.button">Created on May 20, 2023</Text>
            </Stack>
            <Label>
                <Switch
                    bgcolor="color.paper.light"
                />
                <Text fontWeight={400}>Active</Text>
            </Label>
            <Stack
                flexRow
                alignItems="center"
                gap={3}
            >
                <IconButton size={30}
                    onClick={() => {
                        Modal.open("role-form", <RoleForm editId={1} />, {
                            closeOnClickOutside: false,
                            rootProps: {
                                width: 400
                            }
                        })
                    }}
                >
                    <IconEdit fontSize={22} />
                </IconButton>
                <IconButton
                    color="warning"
                    size={30}
                    onClick={() => {
                        Permission.open()
                    }}
                >
                    <IconLink fontSize={22} />
                </IconButton>
                <IconButton color="error" size={30}>
                    <IconDelete fontSize={22} />
                </IconButton>

            </Stack>
        </Stack>
    )
}

export default RoleItem