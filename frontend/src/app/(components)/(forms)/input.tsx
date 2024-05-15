import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { type UseFormRegister } from "react-hook-form";

type InputProps = {
    name: string;
    label?: string; 
    register: UseFormRegister<any>
} & React.ComponentProps<'input'>

export const TextInput = ({ label, name, placeholder, type, register }: InputProps) => {
    return (
        <Box>
            <FormControl>
                {label ? <FormLabel>{label}</FormLabel> : null}
                <Input
                    {...register(name)}
                    type={type}
                    placeholder={placeholder}
                />
            </FormControl>
        </Box>
    )
}