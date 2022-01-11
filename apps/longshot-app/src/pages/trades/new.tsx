import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AssetType, CreateTrade, TradeType } from "@longshot/types";
import { useMutation } from "react-query";
import { createTrade } from "../../modules/trades/graphql/mutations/createTrade";

const NewTrade = () => {
  const mutation = useMutation((newTrade: CreateTrade) => {
    return createTrade(newTrade);
  });

  const { register, handleSubmit } = useForm<CreateTrade>();
  const onSubmit = handleSubmit((data) => {
    data.buyDate = new Date();
    console.log(data);
    mutation.mutate(data);
  });

  return (
    <VStack overflow="auto">
      <Flex justify="center" align="center" w="full">
        <Heading m={[1, 2, 4]}>New Trade</Heading>
      </Flex>
      <Container
        w="full"
        boxShadow="sm"
        m={[1, 2, 4]}
        p={[1, 2, 4]}
        bg={useColorModeValue("white", "gray.800")}
        items="center"
        direction="column"
        overflow="auto"
      >
        <form onSubmit={onSubmit}>
          <VStack spacing={6}>
            <FormControl>
              <FormLabel htmlFor="ticker">Ticker</FormLabel>
              <Input
                {...register("ticker", { required: true })}
                id="ticker"
                type="text"
                size="sm"
              />
            </FormControl>
            <HStack w="full" spacing={8}>
              <FormControl>
                <FormLabel htmlFor="quantity">Quantity</FormLabel>
                <NumberInput id="quantity" defaultValue={0} precision={0} step={1} size="sm">
                  <NumberInputField
                    {...register("quantity", {
                      required: true,
                      min: 1,
                      setValueAs: (v) => parseInt(v),
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="price">Price</FormLabel>
                <NumberInput id="price" defaultValue={0} precision={2} step={0.01} size="sm">
                  <NumberInputField
                    {...register("price", {
                      required: true,
                      min: 1,
                      setValueAs: (v) => parseFloat(v),
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel htmlFor="type">Type</FormLabel>
              <Select
                {...register("type", { required: true })}
                id="type"
                placeholder="Type"
                size="sm"
              >
                {Object.values(TradeType).map((tradeType) => (
                  <option key={tradeType} value={tradeType}>
                    {tradeType}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="assetType">Asset Type</FormLabel>
              <Select
                {...register("assetType", { required: true })}
                id="assetType"
                placeholder="Asset"
                size="sm"
              >
                {Object.values(AssetType).map((assetType) => (
                  <option key={assetType} value={assetType}>
                    {assetType}
                  </option>
                ))}
              </Select>
            </FormControl>
            <HStack w="full" spacing={8}>
              <FormControl>
                <FormLabel htmlFor="stopLoss">Stop Loss</FormLabel>
                <NumberInput id="stopLoss" defaultValue={0} precision={2} step={0.01} size="sm">
                  <NumberInputField
                    {...register("stopLoss", {
                      required: true,
                      min: 1,
                      setValueAs: (v) => parseFloat(v),
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="target">Target</FormLabel>
                <NumberInput id="target" defaultValue={0} precision={2} step={0.01} size="sm">
                  <NumberInputField
                    {...register("target", {
                      required: true,
                      min: 1,
                      setValueAs: (v) => parseFloat(v),
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
            <Box />
            <Button
              isLoading={mutation.isLoading}
              w="full"
              colorScheme="green"
              variant="solid"
              disabled={false}
              type="submit"
            >
              {"Submit"}
            </Button>
          </VStack>
        </form>
      </Container>
    </VStack>
  );
};

export default NewTrade;
