import { HStack, Heading, Image, VStack, Text, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {

}

export function ExerciseCard({... rest}: Props) {
     return (
     <TouchableOpacity>
          <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
               <Image 
               source={{ uri: 'https://th.bing.com/th/id/OIP.7MDS174h4XQwYg423jJ8mAHaFf?rs=1&pid=ImgDetMain'}}
               alt="Jean"
               w={16}
               h={16}
               rounded='md'
               mr={4}
               resizeMode="center"
               />

               <VStack flex={1}>
                    <Heading fontSize="lg" color="white">
                         Remada unilateral
                    </Heading>

                    <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
                         3 séries x 12 repetições
                    </Text>
               </VStack>

               <Icon as={Entypo} name="chevron-thin-right" color="gray.300"/>
          </HStack>
     </TouchableOpacity>
     
     );
}