import React, { createContext, useContext, useState } from 'react';
import { initialWorkerState } from '../data/mockWorkerProfile';

const WorkerContext = createContext();

export const useWorker = () => useContext(WorkerContext);

export const WorkerProvider = ({ children }) => {
  const [workerState, setWorkerState] = useState(initialWorkerState);

  // Helper to add history
  const addHistory = (text, type) => {
    setWorkerState(prev => ({
      ...prev,
      history: [
        { id: Date.now(), text, time: "Just now", type },
        ...prev.history
      ]
    }));
  };

  const markTaskComplete = (taskId) => {
    setWorkerState(prev => {
      const newTasks = prev.tasks.map(t => 
        t.id === taskId ? { ...t, status: 'Completed' } : t
      );
      return { ...prev, tasks: newTasks };
    });
    addHistory(`Completed task ${taskId}`, 'Task');
  };

  const updateTaskStatus = (taskId, status) => {
    setWorkerState(prev => {
      const newTasks = prev.tasks.map(t => 
        t.id === taskId ? { ...t, status } : t
      );
      return { ...prev, tasks: newTasks };
    });
    addHistory(`Marked task ${taskId} as ${status}`, 'Task');
  };

  const markNotificationRead = (id) => {
    setWorkerState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
    }));
  };

  const submitReport = (reportData) => {
    const newReport = {
      id: `R-${Math.floor(Math.random() * 1000)}`,
      status: "Submitted",
      date: new Date().toISOString().split('T')[0],
      latestUpdate: "Pending Review",
      ...reportData
    };
    
    setWorkerState(prev => ({
      ...prev,
      reports: [newReport, ...prev.reports]
    }));
    
    addHistory(`Submitted new ${reportData.type} report`, 'Report');
  };

  const submitCorrectiveEvidence = (id) => {
    setWorkerState(prev => ({
      ...prev,
      correctiveActions: prev.correctiveActions.map(ca => 
        ca.id === id ? { ...ca, status: "Verification" } : ca
      )
    }));
    addHistory(`Submitted evidence for corrective action ${id}`, 'Compliance');
  };

  const startTraining = (id) => {
    setWorkerState(prev => ({
      ...prev,
      training: prev.training.map(tr => 
        tr.id === id ? { ...tr, status: "In Progress", progress: 0 } : tr
      )
    }));
    addHistory(`Started training course ${id}`, 'Training');
  };

  const value = {
    ...workerState,
    markTaskComplete,
    updateTaskStatus,
    markNotificationRead,
    submitReport,
    submitCorrectiveEvidence,
    startTraining,
    addHistory
  };

  return (
    <WorkerContext.Provider value={value}>
      {children}
    </WorkerContext.Provider>
  );
};
