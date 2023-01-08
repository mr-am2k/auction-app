import React, { useEffect, useState } from 'react';
import { useDropzone, DropzoneProps } from 'react-dropzone';

import { useForm } from 'hooks/useForm';

import { validate as validateProductImages } from 'validators/validateProductImages';
import EN_STRINGS from 'translation/en';
import { v4 } from 'uuid';

import './image-uploader.scss';

import classNames from 'classnames';

interface ImageUploaderProps extends DropzoneProps {
  name: string;
  value: File[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ name, value }) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const {
    fieldValues,
    fieldValidationResults,
    additionalFieldsInfo,
    setFieldValues,
    setFieldValidationResults,
    setAdditionalFieldsInfo,
    validateSingleField,
  } = useForm();

  type ObjectKey = keyof typeof fieldValidationResults;

  const hasError = !fieldValidationResults[name as ObjectKey]?.valid;

  const onDropAccepted = (acceptedImages: File[]) => {
    setUploadedImages((prevImages) => [...prevImages, ...acceptedImages]);

    let imagesForUpload: File[] = [];

    if (fieldValues[name] !== undefined) {
      imagesForUpload = [
        ...imagesForUpload,
        ...fieldValues[name],
        ...acceptedImages,
      ];
    } else {
      imagesForUpload = [...imagesForUpload, ...acceptedImages];
    }

    setFieldValues({
      ...fieldValues,
      [name]: imagesForUpload,
    });

    const imagesForValidation: any = imagesForUpload;

    setFieldValidationResults({
      ...fieldValidationResults,
      [name]: validateSingleField(
        name,
        imagesForValidation,
        additionalFieldsInfo[name]?.pattern,
        true,
        additionalFieldsInfo[name]?.optionalValidator,
        additionalFieldsInfo[name]?.validator
      ),
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropAccepted,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const acceptedImages: File[] = Array.from(event.target.files!);

    setUploadedImages((prevImages) => [...prevImages, ...acceptedImages]);

    let imagesForUpload: File[] = [];

    if (fieldValues[name] !== undefined) {
      imagesForUpload = [
        ...imagesForUpload,
        ...fieldValues[name],
        ...acceptedImages,
      ];
    } else {
      imagesForUpload = [...imagesForUpload, ...acceptedImages];
    }

    setFieldValues({
      ...fieldValues,
      [name]: imagesForUpload,
    });

    const imagesForValidation: any = imagesForUpload;

    setFieldValidationResults({
      ...fieldValidationResults,
      [name]: validateSingleField(
        name,
        imagesForValidation,
        additionalFieldsInfo[name]?.pattern,
        true,
        additionalFieldsInfo[name]?.optionalValidator,
        additionalFieldsInfo[name]?.validator
      ),
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

    setUploadedImages(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classNames({
        'c-image-upload': true,
        'c-error-border': hasError,
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} onChange={handleImageUpload} />
      {isDragActive ? (
        <p className='c-drop--active'>{EN_STRINGS.IMAGE_UPLOADER.DND_ACTIVE}</p>
      ) : (
        <>
          <h3>{EN_STRINGS.IMAGE_UPLOADER.UPLOAD_PHOTOS}</h3>
          <p>{EN_STRINGS.IMAGE_UPLOADER.DRAG_AND_DROP}</p>
          <p className='c-limit-message'>
            {EN_STRINGS.IMAGE_UPLOADER.LIMITATION}
          </p>
        </>
      )}

      {uploadedImages.length ? uploadedImages.map((image) => (
        <p className='c-added-image' key={v4()}>
          {image.name}
        </p>
      )) : ''}

      {hasError && (
        <p className='c-error-message'>
          {fieldValidationResults[name as ObjectKey]?.message}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
