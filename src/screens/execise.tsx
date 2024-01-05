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
import { api } from '@services/api';
import { useEffect, useState } from 'react';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Loading } from '@components/Loading';

type RouteParamsProps = {
  exerciseId: string;
}

export function Execise() {
  const [sendingRegister, setSendingRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExeercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();

  const toast = useToast();

  const { exerciseId } = route.params as RouteParamsProps;
  
  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExeercise(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possivel carregar os detalhes do exercicio.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.600'
      })
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);

      await api.post('/history', { exercise_id: exerciseId })

      toast.show({
        title: 'exercicio registrado',
        placement: 'top',
        bgColor: 'green.600'
      });

      navigation.navigate('history');

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possivel carregar o histórico de exercicio.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.600'
      })
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId])

   return (
    <VStack flex={1} >

      <VStack px={8} bg={'gray.600'} pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name='arrow-left' color={'green.500'} size={6} />
        </TouchableOpacity>
        {exercise.demo && (
          <HStack justifyContent={'space-between'} mt={4} mb={8} alignItems={'center'}>
            <Heading color={"gray.100"} fontSize={'lg'} flexShrink={1}>
              {exercise.name}
            </Heading>

            <HStack alignItems={'center'}>
              <BodySvg />
              <Text color={'gray.200'} ml={1} textTransform={'capitalize'}>
                {exercise.group}
              </Text>
            </HStack>
          </HStack>
        )}
      </VStack>

      {isLoading ? <Loading /> :
        <VStack p={8}>
          <Image
            w={'full'}
            h={80}
            source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
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
                  12 repetições
                </Text>

              </HStack>
            </HStack>

            <Button
              title='Marca como realizado'
              isLoading={sendingRegister}
              onPress={handleExerciseHistoryRegister}
            />
          </Box>
        </VStack>
      }
    </VStack>
  )
} 