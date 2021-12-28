import React, { useState } from 'react';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
function CheckFileIn(props) {
    const [ArrNameFile, setArrNameFile] = useState([]);
    const [FileClick, setFileClick] = useState([]);

    let checkFilesNone = (event) => {
        let arr = [];
        let input = event.target;
        for (var i = 0; i < input.files.length; i++) {
            let name = input.files[i].name;
            name = name.split(".");
            if (name.length > 1) name.pop();
            name = name.join(".");
            name = name.toLowerCase();
            // console.log(name);

            arr.push(name);
        }
        setArrNameFile(arr);
        setFileClick([]);
    }

    let copyText = (param) => {
        copy(param)
    }
    let copyImage = (param) => {
        copy(param);
        setFileClick([...FileClick, param])
    }
    let items = props.skus;
    // console.log(props.skus);
    let skus = items.map(item => { return item.idDesign.trim() })
    let itemsNone = _.differenceBy(skus, ArrNameFile, (param) => param.toLowerCase());

    itemsNone = [...new Set(itemsNone)]
    // // console.log(props.skus);
    // let timfile = [];
    // // console.log(props.skus);
    // if (props.skus.length !== 0) {
    //     timfile = props.skus.map(item => item.urlDesign);
    //     timfile = timfile.map(item => item.split(";"));
    //     timfile = timfile.filter(item => item.length > 1);
    //     timfile = timfile.filter(item => {
    //         let ix1 = item[0].split("/");
    //         ix1 = ix1[ix1.length - 1];
    //         let ix2 = item[1].split("/");
    //         ix2 = ix2[ix2.length - 1];
    //         if (ix1 != ix2) return true
    //     })
    //     let hdz = []
    //     for (let d = 0; d < timfile.length; d++) {
    //         let kk  = props.skus.filter(item => {
    //             let xxx = item.urlDesign.split(";")[0];
    //             xxx = xxx.split("/");
    //             xxx = xxx[xxx.length - 1];
    //             let yyy = timfile[d][0];
    //             yyy = yyy.split("/");
    //             yyy = yyy[yyy.length - 1]
    //             if (xxx == yyy) return true
    //         });
    //         hdz.push(kk)

    //     }
    //     console.log(hdz);
    // }
    let tableitemsnone = [];
    for (let j = 0; j < itemsNone.length; j++) {
        tableitemsnone.push(
            <tr key={j}>
                <td >{j + 1}</td>
                <td onClick={() => copyImage(itemsNone[j])} style={{ cursor: "pointer" }}>
                    <a href={props.skus.filter(itemx => itemx.idDesign === itemsNone[j])[0].urlDesign.split(";")[0]} target="_blank">

                        {(FileClick.filter(item => item === itemsNone[j]).length === 0) ? <img className="dl" src={"./download.svg"}></img> : <img className="dl" src={window.location.origin + "/download2.svg"}></img>}

                    </a>
                </td>
                <td style={{ cursor: "pointer" }}>{itemsNone[j]}</td>
                <td onClick={() => copyImage(itemsNone[j])} style={{ cursor: "pointer" }}>
                    {(props.skus.filter(itemx => itemx.idDesign === itemsNone[j])[0].urlDesign.split(";")[1] !== undefined) ?
                        <a href={props.skus.filter(itemx => itemx.idDesign === itemsNone[j])[0].urlDesign.split(";")[1]} target="_blank">

                            {(FileClick.filter(item => item === itemsNone[j]).length === 0) ? <img className="dl" src={"./download.svg"}></img> : <img className="dl" src={window.location.origin + "/download2.svg"}></img>}

                        </a> : ""

                    }
                </td>
            </tr>)
    }
    return (
        <div className="">
            <div className="d-flex justify-content-center">
                <input id='file-input' type='file' className=" btn btn-info" onChange={checkFilesNone} multiple style={{ display: "none" }} />
                <label htmlFor="file-input" className="input_exel btn btn-info">Kiểm tra file PNG</label>
            </div>

            <div className="row justify-content-center">
                <div className="col-5">
                    {
                        (tableitemsnone.length !== 0) ? (<table className="table table-striped table_amounts">
                            <thead>
                                <tr>
                                    <td >STT</td>
                                    <td >url</td>
                                    <td >Tên</td>
                                </tr>
                            </thead>
                            <tbody>
                                {tableitemsnone}
                            </tbody>
                        </table>) : ""
                    }
                </div>

            </div>
        </div>
    );
}

export default CheckFileIn;