import { Box, Text, Link, Center, VStack } from "@chakra-ui/react";

export function ErrorRoute() {
    return (
        <Box 
            className="bsod" 
            bg="#0414a7" 
            color="#e0e2f4" 
            minHeight="100vh" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
            paddingTop="10%"
        >
            <Center>
                <VStack spacing={4} textAlign="center">
                    <Text fontSize="2.75rem" fontFamily="'VT323', monospace" color="#0414a7">
                        <span style={{ background: "#aaaaaa", padding: '0 15px 2px 13px' }}>Error - 404</span>
                    </Text>
                    <Text>An error has occurred, to continue:</Text>
                    <Text>
                        * Return to our homepage.<br />
                        * Send us an e-mail about this error and try later.
                    </Text>
                    <Box className="nav" marginTop={4}>
                        <Link href="/login" color="#e0e2f4" textDecoration="none" padding="0 9px" _hover={{ background: "#aaaaaa", color: "#0414a7" }}>
                            back to Login
                        </Link>
                    </Box>
                </VStack>
            </Center>
        </Box>
    );
}
