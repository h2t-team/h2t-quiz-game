import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';

interface CloudImageProps {
  src: CloudinaryImage;
}

const CloudImage: React.FC<CloudImageProps> = ({ src }) => {
  return <AdvancedImage cldImg={src} />;
};

export default CloudImage;
