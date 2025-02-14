import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";
import { Button } from "./ui/button";
import { useState } from "react";

interface InputFieldProps {
  control: Control<any>;
  name: string;
  placeholder: string;
  label: string;
  type?: "string" | "password" | "email";
}

function InputField({
  control,
  name,
  placeholder,
  label,
  type: _type,
}: InputFieldProps) {
  const [type, setType] = useState(_type || "string");
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg text-primary">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input type={type} placeholder={placeholder} {...field} />
              {_type?.toString() == "password" ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-2 top-2.5 [&_svg]:size-5"
                  onClick={() =>
                    setType(type == "password" ? "string" : "password")
                  }
                >
                  {type == "password" ? <EyeIcon /> : <EyeOffIcon />}
                </Button>
              ) : null}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputField;
