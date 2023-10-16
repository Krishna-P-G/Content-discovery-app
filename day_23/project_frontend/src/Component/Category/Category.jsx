import React from 'react'
import {
    Box,
    Flex,
    MenuButton,
    Tooltip,
    useColorMode,
    useColorModeValue,
    MenuList,
    MenuItem,
    Menu,
    Button,
    MenuDivider
} from "@chakra-ui/react";
import { ArrowDownIcon, ChevronDownIcon,ArrowRightIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom";

const Category = ({ data }) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const bg = useColorModeValue("gray.600", "gray.300")
    return (
        <Flex cursor={'pointer'} my={"5"}>

            <Tooltip
                hasArrow
                placement="right"
                closeDelay={300}
                arrowSize={5}
                label={data.name}
                bg={bg}
            >
                <Box>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ArrowRightIcon />}>
                            {data.iconSrc}
                        </MenuButton>
                    </Menu>
                </Box>

            </Tooltip>


        </Flex>
    )
}

export default Category;