import * as React from "react";
import { styled } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { t } from "i18next";
import i18n from "../../i18n";
import { IconButton } from "@mui/material";
import ModeToggle from "../ModeToggle";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "0 0 0 0 rgba(255,255,255,0), 0 0 0 1px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
    "& .MuiMenu-list": {
      padding: "4px 0",
      backgroundColor: theme.palette.mode === "dark" ? "#151d32" : "#C4A484",
    },
    border: "2px solid black",
    "& .MuiMenuItem-root": {
      backgroundColor: "transparent",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "transparent",
      },
      "&.Mui-selected, &.Mui-selected:hover": {
        backgroundColor: "transparent",
      },
      "&:active": {
        backgroundColor: "transparent",
      },
    },
  },
}));

const SettingHeader: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const changeLang = (lang: "en" | "fa"): void => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <div>
      <IconButton
        id="settings-button"
        aria-controls={open ? "settings-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={(theme) => ({
          color:
            theme.palette.mode === "dark"
              ? "text.primary"
              : "text.lightPrimary",
          textShadow: `
            0 2px 4px rgba(0,0,0,0.4),
            0 0 10px rgba(3, 2, 1, 0.6)
          `,
          display: "flex",
          gap: 1,
        })}
      >
        <SettingsOutlinedIcon sx={{ fontSize: 30 }} />
      </IconButton>

      <StyledMenu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "settings-button",
        }}
      >
        <MenuItem
          onClick={() => changeLang("en")}
          disableRipple
          sx={(theme) => ({
            display: "flex",
            justifyContent: "center",
            "&:hover": { scale: "1.3", transition: "0.5s all" },
            color:
              theme.palette.mode === "dark"
                ? "text.primary"
                : "text.lightPrimary",
          })}
        >
          {t("navbar.en")}
        </MenuItem>

        <MenuItem
          onClick={() => changeLang("fa")}
          disableRipple
          sx={(theme) => ({
            "&:hover": { scale: "1.3", transition: "0.5s all" },
            display: "flex",
            justifyContent: "center",
            color:
              theme.palette.mode === "dark"
                ? "text.primary"
                : "text.lightPrimary",
          })}
        >
          {t("navbar.fa")}
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={handleClose}
          disableRipple
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ModeToggle />
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default SettingHeader;
