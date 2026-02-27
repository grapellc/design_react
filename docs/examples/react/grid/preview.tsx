import { Flex, Grid } from "@grape_design_react/react";

export default function GridPreview() {
  return (
    <Grid columns={3} gap="x2" width="full" height="full" p="x8">
      {Array.from({ length: 6 }).map((_, index) => (
        <Flex
          key={index}
          bg="palette.grape300"
          color="palette.grape700"
          borderRadius="r2"
          align="center"
          justify="center"
        >
          {index + 1}
        </Flex>
      ))}
    </Grid>
  );
}
