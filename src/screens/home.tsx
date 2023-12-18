import { Button } from "@components/Button";
import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomHeader";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { api } from "@services/api";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { VStack, FlatList, HStack, Heading, Text, useToast } from "native-base";
import { useState,useEffect, useCallback } from "react";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

export function Home(){
  const [isLosding, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([])
  const [execises, setExecises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('costa');

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(execiseId:string) {
    navigation.navigate('execise', {execiseId});
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups')
      setGroups(response.data)

    }catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi pssivel carregar os grupos';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.600'
      })

    }

  }

  async function fetchExerciseByGroup() {
    try{
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`); 
      setExecises(response.data);

    }catch(error){
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi pssivel carregar os exercicios';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.600'})
    }finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    fetchGroups();
  },[]);

  useFocusEffect(useCallback(() => {
    fetchExerciseByGroup()
  }, [groupSelected]));

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
     minH={10}
      />

        {

        isLosding ? <Loading/> 
        
        :

    <VStack flex={1} px={8}>
      <HStack justifyContent="space-between">
        <Heading color="gray.200" fontSize="md">
            Exercicios
        </Heading>

        <Text color="gray.200" fontSize="sm">
          {execises.length}
        </Text>
      </HStack>

        <FlatList 
          data={execises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            < ExerciseCard
              onPress={() => handleOpenExerciseDetails(item.id)}
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20}}
        />
         </VStack>


         }

       </VStack>
  )
}