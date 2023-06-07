import React, { useState, useRef, useEffect, useCallback } from 'react';
import { render } from 'react-dom';
import "../assets/css/layout.css";
import "../assets/css/layout.scss";
import { LeftSide } from './LeftSide';
import { RightSide } from './RightSide';
import { DragHandle } from '@material-ui/icons';
import { DragHandler } from './drag-handle.tsx';


const minWidth = 300;
const collapsedWidth = 100;
const toCollapseWidth = 125;
const expandedWidth = 1000;
const maxWidth = 1200;


const FileDetail = () => {

  const [width, setWidth] = useState(expandedWidth);

  const sidebarRef = useRef();

  const onMoveX = useCallback(
    (val) => {
      setWidth((w) => {
        const newVal = w + val;
        if (newVal < minWidth) return minWidth;
        if (newVal > maxWidth) return maxWidth;

        const isCollapsed = sidebarRef.current.isCollapsed;
        if (newVal <= toCollapseWidth && !isCollapsed) {
          sidebarRef.current.collapse();
        }
        if (newVal > toCollapseWidth && isCollapsed) {
          sidebarRef.current.expand();
        }
        return newVal;
      });
    },
    [sidebarRef]
  );

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
        <div className="css-117wpbr-we e1vmnjjl9">

        <div
        style={{ width: `${width}px`}}
      >
        <RightSide
          ref={sidebarRef}
          toggle={(isCollapsed) => {
            if (isCollapsed) {
              setWidth(collapsedWidth);
              return;
            }
            setWidth(expandedWidth);
          }}
        />
      </div>
      <DragHandler moveX={onMoveX} />
        <LeftSide />
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

