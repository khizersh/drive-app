import React from "react";
import "../assets/css/nolayout.css";

const NoLayout = (props) => {
  return (
    <div className="noLayout">
      {props.children}
      <footer className="transparent-footer">
        <ul class="inline-list">
          <li>
            <a
              href="mailto:Mlove@ckr.com;sgehri@ckr.com;plee@ckr.com;arperez@ckr.com;"
              target="blank"
            >
              Contact Administrator
            </a>
          </li>
          <li>
            <a href="http://help.intelligencebank.com" target="blank">
              Helpdesk
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default NoLayout;
