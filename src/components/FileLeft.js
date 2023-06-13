import React, { useState, useEffect } from "react";
import "../assets/css/layout.css";
import "../assets/css/layout.scss";
import GetAppIcon from "@mui/icons-material/GetApp";
import ShareIcon from "@mui/icons-material/Share";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { postRequest, showError } from "../service/commonService";
import { BASE_URL, FIND_RESOURCE_BY_ID, SUCCESS } from "../service/constants";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

const FileDetail = () => {
  const [file, setFile] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const onClickBreadCrum = (data) => {
    console.log("data crum :: ", data);
  };

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const getMeta = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
  };

  useEffect(async () => {
    findData();
  }, []);

  const findData = async () => {
    if (params.id) {
      var fileData = null;
      const data = await postRequest(BASE_URL + FIND_RESOURCE_BY_ID, {
        id: params.id,
      });
      if (data) {
        if (data.status == SUCCESS) {
          if (!data.data.isFolder) {
            fileData = data.data;

            let folderArray = [];
            folderArray = data.data.folderPath?.map((m) => {
              return {
                name: m.name,
                id: m.id,
                href:
                  "/folder?parent=" + params.parent + "&" + "folder=" + m.id,
                onClick: onClickBreadCrum,
              };
            });

            getMeta(data.data.file, (err, img) => {
              console.log(
                "img.naturalWidth :: " +
                  img.naturalWidth +
                  "  img.naturalHeight :: " +
                  img.naturalHeight
              );
              fileData["width"] = img.naturalWidth;
              fileData["height"] = img.naturalHeight;
              console.log("fileData :: ", fileData);
              setFile(fileData);
            });
            if (folderArray.length) {
              let arrayy = folderArray.map((bread, index) =>
                index == folderArray.length - 1 ? (
                  <Typography key={index} color="text.primary">
                    {bread.name}
                  </Typography>
                ) : (
                  <Link
                    underline="hover"
                    key={index}
                    color="rgb(200, 16, 46)"
                    href={bread.href}
                    // onClick={bread.onClick}
                  >
                    <strong>
                      <u>{bread.name}</u>{" "}
                    </strong>
                  </Link>
                )
              );

              setBreadcrumbs(arrayy);
            }
          }
        } else {
          showError(data.data);
        }
      } else {
        showError();
      }
    }
  };

  return (
    <div>
      <div class="section">
        <div class="css-1h6e7bp-V-StyledOverlay">
          <div class="css-1tjfxpo-P">
            <h2 class="overlay-header-title css-12s0ktk-g-E">{file?.name}</h2>
            <button
              aria-label="close"
              class="e807l4q6 css-174pus9-w-A"
              data-id="RE_Info_Preview_close_x"
              type="button"
            >
              <span class="css-o51lz9-T">
                <svg
                  class="jss53"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className="css-1yeqqj-ae e807l4q10">
          <div className="css-ghprhf-pe e807l4q8">
            <div className="css-ecz5du-OverlayContent eduyzic4">
              <div className="css-mxd61i-StyledLayoutWrapper eduyzic0">
                <div height="162px" className="css-117wpbr-we e1vmnjjl9">
                  <div className="css-v86hxw-d e1vmnjjl6">
                    <div className="css-yj4l3y-LeftContainer e10r0o572">
                      <div className="css-u9qt4x-ContainerHeader e10r0o573">
                        <div className="css-1xusefk-StyledCheckbox e10r0o570">
                          <span
                            className="jss50 jss72 jss68 jss62 jss67 css-1siuk2u-f e1cxn8ur0"
                            data-id="RE_Info_Preview_Select_Resource"
                          >
                            <span className="jss77">
                              <span />
                              <input
                                className="jss71"
                                type="checkbox"
                                data-indeterminate="false"
                                defaultValue=""
                              />
                            </span>
                            <span className="jss78" />
                          </span>
                        </div>
                        <div className="css-tynm26-ActionMenuContainer ed9irzr1">
                          <div>
                            <GetAppIcon />
                          </div>
                          <div style={{ marginLeft: "10px" }}>
                            <ShareIcon />
                          </div>
                        </div>
                      </div>
                      <div className="css-qozap3-LeftContainerContent e10r0o571">
                        <div className="_container_8oa4ch">
                          <img
                            className="detail-bg"
                            src={file?.file}
                            alt="C_Drink_Coffee_Coldbrew_Vanilla_011819.psd"
                            style={{
                              display: "block",
                              maxWidth: "100%",
                              maxHeight: "100%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-id="RE_Info_Preview_DraggableHandle"
                    className="css-1n4pdp3-ye e1vmnjjl8"
                  >
                    <div className="css-c977od-Ae e1vmnjjl7">
                      <svg
                        className="jss53"
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        role="presentation"
                      >
                        <path
                          d="M1 0V22M5 0V22"
                          stroke="#D9D9D9"
                          strokeWidth={2}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="css-1q84ldw-d e1vmnjjl6">
                    <div className="css-1j5acs0-RightContainer e1cv5de72">
                      <Accordion
                        className=" m-0"
                        style={{ margin: "0px" }}
                        defaultExpanded={true}
                      >
                        <AccordionSummary
                          className="accord-header m-0 bg-grey"
                          style={{
                            padding: "0px",
                            background: "rgb(237, 237, 237)",
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <div className="css-19zhjyx-O e4z5otf3 ">
                            <div
                              data-id="RE_Info_Preview_Details"
                              className="css-y2h32b-B e4z5otf0"
                            >
                              <span className="css-1x56mxt-S">Main</span>
                            </div>
                          </div>
                          {/* <Typography className="">General Options</Typography> */}
                        </AccordionSummary>
                        <div className="css-ymkeaq-DetailsWrapper efd3rzj0">
                          <div
                            data-id="re_info_preview_name"
                            className="css-1l3nyhq-b e1v97hwd6"
                          >
                            <div
                              color="#737373"
                              className="css-1o7etbk-v e1v97hwd5"
                            >
                              Name
                            </div>
                            <span className="css-1aul40s-S-k e1v97hwd0">
                              <div>{file?.name}</div>
                            </span>
                          </div>
                          <div
                            data-id="re_info_preview_resource_date"
                            className="css-1l3nyhq-b e1v97hwd6"
                          >
                            <div
                              color="#737373"
                              className="css-1o7etbk-v e1v97hwd5"
                            >
                              Resource Date
                            </div>
                            <div>
                              <span className="css-7kq96q-d e143urms4">
                                {file?.createdDate}
                              </span>
                            </div>
                          </div>
                          <div className="css-1l3nyhq-b e1v97hwd6">
                            <div
                              color="#737373"
                              className="css-1o7etbk-v e1v97hwd5"
                            >
                              Added
                            </div>
                            <div>
                              <span className="css-7kq96q-d e143urms4">
                                {file?.addedBy}
                              </span>
                            </div>
                          </div>
                          <div className="css-1l3nyhq-b e1v97hwd6">
                            <div
                              color="#737373"
                              className="css-1o7etbk-v e1v97hwd5"
                            >
                              Last Updated
                            </div>
                            <div>
                              <span className="css-7kq96q-d e143urms4">
                                {file?.lastUpdatedBy}
                              </span>
                            </div>
                          </div>
                          <div
                            data-id="re_info_preview_folder_path"
                            className="css-1l3nyhq-b e1v97hwd6"
                          >
                            <div
                              color="#737373"
                              className="css-1o7etbk-v e1v97hwd5"
                            >
                              Folder Path
                            </div>
                            <div>
                              <Stack spacing={2}>
                                <Breadcrumbs
                                  separator={"/"}
                                  aria-label="breadcrumb"
                                >
                                  <Link
                                    underline="hover"
                                    color="inherit"
                                    href={
                                      "/folder?parent=" + file?.homeParentId
                                    }
                                  >
                                    <HomeIcon
                                      style={{ color: "rgb(200, 16, 46)" }}
                                    />
                                  </Link>
                                  {breadcrumbs}
                                </Breadcrumbs>
                              </Stack>
                            </div>
                          </div>
                          <div
                            data-id="re_info_preview_file_format"
                            className="css-1l3nyhq-b e1v97hwd6"
                          >
                            <div
                              color="#737373"
                              className="css-1o7etbk-v e1v97hwd5"
                            >
                              File Format
                            </div>
                            <span className="css-ph1mal-d-W e1v97hwd1">
                              <div>{file?.fileFormat}</div>
                            </span>
                          </div>
                          <div
                            data-id="re_info_preview_file_size"
                            className="css-1l3nyhq-b e1v97hwd6"
                          >
                            <div
                              color="#737373"
                              className="css-1o7etbk-v e1v97hwd5"
                            >
                              File Size
                            </div>
                            <span className="css-ph1mal-d-W e1v97hwd1">
                              <div>{file?.fileSize}</div>
                            </span>
                          </div>
                          <div className="css-1l3nyhq-b e1v97hwd6">
                            <div
                              color="#737373"
                              className="css-1o7etbk-v e1v97hwd5"
                            >
                              Image Width
                            </div>
                            <span className="css-ph1mal-d-W e1v97hwd1">
                              <div>{file?.width} pixels</div>
                            </span>
                          </div>
                          <div className="css-1l3nyhq-b e1v97hwd6">
                            <div
                              color="#737373"
                              className="css-1o7etbk-v e1v97hwd5"
                            >
                              Image Height
                            </div>
                            <span className="css-ph1mal-d-W e1v97hwd1">
                              <div>{file?.height} pixels</div>
                            </span>
                          </div>
                          <div className="css-1l3nyhq-b e1v97hwd6">
                            <div
                              color="#737373"
                              className="css-1o7etbk-v e1v97hwd5"
                            >
                              Unique ID
                            </div>
                            <span className="css-ph1mal-d-W e1v97hwd1">
                              <div>{file?._id}</div>
                            </span>
                          </div>
                          <div className="css-1l3nyhq-b e1v97hwd6">
                            <div
                              color="#737373"
                              className="css-1o7etbk-v e1v97hwd5"
                            >
                              Usage Details
                            </div>
                            <span className="css-ph1mal-d-W e1v97hwd1">
                              <div>{file?.description}</div>
                            </span>
                          </div>
                        </div>
                      </Accordion>

                      {/* <div>
                        <div className="css-1eknr6p-RowSpacer efd3rzj3" />
                        <section
                          className="efd3rzj1 css-9olsrx-k-AccordianWrapper e51it5l10"
                          data-testid="RE_Info_Preview_Metadata_Section"
                        >
                          <header
                            role="button"
                            className="css-126o97p-v e51it5l9"
                          >
                            <div className="css-16ikibj-io e51it5l1">
                              <h5 className="css-k4qa43-b e143urms7">
                                Metadata
                              </h5>
                            </div>
                            <button
                              tabIndex={0}
                              className="jss50 jss72 css-161opx4-K e51it5l4"
                              type="button"
                              nohover="true"
                            >
                              <span className="jss77">
                                <svg
                                  className="jss53 css-fxg606-D e51it5l3"
                                  focusable="false"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                  role="presentation"
                                >
                                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                </svg>
                              </span>
                            </button>
                          </header>
                        </section>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="css-dmutxw-Ie e1vmnjjl0">
                    <div className="css-hw7qmm e1vmnjjl2" />
                    <div className="css-1rbqvv8-Z e1vmnjjl3">
                      <div className="css-141ytie-be e1vmnjjl4">
                        <svg
                          className="jss53 css-u8sj0z"
                          focusable="false"
                          viewBox="0 0 12 26"
                          aria-hidden="true"
                          role="presentation"
                          fill="none"
                        >
                          <path
                            d="M0 24.593V1.09767C0 0.642244 0.559234 0.423944 0.867772 0.758929L11.688 12.5066C11.8643 12.698 11.8643 12.9927 11.688 13.1841L0.867772 24.9318C0.559235 25.2667 0 25.0484 0 24.593Z"
                            fill="#2B2B2B"
                          />
                        </svg>
                      </div>
                    </div>
                  </div> */}
                </div>
                {/* <div className="css-1ffbns-StyledAssetInfoWrapper eduyzic2">
                  <div className="css-kp2fa7-AssetInfo eduyzic1">
                    Displaying <b>1</b> of 6 in <b>Drinks</b>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDetail;
