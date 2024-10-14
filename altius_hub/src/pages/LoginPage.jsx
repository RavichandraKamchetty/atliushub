import {
    Button,
    Container,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useShowToast from "../hooks/useShowToast";

const LoginPage = () => {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    });
    const handleClick = () => setShow(!show);
    const showToast = useShowToast();

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/user-api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            localStorage.setItem("user-info", JSON.stringify(data));
            setUser(data);
        } catch (error) {
            showToast("Error", error.message, "error");
            return;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container
            maxW={"xl"}
            margin={"auto"}
            marginTop={"200px"}
            border={"1px solid green"}
            p={"20px"}
        >
            <Flex direction={"column"} gap={3}>
                <VStack>
                    <Text width={"100%"}>Username: </Text>
                    <Input
                        placeholder="Enter username: "
                        value={inputs.username}
                        onChange={(e) => {
                            setInputs({ ...inputs, username: e.target.value });
                        }}
                        isRequired
                    />
                </VStack>

                <VStack>
                    <Text width={"100%"}>Email: </Text>
                    <Input
                        placeholder="Enter Email: "
                        type="email"
                        value={inputs.email}
                        onChange={(e) => {
                            setInputs({ ...inputs, email: e.target.value });
                        }}
                        isRequired
                    />
                </VStack>

                <VStack>
                    <Text width={"100%"}>Password: </Text>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                            value={inputs.password}
                            onChange={(e) => {
                                setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                });
                            }}
                            isRequired
                        />
                        <InputRightElement width="4.5rem">
                            <Button
                                h="1.75rem"
                                size="sm"
                                onClick={handleClick}
                                isLoading={isLoading}
                            >
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </VStack>

                <Button onClick={handleSubmit}>Signup</Button>
            </Flex>
        </Container>
    );
};

export default LoginPage;
