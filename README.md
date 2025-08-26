# 🚗 Car Logistic App (Parc Auto)

A **Car Fleet Management** application built with **React + TypeScript + Vite + Tailwind**.  
This project was developed as a school final project to manage and keep track of company cars, their insurance, revisions, and technical details.

---

## ✨ Features

- 🔑 **Authentication** – Login, Register, Logout (with `json-server-auth`)
- 📋 **CRUD Operations** – Add, edit, delete, and view cars
- 🛠 **Technical Details** – Track VIN, plate number, brand, model, engine, kilometers, fuel type, department, and status
- 📅 **Revisions** – Store and calculate days until next revision
- 🛡 **Insurance Management** – Track RCA & CASCO details (insurer, series, number, start & end dates)
- 🔧 **Repairs** – Log repair history for each car
- 💱 **Currency Conversion** – Integrates with [FreeCurrencyAPI](https://freecurrencyapi.com) to convert fuel prices (BGN → RON)
- 📱 **Responsive UI** – Styled with **TailwindCSS**
- ⚡ **No Page Reloads** – Smooth navigation with React Router

---

## 🛠 Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** TailwindCSS
- **Backend:** JSON Server + JSON Server Auth
- **State Management:** React Hooks
- **API Integrations:**
  - FreeCurrencyAPI (currency exchange)
  - (Planned) Fuel price API
