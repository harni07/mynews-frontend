type TextInputProps = {
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder: string;
    label: string;
    disabled?: boolean;
    type?: 'text' | 'number' | 'password' | 'email';
};

const TextInput = ({ value, onChange, placeholder, label, type = 'number', disabled = false } : TextInputProps) => (
    <div>
        <label className="form-label">{label}</label>
        <input
            type={type}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) : e.target.value)}
            placeholder={placeholder}
            className="form-control"
        />
    </div>
);

export default TextInput;
