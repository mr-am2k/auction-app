export type Form = {
  firstName?: {
    value: string;
    pattern?: string;
    validator?: () => void;
  };
  lastName?: {
    value: string;
    pattern?: string;
    validator?: () => void;
  };
  email?: {
    value: string;
    pattern: string;
    validator: () => void;
  };
  password?: {
    value: string;
    pattern: string;
    validator: () => void;
  };
};
