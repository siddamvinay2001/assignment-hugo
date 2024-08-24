export interface MileageTransaction {
    id: number;
    vehicleId: number;
    odometerStart: number;
    odometerEnd: number;
    fuelConsumed: number;
    price: number;
    date: string;
}

export interface MileageStore {
    transactions: MileageTransaction[];
    addTransaction: (transaction: Omit<MileageTransaction, 'id'>) => Promise<void>;
    removeTransaction: (transactionId: number) => Promise<void>;
    loadTransactions: () => Promise<void>;
    loadTransactionsForVehicle: (vehicleId: Number) => Promise<void>;
}