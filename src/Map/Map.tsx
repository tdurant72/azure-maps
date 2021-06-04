import React, { useState } from 'react';
import { AzureMap, AzureMapsProvider, IAzureMapOptions, IAzureMapControls } from 'react-azure-maps';
import { AuthenticationType, TrafficOptions, ControlOptions } from 'azure-maps-control';
import { key } from "../key";
import { Button } from '@material-ui/core';
import Description from '../Layout/Description';
const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
    },
    center: [-79.804891, 36.078344],
    zoom: 10,
    view: 'Auto'
}
const wrapperStyles = {
    map: {
        height: '350px',
    },
    wrapper: {
        padding: '15px',
        marginTop: '15px',
    },
    buttonContainer: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridGap: '10px',
        gridAutoColumns: 'max-content',
        padding: '10px 0',
    },
    buttons: {
        padding: '15px',
        flex: 1,
    },
    popupStyles: {
        padding: '20px',
        color: 'black',
    },
};
const controls: IAzureMapControls[] = [
    {
        controlName: 'StyleControl',
        controlOptions: { mapStyles: 'all' },
        options: { position: 'top-right' } as ControlOptions,
    },
    {
        controlName: 'ZoomControl',
        options: { position: 'top-right' } as ControlOptions,
    },
    {
        controlName: 'CompassControl',
        controlOptions: { rotationDegreesDelta: 10, style: 'dark' },
        options: { position: 'bottom-right' } as ControlOptions,
    },
    {
        controlName: 'PitchControl',
        controlOptions: { pitchDegreesDelta: 5, style: 'dark' },
        options: { position: 'bottom-right' } as ControlOptions,
    },
    {
        controlName: 'TrafficControl',
        controlOptions: { incidents: true },
        options: { position: 'top-left' } as ControlOptions,
    },
    {
        controlName: 'TrafficLegendControl',
        controlOptions: {},
        options: { position: 'bottom-left' } as ControlOptions,
    },
];
const Map: React.FC = () => {
    const [trafficOptions, setTrafficOptions] = useState<TrafficOptions>({
        incidents: true,
        flow: 'absolute',
    });
    return (
        <div style={wrapperStyles.map}>
            <Description>
                This sample shows how the different Traffic Options change how the traffic overlay is rendered on the map.{' '}
                <br />
            As initial traffic options are: <br />
            incidents: true, flow: 'absolute'
          </Description>
            <div style={wrapperStyles.buttonContainer}>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setTrafficOptions((value) => ({ ...value, flow: 'relative' }));
                    }}
                >
                    Flow: Relative Traffic
            </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setTrafficOptions((value) => ({ ...value, flow: 'relative-delay' }));
                    }}
                >
                    Flow: Relative-delay
            </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setTrafficOptions((value) => ({ ...value, flow: 'absolute' }));
                    }}
                >
                    Flow: Absolute
            </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setTrafficOptions((value) => ({ ...value, flow: 'none' }));
                    }}
                >
                    Flow: None
            </Button>
            </div>
            <div style={wrapperStyles.buttonContainer}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTrafficOptions((value) => ({ ...value, incidents: true }));
                    }}
                >
                    Incidents: TRUE
            </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        setTrafficOptions((value) => ({ ...value, incidents: false }));
                    }}
                >
                    Incidents: FALSE
            </Button>
            </div>
            <AzureMapsProvider>
                <div style={{ height: '600px' }}>
                    <AzureMap options={option} trafficOptions={trafficOptions} controls={controls} />
                </div>
            </AzureMapsProvider>
        </div>
    );
};

export default Map;