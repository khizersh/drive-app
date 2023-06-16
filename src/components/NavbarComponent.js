import React, { useEffect, useState } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";

const NavbarComponent = (props) => {
  const [user, setUser] = useState(null);
  const onClickLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    let userLocal = localStorage.getItem("user");
    if (userLocal) {
      var json = JSON.parse(userLocal);
      if (json) {
        console.log("json :: ",json);
        setUser(json);
      }
    }
  }, []);
  
  return (
    <>
      <div class="small-logo-nav">
        <nav id="mainTopBar" class="top-bar d-flex mb-0">
          <ul class="p-0 mb-1">
            <li class="name">
              <Link to="/">
                <img
                  alt="CKE Digital Library Small Logo"
                  title="Go to CKE Digital Library home page"
                  src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/small-logo-0fdcfdbb9af1834e7e18deae8039404c.png"
                  id="ibFooterLogo"
                />
              </Link>
            </li>
            <li class="toggle-topbar">
              <a href="javascript:void(0);" title="toggle top bar menu"></a>
            </li>
          </ul>

          <section
            class="top-bar-section w-100"
            style={{ zIndex: 12, background: "#FFFFFF" }}
          >
            <ul class="left">
              <li class="active menu-item ">
                <Link
                  to="/"
                  id="menu-1b64717ea816e1aeecc407db6b752f0e"
                  href="/"
                >
                  HOME
                </Link>
              </li>
              <li class="divider"></li>
              <li class="has-dropdown menu-item ">
                <a
                  id="menu-94b10bf55dcea838da99471aafef39bc"
                  href="/resource/folder/index"
                >
                  ASSETS LIBRARY
                </a>
                <ul class="dropdown" id="controlledID">
                  <li class="divider"></li>
                  <li class="menu-item ">
                    <a
                      id="menu-f1ec525fbeff9bd7b113e4e288036eb0"
                      href={`folder?parent=brand-asset`}
                    >
                      BRAND ASSETS
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-ffced830d939cd1260bd7d5475d38034"
                      href={`folder?parent=core-product-photgraphy`}
                    >
                      CORE PRODUCT PHOTOGRAPHY
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-656b1cddd806a5858c0e0d1989b44eaf"
                      href={`folder?parent=videos`}
                    >
                      GLOBALLY APPROVED VIDEOS
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-69ed859ee82831ef860d65163af91113"
                      href={`folder?parent=ltos`}
                    >
                      LTOS
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-e03ef516e1d3c9ca549c92304382fe5a"
                      href={`folder?parent=menu-board-panel`}
                    >
                      MENU BOARD PANELS
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-dd0d1573778452c4a1ba9cd3fc1d6e67"
                      href={`folder?parent=social-media-asset`}
                    >
                      SOCIAL MEDIA ASSETS
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-d2a65e63c23853a58f0a3e3f0e583b6f"
                      href={`folder?parent=templates`}
                    >
                      TEMPLATES
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-7ae293db5bf8932a76ca8594b4f7d227"
                      href={`folder?parent=recovery-playbook-assets`}
                    >
                      Recovery Playbook & Assets
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-840224f0d2622e6a18c6ff3407e334d2"
                      href={`folder?parent=regional-assets`}
                    >
                      REGIONAL ASSETS
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-9eed51b25a42c8e5d289d9524735ae3c"
                      href={`folder?parent=development`}
                    >
                      DEVELOPMENT
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-86167b4ec8ee50ef402c40a404dc2352"
                      href={`folder?packaging`}
                    >
                      PACKAGING
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-ccef29aadbb8bac6af92f80a35aa8bc4"
                      href={`folder?reference-document-forms`}
                    >
                      FORMS
                    </a>{" "}
                  </li>{" "}
                </ul>
              </li>
              <li class="divider"></li>
              <li class="menu-item ">
                <Link
                  to={`my-collection?id=`}
                  data-id="co_navigation_menu"
                  id="menu-43efd1b065da06a5e4e024a4ff9cff6f"
                  href="my-account"
                >
                  MY COLLECTIONS
                </Link>{" "}
              </li>
              <li class="divider"></li>
            </ul>
            <ul class="right">
              <li class="divider"></li>

              <li class="divider"></li>
              <li class="has-dropdown menu-item ">
                <a id="menu-userDetail" class="deadMenu" href="#">
                  <div class="userProfiler"></div>
                  {user?.firstName}
                </a>{" "}
                <ul class="dropdown" id="controlledID">
                  <li class="title back js-generated">
                    <h5>
                      <a href="#">
                        <div class="userProfiler"></div>
                      </a>
                    </h5>
                  </li>
                  <li class="divider"></li>
                  <li class="menu-item ">
                    <a
                      id="menu-ae34edb4646d9cd70a3b65abb3e34823"
                      href="my-account"
                    >
                      MY ACCOUNT
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a href="/logout/" onClick={onClickLogout}>
                      LOGOUT
                    </a>{" "}
                  </li>{" "}
                </ul>
              </li>
              <li class="divider"></li>
            </ul>
          </section>
        </nav>
        <div class="horizontalDivider"> </div>
      </div>

      <div id="page-content p-0">{props.children}</div>
    </>
  );
};

export default NavbarComponent;
