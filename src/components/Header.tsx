import { createStyles, Title } from "@mantine/core";
import { LocationSelect } from "./LocationSelect";

const useStyles = createStyles((theme) => ({
  header: {
    margin: `${theme.spacing.xl} 0`,
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
}));

export const Header = () => {
  const { classes } = useStyles();

  return (
    <>
      <header className={classes.header}>
        <Title className={classes.title} order={1}>
          Local Weather
        </Title>
        <LocationSelect />
      </header>
    </>
  );
};
