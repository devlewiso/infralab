'use client';

import React from 'react';
import HomelabDiagram from './HomelabDiagram';
import { Service } from './data';

interface MapProps {
    onServiceSelect: (service: Service) => void;
}

const Map = ({ onServiceSelect: _onServiceSelect }: MapProps) => {
    return <HomelabDiagram />;
};

export default Map;
