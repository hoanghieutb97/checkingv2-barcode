import React, { useState } from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
import InputExcel from './InputExcel';
import DownloadJson from './DownloadJson';
import CheckFileIn from './CheckFileIn';
import SearchBarcode from './SearchBarcode';
import CheckFileInFront from './CheckFileInFront';
import * as GLLMTable1 from './GLLMTable1';
import * as COCNHIET from './CocNhiet';
import * as SILICON from './SILICON';
import ShowItems from './ShowItems';
import * as CheckPhoneCase from './CheckPhoneCase';
import ShowFailCase from './ShowFailCase';
import DemPhoi from './DemPhoi';

function Body(props) {
    // props.pcPro là thuoc tinh pc
    const [Items, setItems] = useState([]);
    const [FileName, setFileName] = useState("");

    let allFileName = Items.map(item => { return item.idDesign });
    let itemsConvert = [], itemsFailCase = [];
    if (Items.length !== 0) {
        itemsConvert = CheckPhoneCase.Convert(Items, props.pcPro.items)[0];
        itemsFailCase = CheckPhoneCase.Convert(Items, props.pcPro.items)[1];
        if (props.pcPro.type === "gllm") {
            itemsConvert = GLLMTable1.convertItems(itemsConvert, props.pcPro.items, props.TableValue, props.Type);
        }
        else if (props.pcPro.type === "silicon") {
            itemsConvert = SILICON.convertItems(itemsConvert, props.pcPro.items, props.TableValue);
        }

    }
    // console.log(Items);
    let arr = _.flattenDeep(JSON.parse(JSON.stringify(itemsConvert))).length;
    let checkFilein = <CheckFileIn skus={Items} />;
    if (props.Type === "keyChain normal" 
    || props.Type === "keyChain mirror" 
    || props.Type === "keyChain Alunium" 
    || props.Type === "mica carOrnament 2m" 
    || props.Type === "ornament su 2m" 
    || props.Type === "wood orrnament 2m"
    || props.Type === "mica carOrnament 2m testNet"
    || props.Type === "wood orrnament 2layer"
    || props.Type === "oal 2m"
    || props.Type === "dia than 2m"
    || props.Type === "wood carOrnament 2m testNet"
    
    )
        checkFilein = <CheckFileInFront skus={Items} />
    // console.log(props.Type);
    return (
        <React.Fragment>
            <div>
                {/* in [ut nhập excel] */}
                <InputExcel changeInputItems={(items) => { setItems(items) }} changeFileName={(param) => { setFileName(param) }} MutiExcel={props.MutiExcel} />
                {/* kiểm tra file design` */}
                {props.MutiExcel === true ? <SearchBarcode /> : ""}

                <div className="so-luong"> Tổng tất cả:{arr} </div>
                {checkFilein}
                {/* kiểm tra sku sai đúng */}
                <ShowFailCase items={itemsFailCase} />
                {/* tải Json */}
                <DownloadJson items={itemsConvert} FileDesign={props.FileDesign} typeTable={props.pcPro.type} FileName={FileName} Type={props.Type} TableValue={props.TableValue} />
                {/* hiển thị ốp ra màn hình */}
                <ShowItems items={itemsConvert} typeTable={props.pcPro.type} FileName={FileName} Type={props.Type} />
                <DemPhoi items={itemsConvert} pcPro={props.pcPro} />


            </div>

        </React.Fragment >
    );
}

export default Body;