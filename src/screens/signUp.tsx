import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView, useToast} from 'native-base';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { api } from '@services/api';
import axios from 'axios'

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

import { useForm, Controller, set } from 'react-hook-form';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Alert } from 'react-native';
import { AppError } from '@utils/AppError';
import { useAuth } from '@hooks/useAuth';


type FormDataProps = {
  name: string,
  email: string,
  password: string,
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('Email invalido'),
  password: yup.string().required('Informe a senha').min(6, 'A senhe deve ter no minimo 6 digitos'),
  password_confirm: yup.string().required('comfirme a senha').oneOf([yup.ref('password'), ''], 'Confirmação incorreta'),
})

export function SignUp(){
  const [isLoading, setIsLoading] = useState(false);


  const toast = useToast();
  const { signIn } = useAuth()

  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigation = useNavigation()

  function handleGoBack(){
    navigation.goBack();
  }

 async function handleSignUp({name ,email, password}: FormDataProps) {
  try{
    setIsLoading(true);

    await api.post('/users', {name,email,password})
    await signIn(email, password);
        
  }catch(error){  
    setIsLoading(false);
   const isAppError = error instanceof AppError;

   const title = isAppError ? error.message : 'Não foi possivel criar conta. Tente novamente mais tarde.'

   toast.show({
    title,
    placement: 'top',
    bgColor: 'red.500'
   })

    }
  }


  return(
    <ScrollView contentContainerStyle={{ flexGrow: 1}} showsHorizontalScrollIndicator={false}>
      <VStack flex={1} px={10}>
        <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt='imagem de fundo de pessoas treinando'
        resizeMode='contain'
        position='absolute'
        />

        <Center my={24}>

          <LogoSvg/>

         <Text color="gray.100" fontSize="sm">
           treine sua mente e seu corpo
          </Text> 

        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

        <Controller 
        control={control}
        name='name'
          render={({ field: {onChange, value} }) => (
          <Input
          placeholder='Qual é o seu nome?'
          onChangeText={onChange}
          value={value}
          errormessage={errors.name?.message}
         />

        )}
        />


        <Controller 
        control={control}
        name='email'
          render={({ field: {onChange, value} }) => (
          <Input placeholder='Coloque seu E-mail'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={onChange}
          value={value}
          errormessage={errors.email?.message}
          />
        )}
        />

        <Controller 
        control={control}
        name='password'
          render={({ field: {onChange, value} }) => (
          <Input placeholder='Crie sua senha'
          secureTextEntry
          onChangeText={onChange}
          value={value}
          errormessage={errors.password?.message}
          />
        )}
        />
         
        <Controller 
        control={control}
        name='password_confirm'
        render={({ field: {onChange, value} }) => (
          <Input placeholder='Confirma sua senha'
          secureTextEntry
          onChangeText={onChange}
          value={value}
          onSubmitEditing={handleSubmit(handleSignUp)}
          returnKeyType='send'
          errormessage={errors.password_confirm?.message}
          />
        )}
        />

          <Button title='Criar e Acessar'
          onPress={handleSubmit(handleSignUp)}
          isLoading={isLoading}
          />

        </Center>

         
          <Button 
          title='Voltar para o login' 
          variant="outline"
          mt={16}
          onPress={handleGoBack}
          />
      </VStack>
    </ScrollView> 
  );
}