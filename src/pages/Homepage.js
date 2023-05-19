import React from "react";
import { useHistory } from "react-router-dom";
import "../assets/css/homepage.css";

const Homepage = () => {
  const router = useHistory();
  return (
    <div>
      <h1 onClick={() => router.push("/login")}>Home12</h1>




      <div className="row custompageviewcontent htmlpagecontent" >
        <div className="brand-theme">
        <div className="container">
        <div className="row links-row">
          <div className="col-md-3 col-sm-6">
            <a className="lr-link active" href="#" target="_parent">
              <span className="lr-title">Brand Assets</span> 
              <span className="img-holder"> 
                <img alt="" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/Happy_Star_CMYK.PNG"  />
              </span> 
            </a>
              
          </div>

          <div className="col-md-3 col-sm-6 lr-col">
            <a className="lr-link" href="#" target="_parent">
              <span className="lr-title">Core Product Photography</span>
              <span className="img-holder"> 
                <img alt=""  src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/CORE%20PRODUCT%20PHOTOGRAPHY.png"  />
              </span>
            </a>
          </div>

          <div className="col-md-3 col-sm-6 lr-col">
            <a className="lr-link" href="#" target="_parent">
              <span className="lr-title">Videos</span> 
              <span className="img-holder">
                <img alt=""  src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/GLOBALLY%20APPROVED%20VIDEOS.png"  />
              </span>
            </a>
          </div>

          <div className="col-md-3 col-sm-6 lr-col">
            <a className="lr-link" href="#" target="_parent">
              <span className="lr-title">LTOs</span>
              <span className="img-holder">
                <img alt="" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/LTOs.png"  />
              </span>
            </a>
          </div>

          <div className="col-md-3 col-sm-6 lr-col">
            <a className="lr-link" href="#" target="_parent">
              <span className="lr-title">Menu Board Panels</span>
              <span className="img-holder">
                <img alt="" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/MENUBOARD%20PANEL.png"  />
              </span>
            </a>
          </div>

          <div className="col-md-3 col-sm-6 lr-col">
            <a className="lr-link" href="#" target="_parent">
              <span className="lr-title">Social Media Assets</span>
              <span className="img-holder">
                <img alt="" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/SOCIAL%20MEDIA%20ASSETS.png"  />
              </span>
            </a>
          </div>

          <div className="col-md-3 col-sm-6 lr-col">
            <a className="lr-link" href="#" target="_parent">
              <span className="lr-title">Templates</span>
              <span className="img-holder">
                <img alt="" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/LSM%20Templates.png"  />
              </span>
            </a>
          </div>

          <div className="col-md-3 col-sm-6 lr-col">
            <a className="lr-link" href="#" target="_parent">
              <span className="lr-title">Recovery Playbook &amp; Assets</span>
              <span className="img-holder">
                <img alt="" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/open.png"  />
              </span>
            </a>
          </div>

          <div className="col-md-3 col-sm-6 lr-col">
            <a className="lr-link active" href="#" target="_parent">
              <span className="lr-title">Regional Assets</span> 
              <span className="img-holder"> 
                <img alt="" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/INTERNAL%20ASSETS.png"  />
              </span> 
            </a>
          </div>

          <div className="col-md-3 col-sm-6 lr-col">
            <a className="lr-link active" href="#" target="_parent">
              <span className="lr-title">Development</span> 
              <span className="img-holder"> 
                <img alt="" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/DEVELOPMENT.png"  />
              </span> 
            </a>
          </div>

          <div className="col-md-3 col-sm-6 lr-col">
            <a className="lr-link active" href="#" target="_parent">
              <span className="lr-title">Packaging</span> 
              <span className="img-holder"> 
                <img alt="" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/Happy%20Star%20Packaing.png"  />
              </span> 
            </a>
          </div>

          <div className="col-md-3 col-sm-6 lr-col">
            <a className="lr-link active" href="#" target="_parent">
              <span className="lr-title">Reference Documents &amp; Forms</span> 
              <span className="img-holder"> 
                <img alt="" src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/iconfinder_11_Agreement_report_form_layout_paper_4308068.png"  />
              </span> 
            </a>
          </div>
        </div>
        </div>
        </div>
      </div>



    </div>







  );
};

export default Homepage;
