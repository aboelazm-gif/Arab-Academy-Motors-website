import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'
import React from 'react'
import "../styles/loginModal.css";

const CustomModal = ({triggerContent,variant}) => {
    const { isOpen, onOpen, onClose } = useDisclosure() 
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const signupContent = <form action="">
            <ModalBody p={10}>
              <FormControl >
                <FormLabel>Email</FormLabel>
                <Input
                 ref={initialRef}
                 type='email'
                 required
                 placeholder='Enter your Email'
                 fontFamily="cairo"
                 fontSize={15}
                 border="1px solid rgb(0,100,100)"
                 borderRadius={50}
                 width="97%"
                 padding="0 0 0 10px"
                />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Create Password</FormLabel>
                <Input
                 required
                 placeholder='Create your password'
                 fontFamily="cairo"
                 fontSize={15}
                 border="1px solid rgb(0,100,100)"
                 borderRadius={50}
                 width="97%"
                 padding="0 0 0 10px"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                 required
                 placeholder='Confirm your password'
                 fontFamily="cairo"
                 fontSize={15}
                 border="1px solid rgb(0,100,100)"
                 borderRadius={50}
                 width="97%"
                 padding="0 0 0 10px"
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter
             borderRadius="0 0 20px 20px"
             bg="rgba(40, 75, 95, 0.2)"
            >
              <Button
                type='submit' 
                colorScheme='blue' 
                mr={3}
                borderRadius="50px"
                m="10px 10px 0 0"
                border="0"
                backgroundColor="rgb(0,225,200)"
                color="rgb(0,100,100)"
                w="70px"
                fontFamily="Cairo"
                fontSize="1rem"
                fontWeight="bold"
              >
                Save
              </Button>
              <Button 
                onClick={onClose}
                colorScheme='blue' 
                mr={3}
                borderRadius="50px"
                m="10px 10px 0px 0"
                border="0"
                backgroundColor="rgb(0,225,200)"
                color="rgb(0,100,100)"
                w="70px"
                fontFamily="Cairo"
                fontSize="1rem"
                fontWeight="bold"
              >
                Cancel</Button>
            </ModalFooter>
            </form>

    const loginContent=<form action="">
            <ModalBody p={10}>
              <FormControl >
                <FormLabel>Email</FormLabel>
                <Input
                 ref={initialRef}
                 type='email'
                 required
                 placeholder='Enter your Email'
                 fontFamily="cairo"
                 fontSize={15}
                 border="1px solid rgb(0,100,100)"
                 borderRadius={50}
                 width="97%"
                 padding="0 0 0 10px"
                />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                 required
                 placeholder='Enter your password'
                 fontFamily="cairo"
                 fontSize={15}
                 border="1px solid rgb(0,100,100)"
                 borderRadius={50}
                 width="97%"
                 padding="0 0 0 10px"
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter
             borderRadius="0 0 20px 20px"
             bg="rgba(40, 75, 95, 0.2)"
            >
              <Button
                type='submit' 
                colorScheme='blue' 
                mr={3}
                borderRadius="50px"
                m="10px 10px 0 0"
                border="0"
                backgroundColor="rgb(0,225,200)"
                color="rgb(0,100,100)"
                w="70px"
                fontFamily="Cairo"
                fontSize="1rem"
                fontWeight="bold"
              >
                Save
              </Button>
              <Button 
                onClick={onClose}
                colorScheme='blue' 
                mr={3}
                borderRadius="50px"
                m="10px 10px 0px 0"
                border="0"
                backgroundColor="rgb(0,225,200)"
                color="rgb(0,100,100)"
                w="70px"
                fontFamily="Cairo"
                fontSize="1rem"
                fontWeight="bold"
              >
                Cancel</Button>
            </ModalFooter>
            </form>
  
    return (
      <>
        <Button
        className={variant=="login"?"login-button":""}
         onClick={onOpen}
         border={variant=="login"?"2px solid rgb(0, 225, 200)":"0"}
         borderRadius={30}
         height={45}
         p="5px 0px"
         m="0 10px 0 0"
         >
          {triggerContent}
        </Button>
  
        <Modal
         initialFocusRef={initialRef}
         finalFocusRef={finalRef}
         isOpen={isOpen}
         onClose={onClose}
         size="md"
         isCentered
        >
          <ModalOverlay
           bg="rgba(5,25,25,0.5)"
           backdropFilter="blur(10px)"
           zIndex={2}
           />
          <ModalContent 
          borderRadius='20px' 
          bg="rgba(35,45,55,0.3)"
          maxW="400px"
          h="250px"
          mx={4}
          position="relative"
          top="300px"
          >
            <ModalHeader p="10px 0 10px 15px"
             bg="rgba(40, 75, 95, 0.2)"
             borderRadius="20px 20px 0 0"
             fontWeight="bold"
             fontSize={18}
             >{variant=="login"?"Sign in to your account":(variant=="signup"?"Create an account":"")}
              <ModalCloseButton
               display="inline-block"
               textAlign="center"
               backgroundColor="rgba(0,225,200,1)"
               border="none"
               m={variant=="login"?"0 0 0 165px":(variant=="signup"?"0 0 0 200px":"")}
               padding="6px 10px"
               borderRadius={10}
               color="rgb(0, 100, 100)"
              />
            </ModalHeader>
            {variant=="login"?loginContent:(variant=="signup"?signupContent:null)}
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default CustomModal;