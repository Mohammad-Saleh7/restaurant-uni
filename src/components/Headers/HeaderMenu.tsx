import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { t } from "i18next";
import { Link, useNavigate } from "react-router-dom";
import SettingHeader from "../settings/SettingHeader";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setSearch } from "../../redux/searchSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function HeaderMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = useSelector((state: RootState) => state.search.value);

  const items = useSelector((state: RootState) => state.cart.items);
  const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<HTMLElement | null>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 10 }}>
      <AppBar
        position="fixed"
        sx={(theme) => ({
          bgcolor:
            theme.palette.mode === "dark"
              ? "background.default"
              : "background.default",
        })}
      >
        <Toolbar
          sx={(theme) => ({
            color:
              theme.palette.mode === "dark"
                ? "text.primary"
                : "text.lightPrimary",
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
          })}
        >
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={(theme) => ({
              display: { xs: "none", sm: "block" },
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "#67341b !important",
              textDecoration: "none",
            })}
          >
            {t("hero.title")}
          </Typography>

          <Search
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "relative",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder={t("hero.search")}
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              sx={{
                paddingLeft: "40px",
                paddingRight: "12px",
              }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          {/* Icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => navigate("/cart")} color="inherit">
              <Badge badgeContent={count} color="success" overlap="circular">
                <LocalMallOutlinedIcon sx={{ fontSize: "30px" }} />
              </Badge>
            </IconButton>

            {/* <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircleOutlinedIcon sx={{ fontSize: "30px" }} />
            </IconButton> */}

            <SettingHeader />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
