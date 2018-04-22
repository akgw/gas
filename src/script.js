function doGet(e) {
  Logger.log(e);
  return HtmlService.createHtmlOutputFromFile('test');
}

/**
 * 盤面の状態を取得
 * @returns {*}
 */
function sendFetchBoard() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('board');
  const values = sheet.getRange("A1:H8").getValues();

  for (var key1 in values) {
    for (var key2 in values[key1]) {
      if (values[key1][key2] !== '') {
        continue;
      }
      values[key1][key2] = '　';
    }
  }
  return values;
}

/**
 * 盤面の状態を更新
 */
function sendWriteBoard(board) {
  const sheet = SpreadsheetApp.getActive().getSheetByName('board');
  for (var key in board) {
    var row = parseInt(key) + 1;
    var range = sheet.getRange("A" + row + ":H" + row);

    range.setValues([board[key]]);
  }

}

/**
 * 盤面関係なくとりあえず更新
 */
function sendPutStone(row, column, stone) {
  row = convertRow(row);
  column = convertColumn(column);
  const sheet = SpreadsheetApp.getActive().getSheetByName('board');
  sheet.getRange(column + row).setValue(stone);
}

/**
 * 列を変換
 *
 * @param row
 * @returns {*[]}
 */
function convertRow(row) {
  row += 1;
  return row;
}

/**
 * 行を変換
 *
 * @param column
 * @returns {*}
 */
function convertColumn(column) {
  const convertForSheet = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
  };

  return convertForSheet[column];
}

