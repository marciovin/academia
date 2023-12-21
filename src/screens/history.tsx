import { useState } from 'react'

import { ScreenHeader } from '@components/screenHeader';
import { HistoryCard } from "@components/HistoryCard"

import { Heading, VStack, Text, SectionList } from 'native-base';

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ['Puxada frontal', 'Remada unilateral']
    },
    {
      title: '27.08.22',
      data: ['Puxada frontal']
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico de Exercícios' />

      <SectionList

        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
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
      />

    </VStack>
  );
}