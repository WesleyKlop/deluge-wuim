// @flow
export const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE'

export const changeSearchValue = (value: string) => ({
  type: CHANGE_SEARCH_VALUE,
  value,
})
