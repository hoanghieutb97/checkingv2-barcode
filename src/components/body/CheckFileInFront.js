import React, { useState } from 'react';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
function CheckFileIn(props) {
    const [ArrNameFile, setArrNameFile] = useState([]);
    const [FileClick, setFileClick] = useState([]);
    const [FileClick2, setFileClick2] = useState([]);

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
        setFileClick2([]);
    }

    let copyText = (param) => {
        copy(param)
    }
    let copyImage = (param) => {
        copy(param);

        setFileClick([...FileClick, param]);
        setFileClick2([...FileClick2, param]);
    }
    let skus = props.skus;

    skus = skus.map(item => { return item.idDesign.trim().concat(" front") })
    let itemsNone = _.differenceBy(skus, ArrNameFile, (param) => param.toLowerCase());

    itemsNone = [...new Set(itemsNone)];
    itemsNone = itemsNone.map(itemx => {
        itemx = itemx.split(" ");
        itemx.pop();
        itemx = itemx.join(" ");
        return itemx
    })
    // console.log(props.skus); 
    let tableitemsnone = [];
    for (let j = 0; j < itemsNone.length; j++) {
        tableitemsnone.push(
            <tr key={j}>
                <td >{j + 1}</td>
                {/* <td onClick={() => copyText(itemsNone[j])} style={{ cursor: "pointer" }}>{itemsNone[j]}</td> */}
                <td style={{ cursor: "pointer" }}>
                    <a href={props.skus.filter(itemx => itemx.idDesign === itemsNone[j])[0].urlDesign.split(";")[0]} onClick={() => copyImage(itemsNone[j] + " front")} target="_blank" >

                        {(FileClick.filter(item => item === (itemsNone[j] + " front")).length === 0) ? <img className="dl" src={"./download.svg"}></img> : <img className="dl" src={window.location.origin + "/download2.svg"}></img>}

                    </a>
                </td>
                <td style={{ cursor: "pointer" }}>{itemsNone[j]}</td>
                {
                    props.skus.filter(itemx => itemx.idDesign === itemsNone[j])[0].urlDesign.split(";")[1] !== undefined ?
                        <td style={{ cursor: "pointer" }}>
                            <a href={props.skus.filter(itemx => itemx.idDesign === itemsNone[j])[0].urlDesign.split(";")[1]} onClick={() => copyImage(itemsNone[j] + " back")} target="_blank" >

                                {(FileClick2.filter(item => item === (itemsNone[j] + " back")).length === 0) ? <img className="dl" src={"./download.svg"}></img> : <img className="dl" src={window.location.origin + "/download2.svg"}></img>}
                            </a>
                        </td> : ""
                }

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
        </div >
    );
}

export default CheckFileIn;