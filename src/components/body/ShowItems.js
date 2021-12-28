import React from 'react';
import OneItem from "./OneItem";
import _ from "lodash";
function ShowItems(props) {
    let items = JSON.parse(JSON.stringify(props.items));
    let FileName = props.FileName;
    let typeTable = props.typeTable;
    let Type = props.Type;

    let danhSachItem;

    if (items.length !== 0 & typeTable === "gllm" ) { // render khi ban la gllm - led
        danhSachItem = items.map((table, key1) => <div className="container-fluid khoangcasch mt-5" key={key1}>
            <div className={"container-fluid "} style={{ width: "80%" }}>
                <div className="row border_khung">
                    <div className="col-12 border_khung_duoi title-table">
                        <div className="titlecon-table">
                            Bàn {key1 + 1} {FileName}
                        </div>
                        <div className="titlecon-table">
                            Số lượng: {table.length}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            {table.map((item, key2) =>
                                <OneItem key={key2} item={item} Type={Type}FileName={FileName} />)}
                        </div>
                    </div>

                </div>
            </div>

        </div>)
    }
    else if (items.length !== 0 & typeTable === "silicon") { // render khi ban la silicon
        items = items.map(item => {
            item = item.map(z9Sort1 => {
                while (z9Sort1.length < 24) {
                    z9Sort1.push({
                        idClient: null,
                        country: null,
                        amount: null,
                        idDesign: null,
                        phoneCase: null,
                        stt: null
                    })
                }

                let a = _.chunk(z9Sort1, 8); return a
            });
            return item
        })
        danhSachItem = items.map(ztalbe => ztalbe.map((oneTable, key) => <div className="container-fluid khoangcasch mt-5" key={key}>
            <div className={"container-fluid "} style={{ width: "80%" }}>
                <div className="row border_khung">
                    <div className="col-12 border_khung_duoi title-table">
                        <div className="titlecon-table">
                            Bàn {key + 1} {FileName}

                        </div>

                    </div>
                    <div className="col-12">
                        <div className="row flex-column-reverse">
                            {oneTable.map(item8 => <div className="d-flex">
                                {
                                    item8.map((item, key2) => <OneItem key={key2} item={item} Type={Type}FileName={FileName} />)
                                }
                            </div>)
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>)
        )

    }


    else if (items.length !== 0 & typeTable === "cocnhiet") { // render khi ban la coc nhiet
        danhSachItem = items.map((table, key1) => <div className="container-fluid khoangcasch mt-5" key={key1}>
            <div className={"container-fluid "} style={{ width: "80%" }}>
                <div className="row border_khung">
                    <div className="col-12 border_khung_duoi title-table">
                        <div className="titlecon-table">
                            Bàn {key1 + 1} {FileName}
                        </div>
                        <div className="titlecon-table">
                            Số lượng: {table.length}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            {table.map((item, key2) =>
                                <OneItem key={key2} item={item} Type={Type} />)}
                        </div>
                    </div>

                </div>
            </div>

        </div>)
    }

    return (
        <React.Fragment>

            <div>
                {danhSachItem}
            </div>
        </React.Fragment>

    );
}

export default ShowItems;