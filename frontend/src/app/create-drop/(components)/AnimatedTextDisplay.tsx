"use client"

import { Box, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const SWITCHER_TEXT = [
    "CREATE DROPS IN MINUTES",
    "ONE PLACE FOR ALL YOUR DROPS",
    "MONITOR DROP PERFORMANCE",
]

const AnimatedTextIntro = () => {
    const [currentText, setCurrentText] = useState(SWITCHER_TEXT[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText((prevText) => {
                const currentIndex = SWITCHER_TEXT.indexOf(prevText);
                const nextIndex = (currentIndex + 1) % SWITCHER_TEXT.length;
                return SWITCHER_TEXT[nextIndex];
            });
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Box h="100%" w="100%" className="pt-10">
            <Heading as="h3" className="text-3xl font-extrabold text-center text-white mt-6" textShadow="1px 5px 0.5px #2917e9b5">
                {currentText}
            </Heading>
        </Box>
    )
}

export default AnimatedTextIntro;