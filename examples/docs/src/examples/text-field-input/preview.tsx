"use client";

import { TextField, TextFieldInput } from "grape-design/ui/text-field";

export default function TextFieldPreview() {
  return (
    <TextField label="Label">
      <TextFieldInput autoFocus />
    </TextField>
  );
}
