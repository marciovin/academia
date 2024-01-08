import { useCallback, useState } from 'react'

import { ScreenHeader } from '@components/screenHeader';
import { HistoryCard } from "@components/HistoryCard"
import { Loading } from '@components/Loading';
import { Heading, VStack, Text, SectionList, useToast, ScrollView } from 'native-base';
import { AppError } from '@utils/AppError';
import { api } from '@services/api';
import { useFocusEffect } from '@react-navigation/native';
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO';

export function History() {
  const [isLoading, setIsLosding] = useState(true)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLosding(true)

      const response = await api.get('/history')
      setExercises(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possivel carregar o histórico.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.600'
      })
    } finally {
      setIsLosding(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory()
  }, []));

  return (
    <ScrollView>
      <VStack flex={1}>

        <ScreenHeader title='Histórico de Exercícios' />

        {
          isLoading ? <Loading /> :
            <SectionList

              sections={exercises}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <HistoryCard data={item} />
              )}

              renderSectionHeader={({ section }) => (
                <Heading color={'gray.200'} fontSize={'md'} mt={10} mb={3}>
                  {section.title}
                </Heading>
              )}
              px={8}
              contentContainerStyle={[].length === 0 && { flex: 1, justifyContent: "center" }}
              ListEmptyComponent={() => (
                <Text color={'gray.100'} textAlign={'center'}>
                  Não há exercicios registrados por aqui ☹
                </Text>
              )}
            />}
      </VStack>
    </ScrollView>
  );
}