"use client";

import { useState } from "react";
import { TextField, TextFieldTextarea } from "grapu-design/ui/text-field";

export default function TextFieldTextareaSlicing() {
  const [value, setValue] = useState("");

  return (
    <TextField
      label="Label"
      description="6글자까지 입력 가능합니다"
      maxGraphemeCount={6}
      value={value}
      onValueChange={({ slicedValue }) => setValue(slicedValue)}
    >
      <TextFieldTextarea placeholder="플레이스홀더" />
    </TextField>
  );
}
