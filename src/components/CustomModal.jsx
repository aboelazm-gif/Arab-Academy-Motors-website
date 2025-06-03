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
import React, {useEffect, useState, useContext} from 'react'
import { userContext } from '../App';
import Register from '../firebase/register';
import "../styles/loginModal.css";
import signIn from '../firebase/signin';
import setData from '../firebase/setData';

const CustomModal = ({triggerContent,variant}) => {
    const { isOpen, onOpen, onClose } = useDisclosure() 
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const {setUser}=useContext(userContext);

    // MOVED STATE TO TOP - CRITICAL FIX
    const [formData, setFormData] = useState({
      email : "",
      password : "",
      confirm : "",
      name: ""
    })

    const checkPasswordsMatch = () => {
      return formData.password === formData.confirm;  // Fixed to use 'confirm'
    };

    const validatePassword = (password) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*?&])[A-Za-z\d@$!%_*?&]{8,}$/;
        return pattern.test(password);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    async function registration(e) {
      e.preventDefault();
        
      if (!checkPasswordsMatch()) {
        alert("Passwords do not match!");
          return;
      }
        
      if (!validatePassword(formData.password)) {
        alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%_*?&)");
          return;
      }
      const newUser = {name: formData.name, email: formData.email};

      const {result, error} = await Register(formData.email, formData.password, newUser);


      if(error!=null){
        alert(error);
        return;
      }
      
      
      setUser(result.user)
      onClose();
    }

    async function login(e) {
      e.preventDefault();
        
      const {result, error} = await signIn(formData.email, formData.password);
      if(error!=null){
        alert(error);
        return;
      }
      setUser(result.user)
      alert("Signed in successfully!");
      onClose();
    }

    // FIXED: Added onSubmit to form and removed incorrect onSubmit from button
    const signupContent =
    <form onSubmit={registration}>
            <ModalBody p={10}
            borderLeft="1px solid rgb(0, 100, 100)"
            borderRight="1px solid rgb(0, 100, 100)"
            >
              <FormControl >
                <FormLabel>Email</FormLabel>
                <Input
                name='email'
                value={formData.email}
                onChange={handleChange}
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
              <FormControl >
                <FormLabel>Username</FormLabel>
                <Input
                name='name'
                value={formData.name}
                onChange={handleChange}
                 ref={initialRef}
                 type='text'
                 required
                 placeholder='Enter your Username'
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
                name='password'
                onChange={handleChange}
                value={formData.password}
                type='password'  
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
                name='confirm'
                value={formData.confirm}
                onChange={handleChange}
                type='password'  // ADDED for security
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
             border="1px solid rgb(0, 100, 100)"
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
                type='button'  
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

    const loginContent=
    <form onSubmit={login}>
            <ModalBody p={10}
            borderLeft="1px solid rgb(0, 100, 100)"
            borderRight="1px solid rgb(0, 100, 100)"
            >
              <FormControl >
                <FormLabel>Email</FormLabel>
                <Input
                 ref={initialRef}
                 value={formData.email}
                onChange={handleChange}
                name='email'
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
                value={formData.password}
                onChange={handleChange}
                name='password'
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
             border="1px solid rgb(0, 100, 100)"
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
         backgroundColor="transparent"
         height={45}
         width="full"
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
           zIndex={6}
           />
          <ModalContent 
          borderRadius='20px'
          maxW="400px"
          h="315px"
          mx={4}
          position="relative"
          top="275px"
          >
            <ModalHeader p="10px 0 10px 15px"
             bg="rgba(40, 75, 95, 0.2)"
             borderRadius="20px 20px 0 0"
             fontWeight="bold"
             fontSize={18}
             border="1px solid rgb(0, 100, 100)"
             >{variant=="login"?"Sign in to your account":(variant=="signup"?"Create an account":"")} (Members only)
              <ModalCloseButton
               display="inline-block"
               textAlign="center"
               backgroundColor="rgba(0,225,200,1)"
               border="none"
               m={variant=="login"?"0 0 0 40px":(variant=="signup"?"0 0 0 75px":"")}
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