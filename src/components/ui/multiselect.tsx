
import React from 'react';

interface MultiSelectProps {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options, selected, onChange, placeholder
}) => {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-1">
      {options.map(opt => (
        <button
          type="button"
          key={opt.value}
          className={`px-3 py-1 rounded-lg border transition-colors text-xs
            ${selected.includes(opt.value) ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-white border-gray-300"}
            hover:border-blue-600`}
          onClick={() => toggle(opt.value)}
        >
          {opt.label}
        </button>
      ))}
      {options.length === 0 && (
        <span className="text-gray-400">{placeholder}</span>
      )}
    </div>
  );
};

export default MultiSelect;
