import React from "react";

interface InputGroupProps {
  customClasses?: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  name?: string; // Prop para el atributo 'name'
  value?: string; // Prop para manejar el valor
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Prop para manejar cambios
}

const InputGroup: React.FC<InputGroupProps> = ({
  customClasses,
  label,
  type,
  placeholder,
  required,
  name,
  value,
  onChange,
}) => {
  return (
    <div className={customClasses}>
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        {label}
        {required && <span className="text-red">*</span>}
      </label>
      <input
        type={type}
        name={name} // Asignamos el atributo 'name'
        placeholder={placeholder}
        value={value} // Asignamos el valor
        onChange={onChange} // Manejamos el evento onChange
        required={required} // Aseguramos que el 'required' se pase correctamente
        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
      />
    </div>
  );
};

export default InputGroup;
