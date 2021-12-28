import React from 'react';
import copy from 'copy-to-clipboard';

function ShowFailCase(props) {
    let items = props.items;
    // console.log(items);
    if (items.length !== 0) {
        items = items.map((item, key) => <div className="d-flex justify-content-center mt-1">
            <span className="item_thua col-2" onClick={() => copy(item.idClient)}>{item.idClient}</span>
            <span className="item_thua col-5" onClick={() => copy(item.product)}>{item.product}</span>
            <span className="item_thua col-5" onClick={() => copy(item.phoneCase)}>{item.phoneCase}</span>

        </div>)
    }
    return (
        <div style={{ textAlign: 'center',width:"70%",margin:"auto" }}>
            {(items.length === 0) ? "" : <React.Fragment>
                <h3>Thiếu Variant</h3>
                <div className="d-flex justify-content-center mt-1">
                    <span className="item_thua col-2" >item</span>
                    <span className="item_thua col-5" >productType</span>
                    <span className="item_thua col-5" >varitant</span>
                </div>



                
            </React.Fragment>}


            {items}
        </div>
    );
}

export default ShowFailCase;