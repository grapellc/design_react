"use client";

import { TextField, TextFieldTextarea } from "grape-design/ui/text-field";

export default function MultilineTextFieldPreview() {
  return (
    <TextField label="Label">
      <TextFieldTextarea autoFocus />
    </TextField>
  );
}
