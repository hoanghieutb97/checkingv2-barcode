import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
// import * as type from "../constants";

function InputExcel(props) {
  const [FileName, setFileName] = useState("");
  const [Arr, setarr] = useState([]);
  // console.log(props.MutiExcel);
  let ProcessExcel = (data) => {
    var workbook = XLSX.read(data, {
      type: 'binary'
    });
    let dataExcel = workbook.Sheets.Sheet1;
    let rickDataExcel = {
      "Sheet1": []
    };


    for (let j = 3; j <= 30000; j++) {
      let rawPick = _.pick(dataExcel, [`A${j}`, `B${j}`, `C${j}`, `D${j}`, `E${j}`, `F${j}`, `G${j}`, `H${j}`, `I${j}`, `J${j}`, `K${j}`, `L${j}`, `M${j}`, `N${j}`]);
      if (_.size(rawPick) >= 12) {
        // let skux = rawPick[`C${j}`].w;
        // skux=skux.split("-")
        let rickPick = {
          idClient: rawPick[`A${j}`].w,
          barcode: rawPick[`B${j}`].w,
          idDesign: rawPick[`C${j}`].w,
          amount: rawPick[`D${j}`].w,
          phoneCase: rawPick[`E${j}`].w,
          product: rawPick[`F${j}`].w,
          country: (rawPick[`G${j}`] === undefined) ? "none" : rawPick[`G${j}`].w,
          partner: (rawPick[`H${j}`] === undefined) ? null : rawPick[`H${j}`].w,
          urlDesign: (rawPick[`I${j}`] === undefined) ? null : rawPick[`I${j}`].w,
          dateItem: (rawPick[`J${j}`] === undefined) ? null : rawPick[`J${j}`].w,
          OrderID: (rawPick[`K${j}`] === undefined) ? null : rawPick[`K${j}`].w,
          note: (rawPick[`L${j}`] === undefined) ? null : rawPick[`L${j}`].w,
          location: (rawPick[`M${j}`] === undefined) ? null : rawPick[`M${j}`].w,
          type: (rawPick[`N${j}`] === undefined) ? null : rawPick[`N${j}`].w,

        }

        rickDataExcel.Sheet1.push(rickPick);
      }
    }

    props.changeInputItems(rickDataExcel.Sheet1);

  };
  let readSingleFile = (e) => {

    let fileName = e.target.files[0].name;
    props.changeFileName(fileName.slice(0, fileName.length - 5));
    setFileName(fileName.slice(0, fileName.length - 5))
    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\(\)\\.\-:])+(.xlsx)$/;
    if (regex.test(e.target.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
        var reader = new FileReader();
        //For Browsers other than IE.
        if (reader.readAsBinaryString) {
          reader.onload = function (e) {
            // console.log(e.target.result);
            ProcessExcel(e.target.result);
          };
          reader.readAsBinaryString(e.target.files[0]);
        } else {
          //For IE Browser.
          reader.onload = function (e) {
            var data = "";
            var bytes = new Uint8Array(e.target.result);
            for (var i = 0; i < bytes.byteLength; i++) {
              data += String.fromCharCode(bytes[i]);
            }
            ProcessExcel(data);
          };
          reader.readAsArrayBuffer(e.target.files[0]);
        }
      } else {
        alert("This browser does not support HTML5.");
      }
    } else {
      alert("Please upload a valid Excel file.");
    }
  }





  let readSingleFile2 = (e) => {
    let listArr = [];
    let input = e.target;
    // arr.push(name);

    for (var i = 0; i < input.files.length; i++) { // bat dau for
      // console.log(i + "d");

      let ProcessExcel2 = (data) => {
        var workbook = XLSX.read(data, {
          type: 'binary'
        });
        let dataExcel = workbook.Sheets.Sheet1;
        let rickDataExcel = {
          "Sheet1": []
        };

        for (let j = 3; j <= 30000; j++) {
          let rawPick = _.pick(dataExcel, [`A${j}`, `B${j}`, `C${j}`, `D${j}`, `E${j}`, `F${j}`, `G${j}`, `H${j}`, `I${j}`, `J${j}`, `K${j}`, `L${j}`, `M${j}`, `N${j}`]);
          if (_.size(rawPick) >= 12) {
            // let skux = rawPick[`C${j}`].w;
            // skux=skux.split("-")
            let rickPick = {
              idClient: rawPick[`A${j}`].w,
              barcode: rawPick[`B${j}`].w,
              idDesign: rawPick[`C${j}`].w,
              amount: rawPick[`D${j}`].w,
              phoneCase: rawPick[`E${j}`].w,
              product: rawPick[`F${j}`].w,
              country: (rawPick[`G${j}`] === undefined) ? "none" : rawPick[`G${j}`].w,
              partner: (rawPick[`H${j}`] === undefined) ? null : rawPick[`H${j}`].w,
              urlDesign: (rawPick[`I${j}`] === undefined) ? null : rawPick[`I${j}`].w,
              dateItem: (rawPick[`J${j}`] === undefined) ? null : rawPick[`J${j}`].w,
              OrderID: (rawPick[`K${j}`] === undefined) ? null : rawPick[`K${j}`].w,
              note: (rawPick[`L${j}`] === undefined) ? null : rawPick[`L${j}`].w,
              location: (rawPick[`M${j}`] === undefined) ? null : rawPick[`M${j}`].w,
              type: (rawPick[`N${j}`] === undefined) ? null : rawPick[`N${j}`].w,

            }

            rickDataExcel.Sheet1.push(rickPick);
          }
        }

        // console.log(rickDataExcel.Sheet1);
        // listArr.push(rickDataExcel.Sheet1);
        listArr=[...listArr,...rickDataExcel.Sheet1]
   
        console.log(listArr);
        props.changeInputItems(listArr);
        console.log("daprops");
        // setarr(listArr);

      };


      {
        let fileName = e.target.files[i].name;
        // props.changeFileName(fileName.slice(0, fileName.length - 5));
        // setFileName(fileName.slice(0, fileName.length - 5))
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\(\)\\.\-:])+(.xlsx)$/;
        if (regex.test(e.target.value.toLowerCase())) {
          if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
              reader.onload = function (e) {
                // console.log(e.target.result);
                ProcessExcel2(e.target.result);
              };
              reader.readAsBinaryString(e.target.files[i]);
            } else {
              //For IE Browser.
              reader.onload = function (e) {
                var data = "";
                var bytes = new Uint8Array(e.target.result);
                for (var j = 0; j < bytes.byteLength; i++) {
                  data += String.fromCharCode(bytes[j]);
                }
                ProcessExcel2.push(data);
              };
              reader.readAsArrayBuffer(e.target.files[i]);
            }
          } else {
            alert("This browser does not support HTML5.");
          }
        } else {
          alert("Please upload a valid Excel file.");
        }
      }



      let name = input.files[i].name;
      name = name.split(".");
      if (name.length > 1) name.pop();
      name = name.join(".");
      name = name.toLowerCase();

    }// het for


  }
  // console.log(Arr);
  // console.log(typeof(arr));









  return (
    <div className="d-flex justify-content-center">
      {(props.MutiExcel === false)
        ? <input type="file" id="fileinput" className="btn btn-warning" onChange={readSingleFile} style={{ display: "none" }} />
        : <input type="file" id="fileinput" className="btn btn-warning" onChange={readSingleFile2} style={{ display: "none" }} multiple />
      }

      <label htmlFor="fileinput" className="input_exel_file btn btn-warning">{(FileName === "") ? "File Excel" : FileName}.xlsx</label>

    </div>
  );
}

export default InputExcel;

