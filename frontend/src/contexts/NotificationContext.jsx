import { createContext, useState, useContext, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchNotifications = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/api/notifications');
            setNotifications(response.data);
        } catch (err) {
            console.error("Error fetching notifications:", err);
            setNotifications([]); // Clear notifications on error
        } finally {
            setIsLoading(false);
        }
    }, []);

    const notificationCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{ notifications, isLoading, fetchNotifications, notificationCount }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
};
