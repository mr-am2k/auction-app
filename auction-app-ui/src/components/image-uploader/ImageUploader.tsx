import { useForm } from 'hooks/useForm';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone, DropzoneProps } from 'react-dropzone';
import { v4 } from 'uuid';
import { validate as validateProductImages } from 'validators/validateProductImages';
import './image-uploader.scss';
import classNames from 'classnames';

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

  type ObjectKey = keyof typeof fieldValidationResults;

  const existingError = fieldValidationResults[name as ObjectKey]?.valid;

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      setUploadedImages((prevImages) => [...prevImages, ...acceptedFiles]);

      let imagesForUpload: File[] = [];

      if (fieldValues[name] !== undefined) {
        imagesForUpload = [
          ...imagesForUpload,
          ...fieldValues[name],
          ...acceptedFiles,
        ];
      } else {
        imagesForUpload = [...imagesForUpload, ...acceptedFiles];
      }

      setFieldValues({
        ...fieldValues,
        [name]: imagesForUpload,
      });
    },

    [fieldValues, name, setFieldValues]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropAccepted,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const acceptedFiles: File[] = Array.from(event.target.files!);

    setUploadedImages((prevImages) => [...prevImages, ...acceptedFiles]);

    let imagesForUpload: File[] = [];

    if (fieldValues[name] !== undefined) {
      imagesForUpload = [
        ...imagesForUpload,
        ...fieldValues[name],
        ...acceptedFiles,
      ];
    } else {
      imagesForUpload = [...imagesForUpload, ...acceptedFiles];
    }

    setFieldValues({
      ...fieldValues,
      [name]: imagesForUpload,
    });
  };

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
          validator: validateProductImages,
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classNames({
        'c-image-upload': true,
        'c-error-border': !existingError,
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} onChange={handleImageUpload} />
      {isDragActive ? (
        <p className='c-drop-active'>Drop the image here ...</p>
      ) : (
        <>
          <h3>Upload photos</h3>
          <p>or just drag and drop </p>
          <p className='c-limit-message'>(Add at least 3 photos)</p>
        </>
      )}

      {uploadedImages.length
        ? uploadedImages.map((image) => (
            <p className='c-added-image' key={v4()}>
              {image.name}
            </p>
          ))
        : ''}

      {!existingError && (
        <p className='c-error-message'>
          {fieldValidationResults[name as ObjectKey]?.message}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
