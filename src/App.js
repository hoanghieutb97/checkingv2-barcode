import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as constants from "./constants";
import Body from './components/body/Body';
import Button from '@material-ui/core/Button';
// import ThongSo from "./components/body/ThongSo";
import Loading from './components/body/Loading';
import _ from "lodash";
import Particles from 'react-particles-js';
function App() {
  const [Pc_pro, setPc_pro] = useState({ items: [], type: null });
  const [Type, setType] = useState("tem normal");
  // const [TableValue, setTableValue] = useState({ hAll: 1000, wAll: 1600 });
  const [TableValue, setTableValue] = useState({ hAll: 1250, wAll: 2440 });
  const [FetchAPI, setFetchAPI] = useState(true);
  const [MutiExcel, setMutiExcel] = useState(false);
  const [FileDesign, setFileDesign] = useState("");
  const [InputFileDesign, setInputFileDesign] = useState("");
  const [ListProduct, setListProduct] = useState([
    ["glass", "Pc glass"],
    ["luminous", "PC luminous"],
    ["silicon", "PC silicon"],
    ["led", "PC led"],
    ["mug", "cốc nhiệt"],
    ["bovien20", "bo viền 20"],
    ["normal", "normal"],
    ["mirror normal", "normal mirror"],
    ["keyChain normal", "keyChain normal"],
    ["keyChain mirror", "keyChain mirror"],
    ["keyChain Alunium", "keyChain Alunium"],
    ["candle holder", "candle holder"],
    ["dock", "dock"],
    ["wood orrnament 2m", "wood orrnament 2m"],
    ["wood orrnament 2layer", "wood orrnament 2layer"],
    ["mica carOrnament 2m", "mica carOrnament 2m"],
    ["ornament auto cut 1m", "gỗ 9cm 1m (bàn cắt)"],
    ["ornament mica auto cut 1m", "mica 9cm 1m (bàn cắt)"],
    ["mica carOrnament 2m testNet", "mica 9cm 2m (bàn cắt)"],
    ["wood carOrnament 2m testNet", "gỗ 9cm 2m (bàn cắt)"],
    ["oAL1", "oal1"],
    ["ornament dzt", "quả tạ"],
    ["dia than 2m", "đĩa than 2m"],
    ["ornament su", "ornament sứ"],
    ["ornament su 2m", "ornament sứ 2 mặt"],
    ["custom ornament titanium", "custom ornament titanium"],
    ["print metal", "print metal"],
    ["cut metal", "cut metal"],
    ["wood cut raw", "wood cut raw"],
    ["wood cut raw render", "wood cut raw render"],
    ["testNet", "testNet"],
    ["oal 2m", "nhôm 2m"],
    ["tem normal", "in tem"],


  ]);
  if (localStorage.myIp === undefined) localStorage.myIp = "113.190.234.22";
  if (localStorage.FileDesign === undefined) localStorage.FileDesign = "[]";

  useEffect(() => { // fetch glass
    if (localStorage.FileDesign === undefined) localStorage.FileDesign = "[]";
    if (localStorage["tem normal"] !== undefined)
      setFileDesign(JSON.parse(localStorage["tem normal"]));
    let ignore = false;
    async function fetchData() {
      const result = await axios(constants.gllm);
      if (!ignore) {
        setPc_pro({ items: result.data, type: "gllm" });
        setFetchAPI(false);
      };
    }
    fetchData();
    return () => { ignore = true; }
  }, []);


  let fetchPcPro = (param) => {
    setFetchAPI(true);
    async function fetchData() {
      const result = await axios(constants[param]);
      setPc_pro({ items: result.data, type: param });
      setFetchAPI(false);

    }
    fetchData();
  }
  let addFileDesign = (param) => {
    let arr = JSON.parse(localStorage.FileDesign);
    arr.push(param.split("\\").join("/"));
    // console.log(arr);
    localStorage.FileDesign = JSON.stringify(arr);
    window.location.reload();

  }
  let changeProductLinkFile = (product, link) => {
    localStorage[product] = JSON.stringify(link);
    window.location.reload();
  }
  let clickproduct = (item) => {
    if (item === "silicon") fetchPcPro("silicon");
    else if (Type === "silicon" && item !== "silicon") {
      fetchPcPro("gllm")
    }
    setFileDesign(JSON.parse(localStorage[item]));
    setType(item);
  }
  let deleteFileDesign = (item) => {
    let arr = JSON.parse(localStorage.FileDesign);
    arr = arr.filter(param => param !== item);
    localStorage.FileDesign = JSON.stringify(arr);
    window.location.reload();
    // console.log(item);
  }

  if ((Type === "wood cut raw render") || (Type === "wood carOrnament 2m testNet")) {
    if (TableValue.hAll !== 900 && TableValue.wAll !== 900)
      setTableValue({ hAll: 900, wAll: 900 })
  }
  else if ((Type === "ornament dzt") || (Type === "dia than 2m")) {
    if (TableValue.hAll !== 720 && TableValue.wAll !== 1200)
      setTableValue({ hAll: 720, wAll: 1200 })
  }
  else {
    if (TableValue.hAll !== 1250 && TableValue.wAll !== 2440)
      setTableValue({ hAll: 1250, wAll: 2440 })
  }
  console.log(Pc_pro.items);
  return (
    <React.Fragment>
      {(FetchAPI === true) ? <Loading /> : ""}
      {/* render khi cai lai thong so */}
      {/* <ThongSo /> */}
      {/* <Particles /> */}
      {/* {Pc_pro.items.length !== 0 ? <img className="ruoi" src="./bengoan1.png" /> : ""}
      {Pc_pro.items.length !== 0 ? <img className="ruoi2" src="./bengoan2.png" /> : ""} */}


      <div className="App" style={{"minHeight": "100vh" }}>
        <div className="btc-goc">
          <div type="button" class="btn btn-dark ">Width:{TableValue.hAll} - Height:{TableValue.wAll}</div>
          {/* <br />
          <button type="button" class="btn btn-dark btc-so" onClick={() => setTableValue({ hAll: 1250, wAll: 2440 })}>1250 x 2440</button>
          <br />
          <button type="button" class="btn btn-dark btc-so" onClick={() => setTableValue({ hAll: 720, wAll: 1200 })}>720 x 1200(tạ dzt)</button>
          <button type="button" class="btn btn-dark btc-so" onClick={() => setTableValue({ hAll: 900, wAll: 900 })}>900 x 900(chân chó)</button> */}
        </div>
        {/* nav bar */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-brand" >Local-CheckingV2</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav mr-auto">
                    {/* <li className="nav-item active">
                      <div className="nav-link" >Home <span className="sr-only">(current)</span></div>
                    </li> */}
                    <li className="nav-item dropdown active">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        File excel
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="https://docs.google.com/spreadsheets/d/1WXgvwa76BHiBARCQIU9aDLhslwBp9oOB8_FV3YrQXbg">GLLM</a>
                        <div className="dropdown-divider"></div>

                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="https://docs.google.com/spreadsheets/d/14Z32zhFCEBwKJT5piRS2eEffkOrlC8FnWJk5PpPbfYk">Silicon</a>

                      </div>

                    </li>


                    {/* FileDesign */}
                    <li className="nav-item dropdown active">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        File Design
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {JSON.parse(localStorage.FileDesign).map(item => <div className="b-fileDesign position-relative"><span className="deleteDSF" onClick={() => deleteFileDesign(item)}>-</span>{item}</div>)}

                        <input type="text" defaultValue="" onChange={(e) => setInputFileDesign(e.target.value)} className=" input-file0design" />
                        <div className="b-fileDesign-add" onClick={() => addFileDesign(InputFileDesign)}>add</div>



                      </div>

                    </li>
                    <li className="multiExcel">
                      <button type="button" class={"btn btn-" + ((MutiExcel === true) ? "danger" : "light")} onClick={() => setMutiExcel(!MutiExcel)}> {(MutiExcel === true) ? "multi Excel" : "Singer Excel"}</button>
                    </li>




                  </ul>

                </div>


              </nav>


            </div>
          </div>
        </div>

        {/* danh sach excel */}
        {/* <div className="container mt-3">
          <div className="row">
            <div className={"col-3"} >
              <Button variant="outlined" className={"mb-1 w-100  " + (Pc_pro.type === "gllm" ? " bt-show" : "")}
                onClick={() => fetchPcPro("gllm")}>Bảng 1 GLLM
            </Button>
            </div>

            <div className={"col-3"}>
              <Button variant="outlined" className={"mb-1 w-100  " + (Pc_pro.type === "silicon" ? " bt-show" : "")}
                onClick={() => fetchPcPro("silicon")}>Bảng 2 SILICON
            </Button>
            </div>

          </div>
        </div> */}

        {/* chon type */}
        <div className="container mt-3">
          <div className="row">
            {ListProduct.map(item => <div className={"col-3 position-relative"} >
              <Button variant="outlined" className={"mb-1 w-100 pro-duct " + (Type === item[0] ? " bt-show" : "") + (localStorage[item[0]] === undefined ? " noChoseLink" : "")}
                onClick={() => clickproduct(item[0])}>{item[1]}
              </Button>
              <li className="nav-item dropdown active liChoseLink" style={{ "listStyle": "none" }}>
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  +
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {JSON.parse(localStorage.FileDesign).map(item2 => <div className={"b-fileDesign" + ((localStorage[item[0]]) === JSON.stringify(item2) ? " giongFD" : "")} onClick={() => changeProductLinkFile(item[0], item2)}>{item2}</div>)}
                </div>
              </li>
            </div>)}
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Body pcPro={Pc_pro} Type={Type} TableValue={TableValue} FileDesign={FileDesign} MutiExcel={MutiExcel} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment >

  );
}

export default App;
