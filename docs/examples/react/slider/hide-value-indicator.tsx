import { Slider } from "grape_design_react/ui/slider";

export default function SliderHideValueIndicator() {
  return (
    <Slider min={0} max={100} defaultValues={[50]} hideValueIndicator getAriaLabel={() => "값"} />
  );
}
