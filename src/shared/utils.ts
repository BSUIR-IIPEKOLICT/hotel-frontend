import { ErrorResponse } from '../interfaces/responses';

export const errorViewer = (e: unknown) => {
  if ((e as ErrorResponse).response?.data?.message) {
    alert((e as ErrorResponse).response?.data?.message || 'Error');
  }
};
