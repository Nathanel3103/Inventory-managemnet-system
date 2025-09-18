import React from "react";
import Select from "react-select";

interface SearchDropdownProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ options, value, onChange, placeholder }) => {
  const selected = options.find(opt => opt.value === value) || null;

  return (
    <Select
      value={selected}
      onChange={(opt) => onChange(opt?.value || "")}
      options={options}
      placeholder={placeholder}
      isClearable
      className="text-sm bg-amber-200"
    />
  );
};

export default SearchDropdown;
