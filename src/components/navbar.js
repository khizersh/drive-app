import React from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";

const navbar = (props) => {
  const onClickLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
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
                  <li class="title back js-generated">
                    <h5>
                      <a href="#">ASSETS LIBRARY</a>
                    </h5>
                  </li>
                  <li>
                    <a
                      class="parent-link js-generated show-for-touch"
                      href="/resource/folder/index"
                    >
                      ASSETS LIBRARY
                    </a>
                  </li>
                  <li class="divider"></li>
                  <li class="menu-item ">
                    <a
                      id="menu-f1ec525fbeff9bd7b113e4e288036eb0"
                      href="/resource/folder/index/3d22c853294f0db5daaaf9a2e5f0d6b8"
                    >
                      BRAND ASSETS
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-ffced830d939cd1260bd7d5475d38034"
                      href="/resource/folder/index/f774ccae9d34dff1234fcb7b1d0e0a54"
                    >
                      CORE PRODUCT PHOTOGRAPHY
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-656b1cddd806a5858c0e0d1989b44eaf"
                      href="/resource/folder/index/71a0e89d5762de2434147f0d71a9323f"
                    >
                      GLOBALLY APPROVED VIDEOS
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-69ed859ee82831ef860d65163af91113"
                      href="/resource/folder/index/4ff228c5a9314add60627d5f475cf2b6"
                    >
                      LTOS
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-e03ef516e1d3c9ca549c92304382fe5a"
                      href="/resource/folder/index/965d4d59b0b6e81b2497e6a6a4ec9bb6"
                    >
                      MENU BOARD PANELS
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-dd0d1573778452c4a1ba9cd3fc1d6e67"
                      href="/resource/folder/index/ccbbf8c9c2cc556878f7fd0fbfaf71af"
                    >
                      SOCIAL MEDIA ASSETS
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-d2a65e63c23853a58f0a3e3f0e583b6f"
                      href="/resource/folder/index/d08ed752be199a547012847692904b5a"
                    >
                      TEMPLATES
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-7ae293db5bf8932a76ca8594b4f7d227"
                      href="/resource/folder/index/29a10516a5c67000fefe4c025d6153b7"
                    >
                      RESEARCH
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-840224f0d2622e6a18c6ff3407e334d2"
                      href="/resource/folder/index/1b324af3b82ed8a99b39b0229e030cec"
                    >
                      REGIONAL ASSETS
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-9eed51b25a42c8e5d289d9524735ae3c"
                      href="/resource/folder/index/fcbc4c682b1d91984fbcd109d76ac77e"
                    >
                      DEVELOPMENT
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-86167b4ec8ee50ef402c40a404dc2352"
                      href="/resource/folder/index/76b0df69f251cf54133e6601f91706db"
                    >
                      PACKAGING
                    </a>{" "}
                  </li>
                  <li class="menu-item ">
                    <a
                      id="menu-ccef29aadbb8bac6af92f80a35aa8bc4"
                      href="/resource/folder/index/cb62ac818786d1523858a3b705ac9632"
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
                  <div class="userProfiler"></div>HAROLDO SOTO
                </a>{" "}
                <ul class="dropdown" id="controlledID">
                  <li class="title back js-generated">
                    <h5>
                      <a href="#">
                        <div class="userProfiler"></div>HAROLDO SOTO
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

export default navbar;
