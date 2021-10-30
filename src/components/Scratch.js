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

const Scratch = (props) => {
    const [organFilter, setOrganFilter] = React.useState({ heart: true, kidney: true, liver: true, pancreas: true, lung: true, vca: true, intestine: true, islet: true });
    let [points, setPoints] = React.useState(null);

    const fetchData = async (organFilter) => {
        console.log("fetching data...", organFilter);
        const call = await fetch('data_list_for_filter.json');
        const data = await call.json();
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