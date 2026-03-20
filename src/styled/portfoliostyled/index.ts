import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import styled from "styled-components";

export const StyledLayout = styled(Layout)`
  height: 100vh;
`;

export const StyledSider = styled(Sider)<{ $collapsed?: boolean }>`
  background-color: #ffffff !important;
  min-height: 100vh !important;
  height: 100%;
  z-index: 1000;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* prevent double scrollbars */
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out,
    background-color 0.3s ease;

  ${({ $collapsed }) =>
    !$collapsed &&
    `
    &:hover {
      background-color: #ffe7ba;
    }
  `}

  /* Sticky header */
  .sidebar-header {
    flex-shrink: 0;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #374151;
    font-size: 18px;
    font-weight: bold;
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  /* Scrollable menu */
  .menu-scroll {
    flex: 1 1 auto; /* Fill space between header & footer */
    overflow-y: auto; /* Scroll if menu is long */
    padding: 8px 0; /* Optional: show only 8 items height initially */
    max-height: calc(100vh - 175px - 100px); /* 80px header + ~160px footer */
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
  }

  /* Footer */
  .footer-container {
    flex-shrink: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fefefe;
    border-top: 1px solid #e5e7eb;
    padding: 12px 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
      max-height: 120px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 8px;
    }

    .footer-text {
      font-size: 12px;
      color: #6b7280;
      line-height: 1.3;

      .highlight {
        font-weight: 600;
        color: #fa8c16;
      }
    }
  }

  .ant-layout-sider-trigger {
    display: none !important;
  }

  .ant-menu-light {
    background: transparent !important;
  }

  .ant-menu-light .ant-menu-item:hover {
    background-color: #f5f5f5 !important; /* light grey hover */
    color: #374151 !important; /* keep text dark */

    svg {
      color: #374151 !important;
    }
  }

  .ant-menu-light .ant-menu-item-selected {
    background-color: #e5e7eb !important; /* slightly darker grey for selected */
    color: #111827 !important; /* darker text */

    svg {
      color: #111827 !important;
    }
  }

  /* Tooltip Style for Collapsed State */
  .ant-tooltip-inner {
    background-color: #fa8c16 !important;
    color: #fff !important;
    font-weight: bold !important;
    font-size: 14px !important;
    border-radius: 6px;
    padding: 6px 12px;
  }

  .ant-tooltip-arrow::before {
    background-color: #fa8c16 !important;
  }

  /* Mobile Sidebar Behavior (Slide) */

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 270px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
    transform: ${({ $collapsed }) =>
      $collapsed ? "translateX(-100%)" : "translateX(0)"};
  }

  /* ------------------- DARK MODE SUPPORT ------------------- */
  .dark & {
    background-color: #001f3f !important;

    .sidebar-header {
      background: #001f3f;
      color: #f0f0f0;
      border-bottom: 1px solid #334155;
    }

    .ant-menu-light .ant-menu-item {
      color: #e0e0e0;
    }

    .ant-menu-light .ant-menu-item:hover {
      background-color: rgb(0, 51, 102) !important;
      color: #fff !important;

      svg {
        color: #fff !important;
      }
    }

    .ant-menu-light .ant-menu-item-selected {
      background-color: #004080 !important;
      color: #fff !important;

      svg {
        color: #fff !important;
      }
    }

    .footer-container {
      background-color: #001f3f;
      border-top: 1px solid #334155;

      .footer-text {
        color: #cfd8dc;

        .highlight {
          color: #fa8c16;
        }
      }

      img {
        filter: brightness(0.8);
      }
    }

    .ant-tooltip-inner {
      background-color: #004080 !important;
      color: #fff !important;
    }

    .ant-tooltip-arrow::before {
      background-color: #004080 !important;
    }
  }
`;

export const StyledHeader = styled(Header)`
  background-color: #ffffff;
  width: 100%;
  padding: 0px !important;
  height: 80px !important;
  position: sticky; /* Header stays fixed */
  top: 0;
  z-index: 999;

  h1 {
    font-size: 18px;
    color: #001529;
    margin: 0;
  }
`;

export const StyledContent = styled(Content)`
  margin: 1px;
  padding: 24px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Only this scrolls */
  height: calc(100vh - 80px); /* account for header height */
  flex: 1; /* Fill remaining space */

  h2 {
    margin: 0 0 16px;
    font-size: 24px;
    font-weight: bold;
  }

  p {
    font-size: 16px;
    color: #555;
  }

  /* DARK MODE SUPPORT */
  .dark & {
    background-color: rgb(0, 51, 102) !important;
    color: white;

    h2,
    p {
      color: #f1f1f1;
    }
  }
`;
