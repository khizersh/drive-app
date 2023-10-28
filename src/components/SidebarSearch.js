import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";

function SidebarItem({ depthStep = 10, depth = 0, expanded, item, ...rest }) {
  const [collapsed, setCollapsed] = React.useState(true);
  const {
    name: label,
    children: items,
    Icon,
    onClick: onClickProp,
    resourcesCount,
    folderCount,
    description,
  } = item;

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  function toggleCollapse() {
    setCollapsed((prevValue) => !prevValue);
  }

  function onClick(e) {
    e.preventDefault();
    if (Array.isArray(items)) {
      toggleCollapse();
    }
    if (onClickProp) {
      onClickProp(e, item);
    }
  }

  let expandIcon;

  //   if (Array.isArray(items) && items.length) {
  //     expandIcon = !collapsed ? (
  //       <ExpandLessIcon
  //         className={
  //           "sidebar-item-expand-arrow arrowStyle" + " sidebar-item-expand-arrow-expanded arrowStyle"
  //         }
  //       />
  //     ) : (
  //       <ExpandMoreIcon className="sidebar-item-expand-arrow arrowStyle" />
  //     );
  //   }

  return (
    <>
      <ListItem
        className="sidebar-item"
        onClick={onClick}
        button
        dense
        {...rest}
      >
        <div
          style={{ paddingLeft: depth * depthStep }}
          className="sidebar-item-content"
        >
          <div className="_row_raku75">
            <div className="_thumbColumn_1iasqch">
              <div className="_thumbnailContainer_1dic54o">
                <div className="_thumbnailContainer_1dic54op">
                  <img
                    className="_thumbnail_2i8afq"
                    src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png"
                  />
                </div>
              </div>
            </div>

            <div className="_detailColumn_1slhs1j">
              <div
                style={{
                  marginBottom: "auto",
                  marginTop: "auto",
                  maxWidth: "230px",
                  lineHeight: "15px",
                }}
              >
                <div
                  className="_title_k7qvdu"
                  style={{
                    fontWeight: "bold",
                    color: "#6a431a",
                  }}
                >
                  <a
                    className="_title_k7qvdu"
                    target="_blank"
                    href="#"
                    style={{
                      fontWeight: "bold",
                      color: "#6a431a",
                    }}
                  >
                    <div>
                      <div className="_truncate_ww5d6d">
                        <span>{label}</span>
                      </div>
                    </div>
                  </a>
                </div>

                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span>{/* <i>{description} </i> */}</span>
                  </div>
                </div>

                {folderCount || resourcesCount ? (
                  <div className="_countContainer_13ovesk">
                    <div className="_truncateMulti_3ywtd5">
                      <span>
                        <i>
                          {folderCount ? folderCount + " Sub-Folders" : <></>}{" "}
                          {resourcesCount ? (
                            resourcesCount + " , Resources"
                          ) : (
                            <></>
                          )}
                        </i>
                      </span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <div className="_indicatorRow_5kaapu">
                  <div className="_indicatorRow_5kaapuss">
                    <div className="_container_1892uua ">
                      <a className="_linkColours_11bsm43">
                        <button
                          className="_iconButton_ht0taf"
                          tabindex="0"
                          type="button"
                        >
                          <div>
                            <span
                              className="material-icons _icon_1v098ov"
                              color="#4a4a4a"
                            >
                              {/* <Public />{" "} */}
                              {Icon && (
                                <Icon
                                  className="sidebar-item-icon"
                                  fontSize="small"
                                />
                              )}
                            </span>
                          </div>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {Icon && <Icon className="sidebar-item-icon" fontSize="small" />}
          <div className="sidebar-item-text">{label}</div> */}
        </div>
        {expandIcon}
      </ListItem>
    </>
  );
}

function Sidebar({ items, depthStep, depth, expanded }) {
  return (
    <List disablePadding dense>
      {items.map((sidebarItem, index) => (
        <React.Fragment key={`${index}`}>
          {sidebarItem === "divider" ? (
            <Divider style={{ margin: "6px 0" }} />
          ) : (
            <SidebarItem
              depthStep={depthStep}
              depth={depth}
              expanded={expanded}
              item={sidebarItem}
            />
          )}
        </React.Fragment>
      ))}
    </List>
  );
}

export default Sidebar;
