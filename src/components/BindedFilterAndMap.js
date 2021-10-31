import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Map2 from './MyGoogleMap';


const drawerWidth = 240;

const filterData = (data, organFilter) => {
    let output = [];

    const dataMap = require('./data_map.json');

    if (organFilter.heart) {
        for (let x in dataMap["Heart"]) {
            output.push(data[x]);
        }
    }
    if (organFilter.kidney) {
        for (let x in dataMap["Kidney"]) {
            output.push(data[x]);
        }
    }
    if (organFilter.liver) {
        for (let x in dataMap["Liver"]) {
            output.push(data[x]);
        }
    }
    if (organFilter.pancreas) {
        for (let x in dataMap["Pancreas"]) {
            output.push(data[x]);
        }
    }
    if (organFilter.lung) {
        for (let x in dataMap["Lung"]) {
            output.push(data[x]);
        }
    }
    if (organFilter.vca) {
        for (let x in dataMap["Vascularized Composite Allograft (VCA)"]) {
            output.push(data[x]);
        }
    }
    if (organFilter.intestine) {
        for (let x in dataMap["Intestine"]) {
            output.push(data[x]);
        }
    }
    if (organFilter.islet) {
        for (let x in dataMap["Pancreas Islet"]) {
            output.push(data[x]);
        }
    }

    return output;
};

function BindedFilterAndMap(props) {
    const [organFilter, setOrganFilter] = React.useState({ heart: true, kidney: true, liver: true, pancreas: true, lung: true, vca: true, intestine: true, islet: true });
    let [points, setPoints] = React.useState(null);

    const fetchData = (organFilter) => {
        const rawData = require('./data_list_for_filter.json');
        let data = filterData(rawData, organFilter);
        setPoints(data);
        console.log("fetching data...", organFilter, data);
    }

    React.useEffect(() => {
        fetchData(organFilter);
    }, [organFilter]);

    const handleOrganFilter = (organ) => {
        setOrganFilter(prevState => ({
            ...prevState,
            [organ]: !prevState[organ]
        }));
    };

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem><FormControlLabel control={<Checkbox checked={organFilter.heart} onChange={() => handleOrganFilter("heart")} />} label="Heart" /></ListItem>
                <ListItem><FormControlLabel control={<Checkbox checked={organFilter.kidney} onChange={() => handleOrganFilter("kidney")} />} label="Kidney" /></ListItem>
                <ListItem><FormControlLabel control={<Checkbox checked={organFilter.liver} onChange={() => handleOrganFilter("liver")} />} label="Liver" /></ListItem>
                <ListItem><FormControlLabel control={<Checkbox checked={organFilter.pancreas} onChange={() => handleOrganFilter("pancreas")} />} label="Pancreas" /></ListItem>
                <ListItem><FormControlLabel control={<Checkbox checked={organFilter.lung} onChange={() => handleOrganFilter("lung")} />} label="Lung" /></ListItem >
                <ListItem><FormControlLabel control={<Checkbox checked={organFilter.vca} onChange={() => handleOrganFilter("vca")} />} label="Vascularized Composite Allograft (VCA)" /></ListItem >
                <ListItem><FormControlLabel control={<Checkbox checked={organFilter.intestine} onChange={() => handleOrganFilter("intestine")} />} label="Intestine" /></ListItem >
                <ListItem><FormControlLabel control={<Checkbox checked={organFilter.islet} onChange={() => handleOrganFilter("islet")} />} label="Pancreas Islet" /></ListItem >
            </List >
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Organ Transplant Finder
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, padding: 0, height: `calc(100vh - 65px)` }}
            >
                <Toolbar />
                {points != null && <Map2 points={points} />}
            </Box>
        </Box>
    );
}

export default BindedFilterAndMap;