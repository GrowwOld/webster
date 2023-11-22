import { DIRECTION } from '../../../utils/constants';

export type RadioButtonType = {
  value: string | number;
  label: React.ReactNode;
  labelClassName?: string;
  parentClassName?: string;
  radioDirection?: ValueOf <typeof DIRECTION>;
}
