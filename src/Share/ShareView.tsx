import React from "react";
import Stack from 'naxui/Stack'
import Text from "naxui/Text";


const ShareItem = () => {
    return (
        <Stack
            width={80}
            height={80}
            border={1}
            radius={1}
            cursor="pointer"
            flexShrink="0"
            hover={{
                bgcolor: "color.primary.soft"
            }}
        >
        </Stack>
    )
}

const ShareView = () => {
    return (
        <Stack justifyContent="flex-end" height="100%">
            <Text py={2} fontWeight={500} textAlign="center">Share</Text>
            <Stack
                p={2}
                flexRow
                flexWrap="nowrap"
                justifyContent="center"
                alignItems="center"
                gap={16}
                overflow="hidden"
                overflowX="auto"
                width="100%"
            >
                <ShareItem />
                <ShareItem />
                <ShareItem />
                <ShareItem />
                <ShareItem />
                <ShareItem />
            </Stack>
        </Stack>
    )
}

export default ShareView