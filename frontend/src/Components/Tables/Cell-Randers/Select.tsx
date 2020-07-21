import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import {CommonController} from '../../../controllers/commonController';
import React, { useState, useEffect } from 'react';
import { deepOrange } from "@material-ui/core/colors";

export function SelectEdit(
    getSelectors: () => Promise<{key: number, value: string}[]>, 
    selected: number,
    onChange: (selected: number) => void) {

        const [selections, setSelections] = useState<{key: number, value: string}[]>([]);

        useEffect(() => {
            getSelectors().then((selectores => {
                setSelections(value => Array.isArray(selectores) ? selectores : []);
            }))
        }, [])


        return (
        <>
            <InputLabel id="name-label"></InputLabel>
            {<Select
                fullWidth
                displayEmpty={true}
                labelId="name-label"
                id=""
                value={selected}
                onChange={e => onChange(e.target.value as number)}
            >
                {selections.map((selection, key) => (
                    <MenuItem key={key} value={selection.key}>
                        {selection.value}
                    </MenuItem>
                ))}
            </Select>
            }
        </>
        )
    }