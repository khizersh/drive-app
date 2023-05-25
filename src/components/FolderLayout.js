import React from "react";
import Drawer from "../components/drawer";
import "../assets/css/layout.css";
import "../assets/css/layout.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ArrowRight from '@mui/icons-material/ArrowRight'
import Camera from '@mui/icons-material/Camera';
import Menu from '@mui/icons-material/Menu';
import Tune from '@mui/icons-material/Tune';
import Public from '@mui/icons-material/Public';
import Accordion from 'react-bootstrap/Accordion';




class FolderLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftOpen: true,
    };
  }

  toggleSidebar = (event) => {
    let key = `${event.currentTarget.parentNode.id}Open`;
    this.setState({ [key]: !this.state[key] });
  };

  render() {
    let leftOpen = this.state.leftOpen ? "open" : "closed";
    // let rightOpen = this.state.rightOpen ? 'open' : 'closed';

    return (
      <div id="layout">
        <div id="left" className={leftOpen}>
          {/* <div className='icon'
                   onClick={this.toggleSidebar} >
                   &equiv;
              </div> */}
          <div className={`sidebar ${leftOpen}`}>
            <div className="header">
           
            </div>
            <div className="content">
    
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                  <div class="_row_raku75">
  <div class="_thumbColumn_1iasqch">
    <div class="_thumbnailContainer_1dic54o">
      <div class="_thumbnailContainer_1dic54op">
        <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
      </div>
    </div>
  </div>


    <div class="_detailColumn_1slhs1j">
      <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
        <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
          <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
            <div>
              <div class="_truncate_ww5d6d">
                <span>Brand Assets</span>
              </div>
            </div>
          </a>
        </div>
                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span><i>15 Sub-Folders</i></span>
                  </div>
                </div>
                <div class="_indicatorRow_5kaapu">
                  <div class="_indicatorRow_5kaapuss">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button class="_iconButton_ht0taf" tabindex="0" type="button">
                          <div>
                            <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                   
      </div>
    </div>
</div>
                  </Accordion.Header>
                  <Accordion.Body>
                  <div class="_row_raku75SubMenu">
  <div class="_thumbColumn_1iasqch">
    <div class="_thumbnailContainer_1dic54o">
      <div class="_thumbnailContainer_1dic54op">
        <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
      </div>
    </div>
  </div>


    <div class="_detailColumn_1slhs1j">
      <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
        <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
          <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
            <div>
              <div class="_truncate_ww5d6d">
                <span>Brand Assets</span>
              </div>
            </div>
          </a>
        </div>
                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span><i>15 Sub-Folders</i></span>
                  </div>
                </div>
                <div class="_indicatorRow_5kaapu">
                  <div class="_indicatorRow_5kaapuss">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button class="_iconButton_ht0taf" tabindex="0" type="button">
                          <div>
                            <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                   
      </div>
    </div>
</div>




<div class="_row_raku75SubMenu">
  <div class="_thumbColumn_1iasqch">
    <div class="_thumbnailContainer_1dic54o">
      <div class="_thumbnailContainer_1dic54op">
        <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
      </div>
    </div>
  </div>


    <div class="_detailColumn_1slhs1j">
      <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
        <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
          <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
            <div>
              <div class="_truncate_ww5d6d">
                <span>Brand Assets</span>
              </div>
            </div>
          </a>
        </div>
                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span><i>15 Sub-Folders</i></span>
                  </div>
                </div>
                <div class="_indicatorRow_5kaapu">
                  <div class="_indicatorRow_5kaapuss">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button class="_iconButton_ht0taf" tabindex="0" type="button">
                          <div>
                            <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                   
      </div>
    </div>


</div>

<div class="_row_raku75SubMenuChild">
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
        <div class="_row_raku75SubMenu">
  <div class="_thumbColumn_1iasqch">
    <div class="_thumbnailContainer_1dic54o">
      <div class="_thumbnailContainer_1dic54op">
        <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
      </div>
    </div>
  </div>


    <div class="_detailColumn_1slhs1j">
      <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
        <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
          <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
            <div>
              <div class="_truncate_ww5d6d">
                <span>Brand Assets</span>
              </div>
            </div>
          </a>
        </div>
                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span><i>15 Sub-Folders</i></span>
                  </div>
                </div>
                <div class="_indicatorRow_5kaapu">
                  <div class="_indicatorRow_5kaapuss">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button class="_iconButton_ht0taf" tabindex="0" type="button">
                          <div>
                            <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                   
      </div>
    </div>
</div>
        </Accordion.Header>
        <Accordion.Body>
        <div class="_row_raku75SubMenu childmenu">
  <div class="_thumbColumn_1iasqch">
    <div class="_thumbnailContainer_1dic54o">
      <div class="_thumbnailContainer_1dic54op">
        <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
      </div>
    </div>
  </div>


    <div class="_detailColumn_1slhs1j">
      <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
        <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
          <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
            <div>
              <div class="_truncate_ww5d6d">
                <span>Brand Assets</span>
              </div>
            </div>
          </a>
        </div>
                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span><i>15 Sub-Folders</i></span>
                  </div>
                </div>
                <div class="_indicatorRow_5kaapu">
                  <div class="_indicatorRow_5kaapuss">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button class="_iconButton_ht0taf" tabindex="0" type="button">
                          <div>
                            <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                   
      </div>
    </div>
</div>


<div class="_row_raku75SubMenu childmenu">
  <div class="_thumbColumn_1iasqch">
    <div class="_thumbnailContainer_1dic54o">
      <div class="_thumbnailContainer_1dic54op">
        <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
      </div>
    </div>
  </div>


    <div class="_detailColumn_1slhs1j">
      <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
        <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
          <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
            <div>
              <div class="_truncate_ww5d6d">
                <span>Brand Assets</span>
              </div>
            </div>
          </a>
        </div>
                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span><i>15 Sub-Folders</i></span>
                  </div>
                </div>
                <div class="_indicatorRow_5kaapu">
                  <div class="_indicatorRow_5kaapuss">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button class="_iconButton_ht0taf" tabindex="0" type="button">
                          <div>
                            <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                   
      </div>
    </div>
</div>

<div class="_row_raku75SubMenu childmenu">
  <div class="_thumbColumn_1iasqch">
    <div class="_thumbnailContainer_1dic54o">
      <div class="_thumbnailContainer_1dic54op">
        <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
      </div>
    </div>
  </div>


    <div class="_detailColumn_1slhs1j">
      <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
        <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
          <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
            <div>
              <div class="_truncate_ww5d6d">
                <span>Brand Assets</span>
              </div>
            </div>
          </a>
        </div>
                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span><i>15 Sub-Folders</i></span>
                  </div>
                </div>
                <div class="_indicatorRow_5kaapu">
                  <div class="_indicatorRow_5kaapuss">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button class="_iconButton_ht0taf" tabindex="0" type="button">
                          <div>
                            <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                   
      </div>
    </div>
</div>
        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>

    </div>

<div class="_row_raku75SubMenu">
  <div class="_thumbColumn_1iasqch">
    <div class="_thumbnailContainer_1dic54o">
      <div class="_thumbnailContainer_1dic54op">
        <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
      </div>
    </div>
  </div>


    <div class="_detailColumn_1slhs1j">
      <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
        <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
          <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
            <div>
              <div class="_truncate_ww5d6d">
                <span>Brand Assets</span>
              </div>
            </div>
          </a>
        </div>
                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span><i>15 Sub-Folders</i></span>
                  </div>
                </div>
                <div class="_indicatorRow_5kaapu">
                  <div class="_indicatorRow_5kaapuss">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button class="_iconButton_ht0taf" tabindex="0" type="button">
                          <div>
                            <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                   
      </div>
    </div>
</div>

<div class="_row_raku75SubMenu">
  <div class="_thumbColumn_1iasqch">
    <div class="_thumbnailContainer_1dic54o">
      <div class="_thumbnailContainer_1dic54op">
        <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
      </div>
    </div>
  </div>


    <div class="_detailColumn_1slhs1j">
      <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
        <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
          <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
            <div>
              <div class="_truncate_ww5d6d">
                <span>Brand Assets</span>
              </div>
            </div>
          </a>
        </div>
                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span><i>15 Sub-Folders</i></span>
                  </div>
                </div>
                <div class="_indicatorRow_5kaapu">
                  <div class="_indicatorRow_5kaapuss">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button class="_iconButton_ht0taf" tabindex="0" type="button">
                          <div>
                            <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                   
      </div>
    </div>
</div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                  <div class="_row_raku75">
                <div class="_thumbColumn_1iasqch">
                  <div class="_thumbnailContainer_1dic54o">
                    <div class="_thumbnailContainer_1dic54op">
                      <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
                    </div>
                  </div>
                </div>
        

                  <div class="_detailColumn_1slhs1j">
                    <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
                      <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
                        <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
                          <div>
                            <div class="_truncate_ww5d6d">
                              <span>Brand Assets</span>
                            </div>
                          </div>
                        </a>
                      </div>
                              <div class="_countContainer_13ovesk">
                                <div class="_truncateMulti_3ywtd5">
                                  <span><i>15 Sub-Folders</i></span>
                                </div>
                              </div>
                                  <div>
                                    <div class="_indicatorRow_5kaapu">
                                      <div class="_indicatorRow_5kaapuss">
                                        <div class="_container_1892uua ">
                                          <a class="_linkColours_11bsm43">
                                            <button class="_iconButton_ht0taf" tabindex="0" type="button">
                                              <div>
                                                <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                                              </div>
                                            </button>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                    </div>
                  </div>
                  </div>
                  </Accordion.Header>
                  <Accordion.Body>
                
<div class="_row_raku75SubMenu">
  <div class="_thumbColumn_1iasqch">
    <div class="_thumbnailContainer_1dic54o">
      <div class="_thumbnailContainer_1dic54op">
        <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
      </div>
    </div>
  </div>


    <div class="_detailColumn_1slhs1j">
      <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
        <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
          <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
            <div>
              <div class="_truncate_ww5d6d">
                <span>Brand Assets</span>
              </div>
            </div>
          </a>
        </div>
                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span><i>15 Sub-Folders</i></span>
                  </div>
                </div>
                <div class="_indicatorRow_5kaapu">
                  <div class="_indicatorRow_5kaapuss">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button class="_iconButton_ht0taf" tabindex="0" type="button">
                          <div>
                            <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                   
      </div>
    </div>
</div>


<div class="_row_raku75SubMenu">
  <div class="_thumbColumn_1iasqch">
    <div class="_thumbnailContainer_1dic54o">
      <div class="_thumbnailContainer_1dic54op">
        <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
      </div>
    </div>
  </div>


    <div class="_detailColumn_1slhs1j">
      <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
        <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
          <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
            <div>
              <div class="_truncate_ww5d6d">
                <span>Brand Assets</span>
              </div>
            </div>
          </a>
        </div>
                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span><i>15 Sub-Folders</i></span>
                  </div>
                </div>
                <div class="_indicatorRow_5kaapu">
                  <div class="_indicatorRow_5kaapuss">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button class="_iconButton_ht0taf" tabindex="0" type="button">
                          <div>
                            <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                   
      </div>
    </div>
</div>


<div class="_row_raku75SubMenu">
  <div class="_thumbColumn_1iasqch">
    <div class="_thumbnailContainer_1dic54o">
      <div class="_thumbnailContainer_1dic54op">
        <img class="_thumbnail_2i8afq" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
      </div>
    </div>
  </div>


    <div class="_detailColumn_1slhs1j">
      <div style={{marginBottom: "auto", marginTop: "auto", maxWidth: "230px"}}>
        <div class="_title_k7qvdu" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
          <a class="_title_k7qvdu" target="_blank" href="#" style={{fontWeight: "bold", color: "rgb(200, 16, 46)"}}>
            <div>
              <div class="_truncate_ww5d6d">
                <span>Brand Assets</span>
              </div>
            </div>
          </a>
        </div>
                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span><i>15 Sub-Folders</i></span>
                  </div>
                </div>
                <div class="_indicatorRow_5kaapu">
                  <div class="_indicatorRow_5kaapuss">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button class="_iconButton_ht0taf" tabindex="0" type="button">
                          <div>
                            <span class="material-icons _icon_1v098ov" color="#4a4a4a"><Public/> </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                   
      </div>
    </div>
</div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <div class="d-flex" id="left" className={leftOpen}>
              <div className="icon" onClick={this.toggleSidebar}>
                <Menu />
                {/* &equiv; */}
              </div>
              <p class="ms-3 mb-0 menuText"> Resources</p>
            </div>

            <div class="header-bar--flex">
              <div class="_inputContainer_3j3zds">
                <div class="_searchIcon_wt0fza">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                  class="_input_1ogbq7d"
                  placeholder="What are you looking for?"
                  spellcheck="true"
                  value=""
                />
                <span class="_noCancelIcon_cvqqax"></span>
                <div class="_noCancelIcon_cvqqaxww">
                  <div class="_container_1892uua ">
                    <a class="_linkColours_11bsm43">
                      <button class="_iconButton_1i1401z" tabindex="0" type="button">
                      <span class="material-icons " 
                        color="#4a4a4a"> <Tune style={{ color: '#4a4a4a' }}/></span>
                       
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>


            {/* <div class="_f5t5u5d">
              <div class="_headerActions_19tfjki">
                <div class="actions-menu ">
                  <button tabindex="0" type="button" style="border: 10px; box-sizing: border-box; display: inline-block; font-family: Helvetica, Arial, sans-serif; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); cursor: auto; text-decoration: none; margin: 0px; padding: 0px; outline: none; font-size: inherit; font-weight: inherit; position: relative; height: 36px; line-height: 36px; width: 100%; border-radius: 4px; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; background-color: rgb(200, 16, 46); text-align: center;">
                    <div>
                      <div style="height: 36px; border-radius: 4px; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; top: 0px; line-height: 36px; cursor: auto;">
                        <span color="#ffffff" class="material-icons" style="color: rgb(255, 255, 255); position: relative; font-size: 24px; display: inline-block; user-select: none; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; vertical-align: middle; margin-left: 12px; margin-right: 0px;">
                          add
                          </span>
                          <span style="position: relative; opacity: 1; font-size: 14px; letter-spacing: 0px; text-transform: uppercase; font-weight: bold; margin: 0px; user-select: none; padding-left: 8px; padding-right: 16px; color: rgb(255, 255, 255);">
                            Add
                            </span>
                            </div>
                            </div>
                            </button>
                            </div>
                            </div>
                            </div> */}

            
          </div>
          <div className="content">
            <h3>Main content</h3>
            <br />
            <p>
              Nam accumsan eleifend metus at imperdiet. Mauris pellentesque
              ipsum nisi, et fringilla leo blandit sed. In tempor, leo sit amet
              fringilla imperdiet, ipsum enim sagittis sem, non molestie nisi
              purus consequat sapien. Proin at velit id elit tincidunt iaculis
              ac ac libero. Vivamus vitae tincidunt ex. Duis sit amet lacinia
              massa. Quisque lobortis tincidunt metus ut commodo. Sed euismod
              quam gravida condimentum commodo.
            </p>
            <br />
            <p>
              Vivamus tincidunt risus ut sapien tincidunt, ac fermentum libero
              dapibus. Duis accumsan enim ac magna tempor, vestibulum euismod
              nisl pharetra. Ut dictum lacus eu venenatis vestibulum. Vestibulum
              euismod at arcu ac blandit. Curabitur eu imperdiet magna. Duis
              bibendum efficitur diam, eget placerat nunc imperdiet eget. Morbi
              porta at leo sed porta. Nullam eleifend eleifend quam eget dictum.
            </p>
            <br />

     
       
   
            <p>
              Sed nulla erat, lacinia sit amet dui at, cursus blandit neque. In
              ultricies, dui a laoreet dignissim, risus mi cursus risus, at
              luctus sem arcu non tortor. In hac habitasse platea dictumst.
              Etiam ut vulputate augue. Aenean efficitur commodo ipsum, in
              aliquet arcu blandit non. Praesent sed tempus dui, non eleifend
              nisi. Proin non finibus diam, quis finibus ante. Fusce aliquam
              faucibus mauris, id consequat velit ultricies at. Aliquam neque
              erat, fermentum non aliquam id, mattis nec justo. Nullam eget
              suscipit lectus.
            </p>
          </div>
        </div>
      </div>

      
    );
  }
}

export default FolderLayout;
