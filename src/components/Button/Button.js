import { ButtonSearch } from './Button.styled';

export function Button({ onBtnClick }){
    function onLoadMore(){
        onBtnClick();
    }
    return(
        <ButtonSearch onClick={onLoadMore}> Load More </ButtonSearch>
    )
}
