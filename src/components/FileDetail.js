import React,{useState , useEffect} from "react";
import "../assets/css/layout.css";
import "../assets/css/layout.scss";

const FileDetail = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    
    useEffect(() => {
     
    }, [])
    
  return <div>

<div class="section">
  <div class="css-1h6e7bp-V-StyledOverlay">
    <div class="css-1tjfxpo-P">
      <h2 class="overlay-header-title css-12s0ktk-g-E">Info Preview - C_Drink_Coffee_Coldbrew_Vanilla_011819</h2>
      <button aria-label="close" class="e807l4q6 css-174pus9-w-A" data-id="RE_Info_Preview_close_x" type="button">
        <span class="css-o51lz9-T"><svg class="jss53" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
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
                  <div
                    data-testid="primary-actions"
                    className="css-1wsi2nc-q e6no5q70"
                  >
                    <span title="Download this Resource">
                      <div
                        data-id="re_single_download_action"
                        className="css-x4pcj5-D e6no5q71"
                      >
                        <i className="material-icons file_download css-fk6d94-StyledIcon ed9irzr0">
                          file_download
                        </i>
                      </div>
                    </span>
                    <span title="Share this Resource">
                      <div
                        data-id="re_public_share_embed_cdn_link_action"
                        className="css-x4pcj5-D e6no5q71"
                      >
                        <i className="material-icons share css-fk6d94-StyledIcon ed9irzr0">
                          share
                        </i>
                      </div>
                    </span>
                    <span title="Email a link to this Resource">
                      <div
                        data-id="re_resource_action_email_link"
                        className="css-x4pcj5-D e6no5q71"
                      >
                        <i className="material-icons email css-fk6d94-StyledIcon ed9irzr0">
                          email
                        </i>
                      </div>
                    </span>
                    <div className="dropdown-menu css-12mto0f-ee e19x7btr5">
                      <button
                        aria-label="Toggle Menu"
                        aria-haspopup="true"
                        data-id="RE_Info_Action_List"
                        type="button"
                        className="css-jww1lo-w enro81a3"
                      >
                        <span className="css-o51lz9-T enro81a2">
                          <svg
                            className="jss53  css-1dfsjzh-m ewztoti0"
                            focusable="false"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            role="presentation"
                          >
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="css-qozap3-LeftContainerContent e10r0o571">
                <div className="_container_8oa4ch">
                  <img
                    className=""
                    src="https://usprod2usv3.intelligencebank.com/api/3.0.0/Dnn9/file?file_hash=56a8e49be030219f4844e8acc4156377&resource_uuid=cf86a20139c549ce949f7cabf05a7444&sid=030927a6ef6514e89b8788c433cf6dc9&watermark_hash=sfvhpfqkrq3yoeiegpi7w6naacby7ch5&action=preview&token=SFMyNTY.g2gDbQAAABZJQiBQbGF0Zm9ybSBUb2tlbiBEYXRhbgYApJXpi4gBYgABUYA.Q5CEtvcnS01h_g_cp_E6oerjPR7cq1hzfBvfkffS9y4"
                    alt="C_Drink_Coffee_Coldbrew_Vanilla_011819.psd"
                    style={{
                      display: "block",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      backgroundImage: 'url("../images/checkered-background.png")'
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
            <div className="css-ista28-P e4z5otf4">
              <div className="css-19zhjyx-O e4z5otf3">
                <div
                  data-id="RE_Info_Preview_Details"
                  className="css-y2h32b-B e4z5otf0"
                >
                  <span className="css-1x56mxt-S e143urms5">Main</span>
                </div>
                <div
                  data-id="RE_Info_Preview_Alias"
                  className="css-1h091bq-B e4z5otf0"
                >
                  <span className="css-1x56mxt-S e143urms5">Aliases</span>
                </div>
              </div>
            </div>
            <div className="css-1j5acs0-RightContainer e1cv5de72">
              <section
                className="efd3rzj1 css-9olsrx-k-AccordianWrapper e51it5l10"
                data-testid="RE_Info_Preview_Main_Details_Section"
              >
                <header role="button" className="css-126o97p-v e51it5l9">
                  <div className="css-16ikibj-io e51it5l1">
                    <h5 className="css-k4qa43-b e143urms7">Details</h5>
                  </div>
                  <button
                    tabIndex={0}
                    className="jss50 jss72 css-161opx4-K e51it5l4"
                    type="button"
                    nohover="true"
                  >
                    <span className="jss77">
                      <svg
                        className="jss53 css-szicm5-j e51it5l2"
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        role="presentation"
                      >
                        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                      </svg>
                    </span>
                  </button>
                </header>
                <article className="css-17ftsys-B e51it5l7">
                  <div className="css-ymkeaq-DetailsWrapper efd3rzj0">
                    <div
                      data-id="re_info_preview_name"
                      className="css-1l3nyhq-b e1v97hwd6"
                    >
                      <div color="#737373" className="css-1o7etbk-v e1v97hwd5">
                        Name
                      </div>
                      <span className="css-1aul40s-S-k e1v97hwd0">
                        <div>
                          C_Drink_Coffee_Coldbrew_Vanilla_011819 (Version 1)
                        </div>
                      </span>
                    </div>
                    <div
                      data-id="re_info_preview_resource_date"
                      className="css-1l3nyhq-b e1v97hwd6"
                    >
                      <div color="#737373" className="css-1o7etbk-v e1v97hwd5">
                        Resource Date
                      </div>
                      <div>
                        <span className="css-7kq96q-d e143urms4">
                          3/22/2022
                        </span>
                      </div>
                    </div>
                    <div className="css-1l3nyhq-b e1v97hwd6">
                      <div color="#737373" className="css-1o7etbk-v e1v97hwd5">
                        Added
                      </div>
                      <div>
                        <span className="css-7kq96q-d e143urms4">
                          Presley Lee
                        </span>
                        ,&nbsp;
                        <span className="css-7kq96q-d e143urms4">
                          3/23/2022 15:18 (EDT)
                        </span>
                      </div>
                    </div>
                    <div className="css-1l3nyhq-b e1v97hwd6">
                      <div color="#737373" className="css-1o7etbk-v e1v97hwd5">
                        Last Updated
                      </div>
                      <div>
                        <span className="css-7kq96q-d e143urms4">
                          Presley Lee
                        </span>
                        ,&nbsp;
                        <span className="css-7kq96q-d e143urms4">
                          3/23/2022 15:18 (EDT)
                        </span>
                      </div>
                    </div>
                    <div
                      data-id="re_info_preview_folder_path"
                      className="css-1l3nyhq-b e1v97hwd6"
                    >
                      <div color="#737373" className="css-1o7etbk-v e1v97hwd5">
                        Folder Path
                      </div>
                      <div>
                        <div style={{ display: "inline" }}>
                          <span className="css-gk65sv-FolderPathWrapper e1cv5de70">
                            <a
                              target="_blank"
                              href="https://www.ckelibrary.com/resource/folder/index/02b0623f66b2c165ad4a86d1a1c1539c"
                              rel="noreferrer"
                              className="css-c6scz2-FolderLinkWrapper e1cv5de71"
                            >
                              Resources
                            </a>
                          </span>
                          <span className="css-gk65sv-FolderPathWrapper e1cv5de70">
                            {" "}
                            /{" "}
                            <a
                              target="_blank"
                              href="https://www.ckelibrary.com/resource/folder/index/f774ccae9d34dff1234fcb7b1d0e0a54"
                              rel="noreferrer"
                              className="css-c6scz2-FolderLinkWrapper e1cv5de71"
                            >
                              Core Product Photography
                            </a>
                          </span>
                          <span className="css-gk65sv-FolderPathWrapper e1cv5de70">
                            {" "}
                            /{" "}
                            <a
                              target="_blank"
                              href="https://www.ckelibrary.com/resource/folder/index/eb1eaa7259beafdfd26b9177f65fb52a"
                              rel="noreferrer"
                              className="css-c6scz2-FolderLinkWrapper e1cv5de71"
                            >
                              Drinks
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      data-id="re_info_preview_file_format"
                      className="css-1l3nyhq-b e1v97hwd6"
                    >
                      <div color="#737373" className="css-1o7etbk-v e1v97hwd5">
                        File Format
                      </div>
                      <span className="css-ph1mal-d-W e1v97hwd1">
                        <div>Photoshop (psd)</div>
                      </span>
                    </div>
                    <div
                      data-id="re_info_preview_file_size"
                      className="css-1l3nyhq-b e1v97hwd6"
                    >
                      <div color="#737373" className="css-1o7etbk-v e1v97hwd5">
                        File Size
                      </div>
                      <span className="css-ph1mal-d-W e1v97hwd1">
                        <div>69.46 MB</div>
                      </span>
                    </div>
                    <div className="css-1l3nyhq-b e1v97hwd6">
                      <div color="#737373" className="css-1o7etbk-v e1v97hwd5">
                        Image Width
                      </div>
                      <span className="css-ph1mal-d-W e1v97hwd1">
                        <div>4326 pixels</div>
                      </span>
                    </div>
                    <div className="css-1l3nyhq-b e1v97hwd6">
                      <div color="#737373" className="css-1o7etbk-v e1v97hwd5">
                        Image Height
                      </div>
                      <span className="css-ph1mal-d-W e1v97hwd1">
                        <div>6707 pixels</div>
                      </span>
                    </div>
                    <div className="css-1l3nyhq-b e1v97hwd6">
                      <div color="#737373" className="css-1o7etbk-v e1v97hwd5">
                        Unique ID
                      </div>
                      <span className="css-ph1mal-d-W e1v97hwd1">
                        <div>cf86a20139c549ce949f7cabf05a7444</div>
                      </span>
                    </div>
                    <div
                      data-id="re_info_preview_ownership_type"
                      className="css-1l3nyhq-b e1v97hwd6"
                    >
                      <div color="#737373" className="css-1o7etbk-v e1v97hwd5">
                        Ownership Type
                      </div>
                      <div>Undefined</div>
                    </div>
                    <div className="css-1l3nyhq-b e1v97hwd6">
                      <div color="#737373" className="css-1o7etbk-v e1v97hwd5">
                        Usage Details
                      </div>
                      <span className="css-ph1mal-d-W e1v97hwd1">
                        <div>markboughtonphotography</div>
                      </span>
                    </div>
                  </div>
                </article>
              </section>
              <div>
                <div className="css-1eknr6p-RowSpacer efd3rzj3" />
                <section
                  className="efd3rzj1 css-9olsrx-k-AccordianWrapper e51it5l10"
                  data-testid="RE_Info_Preview_Metadata_Section"
                >
                  <header role="button" className="css-126o97p-v e51it5l9">
                    <div className="css-16ikibj-io e51it5l1">
                      <h5 className="css-k4qa43-b e143urms7">Metadata</h5>
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
              </div>
            </div>
          </div>
          <div className="css-dmutxw-Ie e1vmnjjl0">
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
          </div>
        </div>
        <div className="css-1ffbns-StyledAssetInfoWrapper eduyzic2">
          <div className="css-kp2fa7-AssetInfo eduyzic1">
            Displaying <b>1</b> of 6 in <b>Drinks</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>





</div>


  </div>;
};

export default FileDetail;
