import { UserPhoto } from '@components/UserPhoto';
import { ScreenHeader } from '@components/screenHeader';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import {TouchableOpacity} from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react'
import { Center, ScrollView, VStack, Skeleton, Text, Heading } from 'native-base';

const PHOTO_SIZE = 33;

export function Profile(){
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState("https://github.com/marciovin.png")

  async function handleUserPhotoSelect() {
    
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [
          4, 4
        ],
        allowsEditing: true
      });
      if(photoSelected.canceled) {
        return;
      }

      setUserPhoto(photoSelected.assets[0].uri);
  }

  catch (error) {
      console.log(error)
    }
  }
    
     
  return(
    <VStack flex={1} >
      <ScreenHeader title='Perfil'/>

      <ScrollView > 

        <Center mt={8} px={10}>  
          {
            photoIsLoading ?

          <Skeleton 
          w={PHOTO_SIZE} 
          h={PHOTO_SIZE} 
          rounded={'full'}
          startColor={'gray.600'}
          endColor={'gray.400'}
          />

            :

        <UserPhoto 
        source={{ uri: userPhoto}}
         alt='eu Marcinho'
         size={PHOTO_SIZE}
         />
        }

        <TouchableOpacity onPress={handleUserPhotoSelect}>
          <Text color={'green.500'} fontSize={'md'} fontFamily={'heading'} mt={2} mb={8}> 
          Altere sua foto
          </Text>
        </TouchableOpacity>

        <Input 
        bg={"gray.600"}
        placeholder='Nome'/>

        <Input 
        bg={"gray.500"}
        placeholder='E-mail'
        isDisabled
        />

      </Center>
      <VStack px={10} mt={12} mb={9}>
          <Heading color={'gray.200'} fontSize={'md'} mb={2}>
            Alterar senha
          </Heading>

        <Input 
        placeholder='Antiga Senha'
        bg={'gray.600'}
        secureTextEntry
        mb={2}
        />

        <Input 
        placeholder='Nova Senha'
        bg={'gray.600'}
        secureTextEntry
        />

        <Input 
        placeholder='Confirmar a nova Senha'
        bg={'gray.600'}
        secureTextEntry
        />

          <Button 
          title='Atualizar'
          mt={4}
          />

        </VStack>

      </ScrollView>

    </VStack>
  ) 
}