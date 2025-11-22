// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import CssBaseline from "@mui/material/CssBaseline";
// import useScrollTrigger from "@mui/material/useScrollTrigger";
// import { Box, Button, Typography, useTheme } from "@mui/material";

// import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
// import { useNavigate } from "react-router-dom";
// import { t } from "i18next";
// import SettingHome from "../settings/SettingsHome";

// interface Props {
//   window?: () => Window;
//   children?: React.ReactElement<{ elevation?: number }>;
// }

// function ElevationScroll(props: Props) {
//   const { children, window } = props;

//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//     target: window ? window() : undefined,
//   });

//   return children
//     ? React.cloneElement(children, {
//         elevation: trigger ? 4 : 0,
//       })
//     : null;
// }

// export default function HeaderHome(props: Props) {
//   const navigate = useNavigate();
//   const theme = useTheme();

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <ElevationScroll {...props}>
//         <AppBar
//           sx={{
//             backgroundImage:
//               theme.palette.mode === "dark"
//                 ? "url(/nav-home-dark.png)"
//                 : "url(/nav-home.png)",
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//             height: "700px",
//             position: "static",
//             boxShadow:
//               "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
//           }}
//         >
//           <Toolbar>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "100vh",
//                 width: "100%",
//                 flexDirection: "column",
//                 gap: 5,
//               }}
//             >
//               {/* عنوان اصلی */}
//               <Typography
//                 onClick={() => navigate("/")}
//                 variant="h1"
//                 component={"h1"}
//                 px={2}
//                 sx={(theme) => ({
//                   WebkitTextStroke: "1px #000",
//                   textShadow:
//                     theme.palette.mode === "dark"
//                       ? `
//       0 2px 4px rgba(0,0,0,0.4),
//       0 0 10px rgba(26, 34, 149, 0.6)
//     `
//                       : `
//       0 2px 4px rgba(0,0,0,0.4),
//       0 0 10px rgba(176, 142, 31, 0.83)
//     `,
//                   cursor: "pointer",
//                   color:
//                     theme.palette.mode === "dark"
//                       ? theme.palette.text.primary
//                       : "#fcbc4e",
//                   "&:hover": {
//                     backgroundColor: "transparent !important",
//                     transition: "0.5s ease",
//                     scale: "1.1",
//                   },
//                 })}
//               >
//                 {t("hero.title")}
//               </Typography>

//               {/* زیرعنوان‌ها */}
//               <Box>
//                 <Typography
//                   variant="h4"
//                   component={"h4"}
//                   sx={{
//                     textShadow: `
//       0 2px 4px rgba(0,0,0,0.4),
//       0 0 10px rgba(3, 2, 1, 0.6)
//     `,
//                   }}
//                 >
//                   {t("hero.subtitle")}
//                 </Typography>

//                 <Typography
//                   variant="h4"
//                   component={"h4"}
//                   sx={{
//                     textShadow: `
//       0 2px 4px rgba(0,0,0,0.4),
//       0 0 10px rgba(3, 2, 1, 0.6)
//     `,
//                   }}
//                 >
//                   {t("hero.subtitle2")}
//                 </Typography>
//               </Box>

//               {/* دکمه‌ها */}
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <Button
//                   variant="text"
//                   onClick={() => navigate("/menu")}
//                   sx={{
//                     color: "white",
//                     textShadow: `
//       0 2px 4px rgba(0,0,0,0.4),
//       0 0 10px rgba(3, 2, 1, 0.6)
//     `,
//                     display: "flex",
//                     gap: 1,
//                     fontSize: "1.1rem",

//                     "&:hover": {
//                       backgroundColor: "transparent !important",
//                       transition: "0.3s ease",
//                     },
//                     "&.Mui-focusVisible": {
//                       backgroundColor: "transparent !important",
//                     },
//                   }}
//                 >
//                   {t("hero.viewMenu")}
//                   <MenuBookOutlinedIcon />
//                 </Button>

//                 <SettingHome />
//               </Box>
//             </Box>
//           </Toolbar>
//         </AppBar>
//       </ElevationScroll>
//       <Toolbar />
//     </React.Fragment>
//   );
// }
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Box, Button, Typography, useTheme } from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import SettingHome from "../settings/SettingsHome";

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
}

function ElevationScroll(props: Props): React.ReactElement | null {
  const { children, window: windowProp } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: windowProp ? windowProp() : undefined,
  });

  if (!children) return null;

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function HeaderHome(props: Props): React.ReactElement {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          sx={{
            backgroundImage:
              theme.palette.mode === "dark"
                ? "url(/nav-home-dark.png)"
                : "url(/nav-home.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: { xs: "100vh", sm: "650px", md: "700px" },
            position: "static",
            boxShadow:
              "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
          }}
        >
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: { xs: "100vh", sm: "100%", md: "100vh" },
                width: "100%",
                flexDirection: "column",
                gap: { xs: 3, sm: 4, md: 5 },
                px: { xs: 2, sm: 3, md: 0 },
                textAlign: "center",
              }}
            >
              {/* عنوان اصلی */}
              <Typography
                onClick={() => navigate("/")}
                variant="h1"
                component="h1"
                px={2}
                sx={(theme) => ({
                  WebkitTextStroke: "1px #000",
                  textShadow:
                    theme.palette.mode === "dark"
                      ? `
      0 2px 4px rgba(0,0,0,0.4),
      0 0 10px rgba(26, 34, 149, 0.6)
    `
                      : `
      0 2px 4px rgba(0,0,0,0.4),
      0 0 10px rgba(176, 142, 31, 0.83)
    `,
                  cursor: "pointer",
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : "#fcbc4e",
                  fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4rem" },
                  "&:hover": {
                    backgroundColor: "transparent !important",
                    transition: "0.5s ease",
                    scale: "1.1",
                  },
                })}
              >
                {t("hero.title")}
              </Typography>

              {/* زیرعنوان‌ها */}
              <Box>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    textShadow: `
      0 2px 4px rgba(0,0,0,0.4),
      0 0 10px rgba(3, 2, 1, 0.6)
    `,
                    fontSize: { xs: "1.3rem", sm: "1.6rem", md: "2rem" },
                  }}
                >
                  {t("hero.subtitle")}
                </Typography>

                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    textShadow: `
      0 2px 4px rgba(0,0,0,0.4),
      0 0 10px rgba(3, 2, 1, 0.6)
    `,
                    fontSize: { xs: "1.3rem", sm: "1.6rem", md: "2rem" },
                  }}
                >
                  {t("hero.subtitle2")}
                </Typography>
              </Box>

              {/* دکمه‌ها */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="text"
                  onClick={() => navigate("/menu")}
                  sx={{
                    color: "white",
                    textShadow: `
      0 2px 4px rgba(0,0,0,0.4),
      0 0 10px rgba(3, 2, 1, 0.6)
    `,
                    display: "flex",
                    gap: 1,
                    fontSize: "1.1rem",
                    "&:hover": {
                      backgroundColor: "transparent !important",
                      transition: "0.3s ease",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "transparent !important",
                    },
                  }}
                >
                  {t("hero.viewMenu")}
                  <MenuBookOutlinedIcon />
                </Button>

                <SettingHome />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
