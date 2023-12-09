import React from 'react'
import Stack from 'naxui/Stack'
import ViewBox from 'naxui/ViewBox'
import Button from 'naxui/Button'
import IconAdd from 'naxui-icons/round/Add'
import Text from 'naxui/Text'
import Container from 'naxui/Container'
import Modal from 'naxui/Modal'
import RoleItem from './RoleItem'
import RoleForm from './RoleForm'

const RoleTable = () => {
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
                    mb={4}
                >
                    <Text variant='h4'>Roles</Text>
                    <Button
                        startIcon={<IconAdd />}
                        onClick={() => {
                            Modal.open("role-form", <RoleForm />, {
                                closeOnClickOutside: false,
                                rootProps: {
                                    width: 400
                                }
                            })
                        }}
                    >Add Role</Button>
                </Stack>
            )}
        >
            <Container >
                <Stack border={1} radius={1} overflow="hidden">
                    <RoleItem name="Admin" />
                    <RoleItem name="Student" />
                    <RoleItem name="Customer" />
                    <RoleItem name="Stuff" />
                </Stack>
            </Container>
        </ViewBox>
    )
}


export default RoleTable