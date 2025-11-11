import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import { getAppointments, getTasks, toggleTask } from '../services/apiService';
import { Appointment, Task } from '../types';

const Agenda: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const today = new Date().toISOString().split('T')[0];
            const [allAppointments, allTasks] = await Promise.all([getAppointments(), getTasks()]);
            
            const todaysAppointments = allAppointments.filter(a => a.date === today);
            
            setAppointments(todaysAppointments);
            setTasks(allTasks);
        } catch (error) {
            console.error("Failed to fetch agenda data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    const handleToggleTask = async (task: Task) => {
        const originalTasks = [...tasks];
        // Optimistically update UI
        setTasks(currentTasks => currentTasks.map(t => 
            t.id === task.id ? { ...t, completed: !t.completed } : t
        ));

        try {
            await toggleTask(task.id, task.completed ?? false);
        } catch (error) {
            console.error("Failed to update task:", error);
            // Revert on error
            setTasks(originalTasks);
        }
    };

    if (loading) {
        return (
            <Card>
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 my-6"></div>
                    <div className="space-y-4">
                        <div className="h-6 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Agenda</h3>
            
            <div>
                <h4 className="font-semibold text-gray-700 mb-2">Upcoming Appointments</h4>
                {appointments.length > 0 ? (
                    <div className="space-y-2">
                        {appointments.map(apt => (
                            <div key={apt.id} className="p-3 bg-gray-50/80 rounded-lg border border-gray-200/80">
                                <p className="font-medium text-gray-800">{apt.patient.name}</p>
                                <p className="text-sm text-gray-500">{apt.time} - {apt.reason}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No appointments scheduled for today.</p>
                )}
            </div>

            <div className="mt-6">
                <h4 className="font-semibold text-gray-700 mb-2">To-Do List</h4>
                <div className="space-y-2">
                    {tasks.map(task => (
                        <div key={task.id} className="flex items-center">
                            <input 
                                type="checkbox"
                                id={`task-${task.id}`}
                                checked={task.completed ?? false}
                                onChange={() => handleToggleTask(task)}
                                className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                            />
                            <label 
                                htmlFor={`task-${task.id}`}
                                className={`ml-3 text-sm text-gray-700 ${task.completed ? 'line-through text-gray-500' : ''}`}
                            >
                                {task.text}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default Agenda;