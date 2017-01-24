// @flow
import React from 'react'
import { Textfield } from 'react-mdl'
import { connect } from 'react-redux'
import { changeSearchValue } from '../actions/searchbarValue'

type TorrentSearchBarProps = {
  searchValue: string,
  onSearchChange: () => void,
}

const TorrentSearchBar = ({ searchValue, onSearchChange }: TorrentSearchBarProps) => (
  <Textfield
    value={searchValue}
    onChange={onSearchChange}
    label="Search"
    expandable
    expandableIcon="search"
    type="text"
  />
)

const mapStateToProps = state => ({
  searchbarValue: state.searchbarValue,
})

const mapDispatchToProps = dispatch => ({
  onSearchChange: e => dispatch(changeSearchValue(e.currentTarget.value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TorrentSearchBar)
