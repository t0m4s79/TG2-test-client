import React, { useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom';

import CancellationTaskForm from './CancellationTaskForm';
import SequencingTaskForm from './SequencingTaskForm';
import ProblemTaskForm from './ProblemTaskForm';
import AssociationTaskForm from './AssociationTaskForm';
import ContextTaskForm from './ContextTaskForm';
import CategorizationTaskForm from './CategorizationTaskForm';
import ActionSequencingTaskForm from './ActionSequencingTaskForm';
import ImagePairsTaskForm from './ImagePairsTaskForm';
import MazeTaskForm from './MazeTaskForm';
import SoupTaskForm from './SoupTaskForm';
import MemoryRecallTaskForm from './MemoryRecallTaskForm';
import ProfileTaskForm from './ProfileTaskForm';

import './../navbar.css'
import logo from './../assets/LogoNeuroRehabLab.svg';

import { AppBar, Box, Toolbar, IconButton,  createTheme, Tab, Tabs, ThemeProvider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerComponent from './DrawerComponent';


const Navbar = () => {
    //const { language } = useParams();

    const [openDrawer, setOpenDrawer] = useState(false);
    const [value, setValue] = useState(0)

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1500,
            }
        },
        palette: {
            primary: {
                light: '#e5e5e5',
                main: '#4B4F58',
                dark: '#3a3a3a',
                contrastText: '#fff',
            },
            secondary: {
                main: '#DD9933',

            }
        }
    })

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
            <AppBar position='static' color='primary'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-around', height: '100px' }}>
                <IconButton
                    edge='end'
                    color='inherit'
                    aria-label='menu'
                    onClick={handleDrawerToggle}
                    sx={{ display: { xl: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                
                <img src={logo} alt='logo' style={{ maxWidth: '200px' }} />

                <Box sx={{display: { xs:'none', xl: 'flex' } }}>
                    <Tabs
                        onChange={(e,value) => {setValue(value)}}
                        textColor="secondary"
                        value={value}>
                        <Tab label='Profile' component={Link} to={`/profile`} sx={{ color: theme.palette.primary.contrastText }} />
                        <Tab label='Cancellation' component={Link} to={`/cancellation`} sx={{ color: theme.palette.primary.contrastText }} />
                        <Tab label={<span>Number<br/>Sequencing</span>} component={Link} to={`/sequencing`} sx={{ color: theme.palette.primary.contrastText }} />
                        <Tab label={<span>Problem<br/>Resolution</span>} component={Link} to={`/problem`} sx={{ color: theme.palette.primary.contrastText }} />
                        <Tab label='Association' component={Link} to={`/association`} sx={{ color: theme.palette.primary.contrastText }} />
                        <Tab label='Context' component={Link} to={`/context`} sx={{ color: theme.palette.primary.contrastText }} />
                        <Tab label='Categorization' component={Link} to={`/categorization`} sx={{ color: theme.palette.primary.contrastText }} />
                        <Tab label={<span>Action<br/>Sequencing</span>} component={Link} to={`/${language}/actionsequencing`} sx={{ color: theme.palette.primary.contrastText }} />
                        <Tab label='Image Pairs'  component={Link} to={`/imagepairs`} sx={{ color: theme.palette.primary.contrastText }} />
                        <Tab label='Labyrinth' component={Link} to={`/maze`} sx={{ color: theme.palette.primary.contrastText }} />
                        <Tab label={<span>Scrambled<br/>Words</span>} component={Link} to={`/wordSoup`} sx={{ color: theme.palette.primary.contrastText }} />
                        <Tab label={<span>Memory<br/>Recall</span>} component={Link} to={`/memoryRecall`} sx={{ color: theme.palette.primary.contrastText }} />

                    </Tabs>
                </Box>

                </Toolbar>
            </AppBar>

            <DrawerComponent openDrawer={openDrawer} handleDrawerToggle={handleDrawerToggle}/>

            <Routes>
                <Route path={`/cancellation`} element={<CancellationTaskForm />} />
                <Route path={`/sequencing`} element={<SequencingTaskForm />} />
                <Route path={`/problem`} element={<ProblemTaskForm />} />
                <Route path={`/association`} element={<AssociationTaskForm />} />
                <Route path={`/context`} element={<ContextTaskForm />} />
                <Route path={`/categorization`} element={<CategorizationTaskForm />} />
                <Route path={`/actionsequencing`} element={<ActionSequencingTaskForm />} />
                <Route path={`/imagepairs`} element={<ImagePairsTaskForm />} />
                <Route path={`/maze`} element={<MazeTaskForm />} />
                <Route path={`/wordSoup`} element={<SoupTaskForm />} />
                <Route path={`/memoryRecall`} element={<MemoryRecallTaskForm />} />
                <Route path={`/profile`} element={<ProfileTaskForm />} />
            </Routes>
            
            </div>
        </ThemeProvider>
  )
}

export default Navbar
