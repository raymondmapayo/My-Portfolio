import { Menu as AntMenu } from "antd";
import { LiaMedalSolid } from "react-icons/lia";
import { TbFolderSearch, TbHomeHand, TbNotebook, TbUser } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./menuHover.css"; // 👈 hover & dark-mode styles here

export default function MenuItems() {
  const items = [
    {
      key: "1",
      icon: <TbHomeHand className="menu-icon" style={{ fontSize: 29 }} />,
      label: (
        <Link className="menu-link" to="/home">
          Home
        </Link>
      ),
    },
    {
      key: "2",
      icon: <TbUser className="menu-icon" style={{ fontSize: 29 }} />,
      label: (
        <Link className="menu-link" to="/about_me">
          About Me
        </Link>
      ),
    },
    {
      key: "3",
      icon: <LiaMedalSolid className="menu-icon" style={{ fontSize: 29 }} />,
      label: (
        <Link className="menu-link" to="/myachievements">
          My Achievements
        </Link>
      ),
    },
    {
      key: "4",
      icon: <TbFolderSearch className="menu-icon" style={{ fontSize: 29 }} />,
      label: (
        <Link className="menu-link" to="/myprojects">
          My Projects
        </Link>
      ),
    },
    {
      key: "5",
      icon: <TbNotebook className="menu-icon" style={{ fontSize: 29 }} />,
      label: (
        <Link className="menu-link" to="/myblog">
          My Blogs
        </Link>
      ),
    },
  ];

  return (
    <AntMenu
      mode="inline"
      theme="light" // ← use AntD dark theme
      className="custom-menu"
      style={{
        marginTop: 10,
        width: "100%",
        border: "none",
        fontSize: "120%",
        // background intentionally removed so CSS can control it
      }}
      items={items}
    />
  );
}
