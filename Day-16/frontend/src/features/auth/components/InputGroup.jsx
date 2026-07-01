import React from 'react'

const InputGroup = ({
    label,
    placeholder,
    type,
    value,
    onChange
}) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputGroup;