import {
  GearIcon,
  HomeIcon,
  MarkGithubIcon,
  PersonIcon,
} from "@primer/octicons-react";
import {
  Avatar,
  BaseStyles,
  Box,
  Button,
  Header,
  ThemeProvider,
} from "@primer/react";
import React from "react";
import { StyleSheetManager } from "styled-components";

const App = () => {
  return (
    <StyleSheetManager
      shouldForwardProp={(prop) =>
        prop !== "lineHeight" && prop !== "sx" && prop !== "full"
      }
    >
      <ThemeProvider>
        <BaseStyles>
          <Header>
            <Header.Item full>
              <Header.Link href="#" fontSize={2}>
                <MarkGithubIcon size={32} style={{ marginRight: "8px" }} />
                <span>MyApp</span>
              </Header.Link>
            </Header.Item>
            <Header.Item>
              <Button as="a" href="#">
                <HomeIcon size={16} style={{ marginRight: "4px" }} />
                Home
              </Button>
            </Header.Item>
            <Header.Item>
              <Button as="a" href="#">
                <PersonIcon size={16} style={{ marginRight: "4px" }} />
                Profile
              </Button>
            </Header.Item>
            <Header.Item>
              <Button as="a" href="#">
                <GearIcon size={16} style={{ marginRight: "4px" }} />
                Settings
              </Button>
            </Header.Item>
            <Header.Item mr={2}>
              <Avatar
                src="https://github.com/github.png"
                size={40}
                alt="User Avatar"
              />
            </Header.Item>
          </Header>
          <Box p={4}>
            <h1>Bienvenido a MyApp</h1>
            <p>
              Esta es una página básica con una barra de navegación de Primer
              React.
            </p>
          </Box>
        </BaseStyles>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default App;
