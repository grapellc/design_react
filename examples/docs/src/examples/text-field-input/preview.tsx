"use client";

import { TextField, TextFieldInput } from "grapu-design/ui/text-field";

export default function TextFieldPreview() {
  return (
    <TextField label="Label">
      <TextFieldInput autoFocus />
    </TextField>
  );
}
