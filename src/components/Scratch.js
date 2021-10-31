import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
/* import withFetch from './withFetch';
import MyMap from './MyMap'; */

/* const MyMapWithFetch = withFetch(
    MyMap,
    "data.json"
); */

/* function Scratch() {
    const [organFilter, setOrganFilter] = React.useState({ heart: true, kidney: true, liver: true, pancreas: true, lung: true, vca: true, intestine: true, islet: true });
    const [points, setPoints] = useState(null);

    const handleOrganFilter = (organ) => {
        setOrganFilter(prevState => ({
            ...prevState,
            [organ]: !prevState[organ]
        }));
    };

    return (
        <>
            

            <MyMapWithFetch />
        </>
    );
}*/

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

const Scratch = (props) => {
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

    return (
        <>
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={organFilter.heart} onChange={() => handleOrganFilter("heart")} />} label="Heart" />
                <FormControlLabel control={<Checkbox checked={organFilter.kidney} onChange={() => handleOrganFilter("kidney")} />} label="Kidney" />
                <FormControlLabel control={<Checkbox checked={organFilter.liver} onChange={() => handleOrganFilter("liver")} />} label="Liver" />
                <FormControlLabel control={<Checkbox checked={organFilter.pancreas} onChange={() => handleOrganFilter("pancreas")} />} label="Pancreas" />
                <FormControlLabel control={<Checkbox checked={organFilter.lung} onChange={() => handleOrganFilter("lung")} />} label="Lung" />
                <FormControlLabel control={<Checkbox checked={organFilter.vca} onChange={() => handleOrganFilter("vca")} />} label="Vascularized Composite Allograft (VCA)" />
                <FormControlLabel control={<Checkbox checked={organFilter.intestine} onChange={() => handleOrganFilter("intestine")} />} label="Intestine" />
                <FormControlLabel control={<Checkbox checked={organFilter.islet} onChange={() => handleOrganFilter("islet")} />} label="Pancreas Islet" />
            </FormGroup>

            <h1>{points != null && points[0].Latitude}</h1>
        </>
    )
}

export default Scratch;