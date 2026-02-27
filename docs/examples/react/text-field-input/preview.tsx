import { TextField, TextFieldInput } from "grape_design_react/ui/text-field";

export default function TextFieldPreview() {
  return (
    <TextField label="라벨">
      <TextFieldInput autoFocus />
    </TextField>
  );
}
