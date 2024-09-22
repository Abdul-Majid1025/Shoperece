import "../../components/Sidebar/Sidebar.styles.css";
import { PermIdentity } from "@material-ui/icons";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

const AdminSidebar = ({ storeId }) => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to={`/store/${storeId}`} className="link">
              <li className="sidebarListItem">
                <svg
                  viewBox="0 0 20 20"
                  className="Polaris-Icon__Svg_375hu"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path d="M18 7.261V17.5c0 .841-.672 1.5-1.5 1.5h-2c-.828 0-1.5-.659-1.5-1.5V13H7v4.477C7 18.318 6.328 19 5.5 19h-2c-.828 0-1.5-.682-1.5-1.523V7.261a1.5 1.5 0 0 1 .615-1.21l6.59-4.82a1.481 1.481 0 0 1 1.59 0l6.59 4.82A1.5 1.5 0 0 1 18 7.26z"></path>
                </svg>
                Home
              </li>
            </Link>

            <Link to="/merchantstores" className="link">
              <li className="sidebarListItem">
                <svg
                  viewBox="0 0 20 20"
                  className="Polaris-Icon__Svg_375hu"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path d="M18 7.261V17.5c0 .841-.672 1.5-1.5 1.5h-2c-.828 0-1.5-.659-1.5-1.5V13H7v4.477C7 18.318 6.328 19 5.5 19h-2c-.828 0-1.5-.682-1.5-1.523V7.261a1.5 1.5 0 0 1 .615-1.21l6.59-4.82a1.481 1.481 0 0 1 1.59 0l6.59 4.82A1.5 1.5 0 0 1 18 7.26z"></path>
                </svg>
                Stores
              </li>
            </Link>

            <Link to={`/allorders/${storeId}`} className="link">
              <li className="sidebarListItem">
                {/* <Timeline className="sidebarIcon" /> */}
                <svg
                  viewBox="0 0 20 20"
                  focusable="false"
                  className="Polaris-Icon__Svg_375hu"
                  aria-hidden="true"
                >
                  <path d="M11 1a1 1 0 1 0-2 0v7.586L7.707 7.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L11 8.586V1z"></path>
                  <path d="M3 14V3h4V1H2.5A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 17.5 1H13v2h4v11h-3.5c-.775 0-1.388.662-1.926 1.244l-.11.12A1.994 1.994 0 0 1 10 16a1.994 1.994 0 0 1-1.463-.637l-.111-.12C7.888 14.664 7.275 14 6.5 14H3z"></path>
                </svg>
                Orders
              </li>
            </Link>
            <Link to={`/allproducts/${storeId}`} className="link">
              <li className="sidebarListItem">
                <svg
                  viewBox="0 0 20 20"
                  className="Polaris-Icon__Svg_375hu"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path d="M10.293 1.293A1 1 0 0 1 11 1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-.293.707l-9 9a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414l9-9zM15.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                </svg>
                Products
              </li>
            </Link>

            <Link to={`/customer/${storeId}`} className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="" className="link">
              <li className="sidebarListItem">
                <svg
                  viewBox="0 0 20 20"
                  className="Polaris-Icon__Svg_375hu"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path d="M15.5 3A1.5 1.5 0 0 0 14 4.5v12a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 16.5 3h-1zM8 8.5A1.5 1.5 0 0 1 9.5 7h1A1.5 1.5 0 0 1 12 8.5v8a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 8 16.5v-8zm-6 4A1.5 1.5 0 0 1 3.5 11h1A1.5 1.5 0 0 1 6 12.5v4A1.5 1.5 0 0 1 4.5 18h-1A1.5 1.5 0 0 1 2 16.5v-4z"></path>
                </svg>
                Analytics
              </li>
            </Link>
            <Link to={`/adddiscount/${storeId}`} className="link">
              <li className="sidebarListItem">
                <svg
                  viewBox="0 0 20 20"
                  className="Polaris-Icon__Svg_375hu"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.566.66a2.189 2.189 0 0 0-3.132 0l-.962.985a2.189 2.189 0 0 1-1.592.66l-1.377-.017a2.189 2.189 0 0 0-2.215 2.215l.016 1.377a2.189 2.189 0 0 1-.66 1.592l-.984.962a2.189 2.189 0 0 0 0 3.132l.985.962c.428.418.667.994.66 1.592l-.017 1.377a2.189 2.189 0 0 0 2.215 2.215l1.377-.016a2.189 2.189 0 0 1 1.592.66l.962.984c.859.88 2.273.88 3.132 0l.962-.985a2.189 2.189 0 0 1 1.592-.66l1.377.017a2.189 2.189 0 0 0 2.215-2.215l-.016-1.377a2.189 2.189 0 0 1 .66-1.592l.984-.962c.88-.859.88-2.273 0-3.132l-.985-.962a2.189 2.189 0 0 1-.66-1.592l.017-1.377a2.189 2.189 0 0 0-2.215-2.215l-1.377.016a2.189 2.189 0 0 1-1.592-.66L11.566.66zM7 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm.778-8.278a1.1 1.1 0 0 1 0 1.556l-6 6a1.1 1.1 0 1 1-1.556-1.556l6-6a1.1 1.1 0 0 1 1.556 0z"
                  ></path>
                </svg>
                Discounts
              </li>
            </Link>
            <Link to={`/settings/${storeId}`} className="link">
              <li className="sidebarListItem">
                <SettingsIcon className="sidebarIcon" />
                Settings
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
