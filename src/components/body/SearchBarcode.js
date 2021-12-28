import React, { useState, useEffect } from 'react';
import _ from 'lodash';
function SearchBarcode(props) {

    const [ListBarcode, setListBarcode] = useState([]);
    let ChangeList = (param) => {
        console.log(param.split("\n"));
        
    }

    return (
        <React.Fragment>
            <div>
                <textarea class="input-barcode" aria-label="With textarea" onChange={(e) => ChangeList(e.target.value)}></textarea>

            </div>
        </React.Fragment >
    );
}

export default SearchBarcode;