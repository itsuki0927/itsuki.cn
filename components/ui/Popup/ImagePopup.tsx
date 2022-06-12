export type PopupProps = {
  src?: string;
};

const ImagePopup = ({ src }: PopupProps) =>
  src ? (
    <img
      id='popupImage'
      alt='popup show'
      src={src}
      className='max-h-[80%] max-w-screen-md rounded-md border-8 border-solid border-white-3 object-cover '
    />
  ) : null;

export default ImagePopup;
