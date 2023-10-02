import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, List, ListItem, ListItemText, Drawer } from '@mui/material';

const DrawerComponent = ( {openDrawer, handleDrawerToggle} ) => {

    const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    handleDrawerToggle(); // Close the drawer after navigation
  };

    const list = () => (
        <List sx={{ flexDirection: 'column' }}>
            <ListItem button onClick={() => handleNavigation('profile')}>
                <ListItemText primary='Profile' />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('cancellation')}>
                <ListItemText primary='Cancellation' />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('sequencing')}>
                <ListItemText primary='Number Sequencing' />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('problem')}>
                <ListItemText primary='Problem Resolution' />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('association')}>
                <ListItemText primary='Association' />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('context')}>
                <ListItemText primary='Context' />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('categorization')}>
                <ListItemText primary='Categorization' />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('actionsequencing')}>
                <ListItemText primary='Action Sequencing' />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('imagepairs')}>
                <ListItemText primary='Image Pairs' />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('maze')}>
                <ListItemText primary='Labyrinth' />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('wordSoup')}>
                <ListItemText primary='Scrambled Words' />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('memoryRecall')}>
                <ListItemText primary='Memory Recall' />
            </ListItem>
        </List>
    );

    return (
        <>
            <Drawer
                anchor='left'
                open={openDrawer}
                onClose={handleDrawerToggle}
                sx={{ display: { xl: 'none' } }}
                PaperProps={{
                    sx: {
                    width: '40%',
                    },
                }}
            >
                {list()}
            </Drawer>
        </>
    )
}

export default DrawerComponent