import { Center, Anchor } from "@mantine/core";

export const Footer = () => {
  return (
    <footer>
      <Center my="xl">
        <Anchor
          href="https://openweathermap.org/api"
          target="_blank"
          underline={false}
        >
          OpenWeather
        </Anchor>
      </Center>
    </footer>
  );
};
