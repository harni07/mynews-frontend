type CheckboxProps = {
    checked: boolean;
    disabled?: boolean;
    onChange: () => void;
    label: string;
};

const Checkbox = ({ checked, onChange, label, disabled = false }: CheckboxProps) => (
    <label className="form-check-label me-2">
        <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="form-check-input me-1"
        />
        {label}
    </label>
);


export default Checkbox;
