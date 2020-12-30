import '@testing-library/jest-dom';
import { fileUpload } from '../../helpers/fileHelper';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'dbz0ldlb1',
  api_key: '358976154751347',
  api_secret: 'KillWeIxmxraqiYeD8t3Xqnk6fo',
});

describe('File upload tests', () => {
  test('should load a file and return the url', async () => {
    const resp = await fetch(
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
    );
    const blob = await resp.blob();

    const file = new File([blob], 'yoda.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');

    await cloudinary.v2.api.delete_resources(imageId);
  });

  test('should return error', async () => {
    const file = new File([], 'yoda.jpg');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
