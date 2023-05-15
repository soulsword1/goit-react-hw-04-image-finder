import PropTypes from 'prop-types';

import {
  SearchbarContainer,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const onSearch = e => {
    e.preventDefault();
    onSubmit(e.target.search.value);
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={onSearch}>
        <SearchFormBtnLabel />
        <SearchFormBtn />
        <SearchFormInput name="search" />
      </SearchForm>
    </SearchbarContainer>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
