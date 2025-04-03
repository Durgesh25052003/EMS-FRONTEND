import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { getEvents } from '../service/apiService';

const EventContext = createContext();

// eslint-disable-next-line react/prop-types
export const EventProvider = ({ children }) => {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,

  });

  const value = {
    events,
    isLoading,
    error
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to use the Event context
export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
