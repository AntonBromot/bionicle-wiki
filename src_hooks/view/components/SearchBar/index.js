import React from 'react'
import PropTypes from 'prop-types';

import { SearchBarContainer, SearchInputWrapper, SearchIcon, SearchInput } from "./styles"
import { WHITE_COLOR } from '../../../constants/colors';
import {debounce} from '../../../helpers';

const ASSETS = {
    placeholderText: "Search..."
}

const SearchBar = ({ searchHandler }) => (
    <SearchBarContainer  >
        <SearchInputWrapper>
            <SearchIcon name="search" />
            <SearchInput placeholder={ ASSETS.placeholderText } onChangeText={ debounce(searchHandler) } placeholderTextColor={ WHITE_COLOR } />
        </SearchInputWrapper>
    </SearchBarContainer>
)

SearchBar.propTypes = {
    searchHandler: PropTypes.func,
}

export default SearchBar

