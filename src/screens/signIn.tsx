import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignIn(){
  return(
    <ScrollView contentContainerStyle={{ flexGrow: 1}} showsHorizontalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700" px={10}>
        <Image
        source={BackgroundImg}
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

          <Input placeholder='Digite seu E-mail'
          keyboardType='email-address'
          autoCapitalize='none'
          />

          <Input placeholder='Digite sua senha'
          secureTextEntry
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
          />
        </Center>
      </VStack>
    </ScrollView> 
  );
}