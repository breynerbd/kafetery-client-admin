import { axiosAdmin } from "./api";

// ================= USERS =================
export const getUsers = () => axiosAdmin.get("/users");

export const getUserById = (id) => axiosAdmin.get(`/users/${id}`);

export const createUser = (data) => axiosAdmin.post("/users", data);

export const updateUser = (id, data) =>
    axiosAdmin.put(`/users/${id}`, data);

export const deleteUser = (id) =>
    axiosAdmin.delete(`/users/${id}`);


// ================= ROLES =================
export const getRoles = () => axiosAdmin.get("/roles");

export const createRole = (data) =>
    axiosAdmin.post("/roles", data);

export const deleteRole = (id) =>
    axiosAdmin.delete(`/roles/${id}`);


// ================= ACCOUNTS =================
export const getAccounts = () => axiosAdmin.get("/accounts");

export const getAccountById = (id) =>
    axiosAdmin.get(`/accounts/${id}`);

export const createAccount = (data) =>
    axiosAdmin.post("/accounts", data);

export const deleteAccount = (id) =>
    axiosAdmin.delete(`/accounts/${id}`);


// ================= ACCOUNT REQUESTS =================
export const getAccountRequests = () =>
    axiosAdmin.get("/account-requests");

export const approveAccountRequest = (id) =>
    axiosAdmin.patch(`/account-requests/${id}/approve`);

export const rejectAccountRequest = (id) =>
    axiosAdmin.patch(`/account-requests/${id}/reject`);


// ================= LOANS =================
export const getLoans = () => axiosAdmin.get("/loans");

export const getLoanById = (id) =>
    axiosAdmin.get(`/loans/${id}`);

export const approveLoan = (id) =>
    axiosAdmin.put(`/loans/approve/${id}`);

export const rejectLoan = (id) =>
    axiosAdmin.put(`/loans/reject/${id}`);

export const payLoanInstallment = (id) =>
    axiosAdmin.put(`/loans/pay/${id}`);

export const checkLoanMora = () =>
    axiosAdmin.post("/loans/check-mora");


// ================= CARDS =================
export const getCards = () => axiosAdmin.get("/cards");

export const getCardsByAccount = (id) =>
    axiosAdmin.get(`/cards/${id}`);

export const updateCardStatus = (id, data) =>
    axiosAdmin.post(`/cards/${id}`, data);

export const activateCard = (id) =>
    axiosAdmin.post(`/cards/${id}/activate`);

export const blockCard = (id, data) =>
    axiosAdmin.post(`/cards/${id}/block`, data);


// ================= TRANSACTIONS =================
export const getTransactions = () =>
    axiosAdmin.get("/transactions");

export const getTransactionsByAccount = (id) =>
    axiosAdmin.get(`/transactions/${id}`);

export const createTransaction = (data) =>
    axiosAdmin.post("/transactions", data);