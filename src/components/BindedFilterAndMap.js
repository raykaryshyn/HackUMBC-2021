import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Map2 from './MyGoogleMap';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    label: {
        '& .MuiFormControlLabel-label': {
            fontSize: '0.98rem',
        },
        '& .MuiCheckbox-root': {
            padding: '5px 10px',
        },
        padding: '0 20px',
    },
});


const drawerWidth = 300;

const filterData = (data, organFilter) => {
    let output = [];
    let usedIndexes = [];

    const dataMap = require('./data_map.json');

    if (organFilter.heart) {
        for (let x in dataMap["Heart"]) {
            if (usedIndexes.indexOf(dataMap["Heart"][x]) === -1) {
                output.push(data[dataMap["Heart"][x]]);
                usedIndexes.push(dataMap["Heart"][x]);
            }
        }
    }
    if (organFilter.kidney) {
        for (let x in dataMap["Kidney"]) {
            if (usedIndexes.indexOf(dataMap["Kidney"][x]) === -1) {
                output.push(data[dataMap["Kidney"][x]]);
                usedIndexes.push(dataMap["Kidney"][x]);
            }
        }
    }
    if (organFilter.liver) {
        for (let x in dataMap["Liver"]) {
            if (usedIndexes.indexOf(dataMap["Liver"][x]) === -1) {
                output.push(data[dataMap["Liver"][x]]);
                usedIndexes.push(dataMap["Liver"][x]);
            }
        }
    }
    if (organFilter.pancreas) {
        for (let x in dataMap["Pancreas"]) {
            if (usedIndexes.indexOf(dataMap["Pancreas"][x]) === -1) {
                output.push(data[dataMap["Pancreas"][x]]);
                usedIndexes.push(dataMap["Pancreas"][x]);
            }
        }
    }
    if (organFilter.lung) {
        for (let x in dataMap["Lung"]) {
            if (usedIndexes.indexOf(dataMap["Lung"][x]) === -1) {
                output.push(data[dataMap["Lung"][x]]);
                usedIndexes.push(dataMap["Lung"][x]);
            }
        }
    }
    if (organFilter.vca) {
        for (let x in dataMap["Vascularized Composite Allograft (VCA)"]) {
            if (usedIndexes.indexOf(dataMap["Vascularized Composite Allograft (VCA)"][x]) === -1) {
                output.push(data[dataMap["Vascularized Composite Allograft (VCA)"][x]]);
                usedIndexes.push(dataMap["Vascularized Composite Allograft (VCA)"][x]);
            }
        }
    }
    if (organFilter.intestine) {
        for (let x in dataMap["Intestine"]) {
            if (usedIndexes.indexOf(dataMap["Intestine"][x]) === -1) {
                output.push(data[dataMap["Intestine"][x]]);
                usedIndexes.push(dataMap["Intestine"][x]);
            }
        }
    }
    if (organFilter.islet) {
        for (let x in dataMap["Pancreas Islet"]) {
            if (usedIndexes.indexOf(dataMap["Pancreas Islet"][x]) === -1) {
                output.push(data[dataMap["Pancreas Islet"][x]]);
                usedIndexes.push(dataMap["Pancreas Islet"][x]);
            }
        }
    }

    return output;
};

function BindedFilterAndMap(props) {
    const classes = useStyles(props);
    const [organFilter, setOrganFilter] = React.useState({ heart: true, kidney: true, liver: true, pancreas: true, lung: true, vca: true, intestine: true, islet: true });
    let [points, setPoints] = React.useState(null);

    const fetchData = (organFilter) => {
        const rawData = require('./data_list_for_filter.json');
        let data = filterData(rawData, organFilter);
        setPoints(data);
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
            <Typography sx={{ fontStyle: "italic", fontWeight: 300, fontSize: "0.9rem", textAlign: 'left', paddingLeft: 1, paddingBottom: 1 }}>Organ Filters</Typography>
            <FormGroup sx={{ paddingLeft: 0.5 }}>
                <FormControlLabel className={classes.label} control={<Checkbox checked={organFilter.heart} onChange={() => handleOrganFilter("heart")} />} label="Heart" />
                <FormControlLabel className={classes.label} control={<Checkbox checked={organFilter.kidney} onChange={() => handleOrganFilter("kidney")} />} label="Kidney" />
                <FormControlLabel className={classes.label} control={<Checkbox checked={organFilter.liver} onChange={() => handleOrganFilter("liver")} />} label="Liver" />
                <FormControlLabel className={classes.label} control={<Checkbox checked={organFilter.pancreas} onChange={() => handleOrganFilter("pancreas")} />} label="Pancreas" />
                <FormControlLabel className={classes.label} control={<Checkbox checked={organFilter.lung} onChange={() => handleOrganFilter("lung")} />} label="Lung" />
                <FormControlLabel className={classes.label} control={<Checkbox checked={organFilter.vca} onChange={() => handleOrganFilter("vca")} />} label="Vascularized Composite Allograft (VCA)" />
                <FormControlLabel className={classes.label} control={<Checkbox checked={organFilter.intestine} onChange={() => handleOrganFilter("intestine")} />} label="Intestine" />
                <FormControlLabel className={classes.label} control={<Checkbox checked={organFilter.islet} onChange={() => handleOrganFilter("islet")} />} label="Pancreas Islet" />
            </FormGroup>
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
                        Organ Transplant Finder
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
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
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton
                            color="inherit"
                            aria-label="close drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            sx={{ display: { md: 'none' } }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <Toolbar />
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, padding: 0, height: `calc(100vh - 65px)` }}
            >
                <Toolbar />
                {points != null && <Map2 points={points} />}
            </Box>
        </Box>
    );
}

export default BindedFilterAndMap;