import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth'
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';

const signUpSchema = yup.object({
  email: yup.string().required('Informe o e-mail').email('Email invalido'),
  password: yup.string().required('Informe a senha').min(6, 'A senhe deve ter no minimo 6 digitos'),
})

type FormData = {
  email: string,
  password: string,
}



export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const toast = useToast();


  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true)
      await signIn(email, password);

    } catch (error) {
      console.log(error)
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível entrar';

      setIsLoading(false)

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }

  }




  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate("signUp")
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
      <VStack flex={1} px={10}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt='imagem de fundo de pessoas treinando'
          resizeMode='contain'
          position='absolute'
        />

        <Center my={24}>

          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            treine sua mente e seu corpo
          </Text>

        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name='email'
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder='Digite seu E-mail'
                keyboardType='email-address'
                onChangeText={onChange}
                errormessage={errors.email?.message}
                autoCapitalize='none'
              />
            )}
          />


          <Controller
            control={control}
            name='password'
            rules={{ required: 'Informe a senha' }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder='Digite sua senha'
                onChangeText={onChange}
                errormessage={errors.password?.message}
                secureTextEntry
              />
            )}
          />

          <Button
            title='Acessar conta'
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />

        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem conta?
          </Text>

          <Button
            title='Criar conta'
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}