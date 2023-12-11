import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import {useAuth} from '@hooks/useAuth'
import { useForm, Controller } from 'react-hook-form';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

import { Input } from '@components/Input';
import { Button } from '@components/Button';


type FormData = {
  email: string,
  password: string,
}

export function SignIn(){
  const {setUser} = useAuth(); 

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const {control, handleSubmit, formState: { errors }} = useForm<FormData>();

  function handleNewAccount(){
    navigation.navigate("signUp")
  }

  function handleSignIn({ email, password}: FormData) {
    setUser({
      id: '',
      name: '',
      email,
      avatar: '',
    })
  }


  return(
    <ScrollView contentContainerStyle={{ flexGrow: 1}} showsHorizontalScrollIndicator={false}>
      <VStack flex={1}  px={10}>
        <Image
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
            Acesse sua conta
          </Heading>

        <Controller
        control={control}
        name='email' 
        rules={{required: 'Informe o e-mail'}}
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
        rules={{required: 'Informe a senha'}}
        render={({ field: {onChange} }) => (
          <Input 
          placeholder='Digite sua senha'
          onChangeText={onChange}
          errormessage={errors.password?.message}
          secureTextEntry
          />
         )}
        />
          
          <Button title='Acessar conta'/>

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