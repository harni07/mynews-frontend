type TextAreaProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    label: string;
    disabled?: boolean;
};

const TextArea = ({ value, onChange, placeholder, label, disabled = false }: TextAreaProps) => (
    <div>
        <label className="form-label">{label}</label>
        <textarea
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="form-control"
        />
    </div>
);

export default TextArea;
