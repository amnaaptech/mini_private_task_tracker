import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Dashboard from './Task-dashboard/Dasboard';
import AddTask from './Task-dashboard/AddTask';
import ShowTasks from './Task-dashboard/ShowTasks';
import UpdateTask from './Task-dashboard/updateTask';

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/AddTask"
          element={<AddTask />}
        />

        <Route
          path="/showtasks"
          element={<ShowTasks />}
        />
        <Route
          path="/Updatetasks/:id"
          element={<UpdateTask />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App
