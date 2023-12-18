import { VStack, Text, Center, Heading, ScrollView, Icon, HStack, Image, Box, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';

import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg'

import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import BodySvg from '@assets/body.svg'
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';

  type RouteParamsProps = {
  exerciseId: string;
} 

export function Execise(){
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();

  const toast = useToast();

  const {exerciseId} = route.params as RouteParamsProps; 
  console.log("ID =>", exerciseId)

  function handleGoBack(){
    navigation.goBack()
  }


  async function fetchExerciseDetails() {
    try {
      
    } catch (error){
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possivel carregar os detalhes do exercicios';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.600'})  
    }

  }


  return(
    <VStack flex={1} > 
    
    <VStack px={8} bg={'gray.600'} pt={12}>
    <TouchableOpacity onPress={handleGoBack}>
      <Icon as={Feather} name='arrow-left' color={'green.500'} size={6}/>
    </TouchableOpacity>

    <HStack justifyContent={'space-between'} mt={4} mb={8} alignItems={'center'}>
      <Heading color={"gray.100"} fontSize={'lg'} flexShrink={1}>
        Puxada frontal
      </Heading> 

      <HStack alignItems={'center'}> 
        <BodySvg />
        <Text color={'gray.200'} ml={1} textTransform={'capitalize'}>
        costas
      </Text>
      </HStack>
      </HStack>
       </VStack>
       <ScrollView>
      <VStack p={8}>
        <Image
        w={'full'}
        h={80}
        source={{ uri: "https://th.bing.com/th/id/OIP.DODI09F_rXRDiS-ejljVfAHaE8?rs=1&pid=ImgDetMain"}}
        alt='exercicio'
        mb={3}
        resizeMode='cover'
        rounded={'lg'}
        />

         <Box bg={'gray.600'} rounded={'md'} pb={4} px={4}>
      <HStack alignItems={'center'} justifyContent={'space-around'} mb={6} mt={5}>
    <HStack>
      <SeriesSvg />
      <Text color={'gray.200'} ml={'2'}>
        3 séries
      </Text>

    </HStack>

    <HStack>
      <RepetitionsSvg />
      <Text color={'gray.200'} ml={'2'}>
        12 repetiçõwes
      </Text>

    </HStack>
    </HStack>

    <Button title='marca como realizado'/>
    </Box>
      </VStack>
      </ScrollView>
       </VStack>
  )
}