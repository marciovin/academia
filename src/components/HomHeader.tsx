import DefaultUserPhoto from '@assets/userPhotoDefault.png'
import { MaterialIcons } from '@expo/vector-icons'
import { useAuth } from '@hooks/useAuth'
import { Heading, HStack, Icon, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'

import { UserPhoto } from './UserPhoto'
import { api } from '@services/api'

export function HomeHeader() {
  const { user, signOut } = useAuth()

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        size={16}
        source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : DefaultUserPhoto}
        alt="foto do avatar"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="red.500" size={7} />
      </TouchableOpacity>
    </HStack>
  )
}
