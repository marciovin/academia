import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomHeader";

import { VStack, FlatList, HStack, Heading, Text } from "native-base";
import { useState } from "react";

export function Home(){
  const [groups, setGroups] = useState(['costa', 'ombro', 'Biceps', 'Triceps'])
  const [execise, setExecise] = useState(['Puxada frontal', 'Remada curvada' ,'Remada unilateral', 'Levantamento terra'])
  const [groupSelected, setGroupSelected] = useState('costa')


  return(
    <VStack flex={1} > 
      <HomeHeader/>

      <FlatList 
      data={groups}
      keyExtractor={item => item}
      renderItem={({ item }) => (

        <Group 
        name={item}
        isActive={groupSelected === item}
        onPress={() => setGroupSelected(item)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      _contentContainerStyle={{ px: 8}}
      my={10}
      maxH={10}
      />

    <VStack flex={1} px={8}>
      <HStack justifyContent="space-between">
        <Heading color="gray.200" fontSize="md">
            Exercicios
        </Heading>

        <Text color="gray.200" fontSize="sm">
          {execise.length}
        </Text>
      </HStack>

        <FlatList 
          data={execise}
          keyExtractor={item => item}
          renderItem={({ item }) => ( 
          <ExerciseCard/> 
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20}}
        />
         </VStack>
       </VStack>
  )
}