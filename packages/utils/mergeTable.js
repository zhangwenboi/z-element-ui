/** @format */

//合并相同行

function mergeFunc(tableId, maxCol = 3) {
  var tab = document.getElementById(tableId);
  //maxcol用于设置需要合并的列数
  var count, start;
  for (var col = maxCol - 1; col >= 0; col--) {
    //用于存储相同个数
    count = 1;
    for (var i = 0; i < tab.rows.length; i++) {
      if (i > 0 && col > 0 && tab.rows[i].cells[col].innerHTML == tab.rows[i - 1].cells[col].innerHTML && tab.rows[i].cells[col - 1].innerHTML == tab.rows[i - 1].cells[col - 1].innerHTML) {
        count++;
      } else if (i > 0 && col == 0 && tab.rows[i].cells[col].innerHTML == tab.rows[i - 1].cells[col].innerHTML) {
        count++;
      } else {
        if (count > 1) {
          //合并
          start = i - count;
          tab.rows[start].cells[col].rowSpan = count;
          for (var j = start + 1; j < i; j++) {
            //
            tab.rows[j].removeChild(tab.rows[j].cells[col]);
          }
          count = 1;
        }
      }
    }
    if (count > 1) {
      //合并，最后几行相同的情况下
      start = i - count;
      tab.rows[start].cells[col].rowSpan = count;
      for (var j = start + 1; j < i; j++) {
        tab.rows[j].removeChild(tab.rows[j].cells[col]);
      }
    }
  }
}
