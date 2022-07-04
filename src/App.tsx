import {
  AppBar,
  Box,
  Button,
  Container,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TypingKeyboard } from './components/TypingKeyboard';
import vykas from './assets/vykas.jpg';
import seto from './assets/seto.jpg';

export const App = () => {
  const [showAppBar, setShowAppBar] = useState(true);
  const [easyMode, setEasyMode] = useState(false);
  const [allowedKeys, setAllowedKeys] = useState('qweasd');

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 25) {
      setShowAppBar(false);
    } else {
      setShowAppBar(true);
    }
  }, [setShowAppBar]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <BrowserRouter>
      <Slide appear={false} direction="down" in={showAppBar}>
        <AppBar
          sx={{
            background: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar sx={{ gap: 4 }}>
            <Typography variant="h5" noWrap>
              Sunda Empire
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: easyMode ? 'crimson' : 'green',
                '&:hover': {
                  background: easyMode ? 'crimson' : 'green',
                },
                '&:active': {
                  background: easyMode ? 'crimson' : 'green',
                },
              }}
              onClick={() => setEasyMode((prev) => !prev)}
            >
              {easyMode ? 'Toggle hard mode' : 'Toggle easy mode'}
            </Button>
            <TextField
              label="Allowed keys pool"
              InputLabelProps={{
                sx: {
                  color: 'white',
                  '&.Mui-focused': {
                    color: 'white',
                  },
                },
              }}
              inputProps={{
                sx: {
                  color: 'white',
                  background: 'rgba(255,255,255,0.5)',
                  padding: '5px',
                },
              }}
              type="text"
              value={allowedKeys}
              onChange={(e) => {
                setAllowedKeys(e.target.value);
              }}
            />
          </Toolbar>
        </AppBar>
      </Slide>
      <Container
        disableGutters
        component="main"
        sx={{
          backgroundImage: easyMode ? `url(${seto})` : `url(${vykas})`,
          backgroundPosition: easyMode ? 'center 75%' : 'center 35%',
          backgroundSize: easyMode ? '120%' : 'cover',
          pt: 32,
          pb: 2,
          height: '100%',
          minHeight: '100vh',
          minWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TypingKeyboard allowedKeys={allowedKeys} />
        {!easyMode && (
          <Box position="absolute" bottom="5%" right="6%">
            <Typography variant="h6" color="white">
              Vykas Fanart by
              <br />
              <a
                style={{ color: 'rgba(100, 100, 250, 1)' }}
                target="_blank"
                rel="noreferrer"
                href="https://www.pixiv.net/en/users/14279898"
              >
                Gg Amang | 까망베르까망
              </a>
            </Typography>
          </Box>
        )}
      </Container>
    </BrowserRouter>
  );
};
