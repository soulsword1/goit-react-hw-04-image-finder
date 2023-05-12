import { SpinnerDiv } from './Loader.styled';
import { ColorRing } from 'react-loader-spinner';

export function Loader() {
  return (
    <SpinnerDiv>
      <ColorRing
        colors={['#003171', '#1F4788', '#5D8CAE', '#317589', '#89C4F4']}
      />
    </SpinnerDiv>
  );
}
