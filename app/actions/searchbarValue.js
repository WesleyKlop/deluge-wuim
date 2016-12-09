/**
 * Created by wesley on 9-12-16.
 */

const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE'
const changeSearchValue = (value: string) => ({
  type: CHANGE_SEARCH_VALUE,
  value,
})

export {
  changeSearchValue,
  CHANGE_SEARCH_VALUE,
}
