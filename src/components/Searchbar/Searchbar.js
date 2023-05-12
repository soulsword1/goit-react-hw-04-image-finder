import {
  SearchbarContainer,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar() {
  return (
    <SearchbarContainer>
      <SearchForm>
        <SearchFormBtnLabel />
        <SearchFormBtn />
        <SearchFormInput />
      </SearchForm>
    </SearchbarContainer>
  );
}
