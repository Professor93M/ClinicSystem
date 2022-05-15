import React from "react";

export default function Button({
    name,
    options,
    handleChange,
    className,
    value,
    disabled,
    placeholder,
    add,
}) {
    return (
        <div className="flex flex-col items-center justify-center">
            <select
                disabled={disabled}
                className={className}
                name={name}
                onChange={handleChange}
                defaultValue={value ? value : placeholder}
            >
                {add && (
                    <option disabled className="disabled:bg-transparent">
                        {placeholder}
                    </option>
                )}

                {options.map((option, index) => (
                    <option
                        key={index}
                        className="w-full text-base bg-transparent"
                        value={option.value}
                        label={option.name}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
