import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';


export const RightSide = forwardRef(({}, ref) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      collapse: () => setIsCollapsed(true),
      expand: () => setIsCollapsed(false),
      isCollapsed: isCollapsed,
    }),
    [isCollapsed]
  );

  return <div className="css-v86hxw-d e1vmnjjl6">
            <div className="css-yj4l3y-LeftContainer e10r0o572">
              <div className="css-u9qt4x-ContainerHeader e10r0o573">
           
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
  </div>;
});
