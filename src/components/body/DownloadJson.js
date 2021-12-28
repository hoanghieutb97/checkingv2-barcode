
import React from 'react';
import _ from 'lodash';

function DownloadJson(props) {
  let rd6 = () => {
    return Math.floor(Math.random() * (99999 - 10000) + 10000);
  }
  let rd1 = () => {
    return Math.floor(Math.random() * (9 - 1) + 1);
  }
  let saveTextAsFile = (param) => {
    let paramToText = JSON.stringify(param)
    var textToWrite = paramToText // file contents
    var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    // var fileNameToSaveAs = `day${props.date.dayExcel}_${props.date.mouthExcel}.json`// tên file
    let fileNameToSaveAs = `${props.Type}-${(props.FileName)}.json`;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    downloadLink.click();
  }
  let num1 = rd1();
  let numRd = [rd6(), num1, (10 - num1), rd6()].join("");

  let items = JSON.parse(JSON.stringify(props.items));
  if (props.typeTable === "silicon") {

    items = items.map(item => {
      item = item.map(z9Sort1 => {
        let a = _.chunk(z9Sort1, 8); return a
      });
      return item
    })

  };
  if (props.Type === "wood cut raw render") {
    items = _.flattenDeep(items) ;
  // console.log(items);

  }

  let thongso = { wAll: props.TableValue.wAll, hAll: props.TableValue.hAll, FileDesign: props.FileDesign }

  let strWrite = {
    items: items,
    // day: Number(props.date.dayExcel),
    // mounth: Number(props.date.mouthExcel),
    type: props.Type,
    FileName: props.FileName,
    key: numRd,
    thongso: thongso
  };

  return (
    <div className="d-flex justify-content-center">
      <button type="button" className="btn btn-secondary  dlp"
        onClick={() => saveTextAsFile(strWrite)}
        style={{ color: "white" }}
      >
        Download JSON
      </button>
    </div>

  );
}

export default DownloadJson;