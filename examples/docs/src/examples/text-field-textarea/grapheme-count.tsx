"use client";

import { TextField, TextFieldTextarea } from "grape-design/ui/text-field";

export default function TextFieldTextareaGraphemeCount() {
  return (
    <TextField label="Label" description="Description 써주세요" maxGraphemeCount={8}>
      <TextFieldTextarea placeholder="플레이스홀더" />
    </TextField>
  );
}
