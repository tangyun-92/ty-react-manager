import * as actionTypes from './constants'

// 导入modal显示隐藏
export const changeImportModalStatusAction = (importModalStatus) => ({
  type: actionTypes.CHANGE_IMPORT_MODAL_STATUS,
  importModalStatus,
})
