import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { t } from "i18next";
import i18n from "../i18n";

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
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function SettingHeader() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeLangEn = () => {
    i18n.changeLanguage("en");
    handleClose();
  };
  const changeLangFa = () => {
    i18n.changeLanguage("fa");
    handleClose();
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        sx={{
          border: "3px solid #fcbc4e",
          bgcolor: "#ae813e",
          textShadow: `
      0 2px 4px rgba(0,0,0,0.4),
      0 0 10px rgba(3, 2, 1, 0.6)
    `,
          display: "flex",
          gap: 1,
        }}
      >
        {t("navbar.setting")}
        <SettingsOutlinedIcon />
      </Button>

      <StyledMenu
        id="demo-customized-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
      >
        <MenuItem
          onClick={changeLangEn}
          disableRipple
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {t("navbar.en")}
        </MenuItem>
        <MenuItem
          onClick={changeLangFa}
          disableRipple
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {t("navbar.fa")}
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={handleClose}
          disableRipple
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          disableRipple
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <MoreHorizIcon />
          More
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
