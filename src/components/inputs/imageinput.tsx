type ImageInputProps = {
    image: string | null;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageInput = ({ image, onChange, disabled = false }: ImageInputProps) => (
    <>
        {image && (
            <div className="col-4">
                <label className="form-label">Image preview </label>
                <div className="current-image">
                    <img src={image} alt="Current Image" />
                </div>
            </div>
        )}
        {!disabled &&
            <div className={image ? 'col-8' : 'col-12'}>
                <label className="form-label">{image ? 'Change Image' : 'Add Image'}</label>
                <input type="file" onChange={onChange} className="form-control" />
            </div>
        }

    </>
);

export default ImageInput;
