// Mantine table to shows substitutions scores for benchmark models 
// Uses viewType state variable to switch between aggregated model-level view 
// and DMS-level view 

import { useState } from 'react';
import { useMantineTheme } from '@mantine/core';

function SubstitutionTable(props){
    const theme = useMantineTheme();
    viewType = props.viewType;
    const [sort, setSort] = useState('model');

}