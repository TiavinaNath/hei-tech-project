import { SignUpUserFormData } from "@/lib/validators/user";

export default interface Field {
  id: keyof SignUpUserFormData;
  label: string;
  type?: string;
  placeholder?: string;
  showIf?: string;
}