'use client';

import React from 'react';
import HomelabDiagram from './HomelabDiagram';

interface MapProps {
    onServiceSelect: (service: any) => void;
}

const Map = ({ onServiceSelect }: MapProps) => {
    return <HomelabDiagram />;
};

export default Map;

