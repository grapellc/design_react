"use client";

import { TextField, TextFieldTextarea } from "seed-design/ui/text-field";

export default function MultilineTextFieldPreview() {
  return (
    <TextField label="Label">
      <TextFieldTextarea autoFocus />
    </TextField>
  );
}
