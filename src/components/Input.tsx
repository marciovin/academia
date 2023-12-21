import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

type Props = IInputProps & {
  errormessage?: string | null

}

export function Input({ errormessage = null, isInvalid, ...rest }: Props) {
  const Invalid = !!errormessage || isInvalid;

  return (
    <FormControl isInvalid={Invalid} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color='white'
        fontFamily="body"
        placeholderTextColor="gray.300"
        isInvalid={Invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red'
        }}
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: "green.500"
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>
        {errormessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}