import { TextField, TextFieldTextarea } from "grape_design_react/ui/text-field";

export default function MultilineTextFieldPreview() {
  return (
    <TextField label="라벨">
      <TextFieldTextarea autoFocus />
    </TextField>
  );
}
