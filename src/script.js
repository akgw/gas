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
//  Logger.log(values);

  return values;
}

/**
 * 盤面関係なくとりあえず更新
 */
function sendPutStone(column, row, stone) {
  [column, row] = convertColumnRow(column, row);
  const sheet = SpreadsheetApp.getActive().getSheetByName('board');
  sheet.getRange(row + column).setValue(stone);
}

/**
 * カラムを変換
 *
 * @param column
 * @param row
 * @returns {*[]}
 */
function convertColumnRow(column, row) {
  column += 1;

  /**
   * シート用に変換
   */
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

  return [column, convertForSheet[row]];
}

