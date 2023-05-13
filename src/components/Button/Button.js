import { ButtonSearch } from './Button.styled';
import PropTypes from 'prop-types';

export function Button({ onBtnClick }){
    function onLoadMore(){
        onBtnClick();
    }
    return(
        <ButtonSearch onClick={onLoadMore}> Load More </ButtonSearch>
    )
}

Button.propTypes = {
    onBtnClick: PropTypes.func.isRequired,
}