import { useForm } from 'hooks/useForm';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone, DropzoneProps } from 'react-dropzone';
import { v4 } from 'uuid';

interface ImageUploaderProps extends DropzoneProps {
  name: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onDrop, name }) => {
  const {
    fieldValues,
    fieldValidationResults,
    setFieldValues,
    setFieldValidationResults,
    setAdditionalFieldsInfo,
  } = useForm();

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setUploadedImages((prevImages) => [...prevImages, acceptedFiles[0]]);
    setFieldValues({
        ...fieldValues,
        [name]: [...[fieldValues[name]], acceptedFiles ],
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropAccepted,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });


  useEffect(() => {
    setFieldValidationResults((fieldValidationResults: any) => {
      return {
        ...fieldValidationResults,
        [name]: { valid: true },
      };
    });

    setAdditionalFieldsInfo((additionalFieldsInfo: any) => {
      return {
        ...additionalFieldsInfo,
        [name]: {
          required: true,
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

    setUploadedImages((prevImages) => [...prevImages, event.target.files![0]]);
    setFieldValues({
      ...fieldValues,
      [name]: uploadedImages,
    });
  };


  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} onChange={handleImageUpload} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <>
          <h3>Upload photos</h3>
          <p>or just drag and drop </p>
          <p>(Add at least 3 photos)</p>
        </>
      )}

      {uploadedImages.length
        ? uploadedImages.map((image) => <p key={v4()}>{image.name}</p>)
        : ''}
    </div>
  );
};

export default ImageUploader;
