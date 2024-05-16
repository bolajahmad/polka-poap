
export interface IPOAPInformation {
    id: string | number;
    metadataCid: string;
    eventId: number;
    description: string;
    name: string;
    timestamp: number;
    blockNumber: number;
    startDate: number;
    endDate: number;
    mintDate: number;
    eventType: 'In-Person' | 'Virtual';
    address?: {
        city: string,
        country: string,
    },
    url?: string,
    website?: string;
}


export interface POAPActivity {
    id: number; 
    parachainId: number; 
    eventType: 'minting' | 'burning'; 
    timestamp: number; 
    blockNumber: number; 
    metadataCid: string; 
    eventId: number; 
    name: string; 
    mintDate: number;
}