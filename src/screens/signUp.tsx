import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

import { Input } from '@components/Input';
import { Button } from '@components/Button';

const navigation = useNavigation()

function handleGoBack(){
  navigation.goBack();
}

export function SignUp(){
  return(
    <ScrollView contentContainerStyle={{ flexGrow: 1}} showsHorizontalScrollIndicator={false}>
      <VStack flex={1} px={10}>
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
            Crie sua conta
          </Heading>

          <Input
           placeholder='Qual é o seu nome?'
          
          />

          <Input placeholder='Coloque seu E-mail'
          keyboardType='email-address'
          autoCapitalize='none'
          />

          <Input placeholder='crie sua senha'
          secureTextEntry
          />

          <Button title='Criar e Acessar'/>

        </Center>

         
          <Button 
          title='Voltar para o login' 
          variant="outline"
          mt={24}
          onPress={handleGoBack}
          />
      </VStack>
    </ScrollView> 
  );
}