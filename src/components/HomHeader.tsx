import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";

export function HomeHeader(){
    return(
        <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
            <UserPhoto 
            size={16}
            source={{ uri: 'https://github.com/marciovin.png'}}
            alt="Eu mesmo"
            mr={4}
            />

            <VStack flex={1}>
            <Text color="gray.100" fontSize="md">
                Olá,
            </Text>

            <Heading color="gray.100" fontSize="md">
                Marcinho
            </Heading>
            </VStack>

            <TouchableOpacity>
            <Icon 
            as={MaterialIcons}
            name="logout"
            color="red.500"
            size={7}
            />
            </TouchableOpacity>
        </HStack>
    )
}