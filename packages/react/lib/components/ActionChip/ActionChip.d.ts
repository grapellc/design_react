import { ActionChipVariantProps } from '@grape-design/css/recipes/action-chip';
import { PrimitiveProps } from '@grape-design/react-primitive';
import type * as React from "react";
/**
 * @deprecated ActionChip is deprecated. Use Chip.Button with variant="solid" instead.
 *
 * Migration guide:
 * ```tsx
 * // Before
 * <ActionChip size="medium">Label</ActionChip>
 *
 * // After
 * import { Chip } from "@seed-design/react";
 * <Chip.Button size="medium" variant="solid">Label</Chip.Button>
 * ```
 */
export interface ActionChipProps extends ActionChipVariantProps, PrimitiveProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
}
/**
 * @deprecated ActionChip is deprecated. Use Chip.Button with variant="solid" instead.
 */
export declare const ActionChip: React.ForwardRefExoticComponent<Omit<ActionChipProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ActionChip.d.ts.map