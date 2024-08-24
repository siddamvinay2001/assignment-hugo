import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MileageTransaction, MileageStore } from "@/types/Profile.types";
import { useAutoIncrementStore } from "./AutoIncrementStore";

const TRANSACTIONS_KEY = "mileageTransactions";

export const useMileageStore = create<MileageStore>((set) => ({
    transactions: [],
    addTransaction: async (transaction) => {
        const { getNextTransactionId } = useAutoIncrementStore.getState();
        const nextTransactionId = await getNextTransactionId();
        set((state) => {
            const newTransaction = { ...transaction, id: nextTransactionId };
            const updatedTransactions = [...state.transactions, newTransaction];
            AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTransactions)).catch(
                (error) => {
                    console.error("Failed to save transactions to AsyncStorage", error);
                }
            );
            return { transactions: updatedTransactions };
        });
    },
    removeTransaction: async (transactionId) => {
        set((state) => {
            const updatedTransactions = state.transactions.filter(transaction => transaction.id !== transactionId);
            AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTransactions)).catch(
                (error) => {
                    console.error("Failed to remove transaction from AsyncStorage", error);
                }
            );
            return { transactions: updatedTransactions };
        });
    },
    loadTransactions: async () => {
        try {
            const transactionsString = await AsyncStorage.getItem(TRANSACTIONS_KEY);
            const transactions = transactionsString ? JSON.parse(transactionsString) : [];
            set({ transactions });
        } catch (error) {
            console.error("Failed to load transactions from AsyncStorage", error);
        }
    },
    loadTransactionsForVehicle: async (vehicleId) => {
        try {
            const transactionsString = await AsyncStorage.getItem(TRANSACTIONS_KEY);
            const transactions = transactionsString ? JSON.parse(transactionsString) : [];
            return transactions.filter(transaction => transaction.vehicleId === vehicleId);
        } catch (error) {
            console.error("Failed to load transactions for vehicle from AsyncStorage", error);
            return [];
        }
    },
}));
