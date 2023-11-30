import { DIRECTION, SIZES } from '../../../utils/constants';

export type RadioButtonType = {
  size?: ValueOf<typeof SIZES>;
  value: string | number;
  label: React.ReactNode;
  labelClassName?: string;
  parentClassName?: string;
  radioDirection?: ValueOf <typeof DIRECTION>;
}
